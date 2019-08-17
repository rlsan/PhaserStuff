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

        fuck = this.add.sprite(30, 30, 'items', 5);
        fuck.scale.setTo(2, 2);
        fuck.frame = this.rnd.integerInRange(0, 95);

        this.physics.arcade.enable([fuck], Phaser.Physics.ARCADE);

        keys = this.input.keyboard.addKeys({
            'up': Phaser.KeyCode.W,
            'down': Phaser.KeyCode.S,
            'left': Phaser.KeyCode.A,
            'right': Phaser.KeyCode.D,
            'jump': Phaser.KeyCode.SPACEBAR,
        });

        this.physics.arcade.gravity.y = 1000;
    },

    update: function() {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //fuck.x = this.world.centerX + Math.sin(this.time.now*.003)*300;
        //fuck.y = this.world.centerY - Math.sin(this.time.now*.005)*300;
        maxVelocity = {
            x: 500,
            y: 1000
        };
        acceleration = {
            x: 8000,
            y: 0
        };
        drag = {
            x: 4000,
            y: 0
        };
        jumpForce = 250;

        fuck.body.maxVelocity = maxVelocity;
        fuck.body.drag = drag;
        fuck.body.collideWorldBounds = true;

        //  Up and down movement.

        if (keys.up.isDown && keys.down.isUp) {
            fuck.body.acceleration.y = -acceleration.y;
        } else if (keys.down.isDown && keys.up.isUp) {
            fuck.body.acceleration.y = acceleration.y;
        } else {
            fuck.body.acceleration.y = 0;
        }

        //  Left and right movement.

        if (keys.left.isDown && keys.right.isUp) {
            fuck.body.acceleration.x = -acceleration.x;
        } else if (keys.right.isDown && keys.left.isUp) {
            fuck.body.acceleration.x = acceleration.x;
        } else {
            fuck.body.acceleration.x = 0;
        }

        if (keys.jump.isDown) {
            fuck.body.velocity.y = -jumpForce;
        }

    },

    quitGame: function(pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    }
};