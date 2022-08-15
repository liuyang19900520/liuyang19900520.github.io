---
title: Elastic Search初体验
categories: 
 - Linux
 - Docker
 - Elastic Search 
tags:
 - Linux
 - Docker
 - Elastic Search 
date: 2022-02-11
isTimeLine: true
---

### 启动命令备注
首先创建如下目录结构
```
mkdir -p /mydata/elasticsearch/config
mkdir -p /mydata/elasticsearch/data
echo "http.host: 0.0.0.0" >> /mydata/elasticsearch/config/elasticsearch.yml
```

``` shell
docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
-e  "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms64m -Xmx512m" \
-v /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v  /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:7.4.2
```

### 启动kibana
一个可视化工具。
```shell
docker run --name kibana -e ELASTICSEARCH_HOSTS=http://172.16.33.33:9200 -p 5601:5601 -d kibana:7.4.2
```
![0001](/subject/layman-cloud/kibana.png)

关Elastic Search的很多基础知识，如Query DSL等等，其实官方文档更清楚，我就不自己写了。
网上文章千篇一律，我增强自己记忆做一下对比
| RDB | Elastic Search | 
| :------------- |:--| 
| database          | index |
| table | Type(过时，已删除) |
| field | Document  |
| Type  | Mapping（Type）* Mapping 是用来定义一个文档(document)，以及它所包含的属性(field)是如何存储和索引的。| 



### 分词器
官方的标准分词器都是英文的，我们需要导入一个汉语的分词器，IK分词器
```bash
# 下载分词器
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip
# 解压分词器，需要注意的事，我们需要在插件的路径中，创建一个ik的文件夹，如果直接解压在根目录下，会发生错误。
unzip elasticsearch-analysis-ik-7.4.2.zip 
```
编辑分词器，remote_ext_dict这个项目对应的url，就是远程获取最新的分词。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
	<comment>IK Analyzer 扩展配置</comment>
	<!--用户可以在这里配置自己的扩展字典 -->
	<entry key="ext_dict"></entry>
	 <!--用户可以在这里配置自己的扩展停止词字典-->
	<entry key="ext_stopwords"></entry>
	<!--用户可以在这里配置远程扩展字典 -->
	 <entry key="remote_ext_dict">http://172.16.33.33/es/fenci.txt</entry>
	<!--用户可以在这里配置远程扩展停止词字典-->
	<!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```
### 分词器服务器
正如上文所见的内容，实际上我们起动一个Nginx就可以了。
```shell
# 随便启动一个nginx实例，只是为了复制出配置
docker run -p 80:80 --name nginx -d nginx:1.10
# 将容器内的配置文件拷贝到当前目录:
docker container cp nginx:/etc/nginx . 
# 修改文件名称:
mv nginx conf 
# 把这个 conf 移动到/mydata/nginx 下，主要就是为了将配置文件为真是的Nginx服务器使用。
# 终止原容器:
docker stop nginx
# 执行命令删除原容器:
docker rm 容器id
# 创建真实使用的分词器服务器
docker run -p 80:80 --name nginx -v /mydata/nginx/html:/usr/share/nginx/html  -v /mydata/nginx/logs:/var/log/nginx -v /mydata/nginx/conf:/etc/nginx -d nginx:1.10
```

### 参考
https://blog.csdn.net/u011863024/article/details/115721328
https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/_metrics_aggregations.html