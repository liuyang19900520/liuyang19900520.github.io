---
title: 从Spring源码模拟一个MapperScan的小功能
categories:
  - Spring
tags:
  - Spring Framework
date: 2021-01-14
---

之前我们大概了解了一下Spring启动的过程。
我们趁热打铁尝试实现一个类似Mybatis的MapperScan的小功能。




## 一些 Spring 概念的自己理解

- BeanDefinition ：存放 bean 定义相关信息，有点像 java 中的 Class。
- BeanDefinitionRegistry：BeanDefinition 的注册器，由于 ApplicationContext 也实现了 Registry 的接口，所以可以实现为 beanDefinitionMaps 中添加 BeanDefinition 的功能等
- BeanDefinitionHolder：一种在 Spring 源码中便于传递的数据结构，主要属性就是 beanDefinition，beanName，aliases
- BeanPostProcessor：bean 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean 实例化的过程
- BeanFactoryPostProcessor：beanFactory 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean工厂 实例化的过程
- BeanDefinitionRegistryPostProcessor：继承了BeanFactoryPostProcessor，通过扩展方法，可以插手BeanDefinitionRegistry的实例化过程
