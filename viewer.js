function Coord(x, y){
	return {
		x: x,
		y: y
	}
}

function Cell(color = 'white'){
	return {
		color: color
	}
}


var mapSize = 50;

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var cellSize = canvas.width / mapSize;

var map = new Map();

for(var y = 0; y < mapSize; y++){
	for(var x = 0; x < mapSize; x++){
		map.set(Coord(x, y), Cell());
	}
}

map.set(Coord(0, 0), Cell('blue'));
map.set(Coord(9, 9), Cell('blue'));


export default {
	scaleCoord: function(coord, scale){
		return Coord(coord.x * scale, coord.y * scale);
	},
	main: function(){

		ctx.fillStyle = 'white';

		for(var [coord, cell] of map){
			ctx.fillStyle = cell.color;
			ctx.beginPath();
			var scaledCoord = this.scaleCoord(coord, cellSize);
			ctx.rect(scaledCoord.x, scaledCoord.y, cellSize, cellSize);
			ctx.fill();
			ctx.closePath();
		}

		console.log("Done!")

	}
}