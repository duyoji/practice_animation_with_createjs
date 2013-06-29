app.views.scenes.SpaceScene = (function () {

    // import
    var Container = createjs.Container;
    var Ship      = app.views.Ship;

    // private member
    var Keyboard = {
        LEFT  : 37,
        UP    : 38,
        RIGHT : 39,
        DOWN  : 40
    };

    function SpaceScene () {
        this._ship = new Ship();
        this._ship.x = app.stage.canvas.width/2;
        this._ship.y = app.stage.canvas.height/2;
        this._stars = [];

        this.addChild(this._ship);

        // set listeners
        this.addEventListener('tick', update.bind(this));
        window.addEventListener('keydown', onKeyDown.bind(this));
        window.addEventListener('keyup', onKeyUp.bind(this));
    }

    SpaceScene.prototype = new Container();
    SpaceScene.prototype.className = 'SpaceScene';


    SpaceScene.prototype.createStar = function () {

        var x = Math.floor(Math.random() * app.stage.canvas.width);
        var y = Math.floor(Math.random() * app.stage.canvas.height);

        var star = new createjs.Shape();
        star.graphics
            .clear()
            .setStrokeStyle(1)
            .moveTo(0, 0)
            .beginStroke(createjs.Graphics.getRGB(255,255,255))
            .lineTo(1, 1);

        star.x = x;
        star.y = y;
        star.alpha = 0;
        star.isAlphaDown = false;
        this._stars.unshift(star);
        this.addChild(star);
    };


    function update (event){
        this._ship.update();
        this.createStar();

        var i;

        for (i = this._stars.length - 1; 0 <= i; i--) {
            var star = this._stars[i];

            if (star.isAlphaDown) {
                star.alpha -= 0.025;
                if (star.alpha <= 0) {
                    star.parent.removeChild(star);
                    this._stars.splice(i,1);
                }
            } else {
                star.alpha += 0.025;
                if (star.alpha >= 1) {
                    star.isAlphaDown = true;
                }
            }
        }

    };

    function onKeyDown (event){
        var keyCode = event.keyCode;
        switch(keyCode) {
            case Keyboard.LEFT:
                event.preventDefault();
                this._ship.rotate(-5);
                break;

            case Keyboard.RIGHT:
                event.preventDefault();
                this._ship.rotate(5);
                break;

            case Keyboard.UP:
                event.preventDefault();
                this._ship.boost(true);
                break;

            case Keyboard.DOWN:
                event.preventDefault();
                this._ship.shot();
                break;

            default:
                break;
        }
    };

    function onKeyUp (event){
        var keyCode = event.keyCode;
        if (keyCode === Keyboard.UP) {
            this._ship.boost(false);
        }
    };

    return SpaceScene;
})();