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
			var block = str.match(/([.#a-zA-Z ,:\-\[\] = \"\']+?)\{([\s\S]*?)\}/gim),//ブロックでわける
				change = function (str) {
					this.string = str;
					this.selector = /\{([\s\S]+?)\}/.exec(str)[1];
					this.properties = /\{([\s\S]+?)\}/.exec(str)[1];
				};
			for (i = 0, j = block.length; i < j; i += 1) {
				str.replace(block[i], "");
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
	that.push = push;
	that.eq = eq;
	that.init = init;
	that.replace=replace;
	return that;
}()