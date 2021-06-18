---
title: Tomcat学习笔记
categories: 
 - Java
tags:
 - Java
 - Tomcat
date: 2021-05-01
---

## Tomcat 总体架构
* 处理 Socket 连接，负责网络字节流与 Request 和 Response 对象的转化。也就是连接器。
* 加载和管理 Servlet，以及具体处理 Request 请求。也就是容器

### 连接器
* 网络通信。即EndPoint。
* 应用层协议解析。Processor。
* Tomcat Request/Response 与 ServletRequest/ServletResponse 的转化。Adapter。

其中 Endpoint 和 Processor 放在一起抽象成了 ProtocolHandler 组件
![0003](/blog/java/tomcat/tomcat3.png =700x320)
### 容器

## Tomcat启动的分析
### Tomcat各组件
![0001](/blog/java/tomcat/tomcat1.png =700x480)

#### Server
Server是最顶级的组件，它代表Tomcat的运行实例，在一个JVM中只会包含一个Server。在Server的整个生命周期中，不同的阶段会有不同的事情需要完成，为了方便扩展，它引入了监听器的方式，所以它包含了Listener组件。另外，为了方便在Tomcat中集成JNDI，引入了GlobalNamingResources组件。同时，还包含了Service核心组件；

#### Service
Service组件是服务的抽象，它代表请求从接收到处理的所有的组合的集合。 
Server组件可以包含多个Service组件，每个Service组件都包含了若干用于接收客户端消息的Connector组件和处理请求的Engine组件。其中，不同的Connector组件使用不同的通信协议，如HTTP协议和AJP协议，此外，Service组件还包含若干Executor组件，每个Executor都是一个连接池，它可以为Service内部所有的组件提供线程池执行任务；

#### Connector
Connector组件主要职责就是接收客户端连接并接收消息报文，消息报文经由它解析之后送往容器中处理。 
因为不在不同的通信协议，所以每个协议对应一种Connector组件。目前Tomcat包含HTTP和AJP两种协议的Connector；

Tomcat内部有4个级别的容器，分别是：Engine、Host、Context和Wrapper。
#### Engine容器
Engine代表全局Servlet引擎，每个Service组件只能包含一个Engine容器组件，但是Engine组件可以包含若干Host容器组件。
* Listener组件：完成相关监听工作；
* AccessLog组件：客户端的访问日志，所有客户端访问都会被记录
* Cluster组件：提供集群功能，可以将Engine容器需要共享的数据同步到集群中的其他Tomcat实例上；
* Pipeline组件：Engine容器对请求进行管道处理；
* Realm组件：提供了Engine容器级别的用户-密码-权限的数据对象，配合资源认证模块使用；

#### Host容器
Host组件代表虚拟主机，这些虚拟主机可以存放若干Web应用的抽象（Context容器）

#### Context容器
Context组件四是Web应用的抽象，web应用程序部署到Tomcat后运行时就会转化为Context对象。它包含了各种静态资源、若干Servlet（Wrapper容器）以及各种动态资源；

#### Wrapper容器
Wrapper容器是Tomcat4个容器级别中最小的，与之相应的是Servlet一个Wrapper对应一个Servlet。




### Tomcat启动流程
![0001](/blog/java/tomcat/tomcat2.png =700x480)

#### 解析Server.xml
这个过程就是吧xml文件的节点完全转换成Java对象

#### Catalina启动中的setAwait
在这张图上我们，Catilina的启动中，我们进行了setAwait(ture);的设置
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

#### tomcat的生命周期
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




感谢[https://blog.csdn.net/qq_36807862/category_7889764.html?spm=1001.2014.3001.5482](一念成佛_LHY Tomcat内核详解)
