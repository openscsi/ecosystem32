function nameOffset(name, fontSize){
	return Math.round((name.length * (fontSize / 2)) / 2);
}

function Coord(x, y){
	return {
		x: x,
		y: y
	}
}

function Cell(color = 'white'){
	return {
		color: color,
		list: [], //LinkedList of animals on the cell
		draw: function(ctx, coord){
			//Draw cell
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.rect(coord.x, coord.y, cellSize, cellSize);
			ctx.fill();
			ctx.closePath();
			//Draw number of animals
			var text = this.list.length;
			var fontSize = 0.75 * cellSize;
			var xOff = nameOffset(text, fontSize)
			var yOff = Math.round(0.5 * fontSize);
			
			var font = fontSize + 'px Arial';
			ctx.font = font;
			ctx.lineWidth = 3;
			ctx.strokeStyle = 'black';
			//ctx.textAlign = 'center';
			ctx.strokeText(text + "a", coord.x - xOff, coord.y + yOff);
			console.log(text)
		}
	}
}

var mapSize = 20;

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var canvasSize = canvas.width;
var cellSize = canvasSize / mapSize;
console.log('Cell: ' + cellSize)

function getNthCell(nX, nY){
	return Coord(nX * cellSize, nY * cellSize);
}

var map = new Map();

for(var y = 0; y < canvasSize; y += cellSize){
	for(var x = 0; x < canvasSize; x += cellSize){
		var color = 'white'
		if(x === 10){
			color = 'red'
		}
		map.set(Coord(x, y), Cell(color));
	}
}

map.set(getNthCell(0, 0), Cell('blue'));
map.set(getNthCell(3, 4), Cell('blue'));


export default {
	main: function(){

		ctx.fillStyle = 'white';

		for(var [coord, cell] of map){
			cell.draw(ctx, coord);
		}

		console.log("Done!")

	}
}