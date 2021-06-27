---
title: Tomcat学习笔记（三）
categories: 
 - Java
tags:
 - Java
 - Tomcat
date: 2021-05-26
---

## Jaav I/O模型
当用户线程发起 I/O 操作后，网络数据读取操作会经历两个步骤：
1. 用户线程等待内核将数据从网卡拷贝到内核空间。
2. 内核将数据从内核空间拷贝到用户空间。

* 同步阻塞：用户线程发起 read 调用后就阻塞了，让出 CPU。内核等待网卡数据到来，把数据从网卡拷贝到内核空间，接着把数据拷贝到用户空间，再把用户线程叫醒。
* 同步非阻塞 I/O：用户线程不断的发起 read 调用，数据没到内核空间时，每次都返回失败，直到数据到了内核空间，这一次 read 调用后，在等待数据从内核空间拷贝到用户空间这段时间里，线程还是阻塞的，等数据到了用户空间再把线程叫醒。
* I/O 多路复用：用户线程的读取操作分成两步了，线程先发起 select 调用，目的是问内核数据准备好了吗？等内核把数据准备好了，用户线程再发起 read 调用。在等待数据从内核空间拷贝到用户空间这段时间里，线程还是阻塞的。那为什么叫 I/O 多路复用呢？因为一次 select 调用可以向内核查多个数据通道（Channel）的状态，所以叫多路复用。
* 异步 I/O：用户线程发起 read 调用的同时注册一个回调函数，read 立即返回，等内核将数据准备好后，再调用指定的回调函数完成处理。在这个过程中，用户线程一直没有阻塞。

## NioEndpoint 组件
![0001](/blog/java/tomcat/tomcat4.png =700x480)

1. 创建Selector，注册事件。
2. 事件发生，创建线程从Channel中读数据。

### LimitLatch
主要负责最大连接数，当连接数到达最大时阻塞线程，直到后续组件处理完一个连接后将连接数减 1。请你注意到达最大连接数后操作系统底层还是会接收客户端连接，但用户层已经不再接收。
关于并发的部分，我们可以看到内部类 Sync扩展了AbstractQueuedSynchronizer，用他来控制线程的堵塞和唤醒。

### Acceptor
主要负责Acceptor 用于监听 Socket 连接请求。其实也很好理解，因为Accepptor实现Runnable接口，运行在一个单独的线程里。在Endpoint的startInternal方法中实现了启动。
```java
    protected void startAcceptorThread() {
        acceptor = new Acceptor<>(this);
        String threadName = getName() + "-Acceptor";
        acceptor.setThreadName(threadName);
        Thread t = new Thread(acceptor, threadName);
        t.setPriority(getAcceptorThreadPriority());
        t.setDaemon(getDaemon());
        t.start();
    }
```
一个端口号对应一个ServerSocketChannel，我们可以理解为acceptor就是负责结接受这个socket的，而在Acceptor的run方法中，
```java
 socket = endpoint.serverSocketAccept();
```
ServerSocketChannel 通过 accept() 接受新的连接，accept() 方法返回获得 SocketChannel 对象，然后将 SocketChannel 对象封装在一个 PollerEvent 对象中，并将 PollerEvent 对象压入 Poller 的 Queue 里，这是个典型的生产者 - 消费者模式，Acceptor 与 Poller 线程之间通过 Queue 通信。

### Pooler
Poller 不断的通过内部的 Selector 对象向内核查询 Channel 的状态，一旦可读就生成任务类 SocketProcessor 交给 Executor 去处理。Poller 的另一个重要任务是循环遍历检查自己所管理的 SocketChannel 是否已经超时，如果有超时就关闭这个 SocketChannel。

### SocketProcessor
Poller 会创建 SocketProcessor 任务类交给线程池处理，而 SocketProcessor 实现了 Runnable 接口，用来定义 Executor 中线程所执行的任务，主要就是调用 Http11Processor 组件来处理请求。Http11Processor 读取 Channel 的数据来生成 ServletRequest 对象。 
Http11Processor 并不是直接读取 Channel 的，而是从一个tomcat自定义的包装类SocketWrapper中获取的。

