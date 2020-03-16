# NestJS Common配置
这一个章节，我们丰富一下NestJS在服务端的相关配置。
## 配置异常
### 自定义异常
和很多语言类似，我们创建一个系统异常的对象即可。
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
@Get(':lang')
    async findOne(@Param('lang') lang: string): Promise<Banner> {
        throw new SystemException("12345", "文字", HttpStatus.OK);
        // return this.bannerService.findOne(lang);
    }
```
### 全局处理异常
刚刚我们设定了自定义的异常，但是当系统出现异常时候，我们也需要一个全局的异常类来进行管理，自动将我们的异常统一进行处理。于是我们创建了一个过滤器http-exception.filter.ts。负责异常的管理
```js 
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException, Inject } from '@nestjs/common';
import { SystemException } from '../exceptions/system.exception';
import { ApiErrorCode } from '../exceptions/api-error-code';
import { Logger } from 'winston';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  constructor(@Inject('winston') private readonly logger: Logger) { }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = 500;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }
    if (status != 500) {
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
            date: new Date().toLocaleDateString() + new Date().toLocaleTimeString,
            path: request.url
          }
        });
    } else if (exception instanceof UnauthorizedException) {
      response
        .status(status)
        .json({
          code: ApiErrorCode.TOKEN_INVALID,
          message: "TOKEN_INVALID",
          data: {
            date: new Date().toLocaleDateString() + new Date().toLocaleTimeString,
            path: request.url
          }
        });
    }
    else {
      response
        .status(status)
        .json({
          code: "1",
          message: exception.message,
          data: {
            date: new Date().toLocaleDateString() + new Date().toLocaleTimeString,
            path: request.url
          }
        });
    }
  }

}
```
代码简单易懂，由于我们也需要接受系统内部的Error，所以我们这个过滤器ExceptionFilter<Error>，也就是说明，所以的错误我们都进行了接受处理。





 

