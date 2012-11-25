(function(window,$){
	$(function () {
		$("body").on("dragover",function(event){
			event.preventDefault();
			event.stopPropagation();
			return false;
		});
		var $rform = $("#rform"),
			$lform=$("#lform"),
			$options=$rform.find("#options");
		if(JSON.parse(localStorage.getItem("input_option"))!=null){
			var InputOption=JSON.parse(localStorage.getItem("input_option")),
			SelectOption=JSON.parse(localStorage.getItem("select_option"));
			for(var i=0,$input=$options.find("input"),j=$input.length;i<j;i++){
				$input.eq(i).attr("checked",InputOption[$input.eq(i).attr("id")]);
			}
			for(var i=0,$select=$options.find("select"),j=$select.length;i<j;i++){
				$select.eq(i).val(SelectOption[$select.eq(i).attr("id")]);
			}
		}
		$rform.css3form();
		var $menu = $rform.find("#option_menu"),
			$option=$rform.find("#option"),
			$custom = $menu.find(".customCheckBox").find("a"),
			$customWid = $custom.css("width"),
			$option_show = $menu.find("#option_show"),
			InputOption={};
		$menu.show().find("input").on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();
			if(window.e.altKey){
				$menu.find("input").removeAttr("checked")
				$custom.removeClass("checked");
				$(this).attr("checked", "checked");
			}
		});
		var $menuWid = $menu.css("width");
		$menu.hide()
		$lform.on("click", ".select,.reset", function (e) {
			/*リセットボタンとセレクトボタンを押した時に選択状態にする*/
			e.stopPropagation();
			$(this).siblings("textarea").select()
		}).find("#bef").on("drop",function(event){
			event.preventDefault();
			event.stopPropagation();
			event=event.originalEvent;
			var files=event.dataTransfer.files;
			for(var i=0,j=files.length;i<j;i++){
				var reader=new FileReader(),f=files[i];
				reader.readAsText(f, InputOption.encode);
				reader.onload=function(){$(this).val(reader.result);$("#compress").trigger("click")}
			}
		}).select();
		$option.on("click",function (e) {
			e.preventDefault();
			e.stopPropagation();
			if($option.attr("checked")) {
				$menu.animate({
					width: "0"
				}, function () {
					$menu.hide();
					$custom.show().css("width", $customWid)
				});
				$option_show.removeClass("show hide").addClass("show");
			} else {
				$menu.css({
					width: "0"
				}).show().animate({
					width: $menuWid
				});
			}
		});
		$option_show.on("click",function (e) {
			e.preventDefault();
			e.stopPropagation();
			if($custom.is(":visible")) {
				$custom.animate({
					width: "0"
				}, function () {
					$custom.hide()
				});
				$option_show.removeClass("show hide").addClass("hide");
			} else {
				$custom.css({
					width: "0"
				}).show().animate({
					width: $customWid
				});
				$option_show.removeClass("show hide").addClass("show")
			}
		});
		$rform.find("#save").on("click",function(e){
			e.preventDefault();
			e.stopPropagation();
			for(var i=0,$input=$options.find("input"),j=$input.length;i<j;i++){
				InputOption[$input.eq(i).attr("id")]=$input.eq(i).attr("checked")=="checked";
			}
			for(var i=0,$select=$options.find("select"),j=$select.length;i<j;i++){
				SelectOption[$select.eq(i).attr("id")]=$select.eq(i).val();
			}
			localStorage.setItem("input_option",JSON.stringify(InputOption));
			localStorage.setItem("select_option",JSON.stringify(SelectOption));
			/*オプション設定の保存*/
		});
		$("#compress").on("click",function (e) {
			e.preventDefault();
			e.stopPropagation();
			function cb(g) {
				/*バイト数カウント*/
				for(var c = d = 0, b = g.length; d < b; d++) c += 4 > escape(g.charAt(d)).length ? 1 : 2;
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
			String.prototype.count = function (a) {
				for(var cnt = i = 0; - 1 != this.indexOf(a, i);) {
					i = this.indexOf(a, i) + 1, cnt++;
				}
				return cnt
			}
	
			function makeshort(str, pm) {
				var block_pattern = /([.#\w ,:-\[\]=\"\']+?)\{([\s\S]*?)\}/gim,
					block = str.match(block_pattern),
					beforeblock = str.match(block_pattern),
					bj = block != null ? block.length : 0,
					bi = 0,
					pattern = new RegExp("(" + pm + "(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?))", "gim");
				for(; bi < bj; bi++) {
					var before = block[bi].match(/([.#\w ,:-\[\]=\"\']+?)\{([\s\S]*?)\}/im)[2],
						properties = before,
						paddings = properties.match(pattern);
					if(paddings != null) {
						var ptop = null,pbottom = null,pright = null,pleft = null;
						for(var i = 0, j = paddings.length; i < j; i++) {
							paddings[i] = paddings[i].replace(pattern, "$1:$2").split(":");
							paddings[i][1] = paddings[i][1].replace(/;$/, "");
							var property = paddings[i][0].toLowerCase();
							
							if(property == pm){
								a = paddings[i][1].replace(/;/g, "").replace(/ /g, ",").split(",");
								g = a.length;
								if(2 == g) ptop = a[0],pright = a[1],pbottom = a[0],pleft = a[1];
								else if(3 == g) ptop = a[0],pright = a[1],pbottom = a[2],pleft = a[1];
								else if(4 == g) ptop = a[0],pright = a[1],pbottom = a[2],pleft = a[3];
								else ptop = a[0],pright = a[0],pbottom = a[0],pleft = a[0];
							}else if(property == pm + "-top") ptop = paddings[i][1];
							else if(property == pm + "-right") pright = paddings[i][1];
							else if(property == pm + "-bottom") pbottom = paddings[i][1];
							else if(property == pm + "-left") pleft = paddings[i][1];
						}
						if(ptop != null && pright != null && pleft != null && pbottom != null) {
							var c = ptop == pright && ptop == pbottom && ptop == pleft ? ptop : ptop == pbottom && pright == pleft && ptop != pright ? ptop + " " + pright : pright == pleft && ptop != pbottom ? ptop + " " + pright + " " + pbottom : ptop + " " + pright + " " + pbottom + " " + pleft,
								j = properties.match(pattern),
								j = j != null ? j.length : 0,
								i = 0;
							properties = properties.replace(RegExp("(" + pm + "(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?)([\r\n]?))", "gim"), function (a, b, cc, d,endl) {
								d = d || "";
								if(++i == j) {
									return pm + ":" + c + d+endl;
								} else {
									return ""
								}
							})
							block[bi] = block[bi].replace(before, properties);
						}
					}
				}
				for(var i = 0; i < bj; i++) {
					if(beforeblock[i] != block[i]) str = str.replace(beforeblock[i], block[i])
				}
				str = str.replace(RegExp("(" + pm + "[\s]?:[\s]?)([^;$]+?[;$])", "gi"), function (a, property, b) {
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
					return property + result
				})
				return str
			}
			var b = $lform.find("#bef").val(),
				beforeSize = cb(b),
				m = Math;
			for(var i=0,$input=$options.find("input"),j=$input.length;i<j;i++){
				InputOption[$input.eq(i).attr("id")]=$input.eq(i).attr("checked");
			}
			if(InputOption.comment) b = b.replace(/(\/\*([\s]|.)+?\*\/)/g, "");/*コメントの削除*/
			if(InputOption.zero) b = b.replace(/(\D)[0](?:em|px|%)/g, "$10");/*0pxなどの単位を削除*/
			if(InputOption.decimals) b = b.replace(/([\D])0\.(\d)/g, "$1.$2");/*0.nの0を削除*/
			if("checked" != InputOption.option) {
				/*一部圧縮の際のオプション*/
				b = b.replace(/^[\s]*/gm, "")
					.replace(/[\r\n]/g, "")
					.replace(/[\t ]*([,:;\{]|(?:!important))[\t ]*/g, "$1")
					.replace(/[\t ]*;[\t ]*\}[\t\d]*/g, "}")
					.replace(/(^\t )+[\t ]*}[\t ]*/g, "$1}");
				/*上からインデント、改行、いらないスペース、いらないセミコロン、いらない}前後の空白の削除*/
			} else {
				if(InputOption.indent) b = b.replace(/^[\s]*/gm, "");			/*インデント*/
				if(InputOption.line) b = b.replace(/[\r\n]/g, "");				/*改行*/
				if(InputOption.comma) b = b.replace(/[\t ]*[,][\t ]*/g, ",");		/*コンマ周辺のスペース*/
				if(InputOption.colon) b = b.replace(/[\t ]*[:][\t ]*/g, ":");		/*コロン周辺のスペース*/
				if(InputOption.semicolon) b = b.replace(/[\t ]*[;][\t ]*/g, ";");	/*セミコロン周辺のスペース*/
				if(InputOption.sc_bracket) b = b.replace(/[\t ]*[\{][\t ]*/g, "{");/*{周辺のスペース*/
				if(InputOption.important) b = b.replace(/[\t ]*(!important)[\t ]*/g, "$1")
				if(InputOption.ec_bracket) b = b.replace(/[\t ]*;[\t ]*\}[\t\d]*/g, "}").replace(/(^\t )+[\t ]*\}[\t ]*/g, "$1}");/*}周辺のスペース*/
			}
			/*	if (InputOption.font && (block = b.match(/([\#\w\.\, \:\[\]\"\'=-\_]+?)\{([^\{\}]*?)\}/g))) {
				h = 0;
				for (e = block.length; h < e; h++) if (selector = block[h].match(/([\#\w\.\, \:\[\]\"\'=-\_]+?)\{([^\{\}]*?)\}/)[1], pro = block[h].match(/([\#\w\.\, \:\[\]\"\'=-\_]+?)\{([^\{\}]*?)\}/)[2], truepro = "", font = [], (fonts = pro.match(/(font-size):(.+?)[\r\n;\}]/gi)) && (fonts = pro.match(/(font-family):(.+?)[\r\n;\}]/gi))) pro = g("(font-style|font-variant|font-weight)"), pro = g("(font-size)"), pro = g("(line-height)"), pro = g("(font-family)"), 0 != font.length && (pro = "font:" + font.join(" ") + ";\n" + pro), truepro = selector + "{" + pro + "}", re = RegExp(block[h]), b = b.replace(re, truepro)
			}*/
			if(InputOption.color_name) {
				/*カラーネームの最適化*/
				var color = {
					aliceblue: "#F0F8FF",
					antiquewhite: "#FAEBD7",
					aquamarine: "#7FFFD4",
					black: "#000",
					blanchedalmond: "#FFEBCD",
					blueviolet: "#8A2BE2",
					burlywood: "#DEB887",
					cadetblue: "#5F9EA0",
					chartreuse: "#7FFF00",
					chocolate: "#D2691E",
					cornflowerblue: "#6495ED",
					cornsilk: "#FFF8DC",
					darkblue: "#00008B",
					darkcyan: "#008B8B",
					darkgoldenrod: "#B8860B",
					darkgray: "#A9A9A9",
					darkgreen: "#006400",
					darkkhaki: "#BDB76B",
					darkmagenta: "#8B008B",
					darkolivegreen: "#556B2F",
					darkorange: "#FF8C00",
					darkorchid: "#9932CC",
					darksalmon: "#E9967A",
					darkseagreen: "#8FBC8F",
					darkslateblue: "#483D8B",
					darkslategray: "#2F4F4F",
					darkturquoise: "#00CED1",
					darkviolet: "#9400D3",
					deeppink: "#FF1493",
					deepskyblue: "#00BFFF",
					dodgerblue: "#1E90FF",
					firebrick: "#B22222",
					floralwhite: "#FFFAF0",
					forestgreen: "#228B22",
					fuchsia: "#F0F",
					gainsboro: "#DCDCDC",
					ghostwhite: "#F8F8FF",
					goldenrod: "#DAA520",
					greenyellow: "#ADFF2F",
					honeydew: "#F0FFF0",
					indianred: "#CD5C5C",
					lavendar: "#E6E6FA",
					lavenderblush: "#FFF0F5",
					lawngreen: "#7CFC00",
					lemonchiffon: "#FFFACD",
					lightblue: "#ADD8E6",
					lightcoral: "#F08080",
					lightcyan: "#E0FFFF",
					lightgoldenrodyellow: "#FAFAD2",
					lightgray: "#D3D3D3",
					lightgreen: "#90EE90",
					lightpink: "#FFB6C1",
					lightsalmon: "#FFA07A",
					lightseagreen: "#20B2AA",
					lightskyblue: "#87CEFA",
					lightslategray: "#789",
					lightsteelblue: "#B0C4DE",
					lightyellow: "#FFFFE0",
					limegreen: "#32CD32",
					magenta: "#F0F",
					mediumaquamarine: "#66CDAA",
					mediumblue: "#0000CD",
					mediumorchid: "#BA55D3",
					mediumpurple: "#9370DB",
					mediumseagreen: "#3CB371",
					mediumslateblue: "#7B68EE",
					mediumspringgreen: "#00FA9A",
					mediumturquoise: "#48D1CC",
					mediumvioletred: "#C71585",
					midnightblue: "#191970",
					mintcream: "#F5FFFA",
					mistyrose: "#FFE4E1",
					moccasin: "#FFE4B5",
					navajowhite: "#FFDEAD",
					olivedrab: "#6B8E23",
					orangered: "#FF4500",
					palegoldenrod: "#EEE8AA",
					palegreen: "#98FB98",
					paleturquoise: "#AFEEEE",
					palevioletred: "#DB7093",
					papayawhite: "#FFEFD5",
					peachpuff: "#FFDAB9",
					powderblue: "#B0E0E6",
					rosybrown: "#BC8F8F",
					royalblue: "#4169E1",
					saddlebrown: "#8B4513",
					sandybrown: "#F4A460",
					seagreen: "#2E8B57",
					seashell: "#FFF5EE",
					slateblue: "#6A5ACD",
					slategray: "#708090",
					springgreen: "#00FF7F",
					steelblue: "#4682B4",
					turquoise: "#40E0D0",
					white: "#FFF",
					whitesmoke: "#F5F5F5",
					yellow: "#FF0",
					yellowgreen: "#9ACD32",
					"#F0FFFF": "azure",
					"#F5F5DC": "beige",
					"#FFE4C4": "bisque",
					"#A52A2A": "brown",
					"#FF7F50": "coral",
					"#FFD700": "gold",
					"#808080": "gray",
					"#008000": "green",
					"#4B0082": "indigo",
					"#FFFFF0": "ivory",
					"#F0E68C": "khaki",
					"#FAF0E6": "linen",
					"#800000": "maroon",
					"#000080": "navy",
					"#808000": "olive",
					"#FFA500": "orange",
					"#DA70D6": "orchid",
					"#CD853F": "peru",
					"#FFC0CB": "pink",
					"#DDA0DD": "plum",
					"#800080": "purple",
					"#F00": "red",
					"#FA8072": "salmon",
					"#A0522D": "sienna",
					"#C0C0C0": "silver",
					"#FFFAFA": "snow",
					"#D2B48C": "tan",
					"#008080": "teal",
					"#FF6347": "tomato",
					"#EE82EE": "violet",
					"#F5DEB3": "wheat"
				}, h;
				for(h in color) {
					if(-1 != b.indexOf(h)) b = b.replace(RegExp("([: ,)(]|[\t ]?:[\t ]?)" + h + "((?:!important)|[, )(;}\n\r])", "gim"), "$1" + color[h] + "$2")
				}
			}
			if(-1 != b.indexOf("padding") && InputOption.padding) b = makeshort(b, "padding");/*パディング最適化*/
			if(-1 != b.indexOf("margin") && InputOption.margin) b = makeshort(b, "margin");/*マージン最適化*/
			if(InputOption.color) b = b.replace(/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, "#$1$2$3");/*カラーを6桁から3桁へ*/
			var afterSize = cb(b);
			$lform.find("#aft").val(b).select();
			if(1024 > beforeSize) {
				$rform.find("#results").find("#befB").text(beforeSize + " B")
					.end().find("#aftB").text(afterSize + " B")
					.end().find("#minus").text(beforeSize == afterSize ? "±0B" : "-" + (beforeSize - afterSize) + " B");
			} else {
				$rform.find("#results").find("#befB").text(m.floor(beforeSize / 1024) + " KB(" + beforeSize + " B)")
					.end().find("#aftB").text(m.floor(afterSize / 1024) + " KB(" + afterSize + " B)")
					.end().find("#minus").text(beforeSize == afterSize ? "±0B" : "-" + m.floor((beforeSize - afterSize) / 1024) + " KB(" + (beforeSize - afterSize) + " B)");
			}
			$("#mes").not(":animated").addClass("on").fadeTo(1500, 0.3,function(){$(this).removeClass("on")})
		});
	});
}(this,jQuery));