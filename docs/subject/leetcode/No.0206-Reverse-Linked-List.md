---
title: No.0206-Reverse-Linked-List
categories: 
 - LeetCode
tags:
 - LinkedList
date: 2020-01-24
---

## 题目
> Reverse a singly linked list.

#### Example1 :
> * Input: 1->2->3->4->5->NULL
> * Output: 5->4->3->2->1->NULL

### Python
```python

```
### JavaScript
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
        //双指针，分别是当前current和pre,其中cur在后，pre在前，关系应该是pre=cur.next
    //两个指针的关系是同向前进
    let current = head;
    //如果当前node为空
    if (!current) {
        return current;
    }
    //这就成为了pre=cur.next的关系
    let curPre = head.next;
    //当前节点的next节点为null节点
    current.next = null;
    //只要先行节点不为空，就可以走下去。
    while (curPre) {
        // 存下先行节点
        let tmp = curPre.next;
        // 先行节点的下一个设置为当前节点
        curPre.next = current;
        //当前节点设置为先行节点，等于交换
        current = curPre;
        //
        curPre = tmp;
    }
    return current;
};
```
