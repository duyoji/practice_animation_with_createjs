app.views.scenes.SpringScene = (function () {

    // import
    var Container = createjs.Container;
    var Shape     = createjs.Shape;
    var Graphics  = createjs.Graphics;

    var targetX = window.innerWidth / 2;

    var balls = [];
    var pool  = [];
    var gravity = 0.5;

    function createBall () {
        var ball;
        if (pool.length > 0) {
            ball = pool.shift();
        } else {
            ball = new Shape();
        }

        var r = Math.floor(255 * Math.random());
        var g = Math.floor(255 * Math.random());
        var b = Math.floor(255 * Math.random());
        ball.graphics.beginFill(Graphics.getRGB(r,g,b)).drawCircle(0, 0, 10);
        ball.x = app.stage.canvas.width/2;
        ball.y = app.stage.canvas.height;
        ball.xSpeed = Math.random() * 5 - 2.5;
        ball.ySpeed = - 10 - Math.random() * 5;

        balls.unshift(ball);

        this.addChild(ball);
    }

    function SpringScene () {
        // this.ball = new Shape();
        // this.ball.graphics.beginFill('#00ffff').drawCircle(0, 0, 10);
        // this.ball.x = this.ball.y = 10;

        // this.addChild(this.ball);

        // set listeners
        this.addEventListener('tick', update.bind(this));
    }

    SpringScene.prototype = new Container();
    SpringScene.prototype.className = 'SpringScene';


    var vx = 0;
    function update (event){

        createBall.call(this);

        var i;
        for(i = balls.length - 1; 0 <= i; i--) {
            // var vx = balls[i].xSpeed;
            balls[i].ySpeed += gravity;

            balls[i].x += balls[i].xSpeed;
            balls[i].y += balls[i].ySpeed;

            if (balls[i].y >= window.innerHeight+10) {
                balls[i].parent.removeChild(balls[i]);
                pool.push(balls[i]);
                balls.splice(i,1);
            }
        }

        // console.log(balls.length);

        // バネ運動
        // var dx = targetX - this.ball.x;
        // vx += dx * 0.005;
        // this.ball.x += vx;
    };

    return SpringScene;
})();