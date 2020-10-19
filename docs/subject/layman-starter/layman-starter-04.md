---
title: 异常处理
categories: 
 - Spring Boot
tags:
 - Spring Boot 
date: 2020-10-04
---

之前的代码中，我们已经能够处理一些正常的情况的返回，对于一些异常的情况，我们还需要进行统一的捕获并且处理。
## 定义异常捕获
```java
@ControllerAdvice
public class LaymanExceptionHandler {

    private static final String STATUS_PREFIX_4 = "4";
    private static final String STATUS_PREFIX_5 = "5";

    private static final String STATUS_400 = "400";
    private static final String STATUS_401 = "401";
    private static final String STATUS_403 = "403";
    private static final String STATUS_404 = "404";

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public CommonResult exceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception e) {

        CommonResult result = null;

        HashMap<Object, Object> error = MapUtil.newHashMap();

        error.put("detail", e.getMessage());
        error.put("path", request.getServletPath());

        result = CommonResult.failed(BResultCode.COMMON_B_ERROR, error);

        String status = String.valueOf(response.getStatus());
        if (StrUtil.startWith(status, STATUS_PREFIX_4)) {
            result = CommonResult.failed(AResultCode.COMMON_A_ERROR, error);
        } else if (StrUtil.startWith(status, STATUS_PREFIX_5)) {
            result = CommonResult.failed(BResultCode.COMMON_B_ERROR, error);
        }

        switch (status) {
            case STATUS_400:
                result = CommonResult.failed(AResultCode.COMMON_400_ERROR, error);
                break;
            case STATUS_401:
                result = CommonResult.failed(AResultCode.COMMON_401_ERROR, error);
                break;
            case STATUS_403:
                result = CommonResult.failed(AResultCode.COMMON_403_ERROR, error);
                break;
            case STATUS_404:
                result = CommonResult.failed(AResultCode.COMMON_404_ERROR, error);
                break;
            default:
                break;
        }

        if (e instanceof BizException) {
            BizException e2 = (BizException) e;
            result = CommonResult.failed(e2.getResultCode(), error);
        }

        return result;
    }

}

```
上面的代码就是我们共同拦截exception的全部内容，其中涉及到新增的部分我们一个一个解释一下。 

首先@ControllerAdvice和@ExceptionHandler(Exception.class)所起到的作用就是将一场捕获并且返回，而@ResponseBody则是对我们的错误信息进行了json返回。 
我们来看一下result的构成的话，就会发现CommonResult。failed()方法，我们可以看到下面的代码，其实就是构建了一个data等于null，error不为null的CommonResult对象。
``` java
@ApiModel(value = "共通返回值", description = "共通返回值")
@Data
@AllArgsConstructor
public class CommonResult<T> {
    private String code;
    private String message;
    private T data;
    private T error;

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     */
    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<T>(ResultCode.OK.getCode(), ResultCode.OK.getMessage(), data, null);
    }


    /**
     * 失败返回结果
     *
     * @param error 获取的数据
     */
    public static <T> CommonResult<T> failed(IResultCode resultCode, T error) {
        return new CommonResult<T>(resultCode.getCode(), resultCode.getMessage(), null, error);
    }

}
```
这里面那个resultCode的类型是IResultCode接口，我们事先了AResultCode，BResultCode，CResultCode，ResultCode四个枚举，
* AResultCode 客户端错误
* BResultCode 系统错误
* CResultCode 第三方调用错误
* ResultCode 正确信息

了解了CommonResult的返回值之后，我们再回过头来看exceptionHandler内的业务，首先构建一个error的map，放一些具体的信息，同时根据HTTPStatusCode来判断一些共通的异常类型。
比如400，401，403，404，500等。 
而BizException，是我们自定义的业务错误信息，是我们抛出的信息内容。

```java
@Data
@AllArgsConstructor
public class BizException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private IResultCode resultCode;

    private String message;

}
```
上述就是自定义的业务Exception的内容，需要手动抛出的时候，我们就可以throw new BizException()。

截止到现在，我们就可以实现了一个简单的全局异常抓取的工作，手动定义的的异常和意料外错误的遗产均能够捕获并按照我们的期望返回。


