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


## 动态权限过滤
在SecurityConfig配置中，我们声明了一个Bean，DynamicSecurityService,这个方法返回了一个map，里面
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






