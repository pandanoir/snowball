(function ($) {
	$(function () {
		var $custom = $(".customCheckBox").find("a"),
			$sub = $("#compress"),
			$aft = $("#aft"),
			str = ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",
			$cLen = $custom.length,
			$end = $("<div/>"),
			$bef = $("#bef");
			$bef.val(str)
		$.fn.extend({
			isCheck:function(){
				return this.hasClass("checked")
			},
			clicked:function(){
				this.click()
			}
		})
		/*str
.white-space{
	white-space: nowrap;
	background :#FFF!important;
	color : #FFFFFF !important ;
	 margin:3px 3px 5px 3px;
}
@media screen and (max-device-width:480px){
	.black , .button {
	background:none;
	background-image:none;
	 color:black;\/*OK*\/
	 margin: 0px;
	 opacity:0.9;
	 padding:3px 3px 3px 3px;
	}
}*/
		module("TParts");
		var TParts = function(){
			var that=this;
			that.reset= function () {
				for (var i = 0; i < $cLen; i++) if (TParts.eq(i).isCheck()) TParts.eq(i).clicked();
				return this
			};
			that.init= function () {
			/*コメントを残さない true 0
			値が0なら単位を省略 true 1
			0.xとあったら0を省略 true 2
			カラーコードを短くする true 3
			カラーネームを最適化する true 4
			paddingを最短にする true 5
			marginを最短にする true 6
			noneを0に変換する true 7
			カラーコードを小文字にする false 8
			一部だけ圧縮する false 9
			インデントを消す true 10
			改行を消す true 11
			カンマ周辺の空白を消す true 12
			コロン周辺の空白を消す true 13
			セミコロン周辺の空白を消す true 14
			不要なセミコロンを消す true 15
			!important周辺の空白を消す true 16
			始め波括弧の空白を消す true 17
			終わり波括弧の空白を消す true 18*/
				var values = [!1,!0, !0, !0, !0, !0, !0, !0,!0, !1, !1, !0, !0, !0, !0,!0, !0, !0, !0, !0];
				for (var i = 0; i < $cLen; i++) if (TParts.eq(i).isCheck() !== values[i]) TParts.eq(i).clicked();
				return this
			}
			that.change= function (name, state) {
				if(state===undefined) TParts.eq(name).clicked();
				else if (state !== TParts.eq(name).isCheck()) TParts.eq(name).clicked();
				return this
			}
			that.eq= function () {
				var id={HackMode:0,comment:1,zero:2,decimals:3,color:4,color_name:5,padding:6,margin:7,lower:8,none:9,option:10,indent:11,line:12,comma:13,colon:14,semicolon:15,needlessSemi:15,important:17,sc_bracket:18,ec_bracket:19},$custom = $(".customCheckBox").find("a");
				return function(name){
					if(typeof name === "string") return $custom.eq(id[name]);
					else if(typeof name === "number") return $custom.eq(name);
				}
			}();
			that.show= function () {
				for (var i = 0, result = ""; i < $cLen; i++){
					result += TParts.eq(i).text() + " = " + (TParts.eq(i).isCheck() ? "true" : "false") + "\n";
				}
				console.log(result)
				return this
			}
			return that;
		};
		TParts=TParts()
		test("TParts", 4, function () {
			deepEqual(TParts.eq("comment"), $custom.eq(1), "custom ok");
			TParts.change("comment", !1);
			equal(TParts.eq("comment").isCheck(), !1, "false change ok");
			TParts.change("comment", !0);
			equal(TParts.eq("comment").isCheck(), !0, "true change ok");
			TParts.reset();
			for (var i = 0, resetCheck = !0; i < $cLen; i++) if (TParts.eq(i).isCheck() !== !1) {
				resetCheck = !1;
				break
			}
			equal(resetCheck, !0, "reset ok")
		});
		module("options");
		var resultStr = [
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//0
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//0
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//1
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//2
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//3
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:#000;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//4
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px;\n\t}\n}",//5
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//6
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:0;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//7
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#fff!important;\n\tcolor : #ffffff !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//8
		str,//9
		".white-space{\nwhite-space: nowrap;\nbackground :#FFF!important;\ncolor : #FFFFFF !important ;\nmargin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n.black , .button {\nbackground:none;\nbackground-image:none;\ncolor:black;/*OK*/\nmargin: 0px;\nopacity:0.9;\npadding:3px 3px 3px 3px;\n}\n}",//10
		".white-space{\twhite-space: nowrap;\tbackground :#FFF!important;\tcolor : #FFFFFF !important ;\t margin:3px 3px 5px 3px;}@media screen and (max-device-width:480px){\t.black , .button {\tbackground:none;\tbackground-image:none;\t color:black;/*OK*/\t margin: 0px;\t opacity:0.9;\t padding:3px 3px 3px 3px;\t}}",//11
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black,.button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//12
		".white-space{\n\twhite-space:nowrap;\n\tbackground:#FFF!important;\n\tcolor:#FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin:0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//13
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//14
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;\/*OK*\/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px\n\t}\n}",//15
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF!important;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//16
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button{\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",//17
		".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\tbackground:none;\n\tbackground-image:none;\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}"//18
		]
		test("Each true",1+$cLen,function(){
			var ng = !1,$cLen2=$cLen;
			TParts.reset()
			for (var i = 0; i < $cLen2; i++) {
				TParts.change(i, !0).change("option", !0);
				$sub.clicked();
				if ($aft.val() !== resultStr[i]){
					ng = !0;
					break;
				}else ok(true,TParts.eq(i).text());
				TParts.change(i, !1);
			}
			equal(ng, !1, "Each true ok");
		})
		test("Each false",1+$cLen, function () {
			var ng = !1,$cLen2=$cLen;
			TParts.reset();
			for (var i = 0; i < $cLen2; i++) {
				TParts.change(i, !1).change("option", !0);
				$sub.clicked();
				if ($aft.val() !== str){
					ng = !0;
					break;
				}else ok(true,TParts.eq(i).text());
			}
			equal(ng, !1, "Each false ok")
		});
		test("Default", 1, function () {
			TParts.init();
			$sub.clicked();
			equal($aft.val(), ".white-space{white-space:nowrap;background:#FFF!important;color:#FFF!important;margin:3px 3px 5px}@media screen and (max-device-width:480px){.black,.button{background:0;background-image:none;color:#000;margin:0;opacity:.9;padding:3px}}", "全部ON ok")
		})
		test("option click",2,function(){
			TParts.init()
			var $option=TParts.eq("option");
			for(var i=0;i<2;i++){
				$option.clicked();
				if($option.isCheck()){
					equal($("#option_menu").is(":visible"),true,"changed visible ok");
				}else{
					equal($("#option_menu").is(":hidden"),true,"changed hidden ok");
				}
			}
		})
		test("option show click",2,function(){
			TParts.init()
			var $custom=$("#option_menu").find("div.customCheckBox").find("a"),$cLen=$custom.length
			for(var ii=0;ii<2;ii++){
				$("#option_show").clicked()
				if($custom.eq(0).is(":visible")){
					for(var i=0,check=true;i<$cLen;i++) $custom.eq(i).is(":hidden")&&(check=false)
					equal(check,true,"changed visible ok")
				}else{
					for(var i=0,check=true;i<$cLen;i++) $custom.eq(i).is(":visible")&&(check=false)
					equal(check,true,"changed hidden ok")
				}
			}
		})
		test("option all click",2,function(){
			TParts.init()
			var $custom=$("#option_menu").find("div.customCheckBox").find("a"),$cLen=$custom.length
			if($("#option_menu").is(":hidden")){
				TParts.eq("option").clicked()
			}
			$("#option_all").clicked()
			for(var i=0,check=true;i<$cLen;i++) $custom.eq(i).isCheck()&&(check=false)
			equal(check,true,"change all non checked");
			
			$("#option_all").clicked()
			for(var i=0,check=true;i<$cLen;i++) $custom.eq(i).isCheck()||(check=false)
			equal(check,true,"change all checked");
		})
	})
})(jQuery);