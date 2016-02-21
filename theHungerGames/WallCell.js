import Cell from './Cell';

function WallCell(map, x, y) {
    Cell.call(this, map, x, y);
}

WallCell.prototype = Object.create(Cell.prototype);
WallCell.prototype.constructor = WallCell;

WallCell.prototype.isMoveable = function isMoveable() {
    return false;
};

WallCell.prototype.getColor = function getColor(){
    return 'LightSlateGrey';
};

export default WallCell;
