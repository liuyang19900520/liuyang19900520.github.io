(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{563:function(t,s,a){"use strict";a.r(s);var n=a(6),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"启动命令备注"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动命令备注"}},[t._v("#")]),t._v(" 启动命令备注")]),t._v(" "),a("p",[t._v("首先创建如下目录结构")]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('mkdir -p /mydata/elasticsearch/config\nmkdir -p /mydata/elasticsearch/data\necho "http.host: 0.0.0.0" >> /mydata/elasticsearch/config/elasticsearch.yml\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("docker run --name elasticsearch -p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9200")]),t._v(":9200 -p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9300")]),t._v(":9300 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-e  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"discovery.type=single-node"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("ES_JAVA_OPTS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-Xms64m -Xmx512m"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-v /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-v  /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n-d elasticsearch:7.4.2\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br")])]),a("h3",{attrs:{id:"启动kibana"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动kibana"}},[t._v("#")]),t._v(" 启动kibana")]),t._v(" "),a("p",[t._v("一个可视化工具。")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("docker run --name kibana -e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("ELASTICSEARCH_HOSTS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("http://172.16.33.33:9200 -p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5601")]),t._v(":5601 -d kibana:7.4.2\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[a("img",{attrs:{src:"/subject/layman-cloud/kibana.png",alt:"0001"}})]),t._v(" "),a("p",[t._v("关Elastic Search的很多基础知识，如Query DSL等等，其实官方文档更清楚，我就不自己写了。\n网上文章千篇一律，我增强自己记忆做一下对比")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("RDB")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("Elastic Search")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("database")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("index")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("table")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Type(过时，已删除)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("field")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Document")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("Mapping（Type）* Mapping 是用来定义一个文档(document)，以及它所包含的属性(field)是如何存储和索引的。")])])])]),t._v(" "),a("h3",{attrs:{id:"分词器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分词器"}},[t._v("#")]),t._v(" 分词器")]),t._v(" "),a("p",[t._v("官方的标准分词器都是英文的，我们需要导入一个汉语的分词器，IK分词器")]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 下载分词器")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 解压分词器，需要注意的事，我们需要在插件的路径中，创建一个ik的文件夹，如果直接解压在根目录下，会发生错误。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("unzip")]),t._v(" elasticsearch-analysis-ik-7.4.2.zip \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("编辑分词器，remote_ext_dict这个项目对应的url，就是远程获取最新的分词。")]),t._v(" "),a("div",{staticClass:"language-xml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token prolog"}},[t._v('<?xml version="1.0" encoding="UTF-8"?>')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token doctype"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),a("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("DOCTYPE")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token name"}},[t._v("properties")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token name"}},[t._v("SYSTEM")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://java.sun.com/dtd/properties.dtd"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("properties")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("comment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("IK Analyzer 扩展配置"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("comment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--用户可以在这里配置自己的扩展字典 --\x3e")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("entry")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("key")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ext_dict"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("entry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--用户可以在这里配置自己的扩展停止词字典--\x3e")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("entry")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("key")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ext_stopwords"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("entry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--用户可以在这里配置远程扩展字典 --\x3e")]),t._v("\n\t "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("entry")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("key")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("remote_ext_dict"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("http://172.16.33.33/es/fenci.txt"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("entry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--用户可以在这里配置远程扩展停止词字典--\x3e")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!-- <entry key="remote_ext_stopwords">words_location</entry> --\x3e')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("properties")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("h3",{attrs:{id:"分词器服务器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分词器服务器"}},[t._v("#")]),t._v(" 分词器服务器")]),t._v(" "),a("p",[t._v("正如上文所见的内容，实际上我们起动一个Nginx就可以了。")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 随便启动一个nginx实例，只是为了复制出配置")]),t._v("\ndocker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(":80 --name nginx -d nginx:1.10\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将容器内的配置文件拷贝到当前目录:")]),t._v("\ndocker container "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" nginx:/etc/nginx "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改文件名称:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mv")]),t._v(" nginx conf \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 把这个 conf 移动到/mydata/nginx 下，主要就是为了将配置文件为真是的Nginx服务器使用。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 终止原容器:")]),t._v("\ndocker stop nginx\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 执行命令删除原容器:")]),t._v("\ndocker "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" 容器id\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 创建真实使用的分词器服务器")]),t._v("\ndocker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(":80 --name nginx -v /mydata/nginx/html:/usr/share/nginx/html  -v /mydata/nginx/logs:/var/log/nginx -v /mydata/nginx/conf:/etc/nginx -d nginx:1.10\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("h3",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),a("p",[t._v("https://blog.csdn.net/u011863024/article/details/115721328\nhttps://www.elastic.co/guide/en/elasticsearch/client/java-api/current/_metrics_aggregations.html")])])}),[],!1,null,null,null);s.default=e.exports}}]);