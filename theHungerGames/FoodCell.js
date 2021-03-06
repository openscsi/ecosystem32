import Cell from './Cell';
import Arena from './Arena';

function FoodCell(map, x, y) {
    Cell.call(this, map, x, y);

    this.foodMax = Arena.getRandom().nextGaussian() * FoodCell.FOOD_MAX_SD + FoodCell.FOOD_MAX_BASE;
    if (this.foodMax < 0) {
        this.foodMax = 0;
    }
    this.foodAmount = this.foodMax / 2;
}

FoodCell.prototype = Object.create(Cell.prototype);
FoodCell.prototype.constructor = FoodCell;

Object.defineProperty(FoodCell, 'GROWTH_PER_TURN', {
    value: 5,
    writeable: false
});
Object.defineProperty(FoodCell, 'FOOD_MAX_BASE', {
    value: 50,
    writeable: false
});
Object.defineProperty(FoodCell, 'FOOD_MAX_SD', {
    value: 3,
    writeable: false
});
Object.defineProperty(FoodCell, 'GROWTH_SD', {
    value: 1,
    writeable: false
});

FoodCell.prototype.howMuchFood = function howMuchFood() {
    return this.foodAmount;
};

FoodCell.prototype.getMarking = function getMarking() {
    return 2 * Cell.prototype.getMarking.call(this) * (this.foodMax - this.foodAmount) / this.foodMax;
};

FoodCell.prototype.beginningOfTurn = function beginningOfTurn() {
    const growth = Math.max(Arena.getRandom().nextGaussian() * FoodCell.GROWTH_SD + FoodCell.GROWTH_PER_TURN,0);

    this.foodAmount += growth;
    if (this.foodAmount > this.foodMax) {
        this.foodAmount = this.foodMax;
    }
    Cell.prototype.beginningOfTurn.call(this);
};

FoodCell.prototype.getColor = function getColor() {
    const brightness = 1 - ((this.foodAmount) / FoodCell.FOOD_MAX_BASE * 165 / 240);
    return `hsl(110, 85%, ${brightness*100}%)`;
};

FoodCell.prototype.eatFood = function eatFood(amount) {
    if (amount <= this.foodAmount) {
        this.foodAmount -= amount;
        return amount;
    }
    const temp = this.foodAmount;
    this.foodAmount = 0;
    return temp;
};

export default FoodCell;
