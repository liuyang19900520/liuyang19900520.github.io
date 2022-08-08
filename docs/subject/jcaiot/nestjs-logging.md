---
title: NestJS 日志配置
categories: 
 - NestJS
tags:
 - NestJS
date: 2020-07-16
---

这一个章节，我们丰富一下NestJS在服务端的相关配置。这次主要实现以下日志的输出。

## 日志框架选择
这是我第一次使用涉及到nodejs来开发服务端，其实官网上有日志最佳实践的例子，但是由于开发java的惯性，我还是习惯找一下相关的日志框架。
至于选winston的理由，主要还是由于对比log4js，由于java开发已经放弃log4j，所以比较迷地选择了[Nest winston](https://github.com/gremo/nest-winston)

## Winston配置
``` js
WinstonModule.forRootAsync({
      imports: [ConfigModule],
      //import configService for env parameters
      useFactory: (configService: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
          new winston.transports.File({
            filename: configService.get<string>('express.infoPath'), level: 'info', format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
          new winston.transports.File({
            filename: configService.get<string>('express.warnPath'), level: 'warn', format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
          new winston.transports.File({
            filename: configService.get<string>('express.errorPath'), level: 'error', format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
          // other transports...
        ],
      }),
      inject: [ConfigService],
    }),
```
上述代码也比较好理解，可以认为是分别创建了控制台，info，warn，error四种日志输出格式，这里的format是使用默认。 
同时在AppMoudle中进行了配置之后，我们也没有必要在main.ts中继续createLogger()，我个人愿意把这种方式和理解为依赖注入，也就是说，只要我们在业务代码的构造器中引用winston的logger，就可以使用日志输出的功能了。 
我的理解是，我们通过forRootAsync方法对winston进行了配置，配置之后这部分又可以通过被注入。为了验证，我打开了[winston.moudle.ts](https://github.com/gremo/nest-winston/blob/master/src/winston.module.ts)的源码
``` ts
import { DynamicModule, Global, LoggerService, Module } from '@nestjs/common';
import { WinstonModuleAsyncOptions, WinstonModuleOptions } from './winston.interfaces';
import { createNestWinstonLogger, createWinstonAsyncProviders, createWinstonProviders } from './winston.providers';

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(options: WinstonModuleOptions): DynamicModule {
    const providers = createWinstonProviders(options);

    return {
      module: WinstonModule,
      providers: providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: WinstonModuleAsyncOptions): DynamicModule {
    const providers = createWinstonAsyncProviders(options);

    return {
      module: WinstonModule,
      imports: options.imports,
      providers: providers,
      exports: providers,
    } as DynamicModule;
  }

  public static createLogger(options: WinstonModuleOptions): LoggerService {
    return createNestWinstonLogger(options);
  }
} 
```
代码不完整，createWinstonAsyncProviders()主要是返回一个可以用于注入的提供者，该方法代码中调用了createLogger(options: WinstonModuleOptions),和我们之前的设想差不太多。

## 日志拦截器
按照Spring的习惯，常用日志的AOP对controller切面进行请求和响应的日志输出。这个任务我们使用拦截器来实现。
``` ts
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, Response<T>> {

  constructor(@Inject('winston') private readonly logger: Logger) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const now = Date.now();
    this.logger.info('request url:', { 'url': context.switchToHttp().getRequest().url });
    this.logger.info('request method:', { 'method': context.switchToHttp().getRequest().method });
    if (context.switchToHttp().getRequest().method == 'GET' || context.switchToHttp().getRequest().method == 'DELETE') {
      this.logger.info('request params:', context.switchToHttp().getRequest().query);
    } else {
      this.logger.info('request params:', context.switchToHttp().getRequest().body);
    }
    return next
      .handle()
      .pipe(tap((data) => {
          this.logger.info('response data:', { data });
          this.logger.info('response time:', { 'costTime': (Date.now() - now) + 'ms' });
        },
      ));
  }
}
```
代码并不难懂，不过多解释了，主要就是输出了一些请求与响应的信息，这里有一个注意点点就是，logger.info方法中的第二个参数，一定是json形式的。 

## 拦截器配置与顺序
除了普通的日志之外，我们还定义了一个数据输出格式的拦截器。
```js
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({
      data,
      code: "0",
      message: 'request success',
    })));
  }
}
```
主要就是将这些正常情况返回内容，设置了code和message。多个拦截器的顺序，我们做了一个小实验。
``` js
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(WINSTON_MODULE_PROVIDER)));
  app.useGlobalInterceptors(new TransformInterceptor);
```
在main.ts中，我们按照上述顺序配置了拦截器，这时候日志输出的内容，已经是TransformInterceptor调整过后的。但如果配置顺序反过来，输出的内容则是调整之前的。
但如果我们使用共通的providers中的配置，同时删除掉 app.useGlobalInterceptors(new LoggingInterceptor(app.get(WINSTON_MODULE_PROVIDER)));
```js
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
```
通过这种方式进行配置，我们得到的结果则是TransformInterceptor调整过后的数据。










 

