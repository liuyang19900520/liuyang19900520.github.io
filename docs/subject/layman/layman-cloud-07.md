---
title: Elastic Search 集成实例
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

### 创建product索引
``` shell
PUT product
{
    "mappings":{
        "properties": {
            "skuId":{ "type": "long" },
            "spuId":{ "type": "keyword" },  # 不可分词
            "skuTitle": {
                "type": "text",
                "analyzer": "ik_smart"  # 中文分词器
            },
            "skuPrice": { "type": "keyword" },  # 保证精度问题
            "skuImg"  : { "type": "keyword" },  # 视频中有false
            "saleCount":{ "type":"long" },
            "hasStock": { "type": "boolean" },
            "hotScore": { "type": "long"  },
            "brandId":  { "type": "long" },
            "catalogId": { "type": "long"  },
            "brandName": {"type": "keyword"}, # 视频中有false
            "brandImg":{
                "type": "keyword",
                "index": false,  # 不可被检索，不生成index，只用做页面使用
                "doc_values": false # 不可被聚合，默认为true
            },
            "catalogName": {"type": "keyword" }, # 视频里有false
            "attrs": {
                "type": "nested",#嵌入式，数组行对象进行扁平化处理，可以避免查出不存在的数据
                "properties": {
                    "attrId": {"type": "long"  },
                    "attrName": {
                        "type": "keyword",
                        "index": false,
                        "doc_values": false
                    },
                    "attrValue": {"type": "keyword" }
                }
            }
        }
    }
}

```