---
title: No.0283-Move-Zeros
categories: 
 - LeetCode
tags:
 - Array
date: 2020-12-04
---

## 题目
> Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

#### Example :
>* Input: Input: [0,1,0,3,12]
>* Output: [1,3,12,0,0]

#### Note:
>1. You must do this in-place without making a copy of the array.
>2. Minimize the total number of operations.
## 解答思路
双指针的方法，左指针指向的是已经处理好的数组的最后一项，右指针则指向待处理的数组的头部。右指针向右侧移动的过程中，遇到非零的元素是，将左侧指针的0与右侧指针交换
1. 左指针左边均为非零数；
2. 右指针左边直到左指针处均为零。
### Python
```python
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # 记录非0元素的位置
        j = 0
        n = len(nums)
        # 循环数组
        for i in range(n):
            # 当数组中的i元素不是0的时候
            if nums[i] != 0:
                # 将这个元素放到j的位置，由于只有当元素i不为0的时候j才+1，所以我们可以理解为，j永远小于等于i
                nums[j] = nums[i]
                # 什么时候会发生j!=i的情况呢，就是已经出现0的情况，
                # 也就是说，在上一个循环中，nums[i-1]等于0，i加了1，j没有+1，
                # 我们就可以将当前的i设置为0，j代表非0数组的位置。
                # 上面虽然做了一个0和非0的位置对调，在下一个循环的时候，i+1，非零位置的j也+1
                if j != i:
                    nums[i] = 0
                j += 1

```
### JavaScript
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {

    let pos = 0,
        idx = 0,
        temp;
    // 循环这个数组
    while (idx < nums.length) {
        //如果该次循环是非零数字的时候
        if (nums[idx] !== 0) {
            //当标记0的位置不是当前循环的位置的时刻，才进行转换
            //原因是我们认为pos标记的位置应该在当前循环的idx之前
            if (pos !== idx) {
                //临时变量存为0
                temp = nums[pos];
                //之前是0的位置存为当前的数字
                nums[pos] = nums[idx];
                //将当前的数字换做0
                nums[idx] = temp;
            }
            //将标记值+1；
            pos++;
        }
        //再次循环下一个数
        idx++;
    }
};
```
