(function (a) {
	module("update");
	a(function () {
		var $clone = String(a("#board").html());
		test("update", function () {
			function b() {
				stopTime && (start(), stopTime = !1);
				loadComplete ? (equal($clone.replace(/\t/g, ""), $board.children().unwrap().html().replace(/\t/g, ""), "Async"), $board.remove()) : setTimeout(b, 1)
			}
			$board = a("<div/>").load("//pandanoir.web.fc2.com/snowball/snowball.html #board", null, function () {
				loadComplete = !0;
				ok(!0, "html loaded")
			});
			var loadComplete = !1,
				stopTime = !0;
			ok(!loadComplete, "loadComplete is ready");
			stop();
			setTimeout(b,1)
		})
	})
})(jQuery);