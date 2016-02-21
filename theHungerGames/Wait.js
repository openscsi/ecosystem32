import Turn from './Turn';

function Wait() {
    Turn.apply(this, arguments);
}

Wait.prototype = Object.create(Turn.prototype);
Wait.prototype.constructor = Wait;

Wait.prototype.energyConsumption = function energyConsumption() {
    return 0;
};

Wait.prototype.doTurn = function doTurn() {
    return true;
};

export default Wait;
