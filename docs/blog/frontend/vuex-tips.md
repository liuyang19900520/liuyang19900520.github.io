---
title: Vuex 快速总结
categories: 
 - Vue
tags:
 - Vue
 - Vuex
date: 2021-08-11
---

把Vuex相关的知识点进行一个浅显的整理，便于以后自己查缺补漏

## 概念
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension (opens new window)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

换个理解方式，
1. 多个组件依赖同一个状态，或者说调用同一个数据时候。
2. 上述所讲的状态，或者说数据的更新操作，也可以被多个组件分别进行。


## Vuex核心概念和API
官网上有一张比较清晰的工作原理图，我们把这个原理图中的每一个小步骤简单展开一下，按照下图中的这个箭头的方向，我们没个小环节讲解一下。
![0001](/blog/vue/MVVM.png =700x480)

### State
* vuex 管理的状态对象
* state是唯一的，所谓唯一就官方的说法是单一状态树，一个对象就包括了全部的应用层级状态，每个应用将仅仅包含一个 store 实例。

### VueComponents
这是Vue的组件，很明显它能够得到state中的状态值，或者说拿到state中读数据进行显示。当我们去进行状态修改的时候，可以调用dispatch的api来进行分发。

### dispatch api
我们调用dispatch的时候我们需要传递2个内容，第一个是字符串类型的动作类型，第二个参数是状态值。

### Action
* Action的值也是一个对象，包含多个响应用户动作类型的回调函数，也就是上面我们说dispatch api中的第一个参数。
* 在组件中使用: $store.dispatch('对应的 action 回调名') 触发action中的回调，出发的时候，就能够在action中得到上述所说的第二个参数--状态值参数，也就是我们要修改的目标值。
* 在函数中，通过 commit( )来触发 mutation 中函数的调用, 间接更新 state 这个commit api 。
* 可以包含异步代码(定时器, ajax 等等)

### commit api
和dispatch api一样，我们在action的回调函数中调用commit api的时候，也需要传递2个内容，第一个是字符串类型的动作类型，第二个参数是状态值。

### Mutation
* 值是一个对象，包含多个直接更新 state 的方法，
* 在 action 中使用:commit('对应的 mutations 方法名') 触发，这个函数中能够得到state，并对其进行操作。
* mutations 中方法的特点:不能写异步代码、只能单纯的操作 state

### mutate api
在上述所属地Mutation中对state进行更新的时候，底层就会走mutate api进行操作，例如我们使用state.count +=1 的时候，mutate api就被调用了。


### Backend API
我们能不能直接从VueComponents直接调用commit方法来对Mutation进行操作，从而实现对state的控制呢，其实是可以的。毕竟我们知道这些API都是绑定在VueComponent实例上。
那之所以要用Action的原因主要是，我们往往需要更新state的值，往往是需要我们通过Axios从服务器请求获得的，这种情况下，我们常常把请求的操作，写在Action中。下面是一个官网的例子
``` Vue
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```
> 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。


## Getter
虽然有些不同，我们可以粗矿地理解为getter是store中的computed计算属性


## 辅助函数
约定大于配置，所以Vue提供了很多方便写法的辅助函数。
### mapStates
[mapStates-辅助函数](https://vuex.vuejs.org/zh/guide/state.html#mapstate-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0) 
上述的文档中实现了一个操作，并且逐步简化。
1. 我们可以使用 mapState 辅助函数帮助我们生成计算属性，也就是说我们可以把this.$store.state.xx赋予了一个别名。
2. 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
3. 使用对象展开运算符... 可以将将state中的对象与局部的计算属性混合使用，

### mapGetters
[mapGetters-辅助函数](https://vuex.vuejs.org/zh/guide/getters.html#mapgetters-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0) 
上述的负责从state中获取，mapGetters就是负责从Getter中获取数据。

### mapMutations
[mapGetters-辅助函数](https://vuex.vuejs.org/zh/api/#mapmutations)
mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用,换句话中，就是通过mapMutatios辅助函数，生成一个能够与Mutation对话的方法，也就是生成了一个包含commit的method。值得注意的事，如果在组件中绑定的时候，需要将顶一个这个函数的参数在模板中进行传递。 
如果不在模板中传值，默认传递的值是事件Event。

### mapActions
[mapActions-辅助函数](https://vuex.vuejs.org/zh/api/#actions)
mapActions 辅助函数将组件中的 methods 映射为 store.dispatch 调用,换句话中，就是通过mapMutatios辅助函数，生成一个能够与Atcion对话的方法，也就是生成了一个包含dispatch的method。值得注意的事，如果在组件中绑定的时候，需要将顶一个这个函数的参数在模板中进行传递。 
如果不在模板中传值，默认传递的值是事件Event。




