---
title: Vue 数据代理和数据劫持
categories: 
 - Vue
tags:
 - Vue
date: 2021-06-18
---

虽然已经有些晚了，下面的这些记录都是基于Vue2.x。好像很多内容Vue3已经修改了。日常没赶上热乎的。

## MVVM
![0001](/blog/vue/MVVM.png =700x480)

上图摘自VUE官网，在VUE中，这种双向绑定的体现可以理解为
1. M ：Model 模型：data中的数据
2. V ：View  视图：模板代码
3. VM：ViewModel 视图模型：Vue实例

## 数据代理
通过一个对象，代理对另一个对象中属性的操作，即读和写。

1. 当我们在代码中的data中，定义了如下内容时，new Vue的操作代表我定义了一个vm实例。和很多Vue实例的属性一样，当创建这个实例的时候，也创建了一个_data对象，这个对象是属于vm实例的。
```javascript
    var data = { a: 1 };
    var vm = new Vue({
      el: "#root",
      data: data,
    });
```

2. 在创建实例对象的过程中，将我们在代码中定义的data向_data进行赋值。
3. 而后通过数据代理，将vm实例中_data对象中的属性，例子中的a，再添加给vm实例。在Vue2.x的版本中，这一步从_data中讲属性添加给vm实例的过程中，利用了Object.defineProperty。
为每一个添加到vm上的属性，都添加了getter，setter方法。在getter，setter方法中去操作data中对应的数据。
![0001](/blog/vue/vm_data.png =700x480)

## 数据劫持
在上述的表述2中，我们知道第二步将我们在代码中定义的data赋值给_data。而在上图中的控制台中我们发现_data和data并不一样，而是多了getter，setter方法。事实上正是在这个步骤，Vue通过setter来实现响应式，即修改_data中的数据后，页面能够及时响应变化。


### 能不能跳过_data，直接对data进行数据劫持
答案显然是不行，如果我们直接对data进行了定义的话，就会出现无线递归，最后造成栈溢出。
```js
Object.defineProperty(data,'a',{
  get(){
    return data.a
  },
  set(val){
    data.a=val
  }
})
```
### 简单模拟Vue数据劫持
```js
    //模拟vue实例
    let fakeVm = {};
    const obs = new Observer(data);
    console.log(obs);
    // 模拟vm实例中的_data和data
    fakeVm._data = data = obs;

    function Observer(obj) {
      //获得data中所有的key
      const keys = Object.keys(data);
      //对key进行遍历，并对每个属性进行包装。
      keys.forEach((k) => {
        Object.defineProperty(this, k, {
          get() {
            return obj[k];
          },
          set(val) {
            console.log("这时候的我正在重新解析模板");
            obj[k] = val;
          },
        });
      });
    }
```
![0001](/blog/vue/vm_data2.png =700x300)

通过效果我们可以看到，只要vm实例中的_data中的属性发生了改变，vue就在set方法调用的时候，重新解析模板，生成虚拟dom等等操作来实现响应式。

上面的代码是我们的模拟的fakeVm，如果真正的Vue实例的话，由于对data中的数据进行了数据代理，也就是说只要操作vue实例上的属性，就等于操作_data中的属性，就可以实现响应式。


## 关于数据监听需要注意的两种场景
1. Vue.set()方法的使用： 
如果我们直接对vm添加属性，是没有办法实现页面响应式的。道理很简单，因为data中的数据都进行了数据代理和数据劫持，我们直接操作vm，是没有办法操作其对应的getter，setter方法的，对于这种情况，可以使用Vue.set的api。
> 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi') 
> * 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

2. 数组的监听
> Vue 不能检测以下数组的变动：
> 1. 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
> 2. 当你修改数组的长度时，例如：vm.items.length = newLength

我们知道实现响应式可以粗浅的理解为在setter方法中重新解析模板，实现dom重新生成等等。而对于数组对象，Vue实现数据劫持的方法也就是生成了数组的setter，并没有数组中各个index对象的setter。不过Vue对于如下7个Api进行了包装，如果通过以下7个Api对数组进行了操作，将实现响应式。

> * push()
> * pop()
> * shift()
> * unshift()
> * splice()
> * sort()
> * reverse()