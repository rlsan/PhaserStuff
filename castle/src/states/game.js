BasicGame.Game = function(game) {
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game; //  a reference to the currently running game (Phaser.Game)
    this.add; //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera; //  a reference to the game camera (Phaser.Camera)
    this.cache; //  the game cache (Phaser.Cache)
    this.input; //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load; //  for preloading assets (Phaser.Loader)
    this.math; //  lots of useful common math operations (Phaser.Math)
    this.sound; //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage; //  the game stage (Phaser.Stage)
    this.time; //  the clock (Phaser.Time)
    this.tweens; //  the tween manager (Phaser.TweenManager)
    this.state; //  the state manager (Phaser.StateManager)
    this.world; //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics; //  the physics manager (Phaser.Physics)
    this.rnd; //  the repeatable random number generator (Phaser.RandomDataGenerator)
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};
BasicGame.Game.prototype = {
    create: function() {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        keys = this.input.keyboard.addKeys({
            'up': Phaser.KeyCode.W,
            'down': Phaser.KeyCode.S,
            'left': Phaser.KeyCode.A,
            'right': Phaser.KeyCode.D,
            'jump': Phaser.KeyCode.SPACEBAR,
        });

        this.physics.arcade.gravity.y = 2200;

        map = this.game.add.tilemap('testMap');
        map.addTilesetImage('test', 'test');
        foreground = map.createLayer('foreground');
        map.setCollisionBetween(1, 38);
        this.game.slopes.convertTilemapLayer(foreground, 'arcadeslopes');

        foreground.resizeWorld();

        player = new player(this.game, 1300, 800);

        enemy = this.game.add.sprite(0, 100, 'items', 10);
        enemy.frame = this.rnd.integerInRange(0, 420);
        this.game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);

        enemy.body.collideWorldBounds = true;

        enemyVel = 100;

        enemy.body.immovable = true;
        enemy.body.bounce.y = .3;

        this.game.slopes.enable(enemy);
    },

    update: function() {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        this.game.physics.arcade.collide(player, foreground);

        this.game.physics.arcade.collide(enemy, foreground);

        enemy.body.velocity.x = enemyVel;

        if (enemy.body.blocked.right) {
            enemyVel = -100;
        } else if (enemy.body.blocked.left) {
            enemyVel = 100;
        }

        this.game.physics.arcade.collide(player, enemy, function(obj1, obj2) {
            obj1.colliding = true
            obj1.body.x += obj2.body.deltaX() * .01;
            //obj1.body.y += obj2.body.deltaY();
        });

    },

    quitGame: function(pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    }
};