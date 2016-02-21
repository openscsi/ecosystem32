(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	previewAnimal: function previewAnimal() {

		var name = document.getElementById('name').value;
		var room = document.getElementById('room').value;
		var color = document.getElementById('color').value;
		var typeForm = document.querySelector('input[name="type"]:checked');
		var type = typeForm ? typeForm.value : null;
		var move = document.getElementById('editor').innerText;
		var genes = {};
		var GENE_LIST = ['size1', 'size2', 'speed1', 'speed2', 'markings1', 'markings2', 'fertility'];
		GENE_LIST.forEach(function (gene) {
			genes[gene] = {
				init: document.getElementById(gene + '-init').value,
				sdev: document.getElementById(gene + '-sdev').value
			};
		});

		return {
			name: name,
			room: room,
			color: color,
			type: type,
			move: move,
			genes: genes
		};
	}
};

},{}],2:[function(require,module,exports){
'use strict';

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _viewer = require('./viewer');

var _viewer2 = _interopRequireDefault(_viewer);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('I am a', _module2.default);

window.viewerMain = function () {
	_viewer2.default.main();
};

window.previewAnimal = function () {
	return _form2.default.previewAnimal();
};

},{"./form":1,"./module":3,"./viewer":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'meme';

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function nameOffset(name, fontSize) {
	return Math.round(name.length * (fontSize / 2) / 2);
}

function Coord(x, y) {
	return {
		x: x,
		y: y
	};
}

function Cell() {
	var color = arguments.length <= 0 || arguments[0] === undefined ? 'ForestGreen' : arguments[0];

	return {
		color: color,
		list: [], //LinkedList of animals on the cell
		draw: function draw(ctx, coord) {
			//Draw cell
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.rect(coord.x, coord.y, cellSize, cellSize);
			ctx.fill();
			ctx.closePath();
			//Draw number of animals
			var text = this.list.length + '';
			var fontSize = 0.75 * cellSize;
			var xOff = nameOffset(text, fontSize);
			var yOff = 1.0 * fontSize;
			var font = fontSize + 'px Consolas';
			ctx.font = font;
			ctx.lineWidth = 1;
			ctx.fillStyle = 'black';
			ctx.fillText(text, coord.x + xOff, coord.y + yOff);
		}
	};
}

var canvas = document.getElementById('game-canvas');

if (canvas) {

	var mapSize = 20;
	var ctx = canvas.getContext('2d');
	var canvasSize = canvas.width;
	var cellSize = canvasSize / mapSize;
	console.log('Cell: ' + cellSize);

	var map = new Map();

	for (var y = 0; y < canvasSize; y += cellSize) {
		for (var x = 0; x < canvasSize; x += cellSize) {
			var color = 'ForestGreen';
			if (x == 20) {
				color = 'GoldenRod';
			}
			map.set(Coord(x, y), Cell(color));
		}
	}

	map.set(getNthCell(0, 0), Cell('GreenYellow'));
	map.set(getNthCell(3, 4), Cell('GreenYellow'));
}

function getNthCell(nX, nY) {
	return Coord(nX * cellSize, nY * cellSize);
}

exports.default = {
	main: function main() {

		ctx.fillStyle = 'ForestGreen';

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2);

				var coord = _step$value[0];
				var cell = _step$value[1];

				cell.draw(ctx, coord);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		console.log("Done!");
	}
};

},{}]},{},[2]);
