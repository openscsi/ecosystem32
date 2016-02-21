import Turn from './Turn';

function Mate(animal) {
    Turn.call(this);
    this.mate = animal;
};

Mate.prototype = Object.create(Turn.prototype);
Mate.prototype.constructor = Mate;

Mate.prototype.doTurn = function doTurn(animal) {
    return animal.mate(this.mate);
};

Mate.prototype.energyConsumption = function energyConsumption(animal) {
    return animal.energyToMate();
};

export default Mate;
