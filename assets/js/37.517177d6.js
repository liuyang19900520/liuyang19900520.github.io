(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{529:function(t,s,a){"use strict";a.r(s);var n=a(6),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"题目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#题目"}},[t._v("#")]),t._v(" 题目")]),t._v(" "),a("blockquote",[a("p",[t._v("Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum."),a("br"),t._v("\nFollow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.")])]),t._v(" "),a("h4",{attrs:{id:"example-1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-1"}},[t._v("#")]),t._v(" Example 1:")]),t._v(" "),a("blockquote",[a("ul",[a("li",[t._v("Input: nums = [-2,1,-3,4,-1,2,1,-5,4]")]),t._v(" "),a("li",[t._v("Output: 6")]),t._v(" "),a("li",[t._v("Explanation: [4,-1,2,1] has the largest sum = 6.")])])]),t._v(" "),a("h4",{attrs:{id:"example-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-2"}},[t._v("#")]),t._v(" Example 2:")]),t._v(" "),a("blockquote",[a("ul",[a("li",[t._v("Input: nums = [1]")]),t._v(" "),a("li",[t._v("Output: 1")])])]),t._v(" "),a("h4",{attrs:{id:"example-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-3"}},[t._v("#")]),t._v(" Example 3:")]),t._v(" "),a("blockquote",[a("ul",[a("li",[t._v("Input: nums = [0]")]),t._v(" "),a("li",[t._v("Output: 0")])])]),t._v(" "),a("h4",{attrs:{id:"example-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-4"}},[t._v("#")]),t._v(" Example 4:")]),t._v(" "),a("blockquote",[a("ul",[a("li",[t._v("Input: nums = [-1]")]),t._v(" "),a("li",[t._v("Output: -1")])])]),t._v(" "),a("h4",{attrs:{id:"example-5"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-5"}},[t._v("#")]),t._v(" Example 5:")]),t._v(" "),a("blockquote",[a("ul",[a("li",[t._v("Input: nums = [-2147483647]")]),t._v(" "),a("li",[t._v("Output: -2147483647")])])]),t._v(" "),a("h2",{attrs:{id:"解答思路"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解答思路"}},[t._v("#")]),t._v(" 解答思路")]),t._v(" "),a("h3",{attrs:{id:"python"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#python"}},[t._v("#")]),t._v(" Python")]),t._v(" "),a("p",[t._v("首先确定一个指针，在这个指针移动的循环内部，再做另一个指针想数组末位移动，以便取得两个指针之间的数值和的最大值。")]),t._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" sys\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" typing "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" List\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 暴力解决办法：使用滑动窗口办法进行解决")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("maxSubArray")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" List"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    max_sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("sys"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("maxsize\n    n "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("len")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 表示设置第一个指针，代表从左向右去判断")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        inner_sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 表示设置第二个指针，代表从当前位置到末位判断")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" j "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            inner_sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" nums"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n            max_sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("max")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("max_sum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" inner_sum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" max_sum\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);