---
title: BeanFactory创建过程的个人理解（二）
categories:
  - Spring
tags:
  - Spring Framework
date: 2021-01-20
---
还是回到org.springframework.context.annotation.ConfigurationClassPostProcessor#processConfigBeanDefinitions方法中来。当我们完成了parse解析方法后，
已经可以实现

## 一些 Spring 概念的自己理解

- BeanDefinition ：存放 bean 定义相关信息，有点像 java 中的 Class。
- BeanDefinitionRegistry：BeanDefinition 的注册器，由于 ApplicationContext 也实现了 Registry 的接口，所以可以实现为 beanDefinitionMaps 中添加 BeanDefinition 的功能等
- BeanDefinitionHolder：一种在 Spring 源码中便于传递的数据结构，主要属性就是 beanDefinition，beanName，aliases
- BeanPostProcessor：bean 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean 实例化的过程
- BeanFactoryPostProcessor：beanFactory 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean工厂 实例化的过程
- BeanDefinitionRegistryPostProcessor：继承了BeanFactoryPostProcessor，通过扩展方法，可以插手BeanDefinitionRegistry的实例化过程
