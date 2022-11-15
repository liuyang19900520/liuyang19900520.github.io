---
title: AWS管理与监控的一些笔记(CloudFormation)
date: 2022-02-26
categories: 
 - AWS
tags:
 - CloudFormation
---

## CloudFormation
AWS CloudFormation 允许您通过将基础设施视为代码来建模、预置和管理 AWS 和第三方资源。 
CloudFormation 模板描述了所需的资源及其依赖项,将它们一起作为一个堆栈进行启动和配置。使用 JSON 或 YAML 等开源声明性语言描述您要创建和配置的 AWS 资源。
### 使用模版创建堆栈
1. 选择模板
    * 资源Resources，Resource层级，必须有一个Type属性，有些资源可以有多个属性例如Properties，而有些属性可以有一个或多个子属性。
    * 模板和 CloudFormation 的最大优势之一就是能够创建一组资源。
```yml
Resources:
  Ec2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      SecurityGroups:
        - !Ref InstanceSecurityGroup
      KeyName: mykey
      ImageId: ''
  InstanceSecurityGroup:
    Type: 'AWS::EC2::SecurityGroup'
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
```
2. 确保创建堆栈所需的各个项目。例如有效的EC2 密钥对等等
3. 创建堆栈
4. 监控堆栈创建的进展
5. 使用堆栈
6. 清除。在CloudFormation控制台上选择Delete Stack。
### 示例
1. 在Cloud Formation页面中， 单击创建堆栈。(确保您选择的密钥对可用地区。)
2. 单击Select A Sample模板单选按钮，在字段内单击一次，然后选择LAMP Stack选项。
3. 单击“在设计器中查看"链接并花几分钟阅读底部面板中的模板文本，以了解所有元素的组织方式。
4. 完成探索后，一路下一步，对应填写完成所需要的名称，DBUser，KeyName等等堆栈详细信息。
5. 配置堆栈相关选项，权限，故障回滚等等。
6. 审核并完成启动。
