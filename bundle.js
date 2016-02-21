(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _Wait = require('./theHungerGames/Wait');

var _Wait2 = _interopRequireDefault(_Wait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Wait = _Wait2.default;

console.log('I am a', _module2.default);

},{"./module":2,"./theHungerGames/Wait":4}],2:[function(require,module,exports){
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
function Turn() {
    if (this.constructor === Turn) {
        throw new Error('Cannot instantiate abstract class.');
    }
}

Turn.prototype.energyConsumption = function energyConsumption(animal) {
    throw new Error('Cannot call abstract method.');
};

Turn.prototype.doTurn = function doTurn(animal) {
    throw new Error('Cannot call abstract method.');
};

Turn.prototype.turn = function turn(animal) {
    var energy = this.energyConsumption(animal);
    if (animal.getEnergyReserve() < energy) {
        return false;
    }

    var result = doTurn(animal);

    if (result) {
        animal.removeEnergy(energy);
    }
    return result;
};

exports.default = Turn;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Turn = require('./Turn');

var _Turn2 = _interopRequireDefault(_Turn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Wait() {
    _Turn2.default.apply(this, arguments);
}

Wait.prototype = Object.create(_Turn2.default.prototype);
Wait.prototype.constructor = Wait;

Wait.prototype.energyConsumption = function energyConsumption() {
    return 0;
};

Wait.prototype.doTurn = function doTurn() {
    return true;
};

exports.default = Wait;

},{"./Turn":3}]},{},[1]);
