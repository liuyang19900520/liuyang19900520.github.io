---
title: S3存储，实现简单的预签名上传功能
categories:
  - Java
  - AWS
tags:
  - Spring
  - AWS
  - S3
date: 2022-01-16
---

实现一个简单的预签名上传功能，虽然看起来很简单的功能，但是调试我也花了几个小时的时间。相关的步骤我记录一下吧。


### 第三方鉴权、签名服务
如果每一次上传都要通过Vue传到服务端之后，再上传到S3的话，那么就过于麻烦了，所以我们想使用的一个办法，就是在Vue前段想服务端请求一个预签名，然后通过这个预签名，直接从前端上传到S3，这样可以减少很多负载。

所以我们需要搭建一个第三方签名或者鉴权的服务来负责返回我们的预签名URL。

搭建的过程不复杂，和其他功能一样，而在网关进行转发的时候我出现了一个{“msg“:“invalid token“,“code“:401} 的问题。
造成这个问题的原因是网关进行路由重写的时候，Spring Cloud Gateway需要一个特定的顺序，那就是路由精度高的优先级放在前面，精度低的优先级放在后面。这样就会顺利的将前端想网发送的请求转发到服务上。

### S3配置相关

创建一个bucket就不多赘述了。
![0001](/subject/layman-cloud/cloud5.png)
1. 首先是权限这里
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PresignedPermissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::324971275476:user/layman-cloud",
                    "arn:aws:iam::324971275476:user/admin"
                ]
            },
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::layman-cloud",
                "arn:aws:s3:::layman-cloud/*"
            ]
        },
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "arn:aws:s3:::layman-cloud/*"
        }
    ]
}
```
公开访问的权限给了所有用户，而PutObject权限我们付给了我们的两个user。这要实现我们上传保护，而读取共有的目的。
2. 跨域设置
我们知道要从前端直接上传到S3的话，就要对我们的S3桶进行跨域设置，这一点S3也提供了傻瓜式的操作方法，
```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "HEAD",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "Access-Control-Allow-Origin"
        ],
        "MaxAgeSeconds": 3000
    }
]

```

### 编写预签名功能
编写这个功能本身不复杂，基本上就是按照最佳实践上提供的实例来进行。可是我犯了一个低级的错误。
![0001](/subject/layman-cloud/aws-user.png)
如图所示，在IDEA插件上我选择的是layman-account的配置文件，在编码中，我也将ProfileCredentialsProvider的参数设置成了layman-account。由于之前default配置文件中的key是公司的，所以之前在上传文件的时候全部都是提示403的错误，百思不得其解。最后一步一步排查，才找到原因。

部署的时候，AWS的配置文件也要进行配置，才能有效进行权限验证。这也是这个简单的上传功能踩的最大的坑。


### 前端小问题
完全使用element-ui的组件，只要看文档就可以了。
记录一个点就是，上传的方法和上传成功回调方法中的参数，都被我命名为了file。但是这两个file属性截然不同。
上传方法的file，其实是页面中的对象，如果需要真正的上传用的文件，需要使用file.file。这里是我的命名问题，如果讲upload2S3的方法参数命名为target就更为明确了。 
而上传成功的回调函数，是element-ui返回的内容，所以得到的就是真正的file，这样回显用的数据就可以根据file来进行命名和设置了。
``` javascript
 upload2S3(file) {
      console.log(file.file)
      return axios.put(this.signedUrl, file.file, {
        headers: {
          'Content-Type': "image/png"
        },
      })
    },
    handleUploadSuccess(res, file) {

      this.$message({
        message: "上传成功",
        type: "success"
      });
      console.log("上传成功...")
      this.showFileList = true;
      this.fileList.pop();
      this.fileList.push({ name: file.name, url: "https://layman-cloud.s3.ap-northeast-1.amazonaws.com/" + file.name });
      this.emitInput(this.fileList[0].url);
    }

```

最后还有一点，其实有必要为每个上传的文件配置时间戳或者UUID来区别覆盖，但是那不是重点，为了演示就省略了。
就这样。
