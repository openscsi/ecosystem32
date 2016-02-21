import Carnivore from './Carnivore';
import Eat from './Eat';

function CarnivoreEat(prey) {
    Eat.apply(this, arguments);
    this.prey = prey;
}

CarnivoreEat.prototype = Object.create(Eat.prototype);
CarnivoreEat.prototype.constructor = CarnivoreEat;

Object.defineProperty(CarnivoreEat, 'ENERGY_SCALE', {
    value: 10,
    writeable: false
});
Object.defineProperty(CarnivoreEat, 'ENERGY_BASE', {
    value: 2,
    writeable: false
});

CarnivoreEat.prototype.energyConsumption = function energyConsumption(animal) {
    const disparity = Carnivore.speedDisparity(animal, this.prey);
    return CarnivoreEat.ENERGY_BASE - CarnivoreEat.ENERGY_SCALE * (disparity - 1);
};

CarnivoreEat.prototype.doTurn = function doTurn(animal) {
    // TODO: type check animal as `Carnivore`
    animal.setPrey(this.prey);
    return animal.eat();
};

export default CarnivoreEat;
