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









