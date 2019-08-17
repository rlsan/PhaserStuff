treasure = function(x, y, number, room) {
	Phaser.Sprite.call(this, bob.game, x, y, 'gold');
	bob.game.add.existing(this);
	this.number = number;
	this.room = room;
	//center(this);

	this.game.physics.arcade.enable(this);
	this.body.immovable = true;

	this.body.setSize(36, 36, 20, 20);

	this.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3], 8, true);
	this.animations.add('shine', [0, 0, 4, 4], 20, true);
	this.animations.play('idle');

	this.flash = bob.game.add.sprite(32, 32, 'flash');
	this.flash.animations.add('kaboom');
	center(this.flash);
	this.flash.kill();

	this.emitter = bob.game.add.emitter(100, 400, 400);
	this.emitter.makeParticles('sparkle');

	this.emitter.setRotation(0, 0);
	this.emitter.setXSpeed(-8, 8);
	this.emitter.setYSpeed(-8, 8);
	this.emitter.width = 30;
	this.emitter.height = 30;
	this.emitter.setScale(1, 0, 1, 0, 6000, Phaser.Easing.Quintic.Out);
	this.emitter.gravity = 0;

	// this.emitter.forEach(function(singleParticle) {
	// 	singleParticle.animations.add('particleAnim');
	// 	singleParticle.animations.play('particleAnim', 20, false, true);
	// });

	this.collected = false;
	this.inGUI = false;
	this.newy = 0;

};

treasure.prototype = Object.create(Phaser.Sprite.prototype);
treasure.prototype.constructor = treasure;

treasure.prototype.update = function() {
	this.emitter.x = this.centerX;
	this.emitter.y = this.centerY;

	if (this.inGUI == true) {
		this.y = this.newy + (Math.sin((time + this.x * .5 + this.y) * .05) * 2);
	}

	// if (this.alive)
	// 	bob.game.debug.text(this.number, this.centerX, this.centerY);
}

treasure.prototype.get = function() {
	this.collected = true;
	this.body.enable = false;
	var tween1 = this.game.add.tween(this);
	var tween2 = this.game.add.tween(this);
	var tween3 = this.game.add.tween(this.scale);

	tween1.to({
		y: this.y - 120
	}, 1000, Phaser.Easing.Exponential.Out);
	tween2.to({
		x: 140 + ((this.number / 10.0) * bob.game.width) * .7,
		y: 12,
	}, 900, Phaser.Easing.Quartic.In);
	tween3.to({
		x: 1,
		y: 1,
	}, 900, Phaser.Easing.Quartic.In);
	tween1.chain(tween2);
	tween1.start();
	this.animations.play('shine');

	tween1.onComplete.add(function() {
		sfx.swoosh.play()
		this.animations.play('idle');
		this.animations.stop();
		tween3.start();
		this.emitter.start(false, 5000, 10);
	}, this);
	tween2.onComplete.add(function() {
		//this.emitter.explode(5000, 20);
		this.emitter.on = false;
		sfx.treasure.play()
		this.animations.play('idle');
		this.flash.reset(this.centerX, this.centerY);
		this.flash.play('kaboom', 20, false, true);
		//this.emitter.on = true;
		//this.emitter.start(false, 1000, .1);

		this.inGUI = true;
		this.newy = this.y;

	}, this);

};