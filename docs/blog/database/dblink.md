---
title: 尝试使用dblink，实现并发调用procedure
date: 2022-12-03
categories: 
 - Database
tags:
 - Postgres
 - dblink
---

如何实现并发调用procedure，之前从来没有做过类似的功能，于是查询了一下文档后感觉，在同一个数据库连接中，除了异步提交之外，好像很难实现并发的功能。而异步提交涉及到相关知识又不能短时间补齐，所以我想通过在一个procedure中，重新开启多个数据库连接，在每个连接中分别调用需要的procedure来实现并发的效果。说到底，和在java中处理数据库并发操作一样，于是尝试查了一下，发现的确有人做过类似的尝试。 

[阿里云RDS PostgreSQL OSS 外部表实践 - (dblink异步调用封装并行) 数据并行导出到OSS](https://github.com/digoal/blog/blob/master/201709/20170906_01.md?spm=a2c6h.12873639.article-detail.13.e0d4127aPgLnjv&file=20170906_01.md)
阅读上述文章，主要是在做大数据操作时进行了并行写的需求。我的功能有些类似，只需要把写功能变成procedure调用就可以了。

### 环境准备
1. 实验用table准备
为了和工作中遇到的问题尽可能类似，提前创建了dev的schema，并且在dev下创建了test表。
```sql
-- Table: dev.test

-- DROP TABLE IF EXISTS dev.test;

CREATE TABLE IF NOT EXISTS dev.test
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying COLLATE pg_catalog."default",
    CONSTRAINT test_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS dev.test
    OWNER to postgres;
```
2. 创建需要被调用的目标procedure
操作很简单，从根据当前的进程ID，查找到应用名称，将这个应用名称插入到刚刚创建好的test表中。
```sql
-- PROCEDURE: dev.testnoparas()

-- DROP PROCEDURE IF EXISTS dev.testnoparas();

CREATE OR REPLACE PROCEDURE dev.testnoparas(
	)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
appName   text; 
begin
	select application_name into appName from pg_stat_activity where pid = pg_backend_pid();
	insert into dev.test (name) values (appName) ;
	RAISE NOTICE 'Calling test job witn no param';
end;
$BODY$;
ALTER PROCEDURE dev.testnoparas()
    OWNER TO postgres;
```

3. 调用测试
我们用普通的方法来进行测试，在一个数据连接中循环对这个procedure进行调用来看一下效果。
```sql
DO $$
DECLARE
  a int;
  BEGIN
set search_path = dev;
	a:= 1;
  LOOP
    IF (a = 3) THEN
      EXIT;
    END IF;
    call testNoParas();
	a := a + 1;
  END LOOP;
END$$;
```
执行之后我们能看到效果如下。得出的数据如下。 
name处插入的数据，是同一个值。也就是我们当前使用的应用。
![0001](/blog/database/dblink1.png)


### 导入dblink

1. 安装Extensions到对应的schema
```sql
create extension dblink with schema dev
```

2. 创建关闭连接的方法
这一步是原封不到照抄上述文章的内容，也就是为关闭连接
```sql
```



