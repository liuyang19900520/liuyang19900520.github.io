---
title: No.0136-Single-Number
categories: 
 - LeetCode
tags:
 - Time complexity
date: 2021-09-01
---

## 题目
> Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.

#### Example1 :
> * Input: nums = [4,1,2,1,2]
> * Output: 4

## 解答思路
距离上次做题已经过去了很久很久了，今天又心血来潮做一次。

|  符号   | 描述  | 运算规则  |
|  ----  | ----  | ----  |
| &  | 与 | 两个都为1，结果为1 |
| |  | 或 | 两个都为0，结果为0 |
| ^  | 异或 | 两个相同为0，两个不同为1 |
| ~  | 取反 | 0变1，1变0 |
| <<  | 左移 | 各二进位全部左移若干位，高位丢弃，低位补0 |
| >>  | 右移 | 各二进位全部右移若干位，对无符号数，高位补0，有符号数，各编译器处理方法不一样，有的补符号位（算术右移），有的补0（逻辑右移） |


其中异或有几个特点
* 交换律
* 结合律 (a^b)^c == a^(b^c)
* 对于任何数x，都有 x^x=0，x^0=x
* 自反性: a^b^b=a^0=a;

### Python
```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for x in nums:
            result = x ^ result

        return result
```


如果将上面这道题升级的话，数组中不再只有一个数出现奇数次，而是有2个的时候，我们怎么办呢？

``` python
    def singleNumber2(self, nums: List[int]) -> List[int]:
        eor = 0
        for x in nums:
            eor ^= x
        # eor = a ^ b
        # eor =  1010111100
        # ~eor = 0101000011
        # ~eor+1 = 0101000100
        rightOne = eor & (~eor + 1)
        # rightOne 0000000100 也就会取出了自己最右侧的1

        eor2 = 0
        for x in nums:
            if x & rightOne == 0:
                eor2 ^= x

        return [eor2, eor ^ eor2]

```
1. 首先我们还是把和刚才得题目一样，假设这两个出现奇数次的值是a和b，把数组中所有的值都进行一遍异或操作，这样我们eor就会得到 a ^ b 这个值 
2. 之后我们通过eor & (~eor + 1)来实现一个操作，就是得到我们这个我们这个数的二进制的最右侧的一个1，得到这个1之后，分别和数组中所有元素进行与操作，可以知道 a 和 b 一定有一个是0，一个是1，而出现偶数次的元素也会成对出现在0，1两个阵营中，所以eor2 得到的就是 a 或 b 中的一个
3. 再进行一次一伙操作，就会得到另一个。

