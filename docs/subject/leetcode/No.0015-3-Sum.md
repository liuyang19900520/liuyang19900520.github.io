---
title: No.0015-3-Sum
categories: 
 - LeetCode
tags:
 - Array
date: 2021-01-07
---

## 题目
> Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.Notice that the solution set must not contain duplicate triplets.

#### Example1 :
> * Input: nums = [-1,0,1,2,-1,-4]
> * Output: [[-1,-1,2],[-1,0,1]]

#### Example 2:
> * Input: nums = []
> * Output: []

#### Example 3:
> * Input: nums = [0]
> * Output: []

#### Constraints:
> * 0 <= nums.length <= 3000
> * -105 <= nums[i] <= 105
## 解答思路
求三个数的和，我们首先可以将a+b+c=0 转换为a+b=-c。为了理解这个题目，我们可以先做一个2个数和的问题。
求解一个[2sum](https://leetcode.com/problems/two-sum/)的题目.
```python 
class Solution:
    def twoSum(self, nums: 'List[int]', target: 'int') -> 'List[int]':
        # 获得一个集合，集合中分别是nums数组中的key和value
        dictionary = { value:index for (index, value) in enumerate(nums)}
        
        for (i,v) in enumerate(nums):
            targetNum = target - v
            
            # target的结果-循环出的值 如果在字典中并且不是自己，就输出这个索引值
            if targetNum in dictionary and dictionary[targetNum] != i:
                
                return [i, dictionary[targetNum]]
```
* 暴力求解，三层循环
* hash表方式
解决三个数的和问题，首先除了暴力解法之外，我们还可以采用hash表的方式，首先
* 双指针，左右下标推进

### Python
```python
       def threeSum(self, nums: List[int]) -> List[List[int]]:
        # nums排序
        nums.sort()
        # 最左侧为k，i和j左右夹逼
        length = len(nums)
        k = 0

        res = []
        # 遍历k，也就是最左侧的参考值
        for k in range(length - 2):
            # 排序后，最左侧如果大于0，则不可能出现三数和=0
            if nums[k] > 0:
                break
            # 如果nums[k]（用作比较的参数，作为另两个数的和的存在的元素重复了，则全跳过，直接对比下一个不同的nums[k]）
            if k > 0 and nums[k] == nums[k - 1]:
                continue
            i = 1 + k
            j = len(nums) - 1
            while i < j:
                s = nums[k] + nums[i] + nums[j]
                # nums[k]是参考值，nums[i]最小值，nums[j]最大值，如果还是小于0，说明要增加，所以要移动i
                if s < 0:
                    i += 1
                    # nums[i]也要跳过重复的项目
                    while i < j and nums[i] == nums[i - 1]:
                        i += 1
                # nums[k]是参考值，nums[i]最小值，nums[j]最大值，如果还是大于0，说明要减少，所以要移动j
                elif s > 0:
                    j -= 1
                    # nums[j]也要跳过重复的项目
                    while i < j and nums[j] == nums[j + 1]:
                        j -= 1
                else: 
                    res.append([nums[k], nums[i], nums[j]])
                    # 同时移动的原因是因为，我们不重复添加，要继续找出其他符合条件的组合。
                    i += 1
                    j -= 1
                    while i < j and nums[i] == nums[i - 1]:
                        i += 1
                    while i < j and nums[j] == nums[j + 1]:
                        j -= 1
        return res
```
