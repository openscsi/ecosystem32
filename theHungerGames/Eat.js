import Turn from './Turn';

function Eat() {
    if (this.constructor === Eat) {
        throw new Error('Cannot instantiate abstract class.');
    }
    Turn.apply(this, arguments);
}

Eat.prototype = Object.create(Turn.prototype);
Eat.prototype.constructor = Eat;

Eat.prototype.energyConsumption = function energyConsumption(animal) {
    return animal.energyToEat();
};

export default Eat;
