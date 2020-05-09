---
title: Vue 根据浏览器进行路由配置
categories: 
 - Vue
tags:
 - Vue
 - Vue Router
date: 2020-05-08
---
我以为Vuetify这个框架是响应式的，就不准备做pc和mobile两个版本了。但是由于我在pc版本上toolbar上放置了3个按钮，到mobile上就没能很好的适配成功，所以这次我不准备修改路由，也就是说，我希望一个url，通过pc和mobile两个版本访问的时候，能够返回2套不同的页面。  



## 设置浏览器工具类
就浏览器判断来说，和之前的routerUtils一样，我们这次同样在/src/utils/下创建deviceUtils.js，并且只写一个方法
```js
const deviceutils = {
    isMobile() {
        let flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i   
        );
        return flag;
    }
}
export default deviceutils;
```
## main.js中进行router-view判断
之前我们在main.js中放了一个router-view，用来判断哪个页面负责跳转。现在我们在这里添加一个判断，分别对应pc和mobile。
```html
  <div>
    <div v-if="!isMobile()">
      <router-view name="root-pc"></router-view>
    </div>
    <div v-if="isMobile()">
      <router-view name="root-mobile"></router-view>
    </div>
  </div>
```

## 创建mobile和pc两套模板
我们将之前的components模板全放到/src/components/pc/下，同时将和展示端相关的模板复制一套，放到/src/components/mobile/下，并在文件末尾加上标识，得到xxxMobile.vue文件作为模板。  
我们只修改了HomeView，也就是把原来在toolbar中现实的内容，挪到了navigationbar中去了，只保留了语言选项。  

**------@20200508修正**

以上的内容基础上，我又做了一些调整。大的原则一定是分为pc和sp两版ui，但是在项目结构中，我添加了layout这个层级，通过这个layout层中的router-view来进行页面之间的切换。于是在/src/layout的目录下，分别创建了如下内容：
* AdminLayout：是一个管理画面，已经加载了侧边菜单和顶部菜单，中间的router-view负责装管理页面的具体业务
* WebLayout：是一个前端展示页面，默认加载顶部菜单，中间的router-view负责装前端页面的具体业务
* MobileLayout： 这是前端展示页面，和Weblayout一直，中间的router-view负责装前端页面的具体业务，只不过都是手机的组件。  

除了layout层级之外，我还做了view层。这个层主要是作为整理页面的嵌入使用，也就是具体业务的整体页面，分别mobile和pc，pc中又分类了admin，web和common。view层作为整体暴露给layout的图像，如则路由的载入工作，而view是由不同components来组成的。  

components主要是承装可复用的组件，也就是我们自我整合的最基本的页面元素组合。  

按照上述逻辑，我的vue前端工程主要分为layout--view--component三个组件块。这也是照比之前的一处比较大的改动。

## 调整路由
在/router/index.js添加如下代码
```js
import Vue from 'vue';
import Router from 'vue-router';
import adminRouter from "./admin";
import webRouter from "./web";
import LoginView from "../views/pc/LoginView";

Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: [{
        path: '/login',
        components: {
            'root-pc': LoginView,
        }
    }, webRouter, adminRouter]

});
export default router;
```
代码很简单，我们分别添加了webRouter和adminRouter来避免代码的臃肿（实际上也没有什么特别的效果）。
```js
const webRouter =
    {
        path: '/',
        components: {
            'root-pc': WebLayout,
            'root-mobile': MobileLayout,
        }, children: [
            {
                path: '/',
                components: {
                    'pc-web': HomeView,
                    'mobile-web': MobileHomeView,
                },
            }, {
                path: '/:lang(jp|en)',
                components: {
                    'pc-web': HomeView,
                    'mobile-web': MobileHomeView,
                },
            }, {
                path: '/posts',
                components: {
                    'pc-web': PostListView,
                },
            }, {
                path: '/:lang(jp|en)/posts',
                components: {
                    'pc-web': PostListView,
                },
            }, {
                path: '/posts/:postId',
                components: {
                    'pc-web': PostView,
                },
            }, {
                path: '/:lang(jp|en)/posts/:postId',
                components: {
                    'pc-web': PostView,
                },
            }, {
                path: '/members',
                components: {
                    'pc-web': MemberView,
                },
            }, {
                path: '/:lang(jp|en)/members',
                components: {
                    'pc-web': MemberView,
                },
            },
        ]
    };
```
以上面的webRouter为了，在子路由下面分别对应我们的pc版本和mobile版本两种视图，同时为了国际化多语言配合的path也专门多做了一种。
通过上述的操作，我们就可以得到pc和mobile两套基础模板，后续我们可以在这个基础上添加业务了。













