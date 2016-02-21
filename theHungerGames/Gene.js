import Arena from './Arena';

function Gene(geneType, geneValue, geneSD) {
    if (arguments.length === 3) {
        this.type = geneType;
        this.value = geneValue;
        this.sd = geneSD;
    } else if (arguments.length === 2) {
        this.type = geneType;
        this.value = geneValue;
        this.sd = 0;
    } else if (arguments.length === 1) {
        const gene = geneType;
        this.type = gene.type;
        this.value = gene.value;
        this.sd = gene.sd;
    }

    if (this.value < 0) {
        this.value = 0;
    } else if (this.value > 1) {
        this.value = 1;
    }
    if (this.sd < 0) {
        this.sd = 0;
    }
}

Gene.prototype.constructor = Gene;

Gene.prototype.mutatedVersion = function mutatedVersion() {
    let newVal = this.value + Arena.getRandom().nextGaussian() * this.sd;
    if (newVal < 0) {
        newVal = 0;
    } else if (newVal > 1) {
        newVal = 1;
    }
    return new Gene(this.type, newVal, this.sd);
};

Gene.prototype.getType = function getType() {
    return this.type;
};

Gene.prototype.getValue = function getValue() {
    return this.value;
};

export default Gene;
