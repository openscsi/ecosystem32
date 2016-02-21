function SortDistance(center) {
    this.centralAnimal = center;
}

SortDistance.prototype.constructor = SortDistance;

SortDistance.prototype.compare = function compare(arg0, arg1) {
    const d1 = distance2(arg0);
    const d2 = distance2(arg1);
    if (d1 > d2) {
        return 1;
    } else if (d2 > d1) {
        return -1;
    } else {
        return 0;
    }
};

SortDistance.prototype.distance2 = function distance2(ani) {
    const deltaX = ani.getCell().getX() - this.centralAnimal.getCell().getX();
    const deltaY = ani.getCell().getY() - this.centralAnimal.getCell().getY();
    return deltaX * deltaX + deltaY * deltaY;
};

export default SortDistance;
