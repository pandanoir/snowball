$(function(){
	var $custom=$(".customCheckBox").find("a"),$compress=$("#compress"),$aft=$("#aft"),str=".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",$cLen=$custom.length;
	/*str
	.white-space{
		white-space: nowrap;
		background :#FFF!important;
		color : #FFFFFF !important ;
		 margin:3px 3px 5px 3px;
	}
	@media screen and (max-device-width:480px){
		.black , .button {
		 color:black;\/*OK*\/
		 margin: 0px;
		 opacity:0.9;
		 padding:3px 3px 3px 3px;
		}
	}*/
	var $end=$("<div/>");
	module("TParts");
	var TParts={
		reset:function(){
			for(var i=0;i<$cLen;i++){
				if(TParts.custom(i).hasClass("checked"))TParts.custom(i).trigger("click");
			}
			return TParts
		},
		init:function(){
			/*コメントを残さない true
			値が0なら単位を省略 true
			0.xとあったら0を省略 true
			カラーコードを短くする true
			カラーネームを最適化する true
			paddingを最短にする true
			marginを最短にする true
			カラーコードを小文字にする false
			一部だけ圧縮する false
			インデントを消す true
			改行を消す true
			カンマ周辺の空白を消す true
			コロン周辺の空白を消す true
			セミコロン周辺の空白を消す true
			!important周辺の空白を消す true
			始め波括弧の空白を消す true
			終わり波括弧の空白を消す true*/
			var values=[!0,!0,!0,!0,!0,!0,!0,!1,!1,!0,!0,!0,!0,!0,!0,!0,!0];
			for(var i=0;i<$cLen;i++){
				if(TParts.custom(i).hasClass("checked")!=values[i])TParts.custom(i).trigger("click")
			}
		},
		change:function(name,state){
			var id=id||{"comment":0,"zero":1,"decimals":2,"color":3,"color_name":4,"padding":5,"margin":6,"lower":7,"option":8,"indent":9,"line":10,"comma":11,"colon":12,"semicolon":13,"important":14,"sc_bracket":15,"ec_bracket":16}
			if(state!=TParts.custom(name).hasClass("checked")) TParts.custom(name).trigger("click");
			return TParts
		},
		custom:function(name){
			var id=id||{"comment":0,"zero":1,"decimals":2,"color":3,"color_name":4,"padding":5,"margin":6,"lower":7,"option":8,"indent":9,"line":10,"comma":11,"colon":12,"semicolon":13,"important":14,"sc_bracket":15,"ec_bracket":16},cache=cache||new Object();
			if(typeof name=="string")return cache[id[name]]?cache[id[name]]:(cache[id[name]]=$custom.eq(id[name]));
			if(typeof name=="number")return cache[name]?cache[name]:(cache[name]=$custom.eq(name));
		},
		show:function(){
			for(var i=0,result="";i<$cLen;i++){
				result+=TParts.custom(i).text()+" = "+(TParts.custom(i).hasClass("checked")?"true":"false")+"\n"
			}
			console.log(result)
			return TParts;
		}
	};
	test("TParts",4,function(){
		deepEqual(TParts.custom("comment"),$custom.eq(0),"custom ok");
		TParts.change("comment",!1);
		equal(TParts.custom("comment").hasClass("checked"),!1,"false change ok");
		TParts.change("comment",!0);
		equal(TParts.custom("comment").hasClass("checked"),!0,"true change ok");
		TParts.reset();
		for(var i=0,resetCheck=!0;i<$cLen;i++){
			if(TParts.custom(i).hasClass("checked")!=!1){
				resetCheck=!1;
				break
			}
		}
		equal(resetCheck,!0,"reset ok");
	})
	
	
	module("options",{
		setup:function(){
			var $bef=$bef||$("#bef");
			TParts.reset()
			for(var i=0,resetCheck=!0;i<$cLen;i++){
				if(TParts.custom(i).hasClass("checked")!=!1){
					resetCheck=!1;
					break
				}
			}
			TParts.change("option",!0)
			equal(resetCheck,!0,"reset ok");
			$bef.val(str);
			equal($bef.val(),str,"bef ready");
			$compress.on("click",Clicked);
		},
		teardown:function(){
			$compress.off("click",Clicked)
		}
	});
	function Clicked(){
		ok(!0,"compress clicked");
	}
	test("コメントを残さない true",4,function(){
		TParts.change("comment",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","コメントを残さない true ok");
	});
	test("値が0なら単位を省略 true",4,function(){
		TParts.change("zero",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","値が0なら単位を省略 true ok");
	});
	test("0.xとあったら0を省略 true",4,function(){
		TParts.change("decimals",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","0.xとあったら0を省略 true ok");
	});
	test("カラーコードを短くする true",4,function(){
		TParts.change("color",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カラーコードを短くする true ok");
	});
	test("カラーネームを最適化する true",4,function(){
		TParts.change("color_name",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:#000;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カラーネームを最適化する true ok");
	});
	test("paddingを最短にする true",4,function(){
		TParts.change("padding",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px;\n\t}\n}","paddingを最短にする true ok");
	});
	test("marginを最短にする true",4,function(){
		TParts.change("margin",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","marginを最短にする true ok");
	});
	test("カラーコードを小文字にする true",4,function(){
		TParts.change("lower",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#fff!important;\n\tcolor : #ffffff !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カラーコードを小文字にする true ok");
	});
	test("インデントを消す true",4,function(){
		TParts.change("indent",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\nwhite-space: nowrap;\nbackground :#FFF!important;\ncolor : #FFFFFF !important ;\nmargin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n.black , .button {\ncolor:black;/*OK*/\nmargin: 0px;\nopacity:0.9;\npadding:3px 3px 3px 3px;\n}\n}","インデントを消す true ok");
	});
	test("改行を消す true",4,function(){
		TParts.change("line",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\twhite-space: nowrap;\tbackground :#FFF!important;\tcolor : #FFFFFF !important ;\t margin:3px 3px 5px 3px;}@media screen and (max-device-width:480px){\t.black , .button {\t color:black;/*OK*/\t margin: 0px;\t opacity:0.9;\t padding:3px 3px 3px 3px;\t}}","改行を消す true ok");
	});
	test("カンマ周辺の空白を消す true",4,function(){
		TParts.change("comma",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black,.button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カンマ周辺の空白を消す true ok");
	});
	test("コロン周辺の空白を消す true",4,function(){
		TParts.change("colon",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space:nowrap;\n\tbackground:#FFF!important;\n\tcolor:#FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin:0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","コロン周辺の空白を消す true ok");
	});
	test("セミコロン周辺の空白を消す true",4,function(){
		TParts.change("semicolon",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","セミコロン周辺の空白を消す true ok");
	});
	test("!important周辺の空白を消す true",4,function(){
		TParts.change("important",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF!important;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","!important周辺の空白を消す true ok");
	});
	test("始め波括弧の空白を消す true",4,function(){
		TParts.change("sc_bracket",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button{\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","始め波括弧の空白を消す true ok");
	});
	test("終わり波括弧の空白を消す true",4,function(){
		TParts.change("ec_bracket",!0);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","終わり波括弧の空白を消す true ok");
	});
	test("All false",function(){
		var ng=!1;
		$compress.off("click",Clicked);
		for(var i=0;i<$cLen;i++){
			TParts.reset().change(i,!1).change("option",!0);
			$compress.trigger("click");
			if($aft.val()!=str) ng=!0;
		}
		equal(ng,!1,"All false ok");
	})
	test("全部ON",5,function(){
		TParts.init();
		var values=[!0,!0,!0,!0,!0,!0,!0,!1,!1,!0,!0,!0,!0,!0,!0,!0,!0];
		for(var i=0,initCheck=!0;i<$cLen;i++){
			if(TParts.custom(i).hasClass("checked")!=values[i]) initCheck=!1;
		}
		equal(initCheck,!0,"init ok");
		$compress.trigger("click")
		equal($aft.val(),".white-space{white-space:nowrap;background:#FFF!important;color:#FFF!important;margin:3px 3px 5px}@media screen and (max-device-width:480px){.black,.button{color:#000;margin:0;opacity:.9;padding:3px}}","全部ON ok")
	})
});