function test(game)
{
	this.game = game;
	this.sprite = null;
	this.thing = 5;
}

test.prototype.create = function()
{
	this.sprite = this.game.add.sprite(this.game.width / 2, 100, 'diamond');
	this.sprite.anchor.setTo(.5,.5);
	this.sprite.tint = 0xaaffaa;
}

test.prototype.update = function()
{
	//this.sprite.scale.x = (Math.sin(time / 11) + 4) / 4;
	//this.sprite.scale.y = (Math.cos(time / 11) + 4) / 4;

	//this.sprite.x += Math.sin(time * .1) * this.game.input.x / 100;
	//this.sprite.y += Math.sin(time * .1) * this.game.input.y / 100;

	this.sprite.x += (this.game.input.x - this.game.width / 2) / 4;
	this.sprite.y += (this.game.input.y - this.game.height / 2) / 4;

	if (this.sprite.x > this.game.width)
		this.sprite.x = 0;
	if (this.sprite.y > this.game.height)
		this.sprite.y = 0;
	if (this.sprite.x < 0)
		this.sprite.x = this.game.width;
	if (this.sprite.y < 0)
		this.sprite.y = this.game.height;
}

