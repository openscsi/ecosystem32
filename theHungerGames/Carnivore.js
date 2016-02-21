import Animal from './Animal';
import Herbivore from './Herbivore';
import GeneType from './GeneType';

function Carnivore() {
    if (this.constructor === Carnivore) {
        throw new Error('Cannot instantiate abstract class.');
    }
    Animal.apply(this, arguments);

    this.prey = null;
}

Carnivore.prototype = Object.create(Animal.prototype);
Carnivore.prototype.constructor = Carnivore;

Carnivore.prototype.energyToEat = function energyToEat() {
    throw new Error('You should never end up here!');
};

Carnivore.prototype.setPrey = function setPrey(target) {
    this.prey = target;
};

Carnivore.prototype.isPrey = function isPrey(target) {
    return target instanceof Herbivore;
};

Object.defineProperty(Carnivore, 'MAGIC_TOXIC_NUMBER', {
    value: 0.3,
    writeable: false
});
Object.defineProperty(Carnivore, 'TOXIC_TOLERANCE', {
    value: 0.05,
    writeable: false
});
Object.defineProperty(Carnivore, 'SIZE_LEEWAY', {
    value: -0.1,
    writeable: false
});

Carnivore.prototype.doEating = function doEating() {
    if (this.prey === null || this.prey === undefined
        || this.prey.getCell().getX() !== this.getCell().getX()
        || this.prey.getCell().getY() !== this.getCell().getY()) {
        return 0;
    }

    const hide = Carnivore.hideability(this.prey);
    const see = Carnivore.vision(this);
    if (hide > see) {
        const diff = hide - see;
        if (this.getRandom().nextDouble() < diff) {
            return 0;
        }
    }

    const others = this.getCell().getOtherAnimals(this);
    const predators = [];
    predators.push(this);
    others.forEach(ani => {
        if (this.checkType(ani) && !ani.performedAction()) {
            predators.push(ani);
        }
    });

    const sizeDisp = Carnivore.sizeDisparity(predators, this.prey);
    if (sizeDisp < Carnivore.SIZE_LEEWAY) {
        this.die();
        return 0;
    }

    const speedDisp = Carnivore.speedDisparity(predators, this.prey);
    const totalDisp = sizeDisp * 0.5 + speedDisp;

    if (this.getRandom().nextDouble() * 3 - 1.5 < totalDisp) {
        let nutrition = this.prey.energyAsFood();
        this.prey.die();

        nutrition /= predators.size();

        predators.forEach(ani => {
            if (ani !== this) {
                ani.setPerformedAction(this);
                ani.addEnergy(nutrition);
            }
        });

        const toxicity = this.getGenotype().getGene(GeneType.MARKINGS1) * this.prey.getGenotype().getGene(GeneType.MARKINGS2);
        if (Math.abs(toxicity - Carnivore.MAGIC_TOXIC_NUMBER) < Carnivore.TOXIC_TOLERANCE) {
            nutrition = -nutrition;
        }

        prey = null;
        return nutrition;
    }

    return 0;
};

Carnivore.speedDisparity = function speedDisparity(carnivores, herbivore) {
    if (!(carnivores.length && Array.isArray(carnivores))) {
        carnivores = [carnivores];
    }

    let carniSpeed = 0;
    carnivores.forEach(ani => {
        carniSpeed += Carnivore.getSpeed(ani);
    });
    const herbiSpeed = Carnivore.getSpeed(herbivore);

    return carniSpeed - herbiSpeed;
};

Carnivore.hideability = function hideability(prey) {
    const sizeFactor1 = 0.8;
    const sizeFactor2 = 0.2;
    return (prey.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1
        + prey.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2) * Carnivore.camouflage(prey);
};

Carnivore.vision = function vision(predator) {
    const speedFactor = 0.8;
    const markingFactor2 = 0.2;
    return (predator.getGenotype().getGene(GeneType.SPEED2) * speedFactor
            + predator.getGenotype().getGene(GeneType.MARKINGS2) * markingFactor2) * Carnivore.camouflage(predator);
};

Carnivore.sizeDisparity = function sizeDisparity(carnivores, herbivore) {
    if (!(carnivores.length && Array.isArray(carnivores))) {
        carnivores = [carnivores];
    }

    let carniSize = 0;
    carnivores.forEach(ani => {
        carniSize += Carnivore.getSize(ani);
    });
    const herbiSize = Carnivore.getSize(herbivore);

    return carniSize - herbiSize;
};

Carnivore.getSpeed = function getSpeed(ani) {
    const speedFactor1 = 0.8;
    const speedFactor2 = 0.2;
    return ani.getGenotype().getGene(GeneType.SPEED1) * speedFactor1 + ani.getGenotype().getGene(GeneType.SPEED2) * speedFactor2;
};

Carnivore.getSize = function getSize(ani) {
    const sizeFactor1 = 0.4;
    const sizeFactor2 = 0.6;
    return ani.getGenotype().getGene(GeneType.SIZE1) * sizeFactor1 + ani.getGenotype().getGene(GeneType.SIZE2) * sizeFactor2;
};

Carnivore.camouflage = function camouflage(ani) {
    const markingFactor1 = 0.7;
    const markingFactor2 = 0.3;
    const markings = ani.getGenotype().getGene(GeneType.MARKINGS1) * markingFactor1 + ani.getGenotype().getGene(GeneType.MARKINGS2) * markingFactor2;
    const markDiff = Math.abs(markings - ani.getCell().getMarking());
    return markDiff + 0.5;
};

export default Carnivore;
