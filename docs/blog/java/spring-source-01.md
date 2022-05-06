---
title: Spring的启动过程（一）
categories:
  - Spring
tags:
  - Spring Framework
date: 2021-01-05
---

当我们导入 Spring 源码之后，我们添加了一个新的 module 负责测试，于是我写了一个十分简单代码如下：

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

通过执行我们是可以在控制台打印出预期 query 的。我们就要简单分析一下 Spring 的启动过程。每个阶段我们挑一些有代表性的工作来理解一下就。

```java
	public AnnotationConfigApplicationContext(Class<?>... componentClasses) {
		this();
		register(componentClasses);
		refresh();
	}
```

## 实例化 AnnotationConfigApplicationContext

### AnnotationConfigApplicationContext 的父类 GenericApplicationContext 创建了什么

```java
private final DefaultListableBeanFactory beanFactory;
public GenericApplicationContext() {
		this.beanFactory = new DefaultListableBeanFactory();
	}
```

在 GenericApplicationContext 实例化的时候，创建了我们的 beanFactory 工厂，这个工厂也将是我们 Spring 启动过程中最重要的属性之一

### DefaultListableBeanFactory 中几个重要属性

```java
public class DefaultListableBeanFactory extends AbstractAutowireCapableBeanFactory
		implements ConfigurableListableBeanFactory, BeanDefinitionRegistry, Serializable {

			/** Map of bean definition objects, keyed by bean name. */
			private final Map<String, BeanDefinition> beanDefinitionMap = new ConcurrentHashMap<>(256);

			/** List of bean definition names, in registration order. */
			private volatile List<String> beanDefinitionNames = new ArrayList<>(256);

		}
```
beanDefinitionMap 以 map 的结构，存放 BeanName，BeanDefinition，而 beanDefinitionNames 则以 list 的形式存放所有 BeanDefinition 的 name。

## 实例化 AnnotatedBeanDefinitionReader

这个 reader 可以将我们普通的 Class 转化成 Spring 的 BeanDefinition
```java 
	public AnnotatedBeanDefinitionReader(BeanDefinitionRegistry registry, Environment environment) {
		Assert.notNull(registry, "BeanDefinitionRegistry must not be null");
		Assert.notNull(environment, "Environment must not be null");
		this.registry = registry;
		this.conditionEvaluator = new ConditionEvaluator(registry, environment, null);
		AnnotationConfigUtils.registerAnnotationConfigProcessors(this.registry);
	}
```
### BeanDefinitionRegistry从哪里来
在实例化的过程中，这里的一个参数BeanDefinitionRegistry registry，在我们AnnotationConfigApplicationContext中传入的是this，我们回到AnnotationConfigApplicationContext的代码中发现，
```java
public class AnnotationConfigApplicationContext extends GenericApplicationContext implements AnnotationConfigRegistry 
```
也就是说明，我们ApplicationContext环境也是一个BeanDefinitionRegistry。
### reader实例化的初始化操作
如果我们一路追踪，就能得到org.springframework.context.annotation.AnnotationConfigUtils#registerAnnotationConfigProcessors(org.springframework.beans.factory.support.BeanDefinitionRegistry, java.lang.Object)这个方法。这里主要负责了初始化操作

```java
	public static Set<BeanDefinitionHolder> registerAnnotationConfigProcessors(
			BeanDefinitionRegistry registry, @Nullable Object source) {

		DefaultListableBeanFactory beanFactory = unwrapDefaultListableBeanFactory(registry);
		if (beanFactory != null) {
			if (!(beanFactory.getDependencyComparator() instanceof AnnotationAwareOrderComparator)) {
				beanFactory.setDependencyComparator(AnnotationAwareOrderComparator.INSTANCE);
			}
			if (!(beanFactory.getAutowireCandidateResolver() instanceof ContextAnnotationAutowireCandidateResolver)) {
				beanFactory.setAutowireCandidateResolver(new ContextAnnotationAutowireCandidateResolver());
			}
		}

		Set<BeanDefinitionHolder> beanDefs = new LinkedHashSet<>(8);

		if (!registry.containsBeanDefinition(CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME)) {
			RootBeanDefinition def = new RootBeanDefinition(ConfigurationClassPostProcessor.class);
			def.setSource(source);
			beanDefs.add(registerPostProcessor(registry, def, CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME));
		}

		if (!registry.containsBeanDefinition(AUTOWIRED_ANNOTATION_PROCESSOR_BEAN_NAME)) {
			RootBeanDefinition def = new RootBeanDefinition(AutowiredAnnotationBeanPostProcessor.class);
			def.setSource(source);
			beanDefs.add(registerPostProcessor(registry, def, AUTOWIRED_ANNOTATION_PROCESSOR_BEAN_NAME));
		}

		// Check for JSR-250 support, and if present add the CommonAnnotationBeanPostProcessor.
		if (jsr250Present && !registry.containsBeanDefinition(COMMON_ANNOTATION_PROCESSOR_BEAN_NAME)) {
			RootBeanDefinition def = new RootBeanDefinition(CommonAnnotationBeanPostProcessor.class);
			def.setSource(source);
			beanDefs.add(registerPostProcessor(registry, def, COMMON_ANNOTATION_PROCESSOR_BEAN_NAME));
		}

		// Check for JPA support, and if present add the PersistenceAnnotationBeanPostProcessor.
		if (jpaPresent && !registry.containsBeanDefinition(PERSISTENCE_ANNOTATION_PROCESSOR_BEAN_NAME)) {
			RootBeanDefinition def = new RootBeanDefinition();
			try {
				def.setBeanClass(ClassUtils.forName(PERSISTENCE_ANNOTATION_PROCESSOR_CLASS_NAME,
						AnnotationConfigUtils.class.getClassLoader()));
			}
			catch (ClassNotFoundException ex) {
				throw new IllegalStateException(
						"Cannot load optional framework class: " + PERSISTENCE_ANNOTATION_PROCESSOR_CLASS_NAME, ex);
			}
			def.setSource(source);
			beanDefs.add(registerPostProcessor(registry, def, PERSISTENCE_ANNOTATION_PROCESSOR_BEAN_NAME));
		}

		if (!registry.containsBeanDefinition(EVENT_LISTENER_PROCESSOR_BEAN_NAME)) {
			RootBeanDefinition def = new RootBeanDefinition(EventListenerMethodProcessor.class);
			def.setSource(source);
			beanDefs.add(registerPostProcessor(registry, def, EVENT_LISTENER_PROCESSOR_BEAN_NAME));
		}

		if (!registry.containsBeanDefinition(EVENT_LISTENER_FACTORY_BEAN_NAME)) {
			RootBeanDefinition def = new RootBeanDefinition(DefaultEventListenerFactory.class);
			def.setSource(source);
			beanDefs.add(registerPostProcessor(registry, def, EVENT_LISTENER_FACTORY_BEAN_NAME));
		}

		return beanDefs;
	}
```
#### 第一步，拿到beanFactory
1. 首先拿到一个beanFactory，这里的beanFactory工厂的来源，一般情况下可以理解为在父类创建过程中创建的DefaultListableBeanFactory
2. 为beanFactory设置一些属性，比如排序比较器和解析器等（具体内容不深入看了，先理解Spring启动过程为主）

#### 第二步，为beanDefinitionMap添加各类BeanDefinition
我们以下面的代码为例
```java
		Set<BeanDefinitionHolder> beanDefs = new LinkedHashSet<>(8);
		if (!registry.containsBeanDefinition(CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME)) {
			RootBeanDefinition def = new RootBeanDefinition(ConfigurationClassPostProcessor.class);
			def.setSource(source);
			beanDefs.add(registerPostProcessor(registry, def, CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME));
		}
```
1. 通过BeanDefinition的实例化，讲一个普通的Class转化为BeanDefinition。我们先不展开看了，大致可以猜测到，应该就是吧Class的一些属性抓为了BeanDefinition，同时又增加了一些BeanDefinition自己的。
2. 通过追溯，我们知道是通过registry.registerBeanDefinition(beanName, definition);实现Registry的注册BeanDefinition的操作的，而registry.registerBeanDefinition其实就是调用ApplicationContext环境中的registerBeanDefinition方法，下面就是GenericApplicationContext(即上文所说初始化的父类)中的事例代码：
```java
	@Override
	public void registerBeanDefinition(String beanName, BeanDefinition beanDefinition)
			throws BeanDefinitionStoreException {

		this.beanFactory.registerBeanDefinition(beanName, beanDefinition);
	}
```
这里beanFactory的方法再深入下去，就会找到org.springframework.beans.factory.support.DefaultListableBeanFactory#registerBeanDefinition方法，里面的操作确实有一些，比如判断重复，判断是否在创建中等等，但核心就是下面两句
```java
this.beanDefinitionMap.put(beanName, beanDefinition);
this.beanDefinitionNames.add(beanName);
```
这也是我们刚才在父类创建beanFactory所记录的2个重要属性。 
所以这第二步的核心就是为beanDefinitionMap添加各类BeanDefinition，这里面添加了6个BeanDefinition，后续如果有机会我们可以逐个分析一下。 
这里我们可以标注一下ConfigurationClassPostProcessor.class，以后可能会遇得到。到这里我们的reader就创建完了了。

## 实例化 ClassPathBeanDefinitionScanner
ClassPathBeanDefinitionScanner，能够扫描一个类，并且转换成BeanDefinition。这里知识对着个scanner进行实例化。 
这个scanner主要是向外部暴露一个方法，供用户自己实现扫描。而扫描包的工作，并不是这个scanner完成的。

## 一些 Spring 概念的自己理解

- BeanDefinition ：存放 bean 定义相关信息，有点像 java 中的 Class。
- BeanDefinitionRegistry：BeanDefinition的注册器，由于ApplicationContext也实现了Registry的接口，所以可以实现为beanDefinitionMaps中添加BeanDefinition的功能等