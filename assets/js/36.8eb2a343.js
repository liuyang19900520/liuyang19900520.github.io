(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{528:function(t,a,s){"use strict";s.r(a);var n=s(6),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"题目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#题目"}},[t._v("#")]),t._v(" 题目")]),t._v(" "),s("blockquote",[s("p",[t._v("Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.`")])]),t._v(" "),s("h4",{attrs:{id:"example1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example1"}},[t._v("#")]),t._v(" Example1 :")]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("Input: height = [1,8,6,2,5,4,8,3,7]")]),t._v(" "),s("li",[t._v("Output: 49")]),t._v(" "),s("li",[t._v("Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can >contain is 49.")])])]),t._v(" "),s("h4",{attrs:{id:"example-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-2"}},[t._v("#")]),t._v(" Example 2:")]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("Input: height = [1,1]")]),t._v(" "),s("li",[t._v("Output: 1")])])]),t._v(" "),s("h4",{attrs:{id:"example-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-3"}},[t._v("#")]),t._v(" Example 3:")]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("Input: height = [4,3,2,1,4]")]),t._v(" "),s("li",[t._v("Output: 16")])])]),t._v(" "),s("h4",{attrs:{id:"example-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-4"}},[t._v("#")]),t._v(" Example 4:")]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("Input: height = [1,2,1]")]),t._v(" "),s("li",[t._v("Output: 2")])])]),t._v(" "),s("h4",{attrs:{id:"constraints"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#constraints"}},[t._v("#")]),t._v(" Constraints:")]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("n = height.length")]),t._v(" "),s("li",[t._v("2 <= n <= 3 * 104")]),t._v(" "),s("li",[t._v("0 <= height[i] <= 3 * 104")])])]),t._v(" "),s("h2",{attrs:{id:"解答思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解答思路"}},[t._v("#")]),t._v(" 解答思路")]),t._v(" "),s("p",[t._v("使用双指针的办法来判断。左右夹逼的方式，始终保持左指针在右指针左侧。\n同时需要注意的指针移动的出发条件，当左指针低于右侧指针的时候，移动左指针，反之移动右指针。")]),t._v(" "),s("h3",{attrs:{id:"python"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#python"}},[t._v("#")]),t._v(" Python")]),t._v(" "),s("div",{staticClass:"language-python line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[t._v("        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("maxArea")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" height"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" List"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("len")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("height"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n        j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n        area "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 指定到i<j，也就是双指针需要从左右两边分别获取，不能穿过中线")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            area "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("max")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("area"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("min")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("height"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" height"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果左指针比右指针低，就要移动左指针")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 原因说明，左边低的时候，移动一个左边，如果新的更高，就可能使面积更大")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" height"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" height"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n                i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果左指针比右指针高，就要移动右指针，如果移动后的更高，就可能使面积更大")]),t._v("\n                j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" area\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);