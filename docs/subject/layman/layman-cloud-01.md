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

当虚拟机重启后，网络无法访问的情况的时候，同时我们在ifcofig中也没有看到执勤啊ets33的网卡，我们可以选择禁用网络管理器后再重启的办法来进行
···shell
systemctl stop NetworkManager
systemctl disable NetworkManager
···

同时为了访问简单，我们有必要把centos的防火墙进行关闭。

```shell
#查看防火墙状态	
systemctl status firewalld / firewall-cmd --state	
#暂时关闭防火墙	
systemctl stop firewalld	
#永久关闭防火墙(禁用开机自启)	
systemctl disable firewalld	
#暂时开启防火墙	
systemctl start firewalld	
#永久开启防火墙(启用开机自启)	
systemctl enable firewalld	
#开放指定端口	
firewall-cmd --zone=public --add-port=8080/tcp --permanent	
#关闭指定端口	
firewall-cmd --zone=public --remove-port=8080/tcp --permanent	
#立即生效(重新加载)	
firewall-cmd --reload	
#查看开放端口	
firewall-cmd --zone=public --list-ports	
```
