---
title: No.0560-Subarray-Sum-Equals-K
categories: 
 - LeetCode
tags:
 - Sliding Window
date: 2020-11-07
---

## 题目
>Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.

#### Example 1:
>* Input: nums = [1,1,1], k = 2
>* Output: 2

#### Example 2:
>* Input: nums = [1,2,3], k = 3
>* Output: 2

#### Constraints:
> * 1 <= nums.length <= 2 * 104
> * -1000 <= nums[i] <= 1000
> * -107 <= k <= 107



## 解答思路
### Python
题目给出的数组，如果数组中连续的几个元素的和为k的话，计数为一。如果上述情况有多个，则返回多个。
```python
# 暴力解决办法：使用滑动窗口办法进行解决
def subarraySum(nums: List[int], k: int) -> int:
    n = len(nums)
    total = 0;
    # 表示设置第一个指针，代表从左向右去判断
    for i in range(n):
        inner_sum = 0
        # 表示设置第二个指针，代表从当前位置到末位判断
        for j in range(i, n):
            inner_sum += nums[j]
            if inner_sum == k:
                total = total + 1;
    return total;
```
上面这个方法看起来很简单，还是2个指针负责去移动，圈出区域后进行判断，最后获得total值并返回。但是暴力的解法明显会占用过多的内存，我们再思考一下有没有更为合适的解法。
我个人的水平是不足以想到的，于是我抄了一些大神的做法。
```python
def subarraySum2(nums: List[int], k: int) -> int:
    hashmap = {}
    acc = count = 0
    for num in nums:
        # acc我们可以代表相加的和
        acc += num
        # 这部分很好理解，就是我们得到目标值k的话，返回值count+1
        if acc == k:
            count += 1
        # acc-k代表了当前位置数组的和-目标值，
        # 如果这个acc-k在hashmap中，也就是可以理解为acc-hashmap中的一个值=k，而我们知道hashmap的值就是之前num到当前位置的和
        # 比如[1,2,3,1] k=6 当num循环到最后一个1的时候，我们的acc-k则等于1 在我们的hashmap中也整好有一个1，这就是说明，从hashmap等于1的那个num之后，到当前的num和为k
        # 同理，比如[1,2,3,3] k=6，当num循环到最后一个3的时候，我们的acc-k等于3，二在我们的hashmap中也有一个3，这说明，从hashmap等于3的那个num之后，到当前的num和为k
        if acc - k in hashmap:
            count += hashmap[acc - k]
        # 我们需要判断目前增加的值是否在map中，如果在就要给map中key为当前和的value +1
        if acc in hashmap:
            hashmap[acc] += 1
        else:
            hashmap[acc] = 1
    return count
```
在上面的方法中，我们定义的这个hashmap在承装数组各个位置的和，而当我们的acc-k得到的值在hashmap中得到的时候，从这个hashmap所对应的索引之后开始到当前的索引得到的和为k。
算起来有点绕口，一点点理解慢慢进步吧。

