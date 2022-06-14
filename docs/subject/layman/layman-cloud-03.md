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
3. 在Spring Boot使用@Values注解中进行常规操作的文件取得，这样在我们访问这个Controller的时候，就可以直接得到配置中心中发布的配置
```java

  @Value("${coupon.user.name}")
  private String name;
  @Value("${coupon.user.age}")
  private Integer age;
```
4. 在配置文件中进行配置
5. 动态获取，需要再相应的Controller上添加@RefreshScope注解来实现动态获取

## 命名空间
负责配置隔离，默认为public。
比如，为开发，测试，生产环境进行配置，我个人理解就像单体建构下设置多个properties文件一样。
## 配置集
