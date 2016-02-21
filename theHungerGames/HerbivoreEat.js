import Eat from './Eat';

function HerbivoreEat() {
    Eat.apply(this, arguments);
}

HerbivoreEat.prototype = Object.create(Eat.prototype);
HerbivoreEat.prototype.constructor = HerbivoreEat;

HerbivoreEat.prototype.doTurn = function doTurn(animal) {
    animal.eat();
    return true;
};

export default HerbivoreEat;
