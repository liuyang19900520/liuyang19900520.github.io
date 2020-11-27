---
title: 如何解决循环引用的冲突问题
categories: 
 - Spring Boot
tags:
 - Spring Boot
 - Spring Security
date: 2020-11-20
---

当我在抄代码的路上一骑绝尘的时候，发生了一个奇怪的问题。控制台报出的错误如下：
``` java 
/Users/lijiao/.asdf/installs/java/adopt-openjdk-14.0.1+7/bin/java -agentlib:jdwp=transport=dt_socket,address=127.0.0.1:49266,suspend=y,server=n -XX:TieredStopAtLevel=1 -noverify -Dspring.output.ansi.enabled=always -Dcom.sun.management.jmxremote -Dspring.jmx.enabled=true -Dspring.liveBeansView.mbeanDomain -Dspring.application.admin.enabled=true -javaagent:/Users/lijiao/Library/Caches/JetBrains/IntelliJIdea2020.2/groovyHotSwap/gragent.jar -javaagent:/Users/lijiao/Library/Caches/JetBrains/IntelliJIdea2020.2/captureAgent/debugger-agent.jar -Dfile.encoding=UTF-8 -classpath /Users/lijiao/IdeaProjects/layman-starter/build/classes/java/main:/Users/lijiao/IdeaProjects/layman-starter/build/resources/main:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-configuration-processor/2.3.3.RELEASE/f8b44f9409b969d4320ce1caff727bd5b85e513e/spring-boot-configuration-processor-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.projectlombok/lombok/1.18.12/48e4e5d60309ebd833bc528dcf77668eab3cd72c/lombok-1.18.12.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-web/2.3.3.RELEASE/d38db3c19ba4bc114aaa4febfc1d89cd8725822d/spring-boot-starter-web-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-aop/2.3.3.RELEASE/8d68fee9baba6e42f1ff6954365edeab83355f40/spring-boot-starter-aop-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-data-redis/2.3.3.RELEASE/971f7e1fb22d1691d79f0c00e255c418ea0b1aa5/spring-boot-starter-data-redis-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-security/2.3.3.RELEASE/8096643d49582bfefd91de01714281dad56688f0/spring-boot-starter-security-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-validation/2.3.3.RELEASE/fd55e368f18dab00ec621f11a8bfc57d8e3dbb77/spring-boot-starter-validation-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.baomidou/mybatis-plus-boot-starter/3.4.0/482d3ecceb9223f08f8409ce5d48f12e4ff8cab9/mybatis-plus-boot-starter-3.4.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.baomidou/mybatis-plus-generator/3.4.0/87141e66284f2abe3aa553f021c9ee8b33a5cd22/mybatis-plus-generator-3.4.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.apache.velocity/velocity-engine-core/2.2/68d899cb70cd27d495562fa808feb2da4926d38f/velocity-engine-core-2.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-boot-starter/3.0.0/5486365e263f8acca014b97efa50c3419d58e8f6/springfox-boot-starter-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.github.xiaoymin/swagger-bootstrap-ui/1.9.6/9c9935b59c43f9a8b6b1fb2db38c4be7809a7db2/swagger-bootstrap-ui-1.9.6.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.jsonwebtoken/jjwt/0.9.1/54d2abfc3e63a28824d35bf600d6a5d627da681a/jjwt-0.9.1.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/cn.hutool/hutool-all/5.4.1/d9ccfe199bdb3abd90c82eb701966f89e6092455/hutool-all-5.4.1.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/jakarta.xml.bind/jakarta.xml.bind-api/2.3.2/8d49996a4338670764d7ca4b85a1c4ccf7fe665d/jakarta.xml.bind-api-2.3.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-json/2.3.3.RELEASE/8c40b22a0635989ecc58f35d82fd55445be8822f/spring-boot-starter-json-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter/2.3.3.RELEASE/c9bb3464e83990465b86fb94da3d20f92f036d1e/spring-boot-starter-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-tomcat/2.3.3.RELEASE/542a0aaf0f584d186d9bd052ab10a5cf357a5b39/spring-boot-starter-tomcat-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-webmvc/5.2.8.RELEASE/9cccf8354a7e031e217681db33f14339200dffcf/spring-webmvc-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-web/5.2.8.RELEASE/4f9542d61fff7beb6050e8028dfb6b7c6844c99a/spring-web-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-aop/5.2.8.RELEASE/e0e9b4ed80ecde4bad258aaa3f87bf16eb1feecc/spring-aop-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.aspectj/aspectjweaver/1.9.6/ee3b73aa16df35179255f17354d9dfd8e7822835/aspectjweaver-1.9.6.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.data/spring-data-redis/2.3.3.RELEASE/9b858f8dd52d439cc9c78f3614345947f224be9f/spring-data-redis-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.lettuce/lettuce-core/5.3.3.RELEASE/613d27c80803a38bd2d3d7d8e824a3ff54149727/lettuce-core-5.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.security/spring-security-web/5.3.4.RELEASE/9574a39bd514ece4cb8cfcb4e05c0ee2c5b53046/spring-security-web-5.3.4.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.security/spring-security-config/5.3.4.RELEASE/9106bcf21ce07f63259bea082fbd401584c5707b/spring-security-config-5.3.4.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.glassfish/jakarta.el/3.0.3/dab46ee1ee23f7197c13d7c40fce14817c9017df/jakarta.el-3.0.3.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.hibernate.validator/hibernate-validator/6.1.5.Final/e5539b4b05c1520a9b4c0a120fd6e4984a8d5dc8/hibernate-validator-6.1.5.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-jdbc/2.3.3.RELEASE/2ccdb545544ba6a170496daf3c56fc5edae43a7b/spring-boot-starter-jdbc-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-autoconfigure/2.3.3.RELEASE/a1343e09cb6024bb4fbf656ce3cd3d13f12ccbdd/spring-boot-autoconfigure-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.baomidou/mybatis-plus/3.4.0/a65a7709da57b3d8b0c7f0be6da6584583295c97/mybatis-plus-3.4.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.baomidou/mybatis-plus-extension/3.4.0/335c81c288ab0b8b77cfa3cfe322648c9279e99b/mybatis-plus-extension-3.4.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.apache.commons/commons-lang3/3.10/e155460aaf5b464062a09c3923f089ce99128a17/commons-lang3-3.10.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.slf4j/slf4j-api/1.7.30/b5a4b6d16ab13e34a88fae84c35cd5d68cac922c/slf4j-api-1.7.30.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-oas/3.0.0/e7bc9c1319cf1b64ae714a249c3db3b8fe01e42b/springfox-oas-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-data-rest/3.0.0/40f5e834d6696ae1d3212fa5a2d5e1ec406bedc0/springfox-data-rest-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-bean-validators/3.0.0/80c646fdebe5f2b2b337a5a686e540fee0b7304f/springfox-bean-validators-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-swagger2/3.0.0/7bcb18d496576eff76ef7bb72684e149cbb75c1d/springfox-swagger2-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.plugin/spring-plugin-metadata/2.0.0.RELEASE/6fb3a1fc0f05dc826687b7686ad8a5960ecdd57c/spring-plugin-metadata-2.0.0.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.plugin/spring-plugin-core/2.0.0.RELEASE/95fc8c13037630f4aba9c51141f535becec00fe6/spring-plugin-core-2.0.0.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-swagger-ui/3.0.0/1e665fbe22148f7c36fa8a08e515a0047cd4390b/springfox-swagger-ui-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.fasterxml/classmate/1.5.1/3fe0bed568c62df5e89f4f174c101eab25345b6c/classmate-1.5.1.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.javassist/javassist/3.25.0-GA/442dc1f9fd520130bd18da938622f4f9b2e5fba3/javassist-3.25.0-GA.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-databind/2.11.2/ee08bbd8975dde844307fe8309dfcd5ec7ee129d/jackson-databind-2.11.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/jakarta.activation/jakarta.activation-api/1.2.2/99f53adba383cb1bf7c3862844488574b559621f/jakarta.activation-api-1.2.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.datatype/jackson-datatype-jdk8/2.11.2/d4c1933a8d62db65c3d5a5cd809511e021a189c0/jackson-datatype-jdk8-2.11.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.datatype/jackson-datatype-jsr310/2.11.2/e6235e5eb3cf3edd2a95cd0dc96bc48aeb309e8a/jackson-datatype-jsr310-2.11.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.module/jackson-module-parameter-names/2.11.2/c0dc526fcef5a3aae0273fc516ecf3505f7a5de8/jackson-module-parameter-names-2.11.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot/2.3.3.RELEASE/74f0cfae433a6ba6d936c61baa5a5316a688dc22/spring-boot-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-starter-logging/2.3.3.RELEASE/23523992dd7378fa565b1fc70e19629e8b867ada/spring-boot-starter-logging-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/jakarta.annotation/jakarta.annotation-api/1.3.5/59eb84ee0d616332ff44aba065f3888cf002cd2d/jakarta.annotation-api-1.3.5.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-core/5.2.8.RELEASE/35a1654028254abd7cb85799a891de8a0ab9f599/spring-core-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.yaml/snakeyaml/1.26/a78a8747147d2c5807683e76ec2b633e95c14fe9/snakeyaml-1.26.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.apache.tomcat.embed/tomcat-embed-websocket/9.0.37/ee8b7c9081372bf40c41443c93317145a01e343a/tomcat-embed-websocket-9.0.37.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.apache.tomcat.embed/tomcat-embed-core/9.0.37/c3f788de87f17eb57a9e7083736c1820fcbc1046/tomcat-embed-core-9.0.37.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-context/5.2.8.RELEASE/304d59d6c9fda8bc651fecc8c49748f8259de5ce/spring-context-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-beans/5.2.8.RELEASE/5cfafc2b0f821bda0b537449a6fdf634b0a666ff/spring-beans-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-expression/5.2.8.RELEASE/1b3b5c84e83b450357ae84135e1b47d1b4e5a217/spring-expression-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.data/spring-data-keyvalue/2.3.3.RELEASE/ed37d9eba6fa7ca8e9ccc8e9bf9291ac17c25a4/spring-data-keyvalue-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-context-support/5.2.8.RELEASE/8ceeda89c6c66b10d5ecb8b341ede07a1f9bfd94/spring-context-support-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-tx/5.2.8.RELEASE/69255178069ff00e6b30a7a7ede71894b9e6d91b/spring-tx-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-oxm/5.2.8.RELEASE/46357f6554fbd178367c06de236204c2e2def66a/spring-oxm-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.netty/netty-handler/4.1.51.Final/b4b1db4b71e4e082587da3a5684df101dab2dc3a/netty-handler-4.1.51.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.netty/netty-transport/4.1.51.Final/dbbe2d21879ceb82e7b44cd505aba83b752001a4/netty-transport-4.1.51.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.netty/netty-common/4.1.51.Final/ef64ad6fe8a8bc380a96f6d67e9fc442689dd7e1/netty-common-4.1.51.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.projectreactor/reactor-core/3.3.9.RELEASE/cce63b50019828d5af606b6634c8d6b24987b0a3/reactor-core-3.3.9.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.security/spring-security-core/5.3.4.RELEASE/81a2fc0900726aa480f51f2a43392ed60c2e4425/spring-security-core-5.3.4.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/jakarta.validation/jakarta.validation-api/2.0.2/5eacc6522521f7eacb081f95cee1e231648461e7/jakarta.validation-api-2.0.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.jboss.logging/jboss-logging/3.4.1.Final/40fd4d696c55793e996d1ff3c475833f836c2498/jboss-logging-3.4.1.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.zaxxer/HikariCP/3.4.5/aa1a2c00aae8e4ba8308e19940711bb9525b103d/HikariCP-3.4.5.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-jdbc/5.2.8.RELEASE/72ab49da94436dc4e26a4874abe6046bb2df3883/spring-jdbc-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.baomidou/mybatis-plus-core/3.4.0/4a871659656d8d5ee8d77335981170f978b80f8e/mybatis-plus-core-3.4.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.mybatis/mybatis-spring/2.0.5/3bfeffacf579b7f607486c1cd32224643102c316/mybatis-spring-2.0.5.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-swagger-common/3.0.0/2e2fae840984cfcabfd50e1b4b1c23422135ba12/springfox-swagger-common-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-spring-webmvc/3.0.0/7ed22363fdfd651cd811c0b2391f16bddb91db8b/springfox-spring-webmvc-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-spring-web/3.0.0/a76f2fbe805bfd2798e20dc8f2cfbfad554d52da/springfox-spring-web-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-schema/3.0.0/32c5d6965617830ef6480fadb9030008945bcd9c/springfox-schema-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-spi/3.0.0/bae0b820d4b5a922063d34a42aaf4f763308b828/springfox-spi-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-core/3.0.0/7c3367ce577c8acd9bf64c74488c9269253516c9/springfox-core-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.springfox/springfox-spring-webflux/3.0.0/efccbcfe1d23f2ba520bd87cc156bf2b81f3568e/springfox-spring-webflux-3.0.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.swagger.core.v3/swagger-annotations/2.1.2/d407a33aa71444802c640080eb4d5f499b027f96/swagger-annotations-2.1.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.swagger.core.v3/swagger-models/2.1.2/e7edeed6456a16d707542c003af03a594ecafe3a/swagger-models-2.1.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.swagger/swagger-models/1.5.20/fb3a23bad80c5ed84db9dd150db2cba699531458/swagger-models-1.5.20.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.swagger/swagger-annotations/1.5.20/16051f93ce11ca489a5313775d825f82fcc2cd6c/swagger-annotations-1.5.20.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-annotations/2.11.2/e0a7f61fce3e3eac38a079c11831868269de2ea/jackson-annotations-2.11.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-core/2.11.2/bc022ab0f0c83c07f9c52c5ab9a6a4932b15cc35/jackson-core-2.11.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/ch.qos.logback/logback-classic/1.2.3/7c4f3c474fb2c041d8028740440937705ebb473a/logback-classic-1.2.3.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.apache.logging.log4j/log4j-to-slf4j/2.13.3/966f6fd1af4959d6b12bfa880121d4a2b164f857/log4j-to-slf4j-2.13.3.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.slf4j/jul-to-slf4j/1.7.30/d58bebff8cbf70ff52b59208586095f467656c30/jul-to-slf4j-1.7.30.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework/spring-jcl/5.2.8.RELEASE/e18b8dea088cc58fad8fc25ee93f22987dd05d94/spring-jcl-5.2.8.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.data/spring-data-commons/2.3.3.RELEASE/a59b128d4ab6d227ac882be655a4e70343d8faf0/spring-data-commons-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.netty/netty-codec/4.1.51.Final/69b830d381b64e988632561d823b53f783efe9c5/netty-codec-4.1.51.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.netty/netty-resolver/4.1.51.Final/47c0b7a0e0faf059d5b8c58b64d78b8f2cfc0463/netty-resolver-4.1.51.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.netty/netty-buffer/4.1.51.Final/2f4efc2ed376b46f4eb27f9405fa5a32a3695177/netty-buffer-4.1.51.Final.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.reactivestreams/reactive-streams/1.0.3/d9fb7a7926ffa635b3dcaa5049fb2bfa25b3e7d0/reactive-streams-1.0.3.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.baomidou/mybatis-plus-annotation/3.4.0/f2ef819c296ac832b646a7bb569bd0ed2927c932/mybatis-plus-annotation-3.4.0.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/com.github.jsqlparser/jsqlparser/3.2/cdb6b01b5ef2a803519ddd17ef6b5e2449fc21bd/jsqlparser-3.2.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.mybatis/mybatis/3.5.5/1c8974cdec88c9259b6fa21147ea4538216e447/mybatis-3.5.5.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/io.github.classgraph/classgraph/4.8.83/7be289f451cedf9e35ed97caba3953226b4e6d9/classgraph-4.8.83.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/net.bytebuddy/byte-buddy/1.10.14/5288bd154aa7bc8ea81a658f60a790f646025832/byte-buddy-1.10.14.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/ch.qos.logback/logback-core/1.2.3/864344400c3d4d92dfeb0a305dc87d953677c03c/logback-core-1.2.3.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.apache.logging.log4j/log4j-api/2.13.3/ec1508160b93d274b1add34419b897bae84c6ca9/log4j-api-2.13.3.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.springframework.boot/spring-boot-devtools/2.3.3.RELEASE/a323e960cae4f5c351a468c0502728e97f4d3183/spring-boot-devtools-2.3.3.RELEASE.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/mysql/mysql-connector-java/8.0.21/53fd3a0887667aae7e40a3439fff2d03d93ec4c2/mysql-connector-java-8.0.21.jar:/Users/lijiao/.gradle/caches/modules-2/files-2.1/org.mapstruct/mapstruct/1.3.1.Final/6ab184bbc7a7029738277a244e4c535fcdc3f558/mapstruct-1.3.1.Final.jar:/Applications/IntelliJ IDEA.app/Contents/lib/idea_rt.jar com.liuyang19900520.layman.starter.LaymanStarterApplication
OpenJDK 64-Bit Server VM warning: Options -Xverify:none and -noverify were deprecated in JDK 13 and will likely be removed in a future release.
Connected to the target VM, address: '127.0.0.1:49266', transport: 'socket'
OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.3.3.RELEASE)

2020-11-27 15:31:19.366  INFO 22777 --- [  restartedMain] c.l.l.starter.LaymanStarterApplication   : Starting LaymanStarterApplication on LiJiaodeMacBook-Pro.local with PID 22777 (/Users/lijiao/IdeaProjects/layman-starter/build/classes/java/main started by lijiao in /Users/lijiao/IdeaProjects/layman-starter)
2020-11-27 15:31:19.368 DEBUG 22777 --- [  restartedMain] c.l.l.starter.LaymanStarterApplication   : Running with Spring Boot v2.3.3.RELEASE, Spring v5.2.8.RELEASE
2020-11-27 15:31:19.368  INFO 22777 --- [  restartedMain] c.l.l.starter.LaymanStarterApplication   : The following profiles are active: local
2020-11-27 15:31:19.401  INFO 22777 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : Devtools property defaults active! Set 'spring.devtools.add-properties' to 'false' to disable
2020-11-27 15:31:19.402  INFO 22777 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : For additional web related logging consider setting the 'logging.level.web' property to 'DEBUG'
2020-11-27 15:31:20.053  INFO 22777 --- [  restartedMain] .s.d.r.c.RepositoryConfigurationDelegate : Multiple Spring Data modules found, entering strict repository configuration mode!
2020-11-27 15:31:20.055  INFO 22777 --- [  restartedMain] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data Redis repositories in DEFAULT mode.
2020-11-27 15:31:20.083  INFO 22777 --- [  restartedMain] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 20ms. Found 0 Redis repository interfaces.
2020-11-27 15:31:20.394  INFO 22777 --- [  restartedMain] trationDelegate$BeanPostProcessorChecker : Bean 'org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler@49e4e459' of type [org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2020-11-27 15:31:20.400  INFO 22777 --- [  restartedMain] trationDelegate$BeanPostProcessorChecker : Bean 'methodSecurityMetadataSource' of type [org.springframework.security.access.method.DelegatingMethodSecurityMetadataSource] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2020-11-27 15:31:20.660  INFO 22777 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2020-11-27 15:31:20.666  INFO 22777 --- [  restartedMain] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2020-11-27 15:31:20.667  INFO 22777 --- [  restartedMain] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.37]
2020-11-27 15:31:20.727  INFO 22777 --- [  restartedMain] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2020-11-27 15:31:20.727  INFO 22777 --- [  restartedMain] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1325 ms
2020-11-27 15:31:20.768 ERROR 22777 --- [  restartedMain] o.s.b.web.embedded.tomcat.TomcatStarter  : Error starting Tomcat context. Exception: org.springframework.beans.factory.UnsatisfiedDependencyException. Message: Error creating bean with name 'jwtAuthenticationTokenFilter': Unsatisfied dependency expressed through field 'userDetailsService'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'securityConfig': Unsatisfied dependency expressed through method 'setContentNegotationStrategy' parameter 0; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'laymanJacksonWebConfig': Unsatisfied dependency expressed through field 'requestMappingHandlerAdapter'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'requestMappingHandlerAdapter' defined in class path resource [com/liuyang19900520/layman/starter/common/json/config/LaymanJacksonWebConfig.class]: Unsatisfied dependency expressed through method 'requestMappingHandlerAdapter' parameter 0; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'mvcContentNegotiationManager': Requested bean is currently in creation: Is there an unresolvable circular reference?
2020-11-27 15:31:20.783  INFO 22777 --- [  restartedMain] o.apache.catalina.core.StandardService   : Stopping service [Tomcat]
2020-11-27 15:31:20.789  WARN 22777 --- [  restartedMain] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.context.ApplicationContextException: Unable to start web server; nested exception is org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
2020-11-27 15:31:20.797  INFO 22777 --- [  restartedMain] ConditionEvaluationReportLoggingListener : 

Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2020-11-27 15:31:20.803 ERROR 22777 --- [  restartedMain] o.s.boot.SpringApplication               : Application run failed

org.springframework.context.ApplicationContextException: Unable to start web server; nested exception is org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:161)
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:545)
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:143)
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:758)
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:750)
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:397)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:315)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1237)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1226)
	at com.liuyang19900520.layman.starter.LaymanStarterApplication.main(LaymanStarterApplication.java:17)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:564)
	at org.springframework.boot.devtools.restart.RestartLauncher.run(RestartLauncher.java:49)
Caused by: org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.initialize(TomcatWebServer.java:142)
	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.<init>(TomcatWebServer.java:104)
	at org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getTomcatWebServer(TomcatServletWebServerFactory.java:437)
	at org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getWebServer(TomcatServletWebServerFactory.java:191)
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.createWebServer(ServletWebServerApplicationContext.java:178)
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:158)
	... 14 common frames omitted
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'jwtAuthenticationTokenFilter': Unsatisfied dependency expressed through field 'userDetailsService'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'securityConfig': Unsatisfied dependency expressed through method 'setContentNegotationStrategy' parameter 0; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'laymanJacksonWebConfig': Unsatisfied dependency expressed through field 'requestMappingHandlerAdapter'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'requestMappingHandlerAdapter' defined in class path resource [com/liuyang19900520/layman/starter/common/json/config/LaymanJacksonWebConfig.class]: Unsatisfied dependency expressed through method 'requestMappingHandlerAdapter' parameter 0; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'mvcContentNegotiationManager': Requested bean is currently in creation: Is there an unresolvable circular reference?
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:643)
	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:130)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:399)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1420)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:593)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:516)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:324)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:226)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:322)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207)
	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.getOrderedBeansOfType(ServletContextInitializerBeans.java:211)
	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.addAsRegistrationBean(ServletContextInitializerBeans.java:174)
	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.addAsRegistrationBean(ServletContextInitializerBeans.java:169)
	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.addAdaptableBeans(ServletContextInitializerBeans.java:154)
	at org.springframework.boot.web.servlet.ServletContextInitializerBeans.<init>(ServletContextInitializerBeans.java:86)
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.getServletContextInitializerBeans(ServletWebServerApplicationContext.java:255)
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.selfInitialize(ServletWebServerApplicationContext.java:229)
	at org.springframework.boot.web.embedded.tomcat.TomcatStarter.onStartup(TomcatStarter.java:53)
	at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5128)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1384)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1374)
	at java.base/java.util.concurrent.FutureTask.run$$$capture(FutureTask.java:264)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java)
	at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75)
	at java.base/java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:140)
	at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:909)
	at org.apache.catalina.core.StandardHost.startInternal(StandardHost.java:841)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1384)
	at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1374)
	at java.base/java.util.concurrent.FutureTask.run$$$capture(FutureTask.java:264)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java)
	at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75)
	at java.base/java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:140)
	at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:909)
	at org.apache.catalina.core.StandardEngine.startInternal(StandardEngine.java:262)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)
	at org.apache.catalina.core.StandardService.startInternal(StandardService.java:421)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)
	at org.apache.catalina.core.StandardServer.startInternal(StandardServer.java:930)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)
	at org.apache.catalina.startup.Tomcat.start(Tomcat.java:486)
	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.initialize(TomcatWebServer.java:123)
	... 19 common frames omitted
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'securityConfig': Unsatisfied dependency expressed through method 'setContentNegotationStrategy' parameter 0; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'laymanJacksonWebConfig': Unsatisfied dependency expressed through field 'requestMappingHandlerAdapter'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'requestMappingHandlerAdapter' defined in class path resource [com/liuyang19900520/layman/starter/common/json/config/LaymanJacksonWebConfig.class]: Unsatisfied dependency expressed through method 'requestMappingHandlerAdapter' parameter 0; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'mvcContentNegotiationManager': Requested bean is currently in creation: Is there an unresolvable circular reference?
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredMethodElement.inject(AutowiredAnnotationBeanPostProcessor.java:723)
	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:130)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:399)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1420)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:593)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:516)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:324)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:226)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:322)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:202)
	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:408)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1336)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1176)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:556)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:516)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:324)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:226)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:322)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:202)
	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:276)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1307)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1227)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:640)
	... 62 common frames omitted
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'laymanJacksonWebConfig': Unsatisfied dependency expressed through field 'requestMappingHandlerAdapter'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'requestMappingHandlerAdapter' defined in class path resource [com/liuyang19900520/layman/starter/common/json/config/LaymanJacksonWebConfig.class]: Unsatisfied dependency expressed through method 'requestMappingHandlerAdapter' parameter 0; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'mvcContentNegotiationManager': Requested bean is currently in creation: Is there an unresolvable circular reference?
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:643)
	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:130)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessProperties(AutowiredAnnotationBeanPostProcessor.java:399)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1420)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:593)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:516)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:324)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:226)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:322)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:202)
	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:408)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1336)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1176)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:556)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:516)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:324)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:226)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:322)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:202)
	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:276)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1307)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1227)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredMethodElement.inject(AutowiredAnnotationBeanPostProcessor.java:715)
	... 84 common frames omitted
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'requestMappingHandlerAdapter' defined in class path resource [com/liuyang19900520/layman/starter/common/json/config/LaymanJacksonWebConfig.class]: Unsatisfied dependency expressed through method 'requestMappingHandlerAdapter' parameter 0; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'mvcContentNegotiationManager': Requested bean is currently in creation: Is there an unresolvable circular reference?
	at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:797)
	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:538)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1336)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1176)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:556)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:516)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:324)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:226)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:322)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:202)
	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:276)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1307)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1227)
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredFieldElement.inject(AutowiredAnnotationBeanPostProcessor.java:640)
	... 106 common frames omitted
Caused by: org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'mvcContentNegotiationManager': Requested bean is currently in creation: Is there an unresolvable circular reference?
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.beforeSingletonCreation(DefaultSingletonBeanRegistry.java:347)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:219)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:322)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:202)
	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:276)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1307)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1227)
	at org.springframework.beans.factory.support.ConstructorResolver.resolveAutowiredArgument(ConstructorResolver.java:884)
	at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:788)
	... 119 common frames omitted

Disconnected from the target VM, address: '127.0.0.1:49266', transport: 'socket'

Process finished with exit code 0

```
>Caused by: org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'mvcContentNegotiationManager': Requested bean is currently in creation: Is there an unresolvable circular reference?

我的理解是，在创建mvcContentNegotiationManager这个bean的时候，发生了循环引用。而这个bean又不是我自己定义的，是spirng提供的。 
关于Spring循环引用的事还真是听说过，没见过，所以还是抄一抄。 

## 定位
代码一路走来都没什么问题，就在我为LaymanSecurityConfig配置一个JwtAuthenticationTokenFilter的时候发生了这种事。同时通过错误信息我们可以发现laymanJacksonWebConfig创建时也同样出现了错误。所以我简单的进行了验证，上述二者注释掉一个的时候，程序就能够顺利启动，如果同时配置，就会报错。 

于是我找到了报错的地点，具体看一下状态
![0001](/subject/layman-starter/07/0001.png)

简单的看到这个异常的意义大概就是说，这个bean已经在创建中了，我们也发现在创建list中也确实存在mvcContentNegotiationManager这个类。到现在为止问题大概有一个理解，可能是JwtAuthenticationTokenFilter和LaymanSecurityConfig进行配置时，都需要依赖mvcContentNegotiationManager，并且这个需要的时间点，是并没有完成bean的创建时发生的，如果只调查循环引用的话，可能没有办法及时找到修正方法，于是我们需要更深入的了解一下。

## 调查
* [Spring三级缓存解决循环依赖](https://blog.csdn.net/fedorafrog/article/details/104550165) 
* [Spring的构造函数注入的循环依赖问题](https://blog.csdn.net/u010013573/article/details/90573901) 

### 错误的分析
看到上面博客的分析，我感觉我个人的情况应该是构造方法造成的循环引用，只能修正为setter方法来进行配置。于是我尝试了下面的方式
```java
    @Autowired
    public void setRequestMappingHandlerAdapter(RequestMappingHandlerAdapter requestMappingHandlerAdapter) {
        this.requestMappingHandlerAdapter = requestMappingHandlerAdapter;

    }
```
事实上这并没有什么用，其实从效果上看，我们将@Autowired注解设置到属性上的时候，我们可以写，也可以不写setter来进行注入，至于为什么写了@Autowired就不需要setter的原因，可参见：
* [为什么使用Spring的@autowired注解后就不用写setter了](https://blog.csdn.net/qq_19782019/article/details/85038081) 

根据上面修改方法的思路，我决定采用xml方式来配置我们的LaymanJacksonWebConfig方法，并且将requestMappingHandlerAdapter以参数的方式进行注入。
于是有了下面这种毫无意义的改法
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd   http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>
    <bean id="laymanJacksonWebConfig"
          class="com.liuyang19900520.layman.starter.common.json.config.LaymanJacksonWebConfig">

        <!-- setter injection using the nested ref element -->
        <property name="requestMappingHandlerAdapter">
            <ref bean="requestMappingHandlerAdapter"/>
        </property>
    </bean>
    <bean id="requestMappingHandlerAdapter"
          class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter"/>
</beans>
```
然后在java的代码上添加上注解，@ImportResource("classpath:layman-starter-spring.xml")。
> Consider renaming one of the beans or enabling overriding by setting
之后我们会出现上述错误，然后在我在配置文件中又添加了
```yml
  main:
    allow-bean-definition-overriding: true #当遇到同样名字的时候，是否允许覆盖注册
```
能出现时上面的情况，主要是我在写的过程中，没有删除掉原来javaConfig的注解，于是才产生了覆盖错误。碰巧这时候就能够




