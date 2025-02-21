(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{564:function(s,e,a){"use strict";a.r(e);var t=a(2),r=Object(t.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"配置简单的redis"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置简单的redis"}},[s._v("#")]),s._v(" 配置简单的Redis")]),s._v(" "),e("p",[s._v("其实这次没有想使用redis，毕竟整个项目都准备草草了事，但是随着相对的深入，遇到了jwt过时刷新的问题，当然也可以再签发一个refreshtoken来解决，最后想了又想，还是尝试一下redis吧。如果真的上线了，就直接运行在当时的EC2里就好了。")]),s._v(" "),e("h2",{attrs:{id:"安装redis"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装redis"}},[s._v("#")]),s._v(" 安装Redis")]),s._v(" "),e("p",[s._v("关于redis服务的搭建，直接参考官网，按照以往的经验，应该会遇到编译的错误，我们一步一步来，遇到的问题再做一次记录。"),e("a",{attrs:{href:"https://redis.io/download",target:"_blank",rel:"noopener noreferrer"}},[s._v("官网的搭建"),e("OutboundLink")],1),s._v("。我选择的目录是/usr/lib/下，和之前经常报是失败信息不同，这次我们成功完成了make，果然centos8就是不一样。"),e("br"),s._v("\n成功之后，我们得到了这样一条提示：Hint: It's a good idea to run 'make test' 😉，当我们选择make test的之后，熟悉的错误再次出现了。\nYou need tcl 8.5 or newer in order to run the Redis test。就是需要提个版本的意思。")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" http://downloads.sourceforge.net/tcl/tcl8.6.1-src.tar.gz  \n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" xzvf tcl8.6.1-src.tar.gz  "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-C")]),s._v(" /usr/local/  \n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v("  /usr/local/tcl8.6.1/unix/  \n./configure  \n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v("  \n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("p",[s._v("最后我们看到这行字，\\o/ All tests passed without errors!。")]),s._v(" "),e("h2",{attrs:{id:"配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[s._v("#")]),s._v(" 配置")]),s._v(" "),e("p",[s._v("在这之后，我们稍微调整一下redis的配置，分别注释掉本地连接，关闭保护模式，最后允许后台运行。")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# bind 127.0.0.1")]),s._v("\nprotected-mode no\ndaemonize "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v(" \n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[s._v("最后别忘了打开端口6379，redis的默认端口。")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("firewall-cmd "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--zone")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-port"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6379")]),s._v("/tcp "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--permanent")]),s._v("\nfirewall-cmd "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--reload")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("最后启动服务,加载配置，且后台运行。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("src/redis-server redis.conf &\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("最后在客户端连接测试一下，成功。")])])}),[],!1,null,null,null);e.default=r.exports}}]);