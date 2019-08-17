var bob = bob || {};
bob.play = function(game) {
	var gfx;
	var debug = true;
	var keys;
	var sfx;
	var time;
	var treasures;
	var music;
	var clock;
};

bob.play.prototype = {
	gofull: function() {

		if (this.game.scale.isFullScreen) {
			this.game.scale.stopFullScreen();
		} else {
			this.game.scale.startFullScreen(false);
		}

	},
	addKey: function(key) {
		code = 'Phaser.Keyboard.' + key;
		return this.input.keyboard.addKey(eval(code));
	},
	createKeys: function() {
		keys = {
			up: this.addKey('W'),
			left: this.addKey('A'),
			down: this.addKey('S'),
			right: this.addKey('D'),
			action1: this.addKey('SPACEBAR'),
			action2: this.addKey('Z'),
		};
	},

	createAudio: function() {
		sfx = {
			jump: this.game.add.audio('jump'),
			impact: this.game.add.audio('impact'),
			step: this.game.add.audio('step'),
			stephard: this.game.add.audio('stephard'),
			get: this.game.add.audio('get'),
			swing: this.game.add.audio('swing'),
			swoosh: this.game.add.audio('swoosh'),
			treasure: this.game.add.audio('treasure'),
			dust: this.game.add.audio('dust'),
		};
		music = {
			mario: this.game.add.audio('mario'),
		};
	},
	createTimer: function() {
		this.timeLabel = this.game.add.text(this.game.world.centerX, 500, "00:00", {
			font: "36px Arial",
			fill: "#fff"
		});
		this.timeLabel.anchor.setTo(0.5, 0);
		this.timeLabel.align = 'center';

		timer = this.game.time.create();

		// Create a delayed event 1m and 30s from now
		timerEvent = timer.add(Phaser.Timer.MINUTE * 4 + Phaser.Timer.SECOND * 0, this.endTimer, this);

		// Start the timer
		timer.start();
	},

	formatTime: function(s) {
		// Convert seconds (s) to a nicely formatted and padded time string
		var minutes = "0" + Math.floor(s / 60);
		var seconds = "0" + (s - minutes * 60);
		return minutes.substr(-2) + ":" + seconds.substr(-2);
	},
	updateTimer: function() {
		if (timer.running) {
			this.timeLabel.setText(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#ff0");
		} else {
			music.mario.stop();
			this.game.state.start("play");
		}
	},
	endTimer: function() {
		// Stop the timer when the delayed event triggers
		timer.stop();
	},

	create: function() {
		treasures = [];
		time = 0;
		this.game.input.onDown.add(this.gofull, this);

		this.roomType = '';

		this.randumb = this.rnd.between(0, 128);

		this.createAudio();
		this.createKeys();

		music.mario.volume = .6;
		music.mario.loop = true;
		music.mario.play();

		this.test1 = this.game.add.sprite(0, 341, null);
		this.game.physics.arcade.enable(this.test1);
		this.test1.body.immovable = true;
		this.test1.body.setSize(250, 32, 0, 0);

		this.test2 = this.game.add.sprite(0, 341, null);
		this.game.physics.arcade.enable(this.test2);
		this.test2.body.immovable = true;
		this.test2.body.setSize(110, 32, 330, 0);

		this.test3 = this.game.add.sprite(0, 341, null);
		this.game.physics.arcade.enable(this.test3);
		this.test3.body.immovable = true;
		this.test3.body.setSize(110, 32, 960 - 330 - 110, 0);

		this.test4 = this.game.add.sprite(0, 341, null);
		this.game.physics.arcade.enable(this.test4);
		this.test4.body.immovable = true;
		this.test4.body.setSize(250, 32, 960 - 250, 0);

		this.test5 = this.game.add.sprite(0, 514, null);
		this.game.physics.arcade.enable(this.test5);
		this.test5.body.immovable = true;
		this.test5.body.setSize(960, 32, 0, 0);

		this.test6 = this.game.add.sprite(0, 341, null);
		this.game.physics.arcade.enable(this.test6);
		this.test6.body.immovable = true;
		this.test6.body.setSize(80, 20, 250, 0);

		this.test7 = this.game.add.sprite(0, 341, null);
		this.game.physics.arcade.enable(this.test7);
		this.test7.body.immovable = true;
		this.test7.body.setSize(80, 20, 960 - 250 - 80, 0);

		this.test8 = this.game.add.sprite(0, 341, null);
		this.game.physics.arcade.enable(this.test8);
		this.test8.body.immovable = true;
		this.test8.body.setSize(960, 40, 0, 0);

		this.wall = this.game.add.sprite(100, 414, null);
		this.game.physics.arcade.enable(this.wall);
		this.wall.body.immovable = true;
		this.wall.body.setSize(32, 96, 0, 0);

		this.platforms = this.game.add.group();
		this.platforms.add(this.test1);
		this.platforms.add(this.test2);
		this.platforms.add(this.test3);
		this.platforms.add(this.test4);
		this.platforms.add(this.test5);
		this.platforms.add(this.test6);
		this.platforms.add(this.test7);
		this.platforms.add(this.test8);
		this.platforms.add(this.wall);

		this.subbackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'subbackground');
		this.background = this.game.add.image(0, 0, 'background');

		this.ground = this.game.add.sprite(0, 316, 'ground');
		this.game.physics.arcade.enable(this.ground);
		this.ground.body.immovable = true;
		this.ground.body.setSize(960, 4, 0, 25);

		this.subground = this.game.add.sprite(0, 514, 'subground');
		this.game.physics.arcade.enable(this.subground);
		this.subground.body.immovable = true;
		this.subground.body.setSize(960, 4, 0, 8);

		this.vineHit = this.game.add.sprite(0, 514, 'a');
		center(this.vineHit);
		this.game.physics.arcade.enable(this.vineHit);
		this.vineHit.body.immovable = true;
		this.vineHit.renderable = false;

		this.vine = this.game.add.image(this.game.width / 2, 0, 'vine');
		this.vine.anchor.setTo(.05, .5);
		this.game.physics.arcade.enable(this.vine);

		this.shadow = this.game.add.image(0, 341, 'shadow');
		this.shadow.anchor.setTo(.5, .5);
		this.shadow.alpha = .35;
		this.shadow2 = this.game.add.image(0, 341, 'shadow');
		this.shadow2.anchor.setTo(.5, .5);
		this.shadow2.alpha = .35;

		this.gui = this.game.add.image(0, 0, 'gui');
		this.gui.renderable = false;

		this.createTimer();

		this.explosions = this.game.add.group();
		this.explosions.createMultiple(30, 'flash');
		this.explosions.forEach(function(a) {
			a.animations.add('kaboom');
		}, this);

		this.player = new player('p1', 120, 303);

		run.enableUpdate = true;
		run.onUpdate.add(
			function() {
				if (this.player.animations.currentAnim.frame == 5) {
					sfx.step.play();
				}
			}, this);

		this.barrels = this.game.add.group();
		for (var i = 0; i < 5; i++) {
			instance = new barrel(i * 230, 340, i);
			this.barrels.add(instance);
		}

		this.hazards = this.game.add.group();
		for (var i = 0; i < 10; i++) {
			instance = new hazard(755, 320, Math.round((40 / 10 * i) + 2 + this.rnd.between(-1, 1)));
			this.hazards.add(instance);
		}

		this.scorpion = new scorpion(480, 476)
		this.game.physics.arcade.enable(this.scorpion);
		this.scorpion.body.immovable = true;
		this.scorpion.body.setSize(32, 32, 0, 0);

		this.treasures = this.game.add.group();
		for (var i = 0; i < 10; i++) {
			instance = new treasure(770, 302, i, Math.round((40 / 10 * i) + 2 + this.rnd.between(-1, 1)));
			//instance = new treasure(770, 302, i, 39);
			this.treasures.add(instance);
		}

		this.flow = 0.0;
		this.room = 0;
		this.roomSeed = 0;
		this.changeRoom(0);
	},
	test: function() {
		if (this.player.animations.currentAnim.frame == 5) {
			sfx.step.play();
		}
	},
	update: function() {
		for (var i = 0, len = this.platforms.children.length; i < len; i++) {
			child = this.platforms.children[i];
			//this.game.debug.body(child);
		}

		this.updateTimer();
		time++;

		this.game.physics.arcade.collide(this.player, this.platforms, this.collideCallback);
		//this.game.physics.arcade.collide(this.player, this.subground, this.collideCallback);
		this.game.physics.arcade.overlap(this.player, this.barrels,
			function(obj1, obj2) {
				obj1.damage();
			});
		this.game.physics.arcade.overlap(this.player, this.hazards,
			function(obj1, obj2) {
				obj1.damage();
			});
		this.game.physics.arcade.overlap(this.player, this.scorpion,
			function(obj1, obj2) {
				obj1.damage();
			});
		this.game.physics.arcade.overlap(this.barrels, this.hazards,
			function(obj1, obj2) {
				obj1.onFire = true;
			});
		this.game.physics.arcade.overlap(this.player, this.treasures,
			function(obj1, obj2) {
				obj2.get();
				treasures.push(obj2.number);
				sfx.get.play();
			});
		this.game.physics.arcade.overlap(this.player, this.vineHit,
			function(obj1, obj2) {
				obj1.swinging = true;
				sfx.swing.play();
			});

		this.playerUpdate();

		//this.game.debug.text(this.room, 30, 40);
		//this.game.debug.text(treasures, 30, 60);

		//this.game.debug.text(fullClock, 30, 532);

		this.vineHit.x = bob.game.width / 2 + Math.sin(time * .025) * 150;
		this.vineHit.y = 235 + Math.cos(time * .025 * 2) * 20;
		this.vine.rotation = this.game.physics.arcade.angleBetween(this.vine, this.vineHit);

		this.subbackground.tilePosition.x += -.1;

		// if (keys.action2.isDown) {
		// 	this.changeRoom(this.room + 64);
		// }

		// if (clock <= 0) {
		// 	music.mario.stop();
		// 	this.game.state.start("play");
		// }
	},
	collideCallback: function(obj1, obj2) {
		if (obj1.body.touching.down) {
			if (obj1.body.deltaY() > .01) {
				sfx.stephard.play();
			}
		}
	},
	changeRoom: function(newRoom) {

		this.roomType = 'flat';

		// if (this.roomType == 'flat') {
		// 	this.test8.revive();
		// 	this.vineHit.kill();
		// 	this.vine.kill();
		// }
		// if (this.roomType == 'ladder') {
		// 	this.test8.kill();
		// 	this.vineHit.kill();
		// 	this.vine.kill();
		// }
		// if (this.roomType == 'ladderHoles') {
		// 	this.test8.kill();
		// 	this.vineHit.kill();
		// 	this.vine.kill();
		// }
		// if (this.roomType == 'pit') {
		// 	this.test8.kill();
		// 	this.vineHit.revive();
		// 	this.vine.revive();
		// }

		if (this.player.x > 480) {
			dir = 1;
		} else {
			dir = -1;
		}

		this.room = newRoom;
		this.room = mod(this.room, 40);
		this.rnd.sow([this.room + this.randumb]);
		this.roomSeed = this.rnd.integer();

		bars = this.rnd.between(0, 3);

		for (var i = 0, len = this.barrels.children.length; i < len; i++) {

			this.barrels.children[i].direction = dir;

			if (i < bars) {
				this.barrels.children[i].y = 340;
			} else {
				this.barrels.children[i].y = -100;
			}
		}

		for (var i = 0, len = this.hazards.children.length; i < len; i++) {

			child = this.hazards.children[i];

			if (child.room == this.room) {
				child.revive();
			} else {
				child.kill();
			}
		}

		for (var i = 0, len = this.treasures.children.length; i < len; i++) {

			child = this.treasures.children[i];
			if (child.room == this.room && child.collected == false) {
				child.revive();
			} else if (child.collected == false) {
				child.kill();
			}
		}
	},
	playerUpdate: function() {
		p = this.player;

		if (p.x > 960 - 10) {
			p.x = 10;
			if (p.y < 400) {
				this.changeRoom(this.room + 1);
			} else {
				this.changeRoom(this.room + 3);
			}
		}
		if (p.x < 10) {
			p.x = 960 - 10;
			if (p.y < 400) {
				this.changeRoom(this.room - 1);
			} else {
				this.changeRoom(this.room - 3);
			}
		}

		this.shadow.x = p.x;
		this.shadow2.x = this.vineHit.x;

		if (p.y > 350) {
			this.shadow.renderable = false;
		} else {
			this.shadow.renderable = true;
		}

		if (Math.abs(p.body.velocity.x) > 0) {
			this.flow += Phaser.Math.sign(p.body.velocity.x) * 2;
		}
		this.flow -= Phaser.Math.sign(this.flow);

		if (p.swinging) {
			this.vineHit.body.enable = false;
			p.body.x = this.vineHit.x - 24;
			p.body.y = this.vineHit.y - 24;
		}
		if (p.y > 300) {
			this.vineHit.body.enable = true;
		}
		//this.game.debug.bodyInfo(p, 32, 32);

	},
};