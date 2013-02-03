(function(window){
	if(window.cssBlock){
		var _cssBlock=window.cssBlock;
	}
	cssBlock = function () {
		var that = {},
			blocks = [];
		that.length = 0;

		function push(block) {
			blocks[blocks.length] = block;
			that.length += 1;
		};
		function eq(num) {
			var result, key,i,j;
			if (typeof num === "number") {
				result = {};
				for (key in blocks[num]) {
					if (blocks[num].hasOwnProperty(key)) {
						result[key] = blocks[num][key];
					}
				}
			} else {
				result = [];
				for (i = 0, j = blocks.length; i < j; i += 1) {
					result[i] = {};
					for (key in blocks[i]) {
						if (blocks[i].hasOwnProperty(key)) {
							result[i][key] = blocks[i][key];
						}
					}
				}
			}
			return result;
		};
		function init(str) {
			var i,j;
			blocks = [];
			that.length = 0;
			if (-1 !== str.indexOf("{")) {
				var pos=0,start=[],end=[],block=[],change = function (str) {
						this.string = str;
						this.selector = /([^\{]+?)\{/.exec(str)[1];
						this.properties = /\{([\s\S]+?)\}/.exec(str)[1];
					};
				while(str.indexOf("}",pos)>=0){
					end[end.length]=str.indexOf("}",pos);
					pos=str.indexOf("}",pos)+1;
				}
				pos=str.length;
				while(str.lastIndexOf("{",pos)>=0&&pos>=0){
					start[start.length]=str.lastIndexOf("{",pos);
					pos=str.lastIndexOf("{",pos)-1;
				}
				for(var i=0,j=start.length;i<j;i++){
					loop:for(var k=0,l=end.length;k<l;k++){
						if(start[i]<end[k] && (start[i+1]<end[k-1]||!end[k-1]) && end[k]!=null){
							strs:while(start[i]>0){
								if(str.charAt(start[i]-1)=="}"||str.charAt(start[i]-1)==";"){
									break strs;
								}
								start[i]-=1;
							}
							block[block.length]=str.slice(start[i],end[k]+1);
							end[k]=null;
							break loop;
						}
					}
				}//ブロックでわける
				for (i = 0, j = block.length; i < j; i += 1) {
					block[i] = {
						selector: /([^\{]+?)\{/.exec(block[i])[1],//セレクタ
						properties: /\{([\s\S]*?)\}/.exec(block[i])[1],//プロパティ
						string: block[i],//全体
						change: change
					};
					push(block[i]);
				}
			} else {
			   var change = function (str) {
					this.string = str;
					this.properties = str;
				}
				str = {
					properties: str,//プロパティ
					string: str,//全体
					//セレクタは存在しない。
					change: change
				}
				push(str)
			}
		}

		function replace(b,searchValue,newValue){
			var i,j;
			init(b);
			for (i = 0, j = cssBlock.length; i < j; i += 1) {
				var now=eq(i);
				b = b.replace(now.string,now.string.replace(now.properties,now.properties.replace(searchValue,newValue)))
			}
			return b;
		}
		function noConflict(){
			window.cssBlock=_cssBlock;
			return cssBlock;
		}
		that.push = push;
		that.eq = eq;
		that.init = init;
		that.replace=replace;
		that.noConflict=noConflict;
		return that;
	}()
}(this))