---
title: No.0020-Valid-Parentheses
categories: 
 - LeetCode
tags:
 - Stack
date: 2021-08-11
---

## 题目
最近的请求次数，判断最近3000ms内实施了多少次请求。
>   Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

>  An input string is valid if:

>  Open brackets must be closed by the same type of brackets.

>  Open brackets must be closed in the correct order.
   

## 解答思路
这是一个括号题目，如果当前括号是前括号的话，就直接入栈。
如果是后括号的话，有两种情况。 

第一种情况是栈中没有数据，那就直接返回false。因为后括号在前。

第二种情况是有数据的话，那就弹出栈顶的数据，如果不成对就是false。

最后如果stack中为空，就是True，反之就是False

### Python
``` python
class Solution:
  def isValid(self, s: str) -> bool:
    if len(s) == 0:
      return True
    stack = []
    for c in s:
      if c == '(' or c == '[' or c == '{':
        stack.append(c)
      else:
        if len(stack) == 0:
          return False
        else:
          temp = stack.pop()
          if temp == '(':
            if c != ')':
              return False
          elif temp == '[':
            if c != ']':
              return False
          elif temp == '{':
            if c != '}':
              return False
    if len(stack) == 0:
      return True
    else:
      return False


```
