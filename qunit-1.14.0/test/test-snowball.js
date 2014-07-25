function compress(code,res,option){
    option=option||{"compress":false,"compare":false,"HackMode":false,"comment":true,"zero":true,"decimals":true,"color":true,"color_name":true,"padding":true,"margin":true,"none":false,"lower":true,"option":false,"indent":true,"line":true,"comma":true,"colon":true,"semicolon":true,"needlessSemi":true,"important":true,"sc_bracket":true,"ec_bracket":true,"save":false,"cse_input":false,"cse_submit":false};
    var css=Compressors.compress(option,code);
    res[0]=css.joinBlock();
}
console.log(QUnit);
QUnit.test('',function(assert){
    var res=[];
    compress('.white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}',res);
    stop();
    setTimeout(function(){
        start();
        assert.ok(res[0]==='.white-space{white-space:nowrap;background:#fff!important;color:#fff!important;margin:3px 3px 5px}@media screen and (max-device-width:480px){.black,.button{background:none;background-image:none;color:#000;margin:0;opacity:.9;padding:3px}}','first test passed.');
    },10);
});
QUnit.test('',function(assert){
    var res=[];
    compress('.white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\npadding:10px;\npadding-left:30px;\npadding-right:30px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}',res);
    stop();
    setTimeout(function(){
        start();
        assert.ok(res[0]==='.white-space{white-space:nowrap;background:#fff!important;color:#fff!important;margin:3px 3px 5px;padding:10px 30px}@media screen and (max-device-width:480px){.black,.button{background:none;background-image:none;color:#000;margin:0;opacity:.9;padding:3px}}','second test passed.');
    },10);
});
QUnit.test('',function(assert){
    var res=[];
    compress('/* new clearfix */\n.clearfix:after {\n\tvisibility: hidden;\n\tdisplay: block;\n\tfont-size: 0;\n\tcontent: " ";\n\tclear: both;\n\theight: 0;\n\t}\n* html .clearfix             { zoom: 1; } /* IE6 */\n*:first-child+html .clearfix { zoom: 1; } /* IE7 */\n        ',res);
    stop();
    setTimeout(function(){
        start();
        assert.ok(res[0]==='.clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}* html .clearfix{zoom:1}*:first-child+html .clearfix{zoom:1}','third test passed.');
    },10);
});
