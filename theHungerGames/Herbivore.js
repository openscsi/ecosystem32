import Animal from './Animal';
import GeneType from './GeneType';

function Herbivore() {
    if (this.constructor === Herbivore) {
        throw new Error('Cannot instantiate abstract class.');
    }
    Animal.apply(this, arguments);
}

Animal.prototype = Object.create(Animal.prototype);
Animal.prototype.constructor = Herbivore;

Herbivore.prototype.energyToEat = function energyToEat() {
    return this.getGenotype().getGene(GeneType.SIZE1) + this.getGenotype().getGene(GeneType.SIZE2);
};

Herbivore.prototype.doEating = function doEating() {
    return this.getCell().eatFood(this.dailyEnergyMax());
};

export default Herbivore;
