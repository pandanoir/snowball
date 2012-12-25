module("update")
$(function(){
	var $clone=String($("#board").html());
	test("update",function(){
		var $board=$("<div/>").load("//pandanoir.web.fc2.com/snowball/snowball.html #board");
		stop();
		setTimeout(function(){
			start();
			equal($clone.replace(/	/g,""),$board.children().unwrap().html().replace(/	/g,""),"Async");
		},10)
	})
})