

time = 0;
currentdate = new Date();

var gameName = gameName || {};
gameName.Game = function(){};
gameName.Game.prototype = {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	preload: function()
	{

		// this.bg = this.game.add.image(
		// 	0,
		// 	0,
		// 	'background');

		this.blackness = this.game.add.image(
			0,
			0,
			'background');
		this.blackness.tint=0x000000;
		this.blackness.scale.setTo(5,5);
	},
	say: function(words)
	{
		this.bubble.loadTexture(this.game.rnd.pick(this.bubbleImages));
		this.sayingText.text=words;

		this.bubble.visible=true;
		this.sayingText.visible=true;
		// \n = linebreak
	},
	unsay: function()
	{
		this.bubble.visible=false;
		this.sayingText.visible=false;
	},

	initBubbles: function()
	{
		this.bubble = this.game.add.image(
			this.game.width/2,
			this.game.height/2,
			null);
		this.bubble.anchor.setTo(.5,.5);
		this.bubble.visible=false;

		this.bubbleImages=
		[
		'bubble1',
		'bubble2',
		'bubble3',
		'bubble4'
		],

		this.face = this.game.add.sprite(
			this.game.width/2,
			this.game.height-64,
			'face');
		this.face.anchor.setTo(.5,.5);

		//this.face.animations.add('talking', [0, 1, 2, 3], 4, true);
		//this.face.animations.play('talking');

		this.eye = this.game.add.sprite(
			this.game.width/2-165,
			this.game.height-50,
			'eye');
		this.eye.anchor.setTo(.5,.5);

		this.pupil = this.game.add.sprite(
			this.game.width/2-165,
			this.game.height-50,
			'pupil');
		this.pupil.anchor.setTo(-.2,.5);
		this.pupil.scale.setTo(.4,.4);

		this.sayingText = this.game.add.bitmapText(this.game.width/2-120, this.game.height/2-64, 'fonty', "I AM SO TIRED...");
		this.sayingText.visible=false;

		this.status={
			satiation:100,
			mood:50
		};

		this.welcomePhrases=
			[
			"I'M VERY HUNGRY"
			,
			"I WONDER WHAT'S\nFOR DINNER?"
			,
			"GOOD TO SEE\nYOU AGAIN"
			,
			"YOU THINK I\nSHOULD GO\nON A DIET?"
			,
			"I WAS ALMOST\nSTARTING TO\nFEEL LONELY"
			];

		this.eyePhrases=
			[
			"HEY!\nI USE THAT\nTO STARE INTO SOULS"
			,
			"MY EYE IS\nNOT A TOY"
			,
			"I'D RATHER PUT\nHOLY WATER IN MY EYE"
			];

		this.angryPhrases=
			[
			"WHY ARE YOU\nDOING THIS"
			,
			"LAST TIME I GOT\nANGRY, I SCARED\nMY FRIEND SATAN"
			,
			"OH, I'M MAD"
			,
			"I'M GOING TO CALL\nDEMON-PROTECTIVE SERVICES\nON YOU"
			];

		this.satisfiedPhrases=
			[
			"ARE YOU A WIZARD?"
			,
			"I AM VERY HAPPY"
			,
			"YOU ARE MY\nFAVORITE MORTAL"
			,
			"I HAVE NO BODY,\nAND I MUST HUG YOU"
			];
		this.goodFoodPhrases=
			[
			"TASTY"
			,
			"I COULD EAT\nTHAT FOR THE REST\nOF TIME"
			];
		this.badFoodPhrases=
			[
			"MY MOUTH IS\n NOT A DUMPSTER"
			,
			"THAT WASN'T EVEN\nREMOTELY DELICIOUS"
			];
		this.goodDrinkPhrases=
			[
			"DRINKY DRINKY"
			,
			"MMM, WHAT IS THAT,\nSPINAL FLUID?"
			];
		this.badDrinkPhrases=
			[
			"ARE YOU USING\nME AS A TOILET?"
			,
			"I DON'T DRINK\nTHIS GARBAGE"
			];
	},

	create: function()
	{
		this.grabsfx = this.game.add.audio('grab');
    		this.grabsfx.allowMultiple = true;
    		this.grabsfx.volume=.3;

    		this.tosssfx = this.game.add.audio('toss');
    		this.tosssfx.allowMultiple = true;
    		this.tosssfx.volume=.1;
		
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('walls');
		this.layer = this.map.createLayer('foreground');
		this.map.setCollisionBetween(1, 9);
		this.game.physics.p2.convertTilemap(this.map, this.layer);

		this.game.physics.p2.setBoundsToWorld(false, false, false, false);

		this.collisionShapes = this.game.physics.p2.convertCollisionObjects(this.map,"mapCollideShapes");

		

		this.game.physics.p2.gravity.y = 1000;
		this.initBubbles();

		this.veggies = this.game.add.group();

		for (var i = 0; i < 10; i++)
		{
			this.c = this.veggies.create(this.game.world.randomX, this.game.world.randomY, 'veggies', this.game.rnd.integerInRange(0, 36));
			this.c.name = 'veg' + i;
			this.c.health = 40*Math.random();
			this.c.anchor.setTo(.5,.5);
			this.game.physics.p2.enable(this.c);
			this.c.body.fixedRotation=true;
			//this.c.body.collideWorldBounds=false;
			this.c.kill();
		}

		this.mouseBody = this.game.add.sprite(100, 100, 'handopen');
		this.game.physics.p2.enable(this.mouseBody, true);
		this.mouseBody.body.static = true;
		this.mouseBody.body.setCircle(1);
		this.mouseBody.body.data.shapes[0].sensor = true;
	        
	    // attach pointer events
	    this.game.input.onDown.add(this.click, this);
	    this.game.input.onUp.add(this.release, this);
	    this.game.input.addMoveCallback(this.move, this);

	    //this.game.time.events.loop(Phaser.Timer.SECOND, this.tossItem, this);
	    this.tossTimer=100;

		
	},

	tossItem: function()
	{
		

		// Recycle using getFirstExists(false)
		// Notice that this method will not create new objects if there's no one
		// available, and it won't change size of this group.
		var enemy = this.veggies.getFirstExists(false);
		var direction = this.game.rnd.pick([-1,1]);

		if (enemy)
		{
			this.tosssfx.play();
		enemy.body.reset(enemy.x,enemy.y);
		enemy.body.x=this.game.width/2+(this.game.width/2*direction)*1.05;
		enemy.body.y=this.game.rnd.pick([160,390,620]);
		enemy.revive();
		enemy.body.applyImpulseLocal([15*direction,15,0], 0, 0)

		}

	},

	click: function(pointer) {

		this.mouseBody.loadTexture('handclosed');


		this.veggiesBodies=[];

		for (var i = 0; i < this.veggies.children.length; i++)
		{
			var current = this.veggies.children[i];

			
			this.veggiesBodies.push(current.body);
		}

	    var bodies = this.game.physics.p2.hitTest(pointer.position, this.veggiesBodies);
	
	    
	    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
	    var physicsPos = [this.game.physics.p2.pxmi(pointer.position.x), this.game.physics.p2.pxmi(pointer.position.y)];
	    
	    if (bodies.length)
	    {
	    	this.grabsfx.play();
	        this.mouseSpring = this.game.physics.p2.createSpring(this.mouseBody, bodies[0], 0, 100, 1);
	       }   

	    this.unsay();

	},

	release: function() {

		this.mouseBody.loadTexture('handopen');

	    // remove constraint from object's body
	    this.game.physics.p2.removeSpring(this.mouseSpring);
	    //this.tosssfx.play();
	    //this.game.physics.p2.removeConstraint(this.mouseConstraint);

	},

	move: function(pointer, x, y, isDown) {

	    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
	    // this.mouseBody.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
	    // this.mouseBody.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
		this.mouseBody.body.x = x;
		this.mouseBody.body.y = y;

	},
	update: function()
	{
		this.tossTimer-=1;
		if(this.tossTimer<=0)
		{
			this.tossItem();
			this.tossTimer=this.game.rnd.between(50,200);
		}
		//this.tossItem();

		this.face.bringToTop();
		this.eye.bringToTop();
		this.pupil.bringToTop();
		this.mouseBody.bringToTop();

		this.blackness.bringToTop();
		this.blackness.alpha-=.02;
		if(this.blackness.alpha<=0 && time<90)
		{
			this.blackness.destroy();
			if(!this.bubble.visible)
				this.say(this.game.rnd.pick(this.welcomePhrases));
		}
		time++;

		this.pupil.rotation = this.game.physics.arcade.angleToPointer(this.pupil);

		//this.pupil.x+=Math.sin(time);
		//this.pupil.y+=Math.sin(time*.5);

		for (var i = 0; i < this.veggies.children.length; i++)
		{
			var current = this.veggies.children[i];

			if(current.body.y>this.game.height)
			{
				current.body.y=-9000;
				current.kill();
				//this.say(this.game.rnd.pick(this.satisfiedPhrases));
			}

   		}
	},

	render: function()
	{
		// if(this.gripping==true)
		// {	
		 	//this.game.debug.geom(this.field,'#ffffff',false);
		// }
		//this.game.debug.text(this.game.rnd.pick(this.bubbleImages), this.game.width/2,this.game.height/2);
	},
};