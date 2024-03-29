---
title: AWS管理与监控的一些笔记(CloudWatch)
date: 2022-02-18
categories: 
 - AWS
tags:
 - CloudWatch
---

## CloudWatch
允许从AWS和非AWS资源收集，检索，绘制数字性能指标，AWS所有资源都会自动将指标发送到CloudWatch。比如CPU使用率等等。也可以从自己的应用程序和本地服务器发送到CloudWatch。
### CloudWatch指标
    * 根据服务的命名空间来区分
    * 在同一个命名空间下会分配实例ID来进行区分
#### 基本和详细监控
    * 基本监控每五分钟发送一次指标，EC2发送五分钟的平均值
    * 详细监控间隔1分钟
#### 常规和高分辨率指标
    * AWS服务澄澄的指标具有不少于分钟的时间戳分辨率，就是常规分辨率指标。
    * 高分辨率，比如分辨率高达1s的自定义指标，通过创建PutMetricData Api来操作自定义指标。
#### 指标过期
    * 无法删除指标
    * 高分辨率指标储存3h，此后，每分钟的所有数据点都以1分钟的分辨率合成1个数据点，高分辨率数据点过期
    * 15天后，1分钟的数据点每五个合并成1个5分钟的数据点，保留63天。
    * 63天后，12个5分钟的数据点合并成1个1小时数据点，保留15个月。

### CloudWatch Logs
    从AWS或者非AWS资源收集日志，比如CloudTail日志，从实例收集应用程序日志以及记录Route53 DNS查询等等。

#### 日志流和日志组
负责存储日志，记录应用程序或AWS资源的活动记录。日志组就是汇聚所有日志流。

#### 指标过滤器
可以使用指标过滤器从日志流中提取数据来创建CloudWatch指标。必须是数字。比如字节数等等。

#### CloudWatch代理
基于命令行程序，从操作系统收集本地服务器日志。例如内存使用率，这是EC2不收集的指标。

### CloudWatch警报
#### 监控的数据点
* 设置的监控周期需要等于或大于指标的分辨率。
* 通过制定值和条件来定义静态阈值
* 度量是否超出波段的范围值
n中的m警报，其中m是要警报的数据点，n是评估期。假设创建的阈值>40的警报，报警的数据点是2，评估期是3，所以这个一个三分之二的警报。现在CloudWatch对以下三个数据点46,39,41，2/3的点都超过，进入ALARM状态。之后，连续评估45,30,29.超过的点低于2/3，又恢复正常状态。
#### 警报状态
* ALARM报警，超过并保持阈值一段时间
* OK，报警的数据点没有超过并保持超过阈值一段时间
* INSUFFICIENT_DATA 没有收集到足够的数据来确定是否报警
* 新的警报总是以INSUFFICIENT_DATA状态开始
* 对于缺失的数据，也可以选择以下四种选项
    *   Missing
    * 未违反
    * 违反
    * Ignore

#### Action
在状态改变的时候，可以采取措施
*  使用SNS通知服务   
* Auto Scaling操作
* EC2 操作，停止，终止，重启等等

### EventBridege
事监控并根据特定事件或计划采取行动，比如EC2重启，登录AWS控制台的IAM用户等等。
#### 事件总线
每个AWS账户都有一个事件总线，用于接受所有AWS服务的事件。自定义事件总线接受来自其他源的事件
#### 规则和目标
规则定义了为响应事件而采取的操作。例如，在Auto Scaling发生时收到一封邮件，我们可以创建一个规则来监视Auto Scaling组中正在启动或终止的实力，对于目标，可以选择一个配置发送SNS通知。
