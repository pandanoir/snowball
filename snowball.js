(function(L,m){m(function(){m("body").on("dragover",function(b){b.pd();b.sp();return!1});m.Event.fn=m.Event.prototype;m.Event.fn.pd=function(){this.preventDefault()};m.Event.fn.sp=function(){this.stopPropagation()};var E=m("#rform"),A=m("#lform"),G=A.find("#compress"),k=E.find("#options"),f=k.find("input"),q=k.find("select"),h=k.find("#option_menu"),H=k.find("#option"),u=h.find("#option_show"),N=h.find("#option_all"),F=E.find("#results"),B=A.find("#aft"),I=A.find("#bef"),C=localStorage,D=JSON,J=!0;if(null!==D.parse(C.getItem("input_option"))){for(var l=D.parse(C.getItem("input_option")),p=D.parse(C.getItem("select_option")),c=0,x=f.length;c<x;c++)l[f.eq(c).attr("id")]?f.eq(c).attr("checked",!0):f.eq(c).attr("checked",!1);c=0;for(x=q.length;c<x;c++)q.eq(c).val(p[q.eq(c).attr("id")])}else{l={};p={};c=0;for(x=f.length;c<x;c++)l[f.eq(c).attr("id")]=f.eq(c).attr("checked");c=0;for(x=q.length;c<x;c++)p[q.eq(c).attr("id")]=q.eq(c).find("option:selected").val()}H.attr("checked")?(u.text("Hide"),h.show()):k.css("border-left","3px solid #CCC");E.css3form();var r=h.find("div.customCheckBox").find("a"),O=r.css("width");h.css("width");A.on("click",".select , .reset",function(b){b.sp();m(this).siblings("textarea").select()}).on("click","#compress",function(b){function c(b){for(var e=d=0,j=b.length;d<j;d++)e+=4>escape(b.charAt(d)).length?1:2;return e}function r(b,e){j.init(b);for(var c=j.select(),M=j.select(),K=RegExp("("+e+"(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?))","gim"),z=0,m=j.length;z<m;z++){var q=j.select(z),l=j.select(z),f=l.properties.match(K);if(null!==f){for(var s=null,h=null,v=null,k=null,n=0,u=f.length;n<u;n++){f[n]=f[n].replace(K,"$1:$2").split(":");f[n][1]=f[n][1].replace(/;$/,"");var p=f[n][0].toLowerCase();p===e?(a=f[n][1].replace(/;/g,"").replace(/ /g,",").split(","),g=a.length,2===g?(s=h=a[0],v=k=a[1]):3===g?(s=a[0],v=k=a[1],h=a[2]):4===g?(s=a[0],v=a[1],h=a[2],k=a[3]):s=v=h=k=a[0]):p===e+"-top"?s=f[n][1]:p===e+"-right"?v=f[n][1]:p===e+"-bottom"?h=f[n][1]:p===e+"-left"&&(k=f[n][1])}if(null!==s&&null!==v&&null!==k&&null!==h){var w=s===v&&s===h&&s===k?s:s===h&&v===k&&s!==v?s+" "+v:v===k&&s!==h?s+" "+v+" "+h:s+" "+v+" "+h+" "+k,t=l.properties.match(K),t=null!==t?t.length:0,x=0;l.properties=l.properties.replace(RegExp("("+e+"(?:-left|-right|-top|-bottom)? ?: ?([^;$]+)([;$]?)([\r\n]?))","gim"),function(b,c,f,h,j){return++x===t?e+":"+w+(h||"")+j:""});c[z].change(c[z].string.replace(q.properties,l.properties))}}}for(n=0;n<m;n++)M[n].string!==c[n].string&&(b=b.replace(M[n].string,c[n].string));return b.replace(RegExp("("+e+"[s]?:[s]?)([^;$]+?[;$])","gi"),function(b,e,c){b=c.replace(/ /g,",").split(",");var f=b.length;2===f?b[0]===b[1]&&(c=b[0]):3===f?b[0]===b[2]&&(c=b[0]===b[1]?b[0]:b[0]+" "+b[1]):4===f&&b[1]===b[3]&&(b[0]===b[2]?b[0]!==b[1]&&(c=b[0]+" "+b[1]):c=b[0]+" "+b[1]+" "+b[2]);return e+c})}var e=I.val(),w=c(e),q=Math,j=function(){function b(f){c[c.length]=f;e.length+=1}var e={},c=[];e.length=0;e.push=b;e.select=function(b){if("number"===typeof b){var e={},f;for(f in c[b])e[f]=c[b][f]}else{e=[];b=0;for(var h=c.length;b<h;b++)for(f in e[b]={},c[b])e[b][f]=c[b][f]}return e};e.init=function(e){if(-1!=e.indexOf("{"))for(var c=e.match(/([.#a-zA-Z ,:\-\[\]=\"\']+?)\{([\s\S]*?)\}/gim),f=0,h=c.length;f<h;f+=1)e.replace(c[f],""),c[f]={selector:/([^\{]+?)\{/.exec(c[f])[1],properties:/\{([\s\S]+?)\}/.exec(c[f])[1],string:c[f],change:function(b){this.string=b;this.selector=/\{([\s\S]+?)\}/.exec(b)[1];this.properties=/\{([\s\S]+?)\}/.exec(b)[1]}},b(c[f]);else b(e)};return e},j=j();j.init(e);b.pd();b.sp();if(!h)var h=F.find("#befB");if(!k)var k=F.find("#aftB");if(!p)var p=F.find("#minus");if(!x)var x=A.find("#mes");b=0;for(var y=f.length;b<y;b++)l[f.eq(b).attr("id")]=f.eq(b).attr("checked");b={comment:[/(\/\*([\s]|.)+?\*\/)/g,""],zero:[/(\D)[0](?:em|px|%)/g,"$10"],decimals:[/([\D])0\.(\d)/g,"$1.$2"]};m.each(b,function(b,c){l[b]&&(e=e.replace(c[0],c[1]))});l.option?(b={indent:[/^[\s]*/gm,""],line:[/[\r\n]/g,""],comma:[/[\t ]*[,][\t ]*/g,","],colon:[/[\t ]*[:][\t ]*/g,":"],semicolon:[/[\t ]*[;][\t ]*/g,";"],sc_bracket:[/[\t ]*[\{][\t ]*/g,"{"],important:[/[\t ]*(!important)[\t ]*/g,"$1"],ec_bracket:[/([^\t ]+?)[\t ]*;[\t ]*\}[\t ]*/g,"$1}"]},m.each(b,function(b,c){l[b]&&(e=e.replace(c[0],c[1]))})):e=e.replace(/^[\s]*/gm,"").replace(/[\r\n]/g,"").replace(/[\t ]*([,:;\{]|!important)[\t ]*/g,"$1").replace(/[\t ]*;[\t ]*\}[\t\d]*/g,"}").replace(/([^\t ]+?)[\t ]*\}[\t ]*/g,"$1}");if(l.color_name){var u={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aquamarine:"#7fffd4",black:"#000",blanchedalmond:"#ffebcd",blueviolet:"#8a2be2",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",greenyellow:"#adff2f",honeydew:"#f0fff0",indianred:"#cd5c5c",lavendar:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",limegreen:"#32cd32",magenta:"#f0f",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",olivedrab:"#6b8e23",orangered:"#ff4500",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhite:"#ffefd5",peachpuff:"#ffdab9",powderblue:"#b0e0e6",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",slateblue:"#6a5acd",slategray:"#708090",springgreen:"#00ff7f",steelblue:"#4682b4",turquoise:"#40e0d0",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32","#f0ffff":"azure","#f5f5dc":"beige","#ffe4c4":"bisque","#a52a2a":"brown","#ff7f50":"coral","#ffd700":"gold","#808080":"gray","#008000":"green","#4b0082":"indigo","#fffff0":"ivory","#f0e68c":"khaki","#faf0e6":"linen","#800000":"maroon","#000080":"navy","#808000":"olive","#ffa500":"orange","#da70d6":"orchid","#cd853f":"peru","#ffc0cb":"pink","#dda0dd":"plum","#800080":"purple","#ff0000":"red","#f00":"red","#fa8072":"salmon","#a0522d":"sienna","#c0c0c0":"silver","#fffafa":"snow","#d2b48c":"tan","#008080":"teal","#ff6347":"tomato","#ee82ee":"violet","#f5deb3":"wheat"},t;j.init(e);for(t in u){b=0;for(y=j.length;b<y;b++)-1!==j.select(b).properties.indexOf(t)&&(e=e.replace(j.select(b).properties,j.select(b).properties.replace(RegExp("([: ,)(]|[\t ]?:[\t ]?)([^;{}]*?)"+t+"((?:!important)|[, )(;}\n\r])","gim"),"$1$2"+u[t]+"$3")))}}-1!==e.indexOf("padding")&&l.padding&&(e=r(e,"padding"));-1!==e.indexOf("margin")&&l.margin&&(e=r(e,"margin"));if(l.color){j.init(e);t=j.select();b=0;for(y=j.length;b<y;b++)e=e.replace(j.select(b).properties,j.select(b).properties.replace(/\#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g,"#$1$2$3"))}if(l.lower&&(j.init(e),t=j.select(),u=j.select(),""!==t.properties)){b=0;for(y=t.length;b<y;b++)t[b].properties=t[b].properties.replace(/([: ,)(]|[\t ]?:[\t ]?)(#[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?[0-9a-fA-F][0-9a-fA-F]?)/g,function(b,e,c){return e+c.toLowerCase()}),e=e.replace(u[b].properties,t[b].properties)}b=c(e);B.val(e).select();1024>w?(h.text(w+" B"),k.text(b+" B"),p.text(w===b?"\u00b10B(0%)":"-"+(w-b)+" B("+(100-100*b/w).toFixed(2)+"%)")):(h.text(q.floor(w/1024)+" KB("+w+" B)"),k.text(q.floor(b/1024)+" KB("+b+" B)"),p.text(w===b?"\u00b10B(0%)":"-"+q.floor((w-b)/1024)+" KB("+(w-b)+" B)("+(100-100*b/w).toFixed(2)+"%)"));x.stop(!0,!1).addClass("on").css("opacity","1").fadeTo(1500,0.3,function(){m(this).removeClass("on")})}).find("#bef").select();if(L.File)I.on("dragenter",function(b){b.pd();b.sp()}).on("dragover",function(b){b.originalEvent.dataTransfer.dropEffect="copy";b.pd();b.sp()}).on("drop",function(b){b.pd();b.sp();b=b.originalEvent;b=b.dataTransfer.files;p.encode=q.filter("#encode").find("option:selected").val();for(var c=0,f=b.length;c<f;c++){var e=new FileReader;e.readAsText(b[c],p.encode);e.onload=m.proxy(function(){m(this).val(e.result);G.trigger("click")},this)}});else I.attr("placeholder","\u3053\u3053\u306b\u30b3\u30fc\u30c9\u3092\u30da\u30fc\u30b9\u30c8\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u3069\u3046\u3084\u3089\u304a\u4f7f\u3044\u306e\u30d6\u30e9\u30a6\u30b6\u3067\u306f\u30c9\u30e9\u30c3\u30b0\u30a2\u30f3\u30c9\u30c9\u30ed\u30c3\u30d7\u306f\u5bfe\u5fdc\u3057\u3066\u3044\u306a\u3044\u3088\u3046\u3067\u3059\u3002");m(L).on("keydown",function(b){if(!b.metaKey&&b.ctrlKey||b.metaKey&&!b.ctrlKey)if(13===b.keyCode)G.trigger("click");else if(b.altKey&&(80===b.keyCode||83===b.keyCode))return event.pd(),event.sp(),G.trigger("click"),80===b.keyCode?B.val(B.val().replace(/(http:\/\/)/g,"//")):B.val(B.val().replace(/(https:\/\/)/g,"//")),!1});H.on("click",function(b){b.sp();!r.is(":animated")&&!h.is(":animated")&&(H.attr("checked")?(u.text("Show").removeClass("show hide").addClass("show"),h.hide(),k.css("border-left","3px solid #CCC"),r.show().css("width",O)):(u.text("Hide"),h.show(),k.css("border-left","none")))});u.on("click",function(b){b.pd();b.sp();!r.is(":animated")&&!h.is(":animated")&&(r.is(":visible")?(u.text("Show").removeClass("show hide").addClass("hide"),r.parent().hide()):(u.text("Hide").removeClass("show hide").addClass("show"),r.parent().show()))});N.on("click",function(b){b.pd();b.sp();if(r.is(":visible")){b=0;for(var c=r.length;b<c;b++)J?r.eq(b).hasClass("checked")&&r.eq(b).trigger("click"):r.eq(b).hasClass("checked")||r.eq(b).trigger("click");J=!J}});E.on("click","#save",function(b){b.pd();b.sp();b=0;for(var c=f.length;b<c;b++)l[f.eq(b).attr("id")]="checked"===f.eq(b).attr("checked");b=0;for(c=q.length;b<c;b++)p[q.eq(b).attr("id")]=q.eq(b).find("option:selected").val();C.setItem("input_option",D.stringify(l));C.setItem("select_option",D.stringify(p))});m("#wrench").on("click",function(b){b.pd();b.sp();k.toggle();F.toggle()})})})(this,jQuery);