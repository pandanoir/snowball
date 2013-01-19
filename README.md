snowball
========
Snowball( http://pandanoir.web.fc2.com/snowball/snowball.html )のGitHubです。
## 使い方
まず Snowball( http://pandanoir.web.fc2.com/snowball/snowball.html )にアクセスします。
次に任意のCSSコードを入力します。
例えば次のようなCSSコードを入力します。
やりかたは(対応していれば)ファイルをドラッグ&ドロップ、もしくはコードをコピーアンドペーストです。
>.white-space{
>	white-space: nowrap;
>	background :#FFF!important;
>	color : #FFFFFF !important ;
>	margin:3px 3px 5px 3px;
>}
>@media screen and (max-device-width:480px){
>	.black , .button {
>		color:black;\/*OK*\/
>		margin: 0px;
>		opacity:0.9;
>		padding:3px 3px 3px 3px;
>	}
>}
入力したら、「圧縮」ボタンをおします。
すると、圧縮されたコードが After にでてきます。

## オプション説明

オプションは以下の通りです。
+ コメントを残さない
+ 値が0なら単位を省略
+ 0.xとあったら0を省略
+ カラーコードを短くする
+ カラーネームを最適化する
+ paddingを最短にする
+ marginを最短にする
+ カラーコードを小文字にする
以下は「一部だけ圧縮する」をオンにした場合のみ機能します。
+ インデントを消す
+ 改行を消す
+ カンマ周辺の空白を消す
+ コロン周辺の空白を消す
+ セミコロン周辺の空白を消す
+ !important周辺の空白を消す
+ 始め波括弧の空白を消す
+ 終わり波括弧の空白を消す
だいたい機能をそのまま表してあります。