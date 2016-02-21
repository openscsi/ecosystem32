import Arena from './Arena';

const Direction = {
    LEFT : 420,
    RIGHT : 421,
    UP : 422,
    DOWN : 423,
    NO_MOTION : 424,

    randomDirection : function randomDirection(){
        var ran = Arena.getRandom().nextI(4);
        if(ran === 0) { return Direction.DOWN; }
        if(ran === 1) { return Direction.UP; }
        if(ran === 2) { return Direction.LEFT; }
        else { return Direction.RIGHT; }
    }

};

export default Direction;
