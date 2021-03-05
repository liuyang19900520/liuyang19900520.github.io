---
title: No.0001-Two-Sum
categories: 
 - LeetCode
tags:
 - Array
date: 2021-03-02
---

## 题目
> Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

#### Example1 :
> * Input: nums = [2,7,11,15], target = 9
> * Output: Output: [0,1]
> * Output: Because nums[0] + nums[1] == 9, we return [0, 1].

#### Example 2:
> * Input: nums = [3,2,4], target = 6
> * Output: [1,2]

#### Example 3:
> * Input: nums = [3,3], target = 6
> * Output: [0,1]

#### Constraints:
> * 2 <= nums.length <= 103
> * -109 <= nums[i] <= 109
> * -109 <= target <= 109
> * Only one valid answer exists.

## 解答思路
采用Map判断的方法，将循环中的每一个元素和下标都记入Map中，循环的过程中，将所需要的值去与map中的寄存值比较。

### Python
```python
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # 循环数组中的所有的元素，得到i，即数组的index
        for i in range(len(nums)):
            # complement 是我们的目标元素
            complement = target - nums[i]
            # 如果我们的目标元素在数组中，则直接返回
            if complement in nums:
                # 返回数组中当前元素的下标，以及数组中目标元素的下标
                return [nums.index(nums[i]), nums.index(complement)]
```
