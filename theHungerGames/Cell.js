import Arena from './Arena';

function Cell(map, x, y) {
    if (Cell.SIZE <= 0) {
        Cell.SIZE = 1; // A default, but not a good one.  Arena should normally set this value
    }

    this.list = [];
    this.markingScore = 0;
    this.map = map;
    this.x = x;
    this.y = y;
    this.chooseRandomMarking();
}

Cell.SIZE = 0;

Cell.setSize = function setSize(size) {
    Cell.SIZE = size;
};

Object.defineProperty(Cell, 'MARKING_MEAN', {
    value: 0.5,
    writeable: false
});
Object.defineProperty(Cell, 'MARKING_SD', {
    value: 0.05,
    writeable: false
});

Cell.prototype.chooseRandomMarking = function chooseRandomMarking() {
    this.markingScore = Arena.getRandom().nextGaussian() * Cell.MARKING_SD + Cell.MARKING_MEAN;
};

Cell.prototype.getMarking = function getMarking() {
    return this.markingScore;
};

Cell.prototype.draw = function draw(graphicObject, xCoord, yCoord){
    graphicObject.fillStyle = getColor();
    graphicObject.beginPath();
    graphicObject.rect(xCoord, yCoord, getXSize(), getYSize());
    graphicObject.fill();
    graphicObject.closePath();

	for (var i = 0; i < list.length; i++) {
        var ian = list[i];
		ian.Draw(graphicObject, xCoord, yCoord);
	}

    graphicObject.fillStyle = "Gainsboro";
    graphicObject.beginPath();
    graphicObject.rect(xCoord, yCoord, getXSize(), getYSize());
    //graphicObject.fill();
    graphicObject.closePath();

};

Cell.prototype.getColor = function getColor(){
    return 'LawnGreen';
};

Cell.prototype.getXSize = function getXSize(){
    return Cell.SIZE;
};

Cell.prototype.getYSize = function getYSize(){
    return Cell.SIZE;
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

Cell.prototype.move = function move(animal, newCell) {
    newCell.addAnimal(animal);
    this.removeAnimal(animal);
    animal.setCell(newCell);
};

Cell.prototype.beginningOfTurn = function beginningOfTurn() {
    let i = this.list.length;
    while (i--) {
        var ian = this.list[i];
        ian.reset();
        if (ian.isDead()) {
            this.list.splice(i, 1);
        }
    }
};

Cell.prototype.doTurn = function doTurn() {
    let allAnimalsDone = false;

    while (!allAnimalsDone) {
        for (let i = 0; i < this.list.length; i++){
            const ian = this.list[i];
            allAnimalsDone = true;

            if (!ian.performedAction()) {
                allAnimalsDone = false;
                ian.doTurn();
                break;
            }
        }
    }
};

Cell.prototype.countAnimals = function countAnimals(keyMap) {
    for (let i = 0; i < this.list.length; i++){
        const ian = this.list[i];
        if (!keyMap.has(ian.getName())) {
            keyMap.set(ian.getName(), 1);
        } else {
            keyMap.set(ian.getName(), keyMap.get(ian.getName()) + 1);
        }
    }
};

Cell.prototype.addAnimal = function addAnimal(animal) {
    this.list.push(animal);
    animal.setCell(this);
};

Cell.prototype.removeAnimal = function removeAnimal(animal) {
    const index = this.list.indexOf(animal);
    if (index === -1) throw new Error('Attempted to remove element that does not exist!');
    this.list.splice(index, 1);
};

Cell.prototype.getOtherAnimals = function getOtherAnimals(original) {
    const response = [];
    for(let i = 0; i < this.list.length; i++){
        if (this.list[i] !== original) response.push(this.list[i]);
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
