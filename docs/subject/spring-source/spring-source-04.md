---
title: 利用ImportBeanDefinitionRegistrar.class模拟一个Mybatis的MapperScan小功能
categories:
  - Spring
tags:
  - Spring Framework
date: 2021-01-14
---

之前我们大概了解了一下Spring启动的过程。也知道了关于Sping的Bean的创建，主要在org.springframework.context.annotation.ConfigurationClassParser#doProcessConfigurationClass方法中实现，其中对于@import的解析过程中，一共有三种分歧。
- ImportSelector.class
- ImportBeanDefinitionRegistrar.clas
- 其他普通类
我们知道，我们可以通过applicatonContext的register方法或者scan方法，来插手BeanDefinitionMap的工作。但是我们需要传入的一个class对象，如果是代理对象就无能力为。
通过了解ImportBeanDefinitionRegistrar这个类的用法，通过实现这个接口，可以暴露给外部我们的BeanDefinitionMap，供我们自定义实现对于map的注入，并且也能插手我们由class对象向BeanDefinition对象的过程，并且能处理代理对象。

我们趁热打铁尝试实现一个类似Mybatis的@MapperScan的小功能。 
首先我们知道，我们通过@MapperScan注解设置扫描包之后，可以将我们的Dao接口交给Sping管理，变成一个Sping的bean，之后就可以在Service等组件中被@Autowired导入。

## 通过代理首先将接口转化为对象

```java
public class ImportBeanDefinitionRegistrarInvocationHandler implements InvocationHandler {
	@Override
	public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
		System.out.println("ImportBeanDefinitionRegistrarInvocationHandler");
		return o;
	}
}
```
```java
		ImportBeanDefinitionRegistrarDao o = (ImportBeanDefinitionRegistrarDao) Proxy.newProxyInstance(Liuyang19900520Application.class.getClassLoader(), new Class<?>[]{ImportBeanDefinitionRegistrarDao.class}, new ImportBeanDefinitionRegistrarInvocationHandler());
```
我们执行一下上面代码，发现我么能够打印出来，就说明动态代理对象创建成功了。
## 将生成的对象交给Sping管理
### 将BeanDefinition的beanClass设置为FactoryBean
我们怎么把这个代理对象交给Spring管理呢,这里我们就要用到FactoryBean对象了，通过这个对象，我们可以返回我们的代理对象。也就是说如果我们的BeanDefinition中的类型是FactoryBean的话，就可以实现将我们的Dao接口实例化出一个对象的操作。如果不这样做，我们在BeanDefinition中的beanClass如果还是接口的话，那么我们将无法完成Spring的Bean的实例化。
```java
public class ImportBeanDefinitionRegistrarFactoryBean implements FactoryBean<Object> {
	Class<?> clazz;

	/**
	 * 传递一个class类型，通过这个传递过来的类型，来实现这个多态性。
	 * 使得这个FactoryBean能够对应多个接口，或者说能够创建出多个接口对应的对象的代理对象
	 * 这时候getObject传出的就是得到代理对象
	 *
	 * @param c
	 */
	public ImportBeanDefinitionRegistrarFactoryBean(Class<?> c) {
		this.clazz = c;
	}

	@Override
	public Object getObject() throws Exception {
		//传入class类型
		Class<?>[] classes = new Class<?>[]{clazz};
		//创建代理对象
		Object o = Proxy.newProxyInstance(this.getClass().getClassLoader(), classes, new ImportBeanDefinitionRegistrarInvocationHandler());
		return o;
	}

	@Override
	public Class<?> getObjectType() {
		return clazz;
	}
}
```
```java
	public class ImportBeanDefinitionRegistrarInvocationHandler implements InvocationHandler {
	@Override
	public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
		System.out.println("================ImportBeanDefinitionRegistrarInvocationHandler");
		return null;
	}
}
```
### ImportBeanDefinitionRegistrar来实现BeanDefinition的注册
```java
public class TestImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {

	@Override
	public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
		//定义一个builder，定义为我们需要的这个dao的类型
		BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(ImportBeanDefinitionRegistrarDao.class);
		//获取这个BeanDefinition
		GenericBeanDefinition beanDefinition = (GenericBeanDefinition) beanDefinitionBuilder.getBeanDefinition();
		//我们需要为这个BeanDefinition创建对象时的构造方法上，添加一个参数，这个参数类型是我们要传递给FactoryBean的，实现我们一个FactoryBean，能够对应多个接口的需求
		beanDefinition.getConstructorArgumentValues().addGenericArgumentValue(ImportBeanDefinitionRegistrarDao.class);
		//为BeanDefinition的beanClass设置为我们手写的FactoryBean，这样可以通过getObject方法可到代理对象
		beanDefinition.setBeanClass(ImportBeanDefinitionRegistrarFactoryBean.class);
		//注册到我们的beanMap中
		registry.registerBeanDefinition("liuyang", beanDefinition);
	}
}
```
上面代码的注释已经写清楚了，唯一需要解释的就是为构造方法添加参数这一个地方。 
如果不加参数，那么在创建bean的时候，我们从BeanDefinition取出的beanClass，就可以直接用了。但是我们发现，我们的ImportBeanDefinitionRegistrarFactoryBean需要传入一个Class，作为构造方法的参数，这就是这行代码的作用。

最后简单总结一下，通过上面的方法，我们已经能将接口以类的形式注入到Service中，这个我们的mybatis没什么两样
```java
public class TestService {
	@Autowired
	@Qualifier("liuyang")
	ImportBeanDefinitionRegistrarDao dao;
	
	public void test() {
		if (dao != null) {
			dao.query();
			System.out.println("ok");
		}
	}
}
```
```java
		AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
		annotationConfigApplicationContext.register(TestService.class);
		TestService bean = annotationConfigApplicationContext.getBean(TestService.class);
		bean.test();
```
当我们能够在控制台看到代理方法的日志和ok的时候，说明我们基本实现了mybatis的思路。


## 换个思路BeanDefinitionRegistryPostProcessor

既然我们想插手beanDefinition的创建过程，那么也就是说，只要我们通过实现接口能够得到暴露给我们的BeanDefinitionRegistry registry就可以，那么我们通过BeanDefinitionRegistryPostProcessor接口的
方法也尝试了一下，
```java
@Override
	public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
		//定义一个builder，定义为我们需要的这个dao的类型
		BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(ImportBeanDefinitionRegistrarDao.class);
		//获取这个BeanDefinition
		GenericBeanDefinition beanDefinition = (GenericBeanDefinition) beanDefinitionBuilder.getBeanDefinition();
		//我们需要为这个BeanDefinition创建对象时的构造方法上，添加一个参数，这个参数类型是我们要传递给FactoryBean的，实现我们一个FactoryBean，能够对应多个接口的需求
		beanDefinition.getConstructorArgumentValues().addGenericArgumentValue(ImportBeanDefinitionRegistrarDao.class);
		//为BeanDefinition的beanClass设置为我们手写的FactoryBean，这样可以通过getObject方法可到代理对象
		beanDefinition.setBeanClass(ImportBeanDefinitionRegistrarFactoryBean.class);
		//注册到我们的beanMap中
		registry.registerBeanDefinition("liuyang", beanDefinition);
	}
```
事实证明和上面一样，都实现了我们的设想。






## 一些 Spring 概念的自己理解

- BeanDefinition ：存放 bean 定义相关信息，有点像 java 中的 Class。
- BeanDefinitionRegistry：BeanDefinition 的注册器，由于 ApplicationContext 也实现了 Registry 的接口，所以可以实现为 beanDefinitionMaps 中添加 BeanDefinition 的功能等
- BeanDefinitionHolder：一种在 Spring 源码中便于传递的数据结构，主要属性就是 beanDefinition，beanName，aliases
- BeanPostProcessor：bean 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean 实例化的过程
- BeanFactoryPostProcessor：beanFactory 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean工厂 实例化的过程
- BeanDefinitionRegistryPostProcessor：继承了BeanFactoryPostProcessor，通过扩展方法，可以插手BeanDefinitionRegistry的实例化过程
