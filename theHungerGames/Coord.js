function Coord(xCoord, yCoord) {
    this.x = xCoord;
    this.y = yCoord;
}

Coord.prototype.constructor = Coord;

Coord.prototype.equals = function equals(arg0) {
    if (arg0 === this) {
        return true;
    }

    if (arg0 === null || arg0 === undefined || !(arg0 instanceof Coord)) {
        return false;
    }

    return (this.x === icoor.x && this.y === icoor.y);
};

Coord.prototype.compareTo = function compareTo(icoord) {
    if (this.x === icoord.x) {
        if (this.y === icoord.y) {
            return 0;
        } else if (this.y < icoord.y) {
            return -1;
        } else {
            return 1;
        }
    } else if (this.x < icoord.x) {
        return -1;
    } else {
        return 1;
    }
};

Coord.prototype.toJSON = function toJSON() {
    return JSON.stringify({
        x: this.x,
        y: this.y
    });
};

export default Coord;
