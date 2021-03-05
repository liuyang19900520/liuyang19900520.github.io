
```java
		do {
			StartupStep processConfig = this.applicationStartup.start("spring.context.config-classes.parse");
			parser.parse(candidates);
			parser.validate();

			Set<ConfigurationClass> configClasses = new LinkedHashSet<>(parser.getConfigurationClasses());
			configClasses.removeAll(alreadyParsed);

			// Read the model and create bean definitions based on its content
			if (this.reader == null) {
				this.reader = new ConfigurationClassBeanDefinitionReader(
						registry, this.sourceExtractor, this.resourceLoader, this.environment,
						this.importBeanNameGenerator, parser.getImportRegistry());
			}
			this.reader.loadBeanDefinitions(configClasses);
			alreadyParsed.addAll(configClasses);
			processConfig.tag("classCount", () -> String.valueOf(configClasses.size())).end();

			candidates.clear();
			if (registry.getBeanDefinitionCount() > candidateNames.length) {
				String[] newCandidateNames = registry.getBeanDefinitionNames();
				Set<String> oldCandidateNames = new HashSet<>(Arrays.asList(candidateNames));
				Set<String> alreadyParsedClasses = new HashSet<>();
				for (ConfigurationClass configurationClass : alreadyParsed) {
					alreadyParsedClasses.add(configurationClass.getMetadata().getClassName());
				}
				for (String candidateName : newCandidateNames) {
					if (!oldCandidateNames.contains(candidateName)) {
						BeanDefinition bd = registry.getBeanDefinition(candidateName);
						if (ConfigurationClassUtils.checkConfigurationClassCandidate(bd, this.metadataReaderFactory) &&
								!alreadyParsedClasses.contains(bd.getBeanClassName())) {
							candidates.add(new BeanDefinitionHolder(bd, candidateName));
						}
					}
				}
				candidateNames = newCandidateNames;
			}
		}
		while (!candidates.isEmpty());
```

还是回到org.springframework.context.annotation.ConfigurationClassPostProcessor#processConfigBeanDefinitions方法中来。当我们完成了parse解析方法后，
已经实现了部分BeanDefinition的注册，比如标注了@ComponentScan注解中的basepackage属性下目录的类。但是关于@Import解析的类，并没有在parse中实现注册，而是在	
this.reader.loadBeanDefinitions(configClasses); 
这一行代码中实现。
因为之前我们的解析@Import注解是，将解析出的类分别放入了map中，在上述方法中，实现了注册。
```java
	private void loadBeanDefinitionsFromRegistrars(Map<ImportBeanDefinitionRegistrar, AnnotationMetadata> registrars) {
		registrars.forEach((registrar, metadata) ->
				registrar.registerBeanDefinitions(metadata, this.registry, this.importBeanNameGenerator));
	}
```
## 一些 Spring 概念的自己理解

- BeanDefinition ：存放 bean 定义相关信息，有点像 java 中的 Class。
- BeanDefinitionRegistry：BeanDefinition 的注册器，由于 ApplicationContext 也实现了 Registry 的接口，所以可以实现为 beanDefinitionMaps 中添加 BeanDefinition 的功能等
- BeanDefinitionHolder：一种在 Spring 源码中便于传递的数据结构，主要属性就是 beanDefinition，beanName，aliases
- BeanPostProcessor：bean 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean 实例化的过程
- BeanFactoryPostProcessor：beanFactory 后置处理器，可以通过实例化 BeanPostProcessor 接口，插手 bean工厂 实例化的过程
- BeanDefinitionRegistryPostProcessor：继承了BeanFactoryPostProcessor，通过扩展方法，可以插手BeanDefinitionRegistry的实例化过程
