---
title: Vue i18n实现国际化
categories: 
 - Vue
tags:
 - Vue
 - i18n
date: 2020-05-09
---

## 实现基本配置
### 安装并挂载
```shell
vue add i18n
```
按照默认的配置即可
### 创建locals文件
在/src/locales/中分别创建zh.json,en.json,jp.json分别放置我们多语言的配置文件，以en.json为例子
```json
{
  "home": "Home",
  "members": "Members",
  "lang":"Languages"
}
```
### 配置i18n的配置文件
创建/src/plugins/i18n.js
```js
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages() {
  //加载json文件
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  })
  return messages;
}

export default new VueI18n({
  //判断当前环境语言
  locale: process.env.VUE_APP_I18N_LOCALE || 'zh',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh',
  messages: loadLocaleMessages()
});
```
最后别忘了将i18n的插件挂载到vue实例上。

### 在展示端的菜单栏修改
```html
<v-menu offset-y>
    <template v-slot:activator="{ on }">
        <v-btn depressed dark v-on="on">
        {{$t("lang")}}
        <v-icon>mdi-menu-down</v-icon>
        </v-btn>
    </template>
    <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
    </v-list>
</v-menu>
```
这是启动项目，我们就应该能看到菜单栏上显示中文，我理解这是因为我的系统环境是中文，所以显示的是中文。

## 储存当前语言
### 安装并配置vuex
在vuex的官方网站上，其实说明了如果我们的业务并不复杂，其实更适合使用简单的store模式来进行配置，为了练习，我还是选择了vuex。首先需要安装vuex
```shell
npm i -s vuex
```
安装成功之后，我们需要在/src/store/modules下创建一个message.js，也就是说明我们需要采用modules模式来进行vuex的配置。再次强调，不是很复杂的情况下没有必要这么做，为了学习我还是做了这个尝试。
```js
export default {
    namespaced: true,
    //负责储存
    state: {
        lang: 'zh'
    },
    //负责修改,可以理解为私有方法
    mutations: {
        SET_LANGUAGE(state, lang) {
            state.lang = lang;
        }
    },
    //类似于暴露给外部的方法，简单理解为message.js进行了state的封装
    actions: {
        setLang({
            commit
        }, lang) {
            commit("SET_LANGUAGE", lang)
        }
    }
};
```
而/src/store/index.js的代码如下
```js
import Vue from 'vue';
import Vuex from 'vuex';

import message from '@/store/modules/message';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    message
  }
});
```
### 测试vuex切换存储语言
我们刚刚基本配置成功了vuex，为了验证一下效果，我们有必要更改一下页面上的代码。首先我们需要配置一个展示信息，在/src/components/WebView.vue中，添加如下代码，负责绑定语言信息，用于展示，来测试我们能否通过下拉菜单修改vuex中的存值。
```html
<v-content>
      <v-container class="fill-height" fluid>
        <input type="text" v-model="$store.state.message.lang" />
        <router-view name="web"></router-view>
      </v-container>
</v-content>
```
同时，我们需要修改一下下拉菜单，并且为菜单添加点击事件
```html
<v-list>
    <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title @click="changeLang(item.name)">{{ item.title }}</v-list-item-title>
    </v-list-item>
</v-list>
```
data中，我们为items添加了name属性。同时通过点击事件确认是否能够切换成功。
```js
<script>
export default {
  name: "WebView",
  data: () => ({
    drawer: null,
    items: [
      { name: "en", title: "English" },
      { name: "jp", title: "日本語" },
      { name: "zh", title: "简体中文" }
    ]
  }),
  methods: {
    link2page: function(url) {
      this.$router.push(url);
    },
    changeLang: function(lang) {
      this.$store.dispatch("message/setLang", lang);
      this.$i18n.locale = lang;
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
```
## 通过路由实现语言的切换
上述的内容我们已经可以实现语言的切换了，并且通过测试的store，我们也发现已经将当前的语言存入了store中。
不过我们发现，url并没有改变，我们希望发送的请求能够使url也产生变化，从而响应到不同的页面中来。
也就是说，我们需要在切换路由和改变语言的时候，重新整理一个url，然后用router.push来进行调用即可。

### 动态路由
```js
{
    path: '/:lang',
    name: 'WebView',
    components: {
        'root': WebView
    },
    children: [{
        path: '/:lang',
        components: {
            'web': HomeView
        }
    }, {
        path: '/:lang/members',
        components: {
            'web': MemberView
        }
    }]
}
```
在路有种添加一个lang的参数，负责我们未来切换的时候添加上我们的语言标示。
### 工具类创建
创建/src/utils/routerUtils，我希望随用随掉，所以没有把这个工具类挂载到vue实例上。在这个工具类中我们定义了2个方法，分别是
#### link2page(url)
主要负责菜单栏的路由跳转，并且考虑到语言的状态
#### createLangUrl(fromLang) 
主要是语言栏的切换调用，为语言切换后提供一个跳转的url
```js
var routerUtils = {
    link2page(url) {
        console.log("现在路由", this.$route.path);
        // let routeLang = this.$route.params.lang;
        let toLang = this.$store.state.message.lang;
        if (toLang == "zh") {
            url = "/" + url;
        } else {
            url = "/" + toLang + url;
        }
        if (url.startsWith("//")) {
            url = url.substr(1);
        }
        if (url != "/" && url.endsWith("/")) {
            url = url.slice(0, -1);
        }
        console.log("跳转路由", url);
        this.$router.push(url);
    },
   createLangUrl(fromLang) {
        let toLang = this.$store.state.message.lang;
        console.log("fromLang", fromLang);
        console.log("toLang", toLang);
        let toPath = this.$route.path;
        console.log("toPath修改前", toPath);

        if (toPath.startsWith("/en")) {
            toPath = toPath.replace("/en", "");
        } else if (toPath.startsWith("/jp")) {
            toPath = toPath.replace("/jp", "");
        }
        if (toPath.endsWith("/")) {
            toPath = toPath.slice(0, -1);
        }


        if (toLang === 'zh') {
            toPath = "/";
        } else {
            toPath = "/" + toLang + toPath;
        }
        return toPath;
    }
}
export default routerUtils;
```
### WebView component调用
由于没有挂载到vue实例上，所以在component上我们需要通过import来导入。
需要注意的事，我在methods里定义了2个内部的方法，并且将util内的方法赋给了这个方法，是不是有更好的写法我不确定。
```js
<script>
import routerUtils from "../utils/routerUtils";

export default {
  name: "WebView",
  data: () => ({
    drawer: null,
    items: [
      { name: "en", title: "English" },
      { name: "jp", title: "日本語" },
      { name: "zh", title: "简体中文" }
    ]
  }),
  methods: {
    link2page: routerUtils.link2page,
    createLangUrl: routerUtils.createLangUrl,
    changeLang: function(lang) {
      let fromLang = this.$store.state.message.lang;
      this.$store.dispatch("message/setLang", lang);
      let toPath = this.createLangUrl(fromLang);
      console.log(toPath);
      this.$router.push(toPath);
      this.$i18n.locale = lang;
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
```
好了，通过以上的步骤，我们能够实现语言切换，并且通过url进行跳转。














