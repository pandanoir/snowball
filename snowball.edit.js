/*skOuterClick - A simple event-binder-plugin to handle click events of outside elements.(c) 2012 SUKOBUTO.*/(function(e,f){e.fn.skOuterClick=function(c){var a={init:function(c){var b=[$(this)],a=arguments.length;if(1<a)for(i=1;i<a;i++)b[b.length]=arguments[i];return this.each(function(){var a=this,d=!1,g;for(g in b)e(f.document).find(b[g]).on("click",function(){d=!0}).on("mouseleave",function(){d=!1});e(f.document).on("click",function(b){d?d=!1:c.call(a,b)})})}};if(a[c])return a[c].apply(this,Array.prototype.slice.call(arguments,1));if("function"===typeof c)return a.init.apply(this,arguments)}})(jQuery,this);
(function(window,$){
	$(function () {
		$("body").on("dragover",function(event){
			event.preventDefault();
			event.stopPropagation();
			return false;
		});
		var $rform = $("#rform"),
			$lform=$("#lform"),
			$compress=$lform.find("#compress"),
			$options=$rform.find("#options"),
			$input=$options.find("input"),
			$select=$options.find("select"),
			$menu = $options.find("#option_menu"),
			$option=$options.find("#option"),
			$option_show = $menu.find("#option_show"),
			$option_all = $menu.find("#option_all"),
			$aft=$lform.find("#aft"),
			$bef=$lform.find("#bef"),
			ls=localStorage,
			$json=JSON,
			toggle=true,
			App={trace:!0,log:function(){if(this.trace&&"undefined"!=typeof console){console.log.apply(console,arguments)}}};
			
		if($json.parse(ls.getItem("input_option"))!=null){
			var InputOption=$json.parse(ls.getItem("input_option")),
			SelectOption=$json.parse(ls.getItem("select_option"));
			for(var i=0,j=$input.length;i<j;i++){
				if(InputOption[$input.eq(i).attr("id")]) $input.eq(i).attr("checked",true);
				else $input.eq(i).attr("checked",false);
			}
			for(var i=0,j=$select.length;i<j;i++){
				$select.eq(i).val(SelectOption[$select.eq(i).attr("id")]);
			}
			//オプション設定の読み込み
		}else{
			var InputOption={},SelectOption={};
			for(var i=0,j=$input.length;i<j;i++){
				InputOption[$input.eq(i).attr("id")]=$input.eq(i).attr("checked");
			}
			for(var i=0,j=$select.length;i<j;i++){
				SelectOption[$select.eq(i).attr("id")]=$select.eq(i).find("option:selected").val();
			}
		}
		$rform.css3form();
		var $custom = $menu.find(".customCheckBox").find("a"),
			$customWid = $custom.css("width"),
			$menuWid = $menu.css("width");
		$menu.skOuterClick(function(){
			if($custom.is(":visible")) $option_show.trigger("click");
			//Outerクリックの設定
		},$option,$bef,$aft,$option_all);
		$lform.on("click", ".select , .reset", function (event) {
			//リセットボタンとセレクトボタンを押した時に選択状態にする
			event.stopPropagation();
			$(this).siblings("textarea").select()
		}).on("click","#compress",compress).find("#bef").select();
		if(window.File){
			$bef.on("dragenter",function(event){
				event.preventDefault();
				event.stopPropagation();
			}).on("dragover",function(event){
				event.originalEvent.dataTransfer.dropEffect="copy";
				event.preventDefault();
				event.stopPropagation();
			}).on("drop",function(event){
				//ドラッグアンドドロップ
				event.preventDefault();
				event.stopPropagation();
				event=event.originalEvent;
				var files=event.dataTransfer.files;
				SelectOption.encode=$select.filter("#encode").find("option:selected").val();
				for(var i=0,j=files.length;i<j;i++){
					var reader=new FileReader(),f=files[i];
					reader.readAsText(f, SelectOption.encode);
					reader.onload=$.proxy(function(){
						$(this).val(reader.result);
						$compress.trigger("click")
					},this)
				}
				files=reader=event=void 0;
			})
		}else{
			$bef.attr("placeholder","ここにコードをペーストしてください。どうやらお使いのブラウザではドラッグアンドドロップは対応していないようです。");
		}
		$(window).on("keydown",function(e){
			if( !((!e.metaKey&&e.ctrlKey)||(e.metaKey&&!e.ctrlKey)) ) return;
			if(e.keyCode==13) $compress.trigger("click")//Ctrl+Enterで圧縮
			else if(e.altKey&&(e.keyCode==80||e.keyCode==83)){
				event.preventDefault();
				event.stopPropagation();
				$compress.trigger("click");
				if(e.keyCode==80) $aft.val($aft.val().replace(/(http:\/\/)/g,"//"));//http://を省略
				else $aft.val($aft.val().replace(/(https:\/\/)/g,"//"));//https://を省略
				return false;
			}
		})
		$option.on("click",function (e) {
			e.stopPropagation();
			if($custom.is(":animated")||$menu.is(":animated")) return;
			else if($option.attr("checked")) {
				//メニューが表示されていたら非表示にする
				$option_show.text("Show");
				$menu.stop(true,false).animate({
					width: "0"
				},200, function () {
					$menu.hide();
					$custom.show().css("width", $customWid)
				})
				$option_show.removeClass("show hide").addClass("show");
			} else {
				//メニューが非表示だったら表示する
				$option_show.text("Hide");
				$menu.css({
					width: "0"
				}).show().stop(true,false).animate({
					width: $menuWid
				},200);
			}
		});
		$option_show.on("click",function (e) {
			e.preventDefault();
			e.stopPropagation();
			if($custom.is(":animated")||$menu.is(":animated")) return;
			else if($custom.is(":visible")) {
				//チェックボックスが表示されてたら非表示にする
				$option_show.text("Show");
				$custom.stop(true,false).animate({
					width: "0"
				},200, function () {
					$custom.hide()
				});
				$option_show.removeClass("show hide").addClass("hide");
			} else {
				//チェックボックスが非表示だったら表示する
				$option_show.text("Hide");
				$custom.css({
					width: "0"
				}).show().stop(true,false).animate({
					width: $customWid
				},200);
				$option_show.removeClass("show hide").addClass("show")
			}
		});
		$option_all.on("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			//Allボタンの挙動
			if(!$custom.is(":visible")) return
			for(var i=0,j=$custom.length;i<j;i++){
				if(!toggle){
					if(!$custom.eq(i).hasClass("checked")) $custom.eq(i).trigger("click")
					//trueにする
				}else{
					if($custom.eq(i).hasClass("checked")) $custom.eq(i).trigger("click")
					//falseにする
				}
			}
			toggle=!toggle;
		});
		$rform.on("click","#save",function(event){
			event.preventDefault();
			event.stopPropagation();
			for(var i=0,j=$input.length;i<j;i++){
				InputOption[$input.eq(i).attr("id")]=($input.eq(i).attr("checked")=="checked");
			}
			for(var i=0,$select=$options.find("select"),j=$select.length;i<j;i++){
				SelectOption[$select.eq(i).attr("id")]=$select.eq(i).find("option:selected").val();
			}
			ls.setItem("input_option",$json.stringify(InputOption));
			ls.setItem("select_option",$json.stringify(SelectOption));
			//オプション設定の保存
		})
		function compress(event) {
			event.preventDefault();
			event.stopPropagation();
			function cb(g) {
				//バイト数カウント
				for(var c = d = 0, b = g.length; d < b; d++) c += 4 > escape(g.charAt(d)).length ? 1 : 2;
				b=d=void 0;
				return c
			}
			/*		function g(a) {
				var b = pro,c = fonts,a = a + "(.+?)[\r\n;}]",f=0;
				if (c = b.match(RegExp(a, "gi"))) {
					b = b.replace(RegExp(a, "i"), "");
					for (a = c.length; f < a; f++){
						font[font.length] = c[f].match(/(.+?)[:](.+?)[\r\n;\}]/)[2]
					}
				}
				return b
			}*/
			/*Temp 文字列中かどうか
			function matchStr(point,str) {
				var i = 0,start = end = null;
				while(true){
					for (; - 1 != str.indexOf('"', i);) {
						if (str.indexOf("\\", i) > str.indexOf('"', i) || str.indexOf("\\",i)==-1) {
							if (null == start){
								start = str.indexOf('"', i);
								i=start+1;
								if(i>point) return false;
							}else if (null == end) {
								end = str.indexOf('"', i);
								i=end+1;
								if(end>point && start<point) return true
								else if(i>point) break
							}
						} else {
							i = str.indexOf("\\", i) + 2;
						}
					}
				}
				return false
			};
			*/
			function makeshort(str, pm) {
				var block_pattern = /([.#\w ,:-\[\]=\"\']+?)\{([\s\S]*?)\}/gim,
					block = str.match(block_pattern),
					beforeblock = str.match(block_pattern),
					bj = block != null ? block.length : 0,
					bi = 0,
					pattern = new RegExp("(" + pm + "(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?))", "gim");
				for(; bi < bj; bi++) {
					var before = block[bi].match(/([.#\w ,:-\[\]=\"\']+?)\{([\s\S]*?)\}/im)[2],
						properties = block[bi].match(/([.#\w ,:-\[\]=\"\']+?)\{([\s\S]*?)\}/im)[2],
						paddings = properties.match(pattern);

					if(paddings != null) {
						var paddingsData={top:null,bottom:null,right:null,left:null};
						for(var i = 0, j = paddings.length; i < j; i++) {
							paddings[i] = paddings[i].replace(pattern, "$1:$2").split(":");
							paddings[i][1] = paddings[i][1].replace(/;$/, "");
							var property = paddings[i][0].toLowerCase();
							
							if(property == pm){
								a = paddings[i][1].replace(/;/g, "").replace(/ /g, ",").split(",");
								g = a.length;
								if(2 == g) paddingsData.t = paddingsData.b = a[0],paddingsData.r = paddingsData.l = a[1];
								else if(3 == g) paddingsData.t = a[0],paddingsData.r = paddingsData.l = a[1],paddingsData.b = a[2];
								else if(4 == g) paddingsData.t = a[0],paddingsData.r = a[1],paddingsData.b = a[2],paddingsData.l = a[3];
								else paddingsData.t = paddingsData.r = paddingsData.b = paddingsData.l = a[0];
							}else if(property == pm + "-top") paddingsData.t = paddings[i][1];
							else if(property == pm + "-right") paddingsData.r = paddings[i][1];
							else if(property == pm + "-bottom") paddingsData.b = paddings[i][1];
							else if(property == pm + "-left") paddingsData.l = paddings[i][1];
						}
						if(paddingsData.t != null && paddingsData.r != null && paddingsData.l != null && paddingsData.b != null) {
							var c = paddingsData.t == paddingsData.r && paddingsData.t == paddingsData.b && paddingsData.t == paddingsData.l ?
									paddingsData.t
								: paddingsData.t == paddingsData.b && paddingsData.r == paddingsData.l && paddingsData.t != paddingsData.r ?
									paddingsData.t + " " + paddingsData.r
								: paddingsData.r == paddingsData.l && paddingsData.t != paddingsData.b ?
									paddingsData.t + " " + paddingsData.r + " " + paddingsData.b
								: paddingsData.t + " " + paddingsData.r + " " + paddingsData.b + " " + paddingsData.l,
								j = properties.match(pattern),
								j = j != null ? j.length : 0,
								i = 0;
							properties = properties.replace(RegExp("("+pm+"(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?)([\r\n]?))","gim"),function (a,b,cc,d,endl){
								if(++i == j) {
									return pm + ":" + c + (d||"")+endl;
								} else {
									return ""
								}
							})
							block[bi] = block[bi].replace(before, properties);
							properties=i=j=void 0;
						}
						paddingsData=void 0;
					}
				}
				for(var i = 0; i < bj; i++) {
					if(beforeblock[i] != block[i]) str = str.replace(beforeblock[i], block[i])
				}
				blockpattern=pattern=beforeblock=block=before=properties=paddings=property=bi=bj=void 0;
				return str.replace(RegExp("(" + pm + "[\s]?:[\s]?)([^;$]+?[;$])", "gi"), function (a, property, b) {
					var values = b.replace(/ /g, ",").split(","),
						d = values.length,
						result = b;
					if(d == 2) {
						if(values[0] == values[1]) result = values[0]
					} else if(d == 3) {
						if(values[0] == values[2]) {
							if(values[0] == values[1]) result = values[0]
							else result = values[0] + " " + values[1]
						}
					} else if(d == 4) {
						if(values[1] == values[3]) {
							if(values[0] == values[2]) {
								if(values[0] != values[1]) result = values[0] + " " + values[1]
							} else {
								result = values[0] + " " + values[1] + " " + values[2]
							}
						}
					}
					property=property + result
					d=values=result=void 0;
					return property
				})
			}
			var b = $bef.val(),
				beforeSize = cb(b),
				m = Math;
			for(var i=0,j=$input.length;i<j;i++){
				InputOption[$input.eq(i).attr("id")]=$input.eq(i).attr("checked");
			}
			var InputPartOption={
				"comment":[/(\/\*([\s]|.)+?\*\/)/g, ""],//コメントの削除
				"zero":[/(\D)[0](?:em|px|%)/g, "$10"],//0pxなどの単位を削除
				"decimals":[/([\D])0\.(\d)/g, "$1.$2"]//0.nの0を削除
			}
			$.each(InputPartOption,function(Chara,replaces){
				if(InputOption[Chara]) b=b.replace(replaces[0],replaces[1]);
			});
			InputPartOption=void 0;
			if(!InputOption.option) {
				//一部圧縮の際のオプション
				b = b.replace(/^[\s]*/gm, "")
					.replace(/[\r\n]/g, "")
					.replace(/[\t ]*([,:;\{]|(?:!important))[\t ]*/g, "$1")
					.replace(/[\t ]*;[\t ]*\}[\t\d]*/g, "}")
					.replace(/([^\t ]+?)[\t ]*}[\t ]*/g, "$1}");
				//上からインデント、改行、いらないスペース、いらないセミコロン、いらない}前後の空白の削除
			} else {
				var InputPartOption={
					"indent":[/^[\s]*/gm,""],//インデント
					"line":[/[\r\n]/g, ""],//改行
					"comma":[/[\t ]*[,][\t ]*/g, ","],//コンマ周辺のスペース
					"colon":[/[\t ]*[:][\t ]*/g, ":"],//コロン周辺のスペース
					"semicolon":[/[\t ]*[;][\t ]*/g, ";"],//セミコロン周辺のスペース
					"sc_bracket":[/[\t ]*[\{][\t ]*/g, "{"],//{周辺のスペース
					"important":[/[\t ]*(!important)[\t ]*/g, "$1"],//!important周辺のスペース
					"ec_bracket":[/[\t ]*;[\t ]*\}[\t\d]*/g, "}"],//}周辺のスペース
					"ec_bracket":[/([^\t ]+?)[\t ]*\}[\t ]*/g, "$1}"]//}周辺のスペース
				}
				$.each(InputPartOption,function(Chara,replaces){
					if(InputOption[Chara]) b=b.replace(replaces[0],replaces[1]);
				})
				InputPartOption=void 0;
			}
			/*	if (InputOption.font && (block = b.match(/([\#\w\.\, \:\[\]\"\'=-\_]+?)\{([^\{\}]*?)\}/g))) {
				h = 0;
				for (e = block.length; h < e; h++) if (selector = block[h].match(/([\#\w\.\, \:\[\]\"\'=-\_]+?)\{([^\{\}]*?)\}/)[1], pro = block[h].match(/([\#\w\.\, \:\[\]\"\'=-\_]+?)\{([^\{\}]*?)\}/)[2], truepro = "", font = [], (fonts = pro.match(/(font-size):(.+?)[\r\n;\}]/gi)) && (fonts = pro.match(/(font-family):(.+?)[\r\n;\}]/gi))) pro = g("(font-style|font-variant|font-weight)"), pro = g("(font-size)"), pro = g("(line-height)"), pro = g("(font-family)"), 0 != font.length && (pro = "font:" + font.join(" ") + ";\n" + pro), truepro = selector + "{" + pro + "}", re = RegExp(block[h]), b = b.replace(re, truepro)
			}*/
			if(InputOption.color_name) {
				//カラーネームの最適化
				var color = {aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aquamarine:"#7fffd4",black:"#000",blanchedalmond:"#ffebcd",blueviolet:"#8a2be2",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",greenyellow:"#adff2f",honeydew:"#f0fff0",indianred:"#cd5c5c",lavendar:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",limegreen:"#32cd32",magenta:"#f0f",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",olivedrab:"#6b8e23",orangered:"#ff4500",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhite:"#ffefd5",peachpuff:"#ffdab9",powderblue:"#b0e0e6",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",slateblue:"#6a5acd",slategray:"#708090",springgreen:"#00ff7f",steelblue:"#4682b4",turquoise:"#40e0d0",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32","#f0ffff":"azure","#f5f5dc":"beige","#ffe4c4":"bisque","#a52a2a":"brown","#ff7f50":"coral","#ffd700":"gold","#808080":"gray","#008000":"green","#4b0082":"indigo","#fffff0":"ivory","#f0e68c":"khaki","#faf0e6":"linen","#800000":"maroon","#000080":"navy","#808000":"olive","#ffa500":"orange","#da70d6":"orchid","#cd853f":"peru","#ffc0cb":"pink","#dda0dd":"plum","#800080":"purple","#f00":"red","#fa8072":"salmon","#a0522d":"sienna","#c0c0c0":"silver","#fffafa":"snow","#d2b48c":"tan","#008080":"teal","#ff6347":"tomato","#ee82ee":"violet","#f5deb3":"wheat"
				}, h;
				for(h in color) {
					if(-1 != b.indexOf(h)){
						b = b.replace(RegExp("([: ,\)\(]|[\t ]?:[\t ]?)([^;\{\}]*?)" + h + "((?:!important)|[, )(;}\n\r])", "gim"), "$1$2" + color[h] + "$3")
					}
				
				}
				color=void 0;
			}
			if(-1 != b.indexOf("padding") && InputOption.padding) b = makeshort(b, "padding");//パディング最適化
			if(-1 != b.indexOf("margin") && InputOption.margin) b = makeshort(b, "margin");//マージン最適化
			if(InputOption.color) b = b.replace(/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, "#$1$2$3");//カラーを6桁から3桁へ
			if(InputOption.lower){
				var block_pattern = /([.#\w ,:-\[\]=\"\']+?)\{([\s\S]*?)\}/gim,
					block = b.match(block_pattern),
					beforeblock = b.match(block_pattern);
				if(block != null ){
					for(var i=0,j=block.length;i<j;i++){
						block[i] = block[i].replace(/([: ,)(]|[\t ]?:[\t ]?)(#[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?)/g, function(all,prop,one){
							return prop+(one.toLowerCase())
						});//カラーを小文字か大文字に
						b=b.replace(beforeblock[i],block[i])
					}
				}
				block_pattern=beforeblock=block=void 0;
			}
			var afterSize = cb(b);
			$aft.val(b).select();
			if(1024 > beforeSize) {
				$rform.find("#results").find("#befB").text(beforeSize + " B")
					.end().find("#aftB").text(afterSize + " B")
					.end().find("#minus").text(beforeSize == afterSize ? "±0B(0%)" : "-" + (beforeSize - afterSize) + " B("+(100-afterSize*100/beforeSize).toFixed(2)+"%)");
			} else {
				$rform.find("#results").find("#befB").text(m.floor(beforeSize / 1024) + " KB(" + beforeSize + " B)")
					.end().find("#aftB").text(m.floor(afterSize / 1024) + " KB(" + afterSize + " B)")
					.end().find("#minus").text(beforeSize == afterSize ? "±0B(0%)" : "-" + m.floor((beforeSize - afterSize) / 1024) + " KB(" + (beforeSize - afterSize) + " B)("+(100-afterSize*100/beforeSize).toFixed(2)+"%)");
			}
			i=j=b=beforeSize=afterSize=m=void 0;
			$lform.find("#mes").stop(true,false).addClass("on").css("opacity","1").fadeTo(1500, 0.3,function(){$(this).removeClass("on")})
		}
	});
}(this,jQuery));