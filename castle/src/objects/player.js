player = function(game, x, y) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    //this.body.setSize(48, 96, 12, -4);
    this.body.setSize(32, 64, 48, 60);

    game.slopes.enable(this);

    state = 'grounded';
    colliding = false;

    maxVelocity = {
        x: 270,
        y: 900
    };
    acceleration = {
        x: 9000,
        y: 0
    };
    drag = {
        x: 5000,
        y: 0
    };
    jumpHeight = 82;
    jumpTiming = 50;
    justJumped = false;
    fallingVelocityMultiplier = 0.9;

    gravity = game.physics.arcade.gravity.y;

    this.body.slopes.preferY = true;
    this.body.slopes.pullDown = 100;

    game.add.existing(this);

    this.animations.add('idle', [0, 1, 2, 3, 2, 1], 14, true);
    this.animations.add('run', [4, 5, 6, 7, 8, 9, 10, 11], 14, true);
    this.animations.add('jump', [42, 43, 44, 45, 46, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47], 14, false);
    this.animations.play('idle');
};

player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

player.prototype.update = function() {

    this.body.maxVelocity = maxVelocity;
    this.body.collideWorldBounds = true;
    this.body.drag = drag;

    if (this.body.onFloor() || this.body.touching.down) {
        state = 'grounded';
    } else {
        state = 'air';
    }

    if (state == 'grounded') {

        justJumped = false;
        this.body.maxVelocity.x = 265;

        // left and right movement

        if (keys.left.isDown && keys.right.isUp) {
            this.scale.x = -1;
            this.body.acceleration.x = -acceleration.x;
            this.animations.play('run');
        } else if (keys.right.isDown && keys.left.isUp) {
            this.scale.x = 1;
            this.body.acceleration.x = acceleration.x;
            this.animations.play('run');
        } else {
            this.body.acceleration.x = 0;
            this.animations.play('idle');
        }

        // Jumping

        if (keys.jump.downDuration(jumpTiming)) {
            jumpForce = Math.sqrt(Math.pow(this.body.velocity.y, 2) + 2 * gravity * jumpHeight, 2);
            this.body.velocity.y = -jumpForce;
            justJumped = true;
        }
    }
    if (state == 'air') {
        this.animations.play('jump');

        if (justJumped) {
            this.body.maxVelocity.x = maxVelocity.x;
        } else {
            this.body.maxVelocity.x = maxVelocity.x * fallingVelocityMultiplier;
        }
    }

    this.colliding = false;

};