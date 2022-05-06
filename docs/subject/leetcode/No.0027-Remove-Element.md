---
title: No.0027-Remove-Element
categories: 
 - LeetCode
tags:
 - Array
date: 2021-10-11
---

## 题目
> Given an integer array nums and an integer val, remove all occurrences of val
> in nums in-place. The relative order of the elements may be changed.
> Since it is impossible to change the length of the array in some languages,
> you must instead have the result be placed in the first part of the array nums.
> More formally, if there are k elements after removing the duplicates, then the
> first k elements of nums should hold the final result. It does not matter what
> you leave beyond the first k elements.
> Return k after placing the final result in the first k slots of nums.
> Do not allocate extra space for another array. You must do this by modifying
> the input array in-place with O(1) extra memory.
## 解答思路
定义左右两个坐标，遍历数组，将左边存在val的元素，与右边不是val的元素相交换。 
如果最后跳出循环的时候，l<=r。
如果这个时候l位置上的元素等于val，说明从l位置开始都是val，非val的数组长度就是l
如果这个时候l位置上的元素不等val，说明从l+1位置上开始都是val，非val的数组长度就是l+1
### Python
```python

class Solution:
  def removeElement(self, nums: List[int], val: int) -> int:
    if nums is None or len(nums) == 0:
      return 0
    l = 0
    r = len(nums) - 1
    while (l < r):
      while (l < r and nums[l] != val):
        l = l + 1
      while (l < r and nums[r] == val):
        r = r - 1
      temp = nums[l]
      nums[l] = nums[r]
      nums[r] = temp

    if (nums[l] == val):
      return l
    if (nums[l] != val):
      return l + 1
  # leetcode submit region end(Prohibit modification and deletion)
    
```
