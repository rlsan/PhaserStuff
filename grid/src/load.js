var loderunner = loderunner || {};
loderunner.load = function(game) {};

loderunner.load.prototype = {
		//////////////////

		/*
		WORLDS:
		storm village island (the first)
		lego
		bubbles
		cheese moon
		circuit board
		warehouse
		carpentryland
		tall-ass trees
		clouds
		sand castle
		space
		the fortress (where you always get stuck at)
		bubble space
		cloud castle place
		crystal
		computer inside
		everything is connected by strings
		christmas forest
		mechanical pillar in the ocean
		relax beach place that does essentially nothing
		well that's bigger on the inside
		one-screen dimension that's really small
		persian/indian exotic temple area
		mona world
		library of babel


		Game is structured like The Amazing Mirror
		Many areas connected by doors and warps, ultimately a big interconnected maze
		The goal is to collect 6 main treasures, exactly like Wario Land 3
		Like in WL3, some smaller treasures change levels, or grant new abilities
		Cool cutscenes to demonstrate each treasure.
		ABILITIES:
		'grappling hook' = hooks onto ledges and objects sticking out of the ground
			'chain' = upgrade 1: double distance
			'claw'  = upgrade 2: sticks to walls+ceiling
		'traction gloves' = slide down slowly against walls
		'Phil snaps on the gloves like a creepy doctor.'
			'spider lotion' = slide down a little but then stop completely on walls
				'Phil applies the lotion to his gloves.'
			'exoskeleton' = upgrade 2: climb up walls
				'Phil attaches the exoskeleton to his gloves.'
		'stone fish' = lets you properly swim in 8 directions, instead of just diving.
		'Phil holds up the fish next to his face and lets its soul flow into him'

		Room-based camera movement
		Warp to different worlds via the "figures" of Rod
		(man-shaped carvings in walls that can be activated into glowing blue portals)
		The game's setting was left behind by an ancient dimension-hopping society
		Story time:
			Rod was a man who had the power to create portals to different worlds
			He was revered in his society and propped up as a religious figure
			The people would carve his shape into walls as a religious symbol,
			and invite Rod to bless it
			In turn the figures of Rod can be converted to functioning portals
		*/
		//56
		//34x20

		preload: function() {

			loadit = this.game.load;

			this.stage.backgroundColor = "#000";
			//#a3a3a3

			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			// this.scale.minWidth = this.game.width;
			// this.scale.minHeight= this.game.height;
			// this.scale.maxWidth = this.game.width;
			// this.scale.maxHeight= this.game.height;
			//this.scale.pageAlignHorizontally = true;
			//this.scale.pageAlignVertically = true;

			this.game.antialias = false;

			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

			this.time.advancedTiming = true;
			this.time.desiredFps = 60;

			////loading////

			//loadit.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
			//loadit.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');

			loadit.image('transition', 'assets/transition.png');
			loadit.image('maro', 'assets/maro.png');

			loadit.spritesheet('phil', 'assets/player.png', 96, 96);

			loadit.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
			loadit.image('test_tiles', 'assets/test_tiles.png');
		},

		create: function() {
			this.game.state.start("grid");
		}

	} /////////////////