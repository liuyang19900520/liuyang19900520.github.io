---
title: Spring的启动过程
categories: 
 - Spring 
tags:
 - Spring Framework
date: 2021-01-05
---

当我们导入Spring源码之后，我们添加了一个新的module负责测试，于是我写了一个十分简单代码如下：
```java
public class Liuyang19900520Application {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
		IndexDao dao = annotationConfigApplicationContext.getBean(IndexDao.class);
		dao.query();
	}

}
```
```java
@Configuration
@ComponentScan("com.liuyang19900520")
public class AppConfig {
}
```
```java
@Repository
public class IndexDao {

	public void query() {
		System.out.println("query");
	}
}
```

通过执行我们是可以在控制台打印出预期query的。我们就要简单分析一下Spring的启动过程