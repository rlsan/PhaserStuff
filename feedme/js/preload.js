var gameName = gameName || {};
gameName.Preload = function(){};
gameName.Preload.prototype = {

	preload: function()
	{
		this.game.load.spritesheet('face', 'assets/face.png', 500,130);
		this.game.load.image('background', 'assets/fmbg.gif');
		this.game.load.image('title', 'assets/title.png');
		this.game.load.image('veggies', 'assets/veggies.png');

		this.game.load.audio('introsound', 'assets/spook.ogg');
		this.game.load.audio('grab', 'assets/grab.ogg');
		this.game.load.audio('toss', 'assets/toss.ogg');
		this.game.load.audio('coin', 'assets/coin.ogg');

		this.game.load.image('bubble1', 'assets/bubble1.png');
		this.game.load.image('bubble2', 'assets/bubble2.png');
		this.game.load.image('bubble3', 'assets/bubble3.png');
		this.game.load.image('bubble4', 'assets/bubble4.png');

		this.game.load.image('handopen', 'assets/handopen.png');
		this.game.load.image('handclosed', 'assets/handclosed.png');

		this.game.load.image('eye', 'assets/eye.png');
		this.game.load.image('pupil', 'assets/pupil.png');

		this.game.load.bitmapFont('fonty', 'assets/feedme.png', 'assets/feedme.fnt');

		this.game.load.tilemap('map', 'assets/collide.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('walls', 'assets/walls.png');
	},

	create: function()
	{
		this.introsound = this.game.add.audio('introsound');
    		this.introsound.allowMultiple = true;
    		this.introsound.volume=2;
    		this.coinsfx = this.game.add.audio('coin');
    		this.coinsfx.allowMultiple = true;
    		this.coinsfx.volume=.5;

		//this.next(); //THIS SKIPS THE TITLE
		this.game.input.onDown.add(this.next, this);

		this.game.time.events.add(Phaser.Timer.SECOND * .8, this.appearText, this);
		this.game.time.events.add(Phaser.Timer.SECOND * 1.8, this.fadeText, this);
		this.game.time.events.add(Phaser.Timer.SECOND * 4.5, this.appearTitle, this);
		this.game.time.events.add(Phaser.Timer.SECOND * 7.5, this.fadeTitle, this);
		this.game.time.events.add(Phaser.Timer.SECOND * 8.5, this.next, this);
	},

	fadeText: function()
	{
		this.game.add.tween(this.t).to( { alpha: 0 }, 900, Phaser.Easing.Linear.None, true);
	},

	fadeTitle: function()
	{
		this.game.add.tween(this.title).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
	},

	appearText: function()
	{
		this.coinsfx.play();
		var text = "2016 - Riker Sandvik";
		var style = { font: "25pt Arial", fill: "#888888", align: "center" };

		this.t = this.game.add.text(this.game.width/2-140, this.game.height/2-20, text, style);
	},

	appearTitle: function()
	{
		this.introsound.play();
		this.title = this.game.add.image(
			this.game.width/2-175,
			this.game.height/2-32,
			'title');
	},

	next: function()
	{
    		this.state.start('Game');
	}
};