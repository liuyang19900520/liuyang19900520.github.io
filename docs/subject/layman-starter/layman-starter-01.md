---
title: 创建SpringBoot+Mybatis-plus的小项目
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

### 配置数据库连接
首先，我们需要创建数据，并且测试一下我们能够通过可视化工具看到测试数据。之后我们在项目的配置文件中，进行数据库的配置。
并且指定数据库设置，即mybaits的bean扫描。这里的位置是我们准备自动生成的dao接口的位置。
``` java
package com.liuyang19900520.layman.starter.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * <p>
 * Mybatis配置
 * </p>
 *
 * @author Max Liu
 * @since 2020/09/11
 */
@Configuration
@MapperScan("com.liuyang19900520.layman.starter.module.**.dao")
public class MybatisConfig {
}

```


### 逆向工程进行代码生成
逆向工程的生成器主要是根据module和表名，可以直接生成一套CRUD接口，为了实现这个功能，我们需要注意以下几点：
1. 添加依赖，我们需要添加mybatis-plus-generator，velocity-engine-core，hutool。其中hutool是常用工具类，主要是为生成器提供依赖。
2. 生成器代码中需要注意的是，主要通过module和表名生成一套CRUD。其中需要配置我们存放的路径，没有特别指定的内容即默认。
3. 由于我们当时自行配置了mapper的位置，所以我们需要在配置中修改mapper.xml的扫描位置
```  yaml
mybatis-plus:
  mapper-locations:
    - classpath*:/com/**/mapper/*.xml
```
截止到现在，我们已经实现了最简单的springboot的创建，并且可以完成最简单的CRUD操作。





