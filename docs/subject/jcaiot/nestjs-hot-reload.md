---
title: 为NestJS配置简单的热重载
categories: 
 - NestJS
tags:
 - NestJS
date: 2020-06-01
---
之前在NestJS的开发中，每每修改一些文件还要重新运行一遍程序，实在是有些麻烦，于是从官网上找到一篇关于热重载的帖子，具体参考：[NestJS热重载](https://docs.nestjs.cn/7/recipes?id=%e7%83%ad%e9%87%8d%e8%bd%bd)  

## 安装依赖
``` sh
npm i --save-dev webpack-node-externals start-server-webpack-plugin
```

## 添加配置项目
在项目的根目录下创建一个webpack.config.js文件，作为热重载的配置文件
```  javascript
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = function(options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    watch: true,
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
};
```

## main文件中声明模块
```typescript
declare const module: any;

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

  //热加载添加部分
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```

## 修改start:dev的执行脚本
找到package.json文件，在文件中修改脚本
``` json
"start:dev": "nest build --webpack --webpackPath webpack.config.js"
```

最后重新启动程序，在修改typescript代码之后，就能够自动完成热重载，提高我恩的工作效率。