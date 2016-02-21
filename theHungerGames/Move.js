import Turn from './Turn';

function Move(direction) {
    Turn.apply(this, arguments);
    this.dire = direction;
}

Move.prototype = Object.create(Turn.prototype);
Move.prototype.constructor = Move;

Move.prototype.doTurn = function doTurn(animal) {
    return animal.makeMove(this.dire);
};

Move.prototype.energyConsumption = function energyConsumption(animal) {
    return animal.energyToMove();
};

export default Move;
