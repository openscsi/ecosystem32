import Cell from './Cell';
import Genotype from './Genotype';
import GeneType from './GeneType';
import GeneSet from './GeneSet';
import Direction from './Direction';
import Arena from './Arena';

function Animal() {
    if (this.constructor === Animal) {
        throw new Error('Cannot instantiate abstract class.');
    }

    this.currentCell = null;
    this.dead = false;
    this.performedAction = false;
    this.age = 0;
    this.gestationElapsed = 0;
    this.fetuses = [];
    this.genotype = null;
}

Animal.makeRandomAnimal(AnimalConstructor) {
    const newAnimal = new AnimalConstructor();
    newAnimal.addGenotype(newAnimal.randomGenotype());
    newAnimal.energyReserve = newAnimal.initialEnergy();
    newAnimal.randomAge();
    return newAnimal;
};

Animal.makeAnimal(AnimalConstructor, genotype) {
    const newAnimal = new AnimalConstructor();
    newAnimal.addGenotype(genotype);
    newAnimal.energyReserve = newAnimal.initialEnergy();
    newAnimal.randomAge();
    return newAnimal;
};

function defineStaticFinal(name, value) {
    Object.defineProperty(Animal, name, {
        value: value,
        writeable: false
    });
}

defineStaticFinal('METABOLISM_FETUS_FACTOR', 0.1);
defineStaticFinal('METABOLISM_SCALE', 10);
defineStaticFinal('METABOLISM_BASE', 1);
defineStaticFinal('MAX_ENERGY_STORAGE_SCALE', 10000);
defineStaticFinal('MAX_ENERGY_STORAGE_BASE', 4000);
defineStaticFinal('SEX_MATURITY_SCALE', 50);
defineStaticFinal('SEX_MATURITY_BASE', 20);
defineStaticFinal('GESTATION_SCALE', 50);
defineStaticFinal('GESTATION_BASE', 10);
defineStaticFinal('GESTATION_BASE', 10);
defineStaticFinal('FERTILITY_SCALE', 9);
defineStaticFinal('ENERGY_AS_FOOD_BASE', 100);
defineStaticFinal('ENERGY_AS_FOOD_SCALE', 5000);
defineStaticFinal('MAX_ENERGY_SCALE', 50);
defineStaticFinal('MAX_ENERGY_BASE', 5);
defineStaticFinal('ENERGY_TO_MATE_SCALE', 3);
defineStaticFinal('ENERGY_TO_MATE_BASE', 1);
defineStaticFinal('ENERGY_TO_MOVE_SCALE', 6);
defineStaticFinal('ENERGY_TO_MOVE_BASE', 0.5);
defineStaticFinal('NTURNS_SCALE', 2);

Animal.prototype.addGenotype = function addGenotype(genotype) {
    this.genotype = genotype;
};

Animal.prototype.getSize = function getSize() {
    return (this.getGenotype().getGene(GeneType.SIZE1) + this.getGenotype().getGene(GeneType.SIZE2)) / 2;
};

Animal.prototype.getSpeed = function getSpeed() {
    return (this.getGenotype().getGene(GeneType.SPEED1) + this.getGenotype().getGene(GeneType.SPEED2)) / 2;
};

Animal.prototype.getMarkings = function getMarkings() {
    return (this.getGenotype().getGene(GeneType.MARKINGS1) + this.getGenotype().getGene(GeneType.MARKINGS2)) / 2;
};

Animal.prototype.fetusAge = function fetusAge() {
    return this.gestationElapsed / this.gestationTime();
};

Animal.prototype.fetusMetabolism = function fetusMetabolism() {
    let total = 0;
    this.fetuses.forEach(ani => {
        total += ani.metabolicConsumption();
        ani.energyReserve += ani.metabolicConsumption() * this.fetusAge();
    });
    return total * this.fetusAge() * Animal.METABOLISM_FETUS_FACTOR;
};

Animal.prototype.randomAge = function randomAge() {
    this.age = Math.floor(Animal.getRandom().nextDouble() * this.ageOfSexualMaturity() * 2);
};

Animal.prototype.metabolicConsumption = function metabolicConsumption() {
    const speedFactor1 = 0.1;
    const speedFactor2 = 0.4;
    const sizeFactor1 = 0.2;
    const sizeFactor2 = 0.3;
    return (this.getGenotype().getGene(GeneType.SPEED1) * speedFactor1 + this.getGenotype().getGene(GeneType.SPEED2) * speedFactor2
        + this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2) * Animal.METABOLISM_SCALE
        + Animal.METABOLISM_BASE + this.fetusMetabolism();
};

Animal.prototype.maxEnergyStorage = function maxEnergyStorage() {
    const sizeFactor1 = 0.8;
    const sizeFactor2 = 0.2;
    return Math.floor((this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2)
        * Animal.MAX_ENERGY_STORAGE_SCALE + Animal.MAX_ENERGY_STORAGE_BASE);
};

Animal.prototype.ageOfSexualMaturity = function ageOfSexualMaturity() {
    const sizeFactor1 = 0.2;
    const sizeFactor2 = 0.5;
    const fertilityFactor = 0.3;
    return Math.floor((this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2 
        + this.getGenotype().getGene(GeneType.FERTILITY) * fertilityFactor) * Animal.SEX_MATURITY_SCALE + Animal.SEX_MATURITY_BASE);
};

Animal.prototype.gestationTime = function gestationTime() {
    const sizeFactor1 = 0.7;
    const sizeFactor2 = 0.3;
    return Math.floor((this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2)
        * Animal.GESTATION_SCALE + Animal.GESTATION_BASE);
};

Animal.prototype.litterSize = function litterSize() {
    return Math.floor(this.getGenotype().getGene(GeneType.FERTILITY) * Animal.FERTILITY_SCALE) + 1;
};

Animal.prototype.initialEnergy = function initialEnergy() {
    return this.maxEnergyStorage() / 2;
};

Animal.prototype.energyAsFood = function energyAsFood() {
    const sizeFactor1 = 0.5;
    const sizeFactor2 = 0.5;
    return (this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2)
        * Animal.ENERGY_AS_FOOD_SCALE + Animal.ENERGY_AS_FOOD_BASE + this.energyReserve;
};

Animal.prototype.dailyEnergyMax = function dailyEnergyMax() {
    const speedFactor1 = 0.1;
    const speedFactor2 = 0.1;
    const sizeFactor1 = 0.5;
    const sizeFactor2 = 0.2;
    return (this.getGenotype().getGene(GeneType.SPEED1) * speedFactor1 + this.getGenotype().getGene(GeneType.SPEED2) * speedFactor2
        + this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2) * Animal.MAX_ENERGY_SCALE
        + Animal.MAX_ENERGY_BASE;
};

Animal.prototype.energyToMate = function energyToMate() {
    const sizeFactor1 = 0.3;
    const sizeFactor2 = 0.7;
    return (this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2)
        * Animal.ENERGY_TO_MATE_SCALE + Animal.ENERGY_TO_MATE_BASE;
};

Animal.prototype.energyToMove = function energyToMove() {
    const speedFactor1 = .3;
    const speedFactor2 = .7;
    const sizeFactor1 = .5;
    const sizeFactor2 = .5;
    return (this.getGenotype().getGene(GeneType.SPEED1) * speedFactor1 + this.getGenotype().getGene(GeneType.SPEED2) * speedFactor2
        + this.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + this.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2) * Animal.ENERGY_TO_MOVE_SCALE
        + Animal.ENERGY_TO_MOVE_BASE;
};

Animal.prototype.energyToEat = function energyToEat() {
    throw new Error('Cannot call abstract method.');
};

Animal.prototype.getNTurns = function getNTurns() {
    const factor1 = .3;
    const factor2 = .7;
    return Math.floor((this.getGenotype().getGene(GeneType.SPEED1) * factor1
        + this.getGenotype().getGene(GeneType.SPEED2) * factor2) * Animal.NTURNS_SCALE + 1);
};

Animal.prototype.getColor = function getColor() {
    throw new Error('Cannot call abstract method.');
};

Animal.prototype.getName = function getName() {
    throw new Error('Cannot call abstract method.');
};

Animal.prototype.getGenotype = function getGenotype() {
    return this.genotype;
};

Animal.prototype.getCell = function getCell() {
    return this.currentCell;
};

Animal.prototype.getArena = function getArena() {
    return this.currentCell.getMap();
};

Animal.prototype.setCell = function setCell(cell) {
    this.currentCell = cell;
};

Animal.prototype.move = function move(newCell) {
    if (newCell.isMoveable()) {
        this.currentCell.move(this, newCell);
        return true;
    }
    return false;
};

Animal.prototype.doTurn = function doTurn() {
    this.beginningOfTurn();
    for (let i = 0; i < this.getNTurns(); i++) {
        this.chooseMove();
    }
    this.endOfTurn();
    this.performedAction = true;
};

Animal.prototype.setPerformedAction = function setPerformedAction(performed) {
    this.performedAction = performed;
};

Animal.prototype.beginningOfTurn = function beginningOfTurn() {
    if (this.energyReserve < 0) {
        this.die();
    }
};

Animal.prototype.chooseMove = function chooseMove() {
    if (this.isPregnant() && this.gestationElapsed >= this.gestationTime()) {
        return this.makeChild();
    }
    const myturn = this.userDefinedChooseMove();
    if (myturn !== null && myturn !== undefined) {
        myturn.turn(this);
    }
};

Animal.prototype.userDefinedChooseMove = function userDefinedChooseMove() {
    throw new Error('Cannot call abstract method.');
};

Animal.prototype.endOfTurn = function endOfTurn() {
    ++this.age;
    if (this.isPregnant()) {
        ++this.gestationElapsed;
    }
    this.energyReserve -= this.metabolicConsumption();
};

Animal.prototype.getEnergyReserve = function getEnergyReserve() {
    return this.energyReserve;
};

Animal.prototype.addEnergy = function addEnergy(energy) {
    this.energyReserve += energy;
    const maxEn = this.maxEnergyStorage();
    if (this.energyReserve > maxEn) {
        this.energyReserve = maxEn;
    }
};

Animal.prototype.removeEnergy = function removeEnergy(energy) {
    this.energyReserve -= energy;
};

Animal.prototype.getAge = function getAge() {
    return this.age;
};

Animal.prototype.getGestationTime = function getGestationTime() {
    return this.gestationElapsed;
};

Animal.prototype.sexuallyMature = function sexuallyMature() {
    return this.age >= this.ageOfSexualMaturity();
};

Animal.prototype.eat = function eat() {
    const food = this.doEating();
    this.addEnergy(food);
    return food > 0;
};

Animal.prototype.doEating = function doEating() {
    throw new Error('Cannot call abstract method.');
};

Animal.prototype.isMale = function isMale() {
    return this.genotype.getGene(GeneType.MALE) > 0;
};

Animal.prototype.isPregnant = function isPregnant() {
    return this.fetuses.length > 0;
};

Animal.prototype.makeChild = function makeChild() {
    this.fetuses.forEach(ani => {
        this.getCell().addAnimal(ani);
    });
    this.fetuses = [];
    this.gestationElapsed = 0;
};

Animal.prototype.mate = function mate(other) {
    if (!this.checkMateability(other)) {
        return false;
    }

    const nKids = this.litterSize();
    for (let i = 0; i < nKids; i++) {
        this.fetuses.push(this.createOffspring(other));
    }
};

Animal.prototype.checkMateability = function checkMateability(other) {
    return this.sexuallyMature() && other.sexuallyMature()
        && !this.isPregnant() && !other.isPregnant()
        && this.isMale() !== other.isMale() && this.checkType(other)
        && this.getCell().getX() === other.getCell().getX()
        && this.getCell().getY() === other.getCell().getY();
};

Animal.prototype.checkType = function checkType(other) {
    return this instanceof other && this.prototype.constructor === other.prototype.constructor;
};

Animal.prototype.createOffspring = function createOffspring(other) {
    const genotype = new Genotype(this.getGenotype().meiosis(), other.getGenotype().meiosis());
    const offspring = new this.constructor();
    offspring.addGenotype(genotype);
    offspring.energyReserve = 0;
    return offspring;
};

Animal.prototype.randomGenotype = function randomGenotype() {
    const fatherGenes = [];
    const motherGenes = [];

    this.randomGenes(fatherGenes, false);
    this.randomGenes(motherGenes, true);

    const father = new GeneSet(fatherGenes);
    const mother = new GeneSet(motherGenes);
    return new Genotype(father, mother);
};

Animal.prototype.randomGenes = function randomGenes(genes, isMother) {
    if (isMother) {
        genes.push(new Gene(GeneType.MALE, 0));
    } else {
        genes.push(new Gene(GeneType.MALE, Arena.getRandom().nextBoolean() ? 0 : 1));
    }

    this._randomGenes.call(this, genes);
};

Animal.prototype._randomGenes = function _randomGenes(genes) {
    genes.add(this.newGene(GeneType.SIZE1));
    genes.add(this.newGene(GeneType.SIZE2));
    genes.add(this.newGene(GeneType.SPEED1));
    genes.add(this.newGene(GeneType.SPEED2));
    genes.add(this.newGene(GeneType.MARKINGS1));
    genes.add(this.newGene(GeneType.MARKINGS2));
    genes.add(this.newGene(GeneType.FERTILITY));
};

Animal.prototype.newGene = function newGene(type) {
    return new Gene(type, this.getInitialGene(type), this.getInitialSD(type));
};

Animal.prototype.getInitialGene = function getInitialGene(type) {
    throw new Error('Cannot call abstract method.');
};

Animal.prototype.getInitialSD = function getInitialSD(type) {
    throw new Error('Cannot call abstract method.');
};

Animal.prototype.reset = function reset() {
    this.performedAction = false;
};

Animal.prototype.die = function die() {
    this.dead = true;
};

Animal.prototype.isDead = function isDead() {
    return this.dead;
};

Animal.prototype.makeMove = function makeMove(dire) {
    if (dire === null || dire === undefined) {
        return false;
    }
    switch(dire) {
        case Direction.LEFT:
            if (this.currentCell.getX() > 0) {
                return this.move(this.currentCell.getMap().getCell(this.currentCell.getX() - 1, this.currentCell.getY()));
            }
            return false;
        case Direction.UP:
            if (this.currentCell.getY() > 0) {
                return this.move(this.currentCell.getMap().getCell(this.currentCell.getX(), this.currentCell.getY() - 1));
            }
            return false;
        case Direction.RIGHT:
            if (this.currentCell.getX() < this.currentCell.getMap().getXDim() - 1) {
                return this.move(this.currentCell.getMap().getCell(this.currentCell.getX() + 1, this.currentCell.getY()));
            }
            return false;
        case Direction.DOWN:
            if (this.currentCell.getY() < this.currentCell.getMap().getYDim() - 1) {
                return this.move(this.currentCell.getMap().getCell(this.currentCell.getX(), this.currentCell.getY() + 1));
            }
            return false;
        case Direction.NO_MOTION:
            return false;
        default:
            throw new Error('Reached unreachable code in makeMove()!');
    }
};

Animal.prototype.performedAction = function performedAction() {
    return this.performedAction;
};

Animal.getRandom() = function getRandom() {
    return Arena.getRandom();
};

export default Animal;
