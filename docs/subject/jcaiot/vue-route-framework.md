# Vue CLI搭建最基本结构

## 基本搭建
通过脚手架快速搭建出项目想骨架
### 使用Vue CLI创建项目
主需要根据官网按照步骤一步一步来进行就可以了。选择默认的配置项目。
### 配置一个组件库
组件帮助我们快速的完成开发，并且提供更加优美的UI，关于组件库的选择，我选择了Vuetify这个组件库，我们将它配置到项目中
```Shell
vue add vuetify
```

## 配置路由
由于这个系统类似于博客，主要是信息的发布和内容展示的功能。所以我们需要展示端和管理端两个部分来完成我们的客户端内容。

### 选择展示端和管理端模板
在Vuetify这个组件库中，分别选中了前端，管理端，登录页三个基本的模板结构作为基础。将这三个组件放置在/src/components/，分别命名为WebView，AdminView和LoginView。
### 添加并配置基本路由
```Shell
npm install vue-router -s
```
添加路由之后，我们在/src/components/新建index.js来进行基础的路由配置
```js
import Vue from 'vue'
import Router from 'vue-router'
import WebView from '@/components/WebView'
import AdminView from '@/components/AdminView'
import LoginView from '@/components/LoginView'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'WebView',
            component: WebView
        }, {
            path: '/admin',
            name: 'AdminView',
            component: AdminView
        },
        {
            path: '/login',
            name: 'LoginView',
            component: LoginView
        }
    ]
})
```
最后我们不要忘记挂载到vue的实例上，之后我们就能够通过localhost:8080,localhost:8080/admin,localhost:8080/login分别访问到我们的页面中来了。

### 丰富路由层级
通过上述的内容我们能够通过url访问到展示页和管理页，但是实际上我们仍然需要一些二级的功能模块来支撑我们的项目，这时候就需要路由的嵌套来实现。

为根目录App.vue的router-view添加一个name属性，用来分辨哪些是组件对应哪些路由
```html
<router-view name="root"></router-view>
```
在/src/components/下创建web和admin文件夹，分别负责展示端和管理端的组件，同时在WebView中添加一个router-view，负责展示端的组件承装
```html
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view name="web"></router-view>
      </v-container>
    </v-content>
```
之后修正/src/components/index.js文件，添加路由嵌套，通过这部分内容可通过path，分别多个router-view
```js
export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'WebView',
            components: {
                'root': WebView
            },
            children: [{
                path: '/',
                components: {
                    'web': HomeView
                }
            }, {
                path: '/members',
                components: {
                    'web': MemberView
                }
            }]
        }, {
            path: '/admin',
            name: 'AdminView',
            components: {
                'root': AdminView
            },

        },
        {
            path: '/login',
            name: 'LoginView',
            components: {
                'root': LoginView
            },
        }
    ]
});
```






