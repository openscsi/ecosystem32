import Move from './Move';
import Direction from './Direction';

//current - the animal's current cell
//target - the cell the animal wants to go to
//towards - whether or not the animal should move towards or away from the target cell
function MoveToward(current, target, towards) {
    Move.call(this, MoveToward.findDirection(current, target, towards));
}

MoveToward.prototype = Object.create(Move.prototype);
MoveToward.prototype.constructor = MoveToward;

MoveToward.findDirection = function findDirection(current, target, toward) {
    const xDiff = current.getX() - target.getX();
    const yDiff = current.getY() - target.getY();

    if (toward) {
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff < 0) {
                return Direction.RIGHT;
            } else {
                return Direction.LEFT;
            }
        } else {
            if (yDiff < 0) {
                return Direction.DOWN;
            } else {
                return Direction.UP;
            }
        }
    } else {
        if (Math.abs(xDiff) < Math.abs(yDiff)) {
            if (xDiff < 0) {
                return Direction.LEFT;
            } else {
                return Direction.RIGHT;
            }
        } else {
            if (yDiff < 0) {
                return Direction.UP;
            } else {
                return Direction.DOWN;
            }
        }
    }
};

export default MoveToward;
