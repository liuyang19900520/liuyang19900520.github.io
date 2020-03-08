# NestJS进行权限设置
之前我们实现了简单的Api访问的，在整体的设计上，我们还需要一个权限的验证。也就是说为了进入到后台系统验证。
由于我还是第一次做NestJS，所以我还是参考官网的一篇文章，[NestJS配置权限](https://docs.nestjs.cn/6/techniques?id=%e8%ae%a4%e8%af%81%ef%bc%88authentication%ef%bc%89)。

## 整体思路
我所要实现的内容很简单，如果是后台系统，需要验证权限，如果没有权限，需要返回到登录页面，从而通过登录获得权限。  
为了实现这个目标，我大体设想我们的系统首先通过登录过的token，将token放到header中进行其他的请求。

## 具体实现
正如上述文章讲述得很详细，我只补充一些我遇到的问题。
### Passport策略
下面的原文，简单做一下解释：  
>在 vanilla Passport 中，您可以通过提供以下两项配置策略:
>1. 组特定于该策略的选项。例如，在 JWT 策略中，您可以提供一个秘令来对令牌进行签名。
>2. “验证回调”，在这里您可以告诉 Passport 如何与您的用户存储交互(在这里您可以管理用户帐户)。在这里，验证用户是否存在(或创建一个新用户)，以及他们的凭据是否有效。Passport 库期望这个回调在验证成功时返回完整的用户消息，在验证失败时返回 null(失败定义为用户没有找到，或者在使用 Passport-local 的情况下，密码不匹配)。  

>使用 @nestjs/passport ，您可以通过扩展 PassportStrategy 类来配置 passport 策略。通过调用子类中的 super() 方法传递策略选项(上面第1项)，可以选择传递一个 options 对象。通过在子类中实现 validate() 方法，可以提供verify 回调(上面第2项)。  

简单的说，我们可以通过创建策略来登录操作，其中constructor中调用super()，负责传输策略，而通过validate的回调来实现我们业务。
```js
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```
### 内置 Passport 守卫
守卫的介绍，仍然是官网中的一片文章，[NestJS守卫](https://docs.nestjs.cn/6/guards)。在没有过多使用的情况下，我个人将这个功能与SpringMVC的interceptor看做类似的功能，而且守卫同能还能想路由暴露注解的接口，来便于使用。
```js
import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
```
上述代码的AuthGuard就是我们使用passport类库中的守卫，为了区别不同的策略，我们设定了local和jwt的标识，以用来负责区分哪些是登录获取，哪些是验证token。

### JWT 功能
JWT参考官网文档即可，为了加深理解，我着重记录一下代码执行的顺序
1. 客户端发送post请求访问/auth/login 
2. AuthGuard去调用我们的local策略，在回调的validate方法中，调用AuthService的validateUser方法
3. AuthService的validateUser方法里实现数据库操作，需要注意的事，这里我将官网的代码进行了修改，直接返回了user。
4. 守卫的验证成功之后，我们可以通过controller从路由直接调用AuthService的login方法。这个方法发行了token
5. 客户端发送post请求访问/profile，Authentication中设定了bearerToken。
6. AuthGuard去调用我们的jwt策略，在回调中直接解析了我们的payload。
7. 最后直接返回了刚才解析的内容

通过上述的操作，我们至少实现了一个authentication的架子的搭建，当然还有一些需要完善，我还会逐步记录一些改善。

 

