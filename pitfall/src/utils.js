function wait(context, t, func) {
	bob.game.time.events.add(t, func, context);
}

function isLedge(x, y, dir) {
	x = worldToTile(x) + dir;
	y = worldToTile(y);
	if (!tileAt(x - 1 * dir, y - 1) &&
		!tileAt(x - 1 * dir, y) &&
		!tileAt(x, y - 1) &&
		tileAt(x, y)) {

		return true;
	} else {
		return false;
	}
}

function findEdges(x, y, w, h, dir) {
	ledges = [];
	y -= h / 2;
	x -= (w / 2) - 32;

	boundsX = bob.game.width;
	boundsY = bob.game.height;
	oldX = x;
	oldY = y;

	x = Math.max(0, x);
	y = Math.max(0, y);
	w = (Math.min(boundsX, oldX + w) - x);
	h = (Math.min(boundsY, oldY + h) - y);

	//gfx.drawRect(x, y, w - 64, h - 32);

	map.forEach(ledge, ledges, worldToTile(x), worldToTile(y), worldToTile(w - 1), worldToTile(h - 1));

	function ledge(tile) {

		//console.log(map.fg.getRayCastTiles(line).length);
		if (!tileAt(tile.x - 1 * dir, tile.y - 1) &&
			!tileAt(tile.x - 1 * dir, tile.y) &&
			!tileAt(tile.x, tile.y - 1) &&
			tileAt(tile.x, tile.y)) {

			p = findByName('player1');
			line = new Phaser.Line(tile.x * 32 + 16, tile.y * 32, p.x, p.y);
			//bob.game.debug.geom(line);

			intersections = map.fg.getRayCastTiles(line, null, true);

			if (intersections.length <= 1) {
				//gfx.drawRect(tile.x * 32, tile.y * 32, 32, 32);
				ledges.push([tile.x, tile.y]);

				for (var i = 0; i < intersections.length; i++) {
					//gfx.drawCircle(intersections[i].x * 32 + 16, intersections[i].y * 32 + 16, 16);
				}
			}
		}
	}

	return (ledges);

}

function tileAt(x, y) {
	return map.hasTile(x, y, map.fg);
}

function squareCast(x, y, length, dir) {
	x = worldToTile(x);
	y = worldToTile(y);

	for (var i = 0; i < length; i++) {
		if (map.hasTile(x, y)) {
			return true;
			break;
		} else {
			x += 1 * dir;
		}
	}
	return false;
}

function mSquares(x, y, w, h) {
	for (var i = 0; i < h * w; i++) {
		x1 = Math.floor(i / h);
		y1 = i % h;
		x1 *= map.tileWidth;
		y1 *= map.tileHeight;
		msq(x1 + x, y1 + y);
	}
}

function msq(x, y) {
	w = map.width;
	h = map.height;
	tw = map.tileWidth;
	th = map.tileHeight;

	x = bob.game.math.snapToFloor(x, tw, tw * .5) / tw;
	y = bob.game.math.snapToFloor(y, th, th * .5) / th;
	connections = '';
	for (var a = 0; a <= 1; a++) {
		for (var b = 0; b <= 1; b++) {
			str = '0'
			isTile = map.hasTile(x + a - 1 / 2, y + b - 1 / 2);
			if (isTile) {
				str = '1';
			}
			connections += str;
		}
	}
	thing = parseInt(connections, 2);
	map.detail.putTile(thing, x + .5, y + .5);
}