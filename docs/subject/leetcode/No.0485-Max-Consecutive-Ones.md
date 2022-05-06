---
title: No.0485-Max-Consecutive-Ones
categories: 
 - LeetCode
tags:
 - Array
date: 2021-09-11
---

## 题目
> Given a binary array nums, return the maximum number of consecutive 1's in the array.

## 解答思路
便利数组，遇到1的情况下讲count值+1，如果不是1的情况下，判断一下当前最大连续值和count的最大值
### Python
```python
class Solution:
  def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
    if nums is None or len(nums) == 0:
      return 0
    count = 0
    result = 0
    for num in nums:
      if num == 1:
        count = count + 1
      else:
        result = max(result, count)
        count = 0

    return max(result, count)

    
```
