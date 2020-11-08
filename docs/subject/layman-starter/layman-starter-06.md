---
title: 有必要做一个最简单的权限管理
categories: 
 - Spring Boot
tags:
 - Spring Boot
 - Spring Security
 - JWT
date: 2020-11-05
---

## 建表
一说到权限管理，颗粒度的控制就是一个不小的话题。这是一个古老的没什么新意的老旧功能，但也是比较大众的一种。 
所以这一部分的功能，我准备抄一抄macrozheng大神的[tiny-amll](https://github.com/macrozheng/mall-tiny/tree/master/src/main/java/com/macro/mall/tiny/security)代码。 
所以首先，按照常规的规则进行建表。规则无非就是用户，角色，权限，关系的结合。这一部分我就采用拿来主义了。具体的表结构和数据参见source吧。

## JWT
### 关于jwt的理解
关于JWT和传统Session验证的区别，很多文章都有讲解。我我搜到知乎里面的一个提问，和我的理解基本相同： 
[jwt与token+redis，哪种方案更好用？](https://www.zhihu.com/question/274566992)
* JWT: 生成并发给客户端之后，后台是不用存储，客户端访问时会验证其签名、过期时间等再取出里面的信息（如username），再使用该信息直接查询用户信息完成登录验证。jwt自带签名、过期等校验，后台不用存储，缺陷是一旦下发，服务后台无法拒绝携带该jwt的请求（如踢除用户）。

* token+redis： 是自己生成个32位的key，value为用户信息，访问时判断redis里是否有该token，如果有，则加载该用户信息完成登录。服务需要存储下发的每个token及对应的value，维持其过期时间，好处是随时可以删除某个token，阻断该token继续使用。 

### 创建jwt工具类
这个工具类主要是放一些jwt生成，验证等等方法暴露给外部使用。
```java
@Slf4j
public class JwtTokenUtil {
    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_CREATED = "created";
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Long expiration;
    @Value("${jwt.tokenHead}")
    private String tokenHead;

    /**
     * 根据负责生成JWT的token
     */
    private String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    /**
     * 从token中获取JWT中的负载
     */
    private Claims getClaimsFromToken(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            log.info("JWT格式验证失败:{}", token);
        }
        return claims;
    }

    /**
     * 生成token的过期时间
     */
    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }

    /**
     * 从token中获取登录用户名
     */
    public String getUserNameFromToken(String token) {
        String username;
        try {
            Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    /**
     * 验证token是否还有效
     *
     * @param token       客户端传入的token
     * @param userDetails 从数据库中查询出来的用户信息
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        String username = getUserNameFromToken(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * 判断token是否已经失效
     */
    private boolean isTokenExpired(String token) {
        Date expiredDate = getExpiredDateFromToken(token);
        return expiredDate.before(new Date());
    }

    /**
     * 从token中获取过期时间
     */
    private Date getExpiredDateFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getExpiration();
    }

    /**
     * 根据用户信息生成token
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        claims.put(CLAIM_KEY_CREATED, new Date());
        return generateToken(claims);
    }

    /**
     * 当原来的token没过期时是可以刷新的
     *
     * @param oldToken 带tokenHead的token
     */
    public String refreshHeadToken(String oldToken) {
        if (StrUtil.isEmpty(oldToken)) {
            return null;
        }
        String token = oldToken.substring(tokenHead.length());
        if (StrUtil.isEmpty(token)) {
            return null;
        }
        //token校验不通过
        Claims claims = getClaimsFromToken(token);
        if (claims == null) {
            return null;
        }
        //如果token已经过期，不支持刷新
        if (isTokenExpired(token)) {
            return null;
        }
        //如果token在30分钟之内刚刷新过，返回原token
        if (tokenRefreshJustBefore(token, 30 * 60)) {
            return token;
        } else {
            claims.put(CLAIM_KEY_CREATED, new Date());
            return generateToken(claims);
        }
    }

    /**
     * 判断token在指定时间内是否刚刚刷新过
     *
     * @param token 原token
     * @param time  指定时间（秒）
     */
    private boolean tokenRefreshJustBefore(String token, int time) {
        Claims claims = getClaimsFromToken(token);
        Date created = claims.get(CLAIM_KEY_CREATED, Date.class);
        Date refreshDate = new Date();
        //刷新时间在创建时间的指定时间内
        return refreshDate.after(created) && refreshDate.before(DateUtil.offsetSecond(created, time));
    }
}

```

## Spring Security
### 关于Spring Security 的理解
我们可以把Spring Security的核心功能，理解为认证，授权和攻击防护（防止身份伪造）。 

### 关于Spring Security的基础设置
我们首先创建一个IgnoreUrlsConfig再承载我们不需要验证的url，而LaymanSecurityConfig（继承WebSecurityConfigurerAdapter）设置一些我们的基础配置。

#### 认证管理器
```java
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService())
                .passwordEncoder(passwordEncoder);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
```

#### Http安全配置
这部分代码主要是放置Spring Security相关的安全设置，比如身份认证，权限判断等等。
注意的是，Controller中也对URL配置了权限，如果WebSecurityConfig中和Controller中都对某URL配置了权限，则取较小的权限。





## 认证功能
首先我们需要首先用mybatis plus generator 生成业务上的CRUD的内容，然后我们需要制作一个login的功能。 
关于这个login的功能，首先我们在controller中创建一个login方法。我们会随着请求发送开始到token返回这个流程来分析我们的代码内容

### Controller中进行接受请求
```java
    @ApiOperation(value = "登录以后返回token")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult login(@Validated @RequestBody UmsAdminLoginParam umsAdminLoginParam) {
        String token = adminService.login(umsAdminLoginParam.getUsername(), umsAdminLoginParam.getPassword());
        if (token == null) {
            throw new AuthException("用户名或密码错误");
        }
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", token);
        tokenMap.put("tokenHead", tokenHead);
        return CommonResult.success(tokenMap);
    }
```
上面的代很简单，获取用户名密码，然后再调用AdminService中的login方法生成token，然后将token返回或者返回错误信息。这里面有几点注意
1. RequestMapping的url需要被我们设置到不拦截的路径中去，也就是上文中的IgnoreUrlsConfig，它获取定义的位置在application.yml中的白名单。
2. @RequestBody注解要求我们的请求也是json格式
3. @Validated注解是我们设置的一些验证，后续会介绍。

### Service中处理login的请求




