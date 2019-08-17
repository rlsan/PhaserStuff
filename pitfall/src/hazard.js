hazard = function(x, y, room) {
	Phaser.Sprite.call(this, bob.game, x, y, 'hazard');
	bob.game.add.existing(this);
	this.room = room;
	center(this);

	this.game.physics.arcade.enable(this);
	this.body.immovable = true;

	this.body.setSize(20, 20, 26, 32);

	this.animations.add('idle', [0, 1], 32, true);
	this.animations.play('idle');
};

hazard.prototype = Object.create(Phaser.Sprite.prototype);
hazard.prototype.constructor = hazard;

hazard.prototype.update = function() {};