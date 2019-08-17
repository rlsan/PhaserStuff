player = function(name, x, y) {
	Phaser.Sprite.call(this, bob.game, x, y, 'player');
	bob.game.add.existing(this);

	this.name = name;

	center(this);

	this.game.physics.arcade.enable(this);
	this.body.setSize(20, 67, 24, 9);

	this.body.gravity.y = 700;

	this.animations.add('idle', [0]);
	run = this.animations.add('run', range(0, 6), 16, true);
	this.animations.add('jump', [5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 8);
	this.animations.add('climb', range(6, 8), 14, true);
	this.animations.add('swing', [8]);
	this.animations.add('swim', range(9, 12), 14, true);

	this.animations.play('idle');

	this.speed = 170;
	this.body.maxVelocity.x = this.speed;
	this.swinging = false;
};

player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

player.prototype.damage = function() {
	this.animations.play('idle');
	//sfx.impact.play();
	this.y -= 2;
	this.x -= this.scale.x * 2;
};

player.prototype.update = function() {
	p = this;
	vel = p.body.velocity;
	s = this.speed;

	if (this.swinging) {
		p.animations.play('swing');
		if (keys.action1.downDuration(100)) {
			this.swinging = false;
			if (keys.right.isDown) {
				vel.x = s;
				p.scale.x = 1;
			} else if (keys.left.isDown) {
				vel.x = -s;
				p.scale.x = -1;
			} else {
				vel.x = 0;
			}
			vel.y = -240;
			this.inAir = true;
			sfx.jump.play();
		}

	} else {
		if (p.body.touching.down && !p.body.touching.left && !p.body.touching.right) {
			if (keys.right.isDown) {
				vel.x = s;
				p.animations.play('run');
				if (p.scale.x == -1) {
					sfx.dust.play();
				}
				p.scale.x = 1;
			} else if (keys.left.isDown) {
				vel.x = -s;
				p.animations.play('run');
				if (p.scale.x == 1) {
					sfx.dust.play();
				}
				p.scale.x = -1;
			} else {
				vel.x = 0;
				p.animations.play('idle');
			}
			if (keys.action1.downDuration(100)) {
				vel.y = -240;
				this.inAir = true;
				sfx.jump.play();
			}

		} else {
			p.animations.play('jump');
			if (keys.right.isDown) {
				vel.x += 5;
			} else if (keys.left.isDown) {
				vel.x += -5;
			}
		}
	}

	if (p.y > 540) {
		p.y = 250;
	}

	if (Math.abs(vel.x) > 0) {
		this.flow += Phaser.Math.sign(vel.x) * 2;
	}
	this.flow -= Phaser.Math.sign(this.flow);
};