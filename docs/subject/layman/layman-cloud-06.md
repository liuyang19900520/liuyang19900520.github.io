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
date: 2022-02-03
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
-e ES_JAVA_OPTS="-Xms64m -Xmx128m" \
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
