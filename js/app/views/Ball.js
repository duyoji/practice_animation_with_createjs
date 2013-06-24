app.views.Ball = (function () {

	// import
	var Graphics = createjs.Graphics;

	function Ball () {
		this.graphics.setStrokeStyle(10).beginStroke("#0000ff").beginFill("#ffff00").drawCircle(0, 0, 50);
	}

	Ball.prototype = new createjs.Shape();


	return Ball;
})();
