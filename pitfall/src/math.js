function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}

function mod(b, n) {
	return ((b % n) + n) % n;
}

function clampX(obj, width, padding) {
	if (width == undefined) {
		width = 960;
	}
	if (padding == undefined) {
		padding = 0;
	}
	if (obj.x > width - padding) {
		obj.x = padding;
	}
	if (obj.x < padding) {
		obj.x = width - padding;
	}
}

function clampY(obj, height, padding) {
	if (height == undefined) {
		height = 960;
	}
	if (padding == undefined) {
		padding = 0;
	}
	if (obj.y > height - padding) {
		obj.y = padding;
	}
	if (obj.y < padding) {
		obj.y = height - padding;
	}
}

function snap(obj) {
	obj.x = bob.game.math.snapTo(obj.x, map.tileWidth, map.tileWidth * .5);
	obj.y = bob.game.math.snapTo(obj.y, map.tileHeight, map.tileHeight * .5);
}

function snapX(obj) {
	obj.x = bob.game.math.snapTo(obj.x, map.tileWidth, map.tileWidth * .5);
}

function snapY(obj) {
	obj.y = bob.game.math.snapTo(obj.y, map.tileHeight, map.tileHeight * .5);
}

function worldToTile(n) {
	return bob.game.math.snapToFloor(n, map.tileWidth) / map.tileWidth;
}

function addKey(key) {
	code = 'Phaser.Keyboard.' + key;
	return bob.game.input.keyboard.addKey(eval(code));
}

function snap(input) {
	return bob.game.math.snapTo(input, 32, 16);
}

function center(obj) {
	obj.anchor.setTo(0.5, 0.5);
}

function flip(obj, x) {
	obj.scale.x = x * Math.abs(obj.scale.x);
}

function findByName(name) {
	objs = bob.game.world.children;

	for (var i = objs.length - 1; i >= 0; i--) {
		if (objs[i].name == name) {
			return objs[i];
		}
	}
}

function range(a, b) {
	var range = [];
	var difference = Math.abs(a - b);
	for (var i = 0; i < difference; i++) {
		range.push(a + i);
	}
	return range;
}

function style(color) {
	gfx.lineStyle(2, color);

}