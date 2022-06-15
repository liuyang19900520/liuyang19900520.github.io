---
title: Nacos配置中心的简单使用
categories:
  - Java
  - Spring Cloud Alibaba
tags:
  - Spring
  - Spring Cloud Alibaba
  - Nacos
date: 2021-12-22
---

## 简单应用
1. 导入依赖。在common中导入maven依赖后，我们就可以在各个工程中进行使用
2. 在8848的nacos服务中配置好响应的配置文件
![0001](/subject/layman-cloud/cloud-3-nacos.png)
3. 在Spring Boot使用@Values注解中进行常规操作的文件取得，这样在我们访问这个Controller的时候，就可以直接得到配置中心中发布的配置。
```java
  @Value("${coupon.user.name}")
  private String name;
  @Value("${coupon.user.age}")
  private Integer age;
```
4. 在配置文件中进行配置，默认规则是，如果配置中心存在则优先
5. 动态获取，需要再相应的Controller上添加@RefreshScope注解来实现动态获取

## 命名空间,配置集，配置集ID，配置分组
负责配置隔离，默认为public。
比如基于环境进行隔离，为开发，测试，生产环境进行配置，我个人理解就像单体建构下设置多个properties文件一样。

![0001](/subject/layman-cloud/nacos-namespace.png)
当然，也可以依据各个微服务不同来进行隔离，比如为不同的微服务创建不同的配置文件
* 配置集：所有配置的集合
* 配置集ID：Data ID，可以理解为spirng环境中的文件名
* 配置分组：逻辑分组

我们可以组织一个案例
每个微服务创建自己的命名空间，使用配置分组区别环境（dev,test,prod）
![0001](/subject/layman-cloud/nacos-group.png)
只需要在bootstrap.properties中进行如下配置
···
spring.cloud.nacos.config.namespace=6109967a-a144-4aad-82fd-2b837887fc2a
spring.cloud.nacos.config.group=dev
···

当然，为了配置文件进行简化，我们往往可以把一个大的配置文件进行简化和拆解，就等于我们在配置中心中进行了拆解和合并
```
spring.cloud.nacos.config.name=layman-coupon
spring.cloud.nacos.config.server-addr=127.0.0.1:8848
spring.cloud.nacos.config.namespace=347a8628-7a40-430c-a1d2-3e17da9ebdb8

spring.cloud.nacos.config.extension-configs[0].data-id=mybatis.yml
spring.cloud.nacos.config.extension-configs[0].group=dev
spring.cloud.nacos.config.extension-configs[0].refresh=true

spring.cloud.nacos.config.extension-configs[1].data-id=datasource.yml
spring.cloud.nacos.config.extension-configs[1].group=dev
spring.cloud.nacos.config.extension-configs[1].refresh=true

spring.cloud.nacos.config.extension-configs[2].data-id=others.yml
spring.cloud.nacos.config.extension-configs[2].group=dev
spring.cloud.nacos.config.extension-configs[2].refresh=true

spring.cloud.nacos.config.extension-configs[3].data-id=layman-coupon.properties
spring.cloud.nacos.config.extension-configs[3].group=dev
spring.cloud.nacos.config.extension-configs[3].refresh=true

```
在nacos配置中心的各个文件如下
![0001](/subject/layman-cloud/nacos-ymls.png)
