---
title: 尝试在虚拟机上配置docker来启动mysql和redis
categories: 
 - linux
 - docker
tags:
  - linux
  - docker
date: 2021-12-01
---

## 安装虚拟机
在VMware中安装CentOS 7的最小限度安装之后，做以下如下操作。
### 设置静态IP

首先我们需要安装。net-tools,这样我们才能够使用ifconfig来查看网络配置状态。
```shell
yum install net-tools
```
之后我们需要对这个虚拟网络适配器进行修改,配置如下三项，将动态获取改为静态IP，配置同一个网关下的IP，设置网关，和DNS即可。
```
vim /etc/sysconfig/network-scripts/ifcfg-ens33 
BOOTPROTO="static"
IPADDR=172.16.33.33
GATEWAY=172.16.33.2
DNS1=172.16.33.2
```

在这之后我们在主机对虚拟机进行连接访问，会显示连接成功。



### 安装docker
根据下面网址进行基础安装吧。
[Docker安装](https://docs.docker.com/engine/install/centos/)

### 安装mysql
为了避免版本不一致的问题，还是先获取mysql5.7，
```shell
docker pull mysql 5.7
```

启动mysql,下面的命令主要体现了docker内部的端口和虚拟机端口的映射关系，我们可以不再通过进入docker容器就可以修改相关文件。
```shell
docker run -p 3306:3306 --name mysql -v /mydata/mysql/log:/var/log/mysql -v /mydata/mysql/data:/var/lib/mysql -v /mydata/mysql/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=root-d mysql:5.7
```

### 安装redis
获取redis，创建redis.conf文件，启动redis

```shell
docker pull redis
mkdir -p /mydata/redis/conf
touch /mydata/redis/conf/redis.conf
docker run -p 6379:6379 --name redis \
```

### 配置docker开机自启
```shell
## docker 开机自启动
sudo systemctl enable docker

## 服务开机自启动
docker update redis --restart=always
docker update mysql --restart=always
```