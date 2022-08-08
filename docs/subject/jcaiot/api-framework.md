---
title: 设计Vue端API请求模块
categories: 
 - Vue
tags:
 - Vue
date: 2020-09-01
---


之前我们在[配置简单的NestJS](https://www.liuyang19900520.com/subject/jcaiot/nestjs-starter.html) 中为服务端实现了跨域请求，这次我们设计一个客户端的Api请求模块。

## 创建api模块
### 导入axios模块
在/src/utils/下创建axiosUtils.js。目前我们只是设计了baseURL和超时时间，后续我们需要在这里设计一些拦截器，共通header之类的内容。
```js
import axios from 'axios';

var instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 30000
});

export default instance;
```

### 创建单独业务请求模块
创建/src/api/。这个部分主要负责放我们所有的业务Api。首先我们先创建一个bannersApi.js。
```js
import axios from '../utils/axiosUtils';
const banner = {
    selectBanner(lang) {
        return axios.get("/banners/" + lang);
    }
}
export default banner;
```
代码很简单，就是一个单纯的访问，我们可以创建不同的业务api，并且在里面实现我们的业务CRUD

### 创建index导出业务请求
同样在/src/api/下，创建一个index.js负责统一导出api。
```js
/** 
 * api接口的统一出口
 */

import banner from './bannersApi';

// 导出接口
export default {
    banner
}
```
在这个文件中，我们可以分别倒入，然后再统一导出接口，以便我们挂载到Vue实例上。

### 将api组件挂载到Vue实例上
在main.js上，我们修改了如下代码，可以通过注释看到，我们将api挂载到了Vue实例上。
```js
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import router from './router/';
import store from './store';
import api from './api'

Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
```

## Api模块调用的事例
回到我们的业务代码上来看，再写真正的业务之前，我们需要看看是不是代码能够顺利运行。
### 创建请求方法
在/src/components/pc/web/HomeView.vue中，我们创建一个方法负责请求我们的banner
```Js 
methods: {
    getBanner: function() {
      let lang = this.$store.state.message.lang;
      this.$api.banner.selectBanner(lang).then(res => {
        console.log(res);
        this.banner = res.data.banner;
      });
    }
  },
```
上述代码的调用位置在created生命周期中，返回值的banner是data，并且作为测试结果世界显示在页面上。我的结果是OK的。

## 实现根据语言实现重新加载
上述功能实现后又发生了一个小问题，就是我们切换语言，只能切换路由，但是我们真正的数据并没有实现更新。原因是我们发送请求的处理是在createrd的生命周期中，我想的办法是加一个监听属性，就监听路由的path，之后再调用刚刚的请求api。
```js
 watch: {
    "$route.path": "getBanner"
  }
```
再次切换语言的时候，我们能够实现了固定文字、路由地址、api返回数据的多语言切换。
















