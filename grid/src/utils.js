function range(a, b) {
	var range = [];
	var difference = Math.abs(a - b);
	for (var i = 0; i < difference; i++) {
		range.push(a + i);
	}

	return range;
}

function get_tile_rect(x, y, width, height, ndx) {
	width *= ts;
	height *= ts;

	x -= ts * 0.5;
	y -= ts * 0.5;

	tiles = this.layer.getTiles(x, y, width, height);

	for (var i = 0; i < tiles.length; i++) {
		tile = tiles[i];

		if (tile.index === 0) {
			console.log("it's zero");
		} else if (tile.index != ndx) {
			this.debug_gfx.lineStyle(ts / 8, 0xff0000, 0.3);
			this.debug_gfx.drawRect(x, y, width, height);
			return false;
			break;
		}
	}
	this.debug_gfx.lineStyle(ts / 8, 0x00ff00, 0.3);
	this.debug_gfx.drawRect(x, y, width, height);
	return true;
}

function getTile(map, x, y, ndx) {
	tile = map.getTileWorldXY(x, y, undefined, undefined, undefined, true);

	if (ndx === 0 && tile.index >= 0) {
		//this.debug_gfx.lineStyle(ts / 8, 0x00ff00, 0.3);
		//draw(this.debug_gfx);
		return true;
	} else if (ndx == tile.index) {
		//this.debug_gfx.lineStyle(ts / 8, 0x00ff00, 0.3);
		//draw(this.debug_gfx);
		return true;
	} else if (ndx != tile.index) {
		//this.debug_gfx.lineStyle(ts / 8, 0xff0000, 0.3);
		//draw(this.debug_gfx);
		return false;
	}

	function draw(ctx) {
		if (debug) {
			if (ndx == -1) {
				ctx.moveTo(tile.worldX, tile.worldY);
				ctx.lineTo(tile.worldX + ts, tile.worldY + ts);
				ctx.moveTo(tile.worldX + ts, tile.worldY);
				ctx.lineTo(tile.worldX, tile.worldY + ts);
			} else {
				ctx.drawRect(tile.worldX, tile.worldY, ts, ts);
			}
		}
	}
}

function get_tile_list(x, y, pos, ndx, input) {

	correct = 0;

	for (var i = 0; i < pos.length; i++) {

		xpos = pos[i][0] * ts;
		ypos = pos[i][1] * ts;
		target_index = ndx[i];

		target_x = input.x + xpos;
		target_y = input.y + ypos;

		if (target_x < 0 || target_x > this.game.width - 1 || target_y < 0 || target_y > this.game.height - 1) {
			return false;
			break;
		}

		tile = this.map.getTileWorldXY(target_x, target_y, undefined, undefined, this.layer, true);

		if (target_index === 0 && tile.index >= 0) {
			this.debug_gfx.lineStyle(ts / 8, 0x00ff00, 0.3);
		} else if (tile.index == target_index) {
			this.debug_gfx.lineStyle(ts / 8, 0x00ff00, 0.3);
		} else {
			this.debug_gfx.lineStyle(ts / 8, 0xff0000, 0.3);

			correct -= 1;
		}

		if (debug) {
			if (target_index == -1) {
				this.debug_gfx.moveTo(tile.worldX, tile.worldY);
				this.debug_gfx.lineTo(tile.worldX + ts, tile.worldY + ts);
				this.debug_gfx.moveTo(tile.worldX + ts, tile.worldY);
				this.debug_gfx.lineTo(tile.worldX, tile.worldY + ts);
			} else {
				this.debug_gfx.drawRect(tile.worldX, tile.worldY, ts, ts);
			}
		}

	}

	if (correct >= 0)
		return true;
	else
		return false;
}