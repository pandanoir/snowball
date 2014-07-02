"use strict";
(function (window, $) {
    $(function () {
        //ドラッグ&ドロップ用設定
        $("body").on("dragover", function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        Array.prototype.has=function(key){
            var start=0,end=this.length-1,mid;
            if(this[this.length-1]<key) return false;
            while(start<=end){
                mid=0|(start+end)/2;
                if(this[mid]>key) end=mid-1;
                if(this[mid]<key) start=mid+1;
                if(this[mid]==key) return true;
            }
            return false;
        }
        //変数の宣言とか
        var $rform = $("#rform"),$lform = $("#lform"),$compress = $lform.find("#compress"),$options = $rform.find("#options"),$input = $options.find("input"),$select = $options.find("select"),$menu = $options.find("#option_menu"),$option = $options.find("#option"),$option_all = $menu.find("#option_all"),$results = $rform.find("#results"),$aft = $lform.find("#aft"),$bef = $lform.find("#bef");
        var document=window.document,
            $json = JSON,
            toggle = true,
            $befB = $results.find("#befB"),
            $aftB = $results.find("#aftB"),
            $minus = $results.find("#minus"),
            $mes = $lform.find("#mes"),
            InputOption,SelectOption,i,j,$custom,$customWid,$menuWid,css=cssBlock;
        var setCookie=function(prop,expiredays){
            var path = location.pathname,paths = path.split("/");
            if(paths[paths.length-1] != ""){
                paths[paths.length-1] = "";
                path = paths.join("/");
            }
            var extime = new Date().getTime(),cltime = new Date(extime + (60*60*24*1000*expiredays)),exdate = cltime.toUTCString();
            var s="";
            for(var c_name in prop){
                value=prop[c_name]
                    s += c_name +"="+ escape(value)+";";
            }
            s += "path="+ path+";";
            if(expiredays) s += "expires=" +exdate+";";
            document.cookie=s;
        },
            getCookie=function(c_name){
                var st="";
                var ed="";
                if(document.cookie.length>0){
                    st=document.cookie.indexOf(c_name + "=");
                    if(st!=-1){
                        st=st+c_name.length+1;
                        ed=document.cookie.indexOf(";",st);
                        if(ed==-1) ed=document.cookie.length;
                        return unescape(document.cookie.substring(st,ed));
                    }
                }
                return false;
            };
        //クッキーから設定の読み込み
        if ($json.parse(getCookie("input_option")) !== false) {
            //クッキーから設定が読み込めた
            //オプション設定の読み込み
            InputOption = $json.parse(getCookie("input_option"));
            SelectOption = $json.parse(getCookie("select_option"));
            for (i = 0, j = $input.length; i < j; i += 1) {
                $input.eq(i).attr("checked", !!InputOption[$input.eq(i).attr("id")]);
            }
            for (i = 0, j = $select.length; i < j; i += 1) {
                SelectOption[$select.eq(i).attr("id")]&&$select.eq(i).val(SelectOption[$select.eq(i).attr("id")]);
            }
        } else {
            //読み込めなかったから新規で設定作成
            InputOption = {};
            SelectOption = {};
            for (i = 0, j = $input.length; i < j; i += 1) {
                InputOption[$input.eq(i).attr("id")] = !!$input.eq(i).attr("checked");
            }
            for (i = 0, j = $select.length; i < j; i += 1) {
                SelectOption[$select.eq(i).attr("id")] = $select.eq(i).find("option:selected").val();
            }
        }
        if ($option.attr("checked")) {
            $menu.show();
        } else {
            $options.css("border-left", "3px solid #CCC");
        }
        $rform.css3form();
        $custom = $menu.find("div.customCheckBox").find("a");
        $customWid = $custom.css("width");
        $menuWid = $menu.css("width");
        $options.finda=function(id){
            return $options.find("a").eq(id.index("input[type='checkbox']"));
        }
        if(!!$("#HackMode").attr("checked")==true){
            $options.finda($("#padding").attr("disabled",true)).addClass("Hack");
            $options.finda($("#margin").attr("disabled",true)).addClass("Hack");
        }else{
            $options.finda($("#padding").attr("disabled",false)).removeClass("Hack");
            $options.finda($("#margin").attr("disabled",false)).removeClass("Hack");
        }//CSSハックモードの処理。onならpaddingとmarginを無効化
        //圧縮用メイン関数
        var compress=(function () {
            //変数宣言
            var cb=function(g) {
                var c = 0, d = 0, b = g.length;
                while (d < b) {
                    c += 4 > escape(g.charAt(d)).length ? 1 : 2;
                    d += 1;
                }
                return c;
            },
            m = Math,
            //一部圧縮用正規表現
            InputPartOption = {
                "indent": [/^[\t ]*/gm, ""], //インデント
            "line": [/[\r\n]/g, ""], //改行
            "comma": [/[\t ]*,[\t ]*/g, ","], //コンマ周辺のスペース
            "colon": [/[\t ]*:[\t ]*/g, ":"], //コロン周辺のスペース
            "semicolon": [/[\t ]*;[\t ]*$/g, ";"], //セミコロン周辺のスペース
            "needlessSemi":[/[\t ]*;[\t ]*([\r\n]*?[\t\r\n ]*?)$/, "$1"],//不要なセミコロン
            "sc_bracket": [/[\t ]*[\{][\t ]*/g, "{"], // "{" 周辺のスペース
            "important": [/[\t ]*(?:!important)[\t ]*/g, "!important"], //!important周辺のスペース
            "ec_bracket": [/([^\t ]+?)[\t ]*;[\t ]*\}[\t ]*/g, "$1}"] // "}" 周辺のスペース
            },
            InputZeroOption = {
                "zero": [/(\D)[0](?:em|px|%)/g, "$10"], //0pxなどの単位を削除
                "decimals": [/([\D])0\.(\d)/g, "$1.$2"] //0.nの0を削除
            },
            color = {aliceblue: "#f0f8ff",antiquewhite: "#faebd7",aquamarine: "#7fffd4",black: "#000",blanchedalmond: "#ffebcd",blueviolet: "#8a2be2",burlywood: "#deb887",cadetblue: "#5f9ea0",chartreuse: "#7fff00",chocolate: "#d2691e",cornflowerblue: "#6495ed",cornsilk: "#fff8dc",darkblue: "#00008b",darkcyan: "#008b8b",darkgoldenrod: "#b8860b",darkgray: "#a9a9a9",darkgreen: "#006400",darkkhaki: "#bdb76b",darkmagenta: "#8b008b",darkolivegreen: "#556b2f",darkorange: "#ff8c00",darkorchid: "#9932cc",darksalmon: "#e9967a",darkseagreen: "#8fbc8f",darkslateblue: "#483d8b",darkslategray: "#2f4f4f",darkturquoise: "#00ced1",darkviolet: "#9400d3",deeppink: "#ff1493",deepskyblue: "#00bfff",dodgerblue: "#1e90ff",firebrick: "#b22222",floralwhite: "#fffaf0",forestgreen: "#228b22",fuchsia: "#f0f",gainsboro: "#dcdcdc",ghostwhite: "#f8f8ff",goldenrod: "#daa520",greenyellow: "#adff2f",honeydew: "#f0fff0",indianred: "#cd5c5c",lavendar: "#e6e6fa",lavenderblush: "#fff0f5",lawngreen: "#7cfc00",lemonchiffon: "#fffacd",lightblue: "#add8e6",lightcoral: "#f08080",lightcyan: "#e0ffff",lightgoldenrodyellow: "#fafad2",lightgray: "#d3d3d3",lightgreen: "#90ee90",lightpink: "#ffb6c1",lightsalmon: "#ffa07a",lightseagreen: "#20b2aa",lightskyblue: "#87cefa",lightslategray: "#789",lightsteelblue: "#b0c4de",lightyellow: "#ffffe0",limegreen: "#32cd32",magenta: "#f0f",mediumaquamarine: "#66cdaa",mediumblue: "#0000cd",mediumorchid: "#ba55d3",mediumpurple: "#9370db",mediumseagreen: "#3cb371",mediumslateblue: "#7b68ee",mediumspringgreen: "#00fa9a",mediumturquoise: "#48d1cc",mediumvioletred: "#c71585",midnightblue: "#191970",mintcream: "#f5fffa",mistyrose: "#ffe4e1",moccasin: "#ffe4b5",navajowhite: "#ffdead",olivedrab: "#6b8e23",orangered: "#ff4500",palegoldenrod: "#eee8aa",palegreen: "#98fb98",paleturquoise: "#afeeee",palevioletred: "#db7093",papayawhite: "#ffefd5",peachpuff: "#ffdab9",powderblue: "#b0e0e6",rosybrown: "#bc8f8f",royalblue: "#4169e1",saddlebrown: "#8b4513",sandybrown: "#f4a460",seagreen: "#2e8b57",seashell: "#fff5ee",slateblue: "#6a5acd",slategray: "#708090",springgreen: "#00ff7f",steelblue: "#4682b4",turquoise: "#40e0d0",white: "#fff",whitesmoke: "#f5f5f5",yellow: "#ff0",yellowgreen: "#9acd32","#f0ffff": "azure","#f5f5dc": "beige","#ffe4c4": "bisque","#a52a2a": "brown","#ff7f50": "coral","#ffd700": "gold","#808080": "gray","#008000": "green","#4b0082": "indigo","#fffff0": "ivory","#f0e68c": "khaki","#faf0e6": "linen","#800000": "maroon","#000080": "navy","#808000": "olive","#ffa500": "orange","#da70d6": "orchid","#cd853f": "peru","#ffc0cb": "pink","#dda0dd": "plum","#800080": "purple","#ff0000": "red","#f00": "red","#fa8072": "salmon","#a0522d": "sienna","#c0c0c0": "silver","#fffafa": "snow","#d2b48c": "tan","#008080": "teal","#ff6347": "tomato","#ee82ee": "violet","#f5deb3": "wheat"},
            color_Reg={},
            InputPartOptionAll=(function(){
                var rep=[/[\r\n]/g, /[\t ]*([,:;\{]|!important)[\t ]*/g ,/[\t ]*;[\t ]*$/g ,/([^\t ]+?)[\t ]*$/g];
                return function(b,now){
                    return b.replace(now.string,now.string
                        .replace(now.properties, now.properties.replace(/^[\s]*/gm, ""))
                        .replace(rep[0],"")
                        .replace(rep[1], "$1")
                        .replace(rep[2], "")
                        .replace(rep[3], "$1")
                        );
                }
            })(),
            pattern=[/(padding(?:\-left|\-right|\-top|\-bottom)? ?: ?([^;$]+)([;$]?))/gim,/(margin(?:\-left|\-right|\-top|\-bottom)? ?: ?([^;$]+)([;$]?))/gim],
            makeShortReg=[[/(padding(?:\-left|\-right|\-top|\-bottom)? ?: ?([^;$]+)([;$]?)([\r\n]?))/gim,/(margin(?:\-left|\-right|\-top|\-bottom)? ?: ?([^;$]+)([;$]?)([\r\n]?))/gim],[/(padding[\s]?:[\s]?)([^;$]+?[;$])/gi,/(margin[\s]?:[\s]?)([^;$]+?[;$])/gi]],
            //makeshort=圧縮関数
            makeshort=function(str, pm) {
                var RegPM=pm=="padding"?0:1;
                css.init(str);
                var block = css.eq(),
                    beforeblock = css.eq();
                for (var bi = 0, bj = css.length; bi < bj; bi += 1) {
                    var before = css.eq(bi),
                        after = css.eq(bi),
                              paddings = after.properties.match(pattern[RegPM]);
                    if (paddings !== null) {
                        //置換後のプロパティの初期値
                        var aftP = {
                            top: null,
                            bottom: null,
                            right: null,
                            left: null,
                            ok:0
                        };
                        loop:for (var i = paddings.length-1; i >=0; i -= 1) {
                            //プロパティを後ろからたどる。すべてのaftPが決まり次第抜ける
                            paddings[i] = paddings[i].replace(pattern[RegPM], "$1:$2").split(":");
                            paddings[i][1] = paddings[i][1].replace(/;$/, "");
                            var property = paddings[i][0].toLowerCase();
                            if (property === pm) {
                                var a = paddings[i][1].replace(/;/g, "").split(" ");
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
                            } else{
                                if(property.indexOf(pm+"-")===0){
                                    var propD=property.split(pm+"-")[1];//プロパティの後ろ部分(padding-[ココ])
                                    if(propD==="top"||propD==="right"||propD==="bottom"||propD==="left"){
                                        if (aftP[propD]===null){
                                            aftP.ok++;
                                            aftP[propD] = paddings[i][1];
                                        }
                                    }
                                }
                            }
                            if(aftP.ok==4) break loop;
                        }
                             if (aftP.ok==4) {
                                 //すべてのプロパティに何らかの値が入っていてpaddingでまとめられる
                                 var resP;//result Property
                                 if(aftP.right==aftP.left){
                                     if(aftP.top==aftP.bottom){
                                         if(aftP.top==aftP.right) resP=aftP.top;//すべて同じ
                                         else resP=aftP.top+" "+aftP.right;//上下が同じ、左右が同じ
                                     }else resP=aftP.top + " " + aftP.right + " " + aftP.bottom;//上下は違うが左右は同じ
                                 }else resP=aftP.top + " " + aftP.right + " " + aftP.bottom + " " + aftP.left;//全部違う
                                 /*if(aftP.top === aftP.right && aftP.top === aftP.bottom && aftP.top === aftP.left){
                                   resP= aftP.top;//すべて同じとき
                                   }else{
                                   if(aftP.top === aftP.bottom && aftP.right === aftP.left && aftP.top !== aftP.right){
                                   resP= aftP.top + " " + aftP.right;//上下と左右がそれぞれ同じ
                                   }else{
                                   if(aftP.right === aftP.left && aftP.top !== aftP.bottom){
                                   resP=aftP.top + " " + aftP.right + " " + aftP.bottom;//上下は違うが左右は同じ
                                   }else{
                                   resP=aftP.top + " " + aftP.right + " " + aftP.bottom + " " + aftP.left;//全部違う
                                   }
                                   }
                                   }*/
                                 var jjj = after.properties.match(pattern[RegPM]),
                                     iii = 0;
                                 jjj = jjj !== null ? jjj.length : 0;
                                 after.properties = after.properties.replace(makeShortReg[0][RegPM], function (a, b, cc, d, endl) {
                                     iii += 1;
                                     if (iii === jjj) return pm + ":" + resP + (d || "") + endl;
                                     return "";
                                 });
                                 block[bi].change(block[bi].string.replace(before.properties, after.properties));
                             }
                    }
                }
                for (var i = 0; i < bj; i += 1) {
                    if (beforeblock[i].string !== block[i].string) str = str.replace(beforeblock[i].string, block[i].string);
                }
                return str.replace(makeShortReg[1][RegPM], function (a, property, value) {
                    var values = value.split(" "),
                       result = value;
                if (values.length === 2) {
                    //paddingもしくはmarginの値が2つ
                    if (values[0] === values[1]) result = values[0];
                } else if (values.length === 3) {
                    //paddingもしくはmarginの値が3つ
                    if (values[0] === values[2]) {
                        if (values[0] === values[1]) result = values[0];
                        else result = values[0] + " " + values[1];
                    }
                } else if (values.length === 4) {
                    //paddingもしくはmarginの値が4つ
                    if (values[1] === values[3]) {
                        //rightとleftが同じ
                        if (values[0] === values[2]) {
                            //topとbottomが同じ
                            if (values[0] !== values[1]) result = values[0] + " " + values[1];//topとrightが違う
                            else result=values[0];
                        } else result = values[0] + " " + values[1] + " " + values[2];//rightとleftが同じだがtopとbottomが違う
                    }
                }
                return property + result;
                });
            };
        return function(event){
            //compressの本体
            var b = $bef.val(),
                beforeSize = cb(b);
            css.init(b);
            event.preventDefault();
            event.stopPropagation();
            for (var i = 0, j = $input.length; i < j; i += 1) {
                InputOption[$input.eq(i).attr("id")] = $input.eq(i).attr("checked")&&!$input.eq(i).is(":disabled");
            }
            css.init(b);
            if (InputOption["comment"]) b = b.replace(/(\/\*([\s]|.)+?\*\/)/g, ""); //コメントの削除
            $.each(InputZeroOption, function (Chara, replaces) {
                if (InputOption[Chara]) {
                    b=css.replace(b,replaces[0], replaces[1]); //0pxなどの単位を削除
                }
            });
            if (!InputOption.option) {
                //一部だけ圧縮するがOFF=全部削除
                css.init(b);
                for (var i = 0, j = css.length; i < j; i += 1) {
                    b = InputPartOptionAll(b,css.eq(i));
                }
                b=b.replace(/^[\t ]*/gm, "").replace(/[\r\n]/g, "").replace(/[\t ]*([,:;\{]|!important)[\t ]*/g, "$1").replace(/[\t ]*;[\t ]*\}[\t\d]*/g, "}").replace(/([^\t ]+?)[\t ]*\}[\t ]*/g, "$1}");//上からインデント、改行、いらないスペース、いらないセミコロン、いらない}前後の空白の削除
        } else {
            $.each(InputPartOption, function (Chara, replaces) {
                if (InputOption[Chara]){
                    b=css.replace(b,replaces[0], replaces[1]);
                    if(Chara!=="needlessSemi")b=b.replace(replaces[0], replaces[1]);
                    else b=b.replace(/[\t ]*;[\t ]*\}[\t\d]*/g, "}");
                }
            });
        }
        if (InputOption.color_name) {
            //カラーネームの最適化
            for (var h in color){
                if (-1 !== b.toLowerCase().indexOf(h)){
                    color_Reg[h]||(color_Reg[h]=new RegExp("([: ,\)\(]|[\t ]?:[\t ]?)([^;\{\}]*?)" + h + "((?:!important)|[, )(;}\n\r]|$)", "gim"));
                    b=css.replace(b,color_Reg[h], "$1$2" + color[h] + "$3");
                }
            }
        }
        if (InputOption.padding&&-1 !== b.indexOf("padding")) b = makeshort(b, "padding"); //パディング最適化
        if (InputOption.margin&&-1 !== b.indexOf("margin")) b = makeshort(b, "margin"); //マージン最適化
        if (InputOption.color) b=css.replace(b,/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, "#$1$2$3"); //カラーを6桁から3桁へ
        if (InputOption.lower) {
            //カラーコードを小文字にする
            b=css.replace(b,/([: ,)(]|[\t ]?:[\t ]?)(#[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?)/g, function (all, prop, one) {
                return prop + (one.toLowerCase()) //カラーを小文字か大文字に
            });
        }
        if (InputOption.none) {
            //noneを0に変換する
            b=css.replace(b,/(.+?):(.+?(?:;|$))/g,function(all,prop,val){
                if(prop.indexOf("background-image")!=-1) return all;
                if(prop.indexOf("border")!=-1||prop.indexOf("background")!=-1||prop.indexOf("outline")!=-1){
                    return all.replace(val,val.replace(/none/g,"0"));
                }
                return all;
            });
        }
        var afterSize = cb(b);
        $aft.val(b).select();//Afterに結果を表示
        $aft.parent().addClass("large").removeClass("hide");
        $bef.parent().addClass("small");
        var offSize=beforeSize-afterSize;//削除したサイズ
        if (1024 > beforeSize) {
            $befB.text(beforeSize + " B");
            $aftB.text(afterSize + " B");
            $minus.text(beforeSize === afterSize ? "±0B(0%)" : "-" + offSize + " B(" + (100 - afterSize/ beforeSize*100).toFixed(2) + "%)");
        } else {
            $befB.text((0|beforeSize / 1024) + " KB(" + beforeSize + " B)");
            $aftB.text((0|afterSize / 1024) + " KB(" + afterSize + " B)");
            $minus.text(beforeSize === afterSize ? "±0B(0%)" : "-" +(0|offSize / 1024) + " KB(" + offSize+ " B)(" + (100 - afterSize / beforeSize*100).toFixed(2) + "%)");
        }
        $mes.stop(true, false).addClass("on").css("opacity", "1").fadeTo(1500, 0.3, function () {
            $(this).removeClass("on");
        });
        }
    })();
    $("#HackMode").on("click",function(){
        if(!$("#HackMode").attr("checked")==true){
            $options.finda($("#padding").attr("disabled",true)).addClass("Hack");
            $options.finda($("#margin").attr("disabled",true)).addClass("Hack");
        }else{
            $options.finda($("#padding").attr("disabled",false)).removeClass("Hack");
            $options.finda($("#margin").attr("disabled",false)).removeClass("Hack");
        }
    });
    $lform.find(".select , .reset").on("click", function (event) {
        //リセットボタンとセレクトボタンを押した時に選択状態にする
        $(this).siblings("textarea").select();
    }).end().find("#bef").select();
    $compress.on("click", compress);//圧縮ボタンが押された時
    $bef.on("focus",function(){
        if($bef.parent().hasClass("small")){
            $bef.parent().removeClass("small large").addClass("large");
            $aft.parent().removeClass("large small").addClass("small");
        }
    });
    $aft.on("focus",function(){
        if($bef.parent().hasClass("large")){
            $bef.parent().removeClass("small large").addClass("small");
            $aft.parent().removeClass("large small").addClass("large");
        }
    });
    //ドラッグ&ドロップ
    if (window.File) {
        $bef.on("dragenter", function (event) {
            event.preventDefault();
            event.stopPropagation();
        }).on("dragover", function (event) {
            event.originalEvent.dataTransfer.dropEffect = "copy";
            event.preventDefault();
            event.stopPropagation();
        }).on("drop", function (event) {
            //ドラッグアンドドロップ
            event.preventDefault();
            event.stopPropagation();
            event = event.originalEvent;
            var files = event.dataTransfer.files;
            SelectOption.encode = $select.filter("#encode").find("option:selected").val();
            for (i = 0, j = files.length; i < j; i += 1) {
                var reader = new FileReader(),
            f = files[i];
        reader.readAsText(f, SelectOption.encode);
        reader.onload = $.proxy(function () {
            $(this).val(reader.result);
            $compress.trigger("click");
        }, this);
            }
        });
    } else {
        $bef.attr("placeholder", "ここにコードをペーストしてください。どうやらお使いのブラウザではドラッグアンドドロップは対応していないようです。");
    }
    //ショートカットの設定
    $(window).on("keydown", function (e) {
        //テスト用ショートカット
        if(e.keyCode === 68 && e.shiftKey && (e.ctrlKey&&!e.metaKey||!e.ctrlKey&&e.metaKey) && e.altKey){
            e.preventDefault();
            var $customA=$options.find(".customCheckBox").find("a");
            $("body").addClass("debug");
            for(var i=0,j=$customA.length;i<j;i+=1){
                $customA.eq(i).hasClass("checked")&&$customA.eq(i).trigger("click");
            }
            $customA.eq($("#option").index("input[type='checkbox']")).trigger("click");
            $bef.val(".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}");
            return false;
        }
        if (!(e.ctrlKery && !e.metaKey || !e.ctrlKey && e.metaKey)) return;
        //以下の全てでctrlを使うから
        if (e.keyCode === 13) $compress.trigger("click") //Ctrl+Enterで圧縮
        else if (e.altKey && (e.keyCode === 80 || e.keyCode === 83)) {
            event.preventDefault();
            event.stopPropagation();
            $compress.trigger("click");
            if (e.keyCode === 80) $aft.val($aft.val().replace(/(http:\/\/)/g, "//")); //http://を省略
            else $aft.val($aft.val().replace(/(https:\/\/)/g, "//")); //https://を省略
            return false;
        }
    });
    //「一部だけ圧縮する」を押した際の挙動。
    $option.on("click", function (e) {
        //ここでのメニューは一部圧縮時メニューのこと
        if ($custom.is(":animated") || $menu.is(":animated")) return;
        else if ($option.attr("checked")) {
            //メニューが表示されていたら非表示にする
            $menu.hide();
            $options.css("border-left", "3px solid #CCC");
            $custom.show().css("width", $customWid);
        } else {
            //メニューが非表示だったら表示する
            $menu.show();
            $options.css("border-left", "none");
        }
    });
    //Allボタンの挙動
    $option_all.on("click", function (e) {
        if (!$custom.is(":visible")) return;
        toggle = !toggle;
        for (i = 0, j = $custom.length; i < j; i += 1) if (toggle&&!$custom.eq(i).hasClass("checked")||!toggle&&$custom.eq(i).hasClass("checked")) $custom.eq(i).click();
    });
    //オプション設定の保存
    $("#save").on("click", function (event) {
        InputOption={};
        SelectOption={};
        for (i = 0, j = $input.length; i < j; i += 1) InputOption[$input.eq(i).attr("id")] = !!$input.eq(i).attr("checked");
        for (i = 0, j = $select.length; i < j; i += 1) SelectOption[$select.eq(i).attr("id")] = $select.eq(i).find("option:selected").val();
        setCookie({"input_option":$json.stringify(InputOption),"select_option":$json.stringify(SelectOption)},7);
    });
    //設定ボタンの挙動
    $("#wrench").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $options.toggle();
        $results.toggle();
    });
});
}(this, jQuery));
