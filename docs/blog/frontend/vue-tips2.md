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
这个应该就相对简单，我们把上述的例子稍作改变，Category组件我们如下定义，比默认插槽我们多了一个新的插槽
```vue
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
		<slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现1</slot>
		<slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现2</slot>
	</div>
</template>

<script>
	export default {
		name:'Category',
		props:['title']
	}
</script>
```

其实我们应该也可以猜得到了，在App组件使用插槽的时候，我们应该对多个元素进行了name的指定即可。只不过Vue2.6之后，Api进行了统一，在使用者，也就是父组件的地方，采用v-slot:slotName的方式来进行了插槽指定。
```vue
<template>
	<div class="container">
		<Category title="美食" >
			<img v-slot:center src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
			<a v-slot:footer href="http://www.atguigu.com">更多美食</a>
		</Category>

		<Category title="游戏" >
			<ul v-slot:center>
				<li v-for="(g,index) in games" :key="index">{{g}}</li>
			</ul>
			<div class="foot" v-slot:footer>
				<a href="http://www.atguigu.com">单机游戏</a>
				<a href="http://www.atguigu.com">网络游戏</a>
			</div>
		</Category>

		<Category title="电影">
			<video v-slot:center controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
			<template v-slot:footer>
				<div class="foot">
					<a href="http://www.atguigu.com">经典</a>
					<a href="http://www.atguigu.com">热门</a>
					<a href="http://www.atguigu.com">推荐</a>
				</div>
				<h4>欢迎前来观影</h4>
			</template>
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
### 作用域插槽
作用域插槽和刚才的内容有些不同，我们可以理解为，数据在子组件中，而操作在父组件中，插槽作为传递数据一种手段来粗浅的理解。 
再修改一下Category组件,最明显的不同就是数据定义在了子组件之中。并且在插槽上，我们定义了一个game属性，属性值是data中的games
```Vue
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<slot :games="games" msg="hello">我是默认的一些内容</slot>
	</div>
</template>

<script>
	export default {
		name:'Category',
		props:['title'],
		data() {
			return {
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
			}
		},
	}
</script>
```
App组件中，如果我们想要使用子组件中的数组，可以再父组件中使用v-slot来进行定义了和使用。 
需要注意的事，
> 1. 注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确 
> 2. 只要出现多个插槽，请始终为所有的插槽使用完整的基于 template 的语法

```vue
<<template>
	<div class="container">
		<Category title="游戏" v-slot:default="atguigu">			
			<ul>
				<li v-for="(g,index) in atguigu.games" :key="index">{{g}}</li>
			</ul>
		</Category>

		<Category title="游戏">
			<template v-slot="{games}">
				<ol>
					<li style="color:red" v-for="(g,index) in games" :key="index">{{g}}</li>
				</ol>
			</template>
		</Category>

		<Category title="游戏">
			<template v-slot="{games}">
				<h4 v-for="(g,index) in games" :key="index">{{g}}</h4>
			</template>
		</Category>
	</div>
</template>

<script>
	import Category from './components/Category'
	export default {
		name:'App',
		components:{Category},
	}
</script>
```
同时根据Vue文档中的介绍，作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里，这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 (单文件组件或现代浏览器)，你也可以使用 ES2015 解构来传入具体的插槽 prop，也可以使用重名功能，例如v-slot="{ user: person }"这种写法。

[更多插槽的使用](https://cn.vuejs.org/v2/guide/components-slots.html) 



