var loderunner = loderunner || {};
loderunner.grid = function(game) {};

loderunner.grid.prototype = {
	create: function() {
		this.g = this.game.add.graphics();
		this.info = this.game.add.text(0, 0, '', {
			fontSize: 36,
			fill: '#ffffff',
			align: 'center'
		});

		this.maro = this.game.add.sprite(0, this.game.height, 'maro');
		this.game.input.onDown.add(this.gofull, this);
		this.maro.smoothed = false;

		this.maro.anchor.setTo(-2.0, 1);

	},

	gofull: function() {

		if (this.game.scale.isFullScreen) {
			this.game.scale.stopFullScreen();
		} else {
			this.game.scale.startFullScreen(false);
		}

	},
	update: function() {
		r = 16 / 9;

		function interp(x1, x2, f) {
			return x1 + (x2 - x1) * f;
		}

		g = this.g;

		g.clear();

		h = 1080;
		w = h * r;

		cx = this.game.width / 2;
		cy = this.game.height / 2;

		g.lineStyle(2, 0x00ff00);

		left = cx - w * -.5;
		right = cx + w * -.5;
		up = cy - h * -.5;
		down = cy + h * -.5;

		g.moveTo(left, up);
		g.lineTo(left, down);
		g.lineTo(right, down);
		g.lineTo(right, up);
		g.lineTo(left, up);

		g.lineStyle(2, 0xffffff, .25);

		m = Math.floor(Math.pow(this.game.input.y + 250, 2) * .00007) * .0625;
		//console.log(Math.pow(this.game.input.y, 2));
		//m = this.game.input.y * .00625;

		//80px 24x14

		limit = 16 * m;
		for (var i = 0; i < limit; i++) {
			f = i / limit
			g.moveTo(interp(left, right, f), up);
			g.lineTo(interp(left, right, f), down);
		}

		limit = 9 * m;
		for (var i = 0; i < limit; i++) {
			f = i / limit
			g.moveTo(left, interp(up, down, f));
			g.lineTo(right, interp(up, down, f));
		}

		this.game.debug.text('Mouse up/down to change tile size.', 800, 32);
		this.game.debug.text('Tile size (px): ' + h / (9 * m), 32, 32);
		this.game.debug.text('World dimensions (tiles): ' + 16 * m + 'x' + 9 * m, 32, 64);
		size = h / (9 * m)

		this.maro.scale.setTo(size / 48, size / 48);
	},
};