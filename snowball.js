"use strict";
/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */
(function(a){var b=a({});a.subscribe=function(){b.on.apply(b,arguments)},a.unsubscribe=function(){b.off.apply(b,arguments)},a.publish=function(){b.trigger.apply(b,arguments)}})(jQuery);
(function (window, $) {
    $(function () {
        //ドラッグ&ドロップ用設定
        $('body').on('dragover', function (event) {
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
        var $rform = $('#rform'),$lform = $('#lform'),$compress = $('#compress'),$options = $('#options'),$menu = $('#option_menu'),$option = $('#option'),$option_all = $('#option_all');
        var document=window.document,
            toggle = true,
            InputOption,SelectOption,i,j,$custom,$customWid,$menuWid;
        //クッキーから設定の読み込み
        if ($.cookie('input_option')&&$.cookie('select_option')) {
            //クッキーから設定が読み込めた
            //オプション設定の読み込み
            InputOption = JSON.parse($.cookie('input_option'));
            SelectOption = JSON.parse($.cookie('select_option'));
            for (i = 0, j = $('input').length; i < j; i += 1) 
                $('input').eq(i).prop('checked', !!InputOption[$('input').eq(i).attr('id')]);
            for (i = 0, j = $('select').length; i < j; i += 1) 
                if(SelectOption[$('select').eq(i).attr('id')])
                    $('select').eq(i).val(SelectOption[$('select').eq(i).attr('id')]);
        } else {
            //読み込めなかったから新規で設定作成
            InputOption = {};
            SelectOption = {};
            for (i = 0, j = $('input').length; i < j; i += 1) 
                InputOption[$('input').eq(i).attr('id')] = !!$('input').eq(i).prop('checked');
            for (i = 0, j = $('select').length; i < j; i += 1) 
                SelectOption[$('select').eq(i).attr('id')] = $('select').eq(i).find('option:selected').val();
        }
        if ($option.prop('checked')) {
            $menu.show();
        } else {
            $options.css('border-left', '3px solid #CCC');
        }
        $rform.css3form();
        $custom = $menu.find('div.customCheckBox').find('a');
        $customWid = $custom.css('width');
        $menuWid = $menu.css('width');
        $options.finda=function(id){
            return $options.find('a').eq(id.index('input[type=\'checkbox\']'));
        }
        if(!!$('#HackMode').prop('checked')==true){
            $options.finda($('#padding').attr('disabled',true)).addClass('Hack');
            $options.finda($('#margin').attr('disabled',true)).addClass('Hack');
        }else{
            $options.finda($('#padding').attr('disabled',false)).removeClass('Hack');
            $options.finda($('#margin').attr('disabled',false)).removeClass('Hack');
        }//CSSハックモードの処理。onならpaddingとmarginを無効化
        //圧縮用メイン関数
        $('#HackMode').on('click',function(){
            if(!$('#HackMode').prop('checked')==true){
                $options.finda($('#padding').attr('disabled',true)).addClass('Hack');
                $options.finda($('#margin').attr('disabled',true)).addClass('Hack');
            }else{
                $options.finda($('#padding').attr('disabled',false)).removeClass('Hack');
                $options.finda($('#margin').attr('disabled',false)).removeClass('Hack');
            }
        });
        $lform.find('.select , .reset').on('click', function (event) {
            //リセットボタンとセレクトボタンを押した時に選択状態にする
            $(this).siblings('textarea').select();
        }).end().find('#bef').select();
        $compress.on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            for (var i = 0, j = $('input').length; i < j; i += 1) {
                InputOption[$('input').eq(i).attr('id')] = $('input').eq(i).prop('checked')&&!$('input').eq(i).is(':disabled');
            }
            var beforeSize = cb($('#bef').val());
            var css=Compressors.compress(InputOption,$('#bef').val());
            showResult(css.joinBlock(),beforeSize);
        });//圧縮ボタンが押された時
        $('#bef,#aft').on('focus',function(){
            var id=$(this).attr('id');
            if($(this).parent().hasClass('small')){
                $(this).parent().removeClass('large small').addClass('large');
                $(id=='bef'?'#aft':'#bef').parent().removeClass('large small').addClass('small');
            }
        });
        //ドラッグ&ドロップ
        if (window.File) {
            $('#bef').on('dragenter', function (event) {
                event.preventDefault();
                event.stopPropagation();
            }).on('dragover', function (event) {
                event.originalEvent.dataTransfer.dropEffect = 'copy';
                event.preventDefault();
                event.stopPropagation();
            }).on('drop', function (event) {
                //ドラッグアンドドロップ
                event.preventDefault();
                event.stopPropagation();
                event = event.originalEvent;
                var files = event.dataTransfer.files;
                SelectOption.encode = $('select').filter('#encode').find('option:selected').val();
                for (i = 0, j = files.length; i < j; i += 1) {
                    var reader = new FileReader(),f = files[i];
                    reader.readAsText(f, SelectOption.encode);
                    reader.onload = $.proxy(function () {
                        $(this).val(reader.result);
                        $compress.trigger('click');
                    }, this);
                }
            });
        } else {
            $('#bef').attr('placeholder', 'ここにコードをペーストしてください。どうやらお使いのブラウザではドラッグアンドドロップは対応していないようです。');
        }
        //ショートカットの設定
        $(window).on('keydown', function (e) {
            //テスト用ショートカット
            if(e.keyCode === 68 && e.shiftKey && (e.ctrlKey&&!e.metaKey||!e.ctrlKey&&e.metaKey) && e.altKey){
                e.preventDefault();
                $.publish('debug-start');
                return false;
            }
            if (!(e.ctrlKery && !e.metaKey || !e.ctrlKey && e.metaKey)) return;
            //以下の全てでctrlを使うから
            if (e.keyCode === 13) $compress.trigger('click'); //Ctrl+Enterで圧縮
        });
        //「一部だけ圧縮する」を押した際の挙動。
        $option.on('click', function (e) {
            //ここでのメニューは一部圧縮時メニューのこと
            if ($custom.is(':animated') || $menu.is(':animated')) return;
            else if ($option.prop('checked')) {
                //メニューが表示されていたら非表示にする
                $menu.hide();
                $options.css('border-left', '3px solid #CCC');
                $custom.show().css('width', $customWid);
            } else {
                //メニューが非表示だったら表示する
                $menu.show();
                $options.css('border-left', 'none');
            }
        });
        //Allボタンの挙動
        $option_all.on('click', function (e) {
            if (!$custom.is(':visible')) return;
            toggle = !toggle;
            for (i = 0, j = $custom.length; i < j; i += 1) if (toggle&&!$custom.eq(i).hasClass('checked')||!toggle&&$custom.eq(i).hasClass('checked')) $custom.eq(i).click();
        });
        //オプション設定の保存
        $('#save').on('click', function (event) {
            InputOption={};
            SelectOption={};
            for (var i=0,j=$('input').length;i<j;i++) InputOption[$('input').eq(i).attr('id')] = !!$('input').eq(i).prop('checked');
            for (var i=0,j=$('select').length;i<j;i++) SelectOption[$('select').eq(i).attr('id')] = $('select').eq(i).val();
            $.removeCookie('input_option');
            $.removeCookie('select_option');
            $.cookie('input_option',JSON.stringify(InputOption),{'expires':7});
            $.cookie('select_option',JSON.stringify(SelectOption),{'expires':7});
        });
        //設定ボタンの挙動
        $('#wrench').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $options.toggle();
            $('#results').toggle();
        });
        $('#compare').on('click',function(){
            event.preventDefault();
            event.stopPropagation();
            $('<form>').attr({'method':'POST','action':'http://difff.jp','target':'_blank'})
            .append($('<textarea>').val($('#bef').val()).attr('name','sequenceA'))
            .append($('<textarea>').val($('#aft').val()).attr('name','sequenceB')).submit();
        });

        $.subscribe('debug-start',function(){
            var $customA=$options.find('.customCheckBox').find('a');
            $('body').addClass('debug');
            /*for(var i=0,j=$customA.length;i<j;i+=1){
              $customA.eq(i).hasClass('checked')&&$customA.eq(i).trigger('click');
              }
              $customA.eq($('#option').index('input[type=\'checkbox\']')).trigger('click');*/
            var testCodes=['.white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}','.white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\npadding:10px;\npadding-left:30px;\npadding-right:30px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}','/* new clearfix */\n.clearfix:after {\n\tvisibility: hidden;\n\tdisplay: block;\n\tfont-size: 0;\n\tcontent: " ";\n\tclear: both;\n\theight: 0;\n\t}\n* html .clearfix             { zoom: 1; } /* IE6 */\n*:first-child+html .clearfix { zoom: 1; } /* IE7 */\n        '];
            var expectedCodes=['.white-space{white-space:nowrap;background:#fff!important;color:#fff!important;margin:3px 3px 5px}@media screen and (max-device-width:480px){.black,.button{background:none;background-image:none;color:#000;margin:0;opacity:.9;padding:3px}}','.white-space{white-space:nowrap;background:#fff!important;color:#fff!important;margin:3px 3px 5px;padding:10px 30px}@media screen and (max-device-width:480px){.black,.button{background:none;background-image:none;color:#000;margin:0;opacity:.9;padding:3px}}','.clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}* html .clearfix{zoom:1}*:first-child+html .clearfix{zoom:1}'];
            $('#bef').val(testCodes[0]);

            $('#compress').trigger('click');
            setTimeout(function(){
                console.log($('#aft').val()==expectedCodes[0]);
                $('#bef').val(testCodes[1]);
                $('#compress').trigger('click');
                setTimeout(function(){
                    console.log($('#aft').val()==expectedCodes[1]);
                    $('#bef').val(testCodes[2]);
                    $('#compress').trigger('click');
                    setTimeout(function(){
                        console.log($('#aft').val()==expectedCodes[2]);
                    },3);
                },3);
            },10);
        });



        $('#bef').val();



        $('#body').children().css('display','block');
        if(location.href.split('?').slice(1).length>0){
            if(location.href.split('?').slice(1)[0]==='debug'){
                $.publish('debug-start');
                $('#save').trigger('click');
            }
        }
    });
    function showResult(str,beforeSize){
        var afterSize = cb(str);
        $('#aft').val(str).select();//Afterに結果を表示
        $('#aft').parent().addClass('large').removeClass('hide');
        $('#bef').parent().addClass('small');
        var offSize=beforeSize-afterSize;//削除したサイズ
        if (1024 > beforeSize) {
            $('#befB').text(beforeSize + ' B');
            $('#aftB').text(afterSize + ' B');
            $('#minus').text(beforeSize === afterSize ? '±0B(0%)' : '-' + offSize + ' B(' + (100 - afterSize/ beforeSize*100).toFixed(2) + '%)');
        } else {
            $('#befB').text((0|beforeSize / 1024) + ' KB(' + beforeSize + ' B)');
            $('#aftB').text((0|afterSize / 1024) + ' KB(' + afterSize + ' B)');
            $('#minus').text(beforeSize === afterSize ? '±0B(0%)' : '-' +(0|offSize / 1024) + ' KB(' + offSize+ ' B)(' + (100 - afterSize / beforeSize*100).toFixed(2) + '%)');
        }
        $('#mes').stop(true, false).addClass('on').css('opacity', '1').fadeTo(1500, 0.3, function () {
            $(this).removeClass('on');
        });
    }
    function cb(g) {
        var c = 0, d = 0, b = g.length;
        while (d < b) {
            c += 4 > escape(g.charAt(d)).length ? 1 : 2;
            d += 1;
        }
        return c;
    }
}(this, jQuery));
