---
title: No.0024-Swap-Nodes-in-Pairs
categories: 
 - LeetCode
tags:
 - LinkedList
date: 2020-01-25
---

## 题目
> Given a linked list, swap every two adjacent nodes and return its head.


#### Example1 :
> * Input: head = [1,2,3,4]
> * Output: [2,1,4,3]


#### Example2 :
> * Input: head = []
> * Output: []


#### Example3 :
> * Input: head = [1]
> * Output: [1]

## 解答思路
尝试递归的方式，递归的终止条件是链表中没有节点，或者链表中只有一个节点。 

如果链表中至少有两个节点，则在两两交换链表中的节点之后，原始链表的头节点变成新的链表的第二个节点，原始链表的第二个节点变成新的链表的头节点。链表中的其余节点的两两交换可以递归地实现。在对链表中的其余节点递归地两两交换之后，更新节点之间的指针关系，即可完成整个链表的两两交换。

用 head 表示原始链表的头节点，新的链表的第二个节点，用 newHead 表示新的链表的头节点，原始链表的第二个节点，则原始链表中的其余节点的头节点是 newHead.next。令 head.next = swapPairs(newHead.next)，表示将其余节点进行两两交换，交换后的新的头节点为 head 的下一个节点。然后令 newHead.next = head，即完成了所有节点的交换。最后返回新的链表的头节点 newHead。

### Python
```python

```
### JavaScript
```js
var swapPairs = function (head) {
    if (head == null || head.next == null) {
        return head
    }

    let newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};

//leetcode submit region end(Prohibit modification and deletion)

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
```
