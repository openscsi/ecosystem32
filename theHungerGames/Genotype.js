import Arena from './Arena';
import GeneSet from './GeneSet';

function Genotype(mamaGenes, papaGenes) {
    this.motherGenes = mamaGenes;
    this.fatherGenes = papaGenes;
};

Genotype.prototype.getFatherGenes = function getFatherGenes() {
    return this.fatherGenes;
};

Genotype.prototype.getMotherGenes = function getMotherGenes() {
    return this.motherGenes;
};

Genotype.prototype.getGeneTypes = function getGeneTypes() {
    return this.fatherGenes.allGenesInOrder();
    // If something about the genes is breaking, it's probably this
};

Genotype.prototype.getGene = function getGene(trait) {
    for (let i = 0; i < this.fatherGenes.allGenesInOrder().length; ++i) {
        if (this.fatherGenes.allGenesInOrder()[i].getType() === trait) {
            return (this.fatherGenes.allGenesInOrder()[i].getValue() + this.motherGenes.allGenesInOrder()[i].getValue()) / 2;
        }
    }
    throw new Error('No such Gene Kim!');
};

Genotype.prototype.meiosis = function meiosis() {
    var father = this.getFatherGenes().allGenesInOrder();
    var mother = this.getMotherGenes().allGenesInOrder();

    var finalList = [];

    for (var i = 0; i < father.length; ++i) {
        if (Arena.getRandom().nextBoolean()) {
            finalList.push(father[i].mutatedVersion());
        } else {
            finalList.push(mother[i].mutatedVersion());
        }
    }

    return new GeneSet(finalList);
};

export default Genotype;
