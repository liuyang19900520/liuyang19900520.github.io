---
title: Spring Cloud Gateway网关简单应用
categories:
  - Java
  - Spring Cloud Gateway
tags:
  - Spring
  - Spring Cloud Gateway
  - Vue
date: 2022-01-08
---

Spring Cloud Gateway 作为 Spring Cloud 生态系中的网关，其目标是替代 Netflix Zuul，它不仅提供统一的路由方式，并且基于 Filter 链的方式提供了网关基本的功能，例如：安全、监控/埋点和限流等。 

Spring Cloud Gateway 依赖 Spring Boot 和 Spring WebFlux，基于 Netty 运行。它不能在传统的 servlet 容器中工作，也不能构建成 war 包。 
### Route
Route 是网关的基础元素，由 ID、目标 URI、断言、过滤器组成。当请求到达网关时，由 Gateway Handler Mapping 通过断言进行路由匹配（Mapping），当断言为真时，匹配到路由。
### Predicate
Predicate 是 Java 8 中提供的一个函数。输入类型是 Spring Framework ServerWebExchange。它允许开发人员匹配来自 HTTP 的请求，例如请求头或者请求参数。简单来说它就是匹配条件。
### Filter
Filter 是 Gateway 中的过滤器，可以在请求发出前后进行一些业务上的处理。

## 网关导入小例子
我们模拟一个服务，比如我们想通过后台管理系统来访问商品服务中的一个api。


1. 常规导入依赖注册到nacos中，
2. 前端工程请求路由，从原来的单体服务目标，即8080端口改为88端口，并且为了表示区别，在baseUrl中添加/api来表示api请求，这样我们就将请求发送到网关中。
```Vue
  window.SITE_CONFIG['baseUrl'] = 'http://localhost:88/api';
```
3. 配置路由规则
```yml
spring:
  cloud:
    gateway:
      routes:
          #多种路由规则，首先定义id,product服务
        - id: product_route
          #lb代表负载均衡，服务名称
          uri: lb://layman-product
          # 指定的路径，
          predicates:
            # 定义规则，代表前端规则发送请求时带上api前缀
            - Path=/api/product/**
          filters:
            # 路径重写，将api开头的路径转换成product的路径，类似于转发了
            - RewritePath=/api/(?<segment>/?.*),/$\{segment}
        - id: admin_route
          uri: lb://renren-fast
          predicates:
            - Path=/api/**
          filters:
            - RewritePath=/api/(?<segment>/?.*), /renren-fast/$\{segment}
```
4. 设置跨域
由于前段环境运行在8081端口，向88端口的网关发送请求的时候，就需要涉及到处理跨域。处理跨域我们可以通过下面两个方法来
  * 使用Nginx部署为同一个域
  * 配置一个当次请求允许跨域
我们使用第二种，在Gateway工程中配置跨域。

```Java
@Configuration
public class GulimallCorsConfiguration {
    @Bean
    public CorsWebFilter corsWebFilter(){
        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.setAllowCredentials(true);

        source.registerCorsConfiguration("/**",corsConfiguration);
        return new CorsWebFilter(source);
    }
}
```
![0001](/subject/layman-cloud/cloud4.png)
如果我们设置好跨域之后还出现下面的错误的话，就是我们在原来的后台管理服务端也配置了跨域，我们需要将它注释掉

最后在前端工程上进行api访问，我们能够顺利访问成功，说明网关部分的初级了解成功。