var bob = bob || {};
bob.load = function(game) {};

bob.load.prototype = {

	preload: function() {
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = 'A9A9A9';
		this.game.time.desiredFps = 60;

		loadit = this.game.load;
		loadit.image('a', 'assets/temp.png');

		loadit.spritesheet('player', 'assets/player.png', 76, 76);
		loadit.spritesheet('barrel', 'assets/barrel.png', 76, 76);
		loadit.spritesheet('scorpion', 'assets/scorpion.png', 76, 76);
		loadit.spritesheet('hazard', 'assets/hazard.png', 76, 76);
		loadit.spritesheet('gold', 'assets/gold.png', 76, 76);
		loadit.image('ground', 'assets/ground.png');
		loadit.image('subground', 'assets/subground.png');
		loadit.image('vine', 'assets/vine.png');
		loadit.image('background', 'assets/background.png');
		loadit.image('subbackground', 'assets/subbackground.png');
		loadit.image('gui', 'assets/gui.png');
		loadit.image('shadow', 'assets/shadow.png');
		loadit.spritesheet('flash', 'assets/flash.png', 128, 128);
		loadit.spritesheet('sparkle', 'assets/sparkle.png', 40, 40);

		loadit.audio('jump', 'assets/sounds/jump.wav');
		loadit.audio('impact', 'assets/sounds/impact.wav');
		loadit.audio('step', 'assets/sounds/step.wav');
		loadit.audio('stephard', 'assets/sounds/stephard.wav');
		loadit.audio('get', 'assets/sounds/get.wav');
		loadit.audio('swing', 'assets/sounds/swing.wav');
		loadit.audio('dust', 'assets/sounds/dust.wav');

		loadit.audio('swoosh', 'assets/sounds/ice07.wav');
		loadit.audio('treasure', 'assets/sounds/treasure.wav');

		loadit.audio('mario', 'assets/music/mario.mp3');

	},

	create: function() {
		this.game.state.start("play");
	}
};