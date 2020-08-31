---
title: NestJS Exception配置
categories: 
 - NestJS
tags:
 - NestJS
date: 2020-06-13
---

这一个章节，我们丰富一下NestJS在服务端的相关配置。主要设计一下异常处理。 

## 自定义异常
和很多语言类似，我们创建一个系统自定义异常的对象即可。我们将这个异常进行定义，code，message，status。
```js
import { HttpException, HttpStatus } from '@nestjs/common'
export class SystemException extends HttpException {
    private errorMessage: string;
    private errorCode: string;

    constructor(errorCode: string, errorMessage: string, statusCode: HttpStatus) {
        super(errorMessage, statusCode);
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }

    getErrorCode(): string {
        return this.errorCode;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }
}
```
当我们使用异常的时候，可以配合自定义的Code类，在业务代码中手动抛出异常。
```js
throw new SystemException("异常编码", '异常信息', HttpStatus.OK);    
```

## 全局处理异常
刚刚我们设定了自定义的异常，为了处理我们的自定义异常以及系统产生的其他未知异常，我们需要创建一个过滤器http-exception.filter.ts。 

```js 
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { SystemException } from '../exceptions/system.exception';
import { Logger } from 'winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  constructor(@Inject('winston') private readonly logger: Logger) {
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status != HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.warn(exception);
    } else {
      this.logger.error(exception);
    }

    if (exception instanceof SystemException) {
      response
        .status(status)
        .json({
          code: exception.getErrorCode(),
          message: exception.getErrorMessage(),
          data: {
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            path: request.url,
          },
        });
    } else if (exception instanceof UnauthorizedException) {
      response
        .status(status)
        .json({
          code: '-1',
          message: exception.message,
          data: {
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            path: request.url,
          },
        });
    } else {
      response
        .status(status)
        .json({
          code: '-1',
          message: exception.message,
          data: {
            date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
            path: request.url,
          },
        });
    }
  }

}
```
代码简单易懂，由于我们也需要接受系统内部的Error，所以我们这个过滤器ExceptionFilter，也就是说明，所以的错误我们都进行了接受处理。
我们默认出现的Error都是服务器内部错误500，一旦在我们抛异常时指定了HttpStatus，或者调用的第三方库中有返回指定的HttpStatus，就可以将500进行指定的替换。最后在response输出的时候，给予了特定的异常输出形式。  
这套理论其实没有什么不同，和Spring非常相似，都是在使用过滤器或拦截器的类似功能，对异常统一处理。 

## 完成过滤器的注册

在app.module.ts中，我们在@module中添加入下代码。
``` js
providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
```
上述代码的效果，其实等同于我们在main.ts中注册一个全局的过滤器
```js
app.useGlobalFilters(new HttpExceptionFilter());
```
对在NestJS官网中我们发现这样一个表述。
> 该 useGlobalFilters() 方法不会为网关和混合应用程序设置过滤器。
> 全局过滤器用于整个应用程序、每个控制器和每个路由处理程序。就依赖注入而言，从任何模块外部注册的全局过滤器（使用上面示例中的 useGlobalFilters()）不能注入依赖，因为它们不属于任何模块。

详细的情况参考官网[NestJS官方中文：异常过滤器](https://docs.nestjs.cn/7/exceptionfilters)




 

