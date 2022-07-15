---
title: No0933-Number-of-Recent-Calls
categories: 
 - LeetCode
tags:
 - Queue
date: 2021-08-11
---

## 题目
最近的请求次数，判断最近3000ms内实施了多少次请求。
>   RecentCounter() Initializes the counter with zero recent requests.
   
>  int ping(int t) Adds a new request at time t, where t represents some time

>  in milliseconds, and returns the number of requests that has happened in the past
 
> 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].

例子如下，一共ping了4次，ping的时间分别是1ms，100ms，3001ms，3002ms。分别判断改时间段内发送了多少请求


> Input

> ["RecentCounter", "ping", "ping", "ping", "ping"] [[], [1], [100], [3001], [3002]]

> Output

> [null, 1, 2, 3, 3]

## 解答思路
便利数组，遇到1的情况下讲count值+1，如果不是1的情况下，判断一下当前最大连续值和count的最大值
### Python
```python

class RecentCounter:

  def __init__(self):
    # 初始化的时创建队列
    self.q = deque()

  def ping(self, t: int) -> int:
    # 传入一个数字，当前时间毫秒数
    self.q.append(t)
    # 当最新的t-队列首位>3000的时候，弹出队列
    # 换句话讲，只保留最近3000ms中的数组，最后只要返回数组长度就完成了
    while len(self.q) > 0 and t - self.q[0] > 3000:
      self.q.poplef()
      # 返回队列长度
    return len(self.q)
    
```
