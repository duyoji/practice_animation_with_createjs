app.views.Rectangle = (function () {

	function Rectangle () {
		this.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);	
	}

	Rectangle.prototype = new createjs.Shape();


	return Rectangle;
})();
