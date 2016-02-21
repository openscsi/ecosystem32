import Random from './Random';
import Cell from './Cell';
import Coord from './Coord';
import Herbivore from './Herbivore';
import SortDistance from './SortDistance';
import WallCell from './WallCell';

function Arena(xsizeIn, ysizeIn, cellSize){
    this.xsize = xsizeIn;
    this.ysize = ysizeIn;
    Cell.setSize(cellSize);

    this.ndays = 0;
    this.map = new Map();
    this.aniMap = new Map();
    this.colorMap = new Map();
    this.allAnimals = [];
    this.finalMap = new Map();
    this.herbivoreNames = [];

    this.initialize();
}

Arena.prototype.constructor = Arena;

Arena.prototype.isHerbivore = function isHerbivore(name) {
    return this.herbivoreNames.indexOf(name) > -1;
};

Arena.getRandom = function getRandom() {
    return Random;
};

Arena.prototype.setSeed = function setSeed(seed) {
    throw new Error('Seed Setting isn\'t actually implemented... Sorry about that.');
};

Arena.prototype.setPrintout = function setPrintout(print) {
    this.printout = print;
};

Arena.prototype.setFile = function setFile(file) {
    throw new Error('Yeah... you can\'t output to a file because reasons.');
};

Arena.prototype.draw = function draw(graphicObject, xCoord, yCoord) {
    console.log("Breakpoint me!");
    var coordIter = this.map.keys();
    //console.log(coordIter);
    var icoord = {};
    icoord.done = false;
    while (!icoord.done) {
        icoord = coordIter.next();
        if(!icoord.done){ // This is diiiiiirrrrrrty
		this.map.get(icoord.value).draw(graphicObject, xCoord + JSON.parse(icoord.value).x * this.map.get(icoord.value).getXSize(),
				yCoord + JSON.parse(icoord.value).y * this.map.get(icoord.value).getYSize());
        }
	}
};

Arena.prototype.getXSize = function getXSize() {
    return this.getCell(0, 0).getXSize() * (this.getXDim() + 1);
};

Arena.prototype.getYSize = function getYSize() {
    return this.getCell(0, 0).getYSize() * (this.getYDim() + 2);
};

Arena.prototype.getXDim = function getXDim() {
    return this.xsize;
};

Arena.prototype.getYDim = function getYDim() {
    return this.ysize;
};

Arena.prototype.initialize = function initialize() {
    for (let ix = 0; ix < this.xsize; ++ix) {
        for (let iy = 0; iy < this.ysize; ++iy) {
            this.map.set((new Coord(ix, iy).toJSON()), new Cell(this, ix, iy));
        }
    }
};

Arena.prototype.getNDays = function getNDays() {
    return this.ndays;
};

Arena.prototype.changeCell = function changeCell(xCoord, yCoord, newCell){
    var coord = new Coord(xCoord, yCoord);
    this.map.set((coord).toJSON(), newCell);
}

Arena.prototype.addAnimal = function addAnimal(xCoord, yCoord, an){
    this.getCell(xCoord, yCoord).addAnimal(an);

    if (!this.colorMap.has(an)) {
        this.colorMap.set(an.getName(), an.getColor());
        if (an instanceof Herbivore) {
            this.herbivoreNames.push(an.getName());
        }
        this.updateMap();
    }
};

Arena.prototype.addRandomAnimal = function addRandomAnimal(an){
    let x = Arena.getRandom().nextInt(this.getXDim());
    let y = Arena.getRandom().nextInt(this.getYDim());
    while (this.getCell(x, y) instanceof WallCell) {
        x = Arena.getRandom().nextInt(getXDim());
        y = Arena.getRandom().nextInt(getYDim());
    }
    this.addAnimal(x, y, an);
};

Arena.prototype.addRandomTeamAnimal = function addRandomTeamAnimal(an, team) {
    let x = Arena.getRandom().nextInt(this.getXDim());
    let y = Arena.getRandom().nextInt(this.getYDim());
    switch (team) {
        case 1:
            while (!(x < 31 && y < 31)) {
                x = Arena.getRandom().nextInt(this.getXDim());
                y = Arena.getRandom().nextInt(this.getYDim());
            }
            break;
        case 2:
            while (!(x > 31 && y < 31)) {
                x = Arena.getRandom().nextInt(this.getXDim());
                y = Arena.getRandom().nextInt(this.getYDim());
            }
            break;
        case 3:
            while (!(x < 31 && y > 31)) {
                x = Arena.getRandom().nextInt(this.getXDim());
                y = Arena.getRandom().nextInt(this.getYDim());
            }
            break;
        case 4:
            while (!(x > 31 && y > 31)) {
                x = Arena.getRandom().nextInt(this.getXDim());
                y = Arena.getRandom().nextInt(this.getYDim());
            }
            break;
    }
    while(this.getCell(x, y) instanceof WallCell){
        x = Arena.getRandom().nextInt(this.getXDim());
        y = Arena.getRandom().nextInt(this.getYDim());
    }
    this.addAnimal(x, y, an);
};

Arena.prototype.addRandomForeignAnimal = function addRandomForeignAnimal(an, foreign) {
    let x = Arena.getRandom().nextInt(this.getXDim());
    let y = Arena.getRandom().nextInt(this.getYDim());
    if (foreign) {
        while (!(x > 31)) {
            x = Arena.getRandom().nextInt(this.getXDim());
        }
    }
    if (!foreign) {
        while (!(x < 31)) {
            x = Arena.getRandom().nextInt(this.getXDim());
        }
    }
    while (getCell(x, y) instanceof WallCell) {
        x = Arena.getRandom().nextInt(this.getXDim());
        y = Arena.getRandom().nextInt(this.getYDim());
    }
    this.addAnimal(x, y, an);
};

Arena.prototype.getCell = function getCell(xCoord, yCoord){
    return this.map.get((new Coord(xCoord, yCoord)).toJSON());
};

// I'd be lying if I said I wanted to write this function
Arena.prototype.doTurn = function doTurn(){
    var values = this.map.values();
    var icell = {}; icell.done = false;
    while (!icell.done) {
        icell = values.next();
        if(!icell.done){
            icell.value.beginningOfTurn();
        }
    }
    values = this.map.values();
    icell = {}; icell.done = false;
    while (!icell.done) {
        icell = values.next();
        if(!icell.done){
            icell.value.doTurn();
        }
    }

    this.updateMap();
    // this.updateFinal();

    this.ndays++;

    if (this.ndays === 100) {
        const entriesIter = this.map.entrySet();
        while (entriesIter.hasNext()) {
            const entry = entriesIter.next();

            if(entry.value instanceof WallCell){
                //Yeah, this line was nasty so we deleted it. Probably fine.
                try {
                    this.changeCell(entry.value.getX(), entry.value.getY(), new FoodCell(this, entry.value.getX(), entry.value.getY()));
                } catch (err) {
                    this.changeCell(entry.value.getX(), entry.value.getY(), new FoodCell(this, entry.value.getX(), entry.value.getY()));
                    console.error(err);
                }
            }
        }
    }

    if (this.printout) {
        console.log(this.countAnimals());
    }

    if (this.checkStillGoing()) {
        return true;
    } else {
        return false;
    }
};

Arena.prototype.checkStillGoing = function checkStillGoing() {
    if (this.allAnimals.length <= 0) {
        return false;
    }
    const values = Array.from(this.aniMap.values());
    for (let i = 0; i < values; i++) {
        const value = values[i];
        if (value > Arena.UPPER_LIMIT) {
            return false;
        }
    }
    return true;
};

// Arena.prototype.updateFinal = function updateFinal() {
//     this.aniMap.forEach((value, key) => {
//         if (this.finalMap.has(key)) {
//             this.finalMap.set(key, this.finalMap.get(key) + value);
//         } else {
//             this.finalMap.set(key, value);
//         }
//     });
// };

Arena.prototype.outputFinal = function outputFinal() {
    throw new Error('Nope!');
};

Arena.prototype.countAnimals = function countAnimals() {
    let response = '';
    const myset = Array.from(this.aniMap.keys());
    myset.sort();

    myset.forEach(name => {
        response = response.concat(`${name} ${this.aniMap.get(name)}   `);
    });

    return response;
};

Arena.prototype.updateMap = function updateMap() {
    this.aniMap.forEach((value, key, map) => {
        map.set(key, 0);
    });
    this.allAnimals = [];
    this.map.forEach((icell, key, map) => {
        icell.countAnimals(this.aniMap);
        icell.getOtherAnimals(null).forEach(ani => {
            this.allAnimals.push(ani);
        });
    });
};

Arena.prototype.getAllAnimals = function getAllAnimals(exceptThis) {
    if (arguments.length === 0) {
        return this.allAnimals;
    }
    const response = this.allAnimals.slice(0);
    let i = response.length;
    while (i--) {
        if (response[i] === exceptThis) {
            response.splice(i, 1);
        }
    }
    response.sort(new SortDistance(exceptThis).compare);
    return response;
};

Arena.prototype.getAnimalCount = function getAnimalCount() {
    return this.aniMap;
};

export default Arena;
