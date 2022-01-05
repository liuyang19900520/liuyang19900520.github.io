---
title: 零散的Java知识记录 2
categories: 
 - Java
tags:
 - Java
date: 2021-11-13
---

## HTTP 调用

### 配置连接超时和读取超时参数
* 连接超时参数 ConnectTimeout，让用户配置建连阶段的最长等待时间;
* 读取超时参数 ReadTimeout，用来控制从 Socket 上读取数据的最长等待时间。

#### 连接超时参数
不宜设置过长，设置特别长的连接超时意义不大，将其配置得短一些(比如 1~5 秒)即可

#### 读取超时参数
* 读取超时，服务端的执行不会中断。
* 读取超时指的是，向 Socket 写入数据后，我们等到 Socket 返回数据的超时时间，其中包含的时间或者说绝大部分的时间，是服务端处理业务逻辑的时间。
* 对定时任务或异步任务来说，读取超时配置得长些问题不大。但面向用户响应的请求或是微服务短平快的同步接口调用，并发量一般较大，我们应该设置一个较短的读取超时时间，以防止被下游服务拖慢，通常不会设置超过 30 秒的读取超时。


## equals的问题
### equals 和 hashcode
重写equals和hashcode方法，比较两个对象比较的问题和散列表中hashCode元素来定位的问题，如果不复写，会使用Object来实现，得到两个不同的hashCode。
```java
class PointRight {

  private final int x;
  private final int y;
  private final String desc;

  public PointRight(int x, int y, String desc) {
    this.x = x;
    this.y = y;
    this.desc = desc;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    PointRight that = (PointRight) o;
    return x == that.x && y == that.y;
  }

  @Override
  public int hashCode() {
    return Objects.hash(x, y);
  }
```

### Lombok展开
Lombok 的 @Data 注解会帮我们实现 equals 和 hashcode 方法，但是有继承关系时，
* 如果需要排除掉匹配的项目，比如非Id项目的话使用@EqualsAndHashCode.Exclude。
* 如果判断相等需要考虑父类属性的话，@EqualsAndHashCode(callSuper = true)


## BigDecimal
* 尽量使用String进行初始化。
* 如果我们希望只比较 BigDecimal 的 value，可以使用 compareTo 方法
```java
System.out.println(new BigDecimal("1.0").compareTo(new BigDecimal("1"))==0);
```
* 如果需要在Set中判定value
```java
Set<BigDecimal> set2 = new HashSet<>();
set2.add(new BigDecimal("1.0").stripTrailingZeros());
System.out.println(set2.contains(new BigDecimal("1.000").stripTrailingZeros()));
```

* 对于浮点数的格式化，可以考虑使用 DecimalFormat 来明确指定舍入方式。但考虑到精度问题，我更建议使用 BigDecimal 来表示浮点数，并使用其 setScale 方法指定舍入的位数和方式。

## Java的一些零碎知识点
全的前提下，通过parallel可以进行并行处理。比如我们要同时下载多个图片这类操作。

### Reduce
[Stream的Reduce及Collect方法详解](https://blog.csdn.net/icarusliu/article/details/79504602)

### ForkJoinPool
