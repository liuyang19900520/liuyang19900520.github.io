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
这一步是原封不到照抄上述文章的内容，也就是为关闭连接创建一个简易的方法。按照原博主的说法，目的是不抛异常。
```sql
-- FUNCTION: dev.dis_conn(name)

-- DROP FUNCTION IF EXISTS dev.dis_conn(name);

CREATE OR REPLACE FUNCTION dev.dis_conn(
	name)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE STRICT PARALLEL UNSAFE
AS $BODY$
  
declare  
begin  
  perform dblink_disconnect($1);  
  return;  
exception when others then  
  return;  
end;  
$BODY$;

ALTER FUNCTION dev.dis_conn(name)
    OWNER TO postgres;
```
2. 设置现成sleep已检测插入顺序是否并行
在刚才的测试代码中加入睡眠时间，并且循环执行，可以通过调用后插入对象的结果来判断是否并行执行。根据修改后的sql来看，我们期待插入到test的应用名称应该是乱序。
```sql
-- PROCEDURE: dev.testnoparas()

-- DROP PROCEDURE IF EXISTS dev.testnoparas();

CREATE OR REPLACE PROCEDURE dev.testnoparas(
	)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
appName   text;
a int;

begin
	set search_path = dev;
	a:= 1;
	LOOP
		IF (a = 5) THEN
		  EXIT;
		END IF;
	PERFORM pg_sleep(1);
	select application_name into appName from pg_stat_activity where pid = pg_backend_pid();
	insert into dev.test (name) values (appName) ;
	RAISE NOTICE 'Calling test job no param';
	a := a + 1;
	END LOOP;

end;
$BODY$;
ALTER PROCEDURE dev.testnoparas()
    OWNER TO postgres;

```

3. 使用dblink进行测试
我直接平移了原博主使用的procedure，然后对每个链接自己的部分修改成了procedure调用。为了做建议测试，我删除了其中状态控制的部分。

* 为什么注释掉了关闭连接的代码 

  根据原作者的代码，关闭链接不影响异步指令的执行，是因为如果我关闭了连接的话，我将无法执行我的procedure调用，数据库中将无法插入数据。不确定是不是版本的问题。
* 为什么不使用dblink_exec来调用

  如果看官方文档，对于远程调用来说dblink_exec更适合调用procedure，但是实际执行起来，dblink_exec本身是需要同步执行完毕的，dblink_exec是一个同步函数，即使我开启了多个连接，也只不过是对多个链接进行了顺序调用罢了，而dblink_send_query是异步函数，能够实现我想要的并发效果。
```sql
do language plpgsql $$  
declare  
begin  
  -- 断开已有连接  
  perform dis_conn('a');  
  perform dis_conn('b');  
  perform dis_conn('c');  
  perform dis_conn('d');  
  
  -- 打开dblink连接。建立本地DBLINK连接（并设置连接指纹）    
  -- 使用application_name来设置连接指纹。       
  perform dblink_connect('a','hostaddr=172.16.33.33 port='||current_setting('port')||' dbname='||current_database()||' user=postgres password=postgres application_name=a');    
  perform dblink_connect('b','hostaddr=172.16.33.33 port='||current_setting('port')||' dbname='||current_database()||' user=postgres password=postgres application_name=b');    
  perform dblink_connect('c','hostaddr=172.16.33.33 port='||current_setting('port')||' dbname='||current_database()||' user=postgres password=postgres application_name=c');    
  perform dblink_connect('d','hostaddr=172.16.33.33 port='||current_setting('port')||' dbname='||current_database()||' user=postgres password=postgres application_name=d');    
  
  -- 执行异步SQL，调用实现准备好的procedure
  -- PERFORM DBLINK_EXEC('a', 'CALL dev.testNoParas()');
  -- PERFORM DBLINK_EXEC('b', 'CALL dev.testNoParas()');
  -- PERFORM DBLINK_EXEC('c', 'CALL dev.testNoParas()');
  -- PERFORM DBLINK_EXEC('d', 'CALL dev.testNoParas()');

  PERFORM dblink_send_query('a', 'begin; CALL dev.testNoParas(); end;' );
  PERFORM dblink_send_query('b', 'begin; CALL dev.testNoParas(); end;');
  PERFORM dblink_send_query('c', 'begin; CALL dev.testNoParas(); end;');
  PERFORM dblink_send_query('d', 'begin; CALL dev.testNoParas(); end;');
 
  -- 断开DBLINK  
  -- 为什么要断开DBLINK？  
  -- 开启了异步调用的连接，需要get异步调用的结果后，才能继续使用这个连接。或者关闭连接后，重新建立连接即可使用。    
  -- 断开在跑异步SQL的DBLINK，不会影响远程异步SQL的正常运行，可以放心关闭。  
  --perform dblink_disconnect('a');  
  --perform dblink_disconnect('b');  
  --perform dblink_disconnect('c');  
  --perform dblink_disconnect('d');  
  
end;  
$$;  
```
清空test表后执行上述函数得到的结果如下，发现生成数据的循序是乱系，也就是我们想要的。


![0001](/blog/database/dblink2.png)

同时也通过查询pg_stat_activity信息得出，这4个链接开始时间基本相同，也就是说明我们实现了并发调用procedure的要求。至于创建的链接如何关闭的，是不是可以通过在一定的时间后，通过查询state状态来清除掉刚刚创建的idle连接，如果连接数不大的话，或许等待链接超时也没什么关系。

![0001](/blog/database/dblink3.png)

