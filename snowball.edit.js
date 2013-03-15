/*global $,escape */
(function (window, $) {
	$(function () {
		$("body").on("dragover", function (event) {
			event.pd().sp();
			return false;
		});
		Array.fn.has=function(key){
			var start=0,end=this.length-1,mid,m=Math.floor;
			if(this[this.length-1]<key) return false;
			while(start<=end){
				mid=m((start+end)/2);
				if(this[mid]>key) end=mid-1;
				if(this[mid]<key) start=mid+1;
				if(this[mid]==key) return true;
			}
			return false;
		}
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
			document=window.document,
			$json = JSON,
			toggle = true,
			$befB = $results.find("#befB"),
			$aftB = $results.find("#aftB"),
			$minus = $results.find("#minus"),
			$mes = $lform.find("#mes"),
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
			$menuWid,
			css=cssBlock,
			correctProperties="alignment-adjust alignment-baseline animation animation-delay animation-direction animation-duration animation-iteration-count animation-name animation-play-state animation-timing-function appearance azimuth backface-visibility background background-attachment background-break background-clip background-color background-image background-origin background-position background-position-x background-position-y background-repeat background-size baseline-shift behavior binding bookmark-label bookmark-level bookmark-target border border-bottom border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-break border-collapse border-color border-image border-image-outset border-image-repeat border-image-slice border-image-source border-image-width border-left border-left-color border-left-style border-left-width border-length border-radius border-right border-right-color border-right-style border-right-width border-spacing border-style border-top border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width border-width bottom box-align box-decoration-break box-direction box-flex box-flex-group box-lines box-ordinal-group box-orient box-pack box-shadow box-sizing break-after break-before break-inside clear clip color color-profile column-count column-fill column-gap column-rule column-rule-color column-rule-style column-rule-width column-span column-width columns content counter-increment counter-reset crop cue cue-after cue-before cursor direction display display-model display-role dominant-baseline drop-initial-after-adjust drop-initial-after-align drop-initial-before-adjust drop-initial-before-align drop-initial-size drop-initial-value elevation empty-cells filter fit fit-position float float-offset font font-family font-size font-size-adjust font-stretch font-style font-variant font-weight grid-columns grid-rows hanging-punctuation height hyphenate-after hyphenate-before hyphenate-character hyphenate-lines hyphenate-resource hyphens icon image-orientation image-resolution include-source inline-box-align layer-background-color layer-background-image layout-grid layout-grid-char layout-grid-line layout-grid-mode layout-grid-type left letter-spacing line-break line-height line-stacking line-stacking-ruby line-stacking-shift line-stacking-strategy linear-gradient() list-style list-style-image list-style-position list-style-type margin margin-bottom margin-left margin-right margin-top mark mark-after mark-before marker-offset marks marquee-direction marquee-loop marquee-play-count marquee-speed marquee-style max-height max-width min-height min-width move-to nav-down nav-index nav-left nav-right nav-up opacity orphans outline outline-color outline-offset outline-style outline-width overflow overflow-style overflow-x overflow-y padding padding-bottom padding-left padding-right padding-top page page-break-after page-break-before page-break-inside page-policy pause pause-after pause-before perspective perspective-origin phonemes pitch pitch-range play-during pointer-events position presentation-level punctuation-trim quotes radial-gradient() rendering-intent resize rest rest-after rest-before rgba() richness right rotation rotation-point ruby-align ruby-overhang ruby-position ruby-span scrollbar-3dlight-color scrollbar-arrow-color scrollbar-base-color scrollbar-darkshadow-color scrollbar-face-color scrollbar-highlight-color scrollbar-shadow-color scrollbar-track-color size speak speak-header speak-numeral speak-punctuation speech-rate stress string-set tab-side table-layout target target-name target-new target-position text-align text-align-last text-autospace text-decoration text-emphasis text-height text-indent text-justify text-outline text-overflow text-replace text-shadow text-transform text-underline-position text-wrap top transform transform-origin transform-style transform:matrix() transform:matrix3d() transform:perspective() transform:rotate() transform:scale() transform:skew() transform:translate() transition transition-delay transition-duration transition-property transition-timing-function unicode-bidi user-select vertical-align visibility voice-balance voice-duration voice-family voice-pitch voice-pitch-range voice-rate voice-stress voice-volume volume white-space white-space-collapse widows width word-break word-spacing word-wrap writing-mode z-index zoom".split(" "),
		setCookie=function(prop,expiredays){
			var path = location.pathname,paths = path.split("/");
			if(paths[paths.length-1] != ""){
				paths[paths.length-1] = "";
				path = paths.join("/");
			}
			var extime = new Date().getTime(),cltime = new Date(extime + (60*60*24*1000*expiredays)),exdate = cltime.toUTCString();
			var s="";
			for(var c_name in prop){
				value=prop[c_name]
				s += c_name +"="+ escape(value)+";";
			}
			s += "path="+ path+";";
			if(expiredays){
				s += "expires=" +exdate+";";
			}
			document.cookie=s;
		},
		getCookie=function(c_name){
			var st="";
			var ed="";
			if(document.cookie.length>0){
				st=document.cookie.indexOf(c_name + "=");
				if(st!=-1){
					st=st+c_name.length+1;
					ed=document.cookie.indexOf(";",st);
					if(ed==-1) ed=document.cookie.length;
					return unescape(document.cookie.substring(st,ed));
				}
			}
			return false;
		}

		if ($json.parse(getCookie("input_option")) !== false) {
			InputOption = $json.parse(getCookie("input_option"));
			SelectOption = $json.parse(getCookie("select_option"));
			for (i = 0, j = $input.length; i < j; i += 1) {
				if (InputOption[$input.eq(i).attr("id")]) {
					$input.eq(i).attr("checked", true);
				} else {
					$input.eq(i).attr("checked", false);
				}
			}
			for (i = 0, j = $select.length; i < j; i += 1) {
				SelectOption[$select.eq(i).attr("id")]&&$select.eq(i).val(SelectOption[$select.eq(i).attr("id")]);
			}
			//オプション設定の読み込み
		} else {
			InputOption = {};
			SelectOption = {};
			for (i = 0, j = $input.length; i < j; i += 1) {
				InputOption[$input.eq(i).attr("id")] = !!$input.eq(i).attr("checked");
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

		if(!!$("#HackMode").attr("checked")==true){
			$options.find("a").eq($("#padding").attr("disabled",true).index("input[type='checkbox']")).addClass("Hack");
			$options.find("a").eq($("#margin").attr("disabled",true).index("input[type='checkbox']")).addClass("Hack");
		}else{
			$options.find("a").eq($("#padding").attr("disabled",false).index("input[type='checkbox']")).removeClass("Hack");
			$options.find("a").eq($("#margin").attr("disabled",false).index("input[type='checkbox']")).removeClass("Hack");
		}//CSSハックモードの処理。onならpaddingとmarginを無効化
		
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
			css.init(b);
			event.pd().sp();
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
				css.init(str)
				var block = css.eq(),
					beforeblock = css.eq(),
					pattern = new RegExp("(" + pm + "(?:\-left|\-right|\-top|\-bottom)? ?: ?([^;$]+)([;$]?))", "gim");
				for (var bi = 0, bj = css.length; bi < bj; bi += 1) {
					var before = css.eq(bi),
						after = css.eq(bi),
						paddings = after.properties.match(pattern);

					if (paddings !== null) {
						var paddingsData = {
							t: null,
							b: null,
							r: null,
							l: null,
							ok:false
						};
						loop:for (var i = paddings.length-1; i >=0; i -= 1) {
							paddings[i] = paddings[i].replace(pattern, "$1:$2").split(":");
							paddings[i][1] = paddings[i][1].replace(/;$/, "");
							var property = paddings[i][0].toLowerCase();

							if (property === pm) {
								a = paddings[i][1].replace(/;/g, "").replace(/ /g, ",").split(",");
								g = a.length;
								if (2 === g){
									paddingsData.t==null&&(paddingsData.t = a[0]);
									paddingsData.b==null&&(paddingsData.b = a[0]);
									paddingsData.r==null&&(paddingsData.r = a[1]);
									paddingsData.l==null&&(paddingsData.l = a[1]);
								}else if (3 === g){
									paddingsData.t==null&&(paddingsData.t = a[0]);
									paddingsData.r==null&&(paddingsData.r = a[1]);
									paddingsData.l==null&&(paddingsData.l = a[1]);
									paddingsData.b==null&&(paddingsData.b = a[2]);
								}else if (4 === g){
									paddingsData.t==null&&(paddingsData.t = a[0]);
									paddingsData.r==null&&(paddingsData.r = a[1]);
									paddingsData.b==null&&(paddingsData.b = a[2]);
									paddingsData.l==null&&(paddingsData.l = a[3]);
								}else{
									paddingsData.t==null&&(paddingsData.t = a[0]);
									paddingsData.r==null&&(paddingsData.r = a[0]);
									paddingsData.b==null&&(paddingsData.b = a[0]);
									paddingsData.l==null&&(paddingsData.l = a[0]);
								}
							} else if (property === pm + "-top"&&paddingsData.t==null) paddingsData.t = paddings[i][1];
							else if (property === pm + "-right"&&paddingsData.r==null) paddingsData.r = paddings[i][1];
							else if (property === pm + "-bottom"&&paddingsData.b==null) paddingsData.b = paddings[i][1];
							else if (property === pm + "-left"&&paddingsData.l==null) paddingsData.l = paddings[i][1];
							if(paddingsData.t!=null&&paddingsData.r!=null&&paddingsData.b!=null&&paddingsData.l!=null){
								paddingsData.ok=true;
								break loop;
							}
						}
						if (paddingsData.ok||(paddingsData.t !== null && paddingsData.r !== null && paddingsData.l !== null && paddingsData.b !== null)) {
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
				InputOption[$input.eq(i).attr("id")] = $input.eq(i).attr("checked")&&!$input.eq(i).is(":disabled");
			}
			css.init(b)
/*			for(var i=0;i<css.length;i+=1){
				//正しいプロパティ名か判定(適当だからだめかも)
				var prop=css.eq(i).properties.split(";"),changed=false,hasVendor=function(prop,vendor){
					vendor=["-khtml-","-o-","-moz-","-webkit-","-ms-",vendor];
					for(var i=0,j=vendor.length;i<j;i+=1){
						if(prop.indexOf(vendor[i])!=-1&&prop.indexOf(vendor[i])==0) return true;
					}
					return false;
				};
				loop:for(var k=0,l=prop.length;k<l;k+=1){
					prop[k]=prop[k].split(":")[0].replace(/\/\*.+?\*\//gim,"").replace(/[^a-zA-Z0-9\-]/gim,"");
					if(prop[k]!=""){
						if(!hasVendor(prop[k],"-pie-")){
							//ベンダープレフィックスを含まない
							if(!correctProperties.has(prop[k])){
								//正しくない
								$aft.val("エラー："+prop[k]+"というプロパティを発見しました。");
								changed=true;
								break loop;
							}
						}
					}
				}
				if(changed==true) return;
			}*/
			if (InputOption["comment"]) b = b.replace(/(\/\*([\s]|.)+?\*\/)/g, ""); //コメントの削除
			var InputPartOption = {
				"zero": [/(\D)[0](?:em|px|%)/g, "$10"], //0pxなどの単位を削除
				"decimals": [/([\D])0\.(\d)/g, "$1.$2"] //0.nの0を削除
			}
			$.each(InputPartOption, function (Chara, replaces) {
				if (InputOption[Chara]) {
					b=css.replace(b,replaces[0], replaces[1]); //0pxなどの単位を削除
				}
			});
			if (!InputOption.option) {
				//一部圧縮の際のオプション
				css.init(b)
				for (var i = 0, j = css.length; i < j; i += 1) {
					var now=css.eq(i);
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
						b=css.replace(b,replaces[0], replaces[1])
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
					if (-1 !== b.indexOf(h.toLowerCase())||-1 !== b.indexOf(h.toUpperCase())) {
						b=css.replace(b,RegExp("([: ,\)\(]|[\t ]?:[\t ]?)([^;\{\}]*?)" + h + "((?:!important)|[, )(;}\n\r]|$)", "gim"), "$1$2" + color[h] + "$3")
					}
				}
			}
			if (-1 !== b.indexOf("padding") && InputOption.padding) b = makeshort(b, "padding"); //パディング最適化
			if (-1 !== b.indexOf("margin") && InputOption.margin) b = makeshort(b, "margin"); //マージン最適化
			if (InputOption.color) {
				b=css.replace(b,/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, "#$1$2$3"); //カラーを6桁から3桁へ
			}
			if (InputOption.lower) {
				b=css.replace(b,/([: ,)(]|[\t ]?:[\t ]?)(#[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?)/g, function (all, prop, one) {
					return prop + (one.toLowerCase()) //カラーを小文字か大文字に
				})
			}
			if (InputOption.none) {
				b=css.replace(b,/(.+?):(.+?(?:;|$))/g,function(all,prop,val){
					if(prop.indexOf("background-image")!=-1) return all;
					if(prop.indexOf("border")!=-1||prop.indexOf("background")!=-1){
						return all.replace(val,val.replace(/none/g,"0"))
					}
					return all
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
		$("#HackMode").on("click",function(){
			if(!$("#HackMode").attr("checked")==true){
				$options.find("a").eq($("#padding").attr("disabled",true).index("input[type='checkbox']")).addClass("Hack");
				$options.find("a").eq($("#margin").attr("disabled",true).index("input[type='checkbox']")).addClass("Hack");
			}else{
				$options.find("a").eq($("#padding").attr("disabled",false).index("input[type='checkbox']")).removeClass("Hack");
				$options.find("a").eq($("#margin").attr("disabled",false).index("input[type='checkbox']")).removeClass("Hack");
			}
		})
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
			if(e.keyCode === 68 && e.altKey && e.metaKey && e.ctrlKey){
				var $customA=$options.find(".customCheckBox").find("a");
				for(var i=0,j=$customA.length;i<j;i+=1){
					$customA.eq(i).hasClass("checked")&&$customA.eq(i).trigger("click");
				}
				$customA.eq($("#option").index("input[type='checkbox']")).trigger("click");
			}
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
			toggle = !toggle;
			for (i = 0, j = $custom.length; i < j; i += 1) {
				if (toggle) {
					if (!$custom.eq(i).hasClass("checked")) $custom.eq(i).click()
					//trueにする
				} else {
					if ($custom.eq(i).hasClass("checked")) $custom.eq(i).click()
					//falseにする
				}
			}
		});
		$rform.on("click", "#save", function (event) {
			event.pd().sp();
			InputOption={};
			SelectOption={};
			for (i = 0, j = $input.length; i < j; i += 1) {
				InputOption[$input.eq(i).attr("id")] = !!$input.eq(i).attr("checked");
			}
			for (i = 0, j = $select.length; i < j; i += 1) {
				SelectOption[$select.eq(i).attr("id")] = $select.eq(i).find("option:selected").val();
			}
			setCookie({"input_option":$json.stringify(InputOption),"select_option":$json.stringify(SelectOption)},7)
			//オプション設定の保存
		})
		$("#wrench").on("click", function (event) {
			event.pd().sp();
			$options.toggle();
			$results.toggle();
		});
	});
}(this, jQuery));