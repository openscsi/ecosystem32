import Random from './Random';
import Cell from './Cell'
import Coord from './Coord'

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



export default Arena;
