---
title: Configuration到底起来什么作用
categories:
  - Spring
tags:
  - Spring Framework
date: 2021-01-20
---

通过之前的分析，我们可以在ConfigurationClassPostProcessor
```java
		Map<String, Object> config = metadata.getAnnotationAttributes(Configuration.class.getName());
		if (config != null && !Boolean.FALSE.equals(config.get("proxyBeanMethods"))) {
			beanDef.setAttribute(CONFIGURATION_CLASS_ATTRIBUTE, CONFIGURATION_CLASS_FULL);
		}
		else if (config != null || isConfigurationCandidate(metadata)) {
			beanDef.setAttribute(CONFIGURATION_CLASS_ATTRIBUTE, CONFIGURATION_CLASS_LITE);
		}
```


org.springframework.context.annotation.ConfigurationClassParser#doProcessConfigurationClass
		// Process any @PropertySource annotations
		// Process any @ComponentScan annotations











org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider#scanCandidateComponents
ScannedGenericBeanDefinition sbd = new ScannedGenericBeanDefinition(metadataReader);


AbstractBeanDefinition
测试BeanDefinition还没有创建


先加载默认的BeanDefinition

然后在展开，按照类型再次设定





## 一些 Spring 概念的自己理解

- BeanDefinition ：存放 bean 定义相关信息，有点像 java 中的 Class。
- BeanDefinitionRegistry：BeanDefinition 的注册器，由于 ApplicationContext 也实现了 Registry 的接口，所以可以实现为 beanDefinitionMaps 中添加 BeanDefinition 的功能等
- BeanDefinitionHolder：一种在 Spring 源码中便于传递的数据结构，主要属性就是 beanDefinition，beanName，aliases
- BeanPostProcessor：bean 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean 实例化的过程
- BeanFactoryPostProcessor：beanFactory 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean工厂 实例化的过程
- BeanDefinitionRegistryPostProcessor：继承了BeanFactoryPostProcessor，通过扩展方法，可以插手BeanDefinitionRegistry的实例化过程
