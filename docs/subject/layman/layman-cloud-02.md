---
title: Nacos + Feign 联调成功
categories:
  - Java
  - Spring Cloud Alibaba
tags:
  - Spring
  - Spring Cloud Alibaba
  - Nacos
  - OpenFeign
date: 2021-12-05
---

### maven 父子项目的搭建

既然我用中文写博客，也就是说明主要面向的对象就是我自己罢了，所以在这个练手的项目中，我只需要对自己负责，把过程中的所见所想记录下来即可，所以项目搭建的一些基础就跳过了.
![0001](/subject/layman-cloud/project-modules.png)
这个就是搭建起来的基本的模块结构，当然包括一些基础的逆向工程工具等等，就不一一记录了。结果就是勉强跑起来了。

### Nacos 作为注册中心

1. 首先需要从官方网站下载 Nacos 并且直接在本地运行，当然后续应该可以将其部署到 docker 中。可以通过http://localhost:8848/nacos/#/serviceManagement?dataId=&group=&appName=&namespace= 来访问，以便查询那些服务进行了注册。
2. 由于服务发现是各个服务的基础组件，在 common 的模块中进行了依赖。

```xml
    <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
```

3. 在各个服务中用注解进行标注，进行服务注册@EnableDiscoveryClient
4. 这样我们就能在刚刚那个运行在 8848 端口的 Nacos 服务中找到我们注册的服务。（我就启动了 2 个服务）
   ![0002](/subject/layman-cloud/nacos1.png)

当然 Nacos 作为服务发现还是有很多其他的功能，目前为止我只使用了这样的简单功能。后续陆续学习吧。

### 使用 OpenFeign 实现远程调用

这是一款声明式服务调用与负载均衡组件，简单的讲，可以通过傻瓜操作实现服务间的调用。

1. 导入依赖

```xml
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>
```

2. 定义接口
   这个类看起来很明朗，就是定义了一个接口，在方法上标明了我们需要调用的微服务对应的路由的 RequestMapping，而在接口上需要通过@FeignClient 注解来标识我们需要调用的服务

```java
package com.liuyang19900520.laymanmall.member.feign;

import com.liuyang19900520.laymanmall.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value = "layman-coupon")
public interface CouponFeignService {

  @RequestMapping("/coupon/coupon/member/list")
  public R memberCoupons();
}

```

3. 加入扫描，扫表接口所在的包名，应该就属于类似加载 Spring Bean 的状态吧。

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.liuyang19900520.laymanmall.member.feign")
public class LaymanmallMemberApplication {

  public static void main(String[] args) {
    SpringApplication.run(LaymanmallMemberApplication.class, args);
  }
```

通过上述的情况，我们就可以实现一个简单的服务间的通信调用。做一个简单的记录吧。
