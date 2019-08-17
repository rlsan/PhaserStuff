var gameName = gameName || {};

var scalar = 260;

gameName.game = new Phaser.Game(4*scalar, 3*scalar, Phaser.AUTO);


gameName.game.state.add('Boot', gameName.Boot);
gameName.game.state.add('Preload', gameName.Preload);
gameName.game.state.add('Game', gameName.Game);

gameName.game.state.start('Boot');

/*
    function (i, body, tile) {

            var collides = Phaser.Physics.Arcade.isPointInTriangle(
                body.position.x,                // px
                body.position.y + body.height,  // py
                tile.worldX - tile.width,       // ax
                tile.worldY - tile.height,      // ay
                tile.worldX + (tile.width * 2), // bx
                tile.worldY + (tile.height * 2),// by
                tile.worldX - tile.width,       // cx
                tile.worldY + (tile.height * 2) // cy
            );
            if (collides && body.position.x >= tile.worldX) {
                body.y = tile.worldY - body.height + (body.position.x - tile.worldX);
                if (body.y < tile.worldY - body.height) {
                    body.y = tile.worldY - body.height;
                }
                if (body.y > tile.worldY + tile.height - body.height) {
                    body.y = tile.worldY + tile.height - body.height;
                }
                body.velocity.y = 500;
                body.blocked.down = true;
                return false;
            }
            return true;
        }
*/