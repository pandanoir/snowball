"use strict";
/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */
(function(a){var b=a({});a.subscribe=function(){b.on.apply(b,arguments)},a.unsubscribe=function(){b.off.apply(b,arguments)},a.publish=function(){b.trigger.apply(b,arguments)}})(jQuery);
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
        var $rform = $("#rform"),$lform = $("#lform"),$compress = $("#compress"),$options = $("#options"),$input = $("input"),$select = $("select"),$menu = $("#option_menu"),$option = $("#option"),$option_all = $("#option_all");
        var document=window.document,
            toggle = true,
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
        if (JSON.parse(getCookie("input_option")) !== false) {
            //クッキーから設定が読み込めた
            //オプション設定の読み込み
            InputOption = JSON.parse(getCookie("input_option"));
            SelectOption = JSON.parse(getCookie("select_option"));
            for (i = 0, j = $input.length; i < j; i += 1) 
                $input.eq(i).attr("checked", !!InputOption[$input.eq(i).attr("id")]);
            for (i = 0, j = $select.length; i < j; i += 1) 
                SelectOption[$select.eq(i).attr("id")]&&$select.eq(i).val(SelectOption[$select.eq(i).attr("id")]);
        } else {
            //読み込めなかったから新規で設定作成
            InputOption = {};
            SelectOption = {};
            for (i = 0, j = $input.length; i < j; i += 1) 
                InputOption[$input.eq(i).attr("id")] = !!$input.eq(i).attr("checked");
            for (i = 0, j = $select.length; i < j; i += 1) 
                SelectOption[$select.eq(i).attr("id")] = $select.eq(i).find("option:selected").val();
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
        $compress.on("click",function(event){
            event.preventDefault();
            event.stopPropagation();
            for (var i = 0, j = $input.length; i < j; i += 1) {
                InputOption[$input.eq(i).attr("id")] = $input.eq(i).attr("checked")&&!$input.eq(i).is(":disabled");
            }
            Compressors.compress(InputOption);
        });//圧縮ボタンが押された時
        $('#bef,#aft').on("focus",function(){
            var id=$(this).attr('id');
            if($(this).parent().hasClass("small")){
                $(this).parent().removeClass("large small").addClass("large");
                $(id=="bef"?'#aft':'#bef').parent().removeClass("large small").addClass("small");
            }
        });
        //ドラッグ&ドロップ
        if (window.File) {
            $('#bef').on("dragenter", function (event) {
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
                    var reader = new FileReader(),f = files[i];
                    reader.readAsText(f, SelectOption.encode);
                    reader.onload = $.proxy(function () {
                        $(this).val(reader.result);
                        $compress.trigger("click");
                    }, this);
                }
            });
        } else {
            $('#bef').attr("placeholder", "ここにコードをペーストしてください。どうやらお使いのブラウザではドラッグアンドドロップは対応していないようです。");
        }
        //ショートカットの設定
        $(window).on("keydown", function (e) {
            //テスト用ショートカット
            if(e.keyCode === 68 && e.shiftKey && (e.ctrlKey&&!e.metaKey||!e.ctrlKey&&e.metaKey) && e.altKey){
                e.preventDefault();
                $.publish('debug-start');
                return false;
            }
            if (!(e.ctrlKery && !e.metaKey || !e.ctrlKey && e.metaKey)) return;
            //以下の全てでctrlを使うから
            if (e.keyCode === 13) $compress.trigger("click"); //Ctrl+Enterで圧縮
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
            setCookie({"input_option":JSON.stringify(InputOption),"select_option":JSON.stringify(SelectOption)},7);
        });
        //設定ボタンの挙動
        $("#wrench").on("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            $options.toggle();
            $('#results').toggle();
        });

        $.subscribe('debug-start',function(){
            var $customA=$options.find(".customCheckBox").find("a");
            $("body").addClass("debug");
            /*for(var i=0,j=$customA.length;i<j;i+=1){
              $customA.eq(i).hasClass("checked")&&$customA.eq(i).trigger("click");
              }
              $customA.eq($("#option").index("input[type='checkbox']")).trigger("click");*/
            $('#bef').val(".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}");
            $('#compress').trigger('click');
            setTimeout(function(){
                console.log($('#aft').val()=='.white-space{white-space:nowrap;background:#fff!important;color:#fff!important;margin:3px 3px 5px}@media screen and (max-device-width:480px){.black,.button{background:none;background-image:none;color:#000;margin:0;opacity:.9;padding:3px}}',
                    '.white-space{white-space:nowrap;background:#fff!important;color:#fff!important;margin:3px 3px 5px}@media screen and (max-device-width:480px){.black,.button{background:none;background-image:none;color:#000;margin:0;opacity:.9;padding:3px}}',
                    '\n\n',
                    $('#aft').val());
            },10);
        });
    });
}(this, jQuery));
