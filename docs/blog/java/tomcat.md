---
title: Tomcat学习笔记（一）
categories: 
 - Java
tags:
 - Java
 - Tomcat
date: 2021-05-01
---

## Tomcat 总体架构
![0001](/blog/java/tomcat/tomcat1.png =700x480)
#### Server
Server是最顶级的组件，它代表Tomcat的运行实例，在一个JVM中只会包含一个Server。在Server的整个生命周期中，不同的阶段会有不同的事情需要完成，为了方便扩展，它引入了监听器的方式，所以它包含了Listener组件。另外，为了方便在Tomcat中集成JNDI，引入了GlobalNamingResources组件。同时，还包含了Service核心组件；
#### Service
Service组件是服务的抽象，它代表请求从接收到处理的所有的组合的集合。 
Server组件可以包含多个Service组件，每个Service组件都包含了若干用于接收客户端消息的Connector组件和处理请求的Engine组件。其中，不同的Connector组件使用不同的通信协议，如HTTP协议和AJP协议，此外，Service组件还包含若干Executor组件，每个Executor都是一个连接池，它可以为Service内部所有的组件提供线程池执行任务；


* 处理 Socket 连接，负责网络字节流与 Request 和 Response 对象的转化。也就是连接器。
* 加载和管理 Servlet，以及具体处理 Request 请求。也就是容器



### 连接器
* 网络通信。即EndPoint。
* 应用层协议解析。Processor。
* Tomcat Request/Response 与 ServletRequest/ServletResponse 的转化。Adapter。

其中 Endpoint 和 Processor 放在一起抽象成了 ProtocolHandler 组件
![0003](/blog/java/tomcat/tomcat3.png =700x320)

#### EndPoint
EndPoint 是通信端点，即通信监听的接口，是具体的 Socket 接收和发送处理器，是对传输层的抽象，因此 EndPoint 是用来实现 TCP/IP 协议的。我们以NioEndpoint为例子，有两个重要的子组件：Acceptor 和 SocketProcessor。
其中 Acceptor 用于监听 Socket 连接请求。SocketProcessor 用于处理接收到的 Socket 请求，它实现 Runnable 接口，在 Run 方法里调用协议处理组件 Processor 进行处理。为了提高处理能力，SocketProcessor 被提交到线程池来执行。

#### Processor
Processor 用来实现 HTTP 协议，Processor 接收来自 EndPoint 的 Socket，读取字节流解析成 Tomcat Request 和 Response 对象，并通过 Adapter 将其提交到容器处理，Processor 是对应用层协议的抽象。

#### Adapter
作为适配器，我们可以把它理解为连接连接器和容器的桥梁。连接器调用 CoyoteAdapter 的 Sevice 方法，传入的是 Tomcat Request 对象，CoyoteAdapter 负责将 Tomcat Request 转成 ServletRequest，再调用容器的 Service 方法。

对于连接器这一部分来说，EndPoint 接收到 Socket 连接后，生成一个 SocketProcessor 任务提交到线程池去处理，SocketProcessor 的 Run 方法会调用 Processor 组件去解析应用层协议，Processor 通过解析生成 Request 对象后，会调用 Adapter 的 Service 方法。


### 容器
Context 表示一个 Web 应用程序；Wrapper 表示一个 Servlet，一个 Web 应用程序中可能会有多个 Servlet；Host 代表的是一个虚拟主机，或者说一个站点，可以给 Tomcat 配置多个虚拟主机地址，而一个虚拟主机下可以部署多个 Web 应用程序；Engine 表示引擎，用来管理多个虚拟站点，一个 Service 最多只能有一个 Engine。
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

### 责任链模式
在各个容器启动的过程中，Tomcat利用了责任链模式，在一个请求处理的过程中有很多处理者依次对请求进行处理，每个处理者负责做自己相应的处理，处理完之后将再调用下一个处理者继续处理。
以Context传递Wrapper的部分为例。
```java
在容器实例化的时候，为责任链练剑了BasicValue。
public StandardContext() {

        super();
        pipeline.setBasic(new StandardContextValve());
        broadcaster = new NotificationBroadcasterSupport();
        // Set defaults
        if (!Globals.STRICT_SERVLET_COMPLIANCE) {
            // Strict servlet compliance requires all extension mapped servlets
            // to be checked against welcome files
            resourceOnlyServlets.add("jsp");
        }
    }
```
在StandardContextValve的ivoke方法中，直接调用了wrapper.getPipeline().getFirst()来执行，实现实例化各个容器的目的。
```java
wrapper.getPipeline().getFirst().invoke(request, response);
```
