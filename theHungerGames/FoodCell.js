import Cell from './Cell';
import Arena from './Arena';

function FoodCell(map, x, y) {
    Cell.call(this,map,x,y);
    var foodAmount;
	var GROWTH_PER_TURN = 5;
	var FOOD_MAX_BASE = 50;
	var FOOD_MAX_SD = 3;
	var GROWTH_SD = 1;

	var foodMax;

    foodMax = Arena.getRandom().nextGaussian() * FOOD_MAX_SD + FOOD_MAX_BASE;
		if (foodMax < 0) {
			foodMax = 0;
		}
		foodAmount = foodMax / 2;
}

FoodCell.prototype = Object.create(Cell.prototype);
FoodCell.prototype.constructor = FoodCell;

FoodCell.prototype.getGrowthPerTurn = function getGrowthPerTurn(){
	return this.GROWTH_PER_TURN;
};

FoodCell.prototype.getFoodMax = function getFoodMax(){
	return this.FOOD_MAX_BASE;
};

FoodCell.prototype.howMuchFood = function howMuchFood() {
	return this.foodAmount;
};

FoodCell.prototype.getMarking = function getMarking() {
	return 2 * Cell.prototype.getMarking.call(this) * (this.foodMax - this.foodAmount) / this.foodMax;
    // Does the concept of super even exist in this language?
};

FoodCell.prototype.beginningOfTurn = function beginningOfTurn() {
	var growth = Arena.getRandom().nextGaussian() * this.GROWTH_SD + this.GROWTH_PER_TURN;
	if (growth < 0) {
		growth = 0;
	}
	this.foodAmount += growth;
	if (this.foodAmount > this.foodMax) {
		this.foodAmount = this.foodMax;
	}
	Cell.prototype.beginningOfTurn.call(this);
};

FoodCell.prototype.getColor = function getColor() {
	var brightness = 1 - (this.foodAmount / this.FOOD_MAX_BASE * 165 / 240);
    console.log("The cells don't need to change color or anything");
	return "MediumSeaGreen";
};

export default FoodCell;
