# 判断浏览器类型
我以为Vuetify这个框架是响应式的，就不准备做pc和mobile两个版本了。但是由于我在pc版本上toolbar上放置了3个按钮，到mobile上就没能很好的适配成功，所以这次我不准备修改路由，也就是说，我希望一个url，通过pc和mobile两个版本访问的时候，能够返回2套不同的页面

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

## 创建mobile和pc两套模板
我们将之前的components模板全放到/src/components/pc/下，同时将和展示端相关的模板复制一套，放到/src/components/mobile/下，并在文件末尾加上标识，得到xxxMobile.vue文件作为模板。  
我们只修改了HomeView，也就是把原来在toolbar中现实的内容，挪到了navigationbar中去了，只保留了语言选项。

## 调整路由
### main.js修正
之前我们在main.js中放了一个router-view，用来判断哪个页面负责跳转。现在我们在这里添加一个判断，分别对应pc和mobile。
```html
  <div>
    <div v-if="!isMobile()">
      <router-view name="root"></router-view>
    </div>
    <div v-if="isMobile()">
      <router-view name="root-mobile"></router-view>
    </div>
  </div>
```
之后我们就要为修改一下我们路由的代码了，简单的说，就是在现有的path所对应的router-view中，再添加上mobile的专属。
```js
const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'WebView',
            components: {
                'root': WebView,
                'root-mobile': WebViewMobile,
            },
            children: [{
                path: '/',
                components: {
                    'web': HomeView,
                    'web-mobile': HomeViewMobile,
                }
            }, {
                path: '/members',
                components: {
                    'web': MemberView,
                    'web-mobile': MemberViewMobile,
                }
            }]
        }, {
            path: '/:lang',
            name: 'WebView',
            components: {
                'root': WebView,
                'root-mobile': WebViewMobile,
            },
            children: [{
                path: '/',
                components: {
                    'web': HomeView,
                    'web-mobile': HomeViewMobile,
                }
            }, {
                path: '/:lang/members',
                components: {
                    'web': MemberView,
                    'web-mobile': MemberViewMobile,
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
通过上述的操作，我们就可以得到pc和mobile两套基础模板，后续我们可以在这个技术上添加业务了。













