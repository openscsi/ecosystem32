(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _viewer = require('./viewer');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('I am a', _module2.default);

_viewer2.default.main();

},{"./module":2,"./viewer":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'meme';

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function Coord(x, y) {
	return {
		x: x,
		y: y
	};
}

function Cell() {
	var color = arguments.length <= 0 || arguments[0] === undefined ? 'white' : arguments[0];

	return {
		color: color,
		draw: function draw(ctx, coord) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.rect(coord.x, coord.y, cellSize, cellSize);
			ctx.fill();
			ctx.closePath();
		}
	};
}

var mapSize = 50;

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var canvasSize = canvas.width;
var cellSize = canvasSize / mapSize;
console.log('Cell: ' + cellSize);

function getNthCell(nX, nY) {
	return Coord(nX * cellSize, nY * cellSize);
}

var map = new Map();

for (var y = 0; y < canvasSize; y += cellSize) {
	for (var x = 0; x < canvasSize; x += cellSize) {
		var color = 'white';
		if (x === 10) {
			color = 'red';
		}
		map.set(Coord(x, y), Cell(color));
	}
}

map.set(getNthCell(0, 0), Cell('blue'));
map.set(getNthCell(3, 4), Cell('blue'));

exports.default = {
	main: function main() {

		ctx.fillStyle = 'white';

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

},{}]},{},[1]);
