import Arena from './Arena';

function Cell(map, x, y) {
    this.SIZE = 0;
    if (this.SIZE <= 0) {
		this.SIZE = 1; // A default, but not a good one.  Arena should normally set this value
	}

    var markingScore;
    var MARKING_MEAN = 0.5;
	var MARKING_SD = 0.05;
    var list = [];

	this.map = map;
	this.x = x;
	this.y = y;
	chooseRandomMarking();
}

Cell.prototype.constructor = Cell;

Cell.prototype.setSize = function setSize(size) {
	this.SIZE = size;
};

Cell.prototype.chooseRandomMarking = function chooseRandomMarking() {
    this.markingScore = Arena.getRandom().nextGaussian() * this.MARKING_SD + this.MARKING_MEAN;
};

Cell.prototype.getMarking = function getMarking() {
    return this.markingScore;
};

Cell.prototype.draw = function draw(graphicObject, xCoord, yCoord){
    throw new Error('Cell Drawing isn\'t implemented yet!');
};

Cell.prototype.getColor = function getColor(){
    return "LawnGreen";
};

Cell.prototype.getXSize = function getXSize(){
    return this.SIZE;
};

Cell.prototype.getYSize = function getYSize(){
    return this.SIZE;
};

Cell.prototype.getX = function getX(){
    return this.y;
};

Cell.prototype.getY = function getY(){
    return this.x;
};

Cell.prototype.getMap = function getMap(){
    return this.map;
};

Cell.prototype.move = function move(animal, newcell) {
    newcell.addAnimal(animal);
    removeAnimal(animal);
    animal.setCell(newcell);
};

Cell.prototype.beginningOfTurn = function beginningOfTurn(){
    for(var i = 0; i < this.list.length; i++){
		var ian = this.list[i];
			ian.reset();
			if (ian.isDead()) {
				ian.remove();
			}
    }
};

Cell.prototype.doTurn = function doTurn(){
    var allAnimalsDone = false;

		while (!allAnimalsDone) {
            for(var i = 0; i < this.list.length; i++){
        		var ian = this.list[i];
			    allAnimalsDone = true;

				if (!ian.performedAction()) {
					allAnimalsDone = false;
					ian.doTurn();
					break;
				}
			}
		}
};

Cell.prototype.countAnimals = function countAnimals(keyMap){
    for(var i = 0; i < this.list.length; i++){
        var ian = this.list[i];
		if (!keyMap.prototype.has(ian.getName())) {
			keyMap.prototype.set(ian.getName(), 1);
		}
		else {
			keyMap.prototype.set(ian.getName(), keyMap.prototype.get(ian.getName()) + 1);
		}
    }
};

Cell.prototype.addAnimal = function addAnimal(animal){
    this.list.push(animal);
    animal.setCell(this);
};

Cell.prototype.removeAnimal = function removeAnimal(animal){
    var index = this.list.indexOf(animal);
    if(index === -1){ throw new Error('Attempted to remove element that does not exist!');}
    this.list.splice(index,1);
};

Cell.prototype.getOtherAnimals = function getOtherAnimals(original){
    var response = [];
    for(var i = 0; i < this.list.length; i++){
        if(this.list[i] !== original) { response.push(this.list[i]); }
    }
    return response;
};

Cell.prototype.isMoveable = function isMoveable() {
    return true;
};

Cell.prototype.howMuchFood = function howMuchFood() {
    return 0;
};

Cell.prototype.eatFood = function eatFood(amount) {
    return 0;
};

export default Cell;
