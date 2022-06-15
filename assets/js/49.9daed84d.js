(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{557:function(n,s,a){"use strict";a.r(s);var t=a(6),e=Object(t.a)({},(function(){var n=this,s=n.$createElement,a=n._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h2",{attrs:{id:"简单应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简单应用"}},[n._v("#")]),n._v(" 简单应用")]),n._v(" "),a("ol",[a("li",[n._v("导入依赖。在common中导入maven依赖后，我们就可以在各个工程中进行使用")]),n._v(" "),a("li",[n._v("在8848的nacos服务中配置好响应的配置文件\n"),a("img",{attrs:{src:"/subject/layman-cloud/cloud-3-nacos.png",alt:"0001"}})]),n._v(" "),a("li",[n._v("在Spring Boot使用@Values注解中进行常规操作的文件取得，这样在我们访问这个Controller的时候，就可以直接得到配置中心中发布的配置。")])]),n._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[n._v("  "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[n._v("@Value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[n._v('"${coupon.user.name}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("private")]),n._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[n._v("String")]),n._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n  "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[n._v("@Value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[n._v('"${coupon.user.age}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("private")]),n._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[n._v("Integer")]),n._v(" age"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(";")]),n._v("\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br"),a("span",{staticClass:"line-number"},[n._v("4")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[n._v("在配置文件中进行配置，默认规则是，如果配置中心存在则优先")]),n._v(" "),a("li",[n._v("动态获取，需要再相应的Controller上添加@RefreshScope注解来实现动态获取")])]),n._v(" "),a("h2",{attrs:{id:"命名空间-配置集-配置集id-配置分组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命名空间-配置集-配置集id-配置分组"}},[n._v("#")]),n._v(" 命名空间,配置集，配置集ID，配置分组")]),n._v(" "),a("p",[n._v("负责配置隔离，默认为public。\n比如基于环境进行隔离，为开发，测试，生产环境进行配置，我个人理解就像单体建构下设置多个properties文件一样。")]),n._v(" "),a("p",[a("img",{attrs:{src:"/subject/layman-cloud/nacos-namespace.png",alt:"0001"}}),n._v("\n当然，也可以依据各个微服务不同来进行隔离，比如为不同的微服务创建不同的配置文件")]),n._v(" "),a("ul",[a("li",[n._v("配置集：所有配置的集合")]),n._v(" "),a("li",[n._v("配置集ID：Data ID，可以理解为spirng环境中的文件名")]),n._v(" "),a("li",[n._v("配置分组：逻辑分组")])]),n._v(" "),a("p",[n._v("我们可以组织一个案例\n每个微服务创建自己的命名空间，使用配置分组区别环境（dev,test,prod）\n"),a("img",{attrs:{src:"/subject/layman-cloud/nacos-group.png",alt:"0001"}}),n._v("\n只需要在bootstrap.properties中进行如下配置\n···\nspring.cloud.nacos.config.namespace=6109967a-a144-4aad-82fd-2b837887fc2a\nspring.cloud.nacos.config.group=dev\n···")]),n._v(" "),a("p",[n._v("当然，为了配置文件进行简化，我们往往可以把一个大的配置文件进行简化和拆解，就等于我们在配置中心中进行了拆解和合并")]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("spring.cloud.nacos.config.name=layman-coupon\nspring.cloud.nacos.config.server-addr=127.0.0.1:8848\nspring.cloud.nacos.config.namespace=347a8628-7a40-430c-a1d2-3e17da9ebdb8\n\nspring.cloud.nacos.config.extension-configs[0].data-id=mybatis.yml\nspring.cloud.nacos.config.extension-configs[0].group=dev\nspring.cloud.nacos.config.extension-configs[0].refresh=true\n\nspring.cloud.nacos.config.extension-configs[1].data-id=datasource.yml\nspring.cloud.nacos.config.extension-configs[1].group=dev\nspring.cloud.nacos.config.extension-configs[1].refresh=true\n\nspring.cloud.nacos.config.extension-configs[2].data-id=others.yml\nspring.cloud.nacos.config.extension-configs[2].group=dev\nspring.cloud.nacos.config.extension-configs[2].refresh=true\n\nspring.cloud.nacos.config.extension-configs[3].data-id=layman-coupon.properties\nspring.cloud.nacos.config.extension-configs[3].group=dev\nspring.cloud.nacos.config.extension-configs[3].refresh=true\n\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br"),a("span",{staticClass:"line-number"},[n._v("4")]),a("br"),a("span",{staticClass:"line-number"},[n._v("5")]),a("br"),a("span",{staticClass:"line-number"},[n._v("6")]),a("br"),a("span",{staticClass:"line-number"},[n._v("7")]),a("br"),a("span",{staticClass:"line-number"},[n._v("8")]),a("br"),a("span",{staticClass:"line-number"},[n._v("9")]),a("br"),a("span",{staticClass:"line-number"},[n._v("10")]),a("br"),a("span",{staticClass:"line-number"},[n._v("11")]),a("br"),a("span",{staticClass:"line-number"},[n._v("12")]),a("br"),a("span",{staticClass:"line-number"},[n._v("13")]),a("br"),a("span",{staticClass:"line-number"},[n._v("14")]),a("br"),a("span",{staticClass:"line-number"},[n._v("15")]),a("br"),a("span",{staticClass:"line-number"},[n._v("16")]),a("br"),a("span",{staticClass:"line-number"},[n._v("17")]),a("br"),a("span",{staticClass:"line-number"},[n._v("18")]),a("br"),a("span",{staticClass:"line-number"},[n._v("19")]),a("br"),a("span",{staticClass:"line-number"},[n._v("20")]),a("br")])]),a("p",[n._v("在nacos配置中心的各个文件如下\n"),a("img",{attrs:{src:"/subject/layman-cloud/nacos-ymls.png",alt:"0001"}})])])}),[],!1,null,null,null);s.default=e.exports}}]);