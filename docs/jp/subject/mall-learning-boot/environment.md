# 環境構築
主な構築設定について、Java環境以外のサービスは仮想マシンに設定し、ローカル環境に単純的にJava環境しかない。

## 仮想マシンの構築
システム構築にはローカル環境だけは足りない。模擬のために、仮想マシンのセットアップに欠くことはできない。[VirtualBoxを設定](http://www.macrozheng.com/#/reference/linux_install)  
手順は中国語ですけど、画像を見るとすぐわかると思います。通りに設定すると、リブートすれば、またインストール必要があります、その原因はDVD起動の優先順位はハードディスク起動より高い。一応DVD起動を外して、リブートしてください。

## mysql8.0インストール
上記通り、仮想マシンにmysql環境は必要だと思いますので、一応mysql構築手順を探しました。
* [日本語版手順](https://vertys.net/centos8-mysql8-install/)
* [中国語版手順](https://blog.csdn.net/qq_43232506/article/details/102816659)
簡単に言うと、まずMySQLを構築して、ファイアウォールの3306ポートを開き、ローカルで仮想マシンに接続して見ると、成功であれば、sqlファイルを実行し、データ導入します。[テストデータ](https://github.com/macrozheng/mall/tree/master/document/sql)




## IDE相関
IDEAのプラグインをメモします。
* .ignore
* Alibaba Java Coding



