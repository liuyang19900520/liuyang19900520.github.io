---
title: No.0053-Maximum-Subarray
categories: 
 - LeetCode
tags:
 - Sliding Window
date: 2020-11-02
---

## 题目
>Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.  
Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

#### Example 1:
>* Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
>* Output: 6
>* Explanation: [4,-1,2,1] has the largest sum = 6.

#### Example 2:
> * Input: nums = [1]
> * Output: 1

#### Example 3:
>* Input: nums = [0]
>* Output: 0

#### Example 4:
>* Input: nums = [-1]
>* Output: -1

#### Example 5:
>* Input: nums = [-2147483647]
>* Output: -2147483647

## 解答思路
### Python
首先确定一个指针，在这个指针移动的循环内部，再做另一个指针想数组末位移动，以便取得两个指针之间的数值和的最大值。

```python
import sys
from typing import List


# 暴力解决办法：使用滑动窗口办法进行解决
def maxSubArray(nums: List[int]) -> int:
    max_sum = -sys.maxsize
    n = len(nums)
    # 表示设置第一个指针，代表从左向右去判断
    for i in range(n):
        inner_sum = 0
        # 表示设置第二个指针，代表从当前位置到末位判断
        for j in range(i, n):
            inner_sum += nums[j]
            max_sum = max(max_sum, inner_sum)
    return max_sum

```
