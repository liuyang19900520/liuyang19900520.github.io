---
title: Tomcat学习笔记（二）
categories: 
 - Java
tags:
 - Java
 - Tomcat
date: 2021-05-13
---

## Tomcat启动分析
### Tomcat启动流程
![0001](/blog/java/tomcat/tomcat2.png =700x480)

### LifeCycle 接口
在LifeCycle中定义了生命周期的方法
* addLifecycleListener
* findLifecycleListeners
* removeLifecycleListener
* init
* start
* stop
* destroy
* getState
* getStateName

### LifeCycleBase 抽象类
以init()方法为例，把一些公共的逻辑放到基类中去，比如生命状态的转变与维护、生命事件的触发以及监听器的添加和删除等，而子类就负责实现自己的初始化、启动和停止等方法。为了避免跟基类中的方法同名，我们把具体子类的实现方法改个名字，在后面加上 Internal，叫 initInternal()。 
而在基类中的setStateInternal(LifecycleState.INITIALIZING, null, false);和setStateInternal(LifecycleState.INITIALIZED, null, false);则是负责设置监听器，来实现声明周期状态转变的配置。从而在监听器中进行相应的业务配置。如果需要定义监听器可以通过server.xml来进行。
```java
    public final synchronized void init() throws LifecycleException {
        if (!state.equals(LifecycleState.NEW)) {
            invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
        }

        try {
            setStateInternal(LifecycleState.INITIALIZING, null, false);
            initInternal();
            setStateInternal(LifecycleState.INITIALIZED, null, false);
        } catch (Throwable t) {
            handleSubClassException(t, "lifecycleBase.initFail", toString());
        }
    }
```

### LifeCycleState
1. NEW(false, null),
2. INITIALIZING(false, Lifecycle.BEFORE_INIT_EVENT)
3. INITIALIZED(false, Lifecycle.AFTER_INIT_EVENT)
4. STARTING_PREP(false, Lifecycle.BEFORE_START_EVENT)
5. STARTING(true, Lifecycle.START_EVENT)
6. STARTED(true, Lifecycle.AFTER_START_EVENT)
7. STOPPING_PREP(true, Lifecycle.BEFORE_STOP_EVENT)
8. STOPPING(false, Lifecycle.STOP_EVENT)
9. STOPPED(false, Lifecycle.AFTER_STOP_EVENT)
10. DESTROYING(false, Lifecycle.BEFORE_DESTROY_EVENT)∂
11. DESTROYED(false, Lifecycle.AFTER_DESTROY_EVENT)
12. FAILED(false, null)




## Tomcat启动分工
### Bootstrap
初始化 Tomcat 的类加载器，并且创建 Catalina。

### Catalina
是一个启动类，它通过解析 server.xml、创建相应的组件，并调用 Server 的 start 方法。
* Catalina启动中的setAwait
Catilina的启动中，我们进行了setAwait(ture);的设置
```java
    public void setAwait(boolean await)
        throws Exception {

        Class<?> paramTypes[] = new Class[1];
        paramTypes[0] = Boolean.TYPE;
        Object paramValues[] = new Object[1];
        paramValues[0] = Boolean.valueOf(await);
        Method method =
            catalinaDaemon.getClass().getMethod("setAwait", paramTypes);
        method.invoke(catalinaDaemon, paramValues);
    }
```
这个方法设置的值（true或false），是留给后面用的。当通过后面的start()方法启动完服务器后，会检查这个值为true还是false，如果为true，调用Catlina的await()方法，tomcat继续开着。如果为false，则调用Catlina的stop()方法，关闭tomcat。

### Server 
组件负责调用Service组件的start方法。可以说完全对应一个server.xml的java容器。 
同时启动一个 Socket 来监听停止端口，Caralina 的启动方法的最后一行代码就是调用了 Server 的 await 方法。


### Service
Service 组件的职责就是管理连接器和顶层容器 Engine，因此它会调用连接器和 Engine 的 start 方法。
因为 Tomcat 支持热部署，当 Web 应用的部署发生变化时，Mapper 中的映射信息也要跟着变化，MapperListener 就是一个监听器，它监听容器的变化，并把信息更新到 Mapper 中。而这个Mapper，当一个请求到来时，Mapper 组件通过解析请求 URL 里的域名和路径，再到自己保存的 Map 里去查找，就能定位到一个 Servlet。 
Service 先启动了 Engine 组件，再启动 Mapper 监听器，最后才是启动连接器。内层组件启动好了才能对外提供服务，才能启动外层的连接器组件。而 Mapper 也依赖容器组件，容器组件启动好了才能监听它们的变化，因此 Mapper 和 MapperListener 在容器组件之后启动。

### Engine
StandardEngine集成了的ContainerBase里，用 HashMap 保存了它的子容器，并且 ContainerBase 还实现了子容器的操作方法.例如add，remove等等。 
同时和之前介绍的一样，我们知道每一个容器组件都有一个 Pipeline，而 Pipeline 中有一个基础阀（Basic Valve），来进行各个层级的容器启动。







