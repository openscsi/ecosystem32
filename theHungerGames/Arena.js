import Random from './Random';
import Cell from './Cell';
import Coord from './Coord';
import SortDistance from './SortDistance';

function Arena(xsizeIn, ysizeIn, cellSize){
    this.xsize = xsizeIn;
    this.ysize = ysizeIn;
    Cell.setSize(cellSize);

    this.ndays = 0;
    this.map = new Map();
    this.aniMap = new Map();
    this.allAnimals = [];
    this.finalMap = new Map();
    this.herbivoreNames = [];

    this.initialize();
}

Arena.prototype.constructor = Arena;

Arena.prototype.isHerbivore = function isHerbivore(name) {
    return this.herbivoreNames.indexOf(name) > -1;
};

Arena.prototype.getRandom = function getRandom() {
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

Arena.prototype.Draw = function Draw(graphicObject, xCoord, yCoord) {
    throw new Error('We don\'t know how to draw things yet so good luck with that.');
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
            this.map.put(new Coord(ix, iy), new Cell(this, ix, iy));
        }
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

Arena.prototype.updateFinal = function updateFinal() {
    this.aniMap.forEach((value, key) => {
        if (this.finalMap.has(key)) {
            this.finalMap.set(key, this.finalMap.get(key) + value);
        } else {
            this.finalMap.set(key, value);
        }
    });
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
