---
title: 006-有必要做一个最简单的权限管理
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
当我们回到serivce中的login方法，我们要做的就是如下几个件事。
#### 获取用户信息和对应的资源
```java
@Override
    public UserDetails loadUserByUsername(String username) {
        //获取用户信息
        UmsAdmin admin = getAdminByUsername(username);
        if (admin != null) {
            //获取对应的资源
            List<UmsResource> resourceList = getResourceList(admin.getId());
            return new AdminUserDetails(admin, resourceList);
        }
        throw new AuthException("用户名或密码错误");
    }

```
而获取用户的途径也分为2钟，首先我们可以从缓存中获取，如果缓存中没有得到，我们再去数据库中去查询，并设置到缓存中。同理，getResourceList()方法获得资源的途径也分为数据库和缓存。
```java
public UmsAdmin getAdminByUsername(String username) {
        UmsAdmin admin = adminCacheService.getAdmin(username);
        if (admin != null) {
            return admin;
        }
        QueryWrapper<UmsAdmin> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(UmsAdmin::getUsername, username);
        List<UmsAdmin> adminList = list(wrapper);
        if (adminList != null && adminList.size() > 0) {
            admin = adminList.get(0);
            adminCacheService.setAdmin(admin);
            return admin;
        }
        return null;
    }
```

#### password判断
根据passwordEncoder对输入的密码进行hash化进行对比，如果不匹配抛出异常

#### 将用户信息交由Spring Security管理
```java
UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
SecurityContextHolder.getContext().setAuthentication(authentication);     

```
#### 生成jwt token并返回
使用jwt工具类生成token，做一些登录信息的更新和入库，最后将token返回。 
以上这就是login逻辑的全部内容。我们尝试登录，已经可以成功登录了。

### 授权判断
刚刚我们事先了登录功能，并且并且对于该用户能够访问哪些资源都进行了获取，并且都存储在了Spring Security中，接下来我们就有必要根据访问路径的权限来判断该用户是否有资格访问。


#### 权限过滤器
``` java
@Slf4j
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Value("${jwt.tokenHeader}")
    private String tokenHeader;
    @Value("${jwt.tokenHead}")
    private String tokenHead;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String authHeader = request.getHeader(this.tokenHeader);
        if (authHeader != null && authHeader.startsWith(this.tokenHead)) {
            // The part after "Bearer "
            String authToken = authHeader.substring(this.tokenHead.length());
            String username = jwtTokenUtil.getUserNameFromToken(authToken);
            logger.info("checking username:{}" + username);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    logger.info("authenticated user:{}" + username);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        chain.doFilter(request, response);
    }
}
```
这个过滤器，主要是将我们请求中的header抽出，如果存在的情况就进行健全判断，如果token被jwtUtil验证通过了，就可以访问到我们的controller，反之则不能。

#### 权限拒绝处理
关于权限拒绝的处理办法，主要有2个方面，AccessDeniedHandler和AuthenticationEntryPoint。简单的讲，我们可以理解为AccessDeniedHandler是负责用来解决认证过的用户访问无权限资源时的异常。而AuthenticationEntryPoint 用来解决匿名用户访问无权限资源时的异常。下面截取了新增的自定义拒绝处理类部分。
```java
 // 任何请求需要身份认证
        registry.and()
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                // 关闭跨站请求防护及不使用session
                .and()
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // 自定义权限拒绝处理类
                .and()
                .exceptionHandling()
                .accessDeniedHandler(restfulAccessDeniedHandler)
                .authenticationEntryPoint(restAuthenticationEntryPoint)
                // 自定义权限拦截器JWT过滤器
                .and()
                .addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
```
##### AuthenticationEntryPoint
使用场景是，比如我们输入了一条错误的token，那么这个异常被处理就是AuthenticationEntryPoint。

##### AccessDeniedHandler
如果我们输入错误的token，将不会进入到这个异常处理中。而当我们为这个请求添加一些权限验证时，则会返回到这个异常情况之中。 
例如我们的系统中并不存在ADMINxx这个角色，而我们的代码中却需要如下请求的时候 
```java
 @ApiOperation(value = "用户注册")
 @PreAuthorize("hasRole('ADMINxx')")
 @RequestMapping(value = "/users", method = RequestMethod.POST)
 @LaymanJson(type = UmsAdmin.class, include = "id,username")
    public CommonResult<List<UmsAdmin>> list() {
        List<UmsAdmin> list = adminService.list();
        return CommonResult.success(list);
    }
```
关于AccessDeniedHandler的内容我应该会专门写一篇内容。这篇文章太长了。就先到这里吧。






