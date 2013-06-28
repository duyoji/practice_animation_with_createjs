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
        this.addChild(this._ship);

        // set listeners
        this.addEventListener('tick', update.bind(this));
        window.addEventListener('keydown', onKeyDown.bind(this));
        window.addEventListener('keyup', onKeyUp.bind(this));
    }

    SpaceScene.prototype = new Container();
    SpaceScene.prototype.className = 'SpaceScene';


    function update (event){
        this._ship.update();
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