---
title: 创建SpringBoot项目
categories: 
 - Spring Boot
tags:
 - Spring Boot
date: 2020-09-09
---

## 创建项目
### 创建项目
我们采用IDEA来逐步创建项目，在构建工具的部分，我选择了Gradle而没有选择常用的Maven。原因主要是spring5开始采用Gradle进行构建。创建成功后的gradle配置文件如下
``` groovy
plugins {
    id 'org.springframework.boot' version '2.3.3.RELEASE'
    id 'io.spring.dependency-management' version '1.0.10.RELEASE'
    id 'java'
}

group = 'com.liuyang19900520'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '14'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    runtimeOnly 'mysql:mysql-connector-java'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation('org.springframework.boot:spring-boot-starter-test') {
        exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
    }
}

test {
    useJUnitPlatform()
}
```
### 配置热启动
[Spring Boot devtools配置热部署](https://blog.csdn.net/qq_27886997/article/details/82799217)

### 测试Controller
``` java
package com.liuyang19900520.layman.starter.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author lijiao
 */
@RestController
@RequestMapping("/test")
public class TestController {

    @RequestMapping("")
    public Object test() {
        return "Test1";
    }
}
```
当我们访问上述url时得到我们的return内容，我们的项目目前为止创建成功。

## 连接数据库

### 配置数据库连接
首先，我们需要创建数据，并且测试一下我们能够通过可视化工具看到测试数据。之后我们在项目的配置文件中，进行数据库的配置

### 引入mybatis-plus
[mybatis-plus](https://mybatis.plus/)更多详情参见官网。
``` groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation group: 'com.baomidou', name: 'mybatis-plus-boot-starter', version: '3.4.0'
    compileOnly 'org.projectlombok:lombok'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    runtimeOnly 'mysql:mysql-connector-java'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation('org.springframework.boot:spring-boot-starter-test') {
        exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
    }
}
```







