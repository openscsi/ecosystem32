import GeneSet from './GeneSet';

function GeneSet(mamaGenes, papaGenes) {
    this.motherGenes = mamaGenes;
    this.fatherGenes = papaGenes;
};

GeneSet.prototype.getFatherGenes = function getFatherGenes(){
    return this.fatherGenes;
};

GeneSet.prototype.getMotherGenes = function getMotherGenes(){
    return this.motherGenes;
};

GeneSet.prototype.getGeneTypes = function getGeneTypes(){
	return fatherGenes.allGenesInOrder();
    // If something about the genes is breaking, it's probably this
};

GeneSet.prototype.getGene = function getGene(trait) {
	for (var i = 0; i < fatherGenes.allGenesInOrder().length; ++i) {
		if (fatherGenes.allGenesInOrder()[i].getType() == trait) {
			return (fatherGenes.allGenesInOrder()[i].getValue() + motherGenes.allGenesInOrder()[i].getValue()) / 2;
		}
	}
	throw new Error('No such Gene Kim!');
};
