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

```java
if (getExecutor() == null) {
    createExecutor();
}
initializeConnectionLatch();
// Start poller thread
poller = new Poller();
Thread pollerThread = new Thread(poller, getName() + "-ClientPoller");
pollerThread.setPriority(threadPriority);
pollerThread.setDaemon(true);
pollerThread.start();
startAcceptorThread();
```

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


## Tomcat 线程池
```java
    public void createExecutor() {
        internalExecutor = true;
        TaskQueue taskqueue = new TaskQueue();
        TaskThreadFactory tf = new TaskThreadFactory(getName() + "-exec-", daemon, getThreadPriority());
        executor = new ThreadPoolExecutor(getMinSpareThreads(), getMaxThreads(), 60, TimeUnit.SECONDS,taskqueue, tf);
        taskqueue.setParent( (ThreadPoolExecutor) executor);
    }
```
在endpoint中，tomcat也启动了线程池。TaskQueue和TaskThreadFactory代表了tomcat自己的定制版任务队列和线程工厂，并且可以限制任务队列的长度，它的最大长度是 maxQueueSize。同时对线程数也有限制，设置了核心线程数（minSpareThreads）和最大线程池数（maxThreads）。

```java
public void execute(Runnable command, long timeout, TimeUnit unit) {
        submittedCount.incrementAndGet();
        try {
            //原生的excute去执行任务。
            super.execute(command);
        } catch (RejectedExecutionException rx) {
            if (super.getQueue() instanceof TaskQueue) {
                final TaskQueue queue = (TaskQueue)super.getQueue();
                try {
                    if (!queue.force(command, timeout, unit)) {
                        submittedCount.decrementAndGet();
                        throw new RejectedExecutionException(sm.getString("threadPoolExecutor.queueFull"));
                    }
                } catch (InterruptedException x) {
                    submittedCount.decrementAndGet();
                    throw new RejectedExecutionException(x);
                }
            } else {
                submittedCount.decrementAndGet();
                throw rx;
            }

        }
    }

```
super.execute(command);原生的java线程池我们主要是
```java
public void execute(Runnable command) {
        if (command == null)
            throw new NullPointerException();
        /*
         * Proceed in 3 steps:
         *
         * 1. If fewer than corePoolSize threads are running, try to
         * start a new thread with the given command as its first
         * task.  The call to addWorker atomically checks runState and
         * workerCount, and so prevents false alarms that would add
         * threads when it shouldn't, by returning false.
         *
         * 2. If a task can be successfully queued, then we still need
         * to double-check whether we should have added a thread
         * (because existing ones died since last checking) or that
         * the pool shut down since entry into this method. So we
         * recheck state and if necessary roll back the enqueuing if
         * stopped, or start a new thread if there are none.
         *
         * 3. If we cannot queue task, then we try to add a new
         * thread.  If it fails, we know we are shut down or saturated
         * and so reject the task.
         */
        int c = ctl.get();
        if (workerCountOf(c) < corePoolSize) {
            if (addWorker(command, true))
                return;
            c = ctl.get();
        }
        if (isRunning(c) && workQueue.offer(command)) {
            int recheck = ctl.get();
            if (! isRunning(recheck) && remove(command))
                reject(command);
            else if (workerCountOf(recheck) == 0)
                addWorker(null, false);
        }
        else if (!addWorker(command, false))
            reject(command);
    }
```
再截取addWorker中的一小段代码
```java
if (wc >= CAPACITY ||
    wc >= (core ? corePoolSize : maximumPoolSize))
    return false;
```
1. 前 corePoolSize 个任务时，来一个任务就创建一个新线程。
2. 再来任务的话，就把任务添加到任务队列里让所有的线程去抢，如果队列满了就创建临时线程。
3. 如果总线程数达到 maximumPoolSize,就执行拒绝策略。
下面这个代码片段就是tomcat的拒绝策略。
```java
private static class RejectHandler implements RejectedExecutionHandler {
        @Override
        public void rejectedExecution(Runnable r,
                java.util.concurrent.ThreadPoolExecutor executor) {
            throw new RejectedExecutionException();
        }

    }
```
只不过tomcat的线程池catch到了这个异常。做了一些其他的操作，类似于我们的一般retry操作。
```java
if (super.getQueue() instanceof TaskQueue) {
    final TaskQueue queue = (TaskQueue)super.getQueue();
    try {
        if (!queue.force(command, timeout, unit)) {
            submittedCount.decrementAndGet();
            throw new RejectedExecutionException(sm.getString("threadPoolExecutor.queueFull"));
        }
    } catch (InterruptedException x) {
        submittedCount.decrementAndGet();
        throw new RejectedExecutionException(x);
    }
} else {
    submittedCount.decrementAndGet();
    throw rx;
}
```
4. 捕获到异常后，则继续尝试把任务添加到任务队列中去，如果缓冲队列也满了，插入失败，执行拒绝策略。

### TaskQueue
TaskQueue 扩展了 Java 中的 LinkedBlockingQueue,并且通过maxQueueSize来设置了构造方法中的参数capacity。使得TaskQueue变成了一个具有有效长度的队列。
```java
    @Override
    // 前提，线程池调用任务队列的方法时，当前线程数肯定已经大于核心线程数了
    public boolean offer(Runnable o) {
      //we can't do any checks
        if (parent==null) return super.offer(o);
        //we are maxed out on threads, simply queue the object
        if (parent.getPoolSize() == parent.getMaximumPoolSize()) return super.offer(o);
        //当前线程数大于核心线程数并且小于最大线程数
        //we have idle threads, just add it to the queue
        if (parent.getSubmittedCount()<=(parent.getPoolSize())) return super.offer(o);
        //if we have less threads than maximum force creation of a new thread
        if (parent.getPoolSize()<parent.getMaximumPoolSize()) return false;
        //if we reached here, we need to add it to the queue
        return super.offer(o);
    }
```
只有当前线程数大于核心线程数、小于最大线程数，并且已提交的任务个数大于当前线程数时，也就是说线程不够用了，但是线程数又没达到极限，才会去创建新的线程。也正是因为这个原因
我们在执行线程的时候才要对submittedCount进行原子增减操，用来维护已经提交的但尚未结束的线程数量。
```java
    /**
     * The number of tasks submitted but not yet finished. This includes tasks
     * in the queue and tasks that have been handed to a worker thread but the
     * latter did not start executing the task yet.
     * This number is always greater or equal to {@link #getActiveCount()}.
     */
    private final AtomicInteger submittedCount = new AtomicInteger(0);
```

## SynchronizedStack
比如 Tomcat请求的数量很多，为了处理单个请求需要创建不少的复杂对象（比如 Tomcat 连接器中 SocketWrapper 和 SocketProcessor），而且一般来说请求处理的时间比较短，一旦请求处理完毕，这些对象就需要被销毁，所以tomcat使用了SynchronizedStack。这个栈中分别定义了synchronized的pop push expend方法，用来获得，添加，以及扩容。 
在多个线程中可以同时对于SynchronizedStack中的对象进行操作，会有一定的同步开销。但如果不使用对象池的话，反复的创建和销毁也会造成比较大的开销。