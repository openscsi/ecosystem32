var Move = function(animal) {
    Turn.call(this);
    this.mate = animal;
};
Move.prototype = Object.create(Turn.prototype);
Move.prototype.constructor = Move;

Move.prototype.doTurn = function(animal) {
    return animal.mate(mate);
}

Move.prototype.energyConsumption = function(animal) {
    return animal.energyToMate();
}
