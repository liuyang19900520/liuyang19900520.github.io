---
title: 自定义@ResponseBody注解实现灵活json返回
categories: 
 - Spring Boot
tags:
 - Spring Boot 
 - json
date: 2020-09-14
---

工作中有时候我们会遇到一些情况，2个不同的api，返回的数据属于同一张表，但是是这一张表中的不同字段。实现的方式有很多，今天我们就在自己的这个小项目中集成一个自定义注解来实现上述功能。

## 定义注解
这个注解里的3个属性分别代表：
* type：Class类型，代表返回json的实体类
* include：String类型，代表需要返返回的json中实例类中的属性（或者理解为字段）
* filter：String类型，代表不需要返返回的json中实例类中的属性（或者理解为字段）
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(com.liuyang19900520.layman.starter.common.json.annotation.LaymanJsons.class)
public @interface LaymanJson {
    Class<?> type();

    String include() default "";

    String filter() default "";
}
```
我们需要做的就是，当路由上带有上上述注解的时候，进行拦截，然后修改json的样式。
## 根据注解拦截并修改返回值
### 自定义HandlerMethodReturnValueHandler
通过实现HandlerMethodReturnValueHandler接口的supportsReturnType方法，如果带有自定义注解进行拦截，如果不带有则不进行拦截。
```java
    @Override
    public boolean supportsReturnType(MethodParameter returnType) {
        return returnType.getMethodAnnotation(LaymanJson.class) != null || returnType.getMethodAnnotation(LaymanJsons.class) != null;
    }
```
拦截的过程也并不困难,可以理解为拦截下来的response，包装一下再通过response的writer对象写出去。
```java
    @Override
    public void handleReturnValue(Object returnValue, MethodParameter returnType, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest) throws Exception {
        mavContainer.setRequestHandled(true);
        HttpServletResponse response = webRequest.getNativeResponse(HttpServletResponse.class);
        Annotation[] annos = returnType.getMethodAnnotations();
        LaymanJsonSerializer jsonSerializer = new LaymanJsonSerializer();
        Arrays.asList(annos).forEach(a -> {
            if (a instanceof LaymanJson) {
                LaymanJson json = (LaymanJson) a;
                jsonSerializer.filter(json);
            } else if (a instanceof LaymanJsons) {
                LaymanJsons jsons = (LaymanJsons) a;
                Arrays.asList(jsons.value()).forEach(json -> {
                    jsonSerializer.filter(json);
                });
            }
        });
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        String json = jsonSerializer.toJson(returnValue);
        response.getWriter().write(json);
        response.getWriter().close();
    }
```
对于上面的代码，我们主要可以关注2个部分
### jsonSerializer的filter方法
这一个方法主要实现的功能是，构造一个FilterProvider，从而根据注解上的字段名称过滤我们构造的filterMap和includeMap。并且能够返回一个过滤后且需要被序列化的mapper。
在LaymanJsonSerializer.java中：filter方法内部，clazz是我们传过来的class对象，include，filter则是我们选中或者过滤的字段。
```java
    ObjectMapper mapper = new ObjectMapper();
    LaymanJacksonJsonFilter jacksonFilter = new LaymanJacksonJsonFilter();

    public void filter(Class<?> clazz, String include, String filter) {
        if (clazz == null) {
            return;
        }
        if (StrUtil.isNotBlank(include)) {
            jacksonFilter.include(clazz, include.split(","));
        }
        if (StrUtil.isNotBlank(filter)) {
            jacksonFilter.filter(clazz, filter.split(","));
        }
        mapper.addMixIn(clazz, jacksonFilter.getClass());
    }
```

在LaymanJacksonJsonFilter.java：
```java
@JsonFilter("laymanJacksonFilter")
public class LaymanJacksonJsonFilter extends FilterProvider {

    Map<Class<?>, Set<String>> includeMap = MapUtil.newHashMap();
    Map<Class<?>, Set<String>> filterMap = MapUtil.newHashMap();

    public void include(Class<?> type, String[] fields) {
        addToMap(includeMap, type, fields);
    }

    public void filter(Class<?> type, String[] fields) {
        addToMap(filterMap, type, fields);
    }

    private void addToMap(Map<Class<?>, Set<String>> map, Class<?> type, String[] fields) {
        Set<String> fieldSet = map.getOrDefault(type, new HashSet<>());
        fieldSet.addAll(Arrays.asList(fields));
        map.put(type, fieldSet);
    }
}
```
首先需要定义includeMap和filterMap分别承装被选择的和被过滤的字段。 
其次注意我们在类名上添加的@JsonFilter注解，这个注解不能省略而且不能设置为“”，原因就在下面的注释，如果不开启这个注解，讲不过有过滤器启动。
``` java
public @interface JsonFilter
{
    /**
     * Id of filter to use; if empty String (""), no filter is to be used.
     */
    public String value();
}
```
到此对于jsonSerializer的filter方法，我们可以理解为设置了一个注解字段过滤器的规则，并且把相对应的字段生成到2个map中去。

### jsonSerializer的toJson方法
关于toJson方法，可以说就是转换json的过程了。
```java
    public String toJson(Object object) throws JsonProcessingException {
        mapper.setFilterProvider(jacksonFilter);
        //long 2 String
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        simpleModule.addSerializer(Float.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Float.TYPE, ToStringSerializer.instance);
        simpleModule.addSerializer(Double.class, CustomDoubleSerialize.getInstance());
        simpleModule.addSerializer(Double.TYPE, CustomDoubleSerialize.getInstance());
        mapper.registerModule(simpleModule);
        return mapper.writeValueAsString(object);
    }
```
mapper是需要序列化的对象，首先为mapper添加过滤器，之后设置一些序列化规则，包括默认和自定义的。在运行writeValueAsString方法的时候，会去执行LaymanJacksonJsonFilter的findPropertyFilter()方法，这时候再根据上面生成的includeMap，filterMap来具体实现序列化。 
最后在response进行写出即可。

## 就LaymanJsonReturnHandler进行Web设置
```java
@Configuration
public class LaymanJacksonWebConfig implements WebMvcConfigurer {

    @Autowired
    private RequestMappingHandlerAdapter requestMappingHandlerAdapter;

    @Autowired
    private LaymanJsonReturnHandler returnValueHandler;

    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
        handlers.add(getJsonReturnHandler());
    }

    public HandlerMethodReturnValueHandler getJsonReturnHandler() {
        return new LaymanJsonReturnHandler();
    }

    @PostConstruct
    public void init() {
        final List<HandlerMethodReturnValueHandler> newHandlers = new LinkedList<>();
        final List<HandlerMethodReturnValueHandler> originalHandlers = requestMappingHandlerAdapter.getReturnValueHandlers();
        if (null != originalHandlers) {
            newHandlers.addAll(originalHandlers);
            // 获取处理器应处于的位置，需要在RequestResponseBodyMethodProcessor之前
            final int index = obtainValueHandlerPosition(originalHandlers, RequestResponseBodyMethodProcessor.class);
            newHandlers.add(index, returnValueHandler);
        } else {
            newHandlers.add(returnValueHandler);
        }
        requestMappingHandlerAdapter.setReturnValueHandlers(newHandlers);
    }

    /**
     * 获取让自定义处理器生效应处于的位置
     *
     * @param originalHandlers 已经添加的返回值处理器
     * @param handlerClass     返回值处理器的类型
     * @return 自定义处理器需要的位置
     */
    private int obtainValueHandlerPosition(final List<HandlerMethodReturnValueHandler> originalHandlers, Class<?> handlerClass) {
        for (int i = 0; i < originalHandlers.size(); i++) {
            final HandlerMethodReturnValueHandler valueHandler = originalHandlers.get(i);
            if (handlerClass.isAssignableFrom(valueHandler.getClass())) {
                return i;
            }
        }
        return -1;
    }
}
```
其中addReturnValueHandlers()方法就是配置我们自定义内容的地方，而@PostConstruct标注的方法，则是配置处理器的位置在RequestResponseBodyMethodProcessor之前，这样即使我们使用@RestController注解也不会影响我们的自定义注解的效果。

最后我们进行了一下测试，
```java
    @GetMapping("/users/{id}")
    @ApiOperation("显示当前用户")
    @LaymanJsons({@LaymanJson(type = Test.class, filter = "age"), @LaymanJson(type = StarterTest.class, include = "id,username,test")})
    public CommonResult<StarterTest> user(@PathVariable Long id) {
        StarterTest byId = starterTestService.getById(id);
        Test test = new Test();
        test.setPoint("234");
        test.setAge("2323");
        test.setName(null);
        byId.setTest(test);
        return CommonResult.success(byId);
    }
```
我们得到的json数据如下
```json
{
    "code": "200",
    "message": "操作成功",
    "data": {
        "id": "1",
        "username": "layman",
        "test": {
            "name": null,
            "point": "234"
        }
    }
}
```
成功，自定义的过滤注解就算配置成功了，但是常规时候，我仍建议使用特定的返回值，比如自定义的VO，或者更加灵活的Map，亦或者采用Wapper的基类对于返回值进行包装。根据实际情况我们再来讨论。