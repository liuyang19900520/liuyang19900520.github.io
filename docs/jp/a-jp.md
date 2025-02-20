---
title: これは自動的に外国語を生成できるかどうかをテストする記事です
date: 2024-01-01
---

## 中国語のドキュメント

自動的に外国語を作成する難しさはまだいくつかありますね。


## ロック
### ロックの対象

* ロックをかける前に、ロックと保護されるオブジェクトが同じレベルにあるかどうかを確認する必要があります
* 静的フィールドはクラスに属し、クラスレベルのロックで保護できます。一方、非静的フィールドはクラスインスタンスに属し、インスタンスレベルのロックで保護できます。

つまり、非静的な wrong メソッドにロックをかけると、複数のスレッドが同じインスタンスの wrong メソッドを実行できないようにすることはできますが、異なるインスタンスの wrong メソッドが実行されないようにすることはできません。  
一方、静的な counter は複数のインスタンス間で共有されるため、必然的にスレッドセーフの問題が発生します。したがって、クラス内に Object 型の静的フィールドを定義し、counter を操作する前にこのフィールドにロックをかけるべきです。

```java
public class Data {

    @Getter
    private static int counter = 0;
    private static Object locker = new Object();

    public static int reset() {
        counter = 0;
        return counter;
    }

    public void right() {
        synchronized (locker) {
            counter++;
        }
    }

    public synchronized void wrong() {
        counter++;
    }
}

```