import Arena from './Arena';

function Gene(geneType, geneValue, geneSD) {
    if(arguments.length === 3){
        var type = geneType;
        var value = geneValue;
        var sd = geneSD;

        if (value < 0) {
    		value = 0;
    	} else if (value > 1) {
    		value = 1;
    	}
    	if (sd < 0) {
    		sd = 0;
    	}
    }
    else if (arguments.length === 2) {
        var type = geneType;
        var value = geneValue;
        var sd = 0;

        if (value < 0) {
    		value = 0;
    	} else if (value > 1) {
    		value = 1;
    	}
    	if (sd < 0) {
    		sd = 0;
    	}
    }
    else if (arguments.length === 1) {
        var type = geneType.type;
        var value = geneType.value;
        var sd = geneType.sd;

        if (value < 0) {
    		value = 0;
    	} else if (value > 1) {
    		value = 1;
    	}
    	if (sd < 0) {
    		sd = 0;
    	}
    }
}

Gene.prototype.constructor = Gene;


Gene.prototype.mutatedVersion = function mutatedVersion() {
    var newVal = this.value + Arena.getRandom().nextGaussian() * this.sd;
		if (newVal < 0) {
			newVal = 0;
		} else if (newVal > 1) {
			newVal = 1;
		}
		return new Gene(this.type, this.newVal, this.sd);
};

Gene.prototype.getType = function getType() {
    return this.type;
};

Gene.prototype.getValue = function getValue() {
    return this.value;
};

export default Gene;
