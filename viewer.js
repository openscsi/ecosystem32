import Arena from './theHungerGames/Arena';
import FoodCell from './theHungerGames/FoodCell';
import Herbivore1 from './theHungerGames/Herbivore1';
import Animal from './theHungerGames/Animal';

function nameOffset(name, fontSize){
    return Math.round((name.length * (fontSize / 2)) / 2);
}

// function Coord(x, y){
//  return {
//      x: x,
//      y: y
//  }
// }

var mapSize = 64;

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var canvasSize = canvas.width;
var cellSize = canvasSize / mapSize;
console.log('Cell: ' + cellSize);

var arena = new Arena(mapSize, mapSize, cellSize);

function getNthCell(nX, nY){
    return Coord(nX * cellSize, nY * cellSize);
}

console.log("We made the arena okay; now it's time to fill it with cells");
for (var ix = 0; ix < arena.getXDim(); ++ix) {
    for (var iy = 0; iy < arena.getYDim(); ++iy) {
        arena.changeCell(ix, iy, new FoodCell(arena, ix, iy));
    }
}
console.log("We filled the arena with cells and nothing has broken yet!");

for (var i = 0; i < 250; i++) {
    arena.addRandomAnimal(Animal.makeRandomAnimal(Herbivore1));
}

console.log("We added some animals to the arena and the world didn't end in flames!");

export default {
    main: function() {
        arena.draw(ctx, 0, 0);
        console.log("We drew the arena without everything falling apart!");

        var loop = setInterval(function () {
            if (arena.doTurn()) {
                arena.draw(ctx, 0, 0);
            } else {
                clearInterval(loop);
            }
        }, 25);

        console.log("Done!")
    }
}
