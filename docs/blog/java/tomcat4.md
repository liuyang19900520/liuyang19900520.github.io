---
title: Tomcat学习笔记（四）
categories: 
 - Java
tags:
 - Java
 - Tomcat
date: 2021-06-03
---
## 热加载

tomcat通过一个后台线程的不断判断，不断执行周期性任务来判断，是否需要执行热加载。
在StandardEngine的初始化方法中，启动了这个周期性的后台任务。间隔60s。
```java

 // Start our thread
if (backgroundProcessorDelay > 0) {
monitorFuture = Container.getService(ContainerBase.this).getServer()
        .getUtilityExecutor().scheduleWithFixedDelay(
                new ContainerBackgroundProcessorMonitor(), 0, 60, TimeUnit.SECONDS);
}

```
### ContainerBackgroundProcessorMonitor
```java
    protected class ContainerBackgroundProcessorMonitor implements Runnable {
        @Override
        public void run() {
            if (getState().isAvailable()) {
                threadStart();
            }
        }
    }
    protected void threadStart() {
    if (backgroundProcessorDelay > 0
            && (getState().isAvailable() || LifecycleState.STARTING_PREP.equals(getState()))
            && (backgroundProcessorFuture == null || backgroundProcessorFuture.isDone())) {
        if (backgroundProcessorFuture != null && backgroundProcessorFuture.isDone()) {
            // There was an error executing the scheduled task, get it and log it
            try {
                backgroundProcessorFuture.get();
            } catch (InterruptedException | ExecutionException e) {
                log.error(sm.getString("containerBase.backgroundProcess.error"), e);
            }
        }
        backgroundProcessorFuture = Container.getService(this).getServer().getUtilityExecutor()
                .scheduleWithFixedDelay(new ContainerBackgroundProcessor(),
                        backgroundProcessorDelay, backgroundProcessorDelay,
                        TimeUnit.SECONDS);
    }
}
```
### ContainerBackgroundProcessor
看的出来，ContainerBackgroundProcessorMonitor，启动了线程，这回轮到了ContainerBackgroundProcessor来执行任务，间隔时间也变成了我们设置的时间。
```java
    /**
     * Private runnable class to invoke the backgroundProcess method
     * of this container and its children after a fixed delay.
     */
    protected class ContainerBackgroundProcessor implements Runnable {

        @Override
        public void run() {
            processChildren(ContainerBase.this);
        }

        protected void processChildren(Container container) {
            ClassLoader originalClassLoader = null;

            try {
                if (container instanceof Context) {
                    Loader loader = ((Context) container).getLoader();
                    // Loader will be null for FailedContext instances
                    if (loader == null) {
                        return;
                    }

                    // Ensure background processing for Contexts and Wrappers
                    // is performed under the web app's class loader
                    originalClassLoader = ((Context) container).bind(false, null);
                }
                container.backgroundProcess();
                Container[] children = container.findChildren();
                for (Container child : children) {
                    if (child.getBackgroundProcessorDelay() <= 0) {
                        processChildren(child);
                    }
                }
            } catch (Throwable t) {
                ExceptionUtils.handleThrowable(t);
                log.error(sm.getString("containerBase.backgroundProcess.error"), t);
            } finally {
                if (container instanceof Context) {
                    ((Context) container).unbind(false, originalClassLoader);
                }
            }
        }
    }
```
上面的代码我们可以知道，在这个后台线程的run方法里，我们显示执行了当前容器的backgroundProcess方法，然后又循环了所有自容器的backgroundProcess方法。
backgroundProcess方法中，通过fireLifecycleEvent来出发监听器，
```java 

    fireLifecycleEvent(Lifecycle.PERIODIC_EVENT, null);

    protected void fireLifecycleEvent(String type, Object data) {
        LifecycleEvent event = new LifecycleEvent(this, type, data);
        for (LifecycleListener listener : lifecycleListeners) {
            listener.lifecycleEvent(event);
        }
    }
```

### 热加载
对待Context容器，执行下列方法。
```java
    @Override
    public void backgroundProcess() {

        if (!getState().isAvailable())
            return;

        Loader loader = getLoader();
        if (loader != null) {
            try {
                loader.backgroundProcess();
            } catch (Exception e) {
                log.warn(sm.getString(
                        "standardContext.backgroundProcess.loader", loader), e);
            }
        }
        Manager manager = getManager();
        if (manager != null) {
            try {
                manager.backgroundProcess();
            } catch (Exception e) {
                log.warn(sm.getString(
                        "standardContext.backgroundProcess.manager", manager),
                        e);
            }
        }
        WebResourceRoot resources = getResources();
        if (resources != null) {
            try {
                resources.backgroundProcess();
            } catch (Exception e) {
                log.warn(sm.getString(
                        "standardContext.backgroundProcess.resources",
                        resources), e);
            }
        }
        InstanceManager instanceManager = getInstanceManager();
        if (instanceManager != null) {
            try {
                instanceManager.backgroundProcess();
            } catch (Exception e) {
                log.warn(sm.getString(
                        "standardContext.backgroundProcess.instanceManager",
                        resources), e);
            }
        }
        super.backgroundProcess();
    }

```
* WebappLoader:检查 WEB-INF/classes 和 WEB-INF/lib 目录下的类文件
* Manager：检查session
* WebResourceRoot：检查静态资源

在WebappLoader的backgroundProcess方法里，调用了reload()方法。这里面分别将context的声明中期从先停止，再开始。实现了重新加载。
```java
    @Override
    public void backgroundProcess() {
        if (reloadable && modified()) {
            try {
                Thread.currentThread().setContextClassLoader
                    (WebappLoader.class.getClassLoader());
                if (context != null) {
                    context.reload();
                }
            } finally {
                if (context != null && context.getLoader() != null) {
                    Thread.currentThread().setContextClassLoader
                        (context.getLoader().getClassLoader());
                }
            }
        }
    }
```

## tomcat加载器
![0001](/blog/java/tomcat/tomcat6.png =700x480)
我们都知道为了实现tomcat部署多个工程，tomcat打破了java的类加载机制--双亲委派机制。
### java的双亲委派
```java
public abstract class ClassLoader {
 
    // 每个类加载器都有个父加载器
    private final ClassLoader parent;
    
    public Class<?> loadClass(String name) {
  
        // 查找一下这个类是不是已经加载过了
        Class<?> c = findLoadedClass(name);
        
        // 如果没有加载过
        if( c == null ){
          // 先委托给父加载器去加载，注意这是个递归调用
          if (parent != null) {
              c = parent.loadClass(name);
          }else {
              // 如果父加载器为空，查找 Bootstrap 加载器是不是加载过了
              c = findBootstrapClassOrNull(name);
          }
        }
        // 如果父加载器没加载成功，调用自己的 findClass 去加载
        if (c == null) {
            c = findClass(name);
        }
        
        return c；
    }
    
    protected Class<?> findClass(String name){
       //1. 根据传入的类名 name，到在特定目录下去寻找类文件，把.class 文件读入内存
          ...
          
       //2. 调用 defineClass 将字节数组转成 Class 对象
       return defineClass(buf, off, len)；
    }
    
    // 将字节码数组解析成一个 Class 对象，用 native 方法实现
    protected final Class<?> defineClass(byte[] b, int off, int len){
       ...
    }
}
```
我们之前已经在JVM的笔记中记录了，
* BootstrapClassLoader引导类加载器:负责加载支撑JVM运行的位于JRE的lib目录下的核心类库，比如 rt.jar、charsets.jar等
* ExtClassLoader扩展类加载器:负责加载支撑JVM运行的位于JRE的lib目录下的ext扩展目录中的JAR类包
* AppClassLoader应用程序类加载器:负责加载ClassPath路径下的类包，主要就是加载你自己写的那些类
* 自定义加载器:负责加载用户自定义路径下的类包


### WebappClassLoader打破双亲委派
自定义的WebappClassLoader，为每个web应用创建一个。所以每个context容器只维护一个WebAppClassLoader。 
因为不同的类加载器实例加载的类会被认为是不同的类。等于在jvm虚拟机内部为每个web应用创建了隔离空间。

#### find方法
```java
public Class<?> findClass(String name) throws ClassNotFoundException {

        if (log.isDebugEnabled())
            log.debug("    findClass(" + name + ")");

        checkStateForClassLoading(name);

        // (1) Permission to define this class when using a SecurityManager
        if (securityManager != null) {
            int i = name.lastIndexOf('.');
            if (i >= 0) {
                try {
                    if (log.isTraceEnabled())
                        log.trace("      securityManager.checkPackageDefinition");
                    securityManager.checkPackageDefinition(name.substring(0,i));
                } catch (Exception se) {
                    if (log.isTraceEnabled())
                        log.trace("      -->Exception-->ClassNotFoundException", se);
                    throw new ClassNotFoundException(name, se);
                }
            }
        }

        // Ask our superclass to locate this class, if possible
        // (throws ClassNotFoundException if it is not found)
        Class<?> clazz = null;
        try {
            if (log.isTraceEnabled())
                log.trace("      findClassInternal(" + name + ")");
            try {
                if (securityManager != null) {
                    PrivilegedAction<Class<?>> dp =
                        new PrivilegedFindClassByName(name);
                    clazz = AccessController.doPrivileged(dp);
                } else {
                    clazz = findClassInternal(name);
                }
            } catch(AccessControlException ace) {
                log.warn(sm.getString("webappClassLoader.securityException", name,
                        ace.getMessage()), ace);
                throw new ClassNotFoundException(name, ace);
            } catch (RuntimeException e) {
                if (log.isTraceEnabled())
                    log.trace("      -->RuntimeException Rethrown", e);
                throw e;
            }
            if ((clazz == null) && hasExternalRepositories) {
                try {
                    clazz = super.findClass(name);
                } catch(AccessControlException ace) {
                    log.warn(sm.getString("webappClassLoader.securityException", name,
                            ace.getMessage()), ace);
                    throw new ClassNotFoundException(name, ace);
                } catch (RuntimeException e) {
                    if (log.isTraceEnabled())
                        log.trace("      -->RuntimeException Rethrown", e);
                    throw e;
                }
            }
            if (clazz == null) {
                if (log.isDebugEnabled())
                    log.debug("    --> Returning ClassNotFoundException");
                throw new ClassNotFoundException(name);
            }
        } catch (ClassNotFoundException e) {
            if (log.isTraceEnabled())
                log.trace("    --> Passing on ClassNotFoundException");
            throw e;
        }

        // Return the class we have located
        if (log.isTraceEnabled())
            log.debug("      Returning class " + clazz);

        if (log.isTraceEnabled()) {
            ClassLoader cl;
            if (Globals.IS_SECURITY_ENABLED){
                cl = AccessController.doPrivileged(
                    new PrivilegedGetClassLoader(clazz));
            } else {
                cl = clazz.getClassLoader();
            }
            log.debug("      Loaded by " + cl.toString());
        }
        return clazz;

    }

```
1. fclazz = findClassInternal(name); 方法先尝试加载本地目录
2. clazz = super.findClass(name); 本地目录加载不到的情况下交给父类加载
3. 再没有就抛出异常

#### load方法
```java
    public Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {

        synchronized (JreCompat.isGraalAvailable() ? this : getClassLoadingLock(name)) {
            if (log.isDebugEnabled())
                log.debug("loadClass(" + name + ", " + resolve + ")");
            Class<?> clazz = null;

            // Log access to stopped class loader
            checkStateForClassLoading(name);

            // (0) Check our previously loaded local class cache
            clazz = findLoadedClass0(name);
            if (clazz != null) {
                if (log.isDebugEnabled())
                    log.debug("  Returning class from cache");
                if (resolve)
                    resolveClass(clazz);
                return clazz;
            }

            // (0.1) Check our previously loaded class cache
            clazz = JreCompat.isGraalAvailable() ? null : findLoadedClass(name);
            if (clazz != null) {
                if (log.isDebugEnabled())
                    log.debug("  Returning class from cache");
                if (resolve)
                    resolveClass(clazz);
                return clazz;
            }

            // (0.2) Try loading the class with the system class loader, to prevent
            //       the webapp from overriding Java SE classes. This implements
            //       SRV.10.7.2
            String resourceName = binaryNameToPath(name, false);

            ClassLoader javaseLoader = getJavaseClassLoader();
            boolean tryLoadingFromJavaseLoader;
            try {
                // Use getResource as it won't trigger an expensive
                // ClassNotFoundException if the resource is not available from
                // the Java SE class loader. However (see
                // https://bz.apache.org/bugzilla/show_bug.cgi?id=58125 for
                // details) when running under a security manager in rare cases
                // this call may trigger a ClassCircularityError.
                // See https://bz.apache.org/bugzilla/show_bug.cgi?id=61424 for
                // details of how this may trigger a StackOverflowError
                // Given these reported errors, catch Throwable to ensure any
                // other edge cases are also caught
                URL url;
                if (securityManager != null) {
                    PrivilegedAction<URL> dp = new PrivilegedJavaseGetResource(resourceName);
                    url = AccessController.doPrivileged(dp);
                } else {
                    url = javaseLoader.getResource(resourceName);
                }
                tryLoadingFromJavaseLoader = (url != null);
            } catch (Throwable t) {
                // Swallow all exceptions apart from those that must be re-thrown
                ExceptionUtils.handleThrowable(t);
                // The getResource() trick won't work for this class. We have to
                // try loading it directly and accept that we might get a
                // ClassNotFoundException.
                tryLoadingFromJavaseLoader = true;
            }

            if (tryLoadingFromJavaseLoader) {
                try {
                    clazz = javaseLoader.loadClass(name);
                    if (clazz != null) {
                        if (resolve)
                            resolveClass(clazz);
                        return clazz;
                    }
                } catch (ClassNotFoundException e) {
                    // Ignore
                }
            }

            // (0.5) Permission to access this class when using a SecurityManager
            if (securityManager != null) {
                int i = name.lastIndexOf('.');
                if (i >= 0) {
                    try {
                        securityManager.checkPackageAccess(name.substring(0,i));
                    } catch (SecurityException se) {
                        String error = sm.getString("webappClassLoader.restrictedPackage", name);
                        log.info(error, se);
                        throw new ClassNotFoundException(error, se);
                    }
                }
            }

            boolean delegateLoad = delegate || filter(name, true);

            // (1) Delegate to our parent if requested
            if (delegateLoad) {
                if (log.isDebugEnabled())
                    log.debug("  Delegating to parent classloader1 " + parent);
                try {
                    clazz = Class.forName(name, false, parent);
                    if (clazz != null) {
                        if (log.isDebugEnabled())
                            log.debug("  Loading class from parent");
                        if (resolve)
                            resolveClass(clazz);
                        return clazz;
                    }
                } catch (ClassNotFoundException e) {
                    // Ignore
                }
            }

            // (2) Search local repositories
            if (log.isDebugEnabled())
                log.debug("  Searching local repositories");
            try {
                clazz = findClass(name);
                if (clazz != null) {
                    if (log.isDebugEnabled())
                        log.debug("  Loading class from local repository");
                    if (resolve)
                        resolveClass(clazz);
                    return clazz;
                }
            } catch (ClassNotFoundException e) {
                // Ignore
            }

            // (3) Delegate to parent unconditionally
            if (!delegateLoad) {
                if (log.isDebugEnabled())
                    log.debug("  Delegating to parent classloader at end: " + parent);
                try {
                    clazz = Class.forName(name, false, parent);
                    if (clazz != null) {
                        if (log.isDebugEnabled())
                            log.debug("  Loading class from parent");
                        if (resolve)
                            resolveClass(clazz);
                        return clazz;
                    }
                } catch (ClassNotFoundException e) {
                    // Ignore
                }
            }
        }

        throw new ClassNotFoundException(name);
    }

```
1. clazz = findLoadedClass0(name); 查看本地缓存是否已经加载（等于说tomcat的类加载器是否加载）
```java
    protected Class<?> findLoadedClass0(String name) {

        String path = binaryNameToPath(name, true);

        ResourceEntry entry = resourceEntries.get(path);
        if (entry != null) {
            return entry.loadedClass;
        }
        return null;
    }
```
2. findLoadedClass(name); 判断系统的类加载器是否加载过
3. clazz = javaseLoader.loadClass(name); 让ExtClassLoader去加载这个类，防止自己应用的类去覆盖jre的核心类。
4. clazz = findClass(name); 如果没有加载到，说明这个类不属于jre核心类，就在该应用的目录下去加载。
5. clazz = Class.forName(name, false, parent);Web 应用是通过Class.forName调用交给系统类加载器的，因为Class.forName的默认加载器就是系统类加载器。
6. 如都加载失败，抛出异常。

### SharedClassLoader
负责两个 Web 应用之间怎么共享库类，如果我们多个web应用需要加载共同的类，就需要在这个类加载器的下指定目录。

### CatalinaClassloader
tomcat本身也是一个java应用程序，CatalinaClassloader专门负责加载tomcat自身的类。来隔离 Tomcat 本身的类和 Web 应用的类。

### CommonClassLoader
这个类作为SharedClassLoader和CatalinaClassloader的父类，也就是说，可以共享加载tomcat和应用之间的类。

### contextClassLoader
如果我们有一些共同的类需要在各个应用中共享，但由于JVM机制，如果一个类由类加载器 A 加载，那么这个类的依赖类也是由相同的类加载器加载。例如Spring的类和业务类。
会把业务类也通过SharedClassLoader来进行加载，上下文加载器保存在线程私有数据里，只要是同一个线程，一旦设置了线程上下文加载器，在线程后续执行过程中就能把这个类加载器取出来用。
所以当Spring启动，需要加载业务类的时候，就会在私有线程里把业务类取出来并去WebappClassLoader指定的路径来加载。







