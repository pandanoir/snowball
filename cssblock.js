(function(window){
    if(window.cssBlock){
        var _cssBlock=window.cssBlock;
    }
    var types={'OTHERS':0,'BLOCKS':1,'LEFT_CURLY_BRACKET':2,'RIGHT_CURLY_BRACKET':3,'NEWLINE':4,'TAB':5,'COMMENTS':6,'STRING':7,'PROPERTY':8,'COLON':9,'SEMICOLON':10};
    var cssBlock=window.cssBlock = function (str) {
        var blocks = [];
        var original="";
        function push(block,type) {
            if(block!==""){
                blocks.push([block,type]);
            }
        };
        function init(str) {
            delete blocks;
            blocks = [];
            var i,j;
            var inComment=false,inString=false,isBeforeCharaSlash=false,isBeforeCharaAsterisk=false;
            var SINGLE_QUOTATION=1,DOUBLE_QUOTATION=2;
            var before=0;
            var indent=0;
            original=str;
            if(typeof str!=='string') return;
            for(var i=0,j=str.length;i<j;i++){
                var nowChar=str.charAt(i);
                if(nowChar=="\\"){
                    //エスケープシーケンス
                    continue;
                }
                if(!inString){
                    //文字列の外
                    if(nowChar=="'"||nowChar=='"'){
                        if(indent>0) push(str.substring(before,i),types['BLOCKS']);
                        if(indent==0) push(str.substring(before,i),types['OTHERS']);
                        before=i;//'"'をtypes['STRING']ブロックは含むから
                        if(nowChar=="'") inString=SINGLE_QUOTATION;
                        else if(nowChar=='"') inString=DOUBLE_QUOTATION;//前が/で、今が*となってて/*になるからコメントがここから開始
                        continue;
                    }
                }else{
                    //文字列の中
                    if(nowChar=="'" && inString==SINGLE_QUOTATION || nowChar=='"' && inString==DOUBLE_QUOTATION){
                        inString=false;
                        push(str.substring(before,i+1),types['STRING']);
                        before=i+1;
                        continue;
                    }
                }
                if(!inComment){
                    //コメント外
                    if(nowChar=="/"){
                        isBeforeCharaSlash=true;
                    }
                    if(nowChar=="*"&&isBeforeCharaSlash){
                        if(indent>0) push(str.substring(before,i-1),types['BLOCKS']);
                        if(indent==0) push(str.substring(before,i-1),types['OTHERS']);
                        before=i-1;//'/*'をtypes['COMMENTS']ブロックは含むから
                        inComment=true;//前が/で、今が*となってて/*になるからコメントがここから開始
                    }
                    if(nowChar!="/") isBeforeCharaSlash=false;
                }else{
                    //コメント内
                    if(nowChar=="*")
                        isBeforeCharaAsterisk=true;
                    if(nowChar=="/"&&isBeforeCharaAsterisk){
                        inComment=false;
                        push(str.substring(before,i+1),types['COMMENTS']);
                        before=i+1;
                    }
                    if(nowChar!="*")
                        isBeforeCharaAsterisk=false;
                }
                if(!inComment&&!inString){
                    //コメントの中でも文字列の中でもない
                    if(nowChar=="\n"){
                        if(indent>0) push(str.substring(before,i),types['BLOCKS']);
                        push("\n",types['NEWLINE']);
                        before=i+1;
                        continue;
                    }
                    if(nowChar=="\t"){
                        if(indent>0) push(str.substring(before,i),types['BLOCKS']);
                        push("\t",types['TAB']);
                        before=i+1;
                        continue;
                    }
                    if(nowChar=="{"){
                        indent++;
                        push(str.substring(before,i),types['OTHERS']);
                        push('{',types['LEFT_CURLY_BRACKET']);
                        before=i+1;
                    }
                    if(nowChar=="}"){
                        indent--;
                        push(str.substring(before,i),types['BLOCKS']);
                        push('}',types['RIGHT_CURLY_BRACKET']);
                        before=i+1;
                    }
                    if(nowChar==":"){
                        push(str.substring(before,i),types['PROPERTY']);
                        push(':',types['COLON']);
                        before=i+1;
                    }
                    if(nowChar==";"){
                        push(str.substring(before,i),types['BLOCKS']);
                        push(';',types['SEMICOLON']);
                        before=i+1;
                    }
                }
            }
            if(str.substring(before)!=="")
                blocks.push([str.substring(before),types['OTHERS']]);
            var properties=selector(types['PROPERTY']);
            for(var i=0,j=properties.length-1;i<j;i++){
                var blocks=getBlock();
                loop:for(var i2=properties[i][2],j2=properties[i+1][2];i2<j2;i2++){
                    if(blocks[i2][1]===types['SEMICOLON']||blocks[i2][1]===types['RIGHT_CURLY_BRACKET']){
                        break loop;
                    }
                    if(blocks[i2][1]===types['LEFT_CURLY_BRACKET']){
                        var block=blocks[properties[i][2]];
                        block[1]=types['OTHERS'];
                        setBlock(properties[i][2],block);
                    }
                }
            }
        }
        function noConflict(){
            window.cssBlock=_cssBlock;
            return cssBlock;
        }
        function getBlock(){
            // for(var key in types) inverseType[types[key]]=key;
            var result=[];
            for(var i=0;i<blocks.length;i++)
                result[i]=blocks[i].concat();
            return result;
        }
        function parseType(){
            var inverseType={};
            var result=[];
            for(var key in types) inverseType[types[key]]=key;
            for(var i=0;i<blocks.length;i++){
                result[i]=blocks[i].concat();
                result[i][1]=inverseType[result[i][1]];
            }
            return result;
        }
        function getOriginal(){
            return original;
        }
        function setBlock(i,block){
            blocks[i]=block;
        }
        function joinBlock(){
            //ブロックをつなげて文字列として返す
            var result="";
            for(var i=0;i<blocks.length;i++)
                result+=blocks[i][0];
            return result;
        }
        function deleteBlock(i){
            blocks.splice(i,1);
        }
        function insertBlock(i,block){
            blocks.splice(i,0,block);
        }
        function selector(query){
            //types['BLOCKS']などと指定することでそのタイプのブロックを返す
            var result=[];
            for(var i=0;i<blocks.length;i++){
                if(blocks[i][1]==query){
                    var p=blocks[i].concat();
                    p[2]=i;
                    result.push(p);
                }
            }
            result.replace=function(){
                for(var i=0;i<this.length;i++){
                    this[i][0]=this[i][0].replace.apply(this[i][0],arguments);
                    blocks[this[i][2]][0]=blocks[this[i][2]][0].replace.apply(blocks[this[i][2]][0],arguments);
                }
            };
            result.del=function(){
                for(var i=this.length;i--;)
                    blocks.splice(this[i][2],1);
            }
            return result;
        }
        function reconstruct(){
            var block=joinBlock();
            blocks=[];
            init(block);
        }
        this.push = push;
        this.noConflict=noConflict;
        this.getBlock=getBlock;
        this.joinBlock=joinBlock;
        this.selector=selector;
        this.setBlock=setBlock;
        this.deleteBlock=deleteBlock;
        this.insertBlock=insertBlock;
        this.getOriginal=getOriginal;
        this.parseType=parseType;
        this.reconstruct=reconstruct;

        init(str);//初期化
    };
    cssBlock.fn=cssBlock.prototype;
    cssBlock.types=types;
})(this);
//*
//    window.addEventListener('load',function(){
//        //var testCode=".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}"
//        var testCode=document.getElementById('source').innerHTML;
//        var types['OTHERS']=0,types['BLOCKS']=1,types['LEFT_CURLY_BRACKET']=2,types['RIGHT_CURLY_BRACKET']=3,types['NEWLINE']=4,types['TAB']=5,types['COMMENTS']=6,types['STRING']=7;
//        assert('log',testCode);
//        var testCSSBlock=new cssBlock(testCode);
//        assert('log',testCSSBlock);
//        console.log(JSON.stringify(testCSSBlock.getBlock()));
//        assert('dir',testCSSBlock.getBlock().toString()===[[".white-space",0],["{",2],["\n",4],["\t",5],["white-space",8],[":",9],[" nowrap;",1],["\n",4],["\t",5],["background ",8],[":",9],["#FFF!important;",1],["\n",4],["\t",5],["color ",8],[":",9],[" #FFFFFF !important ;",1],["\n",4],["\t",5],[" margin",8],[":",9],["3px 3px 5px 3px;",1],["\n",4],["}",3],["\n",4],["a[href=",0],["\"index.html\"",7],["]",0],["{",2],["\n",4],["background",8],[":",9],["#fff;",1],["\n",4],["}",3],["\n",4],["@media screen and (max-device-width",8],[":",9],["480px)",0],["{",2],["\n",4],["\t",5],[".black , .button ",0],["{",2],["\n",4],["\t",5],["background",8],[":",9],["none;",1],["\n",4],["\t",5],["background-image",8],[":",9],["none;",1],["\n",4],["\t",5],[" color",8],[":",9],["black; ",1],["/*OK* \\/ */",6],["\n",4],["\t",5],[" margin",8],[":",9],[" 0px;",1],["\n",4],["\t",5],[" opacity",8],[":",9],["0.9;",1],["\n",4],["\t",5],[" padding",8],[":",9],["3px 3px 3px 3px;",1],["\n",4],["\t",5],["}",3],["\n",4],["}",3]].toString(),'getBlock() works.');
//        assert('log',testCSSBlock.joinBlock()===testCode,'cssBlock.joinBlock() works.');
//        testCSSBlock.selector(types['COMMENTS']).del();
//        assert('log',testCSSBlock.getBlock().toString()===[[".white-space",0],["{",2],["\n",4],["\t",5],["white-space",8],[":",9],[" nowrap;",1],["\n",4],["\t",5],["background ",8],[":",9],["#FFF!important;",1],["\n",4],["\t",5],["color ",8],[":",9],[" #FFFFFF !important ;",1],["\n",4],["\t",5],[" margin",8],[":",9],["3px 3px 5px 3px;",1],["\n",4],["}",3],["\n",4],["a[href=",0],["\"index.html\"",7],["]",0],["{",2],["\n",4],["background",8],[":",9],["#fff;",1],["\n",4],["}",3],["\n",4],["@media screen and (max-device-width",8],[":",9],["480px)",0],["{",2],["\n",4],["\t",5],[".black , .button ",0],["{",2],["\n",4],["\t",5],["background",8],[":",9],["none;",1],["\n",4],["\t",5],["background-image",8],[":",9],["none;",1],["\n",4],["\t",5],[" color",8],[":",9],["black; ",1],["\n",4],["\t",5],[" margin",8],[":",9],[" 0px;",1],["\n",4],["\t",5],[" opacity",8],[":",9],["0.9;",1],["\n",4],["\t",5],[" padding",8],[":",9],["3px 3px 3px 3px;",1],["\n",4],["\t",5],["}",3],["\n",4],["}",3]].toString(),'del() works.');
//        assert('log',testCSSBlock.joinBlock()===".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\na[href=\"index.html\"]{\nbackground:#fff;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black; \n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",'del() works.');
//        function assert(){
//            var flag=true;
//            var message=arguments[1];
//            var ul=document.getElementById('ul');
//            if(arguments.length==3){
//                var flag=arguments[1];
//                var message=arguments[2];
//            }
//            var li=document.createElement('li');
//            li.appendChild(document.createTextNode(message));
//            if(flag) li.className='passed';
//            else li.className='failed';
//            ul.appendChild(li);
//            console[arguments[0]](message);
//        }
//    },false);
//    //*/
