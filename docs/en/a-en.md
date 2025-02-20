---
title: This is a test to see if foreign language articles can be automatically generated
date: 2024-01-01
---

## Chinese Document

The difficulty of automatically converting it into a foreign language is still somewhat challenging.

## Locking
### Locking Objects

* Before locking, it is important to understand whether the lock and the protected object are at the same level.
* Static fields belong to the class, and only class-level locks can protect them; non-static fields belong to class instances, and instance-level locks can protect them.

This means that if you lock a non-static wrong method, you can only ensure that multiple threads cannot execute the wrong method of the same instance, but you cannot guarantee that they will not execute the wrong method of different instances.  
Since the static counter is shared among multiple instances, thread safety issues will inevitably arise. Therefore, we should create a static field of type Object in the class and lock this field before operating on the counter.

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