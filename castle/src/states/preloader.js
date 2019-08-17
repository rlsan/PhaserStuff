BasicGame.Preloader = function(game) {

    this.background = null;
    this.preloaderBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function() {

        bmd = this.game.make.bitmapData(this.world.width, 8);

        var grd = bmd.context.createLinearGradient(0, 0, 0, bmd.height);

        grd.addColorStop(0, '#005500');
        grd.addColorStop(.5, '#00ff00');
        grd.addColorStop(1, '#005500');

        bmd.context.fillStyle = grd;
        bmd.context.fillRect(0, 0, bmd.width, bmd.height);

        bmd.generateTexture('preloader', function(texture) {
            this.preloaderBar = this.game.add.sprite(0, this.world.height - bmd.height, texture);
            this.load.setPreloadSprite(this.preloaderBar);
        }, this);

        this.loadAssets();

        // //	Here we load the rest of the assets our game needs.
        // //	As this is just a Project Template I've not provided these assets, swap them for your own.
        // this.load.image('titlepage', 'images/title.jpg');
        // this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
        // this.load.audio('titleMusic', ['audio/main_menu.mp3']);
        // this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
        //	+ lots of other required assets here

    },

    loadAssets: function() {
        this.load.spritesheet('items', 'assets/sprites/items.png', 64, 64);
        this.load.spritesheet('player', 'assets/sprites/player.png', 128, 128);

        this.load.tilemap('testMap', 'assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('test', 'assets/tiles/test.png');
    },

    create: function() {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        //this.preloaderBar.cropEnabled = false;

    },

    update: function() {

        //	You don't actually need to do this, but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //	it's best to wait for it to decode here first, then carry on.

        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.

        // if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        // {
        // 	this.ready = true;
        this.state.start('MainMenu');
        // }

    }

};