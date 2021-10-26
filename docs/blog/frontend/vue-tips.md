---
title: Vue 一些小贴士
categories: 
 - Vue
tags:
 - Vue
date: 2021-07-02
---

最近有复习一些Vue基础，虽然不是系统的学习，还是把过程中遇到的一些浅显的内容记录下来。虽然这些内容很有可能真的非常浅显。

## 关于v-for的key的内容

先说结论，使用v-for的时候，应该指定key，这个key最好是该元素对应的数据的id项目，为了避免不必要的麻烦，尽量使用业务上的id，不使用index。 
如果使用index的时候，对数据进行逆向添加等破坏原有数组对象顺序的操作时，会创建多余的真实DOM，效率降低。如果有input等DOM，产生DOM更新后，页面会错乱。

### 虚拟DOM中key的作用
key是虚拟DOM对象的标识，当数据源发生改变时，Vue会根据数据变化生成新的虚拟DOM，随后将新的虚拟DOM和旧的虚拟DOM进行差异比较，比较方法
* 如果旧的虚拟DOM中找到了与新虚拟DOM相同的key
  * 虚拟DOM中的内容没有改变，直接使用之前的真实DOM
  * 虚拟DOM中的内容发生了改变，生成新的真实DOM，随后替换掉之前页面中的真实DOM
* 如果旧的虚拟DOM中没有找到与新虚拟DOM相同的key
  * 创建新的真实DOM，之后渲染到页面中去。


## 关于Vue中函数的写法
* 所有被Vue管理的函数，最好写成普通函数，这样this的指向是vm实例或者是组件实例对象。
* 所有不被Vue管理的函数（定时器的回调函数，ajax等回调函数等等），最好写成箭头函数，这样this的指向是vm实例或者是组件实例对象。

## 浅显的理解Vue和VueComponent的关系。
虽然可以用java的理解方式把他们理解为类似继承的概念，但是在此之前还是可以先复习一个JavaScript的基础知识。

在JavaScript中，如果我们定义一个构造函数，又通过这个构造函数创建了一个实例对象。
那么这个函数的显示原型属性等于这个实例对象的隐式原型属性。
```javascript
  <script type="text/javascript">
    function ProtoTypeTest() {
      this.a = 1;
      this.b = 2;
    }

    const pt = new ProtoTypeTest();

    console.log(ProtoTypeTest.prototype); //显示原型属性
    console.log(pt.__proto__); //隐式原型属性

    // return true
    console.log(ProtoTypeTest.prototype == pt.__proto__);
  </script>
```
就是在上面这个结论的基础下，
Vue函数，通过new Vue()创建了vm实例对象
VueComponent函数，通过编写实例对象的标签，Vue会调用new VueComponent()来创建一个组件实例对象vc。

* Vue.prototype === vm.__proto__
* VueComponent.prototype === vc.__proto__
* VueComponent.prototype === Vue.prototype.__proto__

也就是说，VueComponent的原型对象也可以访问Vue原型上的属性和方法。  
参考下图（图片来自于b站尚硅谷Vue教程） 
![0001](/blog/vue/vue_vuecompontent.png =700x480)

[尚硅谷Vue2.0+Vue3.0全套教程丨vuejs从入门到精通](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=59) 


