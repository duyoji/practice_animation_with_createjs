(function (window) {

	// import
	// var PracticeScene = app.views.scenes.PracticeScene;
	// var SpaceScene = app.views.scenes.SpaceScene;
	var SpringScene = app.views.scenes.SpringScene;
	var Stage  = createjs.Stage;
	var Ticker = createjs.Ticker;

	window.addEventListener('load', main);

	function main(event) {
		window.removeEventListener("load", main);

		// stageはどこからでもsceneからでも参照できるようにグローバルのappのプロパティとして保持
		app.stage = new Stage('demoCanvas');
		app.stage.canvas.width  = window.innerWidth;
		app.stage.canvas.height = window.innerHeight;


		// var initialScene = new PracticeScene();
		// var initialScene = new SpaceScene();
		var initialScene = new SpringScene();
		app.stage.addChild(initialScene);


		Ticker.setFPS(60);
		Ticker.addEventListener('tick', handleTick);
	}

	// stageを毎フレームupdate
	function handleTick(event) {
		app.stage.update();
	};
})(window);
