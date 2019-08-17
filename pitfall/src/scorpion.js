scorpion = function(x, y) {
	Phaser.Sprite.call(this, bob.game, x, y, 'scorpion');
	bob.game.add.existing(this);
	center(this);

	this.game.physics.arcade.enable(this);
	this.body.immovable = true;

	this.body.setSize(30, 30, 22, 22);

	this.animations.add('walk', [0, 1], 5, true);
	this.animations.play('walk');
};

scorpion.prototype = Object.create(Phaser.Sprite.prototype);
scorpion.prototype.constructor = scorpion;

scorpion.prototype.update = function() {
	this.x += this.scale.x * .8;
	if (this.x < 300) {
		this.scale.x = 1;
	}
	if (this.x > 960 - 300) {
		this.scale.x = -1;
	}
};