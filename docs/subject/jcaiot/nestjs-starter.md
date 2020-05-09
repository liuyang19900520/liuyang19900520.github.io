---
title: 配置简单的NestJS
categories: 
 - NestJS
tags:
 - NestJS
date: 2020-05-06
---
作为没有任何nodejs开发经验的程序员，其实在后端选型上还是很纠结的，就像之前将flask作为选择就比较失败，搞了几个小demo之后也就放弃了。谈到学习的深度和广度这类深奥的话题，总是感觉眼睛大，肚子小，眼高手低。这次又尝试NestJs的原因主要有2个。
* typescript
* 与Spring相近  
其实随着信息的爆炸，我常常陷入到从我自己找到的各种说法中感到迷茫。后来实在看得不耐烦了，一句上述2个理由选择了NestJS。其实选择什么框架并没有什么本质上的区别，主要还是坚持学习。我相信typescript在未来前端技术中将战友更加重要的作用，而类似于Spring的框架，更加简洁，也更便于对比学习做切换。

## 框架搭建
框架搭建非常简单，我就是一招官网的创建命令而已，只不过我把项目的位置创建在了和src平级别的server文件夹下。
通过启动命令，我们能够在http://localhost:3000/ 启动我们的服务器，并且运行显示Hello World

## NestJS集成mongoose
整个项目我需要的服务端api非常的简单，只需要实现若干内容的CRUD即可，所以也不需要什么复杂的配置。所以在这一步初始的配置上，我只需要实现一个查询banner的功能即可，也就是说，我需要继承一个MongoDB的数据库连接，之后实现一个简单的查询。所以我找到了NestJS的官方demo--NestJS集成mongoose的实例完成了我的第一个查询  
[NestJS集成mongoose](https://github.com/nestjs/nest/tree/master/sample/06-mongoose)  
前提：我们创建了自己的数据库，并且使用创建了banners的collection。在这里我出现过一个问题，就是按照上述demo的写法，我的数据库collection如果是如果是单数（例如：banner）,将无法实现我的查询功能。

## NestJS实现简单的跨域请求
由于展示端和服务端分别在不同的端口上，所以涉及到跨域请求的问题。NestJS也有比较开箱即用的解决方法。  
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  await app.listen(3000);
}
bootstrap();
```