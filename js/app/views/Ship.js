app.views.Ship = (function () {

    // import
    var Container = createjs.Container;
    var Graphics  = createjs.Graphics;
    var Shape     = createjs.Shape;
    var Matrix2D  = createjs.Matrix2D;
    var Shot  = app.views.Shot;

    function Ship () {
        this._vx    = 0;
        this._vy    = 0;
        this._boost = 0;
        this._shots = [];

        // bodyの中心をthisの原点に持ってきた後this._containerでずらしたぶん戻す
        this._container = new Container();
        this._body   = new Shape();
        draw.call(this);
        this._body.x = this._body.y  = -10;
        this._container.x = this._container.y  = 10;


        this._container.addChild(this._body);
        this.addChild(this._container);
    }

    // Ship.prototype = new Shape();
    Ship.prototype = new Container();
    Ship.prototype.className = 'Ship';


    /**
     * public method
     */
    Ship.prototype.update = function () {
        var radian = this._container.rotation * Math.PI / 180;
        var ax = Math.cos(radian) * this._boost;
        var ay = Math.sin(radian) * this._boost;
        this._vx += ax;
        this._vy += ay;
        this.x += this._vx;
        this.y += this._vy;

        draw.call(this, !!this._boost);

        if (this._shots && this._shots.length > 0) {
            var i, shot;
            for (i = this._shots.length-1 ; 0 <= i; i--) {
                shot = this._shots[i];
                shot.update();

                if (shot.x < 0
                    || shot.x > app.stage.canvas.width
                    || shot.y < 0
                    || shot.y > app.stage.canvas.height
                ) {
                    shot.parent.removeChild(shot);
                    shot = null;
                    this._shots.splice(i,1);
                }
            }
        }
    };

    Ship.prototype.shot = function () {
        var center = 10;
        var radius = 10;
        var angle  = this._container.rotation;
        var x = Math.cos(angle * Math.PI / 180) * radius + center + this.x;
        var y = Math.sin(angle * Math.PI / 180) * radius + center + this.y;

        var shot = new Shot(x, y, angle);
        this.parent.addChild(shot);
        this._shots.unshift(shot);
    };

    Ship.prototype.boost = function (isBoost) {
        this._boost = !!isBoost ? 0.2 : 0;
    };

    Ship.prototype.rotate = function (angle) {
        this._container.rotation += angle;
        this.update();
    };

    /**
     * private method
     */
    function draw(isBoost) {
        isBoost = isBoost || false;

        this._body.graphics
            .clear()
            .setStrokeStyle(1)
            .beginStroke(Graphics.getRGB(255,255,255))
            .moveTo(0, 0)
            .lineTo(20, 10)
            .lineTo(0, 20)
            .lineTo(7, 10)
            .lineTo(0, 0);

        if (isBoost) {
            this._body.graphics
                .setStrokeStyle(1)
                .beginStroke(Graphics.getRGB(255,255,255))
                .moveTo(5, 5)
                .lineTo(-5, 10)
                .lineTo(5, 15);
        }
    }

    return Ship;
})();