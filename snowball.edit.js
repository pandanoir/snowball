/*global $,escape */
(function (window, $) {
	$(function () {
		$("body").on("dragover", function (event) {
			event.pd().sp();
			return false;
		});
		var $rform = $("#rform"),
			$lform = $("#lform"),
			$compress = $lform.find("#compress"),
			$options = $rform.find("#options"),
			$input = $options.find("input"),
			$select = $options.find("select"),
			$menu = $options.find("#option_menu"),
			$option = $options.find("#option"),
			$option_all = $menu.find("#option_all"),
			$results = $rform.find("#results"),
			$aft = $lform.find("#aft"),
			$bef = $lform.find("#bef"),
			ls = localStorage,
			$json = JSON,
			toggle = true,
			App = {
				trace: true,
				log: function () {
					if (this.trace && "undefined" !== typeof console) {
						console.log.apply(console, arguments);
					}
				}
			},
			InputOption,
			SelectOption,
			i,
			j,
			$custom,
			$customWid,
			$menuWid;

		if ($json.parse(ls.getItem("input_option")) !== null) {
			InputOption = $json.parse(ls.getItem("input_option"));
			SelectOption = $json.parse(ls.getItem("select_option"));
			for (i = 0, j = $input.length; i < j; i += 1) {
				if (InputOption[$input.eq(i).attr("id")]) {
					$input.eq(i).attr("checked", true);
				} else {
					$input.eq(i).attr("checked", false);
				}
			}
			for (i = 0, j = $select.length; i < j; i += 1) {
				$select.eq(i).val(SelectOption[$select.eq(i).attr("id")]);
			}
			//オプション設定の読み込み
		} else {
			InputOption = {};
			SelectOption = {};
			for (i = 0, j = $input.length; i < j; i += 1) {
				InputOption[$input.eq(i).attr("id")] = $input.eq(i).attr("checked");
			}
			for (i = 0, j = $select.length; i < j; i += 1) {
				SelectOption[$select.eq(i).attr("id")] = $select.eq(i).find("option:selected").val();
			}
		}
		if ($option.attr("checked")) {
			$menu.show();
		} else {
			$options.css("border-left", "3px solid #CCC");
		}

		$rform.css3form();
		$custom = $menu.find("div.customCheckBox").find("a");
		$customWid = $custom.css("width");
		$menuWid = $menu.css("width");

		function compress(event) {
			function cb(g) {
				//バイト数カウント
				var c = 0, d = 0, b = g.length;
				while (d < b) {
					c += 4 > escape(g.charAt(d)).length ? 1 : 2;
					d += 1;
				}
				return c;
			}
			var b = $bef.val(),
				beforeSize = cb(b),
				m = Math;
			cssBlock.init(b);
			event.pd().sp();
			if (!$befB) {
				var $befB = $results.find("#befB")
			}
			if (!$aftB) {
				var $aftB = $results.find("#aftB")
			}
			if (!$minus) {
				var $minus = $results.find("#minus")
			}
			if (!$mes) {
				var $mes = $lform.find("#mes")
			}
			/*		function g(a) {
				var b = pro,c = fonts,a = a + "(.+?)[\r\n;}]",f = 0;
				if (c = b.match(RegExp(a, "gi"))) {
					b = b.replace(RegExp(a, "i"), "");
					for (a = c.length; f < a; f += 1) {
						font[font.length] = c[f].match(/(.+?)[:](.+?)[\r\n;\}]/)[2]
					}
				}
				return b
			}*/
			/*Temp 文字列中かどうか
			function matchStr(point,str) {
				var i = 0,start = end = null;
				while(true) {
					for (; - 1 != str.indexOf('"', i);) {
						if (str.indexOf("\\", i) > str.indexOf('"', i) || str.indexOf("\\",i)==-1) {
							if (null == start) {
								start = str.indexOf('"', i);
								i = start+1;
								if (i>point) return false;
							} else if (null == end) {
								end = str.indexOf('"', i);
								i = end+1;
								if (end>point && start < point) return true
								else if (i>point) break
							}
						} else {
							i = str.indexOf("\\", i) + 2;
						}
					}
				}
				return false
			};
			*/
			//makeshort開始
			function makeshort(str, pm) {
				cssBlock.init(str)
				var block = cssBlock.eq(),
					beforeblock = cssBlock.eq(),
					pattern = new RegExp("(" + pm + "(?:\-left|\-right|\-top|\-bottom)? ?: ?([^;$]+)([;$]?))", "gim");
				for (var bi = 0, bj = cssBlock.length; bi < bj; bi += 1) {
					var before = cssBlock.eq(bi),
						after = cssBlock.eq(bi),


						paddings = after.properties.match(pattern);

					if (paddings !== null) {
						var paddingsData = {
							t: null,
							b: null,
							r: null,
							l: null
						};
						for (var i = 0, j = paddings.length; i < j; i += 1) {
							paddings[i] = paddings[i].replace(pattern, "$1:$2").split(":");
							paddings[i][1] = paddings[i][1].replace(/;$/, "");
							var property = paddings[i][0].toLowerCase();

							if (property === pm) {
								a = paddings[i][1].replace(/;/g, "").replace(/ /g, ",").split(",");
								g = a.length;
								if (2 === g) paddingsData.t = paddingsData.b = a[0], paddingsData.r = paddingsData.l = a[1];
								else if (3 === g) paddingsData.t = a[0], paddingsData.r = paddingsData.l = a[1], paddingsData.b = a[2];
								else if (4 === g) paddingsData.t = a[0], paddingsData.r = a[1], paddingsData.b = a[2], paddingsData.l = a[3];
								else paddingsData.t = paddingsData.r = paddingsData.b = paddingsData.l = a[0];
							} else if (property === pm + "-top") paddingsData.t = paddings[i][1];
							else if (property === pm + "-right") paddingsData.r = paddings[i][1];
							else if (property === pm + "-bottom") paddingsData.b = paddings[i][1];
							else if (property === pm + "-left") paddingsData.l = paddings[i][1];
						}
						if (paddingsData.t !== null && paddingsData.r !== null && paddingsData.l !== null && paddingsData.b !== null) {
							var c = paddingsData.t === paddingsData.r && paddingsData.t === paddingsData.b && paddingsData.t === paddingsData.l ? paddingsData.t : paddingsData.t === paddingsData.b && paddingsData.r === paddingsData.l && paddingsData.t !== paddingsData.r ? paddingsData.t + " " + paddingsData.r : paddingsData.r === paddingsData.l && paddingsData.t !== paddingsData.b ? paddingsData.t + " " + paddingsData.r + " " + paddingsData.b : paddingsData.t + " " + paddingsData.r + " " + paddingsData.b + " " + paddingsData.l,
								jjj = after.properties.match(pattern),
								jjj = jjj !== null ? jjj.length : 0,
								iii = 0;
							after.properties = after.properties.replace(RegExp("(" + pm + "(?:\-left|\-right|\-top|\-bottom)? ?: ?([^;$]+)([;$]?)([\r\n]?))", "gim"), function (a, b, cc, d, endl) {
								iii += 1
								if (iii === jjj) {
									return pm + ":" + c + (d || "") + endl;
								} else {
									return ""
								}
							})
							block[bi].change(block[bi].string.replace(before.properties, after.properties));
						}
					}
				}
				for (var i = 0; i < bj; i += 1) {
					if (beforeblock[i].string !== block[i].string) str = str.replace(beforeblock[i].string, block[i].string)
				}
				return str.replace(RegExp("(" + pm + "[\s]?:[\s]?)([^;$]+?[;$])", "gi"), function (a, property, b) {
					var values = b.replace(/ /g, ",").split(","),
						d = values.length,
						result = b;
					if (d === 2) {
						if (values[0] === values[1]) result = values[0]
					} else if (d === 3) {
						if (values[0] === values[2]) {
							if (values[0] === values[1]) result = values[0]
							else result = values[0] + " " + values[1]
						}
					} else if (d === 4) {
						if (values[1] === values[3]) {
							if (values[0] === values[2]) {
								if (values[0] !== values[1]) result = values[0] + " " + values[1]
							} else {
								result = values[0] + " " + values[1] + " " + values[2]
							}
						}
					}
					property = property + result
					return property
				})
			}

			//makeshort終わり
			for (var i = 0, j = $input.length; i < j; i += 1) {
				InputOption[$input.eq(i).attr("id")] = $input.eq(i).attr("checked");
			}
			if (InputOption["comment"]) b = b.replace(/(\/\*([\s]|.)+?\*\/)/g, ""); //コメントの削除
			var InputPartOption = {
				"zero": [/(\D)[0](?:em|px|%)/g, "$10"], //0pxなどの単位を削除
				"decimals": [/([\D])0\.(\d)/g, "$1.$2"] //0.nの0を削除
			}
			$.each(InputPartOption, function (Chara, replaces) {
				if (InputOption[Chara]) {
					b=cssBlock.replace(b,replaces[0], replaces[1]); //0pxなどの単位を削除
				}
			});
			if (!InputOption.option) {
				//一部圧縮の際のオプション
				cssBlock.init(b)
				for (var i = 0, j = cssBlock.length; i < j; i += 1) {
					var now=cssBlock.eq(i);
					b = b.replace(now.string,now.string
							.replace(now.properties, now.properties.replace(/^[\s]*/gm, ""))
							.replace(/[\r\n]/g, "")
							.replace(/[\t ]*([,:;\{]|!important)[\t ]*/g, "$1")
							.replace(/[\t ]*;[\t ]*$/g, "")
							.replace(/([^\t ]+?)[\t ]*$/g, "$1"))
				}
				b=b.replace(/^[\t ]*/gm, "")
					.replace(/[\r\n]/g, "")
					.replace(/[\t ]*([,:;\{]|!important)[\t ]*/g, "$1")
					.replace(/[\t ]*;[\t ]*\}[\t\d]*/g, "}")
					.replace(/([^\t ]+?)[\t ]*\}[\t ]*/g, "$1}");
				//上からインデント、改行、いらないスペース、いらないセミコロン、いらない}前後の空白の削除
			} else {
				var InputPartOption = {
					"indent": [/^[\t ]*/gm, ""], //インデント
					"line": [/[\r\n]/g, ""], //改行
					"comma": [/[\t ]*,[\t ]*/g, ","], //コンマ周辺のスペース
					"colon": [/[\t ]*:[\t ]*/g, ":"], //コロン周辺のスペース
					"semicolon": [/[\t ]*;[\t ]*$/g, ";"], //セミコロン周辺のスペース
					"needlessSemi":[/[\t ]*;[\t ]*([\r\n]*?[\t\r\n ]*?)$/, "$1"],//不要なセミコロン
					"sc_bracket": [/[\t ]*[\{][\t ]*/g, "{"], // "{" 周辺のスペース
					"important": [/[\t ]*(!important)[\t ]*/g, "$1"], //!important周辺のスペース
					"ec_bracket": [/([^\t ]+?)[\t ]*;[\t ]*\}[\t ]*/g, "$1}"] // "}" 周辺のスペース
				}
				$.each(InputPartOption, function (Chara, replaces) {
					if (InputOption[Chara]){
						b=cssBlock.replace(b,replaces[0], replaces[1])
						if(Chara!=="needlessSemi")b=b.replace(replaces[0], replaces[1]);
						else b=b.replace(/[\t ]*;[\t ]*\}[\t\d]*/g, "}");
					}
				})
			}
			if (InputOption.color_name) {
				//カラーネームの最適化
				var color = {
					aliceblue: "#f0f8ff",
					antiquewhite: "#faebd7",
					aquamarine: "#7fffd4",
					black: "#000",
					blanchedalmond: "#ffebcd",
					blueviolet: "#8a2be2",
					burlywood: "#deb887",
					cadetblue: "#5f9ea0",
					chartreuse: "#7fff00",
					chocolate: "#d2691e",
					cornflowerblue: "#6495ed",
					cornsilk: "#fff8dc",
					darkblue: "#00008b",
					darkcyan: "#008b8b",
					darkgoldenrod: "#b8860b",
					darkgray: "#a9a9a9",
					darkgreen: "#006400",
					darkkhaki: "#bdb76b",
					darkmagenta: "#8b008b",
					darkolivegreen: "#556b2f",
					darkorange: "#ff8c00",
					darkorchid: "#9932cc",
					darksalmon: "#e9967a",
					darkseagreen: "#8fbc8f",
					darkslateblue: "#483d8b",
					darkslategray: "#2f4f4f",
					darkturquoise: "#00ced1",
					darkviolet: "#9400d3",
					deeppink: "#ff1493",
					deepskyblue: "#00bfff",
					dodgerblue: "#1e90ff",
					firebrick: "#b22222",
					floralwhite: "#fffaf0",
					forestgreen: "#228b22",
					fuchsia: "#f0f",
					gainsboro: "#dcdcdc",
					ghostwhite: "#f8f8ff",
					goldenrod: "#daa520",
					greenyellow: "#adff2f",
					honeydew: "#f0fff0",
					indianred: "#cd5c5c",
					lavendar: "#e6e6fa",
					lavenderblush: "#fff0f5",
					lawngreen: "#7cfc00",
					lemonchiffon: "#fffacd",
					lightblue: "#add8e6",
					lightcoral: "#f08080",
					lightcyan: "#e0ffff",
					lightgoldenrodyellow: "#fafad2",
					lightgray: "#d3d3d3",
					lightgreen: "#90ee90",
					lightpink: "#ffb6c1",
					lightsalmon: "#ffa07a",
					lightseagreen: "#20b2aa",
					lightskyblue: "#87cefa",
					lightslategray: "#789",
					lightsteelblue: "#b0c4de",
					lightyellow: "#ffffe0",
					limegreen: "#32cd32",
					magenta: "#f0f",
					mediumaquamarine: "#66cdaa",
					mediumblue: "#0000cd",
					mediumorchid: "#ba55d3",
					mediumpurple: "#9370db",
					mediumseagreen: "#3cb371",
					mediumslateblue: "#7b68ee",
					mediumspringgreen: "#00fa9a",
					mediumturquoise: "#48d1cc",
					mediumvioletred: "#c71585",
					midnightblue: "#191970",
					mintcream: "#f5fffa",
					mistyrose: "#ffe4e1",
					moccasin: "#ffe4b5",
					navajowhite: "#ffdead",
					olivedrab: "#6b8e23",
					orangered: "#ff4500",
					palegoldenrod: "#eee8aa",
					palegreen: "#98fb98",
					paleturquoise: "#afeeee",
					palevioletred: "#db7093",
					papayawhite: "#ffefd5",
					peachpuff: "#ffdab9",
					powderblue: "#b0e0e6",
					rosybrown: "#bc8f8f",
					royalblue: "#4169e1",
					saddlebrown: "#8b4513",
					sandybrown: "#f4a460",
					seagreen: "#2e8b57",
					seashell: "#fff5ee",
					slateblue: "#6a5acd",
					slategray: "#708090",
					springgreen: "#00ff7f",
					steelblue: "#4682b4",
					turquoise: "#40e0d0",
					white: "#fff",
					whitesmoke: "#f5f5f5",
					yellow: "#ff0",
					yellowgreen: "#9acd32",
					"#f0ffff": "azure",
					"#f5f5dc": "beige",
					"#ffe4c4": "bisque",
					"#a52a2a": "brown",
					"#ff7f50": "coral",
					"#ffd700": "gold",
					"#808080": "gray",
					"#008000": "green",
					"#4b0082": "indigo",
					"#fffff0": "ivory",
					"#f0e68c": "khaki",
					"#faf0e6": "linen",
					"#800000": "maroon",
					"#000080": "navy",
					"#808000": "olive",
					"#ffa500": "orange",
					"#da70d6": "orchid",
					"#cd853f": "peru",
					"#ffc0cb": "pink",
					"#dda0dd": "plum",
					"#800080": "purple",
					"#ff0000": "red",
					"#f00": "red",
					"#fa8072": "salmon",
					"#a0522d": "sienna",
					"#c0c0c0": "silver",
					"#fffafa": "snow",
					"#d2b48c": "tan",
					"#008080": "teal",
					"#ff6347": "tomato",
					"#ee82ee": "violet",
					"#f5deb3": "wheat"
				}, h;
				for (h in color) {
					if (-1 !== b.indexOf(h)) {
						b=cssBlock.replace(b,RegExp("([: ,\)\(]|[\t ]?:[\t ]?)([^;\{\}]*?)" + h + "((?:!important)|[, )(;}\n\r])", "gim"), "$1$2" + color[h] + "$3")
					}
				}
			}
			if (-1 !== b.indexOf("padding") && InputOption.padding) b = makeshort(b, "padding"); //パディング最適化
			if (-1 !== b.indexOf("margin") && InputOption.margin) b = makeshort(b, "margin"); //マージン最適化
			if (InputOption.color) {
				b=cssBlock.replace(b,/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, "#$1$2$3"); //カラーを6桁から3桁へ
			}
			if (InputOption.lower) {
				b=cssBlock.replace(b,/([: ,)(]|[\t ]?:[\t ]?)(#[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?)/g, function (all, prop, one) {
					return prop + (one.toLowerCase()) //カラーを小文字か大文字に
				})
			}
			var afterSize = cb(b);
			$aft.val(b).select();
			if (1024 > beforeSize) {
				$befB.text(beforeSize + " B");
				$aftB.text(afterSize + " B");
				$minus.text(beforeSize === afterSize ? "±0B(0%)" : "-" + (beforeSize - afterSize) + " B(" + (100 - afterSize * 100 / beforeSize).toFixed(2) + "%)");
			} else {
				$befB.text(m.floor(beforeSize / 1024) + " KB(" + beforeSize + " B)");
				$aftB.text(m.floor(afterSize / 1024) + " KB(" + afterSize + " B)");
				$minus.text(beforeSize === afterSize ? "±0B(0%)" : "-" + m.floor((beforeSize - afterSize) / 1024) + " KB(" + (beforeSize - afterSize) + " B)(" + (100 - afterSize * 100 / beforeSize).toFixed(2) + "%)");
			}
			$mes.stop(true, false).addClass("on").css("opacity", "1").fadeTo(1500, 0.3, function () {
				$(this).removeClass("on")
			})
		}
		$lform.on("click", ".select , .reset", function (event) {
			//リセットボタンとセレクトボタンを押した時に選択状態にする
			event.sp();
			$(this).siblings("textarea").select();
		}).on("click", "#compress", compress).find("#bef").select();
		if (window.File) {
			$bef.on("dragenter", function (event) {
				event.pd().sp();
			}).on("dragover", function (event) {
				event.originalEvent.dataTransfer.dropEffect = "copy";
				event.pd().sp();
			}).on("drop", function (event) {
				//ドラッグアンドドロップ
				event.pd().sp();
				event = event.originalEvent;
				var files = event.dataTransfer.files;
				SelectOption.encode = $select.filter("#encode").find("option:selected").val();
				for (i = 0, j = files.length; i < j; i += 1) {
					var reader = new FileReader(),
						f = files[i];
					reader.readAsText(f, SelectOption.encode);
					reader.onload = $.proxy(function () {
						$(this).val(reader.result);
						$compress.trigger("click")
					}, this)
				}
			})
		} else {
			$bef.attr("placeholder", "ここにコードをペーストしてください。どうやらお使いのブラウザではドラッグアンドドロップは対応していないようです。");
		}
		$(window).on("keydown", function (e) {
			if (!((!e.metaKey && e.ctrlKey) || (e.metaKey && !e.ctrlKey))) return;
			if (e.keyCode === 13) $compress.trigger("click") //Ctrl+Enterで圧縮
			else if (e.altKey && (e.keyCode === 80 || e.keyCode === 83)) {
				event.pd().sp();
				$compress.trigger("click");
				if (e.keyCode === 80) $aft.val($aft.val().replace(/(http:\/\/)/g, "//")); //http://を省略
				else $aft.val($aft.val().replace(/(https:\/\/)/g, "//")); //https://を省略
				return false;
			}
		})
		$option.on("click", function (e) {
			//一部だけ圧縮するを押した際の挙動。
			//ここでのメニューは一部圧縮時メニューのこと
			e.sp();
			if ($custom.is(":animated") || $menu.is(":animated")) return;
			else if ($option.attr("checked")) {
				//メニューが表示されていたら非表示にする
				$menu.hide();
				$options.css("border-left", "3px solid #CCC");
				$custom.show().css("width", $customWid);
			} else {
				//メニューが非表示だったら表示する
				$menu.show();
				$options.css("border-left", "none");
			}
		});
		$option_all.on("click", function (e) {
			e.pd().sp();
			//Allボタンの挙動
			if (!$custom.is(":visible")) return
			for (i = 0, j = $custom.length; i < j; i += 1) {
				if (!toggle) {
					if (!$custom.eq(i).hasClass("checked")) $custom.eq(i).click()
					//trueにする
				} else {
					if ($custom.eq(i).hasClass("checked")) $custom.eq(i).click()
					//falseにする
				}
			}
			toggle = !toggle;
		});
		$rform.on("click", "#save", function (event) {
			event.pd().sp();
			for (i = 0, j = $input.length; i < j; i += 1) {
				InputOption[$input.eq(i).attr("id")] = ($input.eq(i).attr("checked") === "checked");
			}
			for (i = 0, j = $select.length; i < j; i += 1) {
				SelectOption[$select.eq(i).attr("id")] = $select.eq(i).find("option:selected").val();
			}
			ls.setItem("input_option", $json.stringify(InputOption));
			ls.setItem("select_option", $json.stringify(SelectOption));
			//オプション設定の保存
		})
		$("#wrench").on("click", function (event) {
			event.pd().sp();
			$options.toggle();
			$results.toggle();
		});
	});
}(this, jQuery));