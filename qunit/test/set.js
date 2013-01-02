module("update")
$(function(){
	var $clone=String($("#board").html());
	test("update",function(){
		var $board=$("<div/>").appendTo("body").load("//pandanoir.web.fc2.com/snowball/snowball.html #board",null,function(){
			loadComplete=true;
			ok(true,"html loaded")
		});
		var loadComplete=false,stopTime=true;
		ok(!loadComplete,"loadComplete is ready")
		stop();
		setTimeout(checker,10)
		function checker(){
			if(stopTime){start();stopTime=false}
			if(loadComplete){
				equal($clone.replace(/	/g,""),$board.children().unwrap().html().replace(/	/g,""),"Async");
				$board.remove()
			}else{
				setTimeout(checker,10)
			}
		}
	})
})