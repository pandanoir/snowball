if(!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g,'');
    };
}
(function(){
    var OTHERS=0,BLOCKS=1,LEFT_CURLY_BRACKET=2,RIGHT_CURLY_BRACKET=3,NEWLINE=4,TAB=5,COMMENTS=6,STRING=7,PROPERTY=8,COLON=9;
    function showResult(str,beforeSize){
        var afterSize = cb(str);
        $('#aft').val(str).select();//Afterに結果を表示
        $('#aft').parent().addClass("large").removeClass("hide");
        $('#bef').parent().addClass("small");
        var offSize=beforeSize-afterSize;//削除したサイズ
        if (1024 > beforeSize) {
            $('#befB').text(beforeSize + " B");
            $('#aftB').text(afterSize + " B");
            $('#minus').text(beforeSize === afterSize ? "±0B(0%)" : "-" + offSize + " B(" + (100 - afterSize/ beforeSize*100).toFixed(2) + "%)");
        } else {
            $('#befB').text((0|beforeSize / 1024) + " KB(" + beforeSize + " B)");
            $('#aftB').text((0|afterSize / 1024) + " KB(" + afterSize + " B)");
            $('#minus').text(beforeSize === afterSize ? "±0B(0%)" : "-" +(0|offSize / 1024) + " KB(" + offSize+ " B)(" + (100 - afterSize / beforeSize*100).toFixed(2) + "%)");
        }
        $('#mes').stop(true, false).addClass("on").css("opacity", "1").fadeTo(1500, 0.3, function () {
            $(this).removeClass("on");
        });
    }
    var cb=function(g) {
        var c = 0, d = 0, b = g.length;
        while (d < b) {
            c += 4 > escape(g.charAt(d)).length ? 1 : 2;
            d += 1;
        }
        return c;
    },
        m = Math;
    //一部圧縮用正規表現
    var color = {aliceblue: "#f0f8ff",antiquewhite: "#faebd7",aquamarine: "#7fffd4",black: "#000",blanchedalmond: "#ffebcd",
        blueviolet: "#8a2be2",burlywood: "#deb887",cadetblue: "#5f9ea0",chartreuse: "#7fff00",chocolate: "#d2691e",
        cornflowerblue: "#6495ed",cornsilk: "#fff8dc",darkblue: "#00008b",darkcyan: "#008b8b",darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",darkgreen: "#006400",darkkhaki: "#bdb76b",darkmagenta: "#8b008b",darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",darkorchid: "#9932cc",darksalmon: "#e9967a",darkseagreen: "#8fbc8f",darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",darkturquoise: "#00ced1",darkviolet: "#9400d3",deeppink: "#ff1493",deepskyblue: "#00bfff",
        dodgerblue: "#1e90ff",firebrick: "#b22222",floralwhite: "#fffaf0",forestgreen: "#228b22",fuchsia: "#f0f",
        gainsboro: "#dcdcdc",ghostwhite: "#f8f8ff",goldenrod: "#daa520",greenyellow: "#adff2f",honeydew: "#f0fff0",
        indianred: "#cd5c5c",lavendar: "#e6e6fa",lavenderblush: "#fff0f5",lawngreen: "#7cfc00",lemonchiffon: "#fffacd",
        lightblue: "#add8e6",lightcoral: "#f08080",lightcyan: "#e0ffff",lightgoldenrodyellow: "#fafad2",lightgray: "#d3d3d3",
        lightgreen: "#90ee90",lightpink: "#ffb6c1",lightsalmon: "#ffa07a",lightseagreen: "#20b2aa",lightskyblue: "#87cefa",
        lightslategray: "#789",lightsteelblue: "#b0c4de",lightyellow: "#ffffe0",limegreen: "#32cd32",magenta: "#f0f",
        mediumaquamarine: "#66cdaa",mediumblue: "#0000cd",mediumorchid: "#ba55d3",mediumpurple: "#9370db",mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",mediumspringgreen: "#00fa9a",mediumturquoise: "#48d1cc",mediumvioletred: "#c71585",midnightblue: "#191970",
        mintcream: "#f5fffa",mistyrose: "#ffe4e1",moccasin: "#ffe4b5",navajowhite: "#ffdead",olivedrab: "#6b8e23",
        orangered: "#ff4500",palegoldenrod: "#eee8aa",palegreen: "#98fb98",paleturquoise: "#afeeee",palevioletred: "#db7093",
        papayawhite: "#ffefd5",peachpuff: "#ffdab9",powderblue: "#b0e0e6",rosybrown: "#bc8f8f",royalblue: "#4169e1",
        saddlebrown: "#8b4513",sandybrown: "#f4a460",seagreen: "#2e8b57",seashell: "#fff5ee",slateblue: "#6a5acd",
        slategray: "#708090",springgreen: "#00ff7f",steelblue: "#4682b4",turquoise: "#40e0d0",white: "#fff",
        whitesmoke: "#f5f5f5",yellow: "#ff0",yellowgreen: "#9acd32","#f0ffff": "azure","#f5f5dc": "beige",
        "#ffe4c4": "bisque","#a52a2a": "brown","#ff7f50": "coral","#ffd700": "gold","#808080": "gray",
        "#008000": "green","#4b0082": "indigo","#fffff0": "ivory","#f0e68c": "khaki","#faf0e6": "linen",
        "#800000": "maroon","#000080": "navy","#808000": "olive","#ffa500": "orange","#da70d6": "orchid",
        "#cd853f": "peru","#ffc0cb": "pink","#dda0dd": "plum","#800080": "purple","#ff0000": "red",
        "#f00": "red","#fa8072": "salmon","#a0522d": "sienna","#c0c0c0": "silver","#fffafa": "snow",
        "#d2b48c": "tan","#008080": "teal","#ff6347": "tomato","#ee82ee": "violet","#f5deb3": "wheat"};
    var color_Reg={};
    var Compressors=window.Compressors={
        optimizeColorName:function(){
            var original=cssBlock.original.toLowerCase();
            for (var key in color){
                if (-1 !== original.indexOf(key)){
                    cssBlock.selector(BLOCKS).replace(new RegExp("(^|[\\(\\[, ])"+key+"([ \\]\\),;]|$)","i"),"$1"+color[key]+"$2");
                }
            }
        },
        clearZeroUnit:function(){
            cssBlock.selector(BLOCKS).replace(/(\D)[0](?:em|px|%)/g, "$10");
        },
        clearZero:function(){
            cssBlock.selector(BLOCKS).replace(/(^|[\D])0\.(\d)/g, "$1.$2");
        },
        clearComments:function(){
            cssBlock.selector(COMMENTS).del();
        },
        colorCodeToLowerCase:function(str){
            cssBlock.selector(BLOCKS).replace(/(#[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?)/g, function (all, one) {
                return one.toLowerCase(); //カラーを小文字か大文字に
            });
        },
        noneToZero:function(str){
            var blocks=cssBlock.getBlock();
            for(var i=0,j=blocks.length;i<j;i++){
                if(blocks[i][2]==BLOCKS){
                    blocks[i][0]=blocks[i][0].replace(/[\s\S]+/g,function(all){
                        var prop=blocks[i-2][0];//今(i)=valueだから2つ前がプロパティ。1つ前はコロン(:)
                        if(prop.indexOf("background-image")!=-1) return all;
                        if(prop.indexOf("border")!=-1||prop.indexOf("background")!=-1||prop.indexOf("outline")!=-1){
                            return all.replace(/none/g,"0");
                        }
                        return all;
                    });
                    cssBlock.setBlock(i,blocks[i]);
                }
            }
        },
        optimizeMargin:function(str){
            return Compressors.optimizePM(str,'margin');
        },
        optimizePadding:function(str){
            return Compressors.optimizePM(str,'padding');
        },
        optimizePM:function(str, pm) {
            var blocks=cssBlock.getBlock();
            var paddingsShouldBeDeleted=[];//最後にまとめて不要なpadding系を消すための配列
            for (var i = blocks.length;i--;) {
                if(blocks[i][1]==LEFT_CURLY_BRACKET){
                    //後ろからたどっているから左波括弧("{")が出たら終わり
                    if(aftP.ok==4){
                        var resultProperty;
                        if(aftP.right==aftP.left){
                            if(aftP.top==aftP.bottom){
                                if(aftP.top==aftP.right) resultProperty=aftP.top;//すべて同じ
                                else resultProperty=aftP.top+" "+aftP.right;//上下が同じ、左右が同じ
                            }else resultProperty=aftP.top + " " + aftP.right + " " + aftP.bottom;//上下は違うが左右は同じ
                        }else resultProperty=aftP.top + " " + aftP.right + " " + aftP.bottom + " " + aftP.left;//全部違う
                        var lastPadding=paddings.shift();//後ろからたどっているからshiftすると最後のpaddingがでてくる
                        var lastProperty=cssBlock.getBlock()[lastPadding];
                        lastProperty[0]=pm;
                        cssBlock.setBlock(lastPadding,lastProperty);
                        var lastProperty=cssBlock.getBlock()[lastPadding+2];
                        if(lastProperty[0].indexOf(';')!==-1) lastProperty[0]=resultProperty+';';
                        else lastProperty[0]=resultProperty;
                        cssBlock.setBlock(lastPadding+2,lastProperty);
                        paddingsShouldBeDeleted=paddingsShouldBeDeleted.concat(paddings);//削除予定の要素
                        //最後に出てくるpadding(margin)関係のプロパティにまとめて設定する
                        var aftP = {
                            top: null,
                            bottom: null,
                            right: null,
                            left: null,
                            ok:0
                        };
                        var paddings=[];
                    }
                }
                if(blocks[i][1]==RIGHT_CURLY_BRACKET){
                    //後ろからたどっているから右波括弧("}")が出たら初期化
                    var aftP = {
                        top: null,
                        bottom: null,
                        right: null,
                        left: null,
                        ok:0
                    };
                    var paddings=[];
                }
                if(blocks[i][1]==BLOCKS){
                    var property=blocks[i-2][0].trim();//別に元のブロックに変更しないからこれでOK
                    var value=blocks[i][0];
                    if(blocks[i-2][1]==PROPERTY){
                        if(property.indexOf(pm)===0)
                            paddings.push(i-2);//paddingたちを後々削除するためにとりあえず保存
                        if(property.indexOf(pm)===0&&aftP.ok<4){
                            if(property==pm){
                                //プロパティがpadding or marginのとき
                                var a = value.replace(/;/g, "").split(" ");//値を分割する
                                var g = a.length;
                                if(g>=5) error('padding has 5 values.');
                                else if(g==0) error('padding has no value.');
                                else{
                                    //padding:top right bottom left;
                                    if(aftP.top===null){
                                        aftP.top = a[0];//topは何があってもa[0]
                                    }
                                    if(aftP.right===null){
                                        if(g===1) aftP.right = a[0];
                                        else aftP.right = a[1];
                                    }
                                    if(aftP.bottom===null){
                                        if(g===3||g===4) aftP.bottom = a[2];
                                        else aftP.bottom = a[0];
                                    }
                                    if(aftP.left===null){
                                        if (g=== 2||g=== 3) aftP.left = a[1];
                                        else if (g === 4) aftP.left = a[3];
                                        else aftP.left = a[0];
                                    }
                                }
                                aftP.ok=4;
                            }else{
                                if(property.indexOf(pm+"-")===0){
                                    var propD=property.split(pm+"-")[1];//プロパティの後ろ部分(padding-[ココ])
                                    if((propD==="top"||propD==="right"||propD==="bottom"||propD==="left") && aftP[propD]===null){
                                        aftP.ok++;
                                        aftP[propD] = value;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for(var i=0,j=paddingsShouldBeDeleted.length;i<j;i++){
                console.log(cssBlock.joinBlock());
                cssBlock.deleteBlock(paddingsShouldBeDeleted[i]);//後ろから集めたから、前から回すと後ろからのリストとなっている
                cssBlock.deleteBlock(paddingsShouldBeDeleted[i]+1);
                cssBlock.deleteBlock(paddingsShouldBeDeleted[i]+2);
                console.log(cssBlock.joinBlock());
            }
        },
        compress:function (InputOption) {
            //compressの本体
            var b = $('#bef').val(),
            beforeSize = cb(b);
            cssBlock.init(b);
            if (InputOption["comment"]) Compressors.clearComments(b);//コメントの削除
            if (InputOption.zero) Compressors.clearZeroUnit(b);//0pxなどの単位を削除
            if (InputOption.decimals) Compressors.clearZero(b); //0.nの0を削除
            //一部だけ圧縮するがOFF=全部削除.上からインデント、改行、いらないスペース、いらないセミコロン、いらない}前後の空白の削除
            if(!InputOption.option||InputOption["indent"]){
                var blocks2=cssBlock.selector(NEWLINE);
                for(var i=0,j=blocks2.length;i<j;i++){
                    var block2=cssBlock.getBlock()[blocks2[i][2]+1];
                    block2[0]=block2[0].replace(/^[\t ]*/g, ""); //インデント
                    cssBlock.setBlock(blocks2[i][2]+1,block2); //インデントを削除後更新
                }
                var block2=cssBlock.getBlock()[0];
                block2[0]=block2[0].replace(/^[\t ]*/g, ""); //インデント
                cssBlock.setBlock(0,block2); //インデントを削除後更新
            }
            if(!InputOption.option||InputOption["line"]) cssBlock.selector(NEWLINE).del(); //改行
            if(!InputOption.option||InputOption["comma"]){
                cssBlock.selector(OTHERS).replace(/[\t ]*,[\t ]*/g, ","); //コンマ周辺のスペース
                cssBlock.selector(BLOCKS).replace(/[\t ]*,[\t ]*/g, ","); //コンマ周辺のスペース
            }
            var arr=["colon","sc_bracket","ec_bracket"];
            for(var i2=0,j2=arr.length;i2<j2;i2++){
                if(!InputOption.option||InputOption[arr[i2]]){
                    var blocks2;
                    if(arr[i2]=="colon") blocks2=cssBlock.selector(COLON);
                    if(arr[i2]=="sc_bracket") blocks2=cssBlock.selector(LEFT_CURLY_BRACKET);
                    if(arr[i2]=="ec_bracket") blocks2=cssBlock.selector(RIGHT_CURLY_BRACKET);

                    for(var i=0,j=blocks2.length;i<j;i++){
                        if(blocks2[i][2]-1>=0){
                            var block2=cssBlock.getBlock()[blocks2[i][2]-1];
                            block2[0]=block2[0].replace(/[\t ]*$/g, "" );
                            cssBlock.setBlock(blocks2[i][2]-1,block2); //コロンの前のもののスペースを消す
                        }

                        var n=1;
                        var blocks3=cssBlock.getBlock();
                        while(blocks2[i][2]+n<=blocks3.length-1&&(blocks3[blocks2[i][2]+n][1]==TAB||blocks3[blocks2[i][2]+n][1]==NEWLINE)) n++;
                        delete blocks3;
                        if(cssBlock.getBlock().length-1>=blocks2[i][2]+n){
                            block2=cssBlock.getBlock()[blocks2[i][2]+n];
                            block2[0]=block2[0].replace(/^[\t ]*?([^\t ])/g, "$1" );
                            cssBlock.setBlock(blocks2[i][2]+n,block2); //コロンの後のもののスペースを消す
                        }
                    }
                }
            }
            delete arr;
            if(!InputOption.option||InputOption["semicolon"]){
                var blocks2=cssBlock.selector(BLOCKS);
                for(var i=0,j=blocks2.length;i<j;i++){
                    if(blocks2[i][0].indexOf(';')!==-1){
                        var block2=blocks2[i];
                        block2[0]=block2[0].replace(/[\t ]*;[\t ]*$/, ";"); //セミコロン周辺のスペース
                        cssBlock.setBlock(blocks2[i][2],block2);

                        var n=1;
                        var blocks3=cssBlock.getBlock();
                        while(blocks2[i][2]+n<=blocks3.length-1&&(blocks3[blocks2[i][2]+n][1]==TAB||blocks3[blocks2[i][2]+n][1]==NEWLINE)) n++;
                        delete blocks3;
                        block2=cssBlock.getBlock()[blocks2[i][2]+n];
                        block2[0]=block2[0].replace(/^[\t ]*?([^\t ])/,"$1");
                        cssBlock.setBlock(blocks2[i][2]+n,block2);
                    }
                }
            }
            if(!InputOption.option||InputOption["needlessSemi"]){
                var blocks2=cssBlock.selector(RIGHT_CURLY_BRACKET);
                for(var i=0,j=blocks2.length;i<j;i++) {
                    var blocks3=cssBlock.getBlock();
                    var n=1;
                    while(blocks3.length-1>=blocks2[i][2]-n&&(blocks3[blocks2[i][2]-n][1]==TAB||blocks3[blocks2[i][2]-n][1]==NEWLINE)) n++;
                    delete blocks3;
                    var block2=cssBlock.getBlock()[blocks2[i][2]-n]; /// "左波括弧(終わりの方)"の前
                    block2[0]=block2[0].replace(/[\t ]*;[\t ]*$/, "");//不要なセミコロン
                    cssBlock.setBlock(blocks2[i][2]-n,block2); //コロンの後のもののスペースを消す
                }
            }
            if(!InputOption.option||InputOption["important"]) cssBlock.selector(BLOCKS).replace(/[\t ]*(?:!important)[\t ]*/g, "!important"); //!important周辺のスペース
            if (InputOption.color_name) Compressors.optimizeColorName(b);//カラーネームの最適化
            if (InputOption.padding && -1 !== b.indexOf("padding")) Compressors.optimizePadding(b); //パディング最適化
            if (InputOption.margin && -1 !== b.indexOf("margin")) Compressors.optimizeMargin(b); //マージン最適化
            if (InputOption.color) cssBlock.selector(BLOCKS).replace(/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, "#$1$2$3"); //カラーを6桁から3桁へ
            if (InputOption.lower) Compressors.colorCodeToLowerCase(b);//カラーコードを小文字にする
            if (InputOption.none) Compressors.noneToZero(b);//noneを0に変換する
            showResult(cssBlock.joinBlock(),beforeSize);
    }
};
})();
