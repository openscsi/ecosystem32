var Move = function(direction) {
    Turn.call(this);
    this.dire = direction;
};
Move.prototype = Object.create(Animal.prototype);
Move.prototype.constructor = Move;

Move.prototype.doTurn = function(animal) {
    return animal.makeMove(dir);
}

Move.prototype.energyConsumption = function(animal) {
    return animal.energyToMove();
}
