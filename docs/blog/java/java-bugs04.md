---
title: 零散的Java知识记录 4
categories:
  - Java
tags:
  - Java
date: 2021-11-22
---

## IO

- 如果需要读写字符流，那么需要确保文件中字符的字符集和字符流的字符集是一致的，否则可能产生乱码。
- 使用 Files 类的一些流式处理操作，注意使用 try-with-resources 包装 Stream，确保底层文件资源可以释放，避免产生 too many open files 的问题。
- 进行文件字节流操作的时候，一般情况下不考虑进行逐字节操作，使用缓冲区进行批量读写减少 IO 次数，性能会好很多。一般可以考虑直接使用缓冲输入输出流 BufferedXXXStream，追求极限性能的话可以考虑使用 FileChannel 进行流转发。

关于 buffer 的实例,如果每次需要读取的字节数很可能不是固定的，有的时候读取几个字节，有的时候读取几百字节，这个时候有一个固定大小较大的缓冲，也就是使用 BufferedInputStream 和 BufferedOutputStream 做为后备的稳定的二次缓冲，

```java
  private static void bufferedStreamBufferOperation() throws IOException {
    Files.deleteIfExists(Paths.get("dest.txt"));

    try (BufferedInputStream bufferedInputStream = new BufferedInputStream(
        new FileInputStream("src.txt"));
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(
            new FileOutputStream("dest.txt"))) {
      byte[] buffer = new byte[8192];
      int len = 0;
      while ((len = bufferedInputStream.read(buffer)) != -1) {
        bufferedOutputStream.write(buffer, 0, len);
      }
    }
  }

```

## 序列化

- 要确保序列化和反序列化算法的一致性。
- Jackson 有大量的序列化和反序列化特性，可以用来微调序列化和反序列化的细节。SpringBoot 配置了基本的 ObjectMapper，基本可以满足需求。可以通过配置 Jackson2ObjectMapperBuilderCustomizer 的 Bean 来启动更多配置项目。
- 默认情况下，在反序列化的时候，Jackson 框架只会调用无参构造方法创建对象。本就没有必要再构造方法中进行业务逻辑。如果一定要， @JsonCreator 指定构造方法。

## 日期和时间

- Date 并无时区问题，世界上任何一台计算机使用 new Date() 初始化得到的时间都一样。因为，Date 中保存的是 UTC 时间，UTC 是以原子钟为基础的统一时间，不以太阳参照计时，并无时区划分。
- Date 中保存的是一个时间戳，代表的是从 1970 年 1 月 1 日 0 点到现在的毫秒数。尝试输出 Date(0):

### 关于国际化时间保存方式

1. 以 UTC 保存，保存的时间没有时区属性，是不涉及时区时间差问题的世界统一时间。我们通常说的时间戳，或 Java 中的 Date 类就是用的这种方式，这也是推荐的方式。
2. 以字面量保存，比如年 / 月 / 日 时: 分: 秒，一定要同时保存时区信息。只有有了时区信息，我们才能知道这个字面量时间真正的时间点，否则它只是一个给人看的时间表示，只在当前时区有意义。Calendar 是有时区概念的，所以我们通过不同的时区初始化 Calendar，得到了不同的时间。

```java
    String stringDate = "2020-01-02 22:00:00";
    ZoneId timeZoneSH = ZoneId.of("Asia/Shanghai");
    ZoneId timeZoneNY = ZoneId.of("America/New_York");
    ZoneId timeZoneJST = ZoneOffset.ofHours(9);

    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    ZonedDateTime date = ZonedDateTime.of(LocalDateTime.parse(stringDate, dateTimeFormatter),
        timeZoneJST);

    DateTimeFormatter outputFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss Z");
    System.out.println(timeZoneSH.getId() + outputFormat.withZone(timeZoneSH).format(date));
    System.out.println(timeZoneNY.getId() + outputFormat.withZone(timeZoneNY).format(date));
    System.out.println(timeZoneJST.getId() + outputFormat.withZone(timeZoneJST).format(date));
```

输出结果如下

```log
Asia/Shanghai2020-01-02 21:00:00 +0800
America/New_York2020-01-02 08:00:00 -0500
+09:002020-01-02 22:00:00 +0900
```

### SimpleDateFormat 的 Bugs

#### 线程不安全

```java
// SimpleDateFormat
        Date parsedDate;
        try {
            parsedDate = calb.establish(calendar).getTime();
            // If the year value is ambiguous,
            // then the two-digit year == the default start year
            if (ambiguousYear[0]) {
                if (parsedDate.before(defaultCenturyStart)) {
                    parsedDate = calb.addYear(100).establish(calendar).getTime();
                }
            }
        }
        // An IllegalArgumentException will be thrown by Calendar.getTime()
        // if any fields are out of range, e.g., MONTH == 17.
        catch (IllegalArgumentException e) {
            pos.errorIndex = start;
            pos.index = oldStart;
            return null;
        }
```

```java
// CalendarBuilder
        cal.clear();
        // Set the fields from the min stamp to the max stamp so that
        // the field resolution works in the Calendar.
        for (int stamp = MINIMUM_USER_STAMP; stamp < nextStamp; stamp++) {
            for (int index = 0; index <= maxFieldIndex; index++) {
                if (field[index] == stamp) {
                    cal.set(index, field[MAX_FIELD + index]);
                    break;
                }
            }
        }

```

1. SimpleDateFormat 继承了 DateFormat，DateFormat 有一个字段 Calendar;
2. SimpleDateFormat 的 parse 方法调用 CalendarBuilder 的 establish 方法，来构建 Calendar;
3. establish 方法内部先清空 Calendar 再构建 Calendar，整个操作没有加锁。
   如果多线程池调用 parse 方法，也就意味着多线程在并发操作一个 Calendar，可能会产生一个线程还没来得及处理 Calendar 就被另一个线程清空了的情况:

如果使用静态的 SimpleDateFormat，最好使用 ThreadLocal；

```java
  private static ThreadLocal<SimpleDateFormat> threadSafeSimpleDateFormat = ThreadLocal.withInitial(
      () -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
```

#### 字符串和格式不匹配异常

```java
String dateString = "20160901";
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMM");
System.out.println("result:" + dateFormat.parse(dateString));
```

会把 0901 当成月份来解析，造成不准确。

### DateTimeFormatter

```java
  private static DateTimeFormatter dateTimeFormatter = new DateTimeFormatterBuilder()
      .appendValue(ChronoField.YEAR)
      .appendLiteral("/")
      .appendValue(ChronoField.MONTH_OF_YEAR)
      .appendLiteral("/")
      .appendValue(ChronoField.DAY_OF_MONTH)
      .appendLiteral(" ")
      .appendValue(ChronoField.HOUR_OF_DAY)
      .appendLiteral(":")
      .appendValue(ChronoField.MINUTE_OF_HOUR)
      .appendLiteral(":")
      .appendValue(ChronoField.SECOND_OF_MINUTE)
      .appendLiteral(".")
      .appendValue(ChronoField.MILLI_OF_SECOND)
      .toFormatter();
```
