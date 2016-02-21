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
    const energy = this.energyConsumption(animal);
    if (animal.getEnergyReserve() < energy) {
        return false;
    }

    const result = doTurn(animal);

    if (result) {
        animal.removeEnergy(energy);
    }
    return result;
};

export default Turn;
