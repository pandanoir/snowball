(function(window){
    if(window.cssBlock){
        var _cssBlock=window.cssBlock;
    }
    var cssBlock=window.cssBlock = (function () {
        var OTHERS=0,BLOCKS=1,LEFT_CURLY_BRACKET=2,RIGHT_CURLY_BRACKET=3,NEWLINE=4,TAB=5,COMMENTS=6,STRING=7,PROPERTY=8,COLON=9;
        var that = {},blocks = [];
        function push(block,type) {
            if(block!==""){
                blocks.push([block,type]);
            }
        };
        function eq(num) {
            var result, key,i,j;
            if (typeof num === "number") {
                result = {};
                for (key in blocks[num]) {
                    if (blocks[num].hasOwnProperty(key)) {
                        result[key] = blocks[num][key];
                    }
                }
            } else {
                result = [];
                for (i = 0, j = blocks.length; i < j; i += 1) {
                    result[i] = {};
                    for (key in blocks[i]) {
                        if (blocks[i].hasOwnProperty(key)) {
                            result[i][key] = blocks[i][key];
                        }
                    }
                }
            }
            return result;
        };
        function init(str) {
            var i,j;
            blocks = [];
            var inComment=false,inString=false,isBeforeCharaSlash=false,isBeforeCharaAsterisk=false;
            var before=0;
            var indent=0;
            that.original=str;
            for(var i=0,j=str.length;i<j;i++){
                var nowChar=str.charAt(i);
                if(nowChar=="\\"){
                    //エスケープシーケンス
                    continue;
                }
                if(!inString){
                    //文字列の外
                    if(nowChar=="\""){
                        if(indent>0) push(str.substring(before,i),BLOCKS);
                        if(indent==0) push(str.substring(before,i),OTHERS);
                        before=i;//'"'をSTRINGブロックは含むから
                        inString=true;//前が/で、今が*となってて/*になるからコメントがここから開始
                    }
                }else{
                    //文字列の中
                    if(nowChar=="\""){
                        inString=false;
                        push(str.substring(before,i+1),STRING);
                        before=i+1;
                    }
                }
                if(!inComment){
                    //コメント外
                    if(nowChar=="/"){
                        isBeforeCharaSlash=true;
                    }
                    if(nowChar=="*"&&isBeforeCharaSlash){
                        if(indent>0) push(str.substring(before,i-1),BLOCKS);
                        if(indent==0) push(str.substring(before,i-1),OTHERS);
                        before=i-1;//'/*'をCOMMENTSブロックは含むから
                        inComment=true;//前が/で、今が*となってて/*になるからコメントがここから開始
                    }
                    if(nowChar!="/") isBeforeCharaSlash=false;
                }else{
                    //コメント内
                    if(nowChar=="*"){
                        isBeforeCharaAsterisk=true;
                    }
                    if(nowChar=="/"&&isBeforeCharaAsterisk){
                        inComment=false;
                        push(str.substring(before,i+1),COMMENTS);
                        before=i+1;
                    }
                    if(nowChar!="*") isBeforeCharaAsterisk=false;
                }
                if(!inComment&&!inString){
                    //コメントの中でも文字列の中でもない
                    if(nowChar=="\n"){
                        if(indent>0) push(str.substring(before,i),BLOCKS);
                        push("\n",NEWLINE);
                        before=i+1;
                        continue;
                    }
                    if(nowChar=="\t"){
                        if(indent>0) push(str.substring(before,i),BLOCKS);
                        push("\t",TAB);
                        before=i+1;
                        continue;
                    }
                    if(nowChar=="{"){
                        indent++;
                        push(str.substring(before,i),OTHERS);
                        push('{',LEFT_CURLY_BRACKET);
                        before=i+1;
                    }
                    if(nowChar=="}"){
                        indent--;
                        push(str.substring(before,i),BLOCKS);
                        push('}',RIGHT_CURLY_BRACKET);
                        before=i+1;
                    }
                    if(nowChar==":"){
                        push(str.substring(before,i),PROPERTY);
                        push(':',COLON);
                        before=i+1;
                    }
                }
            }
            if(str.substring(before)!==""){
                blocks.push([str.substring(before),OTHERS]);
            }
        }
        function noConflict(){
            window.cssBlock=_cssBlock;
            return cssBlock;
        }
        function getBlock(){
            var type=['OTHERS','BLOCKS','LEFT_CURLY_BRACKET','RIGHT_CURLY_BRACKET','NEWLINE','TAB','COMMENTS','STRING','PROPERTY','COLON'];
            var result=[];
            for(var i=0;i<blocks.length;i++){
                result[i]=blocks[i].concat();
            //    result[i][1]=type[result[i][1]];
            }
            return result;
        }
        function setBlock(i,block){
            blocks[i]=block;
        }
        function joinBlock(){
            //ブロックをつなげて文字列として返す
            var result="";
            for(var i=0;i<blocks.length;i++){
                result+=blocks[i][0];
            }
            return result;
        }
        function deleteBlock(i){
            blocks.splice(i,1);
        }
        function selector(query){
            var result=[];
            for(var i=0;i<blocks.length;i++){
                if(blocks[i][1]==query){
                    var p=blocks[i].concat();
                    p.push(i);
                    result.push(p);
                }
            }
            result.replace=function(){
                for(var i=0;i<this.length;i++){
                    this[i][0]=this[i][0].replace.apply(this[i][0],arguments);
                    console.log(this[i][2]);
                    console.log(blocks[this[i][2]]);
                    blocks[this[i][2]][0]=blocks[this[i][2]][0].replace.apply(blocks[this[i][2]][0],arguments);
                }
            };
            result.del=function(){
                for(var i=this.length;i--;){
                    blocks.splice(this[i][2],1);
                }
            }
            return result;
        }
        that.push = push;
        that.eq = eq;
        that.init = init;
        that.noConflict=noConflict;
        that.getBlock=getBlock;
        that.joinBlock=joinBlock;
        that.selector=selector;
        that.setBlock=setBlock;
        that.deleteBlock=deleteBlock;
        return that;
    })();
})(this);
/*
window.addEventListener('load',function(){
    //var testCode=".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}"
    var testCode=document.getElementById('source').innerHTML;
    var OTHERS=0,BLOCKS=1,LEFT_CURLY_BRACKET=2,RIGHT_CURLY_BRACKET=3,NEWLINE=4,TAB=5,COMMENTS=6,STRING=7;
    assert('log',testCode);
    assert('log',cssBlock.init(testCode));
    assert('dir',cssBlock.getBlock());
    assert('log',JSON.stringify(cssBlock.getBlock()).replace(/(\],)/g,'$1\n').replace(/"([^"]+?)"\]/g,"$1]"));
    assert('log',cssBlock.joinBlock()===testCode,'cssBlock.joinBlock() works.');
    assert('dir',cssBlock.selector(COMMENTS).del());
    assert('log',JSON.stringify(cssBlock.getBlock()).replace(/(\],)/g,'$1\n').replace(/"([^"]+?)"\]/g,"$1]"));
    assert('log',cssBlock.joinBlock());
    function assert(){
        var flag=true;
        var message=arguments[1];
        var ul=document.getElementById('ul');
        if(arguments.length==3){
            var flag=arguments[1];
            var message=arguments[2];
        }
        var li=document.createElement('li');
        li.appendChild(document.createTextNode(message));
        if(flag) li.className='passed';
        else li.className='failed';
        ul.appendChild(li);
        console[arguments[0]](message);
    }
},false);
//*/
