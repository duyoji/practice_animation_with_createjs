(function (window) {
	
	// import
	var PracticeScene = app.views.scenes.PracticeScene;
	var Stage  = createjs.Stage;
	var Ticker = createjs.Ticker;

	window.addEventListener('load', main);

	function main(event) {
		window.removeEventListener("load", main);
		
		// stageはどこからでもsceneからでも参照できるようにグローバルのappのプロパティとして保持
		app.stage = new Stage('demoCanvas');
		app.stage.canvas.width  = window.innerWidth;
		app.stage.canvas.height = window.innerHeight;


		var practiceScene = new PracticeScene();
		app.stage.addChild(practiceScene);


		//Ticker.setFPS(60);
		Ticker.addEventListener('tick', handleTick);
	}

	// stageを毎フレームupdate
	function handleTick(event) {
		app.stage.update();
	};
})(window);
