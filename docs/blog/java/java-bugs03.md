---
title: 零散的Java知识记录 3
categories: 
 - Java
tags:
 - Java
date: 2021-11-19
---

## List操作
### Arrays.asList
* 不能直接使用 Arrays.asList 来转换基本类型数组。
* Arrays.asList 返回的 List 不支持增删操作。
* 对原始数组的修改会影响到我们获得的那个 List。

### List.subList
* 使用subList操作的数据源无法得到回收，因为它始终被 subList 方法返回的 List 强引用
* 对subList得到的List进行add等操作，回与源数据之间进行相互影响。



## Null
### POJO 中属性的 null
* 对于 JSON 到 DTO 的反序列化过程，null 的表达是有歧义的，客户端不传某个属性，或者传 null，这个属性在 DTO 中都是 null。
* POJO 中的字段有默认值。如果客户端不传值，就会赋值为默认值，导致创建时间也被 更新到了数据库中。
* 注意字符串格式化时可能会把 null 值格式化为 null 字符串。

### MySQL 中有关 NULL 
* MySQL 中 sum 函数没统计到任何记录时，会返回 null 而不是 0,可以使用 IFNULL 函数把 null 转换为 0;
* MySQL 中 count 字段不统计 null 值，COUNT(*) 才是统计所有记录数量的正确方 式。
* MySQL 中 =NULL 并不是判断条件而是赋值，对 NULL 进行判断只能使用 IS NULL 或 者 IS NOT NULL。

## Exception
* 统一的方式进行异常转换，比如通过 @RestControllerAdvice + @ExceptionHandler，来捕获“未处理”异常
  * Repository 层出现异常或许可以忽略，或许可以降级，或许需要转化为一个友好的异常。如果一律捕获异常仅记录日志，很可能业务逻辑已经出错，而用户和程序本身完全感知不到。
  * Service 层往往涉及数据库事务，出现异常同样不适合捕获，否则事务无法自动回滚。此外 Service 层涉及业务逻辑，有些业务逻辑执行中遇到业务异常，可能需要在异常后转入分支业务流程。如果业务异常都被框架捕获了，业务功能就会不正常。
  * 如果下层异常上升到 Controller 层还是无法处理的话，Controller 层往往会给予用户友好提示，或是根据每一个 API 的异常表返回指定的异常类型，同样无法对所有异常一视同仁。
* 不要丢失异常原始信息，可以用类似throw new RuntimeException("系统忙请稍后再试", e);来进行转换。
* 捕获异常不要不做操作，哪怕输入日志
* 抛出异常需要执行信息。
* 不要定义静态的异常。

### 异常处理
除了通过日志正确记录异常原始信息外，通常还有 三种处理模式:
* 转换，即转换新的异常抛出。对于新抛出的异常，最好具有特定的分类和明确的异常消息，而不是随便抛一个无关或没有任何信息的异常，并最好通过 cause 关联老异常。
* 重试，即重试之前的操作。比如远程调用服务端过载超时的情况，盲目重试会让问题更严重，需要考虑当前情况是否适合重试。
* 恢复，即尝试进行降级处理，或使用默认值来替代原始数据。

### finally 中的异常
try中异常被finally中异常覆盖的情况
```java
  public void wrong() {
    try {
      log.info("try");
      throw new RuntimeException("try");
    } finally {
      log.info("finally");
      throw new RuntimeException("finally");
    }
  }
```
```console 
--------------------------------------------------------
2022-01-13 00:27:12.374  INFO 43202 --- [nio-8080-exec-1] c.l.bugs.l12.FinallyIssueController      : try
2022-01-13 00:27:12.374  INFO 43202 --- [nio-8080-exec-1] c.l.bugs.l12.FinallyIssueController      : finally
2022-01-13 00:27:12.375 ERROR 43202 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.RuntimeException: finally] with root cause

java.lang.RuntimeException: finally
	at com.liuyang19900520.bugs.l12.FinallyIssueController.wrong(FinallyIssueController.java:37) ~[main/:na]
... ...
```
解决方法1：finally 代码块自己负责异常捕获和处理
```java
  public void right() {
    try {
      log.info("try");
      throw new RuntimeException("try");
    } finally {
      log.info("finally");
      try {
        throw new RuntimeException("finally");
      } catch (Exception ex) {
        log.error("finally", ex);
      }
    }
  }
```
```console 
--------------------------------------------------------
2022-01-13 00:31:28.491  INFO 43202 --- [nio-8080-exec-1] c.l.bugs.l12.FinallyIssueController      : try
2022-01-13 00:31:28.491  INFO 43202 --- [nio-8080-exec-1] c.l.bugs.l12.FinallyIssueController      : finally
2022-01-13 00:31:28.491 ERROR 43202 --- [nio-8080-exec-1] c.l.bugs.l12.FinallyIssueController      : finally

java.lang.RuntimeException: finally
	at com.liuyang19900520.bugs.l12.FinallyIssueController.right(FinallyIssueController.java:49) ~[main/:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
... ...

2022-01-13 00:31:28.492 ERROR 43202 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.RuntimeException: try] with root cause

java.lang.RuntimeException: try
	at com.liuyang19900520.bugs.l12.FinallyIssueController.right(FinallyIssueController.java:45) ~[main/:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
... ...
```
解决方法2：使用 addSuppressed 方法把 finally 中的异常 附加到主异常上
```java
public void right2() throws Exception {
    Exception e = null;
    try {
      log.info("try");
      throw new RuntimeException("try");
    } catch (Exception ex) {
      e = ex;
    } finally {
      log.info("finally");
      try {
        throw new RuntimeException("finally");
      } catch (Exception ex) {
        if (e != null) {
          e.addSuppressed(ex);
        } else {
          e = ex;
        }
      }
    }
    throw e;
  }
```
```console 
--------------------------------------------------------
2022-01-13 00:34:27.291  INFO 43202 --- [nio-8080-exec-1] c.l.bugs.l12.FinallyIssueController      : try
2022-01-13 00:34:27.291  INFO 43202 --- [nio-8080-exec-1] c.l.bugs.l12.FinallyIssueController      : finally
2022-01-13 00:34:27.292 ERROR 43202 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.RuntimeException: try] with root cause

java.lang.RuntimeException: try
	at com.liuyang19900520.bugs.l12.FinallyIssueController.right2(FinallyIssueController.java:61) ~[main/:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
... ...
	Suppressed: java.lang.RuntimeException: finally
		at com.liuyang19900520.bugs.l12.FinallyIssueController.right2(FinallyIssueController.java:67) ~[main/:na]
		... 50 common frames omitted
... ...
```
对于实现了AutoCloseable接口的资源型对象，可以使用ry-with-resource语法糖，但如果使用lombok的@Cleanup注解时，则还是会出现异常信息覆盖的问题。

```java
  public void useresourceright() throws Exception {
    try (TestResource testResource = new TestResource()) {
      testResource.read();
    }
  }

  public void useresourceright2() throws Exception {
    @Cleanup
    TestResource testResource = new TestResource();
    testResource.read();
  }

```
```java
public class TestResource implements AutoCloseable {

  public void read() throws Exception {
    throw new Exception("read error");
  }

  @Override
  public void close() throws Exception {
    throw new Exception("close error");
  }
}
```
try-with-resource语法糖得到的日志
```console
2022-01-13 00:55:38.154 ERROR 43529 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.Exception: read error] with root cause

java.lang.Exception: read error
	at com.liuyang19900520.bugs.l12.TestResource.read(TestResource.java:6) ~[main/:na]
	at com.liuyang19900520.bugs.l12.FinallyIssueController.useresourceright(FinallyIssueController.java:27) ~[main/:na]
  ... ...
	Suppressed: java.lang.Exception: close error
		at com.liuyang19900520.bugs.l12.TestResource.close(TestResource.java:11) ~[main/:na]
		at com.liuyang19900520.bugs.l12.FinallyIssueController.useresourceright(FinallyIssueController.java:26) ~[main/:na]
		... 50 common frames omitted
```
@Cleanup注解得到的日志
```console
2022-01-13 00:57:55.817 ERROR 43529 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.Exception: close error] with root cause

java.lang.Exception: close error
	at com.liuyang19900520.bugs.l12.TestResource.close(TestResource.java:11) ~[main/:na]
	at com.liuyang19900520.bugs.l12.FinallyIssueController.useresourceright2(FinallyIssueController.java:34) ~[main/:na]
... ...
```

## 线程池中的异常
### 使用excute进行提交
```java
  public void execute() throws InterruptedException {

    String prefix = "test";
    ExecutorService threadPool = Executors.newFixedThreadPool(1, new ThreadFactoryBuilder()
        .setNameFormat(prefix + "%d")
        .setUncaughtExceptionHandler(
            (thread, throwable) -> log.error("ThreadPool {} got exception", thread, throwable))
        .build());
    IntStream.rangeClosed(1, 10).forEach(i -> threadPool.execute(() -> {
      if (i == 5) {
        throw new RuntimeException("error");
      }
      log.info("I'm done : {}", i);
    }));

    threadPool.shutdown();
    threadPool.awaitTermination(1, TimeUnit.HOURS);
  }
```
当使用excute来提交的时候，我们会得到如下的日志。发现任务 6 开始运行在线程 test1。从线程名的改变可以知道因为异常的抛出老线程退出了，线程池只能重新创建一个线程。
```
2022-01-13 23:26:24.352  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 1
2022-01-13 23:26:24.353  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 2
2022-01-13 23:26:24.354  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 3
2022-01-13 23:26:24.354  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 4
2022-01-13 23:26:24.354  INFO 44729 --- [          test1] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 6
2022-01-13 23:26:24.354  INFO 44729 --- [          test1] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 7
2022-01-13 23:26:24.354  INFO 44729 --- [          test1] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 8
2022-01-13 23:26:24.354  INFO 44729 --- [          test1] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 9
2022-01-13 23:26:24.354  INFO 44729 --- [          test1] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 10
2022-01-13 23:26:24.358 ERROR 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : ThreadPool Thread[test0,5,main] got exception

java.lang.RuntimeException: error
	at com.liuyang19900520.bugs.l12.ThreadPoolAndExceptionController.lambda$execute$2(ThreadPoolAndExceptionController.java:37) ~[main/:na]
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128) ~[na:na]
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628) ~[na:na]
	at java.base/java.lang.Thread.run(Thread.java:834) ~[na:na]
```
* 以 execute 方法提交到线程池的异步任务，最好在任务内部做好异常处理;
* 设置自定义的异常处理程序作为保底，比如在声明线程池时自定义线程池的未捕获异常处理程序；或者设置全局的默认未捕获异常处理程序。

### 使用submit提交
如果改为submit提交的话，我们会发现异常都会被吞到，日志中并没有输出异常。
```java
  public void submit() throws InterruptedException {

    String prefix = "test";
    ExecutorService threadPool = Executors.newFixedThreadPool(1,
        new ThreadFactoryBuilder().setNameFormat(prefix + "%d").build());
    IntStream.rangeClosed(1, 10).forEach(i -> threadPool.submit(() -> {
      if (i == 5) {
        throw new RuntimeException("error");
      }
      log.info("I'm done : {}", i);
    }));

    threadPool.shutdown();
    threadPool.awaitTermination(1, TimeUnit.HOURS);
  }

```
```
2022-01-14 00:09:40.458  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 1
2022-01-14 00:09:40.458  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 2
2022-01-14 00:09:40.459  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 3
2022-01-14 00:09:40.459  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 4
2022-01-14 00:09:40.459  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 6
2022-01-14 00:09:40.459  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 7
2022-01-14 00:09:40.459  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 8
2022-01-14 00:09:40.459  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 9
2022-01-14 00:09:40.459  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 10
```
既然是以 submit 方式来提交任务，那么我们应 该关心任务的执行结果，否则应该以 execute 来提交任务。
如果为了显示异常的话，需要调用我们的Future.get()方法。
```java
 public void submitRight() throws InterruptedException {

    String prefix = "test";
    ExecutorService threadPool = Executors.newFixedThreadPool(1,
        new ThreadFactoryBuilder().setNameFormat(prefix + "%d").build());

    List<Future> tasks = IntStream.rangeClosed(1, 10).mapToObj(i -> threadPool.submit(() -> {
      if (i == 5) {
        throw new RuntimeException("error");
      }
      log.info("I'm done : {}", i);
    })).collect(Collectors.toList());

    tasks.forEach(task -> {
      try {
        task.get();
      } catch (Exception e) {
        log.error("Got exception", e);
      }
    });
    threadPool.shutdown();
    threadPool.awaitTermination(1, TimeUnit.HOURS);
  }
```

```
2022-01-14 00:16:29.590  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 1
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 2
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 3
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 4
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 6
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 7
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 8
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 9
2022-01-14 00:16:29.591  INFO 44729 --- [          test0] c.l.b.l.ThreadPoolAndExceptionController : I'm done : 10
2022-01-14 00:16:29.595 ERROR 44729 --- [nio-8080-exec-1] c.l.b.l.ThreadPoolAndExceptionController : Got exception

java.util.concurrent.ExecutionException: java.lang.RuntimeException: error
	at java.base/java.util.concurrent.FutureTask.report(FutureTask.java:122) ~[na:na]
	at java.base/java.util.concurrent.FutureTask.get(FutureTask.java:191) ~[na:na]
  ... ...
	at java.base/java.lang.Thread.run(Thread.java:834) ~[na:na]
Caused by: java.lang.RuntimeException: error
	at com.liuyang19900520.bugs.l12.ThreadPoolAndExceptionController.lambda$submitRight$6(ThreadPoolAndExceptionController.java:72) ~[main/:na]
	at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515) ~[na:na]
	at java.base/java.util.concurrent.FutureTask.run$$$capture(FutureTask.java:264) ~[na:na]
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java) ~[na:na]
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128) ~[na:na]
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628) ~[na:na]
	... 1 common frames omitted
```

确保正确处理了线程池中任务的异常，如果任务通过 execute 提交，那么出现异常会导致线程退出，大量的异常会导致线程重复创建引起性能问题，我们应该尽可能确保任务不出异常，同时设置默认的未捕获异常处理程序来兜底; 
如果任务通过 submit 提交意味着 我们关心任务的执行结果，应该通过拿到的 Future 调用其 get 方法来获得任务运行结果和可能出现的异常，否则异常可能就被生吞了。

## 其他Java小知识
### Java线程池中submit和execute之间的区别
* 返回值
 * submit()方法，可以提供Future < T > 类型的返回值。
 * executor()方法，无返回值。 
* 异常
 * excute方法会抛出异常。
 * sumbit方法不会抛出异常。除非你调用Future.get()。
* 参数
 * excute入参Runnable
 * submit入参可以为Callable 

### ForkJoinPool
