(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{533:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("把Vuex相关的知识点进行一个浅显的整理，便于以后自己查缺补漏")]),t._v(" "),s("h2",{attrs:{id:"概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),s("blockquote",[s("p",[t._v("Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension (opens new window)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。")])]),t._v(" "),s("p",[t._v("换个理解方式，")]),t._v(" "),s("ol",[s("li",[t._v("多个组件依赖同一个状态，或者说调用同一个数据时候。")]),t._v(" "),s("li",[t._v("上述所讲的状态，或者说数据的更新操作，也可以被多个组件分别进行。")])]),t._v(" "),s("h2",{attrs:{id:"vuex核心概念和api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vuex核心概念和api"}},[t._v("#")]),t._v(" Vuex核心概念和API")]),t._v(" "),s("p",[t._v("官网上有一张比较清晰的工作原理图，我们把这个原理图中的每一个小步骤简单展开一下，按照下图中的这个箭头的方向，我们没个小环节讲解一下。\n![0001](/blog/vue/MVVM.png =700x480)")]),t._v(" "),s("h3",{attrs:{id:"state"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#state"}},[t._v("#")]),t._v(" State")]),t._v(" "),s("ul",[s("li",[t._v("vuex 管理的状态对象")]),t._v(" "),s("li",[t._v("state是唯一的，所谓唯一就官方的说法是单一状态树，一个对象就包括了全部的应用层级状态，每个应用将仅仅包含一个 store 实例。")])]),t._v(" "),s("h3",{attrs:{id:"vuecomponents"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vuecomponents"}},[t._v("#")]),t._v(" VueComponents")]),t._v(" "),s("p",[t._v("这是Vue的组件，很明显它能够得到state中的状态值，或者说拿到state中读数据进行显示。当我们去进行状态修改的时候，可以调用dispatch的api来进行分发。")]),t._v(" "),s("h3",{attrs:{id:"dispatch-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dispatch-api"}},[t._v("#")]),t._v(" dispatch api")]),t._v(" "),s("p",[t._v("我们调用dispatch的时候我们需要传递2个内容，第一个是字符串类型的动作类型，第二个参数是状态值。")]),t._v(" "),s("h3",{attrs:{id:"action"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#action"}},[t._v("#")]),t._v(" Action")]),t._v(" "),s("ul",[s("li",[t._v("Action的值也是一个对象，包含多个响应用户动作类型的回调函数，也就是上面我们说dispatch api中的第一个参数。")]),t._v(" "),s("li",[t._v("在组件中使用: $store.dispatch('对应的 action 回调名') 触发action中的回调，出发的时候，就能够在action中得到上述所说的第二个参数--状态值参数，也就是我们要修改的目标值。")]),t._v(" "),s("li",[t._v("在函数中，通过 commit( )来触发 mutation 中函数的调用, 间接更新 state 这个commit api 。")]),t._v(" "),s("li",[t._v("可以包含异步代码(定时器, ajax 等等)")])]),t._v(" "),s("h3",{attrs:{id:"commit-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#commit-api"}},[t._v("#")]),t._v(" commit api")]),t._v(" "),s("p",[t._v("和dispatch api一样，我们在action的回调函数中调用commit api的时候，也需要传递2个内容，第一个是字符串类型的动作类型，第二个参数是状态值。")]),t._v(" "),s("h3",{attrs:{id:"mutation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mutation"}},[t._v("#")]),t._v(" Mutation")]),t._v(" "),s("ul",[s("li",[t._v("值是一个对象，包含多个直接更新 state 的方法，")]),t._v(" "),s("li",[t._v("在 action 中使用:commit('对应的 mutations 方法名') 触发，这个函数中能够得到state，并对其进行操作。")]),t._v(" "),s("li",[t._v("mutations 中方法的特点:不能写异步代码、只能单纯的操作 state")])]),t._v(" "),s("h3",{attrs:{id:"mutate-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mutate-api"}},[t._v("#")]),t._v(" mutate api")]),t._v(" "),s("p",[t._v("在上述所属地Mutation中对state进行更新的时候，底层就会走mutate api进行操作，例如我们使用state.count +=1 的时候，mutate api就被调用了。")]),t._v(" "),s("h3",{attrs:{id:"backend-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#backend-api"}},[t._v("#")]),t._v(" Backend API")]),t._v(" "),s("p",[t._v("我们能不能直接从VueComponents直接调用commit方法来对Mutation进行操作，从而实现对state的控制呢，其实是可以的。毕竟我们知道这些API都是绑定在VueComponent实例上。\n那之所以要用Action的原因主要是，我们往往需要更新state的值，往往是需要我们通过Axios从服务器请求获得的，这种情况下，我们常常把请求的操作，写在Action中。下面是一个官网的例子")]),t._v(" "),s("div",{staticClass:"language-Vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("actions: {\n  async actionA ({ commit }) {\n    commit('gotData', await getData())\n  },\n  async actionB ({ dispatch, commit }) {\n    await dispatch('actionA') // 等待 actionA 完成\n    commit('gotOtherData', await getOtherData())\n  }\n}\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br")])]),s("blockquote",[s("p",[t._v("一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。")])]),t._v(" "),s("h2",{attrs:{id:"getter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#getter"}},[t._v("#")]),t._v(" Getter")]),t._v(" "),s("p",[t._v("虽然有些不同，我们可以粗矿地理解为getter是store中的computed计算属性")]),t._v(" "),s("h2",{attrs:{id:"辅助函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#辅助函数"}},[t._v("#")]),t._v(" 辅助函数")]),t._v(" "),s("p",[t._v("约定大于配置，所以Vue提供了很多方便写法的辅助函数。")]),t._v(" "),s("h3",{attrs:{id:"mapstates"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mapstates"}},[t._v("#")]),t._v(" mapStates")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://vuex.vuejs.org/zh/guide/state.html#mapstate-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0",target:"_blank",rel:"noopener noreferrer"}},[t._v("mapStates-辅助函数"),s("OutboundLink")],1),t._v("\n上述的文档中实现了一个操作，并且逐步简化。")]),t._v(" "),s("ol",[s("li",[t._v("我们可以使用 mapState 辅助函数帮助我们生成计算属性，也就是说我们可以把this.$store.state.xx赋予了一个别名。")]),t._v(" "),s("li",[t._v("当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。")]),t._v(" "),s("li",[t._v("使用对象展开运算符... 可以将将state中的对象与局部的计算属性混合使用，")])]),t._v(" "),s("h3",{attrs:{id:"mapgetters"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mapgetters"}},[t._v("#")]),t._v(" mapGetters")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://vuex.vuejs.org/zh/guide/getters.html#mapgetters-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0",target:"_blank",rel:"noopener noreferrer"}},[t._v("mapGetters-辅助函数"),s("OutboundLink")],1),t._v("\n上述的负责从state中获取，mapGetters就是负责从Getter中获取数据。")]),t._v(" "),s("h3",{attrs:{id:"mapmutations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mapmutations"}},[t._v("#")]),t._v(" mapMutations")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://vuex.vuejs.org/zh/api/#mapmutations",target:"_blank",rel:"noopener noreferrer"}},[t._v("mapGetters-辅助函数"),s("OutboundLink")],1),t._v("\nmapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用,换句话中，就是通过mapMutatios辅助函数，生成一个能够与Mutation对话的方法，也就是生成了一个包含commit的method。值得注意的事，如果在组件中绑定的时候，需要将顶一个这个函数的参数在模板中进行传递。\n如果不在模板中传值，默认传递的值是事件Event。")]),t._v(" "),s("h3",{attrs:{id:"mapactions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mapactions"}},[t._v("#")]),t._v(" mapActions")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://vuex.vuejs.org/zh/api/#actions",target:"_blank",rel:"noopener noreferrer"}},[t._v("mapActions-辅助函数"),s("OutboundLink")],1),t._v("\nmapActions 辅助函数将组件中的 methods 映射为 store.dispatch 调用,换句话中，就是通过mapMutatios辅助函数，生成一个能够与Atcion对话的方法，也就是生成了一个包含dispatch的method。值得注意的事，如果在组件中绑定的时候，需要将顶一个这个函数的参数在模板中进行传递。\n如果不在模板中传值，默认传递的值是事件Event。")]),t._v(" "),s("h2",{attrs:{id:"moudles"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#moudles"}},[t._v("#")]),t._v(" Moudles")]),t._v(" "),s("p",[t._v("这一部分并没有什么特殊需要注意点，就是将原来一个模块拆分成多个模块，粘贴一下官网的例子吧。")]),t._v(" "),s("div",{staticClass:"language-vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("const moduleA = {\n  state: () => ({ ... }),\n  mutations: { ... },\n  actions: { ... },\n  getters: { ... }\n}\n\nconst moduleB = {\n  state: () => ({ ... }),\n  mutations: { ... },\n  actions: { ... }\n}\n\nconst store = createStore({\n  modules: {\n    a: moduleA,\n    b: moduleB\n  }\n})\n\nstore.state.a // -> moduleA 的状态\nstore.state.b // -> moduleB 的状态 \n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br")])]),s("h3",{attrs:{id:"命名空间的例子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命名空间的例子"}},[t._v("#")]),t._v(" 命名空间的例子")]),t._v(" "),s("p",[t._v("当我们想使用mapXXX函数数组简写的方式的时候，我们无比定义命名空间才可以。\nvuex的定义，其中导入了每一个vuex的moudle")]),t._v(" "),s("div",{staticClass:"language-Vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("//该文件用于创建Vuex中最为核心的store\nimport Vue from 'vue'\n//引入Vuex\nimport Vuex from 'vuex'\nimport countOptions from './count'\nimport personOptions from './person'\n//应用Vuex插件\nVue.use(Vuex)\n\n//创建并暴露store\nexport default new Vuex.Store({\n\tmodules:{\n\t\tcountAbout:countOptions,\n\t\tpersonAbout:personOptions\n\t}\n})\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br")])]),s("p",[t._v("vuex的moudle的定义阶段，以其中的一个moudle为例子")]),t._v(" "),s("div",{staticClass:"language-vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("//人员管理相关的配置\nimport axios from 'axios'\nimport { nanoid } from 'nanoid'\nexport default {\n\tnamespaced:true,\n\tactions:{\n\t\taddPersonWang(context,value){\n\t\t\tif(value.name.indexOf('王') === 0){\n\t\t\t\tcontext.commit('ADD_PERSON',value)\n\t\t\t}else{\n\t\t\t\talert('添加的人必须姓王！')\n\t\t\t}\n\t\t},\n\t\taddPersonServer(context){\n\t\t\taxios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(\n\t\t\t\tresponse => {\n\t\t\t\t\tcontext.commit('ADD_PERSON',{id:nanoid(),name:response.data})\n\t\t\t\t},\n\t\t\t\terror => {\n\t\t\t\t\talert(error.message)\n\t\t\t\t}\n\t\t\t)\n\t\t}\n\t},\n\tmutations:{\n\t\tADD_PERSON(state,value){\n\t\t\tconsole.log('mutations中的ADD_PERSON被调用了')\n\t\t\tstate.personList.unshift(value)\n\t\t}\n\t},\n\tstate:{\n\t\tpersonList:[\n\t\t\t{id:'001',name:'张三'}\n\t\t]\n\t},\n\tgetters:{\n\t\tfirstPersonName(state){\n\t\t\treturn state.personList[0].name\n\t\t}\n\t},\n}\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br"),s("span",{staticClass:"line-number"},[t._v("31")]),s("br"),s("span",{staticClass:"line-number"},[t._v("32")]),s("br"),s("span",{staticClass:"line-number"},[t._v("33")]),s("br"),s("span",{staticClass:"line-number"},[t._v("34")]),s("br"),s("span",{staticClass:"line-number"},[t._v("35")]),s("br"),s("span",{staticClass:"line-number"},[t._v("36")]),s("br"),s("span",{staticClass:"line-number"},[t._v("37")]),s("br"),s("span",{staticClass:"line-number"},[t._v("38")]),s("br"),s("span",{staticClass:"line-number"},[t._v("39")]),s("br"),s("span",{staticClass:"line-number"},[t._v("40")]),s("br"),s("span",{staticClass:"line-number"},[t._v("41")]),s("br")])]),s("p",[t._v("调用阶段，如果要使用map简写函数，我们就必须要在moudle的定义中加上命名空间")]),t._v(" "),s("div",{staticClass:"language-vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("mapState"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("mapGetters"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("mapMutations"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("mapActions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vuex'")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Count'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t"),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("n")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//用户选择的数字")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("computed")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//借助mapState生成计算属性，从state中读取数据。（数组写法）")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapState")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'countAbout'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sum'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'school'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'subject'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapState")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'personAbout'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'personList'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//借助mapGetters生成计算属性，从getters中读取数据。（数组写法）")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapGetters")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'countAbout'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bigSum'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("methods")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapMutations")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'countAbout'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("increment")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'JIA'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("decrement")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'JIAN'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)")]),t._v("\n\t\t\t"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mapActions")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'countAbout'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("incrementOdd")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jiaOdd'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("incrementWait")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jiaWait'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mounted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$store"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n\n\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br"),s("span",{staticClass:"line-number"},[t._v("31")]),s("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);