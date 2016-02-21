import GeneSet from './GeneSet';

function Genotype(mamaGenes, papaGenes) {
    this.motherGenes = mamaGenes;
    this.fatherGenes = papaGenes;
};

Genotype.prototype.getFatherGenes = function getFatherGenes(){
    return this.fatherGenes;
};

Genotype.prototype.getMotherGenes = function getMotherGenes(){
    return this.motherGenes;
};

Genotype.prototype.getGeneTypes = function getGeneTypes(){
	return fatherGenes.allGenesInOrder();
    // If something about the genes is breaking, it's probably this
};

Genotype.prototype.getGene = function getGene(trait) {
	for (var i = 0; i < fatherGenes.allGenesInOrder().length; ++i) {
		if (fatherGenes.allGenesInOrder()[i].getType() == trait) {
			return (fatherGenes.allGenesInOrder()[i].getValue() + motherGenes.allGenesInOrder()[i].getValue()) / 2;
		}
	}
	throw new Error('No such Gene Kim!');
};

export default Genotype;
