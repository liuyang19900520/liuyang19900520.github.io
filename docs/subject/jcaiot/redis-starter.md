# 配置简单的Redis
其实这次没有想使用redis，毕竟整个项目都准备草草了事，但是随着相对的深入，遇到了jwt过时刷新的问题，当然也可以再签发一个refreshtoken来解决，最后想了又想，还是尝试一下redis吧。如果真的上线了，就直接运行在当时的EC2里就好了。  
## 安装Redis
关于redis服务的搭建，直接参考官网，按照以往的经验，应该会遇到编译的错误，我们一步一步来，遇到的问题再做一次记录。[官网的搭建](https://redis.io/download)。我选择的目录是/usr/lib/下，和之前经常报是失败信息不同，这次我们成功完成了make，果然centos8就是不一样。  
成功之后，我们得到了这样一条提示：Hint: It's a good idea to run 'make test' ;)，当我们选择make test的之后，熟悉的错误再次出现了。
You need tcl 8.5 or newer in order to run the Redis test。就是需要提个版本的意思。
```sh 
wget http://downloads.sourceforge.net/tcl/tcl8.6.1-src.tar.gz  
tar xzvf tcl8.6.1-src.tar.gz  -C /usr/local/  
cd  /usr/local/tcl8.6.1/unix/  
./configure  
make  
make install
```
最后我们看到这行字，\o/ All tests passed without errors!。  

## 配置
在这之后，我们稍微调整一下redis的配置，分别注释掉本地连接，关闭保护模式，最后允许后台运行。
```sh
# bind 127.0.0.1
protected-mode no
daemonize yes 
```
最后别忘了打开端口6379，redis的默认端口。
```sh 
firewall-cmd --zone=public --add-port=6379/tcp --permanent
firewall-cmd --reload
```
最后启动服务,加载配置，且后台运行。
```
src/redis-server redis.conf &
```


