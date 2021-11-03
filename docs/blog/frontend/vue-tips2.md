---
title: Vue 的有又一些小贴士
categories: 
 - Vue
tags:
 - Vue
date: 2021-07-21
---

虽然之前也写过一些贴士，再把最近复习的一些零散的知识再总结一下，虽然很多知识很浅显，难免会让大家看了贻笑大方，虽然自己知道也没什么大用，聊胜于无，给自己一些心里安慰吧。
本篇文章中使用的例子，是B站尚硅谷Vue课程中展示的例子。只用于自我学习使用。
## 插槽

### 默认插槽
定义一个Category组件。
```vue 
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
		<slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
	</div>
</template>

<script>
	export default {
		name:'Category',
		props:['title']
	}
</script>
```
在App组件中，我们对Category组件进行使用
```vue 
<template>
	<div class="container">
		<Category title="美食" >
			<img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
		</Category>

		<Category title="游戏" >
			<ul>
				<li v-for="(g,index) in games" :key="index">{{g}}</li>
			</ul>
		</Category>

		<Category title="电影">
			<video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
		</Category>
	</div>
</template>

<script>
	import Category from './components/Category'
	export default {
		name:'App',
		components:{Category},
		data() {
			return {
				foods:['火锅','烧烤','小龙虾','牛排'],
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
				films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
			}
		},
	}
</script>
```
在上面这个例子里，在子组件中我们用slot标签定义一个插槽，等着使用者来记性填充。这种情况就是默认插槽。Vue官方文档中有这样一条规则
> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

### 具名插槽
这个应该就相对简单，我们把上述的例子稍作改变






