---
title: JVM的学习笔记
categories: 
 - Java
tags:
 - Java
 - JVM

date: 2021-03-09
---

本文记录一些自己学习JVM过程的一些记录和总结。
## Classloader
### 分类
* 引导类加载器:负责加载支撑JVM运行的位于JRE的lib目录下的核心类库，比如 rt.jar、charsets.jar等
* 扩展类加载器:负责加载支撑JVM运行的位于JRE的lib目录下的ext扩展目录中的JAR类包
* 应用程序类加载器:负责加载ClassPath路径下的类包，主要就是加载你自己写的那些类
* 自定义加载器:负责加载用户自定义路径下的类包

### 双亲委派机制
简单的说就是：加载某个类时会先委托父加载器寻找目标类，找不到再委托上层父加载器加载，如果所有父加载器在自己的加载类路径下都找不到目标类，则在自己的类加载路径中查找并载入目标类。
这样设计的好处
* 沙箱安全：保证Java的核心API不被篡改
* 避免类的重复加载，保证了被加载类的唯一性。

```java
    protected Class<?> loadClass(String name, boolean resolve)
        throws ClassNotFoundException
    {
        synchronized (getClassLoadingLock(name)) {
            // First, check if the class has already been loaded
            Class<?> c = findLoadedClass(name);
            //主要体现双亲委派的部分
            if (c == null) {
                long t0 = System.nanoTime();
                try {
                    if (parent != null) {
                        c = parent.loadClass(name, false);
                    } else {
                        c = findBootstrapClassOrNull(name);
                    }
                } catch (ClassNotFoundException e) {
                    // ClassNotFoundException thrown if class not found
                    // from the non-null parent class loader
                }

                if (c == null) {
                    // If still not found, then invoke findClass in order
                    // to find the class.
                    long t1 = System.nanoTime();
                    c = findClass(name);

                    // this is the defining class loader; record the stats
                    PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                    PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                    PerfCounter.getFindClasses().increment();
                }
            }
            if (resolve) {
                resolveClass(c);
            }
            return c;
        }
    }
```

所以说在同一个JVM内，两个相同包名和类名的类对象可以共存，因为他们的类加载器可以不一 样，所以看两个类对象是否是同一个，除了看类的包名和类名是否都相同之外，还需要他们的类 加载器也是同一个才能认为他们是同一个。

## JVM内存模型

### 内存模型
![0001](/blog/java/jvm/jvm.jpeg)

### 概念相关
感谢一篇知乎的文章
[https://zhuanlan.zhihu.com/p/38348646](JVM内存结构和Java内存模型) 


## 内存分配

### 对象创建
1. 类加载检查：new指令能否在常量池中定位到一个类的引用符号，判断其是否已经被加载。
2. 分配内存：在类加载检查通过后，接下来虚拟机将为新生对象分配内存。对象所需内存的大小在类加载完成后便可完全确定，为对象分配空间的任务等同于把一块确定大小的内存从Java堆中划分出来。
    * “指针碰撞”（Bump thePointer）：
    假设Java堆中内存是绝对规整的，所有用过的内存都放在一边，空闲的内存放在另一边，中间放着一个指针作为分界点的指示器，那所分配内存就仅仅是把那个指针向空闲空间那边挪动一段与对象大小相等的距离
    * 空闲列表”（FreeList）：
    如果Java堆中的内存并不是规整的，已使用的内存和空闲的内存相互交错，那就没有办法简单地进行指针碰撞了，虚拟机就必须维护一个列表，记录上哪些内存块是可用的，在分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新列表上的记录，这种分配方式称为“。
选择哪种分配方式由Java堆是否规整决定，而Java堆是否规整又由所采用的垃圾收集器是否带有压缩整理功能决定。因此，在使用Serial、ParNew等带Compact过程的收集器时，系统采用的分配算法是指针碰撞，而使用CMS这种基于Mark-Sweep算法的收集器时，通常采用空闲列表。
