var gameName = gameName || {};
gameName.Boot = function(){};
gameName.Boot.prototype = {
    
	preload: function ()
	{
		//preload loading screen stuff
	},
    
	create: function()
	{
		this.game.stage.backgroundColor = '#000';

		//scaling options
		this.scale.scaleMode= Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 4;
		this.scale.minHeight= 3;
		this.scale.maxWidth = this.game.width;
		this.scale.maxHeight= this.game.height;

		//this.game.stage.smoothing = false; 
		//this.game.antialias = false;
		
		//have the game centered horizontally
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		//screen size will be set automatically
		//this.scale.setScreenSize(true);


		//physics system for movement
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.time.advancedTiming = true;
		this.time.desiredFps = 60;
	    
		this.state.start('Preload');
	}

};