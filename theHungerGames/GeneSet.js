function GeneSet(listIn) {
    var list = listIn;
}

GeneSet.prototype.allGenesInOrder = function allGenesInOrder(animal) {
    return this.list;
};

GeneSet.prototype.constructor = GeneSet;

export default GeneSet;
