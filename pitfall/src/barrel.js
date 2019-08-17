barrel = function(x, y, no) {
	Phaser.Sprite.call(this, bob.game, x, y, 'barrel');
	bob.game.add.existing(this);

	center(this);

	this.game.physics.arcade.enable(this);
	this.body.immovable = true;

	this.body.setSize(36, 36, 20, 20);

	this.animations.add('roll', [0, 0, 0, 0, 1], 10, true);
	this.animations.play('roll');
	this.animations.next(no);

	this.direction = -1;

	this.onFire = false;
};

barrel.prototype = Object.create(Phaser.Sprite.prototype);
barrel.prototype.constructor = barrel;

barrel.prototype.update = function() {
	if (this.onFire) {
		this.tint = 0xff0000;
	} else {
		this.tint = 0xffffff;
	}
	vel = this.body.velocity;

	vel.x = 170 * this.direction;

	if (this.x > 960 - -15) {
		this.x = -15;
		this.onFire = false;
	}
	if (this.x < -15) {
		this.x = 960 - -15;
		this.onFire = false;
	}
};