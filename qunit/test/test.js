(function ($) {
	$(function () {
		var $custom = $(".customCheckBox").find("a"),
			$sub = $("#compress"),
			$aft = $("#aft"),
			str = ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}",
			$cLen = $custom.length,
			$end = $("<div/>"),
			$bef = $("#bef");
			$bef.val(str)
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
		module("TParts");
		var TParts = {
			reset: function () {
				for (var i = 0; i < $cLen; i++) if (TParts.custom(i).hasClass("checked")) TParts.custom(i).trigger("click");
				return this
			},
			init: function () {
			/*\u30b3\u30e1\u30f3\u30c8\u3092\u6b8b\u3055\u306a\u3044 true
			\u5024\u304c0\u306a\u3089\u5358\u4f4d\u3092\u7701\u7565 true
			0.x\u3068\u3042\u3063\u305f\u30890\u3092\u7701\u7565 true
			\u30ab\u30e9\u30fc\u30b3\u30fc\u30c9\u3092\u77ed\u304f\u3059\u308b true
			\u30ab\u30e9\u30fc\u30cd\u30fc\u30e0\u3092\u6700\u9069\u5316\u3059\u308b true
			padding\u3092\u6700\u77ed\u306b\u3059\u308b true
			margin\u3092\u6700\u77ed\u306b\u3059\u308b true
			\u30ab\u30e9\u30fc\u30b3\u30fc\u30c9\u3092\u5c0f\u6587\u5b57\u306b\u3059\u308b false
			\u4e00\u90e8\u3060\u3051\u5727\u7e2e\u3059\u308b false
			\u30a4\u30f3\u30c7\u30f3\u30c8\u3092\u6d88\u3059 true
			\u6539\u884c\u3092\u6d88\u3059 true
			\u30ab\u30f3\u30de\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true
			\u30b3\u30ed\u30f3\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true
			\u30bb\u30df\u30b3\u30ed\u30f3\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true
			!important\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true
			\u59cb\u3081\u6ce2\u62ec\u5f27\u306e\u7a7a\u767d\u3092\u6d88\u3059 true
			\u7d42\u308f\u308a\u6ce2\u62ec\u5f27\u306e\u7a7a\u767d\u3092\u6d88\u3059 true*/
				var values = [!0, !0, !0, !0, !0, !0, !0, !1, !1, !0, !0, !0, !0, !0, !0, !0, !0];
				for (var i = 0; i < $cLen; i++) if (TParts.custom(i).hasClass("checked") != values[i]) TParts.custom(i).trigger("click");
				return this
			},
			change: function (name, state) {
				if (state != TParts.custom(name).hasClass("checked")) TParts.custom(name).trigger("click");
				return this
			},
			custom: function (name) {
				if (typeof name == "string") return $custom.eq(this.id[name]);
				if (typeof name == "number") return $custom.eq(name)
			},
			show: function () {
				for (var i = 0, result = ""; i < $cLen; i++) result += TParts.custom(i).text() + " = " + (TParts.custom(i).hasClass("checked") ? "true" : "false") + "\n";
				console.log(result);
				return this
			},
			id: {
				comment: 0,
				zero: 1,
				decimals: 2,
				color: 3,
				color_name: 4,
				padding: 5,
				margin: 6,
				lower: 7,
				option: 8,
				indent: 9,
				line: 10,
				comma: 11,
				colon: 12,
				semicolon: 13,
				important: 14,
				sc_bracket: 15,
				ec_bracket: 16
			}
		};
		test("TParts", 4, function () {
			deepEqual(TParts.custom("comment"), $custom.eq(0), "custom ok");
			TParts.change("comment", !1);
			equal(TParts.custom("comment").hasClass("checked"), !1, "false change ok");
			TParts.change("comment", !0);
			equal(TParts.custom("comment").hasClass("checked"), !0, "true change ok");
			TParts.reset();
			for (var i = 0, resetCheck = !0; i < $cLen; i++) if (TParts.custom(i).hasClass("checked") != !1) {
				resetCheck = !1;
				break
			}
			equal(resetCheck, !0, "reset ok")
		});
		module("options", {
			setup: function () {
				TParts.reset().change("option", !0);
				$sub.on("click", Clicked)
			},
			teardown: function () {
				$sub.off("click", Clicked)
			}
		});

		function Clicked() {
			ok(!0, "compress clicked")
		}
		test("\u30b3\u30e1\u30f3\u30c8\u3092\u6b8b\u3055\u306a\u3044 true", 2, function () {
			TParts.change("comment", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u30b3\u30e1\u30f3\u30c8\u3092\u6b8b\u3055\u306a\u3044 true ok")
		});
		test("\u5024\u304c0\u306a\u3089\u5358\u4f4d\u3092\u7701\u7565 true", 2, function () {
			TParts.change("zero", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u5024\u304c0\u306a\u3089\u5358\u4f4d\u3092\u7701\u7565 true ok")
		});
		test("0.x\u3068\u3042\u3063\u305f\u30890\u3092\u7701\u7565 true", 2, function () {
			TParts.change("decimals", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "0.x\u3068\u3042\u3063\u305f\u30890\u3092\u7701\u7565 true ok")
		});
		test("\u30ab\u30e9\u30fc\u30b3\u30fc\u30c9\u3092\u77ed\u304f\u3059\u308b true", 2, function () {
			TParts.change("color", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u30ab\u30e9\u30fc\u30b3\u30fc\u30c9\u3092\u77ed\u304f\u3059\u308b true ok")
		});
		test("\u30ab\u30e9\u30fc\u30cd\u30fc\u30e0\u3092\u6700\u9069\u5316\u3059\u308b true", 2, function () {
			TParts.change("color_name", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:#000;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u30ab\u30e9\u30fc\u30cd\u30fc\u30e0\u3092\u6700\u9069\u5316\u3059\u308b true ok")
		});
		test("padding\u3092\u6700\u77ed\u306b\u3059\u308b true", 2, function () {
			TParts.change("padding", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px;\n\t}\n}", "padding\u3092\u6700\u77ed\u306b\u3059\u308b true ok")
		});
		test("margin\u3092\u6700\u77ed\u306b\u3059\u308b true", 2, function () {
			TParts.change("margin", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "margin\u3092\u6700\u77ed\u306b\u3059\u308b true ok")
		});
		test("\u30ab\u30e9\u30fc\u30b3\u30fc\u30c9\u3092\u5c0f\u6587\u5b57\u306b\u3059\u308b true", 2, function () {
			TParts.change("lower", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#fff!important;\n\tcolor : #ffffff !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u30ab\u30e9\u30fc\u30b3\u30fc\u30c9\u3092\u5c0f\u6587\u5b57\u306b\u3059\u308b true ok")
		});
		test("\u30a4\u30f3\u30c7\u30f3\u30c8\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("indent", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\nwhite-space: nowrap;\nbackground :#FFF!important;\ncolor : #FFFFFF !important ;\nmargin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n.black , .button {\ncolor:black;/*OK*/\nmargin: 0px;\nopacity:0.9;\npadding:3px 3px 3px 3px;\n}\n}", "\u30a4\u30f3\u30c7\u30f3\u30c8\u3092\u6d88\u3059 true ok")
		});
		test("\u6539\u884c\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("line", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\twhite-space: nowrap;\tbackground :#FFF!important;\tcolor : #FFFFFF !important ;\t margin:3px 3px 5px 3px;}@media screen and (max-device-width:480px){\t.black , .button {\t color:black;/*OK*/\t margin: 0px;\t opacity:0.9;\t padding:3px 3px 3px 3px;\t}}", "\u6539\u884c\u3092\u6d88\u3059 true ok")
		});
		test("\u30ab\u30f3\u30de\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("comma", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black,.button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u30ab\u30f3\u30de\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true ok")
		});
		test("\u30b3\u30ed\u30f3\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("colon", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space:nowrap;\n\tbackground:#FFF!important;\n\tcolor:#FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin:0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u30b3\u30ed\u30f3\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true ok")
		});
		test("\u30bb\u30df\u30b3\u30ed\u30f3\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("semicolon", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u30bb\u30df\u30b3\u30ed\u30f3\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true ok")
		});
		test("!important\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("important", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF!important;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "!important\u5468\u8fba\u306e\u7a7a\u767d\u3092\u6d88\u3059 true ok")
		});
		test("\u59cb\u3081\u6ce2\u62ec\u5f27\u306e\u7a7a\u767d\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("sc_bracket", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button{\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u59cb\u3081\u6ce2\u62ec\u5f27\u306e\u7a7a\u767d\u3092\u6d88\u3059 true ok")
		});
		test("\u7d42\u308f\u308a\u6ce2\u62ec\u5f27\u306e\u7a7a\u767d\u3092\u6d88\u3059 true", 2, function () {
			TParts.change("ec_bracket", !0);
			$sub.trigger("click");
			equal($aft.val(), ".white-space{\n\twhite-space: nowrap;\n\tbackground :#FFF!important;\n\tcolor : #FFFFFF !important ;\n\t margin:3px 3px 5px 3px;\n}\n@media screen and (max-device-width:480px){\n\t.black , .button {\n\t color:black;/*OK*/\n\t margin: 0px;\n\t opacity:0.9;\n\t padding:3px 3px 3px 3px;\n\t}\n}", "\u7d42\u308f\u308a\u6ce2\u62ec\u5f27\u306e\u7a7a\u767d\u3092\u6d88\u3059 true ok")
		});
		test("All false", function () {
			var ng = !1;
			$sub.off("click", Clicked);
			for (var i = 0; i < $cLen; i++) {
				TParts.reset().change(i, !1).change("option", !0);
				$sub.trigger("click");
				if ($aft.val() != str) ng = !0
			}
			equal(ng, !1, "All false ok")
		});
		test("\u5168\u90e8ON", 2, function () {
			TParts.init();
			$sub.trigger("click");
			equal($aft.val(), ".white-space{white-space:nowrap;background:#FFF!important;color:#FFF!important;margin:3px 3px 5px}@media screen and (max-device-width:480px){.black,.button{color:#000;margin:0;opacity:.9;padding:3px}}", "\u5168\u90e8ON ok")
		})
		test("option click",2,function(){
			var $option=TParts.custom("option");
			for(var i=0;i<2;i++){
				if($option.hasClass("checked")){
					$option.trigger("click");
					equal($("#option_menu").is(":hidden"),true,"changed hidden ok")
				}else{
					$option.trigger("click");
					equal($("#option_menu").is(":visible"),true,"changed visible ok")
				}
			}
		})
		test("option show click",2,function(){
			var $custom=$("#option_menu").find("div.customCheckBox").find("a"),$cLen=$custom.length
			for(var ii=0;ii<2;ii++){
				if($custom.eq(0).is(":visible")){
					$("#option_show").trigger("click")
					for(var i=0,check=true;i<$cLen;i++) $custom.eq(i).is(":visible")&&(check=false)
					equal(check,true,"changed hidden ok")
				}else{
					$("#option_show").trigger("click")
					for(var i=0,check=true;i<$cLen;i++) $custom.eq(i).is(":hidden")&&(check=false)
					equal(check,true,"changed visible ok")
				}
			}
		})
		test("option all click",2,function(){
			var $custom=$("#option_menu").find("div.customCheckBox").find("a"),$cLen=$custom.length
			$("#option_all").trigger("click")
			for(var i=0,check=true;i<$cLen;i++) $custom.eq(i).hasClass("checked")&&(check=false)
			equal(check,true,"change all non checked");
			$("#option_all").trigger("click")
			for(var i=0,check=true;i<$cLen;i++) !$custom.eq(i).hasClass("checked")&&(check=false)
			equal(check,true,"change all checked");
		})
	})
})(jQuery);