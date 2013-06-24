app.views.scenes.PracticeScene = (function () {
	
	// import
	//var Ball      = app.views.Ball;
	//var Rectangle = app.views.Rectangle;
	var Arrow     = app.views.Arrow;
	var Ticker    = createjs.Ticker;   
	var Container = createjs.Container;   
	
	function PracticeScene () {
		this._arrow = new Arrow();
		//this._arrow.x = ( app.stage.canvas.width - this._arrow.getWidth() ) / 2;
		//this._arrow.y = ( app.stage.canvas.height - this._arrow.getHeight() ) / 2;
		this._arrow.x = Math.floor(app.stage.canvas.width / 2);
		this._arrow.y = Math.floor(app.stage.canvas.height / 2);

		this.addChild(this._arrow);
		addListener.call(this);
	};

	PracticeScene.prototype = new Container();


	// public methods
	PracticeScene.prototype.destroy = function () {
		removeListener.call(this);
	};

	// private methods

	// addListenerで上書きしている。(removeListenerでリスナーをけしている)
	PracticeScene.prototype.onStageMouseMoveHandler = function (event) {};


	function addListener() {
		var self = this;
		this.onStageMouseMoveHandler = function (event) {
			self._arrow.rotateWithXandY(event.stageX, event.stageY);
		}

		app.stage.addEventListener('stagemousemove', this.onStageMouseMoveHandler);
	}

	function removeListener() {
		app.stage.removeEventListener('stagemousemove', this.onStageMouseMoveHandler);
		this.onStageMouseMoveHandler = null;
	}

	return PracticeScene;
})();
