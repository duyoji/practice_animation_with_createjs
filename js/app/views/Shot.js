app.views.Shot = (function () {

    // import
    var Container = createjs.Container;
    var Graphics  = createjs.Graphics;
    var Shape     = createjs.Shape;
    var Matrix2D  = createjs.Matrix2D;

    // private member
    var SPEED = 10;

    function Shot (x, y, angle) {
        this.x = x;
        this.y = y;
        this.rotation = angle;

        draw.call(this);
    }

    // Ship.prototype = new Shape();
    Shot.prototype = new Shape();
    Shot.prototype.className = 'Shot';


    /**
     * public method
     */

    Shot.prototype.update = function (params) {
        var ax = Math.cos(this.rotation * Math.PI / 180) * SPEED;
        var ay = Math.sin(this.rotation * Math.PI / 180) * SPEED;
        this.x += ax;
        this.y += ay;
    };

    /**
     * private method
     */
    function draw() {
        this.graphics
            .clear()
            .setStrokeStyle(1)
            .moveTo(0, 0)
            .beginStroke(Graphics.getRGB(255,255,255))
            .lineTo(1, 1);
    }

    return Shot;
})();
