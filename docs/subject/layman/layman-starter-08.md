---
title: 008-难缠的AccessDeniedHandler
categories: 
 - Spring Boot
tags:
 - Spring Boot
 - Spring Security
date: 2020-12-11
---
在之前的文章中我们曾说过，关于Security的异常情况，主要有2个方面，AccessDeniedHandler和AuthenticationEntryPoint。 
简单的讲，我们可以理解为AccessDeniedHandler是负责用来解决认证过的用户访问无权限资源时的异常。而AuthenticationEntryPoint用来解决匿名用户访问无权限资源时的异常。下面截取了新增的自定义拒绝处理类部分。 
相比较而言，AuthenticationEntryPoint基本覆盖了我们token错误的情况，而AccessDeniedHandler的情况相对要复杂一点。 

如果想弄清楚这个权限判断的过程，我们分为项目启动时和请求访问时2个阶段来分别确认一下。
## 项目启动时
### 动态权限获取
在SecurityConfig配置中，我们声明了一个Bean，DynamicSecurityService,这个方法返回了一个map，看起来这map里装的应该是所有权限。
```java
    @Bean
    public DynamicSecurityService dynamicSecurityService() {
        return () -> {
            Map<String, ConfigAttribute> map = new ConcurrentHashMap<>(16);
            List<UmsResource> resourceList = resourceService.list();
            for (UmsResource resource : resourceList) {
                map.put(resource.getUrl(), new org.springframework.security.access.SecurityConfig(resource.getId() + ":" + resource.getName()));
            }
            return map;
        };
    }
```
同时，SecurityConfig会为我们配置如下的Bean。

## 发僧请求时
### 进入DynamicSecurityFilter动态权限过滤器
在发送请求的时候，首先我们就要通过动态权限过滤器。在验证中，首先进行了OPTIONS请求验证，如果是直接放行。之后验证了白名单，如果是也直接放行。下面就到了相对麻烦一点的代码了。
```java
//此处会调用AccessDecisionManager中的decide方法进行鉴权操作
InterceptorStatusToken token = super.beforeInvocation(fi);
try {
    fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
} finally {
    super.afterInvocation(token, null);
}
```
### 调用父类的beforeInvocation方法
上线的代码中，beforeInvocation(fi)的方法我们展开确认一下

```java
	protected InterceptorStatusToken beforeInvocation(Object object) {
		Assert.notNull(object, "Object was null");
		final boolean debug = logger.isDebugEnabled();

		if (!getSecureObjectClass().isAssignableFrom(object.getClass())) {
			throw new IllegalArgumentException(
					"Security invocation attempted for object "
							+ object.getClass().getName()
							+ " but AbstractSecurityInterceptor only configured to support secure objects of type: "
							+ getSecureObjectClass());
		}

		Collection<ConfigAttribute> attributes = this.obtainSecurityMetadataSource()
				.getAttributes(object);

		if (attributes == null || attributes.isEmpty()) {
			if (rejectPublicInvocations) {
				throw new IllegalArgumentException(
						"Secure object invocation "
								+ object
								+ " was denied as public invocations are not allowed via this interceptor. "
								+ "This indicates a configuration error because the "
								+ "rejectPublicInvocations property is set to 'true'");
			}

			if (debug) {
				logger.debug("Public object - authentication not attempted");
			}

			publishEvent(new PublicInvocationEvent(object));

			return null; // no further work post-invocation
		}

		if (debug) {
			logger.debug("Secure object: " + object + "; Attributes: " + attributes);
		}

		if (SecurityContextHolder.getContext().getAuthentication() == null) {
			credentialsNotFound(messages.getMessage(
					"AbstractSecurityInterceptor.authenticationNotFound",
					"An Authentication object was not found in the SecurityContext"),
					object, attributes);
		}

		Authentication authenticated = authenticateIfRequired();

		// Attempt authorization
		try {
			this.accessDecisionManager.decide(authenticated, object, attributes);
		}
		catch (AccessDeniedException accessDeniedException) {
			publishEvent(new AuthorizationFailureEvent(object, attributes, authenticated,
					accessDeniedException));

			throw accessDeniedException;
		}

		if (debug) {
			logger.debug("Authorization successful");
		}

		if (publishAuthorizationSuccess) {
			publishEvent(new AuthorizedEvent(object, attributes, authenticated));
		}

		// Attempt to run as a different user
		Authentication runAs = this.runAsManager.buildRunAs(authenticated, object,
				attributes);

		if (runAs == null) {
			if (debug) {
				logger.debug("RunAsManager did not change Authentication object");
			}

			// no further work post-invocation
			return new InterceptorStatusToken(SecurityContextHolder.getContext(), false,
					attributes, object);
		}
		else {
			if (debug) {
				logger.debug("Switching to RunAs Authentication: " + runAs);
			}

			SecurityContext origCtx = SecurityContextHolder.getContext();
			SecurityContextHolder.setContext(SecurityContextHolder.createEmptyContext());
			SecurityContextHolder.getContext().setAuthentication(runAs);

			// need to revert to token.Authenticated post-invocation
			return new InterceptorStatusToken(origCtx, true, attributes, object);
		}
	}
```
上面的代码中，我们第一个需要注意点就是 
```java
	Collection<ConfigAttribute> attributes = this.obtainSecurityMetadataSource()
				.getAttributes(object);
```
如果我们注意DynamicSecurityFilter的接口实现方法obtainSecurityMetadataSource的位置，直接返回了我们自定义的dynamicSecurityMetadataSource，也就是我们的权限数据源。而getAttributes方法
### DynamicSecurityMetadataSource
```java
    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        if (configAttributeMap == null) {
            this.loadDataSource();
        }
        List<ConfigAttribute> configAttributes = new ArrayList<>();
        //获取当前访问的路径
        String url = ((FilterInvocation) o).getRequestUrl();
        String path = URLUtil.getPath(url);
        PathMatcher pathMatcher = new AntPathMatcher();
        Iterator<String> iterator = configAttributeMap.keySet().iterator();
        //获取访问该路径所需资源
        while (iterator.hasNext()) {
            String pattern = iterator.next();
            if (pathMatcher.match(pattern, path)) {
                configAttributes.add(configAttributeMap.get(pattern));
            }
        }
        // 未设置操作请求权限，返回空集合
        return configAttributes;
    }
```
如果以我们测试访问的这个api：http://localhost:8080/ums/admin/users 为例子，我们会得到一个访问该路径需要得到的资源。经过debug后我们也能发现，这个资源就是【30 测试资源】


### DynamicAccessDecisionManager
然后我们再回过头去看调用父类的beforeInvocation方法中的this.accessDecisionManager.decide(authenticated, object, attributes);这一句。这就很好理解了，也就是说在这里会调用我们自定义的DynamicAccessDecisionManager汇总的decide方法。
```java
 // 当接口未被配置资源时直接放行
        if (CollUtil.isEmpty(configAttributes)) {
            return;
        }
        Iterator<ConfigAttribute> iterator = configAttributes.iterator();
        while (iterator.hasNext()) {
            ConfigAttribute configAttribute = iterator.next();
            //将访问所需资源或用户拥有资源进行比对
            String needAuthority = configAttribute.getAttribute();
            for (GrantedAuthority grantedAuthority : authentication.getAuthorities()) {
                if (needAuthority.trim().equals(grantedAuthority.getAuthority())) {
                    return;
                }
            }
        }
        throw new AccessDeniedException("抱歉，您没有访问权限");
```
这个方法并不难理解，主要就是判断我们这个url需要的资源和authentication.getAuthorities()中的资源是否能够匹配，如果可以匹配则通过，反之报异常。 
那么问题来了，这个authentication在进行的设置呢？我们还是要回顾到beforeInvocation的这个方法中，其中的两个代码片段
```java
		Authentication authenticated = authenticateIfRequired();

		// Attempt authorization
		try {
			this.accessDecisionManager.decide(authenticated, object, attributes);
		}
```
上面的代码我们能够理解，authenticated是作为参数传递给DynamicAccessDecisionManager的，而获取的内容正是我们当前用户的Authentication信息，展开说就是取到我们SecurityContextHolder中存储的authentication信息，如果有就返回，如果没有就获取后设置并返回。
```java
	private Authentication authenticateIfRequired() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication.isAuthenticated() && !alwaysReauthenticate) {
			if (logger.isDebugEnabled()) {
				logger.debug("Previously Authenticated: " + authentication);
			}

			return authentication;
		}

		authentication = authenticationManager.authenticate(authentication);

		// We don't authenticated.setAuthentication(true), because each provider should do
		// that
		if (logger.isDebugEnabled()) {
			logger.debug("Successfully Authenticated: " + authentication);
		}

		SecurityContextHolder.getContext().setAuthentication(authentication);

		return authentication;
	}
```
上面这种情况是在里设定的authentication呢？其实就是在我们的login service中，
```java
  UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            token = jwtTokenUtil.generateToken(userDetails);
```
```java
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
上面我们就能清楚的看到，登录的时候我们分别取到了这个用户的信息和其对应的资源信息。然后将这个资源放到了SecurityContextHolder的authentication中。

最后做一个总结吧。 
1. jwtAuthenticationTokenFilter负责验证token是否符合正确，而dynamicSecurityFilter负责验证该用户是否具有权限
2. restAuthenticationEntryPoint负责token错误时返回的异常信息处理，而restfulAccessDeniedHandler负责的是不具备权限时返回的信息异常处理
3. 在程序启动时，将url对应的url和拼接而成的资源id和name存入map中
4. 在程序进行路由访问时，首先在DynamicSecurityMetadataSource获取访问该路径所需资源，然后在DynamicAccessDecisionManager中就对比的比较是否存在该权限，如果存在就通过。





