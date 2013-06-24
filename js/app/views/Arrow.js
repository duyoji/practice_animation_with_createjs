app.views.Arrow = (function () {

	// import
	var Graphics = createjs.Graphics;
	var Shape    = createjs.Shape;
	var Matrix2D = createjs.Matrix2D;

	// ハンドラー	
	Arrow.prototype.onTickHandler = function (event) {};


	function Arrow () {
		this._width  = 100;
		this._height = 100;

		this.setWidth(100);
		this.setHeight(100);


		// updateをプライベートで呼び出すためだけのハンドラー
		var self = this;
		this.onTickHandler = function (event) {
			update.call(self);
		}; 

		this.addEventListener('tick', this.onTickHandler);

		drawLayout.call(this);
		
	}

	Arrow.prototype = new Shape();


	/**
	 * private method
	 */

	// tickイベントで毎フレーム呼ばれる
	function update() {
		//this.x += 10;
	}

	function drawLayout() {
		var arrow = new Graphics();
		arrow
			.beginFill("#000000")
			.moveTo(this._width, this._height/2)
			.lineTo(this._width/2, 0)
			.lineTo(this._width/2, this._height/4)
			.lineTo(0, this._height/4)
			.lineTo(0, this._height/4*3)
			.lineTo(this._width/2, this._height/4*3)
			.lineTo(this._width/2, this._height)
			.lineTo(this._width, this._height/2)
			.endFill();

		this.graphics = arrow;
	}

	/**
	 * public method
	 */

	Arrow.prototype.setWidth = function (value) {
		this._width = value;
		//drawLayout.call(this);
	};

	Arrow.prototype.setHeight = function (value) {
		this._height = value;
		//drawLayout.call(this);
	};

	Arrow.prototype.getWidth = function () {
		return this._width;
	};

	Arrow.prototype.getHeight = function () {
		return this._height;
	};

	var testFlag = false;

	// 中心を原点に回転
	Arrow.prototype.rotateWithXandY = function (x, y) {

		


		var pointX = this.getWidth() / 2;  // thisからみた基準点x座標
		var pointY = this.getHeight() / 2; // thisからみた基準点y座標
		var dtX    = x - (this.x + pointX); // pointXからマウスの位置までのx座標の差
		var dtY    = y - (this.y + pointY); // pointYからマウスの位置までのy座標の差
		var angle = Math.atan2(dtY, dtX) * 180 / Math.PI;
		var beforeX = this.x; // matrix変更前のx座標
		var beforeY = this.y; // matrix変更前のy座標
		var afterX, afterY;   // matrix変更後のx,y座標 (変更後に値を代入)
		var newWidth, newHeight; // matrix変更後のwidth,height (変更後に値を代入)

		var tmpMatrix = this.getMatrix();
	
		console.log(beforeX+this.getWidth());
		this.scaleX = this.scaleY = 1;
		if (testFlag) return;

		testFlag = true;

		var matrix = new Matrix2D();
		matrix.translate(-pointX, -pointY);
		//matrix.rotate(angle);
		//matrix.scale(1.1,1.1)
		matrix.scale(2,2);
		matrix.translate(this.x + pointX, this.y + pointY);
		matrix.decompose(this);

		afterX = Math.floor(this.x);
		afterY = Math.floor(this.y);

		var newWidth  = this.getWidth() - ( (afterX - beforeX ) * 2 );
		var newHeight = this.getHeight() - ( (afterY - beforeY ) * 2 );

		this.setWidth(newWidth);
		this.setHeight(newHeight);

		console.log('bx,y : ' + beforeX + ', ' + beforeY + ', ax,y : ' + afterX + ', ' + afterY);
		//console.log('newWidth, newHeight, angle : ' + beforeY + ', ' + afterY + ', ' + newHeight);
		//console.log('newWidth, newHeight, angle : ' + tmpMatrix +  ', ' + matrix);
		//tmpMatrix.decompose(this);
	};

	return Arrow;
})();
