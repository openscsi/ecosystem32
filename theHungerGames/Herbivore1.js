import GeneType from './GeneType';
import Arena from './Arena';
import HerbivoreEat from './HerbivoreEat';
import Move from './Move';
import Direction from './Direction';
import Herbivore from './Herbivore';
import Mate from './Mate'

function Herbivore1(){
    Herbivore.apply(this, arguments);
}

Herbivore1.prototype = Object.create(Herbivore.prototype);
Herbivore1.prototype.constructor = Herbivore1;

Herbivore1.prototype.getColor = function getColor(){
    return "Magenta";
}

Herbivore1.prototype.getName = function getName(){
    return "Javatar";
}

Herbivore1.prototype.userDefinedChooseMove = function userDefinedChooseMove(){
    var others = this.getCell().getOtherAnimals(this);
        for (var i = 0; i < others.length; i++) {
            var ani = others[i]
            if (this.checkMateability(ani)) {
                return new Mate(ani);
            }
        }
    if (Arena.getRandom().nextBoolean()) {
        return new HerbivoreEat();
    } else {
        return new Move(Direction.randomDirection());
    }
}

Herbivore1.prototype.getInitialGene = function getInitialGene(type) {

    let ranNum = Arena.getRandom().nextGaussian() * 0.1 + 0.5;

    switch(type) {
    case GeneType.SIZE1:
        return ranNum;

    case GeneType.SIZE2:
        return ranNum;

    case GeneType.SPEED1:
        return ranNum;

    case GeneType.SPEED2:
        return ranNum;

    case GeneType.MARKINGS1:
        return ranNum;

    case GeneType.MARKINGS2:
        return ranNum;

    case GeneType.FERTILITY:
        return ranNum;

    default:
        throw new Error("Never reach here");

    }
};

Herbivore1.prototype.getInitialSD = function getInitialSD(type) {
    switch(type) {
    case GeneType.SIZE1:
        return 0.1;

    case GeneType.SIZE2:
        return 0.1;

    case GeneType.SPEED1:
        return 0.1;

    case GeneType.SPEED2:
        return 0.1;

    case GeneType.MARKINGS1:
        return 0.1;

    case GeneType.MARKINGS2:
        return 0.1;

    case GeneType.FERTILITY:
        return 0.1;

    default:
        throw new Error("Never reach here");

    }
};

export default Herbivore1;
