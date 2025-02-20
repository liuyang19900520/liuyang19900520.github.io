---
title: 这是测试能不能自动生成外文的文章
date: 2024-01-01
---

## 中文的文档

自动做成外语的难度还是里有一些吧。


## 加锁
### 加锁对象

* 加锁前要清楚锁和被保护的对象是不是一个层面的
* 静态字段属于类，类级别的锁才能保护;而非静态字段属于类实例，实例级别的锁 就可以保护。

也就是说，如果在非静态的 wrong 方法上加锁，只能确保多个线程无法执行同一个实例的 wrong 方法， 却不能保证不会执行不同实例的 wrong 方法。  
而静态的 counter 在多个实例中共享，所以 必然会出现线程安全问题。 所以我们应该创建一个同样在类中定义一个 Object 类型的静态字段，在操作 counter 之前对这个字段加锁。

```java
public class Data {

    @Getter
    private static int counter = 0;
    private static Object locker = new Object();

    public static int reset() {
        counter = 0;
        return counter;
    }

    public void right() {
        synchronized (locker) {
            counter++;
        }
    }

    public synchronized void wrong() {
        counter++;
    }
}

```



