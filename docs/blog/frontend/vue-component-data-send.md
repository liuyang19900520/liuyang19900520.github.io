---
title: Vue 组件传值的小总结（不使用Vuex）
categories: 
 - Vue
tags:
 - Vue
date: 2021-07-16
---

虽然也做了一些小型的项目，照猫画虎一般地实现了一些小功能，还是应该吧之前不是很明确的东西归纳一下。
由于是给自己做一个tips，所以很多内容就不特别标注了。
## 父传子：使用props属性
简单的说，在父组件中写子组件标签时候，可以在标签中自定义一些数据的key，value对，在子组件中用props来接受。
* props可以接受数组，对象，甚至是函数。也可以设置必须，类型，默认值等等
* props是只读的，Vue底层会监测我们对于props的修改，如果修改就会发出警告。如果一定要修改，最好在data中再定义一套，然后去修改data的根数据。

## 子传父：自定义事件
其实通过props属性也可以实现子传父。比如我在父组件中定义了一个函数testFuncInFather(data)。并且在父元素中写子元素标签的时候，传递给子元素。在子元素中用props进行接收之后，在子元素自己的业务逻辑中使用this.estFuncInFather()来进行出发。这种情况并不是最优解，Vue中可以通过自定义事件来实现子传父。 
### 绑定
1. 在父组件中写子元素标签时候，通过v-on:自定义事件名
2. 在父组件中写子元素标签的时候，使用ref属性。然后在mounted的钩子函数中，进行事件绑定 this.$ref.xxx.$on(自定义事件名,回调函数) 注意，该回调函数应该定义在父组件的methods中或者使用箭头函数。否则this的指向会出现问题。
> * 通过function定义的函数，需要有调用的对像。this指向应该是调用function的对象。随着调用者的变化而变化。
> * 箭头函数就是一段逻辑，没有对象，它的this指向声明函数时的作用域下。

我在网上找了两篇文章
* [ES6---箭头函数()=>{} 与function的区别](https://blog.csdn.net/github_38851471/article/details/79446722) 
* [普通函数与箭头函数的区别是什么？](https://segmentfault.com/a/1190000040016702)


### 触发
在子组件中，直接使用this.$emit(自定义事件名，参数)。
如果绑定的方法是第二种的话，在父组件的methods定义的毁掉方法，也需要定义参数。
### 解绑
this.$off(自定义事件名)


## 组件之间通信：全局事件总线
关于事件总线的概念，在刚参加工作时候做Android时使用过EventBus，但是经年累月基本上也忘干净了。在Vue中我们也来实现一个事件总线。

### 原理
我们想实现兄弟组件之间的调用，其实可以利用上文中的自定义事件。
比如说我们有A，B，C三个兄弟组件，如果A想接受C组件传递来的数据，我们可以在外部定义一个X组件，这个X组件与ABC均没有所属关系。我在A组件中写一个回调testCallback，同时为X组件绑定自定义事件test等待调用。然后在C组件中来触发X组件中的test事件，在触发时间的同时传递数据，该数据就应该是A组件中testCallback函数的参数。也就是说，C组件通过调用X组件的自定义事件，传递了参数，同时启动了A组件中自定义事件的回调，来实现数据的传递。 

对于X组件来说，需要如下2个设计思路
1. X组件对于所有组件都可见
2. X组件需要能够调用自定义事件的相关Api，$on,$off,$emit等。

我们首先回忆之前记录的一个内置关系，
* Vue.prototype === vm.__proto__
* VueComponent.prototype === vc.__proto__
* VueComponent.prototype === Vue.prototype.__proto__
这个关系可以让组件实例对象，上述的vc能够访问到Vue原型上的属性和方法。

### 安装全局事件总线
```javascript
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
```

简单解释一下，如果我们把Vue.prototype.$bus设置成为一个普通对象的话，他是没有办法获取到Vue原型对象的，所以，只要我们把vm（也就是Vue的实例对象）赋值给$bus，$bus就能够获取到Vue原型上的属性和方法，而自定义事件的相关Api，$on,$off,$emit等，就在Vue原型上。

所以我们在vm实例的beforeCreate生命周期中，声明这个$bus，这个$bus就能够获得Vue原型上的各个Api了。 

而在各个组件中使用的时候
#### 接受数据的组件
```
    mounted() {
        		this.$bus.$on('hello',(data)=>{
			console.log('收到了数据',data)
		})
	},
	beforeDestroy() {
		this.$bus.$off('hello')
	},
```

#### 发送数据的组件
```
	methods: {
			sendData(){
				this.$bus.$emit('hello',“data”)
			}
		},
```
上面的this分别代表这两个组件实例对象，还是通过我们之前记录的那个内置关系，在VueComponent的实例的原型链上能够找到Vue的原型链，那么也就是我们能够找到$bus，同时也能够找到Vue原型上的其他属性和方法。从而实现了兄弟组件之间数据传递的办法。


