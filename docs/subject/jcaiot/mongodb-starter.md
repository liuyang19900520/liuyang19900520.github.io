---
title: 配置简单的MongoDB
categories: 
 - MongoDB
tags:
 - MongoDB
date: 2020-06-29
---

由于没有系统的学习过数据相关知识，我的数据库知识很薄弱，主要是基础关系型数据Mysql5.7的一些简单的CRUD,稍微上一些难度我就不具备水平了。趁着这个练习的项目不紧张，也没什么要求的时候，我尝试使用MongoDB这款NoSQL。


## 创建数据库
我没有在本地安装MongoDB环境，而是选择MongoDB Atlas云数据库。基本上都是控制面板的设置，根据提示逐步操作创建了cluster，命名为jcaiot。  
由于操作比较基础，我就不过多叙述了，附上一篇文章[免费试用MongoDB云数据库 （MongoDB Atlas）教程](https://www.cnblogs.com/xybaby/p/9460634.html)。

## 使用MongoDB Compass Cumminity连接数据库
和上文描述的内容有些不同，在数据库连接的部分，我选择了可视化工具MongoDB Compass Cumminity来进行数据操作，其实和常用Navicat等并没有巨大的不同。通过在MongoDB Atlas上获得的连接URL，我们已经可以正常链接到我们的数据库了。