function Coord(xCoord, yCoord) {
    var x = xCoord;
    var y = yCoord;

}

Coord.prototype.constructor = Coord;

Coord.prototype.equals = function equals(arg0){
    if (arg0 == this)
        return true;

    if (arg0 == null || !(arg0 instanceof Coord)) {
        return false;
    }
    Coord icoor = arg0;
    return (x == icoor.x && y == icoor.y);
};

Coord.prototype.compareTo = function compareTo(icoord){
    if (x == icoord.x) {
        if (y == icoord.y) {
            return 0;
        }
        else if (y < icoord.y) {
            return -1;
        }
        else {
            return 1;
        }
    }
    else if (x < icoord.x) {
        return -1;
    }
    else {
        return 1;
    }
};

export default Coord;
