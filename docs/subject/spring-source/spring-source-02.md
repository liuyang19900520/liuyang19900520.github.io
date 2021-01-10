---
title: Spring的启动过程（二）
categories:
  - Spring
tags:
  - Spring Framework
date: 2021-01-09
---

之前的博客我们看了在ApplicationContext实例化的过程中，都创建了哪些内容，今天我们试着来理解一下
```java
	public AnnotationConfigApplicationContext(Class<?>... componentClasses) {
		this();
		register(componentClasses);
		refresh();
	}
```
register的过程。

首先我们需要明确一下，componentClasses是什么，这其实就是我们在创建AnnotationConfigApplicationContext时传入的类。
```java
new AnnotationConfigApplicationContext(AppConfig.class);
```
我们可以称为AppConifg

追踪代码我们发现，这里调用的还是我们的reader.register方法
```java
	@Override
	public void register(Class<?>... componentClasses) {
		Assert.notEmpty(componentClasses, "At least one component class must be specified");
		StartupStep registerComponentClass = this.getApplicationStartup().start("spring.context.component-classes.register")
				.tag("classes", () -> Arrays.toString(componentClasses));
		this.reader.register(componentClasses);
		registerComponentClass.end();
	}
```
通过追踪代码，我们发现这里最后其实就是org.springframework.context.annotation.AnnotatedBeanDefinitionReader#doRegisterBean方法
```java
private <T> void doRegisterBean(Class<T> beanClass, @Nullable String name,
			@Nullable Class<? extends Annotation>[] qualifiers, @Nullable Supplier<T> supplier,
			@Nullable BeanDefinitionCustomizer[] customizers) {

		AnnotatedGenericBeanDefinition abd = new AnnotatedGenericBeanDefinition(beanClass);
		if (this.conditionEvaluator.shouldSkip(abd.getMetadata())) {
			return;
		}

		abd.setInstanceSupplier(supplier);
		ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(abd);
		abd.setScope(scopeMetadata.getScopeName());
		String beanName = (name != null ? name : this.beanNameGenerator.generateBeanName(abd, this.registry));

		AnnotationConfigUtils.processCommonDefinitionAnnotations(abd);
		if (qualifiers != null) {
			for (Class<? extends Annotation> qualifier : qualifiers) {
				if (Primary.class == qualifier) {
					abd.setPrimary(true);
				}
				else if (Lazy.class == qualifier) {
					abd.setLazyInit(true);
				}
				else {
					abd.addQualifier(new AutowireCandidateQualifier(qualifier));
				}
			}
		}
		if (customizers != null) {
			for (BeanDefinitionCustomizer customizer : customizers) {
				customizer.customize(abd);
			}
		}

		BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, beanName);
		definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
		BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, this.registry);
	}
```
上面这个方法中，做了如下操作
1. 将我们的beanClass转化称为一个BeanDefinition，用的还是BeanDefinition的构造方法
2. 为这个BeanDefinition添加一些属性，尤其是processCommonDefinitionAnnotations方法更是添加了很多默认属性，这里的属性等等不再展开了。
3. registerBeanDefinition方法追溯，最后还是找到registry.registerBeanDefinition(beanName, definitionHolder.getBeanDefinition()); 这一行，这行代码我们之前是见过的，就是在之前初始化时，为beanFactory中beanDefinitionMaps添加BeanDefinition的put方法。我们就可以理解为，这里将我们自己的传过来的AppConfig.class也放入了beanDefinitionMaps之中，之前beanDefinitionMaps中已经存在了Spring初始化reader时放入的6个BeanDefinition了。这一步也是这里的核心功能。剩下一些记录别名之类的功能就不具体展开了。

## 一些 Spring 概念的自己理解

- BeanDefinition ：存放 bean 定义相关信息，有点像 java 中的 Class。
- BeanDefinitionRegistry：BeanDefinition的注册器，由于ApplicationContext也实现了Registry的接口，所以可以实现为beanDefinitionMaps中添加BeanDefinition的功能等
- BeanDefinitionHolder：一种在Spring源码中便于传递的数据结构，主要属性就是beanDefinition，beanName，aliases
