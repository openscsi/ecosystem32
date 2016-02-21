function GeneSet(listIn) {
    this.list = listIn;
}

GeneSet.prototype.allGenesInOrder = function allGenesInOrder() {
    return this.list;
};

GeneSet.prototype.constructor = GeneSet;

export default GeneSet;
