(function(J,q){q(function(){q.Event.fn=q.Event.prototype;q.Event.fn.pd=function(){this.preventDefault();return this};q.Event.fn.sp=function(){this.stopPropagation();return this};q("body").on("dragover",function(b){b.pd().sp();return!1});var D=q("#rform"),y=q("#lform"),F=y.find("#compress"),l=D.find("#options"),k=l.find("input"),f=l.find("select"),h=l.find("#option_menu"),G=l.find("#option"),v=h.find("#option_show"),L=h.find("#option_all"),E=D.find("#results"),A=y.find("#aft"),H=y.find("#bef"),B=localStorage,C=JSON,I=!0,r,w,b,m,s,K;if(null!==C.parse(B.getItem("input_option"))){r=C.parse(B.getItem("input_option"));w=C.parse(B.getItem("select_option"));b=0;for(m=k.length;b<m;b+=1)r[k.eq(b).attr("id")]?k.eq(b).attr("checked",!0):k.eq(b).attr("checked",!1);b=0;for(m=f.length;b<m;b+=1)f.eq(b).val(w[f.eq(b).attr("id")])}else{r={};w={};b=0;for(m=k.length;b<m;b+=1)r[k.eq(b).attr("id")]=k.eq(b).attr("checked");b=0;for(m=f.length;b<m;b+=1)w[f.eq(b).attr("id")]=f.eq(b).find("option:selected").val()}G.attr("checked")?(v.text("Hide"),h.show()):l.css("border-left","3px solid #CCC");D.css3form();s=h.find("div.customCheckBox").find("a");K=s.css("width");h.css("width");y.on("click",".select , .reset",function(b){b.sp();q(this).siblings("textarea").select()}).on("click","#compress",function(b){function m(b){for(var c=0,d=0,e=b.length;d<e;)c+=4>escape(b.charAt(d)).length?1:2,d+=1;return c}function s(b,c){j.init(b);for(var d=j.select(),e=j.select(),m=RegExp("("+c+"(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?))","gim"),z=0,q=j.length;z<q;z+=1){var r=j.select(z),p=j.select(z),f=p.properties.match(m);if(null!==f){for(var u=null,k=null,h=null,l=null,n=0,w=f.length;n<w;n+=1){f[n]=f[n].replace(m,"$1:$2").split(":");f[n][1]=f[n][1].replace(/;$/,"");var t=f[n][0].toLowerCase();t===c?(a=f[n][1].replace(/;/g,"").replace(/ /g,",").split(","),g=a.length,2===g?(u=k=a[0],h=l=a[1]):3===g?(u=a[0],h=l=a[1],k=a[2]):4===g?(u=a[0],h=a[1],k=a[2],l=a[3]):u=h=k=l=a[0]):t===c+"-top"?u=f[n][1]:t===c+"-right"?h=f[n][1]:t===c+"-bottom"?k=f[n][1]:t===c+"-left"&&(l=f[n][1])}if(null!==u&&null!==h&&null!==l&&null!==k){var x=u===h&&u===k&&u===l?u:u===k&&h===l&&u!==h?u+" "+h:h===l&&u!==k?u+" "+h+" "+k:u+" "+h+" "+k+" "+l,v=p.properties.match(m),v=null!==v?v.length:0,y=0;p.properties=p.properties.replace(RegExp("("+c+"(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?)([\r\n]?))","gim"),function(b,d,e,f,h){y+=1;return y===v?c+":"+x+(f||"")+h:""});d[z].change(d[z].string.replace(r.properties,p.properties))}}}for(n=0;n<q;n+=1)e[n].string!==d[n].string&&(b=b.replace(e[n].string,d[n].string));return b.replace(RegExp("("+c+"[s]?:[s]?)([^;$]+?[;$])","gi"),function(b,c,d){b=d.replace(/ /g,",").split(",");var e=b.length;2===e?b[0]===b[1]&&(d=b[0]):3===e?b[0]===b[2]&&(d=b[0]===b[1]?b[0]:b[0]+" "+b[1]):4===e&&b[1]===b[3]&&(b[0]===b[2]?b[0]!==b[1]&&(d=b[0]+" "+b[1]):d=b[0]+" "+b[1]+" "+b[2]);return c+d})}var e=H.val(),t=m(e),f=Math,j=function(){function b(c){e[e.length]=c;d.length+=1}var d={},e=[];d.length=0;d.push=b;d.select=function(b){var d,f;if("number"===typeof b)for(f in d={},e[b])e[b].hasOwnProperty(f)&&(d[f]=e[b][f]);else{d=[];c=0;for(x=e.length;c<x;c+=1)for(f in d[c]={},e[c])e[c].hasOwnProperty(f)&&(d[c][f]=e[c][f])}return d};d.init=function(f){e=[];d.length=0;if(-1!==f.indexOf("{")){var h=f.match(/([.#a-zA-Z ,:\-\[\] = \"\']+?)\{([\s\S]*?)\}/gim),j=function(b){this.string=b;this.selector=/\{([\s\S]+?)\}/.exec(b)[1];this.properties=/\{([\s\S]+?)\}/.exec(b)[1]};c=0;for(x=h.length;c<x;c+=1)f.replace(h[c],""),h[c]={selector:/([^\{]+?)\{/.exec(h[c])[1],properties:/\{([\s\S]+?)\}/.exec(h[c])[1],string:h[c],change:j},b(h[c])}else j=function(b){this.string=b;this.properties=/\{([\s\S]+?)\}/.exec(b)[1]},f={properties:f,string:f,change:j},b(f)};return d},j=j();j.init(e);b.pd().sp();if(!h)var h=E.find("#befB");if(!l)var l=E.find("#aftB");if(!w)var w=E.find("#minus");if(!v)var v=y.find("#mes");for(var c=0,x=k.length;c<x;c+=1)r[k.eq(c).attr("id")]=k.eq(c).attr("checked");r.comment&&(e=e.replace(/(\/\*([\s]|.)+?\*\/)/g,""));b={zero:[/(\D)[0](?:em|px|%)/g,"$10"],decimals:[/([\D])0\.(\d)/g,"$1.$2"]};q.each(b,function(b,d){if(r[b]){j.init(e);for(var c=0,f=j.length;c<f;c+=1)e=e.replace(j.select(c).properties,j.select(c).properties.replace(d[0],d[1]))}});r.option?(b={indent:[/^[\s]*/gm,""],line:[/[\r\n]/g,""],comma:[/[\t ]*[,][\t ]*/g,","],colon:[/[\t ]*[:][\t ]*/g,":"],semicolon:[/[\t ]*[;][\t ]*/g,";"],sc_bracket:[/[\t ]*[\{][\t ]*/g,"{"],important:[/[\t ]*(!important)[\t ]*/g,"$1"],ec_bracket:[/([^\t ]+?)[\t ]*;[\t ]*\}[\t ]*/g,"$1}"]},q.each(b,function(b,d){r[b]&&(e=e.replace(d[0],d[1]))})):e=e.replace(/^[\s]*/gm,"").replace(/[\r\n]/g,"").replace(/[\t ]*([,:;\{]|!important)[\t ]*/g,"$1").replace(/[\t ]*;[\t ]*\}[\t\d]*/g,"}").replace(/([^\t ]+?)[\t ]*\}[\t ]*/g,"$1}");if(r.color_name){b={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aquamarine:"#7fffd4",black:"#000",blanchedalmond:"#ffebcd",blueviolet:"#8a2be2",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",greenyellow:"#adff2f",honeydew:"#f0fff0",indianred:"#cd5c5c",lavendar:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",limegreen:"#32cd32",magenta:"#f0f",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",olivedrab:"#6b8e23",orangered:"#ff4500",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhite:"#ffefd5",peachpuff:"#ffdab9",powderblue:"#b0e0e6",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",slateblue:"#6a5acd",slategray:"#708090",springgreen:"#00ff7f",steelblue:"#4682b4",turquoise:"#40e0d0",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32","#f0ffff":"azure","#f5f5dc":"beige","#ffe4c4":"bisque","#a52a2a":"brown","#ff7f50":"coral","#ffd700":"gold","#808080":"gray","#008000":"green","#4b0082":"indigo","#fffff0":"ivory","#f0e68c":"khaki","#faf0e6":"linen","#800000":"maroon","#000080":"navy","#808000":"olive","#ffa500":"orange","#da70d6":"orchid","#cd853f":"peru","#ffc0cb":"pink","#dda0dd":"plum","#800080":"purple","#ff0000":"red","#f00":"red","#fa8072":"salmon","#a0522d":"sienna","#c0c0c0":"silver","#fffafa":"snow","#d2b48c":"tan","#008080":"teal","#ff6347":"tomato","#ee82ee":"violet","#f5deb3":"wheat"};var p;j.init(e);for(p in b){c=0;for(x=j.length;c<x;c+=1)-1!==j.select(c).properties.indexOf(p)&&(e=e.replace(j.select(c).properties,j.select(c).properties.replace(RegExp("([: ,)(]|[\t ]?:[\t ]?)([^;{}]*?)"+p+"((?:!important)|[, )(;}\n\r])","gim"),"$1$2"+b[p]+"$3")))}}-1!==e.indexOf("padding")&&r.padding&&(e=s(e,"padding"));-1!==e.indexOf("margin")&&r.margin&&(e=s(e,"margin"));if(r.color){j.init(e);c=0;for(x=j.length;c<x;c+=1)e=e.replace(j.select(c).properties,j.select(c).properties.replace(/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g,"#$1$2$3"))}if(r.lower){j.init(e);c=0;for(x=j.length;c<x;c+=1)e=e.replace(j.select(c).properties,j.select(c).properties.replace(/([: ,)(]|[\t ]?:[\t ]?)(#[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?)/g,function(b,d,c){return d+c.toLowerCase()}))}p=m(e);A.val(e).select();1024>t?(h.text(t+" B"),l.text(p+" B"),w.text(t===p?"\u00b10B(0%)":"-"+(t-p)+" B("+(100-100*p/t).toFixed(2)+"%)")):(h.text(f.floor(t/1024)+" KB("+t+" B)"),l.text(f.floor(p/1024)+" KB("+p+" B)"),w.text(t===p?"\u00b10B(0%)":"-"+f.floor((t-p)/1024)+" KB("+(t-p)+" B)("+(100-100*p/t).toFixed(2)+"%)"));v.stop(!0,!1).addClass("on").css("opacity","1").fadeTo(1500,0.3,function(){q(this).removeClass("on")})}).find("#bef").select();if(J.File)H.on("dragenter",function(b){b.pd().sp()}).on("dragover",function(b){b.originalEvent.dataTransfer.dropEffect="copy";b.pd().sp()}).on("drop",function(d){d.pd().sp();d=d.originalEvent;d=d.dataTransfer.files;w.encode=f.filter("#encode").find("option:selected").val();b=0;for(m=d.length;b<m;b+=1){var h=new FileReader;h.readAsText(d[b],w.encode);h.onload=q.proxy(function(){q(this).val(h.result);F.trigger("click")},this)}});else H.attr("placeholder","\u3053\u3053\u306b\u30b3\u30fc\u30c9\u3092\u30da\u30fc\u30b9\u30c8\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u3069\u3046\u3084\u3089\u304a\u4f7f\u3044\u306e\u30d6\u30e9\u30a6\u30b6\u3067\u306f\u30c9\u30e9\u30c3\u30b0\u30a2\u30f3\u30c9\u30c9\u30ed\u30c3\u30d7\u306f\u5bfe\u5fdc\u3057\u3066\u3044\u306a\u3044\u3088\u3046\u3067\u3059\u3002");q(J).on("keydown",function(b){if(!b.metaKey&&b.ctrlKey||b.metaKey&&!b.ctrlKey)if(13===b.keyCode)F.trigger("click");else if(b.altKey&&(80===b.keyCode||83===b.keyCode))return event.pd().sp(),F.trigger("click"),80===b.keyCode?A.val(A.val().replace(/(http:\/\/)/g,"//")):A.val(A.val().replace(/(https:\/\/)/g,"//")),!1});G.on("click",function(b){b.sp();!s.is(":animated")&&!h.is(":animated")&&(G.attr("checked")?(v.text("Show").removeClass("show hide").addClass("show"),h.hide(),l.css("border-left","3px solid #CCC"),s.show().css("width",K)):(v.text("Hide"),h.show(),l.css("border-left","none")))});v.on("click",function(b){b.pd().sp();!s.is(":animated")&&!h.is(":animated")&&(s.is(":visible")?(v.text("Show").removeClass("show hide").addClass("hide"),s.parent().hide()):(v.text("Hide").removeClass("show hide").addClass("show"),s.parent().show()))});L.on("click",function(d){d.pd().sp();if(s.is(":visible")){b=0;for(m=s.length;b<m;b+=1)I?s.eq(b).hasClass("checked")&&s.eq(b).trigger("click"):s.eq(b).hasClass("checked")||s.eq(b).trigger("click");I=!I}});D.on("click","#save",function(d){d.pd().sp();b=0;for(m=k.length;b<m;b+=1)r[k.eq(b).attr("id")]="checked"===k.eq(b).attr("checked");b=0;for(m=f.length;b<m;b+=1)w[f.eq(b).attr("id")]=f.eq(b).find("option:selected").val();B.setItem("input_option",C.stringify(r));B.setItem("select_option",C.stringify(w))});q("#wrench").on("click",function(b){b.pd().sp();l.toggle();E.toggle()})})})(this,jQuery);