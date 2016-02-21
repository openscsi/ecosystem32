function SortDistance(center) {
    centralAnimal = center;

}

SortDistance.prototype.constructor = SortDistance;

SortDistance.prototype.compare = function compare(arg0, arg1){
    var d1 = distance2(arg0);
    var d2 = distance2(arg1);
    if (d1 > d2) {
        return 1;
    } else if (d2 > d1) {
        return -1;
    } else {
        return 0;
    }
};

SortDistance.prototype.distance2 = function distance2(ani){
    var deltaX = ani.getCell().getX() - centralAnimal.getCell().getX();
    var deltaY = ani.getCell().getY() - centralAnimal.getCell().getY();
    return deltaX * deltaX + deltaY * deltaY;
};

export default SortDistance;
