---
title: 005-为系统添加日志
categories: 
 - Spring Boot
tags:
 - Spring Boot
 - logback 
date: 2020-10-10
---
对于我们的小系统来讲，我们还需要通过日志来进行记录。例如我们的系统发生了例外，错误，我们需要通过日志来进行追溯，或者一些重要的信息，我们需要特殊的留意一下，也常常需要通过日志来进行表达。

## logback-spring.xml配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!--日志格式应用spring boot默认的格式，也可以自己更改-->
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <!--定义日志存放的位置，默认存放在项目启动的相对路径的目录-->
    <springProperty scope="context" name="LOG_PATH" source="log.path" defaultValue="app-log"/>

    <!-- ****************************************************************************************** -->
    <!-- ****************************** 本地开发只在控制台打印日志 ************************************ -->
    <!-- ****************************************************************************************** -->
    <springProfile name="local">
        <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern>${CONSOLE_LOG_PATTERN}</pattern>
                <charset>utf-8</charset>
            </encoder>
        </appender>

        <!--默认所有的包以info-->
        <root level="info">
            <appender-ref ref="STDOUT"/>
        </root>

        <!--各个服务的包在本地执行的时候，打开debug模式-->
        <logger name="com.liuyang19900520" level="debug" additivity="false">
            <appender-ref ref="STDOUT"/>
        </logger>
    </springProfile>

    <!-- ********************************************************************************************** -->
    <!-- **** 放到服务器上不管在什么环境都只在文件记录日志，控制台（catalina.out）打印logback捕获不到的日志 **** -->
    <!-- ********************************************************************************************** -->
    <springProfile name="!local">

        <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern>${CONSOLE_LOG_PATTERN}</pattern>
                <charset>utf-8</charset>
            </encoder>
        </appender>

        <!-- 日志记录器，日期滚动记录 -->
        <appender name="FILE_ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">

            <!-- 正在记录的日志文件的路径及文件名 -->
            <file>${LOG_PATH}/log_error.log</file>

            <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">

                <!-- 归档的日志文件的路径，%d{yyyy-MM-dd}指定日期格式，%i指定索引 -->
                <fileNamePattern>${LOG_PATH}/error/log-error-%d{yyyy-MM-dd}.%i.log</fileNamePattern>

                <!-- 除按日志记录之外，还配置了日志文件不能超过2M，若超过2M，日志文件会以索引0开始，
                命名日志文件，例如log-error-2013-12-21.0.log -->
                <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                    <maxFileSize>10MB</maxFileSize>
                </timeBasedFileNamingAndTriggeringPolicy>
            </rollingPolicy>

            <!-- 追加方式记录日志 -->
            <append>true</append>

            <!-- 日志文件的格式 -->
            <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
                <pattern>${FILE_LOG_PATTERN}</pattern>
                <charset>utf-8</charset>
            </encoder>

            <!-- 此日志文件只记录error级别的 -->
            <filter class="ch.qos.logback.classic.filter.LevelFilter">
                <level>error</level>
                <onMatch>ACCEPT</onMatch>
                <onMismatch>DENY</onMismatch>
            </filter>
        </appender>

        <!-- 日志记录器，日期滚动记录 -->
        <appender name="FILE_WARN" class="ch.qos.logback.core.rolling.RollingFileAppender">

            <!-- 正在记录的日志文件的路径及文件名 -->
            <file>${LOG_PATH}/log_warn.log</file>

            <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">

                <!-- 归档的日志文件的路径，%d{yyyy-MM-dd}指定日期格式，%i指定索引 -->
                <fileNamePattern>${LOG_PATH}/warn/log-warn-%d{yyyy-MM-dd}.%i.log</fileNamePattern>

                <!-- 除按日志记录之外，还配置了日志文件不能超过2M，若超过2M，日志文件会以索引0开始，
                命名日志文件，例如log-error-2013-12-21.0.log -->
                <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                    <maxFileSize>10MB</maxFileSize>
                </timeBasedFileNamingAndTriggeringPolicy>
            </rollingPolicy>

            <!-- 追加方式记录日志 -->
            <append>true</append>

            <!-- 日志文件的格式 -->
            <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
                <pattern>${FILE_LOG_PATTERN}</pattern>
                <charset>utf-8</charset>
            </encoder>

            <!-- 此日志文件只记录error级别的 -->
            <filter class="ch.qos.logback.classic.filter.LevelFilter">
                <level>warn</level>
                <onMatch>ACCEPT</onMatch>
                <onMismatch>DENY</onMismatch>
            </filter>
        </appender>

        <!-- 日志记录器，日期滚动记录 -->
        <appender name="FILE_ALL" class="ch.qos.logback.core.rolling.RollingFileAppender">

            <!-- 正在记录的日志文件的路径及文件名 -->
            <file>${LOG_PATH}/log_total.log</file>

            <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">

                <!-- 归档的日志文件的路径，%d{yyyy-MM-dd}指定日期格式，%i指定索引 -->
                <fileNamePattern>${LOG_PATH}/total/log-total-%d{yyyy-MM-dd}.%i.log</fileNamePattern>

                <!-- 除按日志记录之外，还配置了日志文件不能超过2M，若超过2M，日志文件会以索引0开始，
                命名日志文件，例如log-error-2013-12-21.0.log -->
                <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                    <maxFileSize>10MB</maxFileSize>
                </timeBasedFileNamingAndTriggeringPolicy>
            </rollingPolicy>

            <!-- 追加方式记录日志 -->
            <append>true</append>

            <!-- 日志文件的格式 -->
            <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
                <pattern>${FILE_LOG_PATTERN}</pattern>
                <charset>utf-8</charset>
            </encoder>
        </appender>

        <!--记录到文件时，记录两类一类是error日志，一个是所有日志-->
        <root level="info">
            <appender-ref ref="STDOUT"/>
            <appender-ref ref="FILE_ERROR"/>
            <appender-ref ref="FILE_WARN"/>
            <appender-ref ref="FILE_ALL"/>
        </root>

    </springProfile>

</configuration>
```
通过上述配置（不要忘了在application.yml中配置日志路径），我们已经可以已经可以根据日志内容分类输入到文件中，可以看到我们其实简单划分了error日志，warn日志和全量日志。 
我们又发现了一个问题，因为上述配置我们判断了配置文件为local的时候才输出debug日志，所以我们需要修改一些配置文件的方式。 
首先我们拷贝一个application-local.yml文件，只保留local环境相关的信息。然后再对application.yml进行修改，只保留共通的部分，并且添加active profile的选项
```yml
spring:
  profiles:
    active: @profileName@
```
之后我们在build.gradle中进行定义
``` groovy
def profileName = System.getProperty("profile") ?: "local"
processResources {
    filter org.apache.tools.ant.filters.ReplaceTokens, tokens: [profileName: profileName]
}
```
这样默认就是读取我们的local配置文件了。如果是local配置，我们就可以输出我们debug日志了。

## 错误信息入库
除了上述的方法，我们还常常会做一些重要信息的日志入库的操作。便于我们可视化的查看日志。由于目前我们还没有什么业务，我们就来模拟一个错误日志入库的例子吧。
### 日志mapper
首先创建一张装有错误信息的表。并且通过之前的mybatis生成器生成一条crud的工具，这里需要注意的一个小问题，由于我们之前将Spring Bean的扫描只扫描了moudle包下的，需要将这个扫描注解添加一个我们这次添加的日志扫描。如果能够正常启动，说明我们的mapper生成后的包调整一切顺利。
### 日志工厂
```java
public class LogFactory {
    public static SysErrorLog createErrorLog(Long userId, IResultCode resultCode, String clazzName, String methodName, String path, String detail) {
        SysErrorLog sysErrorLog = new SysErrorLog();
        sysErrorLog.setErrorCode(resultCode.getCode());
        sysErrorLog.setErrorMsg(resultCode.getMessage());
        sysErrorLog.setPath(path);
        sysErrorLog.setDetail(detail);
        sysErrorLog.setClassName(clazzName);
        sysErrorLog.setMethod(methodName);
        sysErrorLog.setCreateUser(userId);
        sysErrorLog.setUpdateUser(userId);
        return sysErrorLog;
    }
}
```
所谓日志工厂其实就是创建日志，目前我们只放有错误日志，如果有需要，我们也可以创建不同的表，比如重要新的日志，登录信息等等。
### 日志任务工厂
```java
@DependsOn("springContextHolder")
@Slf4j
public class LogTaskFactory {

    private final static SysErrorLogService sysErrorLogService = SpringContextHolder.getBean(SysErrorLogService.class);

    public static TimerTask exceptionLog(final Long userId, final IResultCode resultCode,
                                         final String clazzName, final String methodName,
                                         final String path, final String detail
    ) {
        return new TimerTask() {
            @Override
            public void run() {
                SysErrorLog errorLog = LogFactory.createErrorLog(userId, resultCode, clazzName, methodName, path, detail
                );
                sysErrorLogService.save(errorLog);
                log.debug(Thread.currentThread().getName());
            }
        };
    }
}
```
日志任务工厂就是负责执行日志入库的主要方法了。我们发现这个执行的过程是一个定时器，中间调用了我们通过mybatis自动生成的LogService。
### 日志管理器
上文我们说道日志的任务的执行其实是一个TimerTask，也就是可以理解其实我们的入库操作和我们的陪同的业务属于多线程的一步操作。所以我们就在LogManager中需要创建我们的线程池。
```java
public class LogManager {

    /**
     * 异步操作记录日志的线程池
     */
    private final ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(10, new ThreadFactory() {
        private final AtomicInteger atoInteger = new AtomicInteger(0);

        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r);
            t.setName("Logger-Thread " + atoInteger.getAndIncrement());
            return t;
        }
    });


    public static LogManager logManager = new LogManager();

    public static LogManager getInstance() {
        return logManager;
    }

    /**
     * 执行日志任务
     *
     * @param task 执行日志任务
     */
    public void executeLog(TimerTask task) {
        executor.schedule(task, 10, TimeUnit.MILLISECONDS);
    }
}
```
有了上面代码，我们在之前修改过的LaymanExceptionHandler的服务器异常中，将我们的错误日志进行入库处理。
```java
/**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public CommonResult internalException(HttpServletRequest request, RuntimeException e) {

        HashMap<Object, Object> errorDetail = createErrorDetail(request, e);
        LogManager.getInstance().executeLog(LogTaskFactory.exceptionLog(null, BResultCode.COMMON_B_ERROR, (String) errorDetail.get("className"),
                (String) errorDetail.get("methodName"), (String) errorDetail.get("path"), (String) errorDetail.get("detail")));
        CommonResult result = CommonResult.failed(BResultCode.COMMON_B_ERROR, errorDetail);
        log.error(JSONUtil.toJsonStr(result));
        return result;
    }
```
最后当我们在controller中模拟一个by zero的服务器异常的时候，我们就能够实现之前的入库预期。

## 日志AOP，记录请求和响应
除了上面我们说的内容之外，我们还可以为日志添加一个AOP处理，旨在记录所有的请求的请求和响应。 
从实现的角度来说，其实就是写一个aop的处理，将织入点设置为controller的所有方法，然后将这个方法参数和返回值分别用日志输出即可
```java
/**
 * 日志拦截
 *
 * @author Max Liu
 */
@Aspect
@Component
@Order(-100)
@Slf4j
public class LogRoutingAspect {
    /**
     * 使用ThreadLocal最好是每次使用完就调用remove方法，将其删掉，避免先get后set的情况导致业务的错误。
     */
    ThreadLocal<Long> startTime = new ThreadLocal<>();

    @Pointcut("execution(public * com.liuyang19900520.layman.starter.module..*.*Controller.*(..))"
    )
    private void controllerAspect() {
    }

    /**
     * controller 请求参数
     *
     * @param joinPoint 请求
     */
    @Before(value = "controllerAspect()")
    public void methodBefore(JoinPoint joinPoint) throws Exception {
        startTime.set(System.currentTimeMillis());
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            log.info("==> Request URL:" + request.getRequestURL().toString());
            log.info("==> Request Args:" + JSONUtil.toJsonStr(joinPoint.getArgs()));
        } else {
            throw new Exception("requestAttributes is null");
        }
    }

    /**
     * controller 返回内容
     *
     * @param o 返回值
     */
    @AfterReturning(returning = "o", pointcut = "controllerAspect()")
    public void methodAfterReturning(Object o) {
        log.info("<== Response Full Type Contents :" + JSONUtil.toJsonStr(o));
        log.info("<== Response SpendTime:" + (System.currentTimeMillis() - startTime.get()));
        startTime.remove();
    }
}
```
通过上面的配置，我们能够时刻获得我们的请求和响应的内容，当然这是对于单机的情况，如果是符合集群的情况，我们还需要其他的修改和配置。我们后续再探讨。


