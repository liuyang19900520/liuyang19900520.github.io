---
title: AWS管理与监控一些笔记
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
### 基本和详细监控
    * 基本监控每五分钟发送一次指标，EC2发送五分钟的平均值
    * 详细监控间隔1分钟
### 常规和高分辨率指标
    * AWS服务澄澄的指标具有不少于分钟的时间戳分辨率，就是常规分辨率指标。
    * 高分辨率，比如分辨率高达1s的自定义指标，通过创建PutMetricData Api来操作自定义指标。



