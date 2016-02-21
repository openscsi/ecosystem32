import Random from './Random';
import Cell from './Cell';
import Coord from './Coord';
import Herbivore from './Herbivore';

function Arena(xsizeIn, ysizeIn, cellSize){
    var xsize = xsizeIn;
    var ysize = ysizeIn;
    Cell.setSize(cellSize);
    initialize();
}

Arena.prototype.constructor = Arena;

Arena.prototype.isHerbivore = function isHerbivore(name){
    return (herbivoreNames.indexOf(name) > -1);
};

Arena.prototype.getRandom = function getRandom(){
    return Random;
};

Arena.prototype.setSeed = function setSeed(siid){
    throw new Error('Seed Setting isn\'t actually implemented... Sorry about that.');
};

Arena.prototype.setPrintout = function setPrintout(print){
    this.printout = print;
};

Arena.prototype.setFile = function setFile(file){
    throw new Error('Yeah... you can\'t output to a file because reasons.');
};

Arena.prototype.Draw = function Draw(graphicObject, xCoord, yCoord){
    throw new Error('We don\'t know how to draw things yet so good luck with that.');
};

Arena.prototype.getXSize = function getXSize(){
    return getCell(0, 0).getXSize() * (getXDim() + 1);
};

Arena.prototype.getYSize = function getYSize(){
    return getCell(0, 0).getYSize() * (getYDim() + 2);
};

Arena.prototype.getXDim = function getXDim(){
    return this.xsize;
};

Arena.prototype.getYDim = function getYDim(){
    return this.ysize;
};

Arena.prototype.initialize = function initialize(){
    for (var ix = 0; ix < this.xsize; ++ix) {
        for (var iy = 0; iy < this.ysize; ++iy) {
            this.map.put(new Coord(ix, iy), new Cell(this, ix, iy));
        }
    }
};

Arena.prototype.getNDays = function getNDays(){
    return this.ndays;
};

Arena.prototype.changeCell = function changeCell(xCoord, yCoord, newCell){
    var coord = new Coord(xCoord, yCoord);
    this.map.put(coord, newCell);
}

Arena.prototype.addAnimal = function addAnimal(xCoord, yCoord, an){
    getCell(xCoord, yCoord).addAnimal(an);

    if (!this.colorMap.has(an)) {
        this.colorMap.put(an.getName(), an.getColor());
        if (an instanceof Herbivore) {
            this.herbivoreNames.push(an.getName());
        }
        updateMap();
    }
};

Arena.prototype.addRandomAnimal = function addRandomAnimal(an){
    var x = getRandom().nextInt(getXDim());
    var y = getRandom().nextInt(getYDim());
    while(getCell(x, y) instanceof WallCell){
        x = getRandom().nextInt(getXDim());
        y = getRandom().nextInt(getYDim());
    }
    addAnimal(x, y, an);
};

Arena.prototype.addRandomTeamAnimal = function addRandomTeamAnimal(an, team){
    var x = getRandom().nextInt(getXDim());
    var y = getRandom().nextInt(getYDim());
    switch(team){
    case 1:
        while(!(x < 31 && y < 31)){
            x = getRandom().nextInt(getXDim());
            y = getRandom().nextInt(getYDim());
        }
        break;
    case 2:
        while(!(x > 31 && y < 31)){
            x = getRandom().nextInt(getXDim());
            y = getRandom().nextInt(getYDim());
        }
        break;
    case 3:
        while(!(x < 31 && y > 31)){
            x = getRandom().nextInt(getXDim());
            y = getRandom().nextInt(getYDim());
        }
        break;
    case 4:
        while(!(x > 31 && y > 31)){
            x = getRandom().nextInt(getXDim());
            y = getRandom().nextInt(getYDim());
        }
        break;
    }
    while(getCell(x, y) instanceof WallCell){
        x = getRandom().nextInt(getXDim());
        y = getRandom().nextInt(getYDim());
    }
    addAnimal(x, y, an);
};

Arena.prototype.addRandomForeignAnimal = function addRandomForeignAnimal(an, foreign){
    var x = getRandom().nextInt(getXDim());
    var y = getRandom().nextInt(getYDim());
    if(foreign){
        while(!(x > 31)){
            x = getRandom().nextInt(getXDim());
        }
    }
    if(!foreign){
        while(!(x < 31)){
            x = getRandom().nextInt(getXDim());
        }
    }
    while(getCell(x, y) instanceof WallCell){
        x = getRandom().nextInt(getXDim());
        y = getRandom().nextInt(getYDim());
    }
    addAnimal(x, y, an);
};

Arena.prototype.getCell = function getCell(xCoord, yCoord){
    return this.map.get(new Coord(x, y));
};

// I'd be lying if I said I wanted to write this function
Arena.prototype.doTurn = function doTurn(){
    var values = this.map.values();
    while (values.hasNext()) {
        var icell = values.next();
        icell.beginningOfTurn();
    }
    values = this.map.values();
    while (values.hasNext()) {
        icell = values.next();
        icell.doTurn();
    }

    updateMap();
    updateFinal();

    this.ndays++;

    if(this.ndays === 100){
        var entriesIter = map.entrySet();
        while (entriesIter.hasNext()){
            entry = entriesIter.next();

            if(entry.value instanceof WallCell){
                //Yeah, this line was nasty so we deleted it. Probably fine. 
                try {
                    changeCell(entry.value.getX(), entry.value.getY(), new FoodCell(this, entry.value.getX(), entry.value.getY()));
                } catch (err) {
                    changeCell(entry.value.getX(), entry.value.getY(), new FoodCell(this, entry.value.getX(), entry.value.getY()));
                    console.log(err);
                }
            }

        }

    }

    if (this.printout) {
        console.log(countAnimals());
    }

    if (checkStillGoing()) {
        return true;
    } else {
        outputFinal();
        return false;
    }
};

export default Arena;
