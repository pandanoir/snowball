$(function(){
	var $custom=$(".customCheckBox").find("a");
	var $compress=$("#compress"),$aft=$("#aft");
	var str=".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}";
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
	module("TParts",function(){
	});
	var TParts={
		reset:function(){
			for(var i=0,j=$custom.length;i<j;i++){
				if($custom.eq(i).hasClass("checked"))$custom.eq(i).trigger("click");
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
			var values=[true,true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true]
			for(var i=0,j=$custom.length;i<j;i++){
				if($custom.eq(i).hasClass("checked")!=values[i])$custom.eq(i).trigger("click")
			}
		},
		change:function(name,state){
			var id={"comment":0,
				"zero":1,
				"decimals":2,
				"color":3,
				"color_name":4,
				"padding":5,
				"margin":6,
				"lower":7,
				"option":8,
				"indent":9,
				"line":10,
				"comma":11,
				"colon":12,
				"semicolon":13,
				"important":14,
				"sc_bracket":15,
				"ec_bracket":16}
			if(state!=$custom.eq(id[name]).hasClass("checked")) $custom.eq(id[name]).trigger("click");
			return TParts
		},
		custom:function(name){
			var id={"comment":0,
				"zero":1,
				"decimals":2,
				"color":3,
				"color_name":4,
				"padding":5,
				"margin":6,
				"lower":7,
				"option":8,
				"indent":9,
				"line":10,
				"comma":11,
				"colon":12,
				"semicolon":13,
				"important":14,
				"sc_bracket":15,
				"ec_bracket":16}
			return $custom.eq(id[name]);
		},
		show:function(){
			for(var i=0,j=$custom.length,result="";i<j;i++){
				result+=$custom.eq(i).text()+" = "+($custom.eq(i).hasClass("checked")?"true":"false")+"\n"
			}
			console.log(result)
			return TParts;
		}
	};
	test("TParts",function(){
		deepEqual(TParts.custom("comment"),$custom.eq(0),"custom ok");
		TParts.change("comment",false);
		equal(TParts.custom("comment").hasClass("checked"),false,"false change ok");
		TParts.change("comment",true);
		equal(TParts.custom("comment").hasClass("checked"),true,"true change ok");
		TParts.reset();
		for(var i=0,j=$custom.length,resetCheck=true;i<j;i++){
			if($custom.eq(i).hasClass("checked")!=false){
				resetCheck=false;
				break
			}
		}
		equal(resetCheck,true,"reset ok");
	})
	
	
	module("options",{
		setup:function(){
			TParts.reset()
			for(var i=0,j=$custom.length,resetCheck=true;i<j;i++){
				if($custom.eq(i).hasClass("checked")!=false){
					resetCheck=false;
					TParts.show();
					break
				}
			}
			TParts.change("option",true)
			equal(resetCheck,true,"reset ok");
			$("#bef").val(str);
			equal($("#bef").val(),str,"bef ready");
			$compress.on("click",Clicked);
		},
		teardown:function(){
			$compress.off("click",Clicked)
		}
	});
	function Clicked(){
		ok(true,"compress clicked");
	}
	test("コメントを残さない true",function(){
		TParts.change("comment",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","コメントを残さない true ok");
	});
	falseCheck("コメントを残さない","comment")
	test("値が0なら単位を省略 true",function(){
		TParts.change("zero",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","値が0なら単位を省略 true ok");
	});
	falseCheck("値が0なら単位を省略","zero")
	test("0.xとあったら0を省略 true",function(){
		TParts.change("decimals",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","0.xとあったら0を省略 true ok");
	});
	falseCheck("0.xとあったら0を省略","decimals")
	test("カラーコードを短くする true",function(){
		TParts.change("color",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カラーコードを短くする true ok");
	});
	falseCheck("カラーコードを短くする","color")
	test("カラーネームを最適化する true",function(){
		TParts.change("color_name",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:#000;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カラーネームを最適化する true ok");
	});
	falseCheck("カラーネームを最適化する","color_name")
	test("paddingを最短にする true",function(){
		TParts.change("padding",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px;\n\t}\n}","paddingを最短にする true ok");
	});
	falseCheck("paddingを最短にする","padding")
	test("marginを最短にする true",function(){
		TParts.change("margin",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","marginを最短にする true ok");
	});
	falseCheck("marginを最短にする","margin")
	test("カラーコードを小文字にする true",function(){
		TParts.change("lower",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#fff!important;\n\tcolor : #ffffff !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カラーコードを小文字にする true ok");
	});
	falseCheck("カラーコードを小文字にする","lower")
	test("インデントを消す true",function(){
		TParts.change("indent",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\nwhite-space: nowrap;\nbackground :#FFF!important;\ncolor : #FFFFFF !important ;\nmargin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n.black , .button {\ncolor:black;/*OK*/\nmargin: 0px;\nopacity:0.9;\npadding:3px 3px 3px 3px;\n}\n}","インデントを消す true ok");
	});
	falseCheck("インデントを消す","indent")
	test("改行を消す true",function(){
		TParts.change("line",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\twhite-space: nowrap;\tbackground :#FFF!important;\tcolor : #FFFFFF !important ;\t margin:3px 3px 5px 3px;}@media screen and (max-device-width:480px){\t.black , .button {\t color:black;/*OK*/\t margin: 0px;\t opacity:0.9;\t padding:3px 3px 3px 3px;\t}}","改行を消す true ok");
	});
	falseCheck("改行を消す","line")
	test("カンマ周辺の空白を消す true",function(){
		TParts.change("comma",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black,.button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","カンマ周辺の空白を消す true ok");
	});
	falseCheck("カンマ周辺の空白を消す","comma")
	test("コロン周辺の空白を消す true",function(){
		TParts.change("colon",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space:nowrap;\n\tbackground:#FFF!important;\n\tcolor:#FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin:0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","コロン周辺の空白を消す true ok");
	});
	falseCheck("コロン周辺の空白を消す","colon")
	test("セミコロン周辺の空白を消す true",function(){
		TParts.change("semicolon",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","セミコロン周辺の空白を消す true ok");
	});
	falseCheck("セミコロン周辺の空白を消す","semicolon")
	test("!important周辺の空白を消す true",function(){
		TParts.change("important",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF!important;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","!important周辺の空白を消す true ok");
	});
	falseCheck("!important周辺の空白を消す","important")
	test("始め波括弧の空白を消す true",function(){
		TParts.change("sc_bracket",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button{\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","始め波括弧の空白を消す true ok");
	});
	falseCheck("始め波括弧の空白を消す","sc_bracket")
	test("終わり波括弧の空白を消す true",function(){
		TParts.change("ec_bracket",true);$compress.trigger("click")
		equal($aft.val(),".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}","終わり波括弧の空白を消す true ok");
	});
	falseCheck("終わり波括弧の空白を消す","ec_bracket")
	function falseCheck(name,id){test(name+" false",function(){TParts.change(id,false);$compress.trigger("click");equal($aft.val(),str,name+" false ok");})}
});