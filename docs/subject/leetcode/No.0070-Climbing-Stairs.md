---
title: No.0070-Climbing-Stairs
categories: 
 - LeetCode
tags:
 - Array
date: 2021-01-04
---

## 题目
> You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

#### Example1 :
>* Input: n = 2
>* Output: 2
>* Explanation: There are two ways to climb to the top.
> 1. 1 step + 1 step
> 2. 2 steps

#### Example 2:
>* Input: n = 3
>* Output: 3
> * Explanation: There are three ways to climb to the top.
> 1. 1 step + 1 step + 1 step
> 2. 1 step + 2 steps
> 3. 2 steps + 1 step


#### Constraints:
>1 <= n <= 45

## 解答思路
通过之前的分析我们可以得到一个简单整理如下，方便我们快速找到重复的子问题。 
1. 只有1级台阶的时候，我们只有一个走法，即迈1步。我们记为【1：1】
2. 当有2级台阶的时候，我们有2中走法，即迈1步，再迈1步或者直接迈2步。我们记为【2：2】
3. 当有3级台阶的时候，我们可以考虑，如果想要达到第3级台阶，我们可以有两个途径，从第2级迈1步；或者从第1级迈2步。而走法的和就是第1级台阶的走法+第2级台阶的走法
4. 当有4级台阶的时候，我们可以看做，如果想要达到第4级台阶，我们也是有两个途径，从第3级迈1步；或者从第2级迈2步。而走法的和就是第2级台阶的走法+第3级台阶的走法

这么看下去，这就是非常简单的递归问题，也就是我们常说的斐波那契数列。

### Python
```python
    def climbStairs(self, n: int) -> int:
    # 斐波那契数列的1和2
        if (n <= 2):
            return n
        # 分别定义前3种情况的数值
        f1, f2, f3 = 1, 2, 3
        # 从3开始
        # 这里有一个小问题，什么是n+1,不是n?
        # 比如我们要验证的事fn，只有range的第二个参数是n+1的时候，才能进入i==n的这个循环
        for i in range(3, n + 1):
            f3 = f1 + f2
            f1 = f2
            f2 = f3
        return f3
```
