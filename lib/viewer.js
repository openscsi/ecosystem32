function nameOffset(name, fontSize){
	return Math.round((name.length * (fontSize / 2)) / 2);
}

function Coord(x, y){
	return {
		x: x,
		y: y
	}
}

function Cell(color = 'ForestGreen'){
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
			var text = this.list.length + '';
			var fontSize = 0.75 * cellSize;
			var xOff = nameOffset(text, fontSize)
			var yOff = 1.0 * fontSize;
			var font = fontSize + 'px Consolas';
			ctx.font = font;
			ctx.lineWidth = 1;
			ctx.fillStyle = 'black';
			ctx.fillText(text, coord.x + xOff, coord.y + yOff);
		}
	}
}



var canvas = document.getElementById('game-canvas');

if(canvas){
	
	var mapSize = 20;
	var ctx = canvas.getContext('2d');
	var canvasSize = canvas.width;
	var cellSize = canvasSize / mapSize;
	console.log('Cell: ' + cellSize)

	var map = new Map();

	for(var y = 0; y < canvasSize; y += cellSize){
		for(var x = 0; x < canvasSize; x += cellSize){
			var color = 'ForestGreen'
			if(x == 20){
				color = 'GoldenRod';
			}
			map.set(Coord(x, y), Cell(color));
		}
	}

	map.set(getNthCell(0, 0), Cell('GreenYellow'));
	map.set(getNthCell(3, 4), Cell('GreenYellow'));

}

function getNthCell(nX, nY){
	return Coord(nX * cellSize, nY * cellSize);
}

export default {
	main: function(){

		ctx.fillStyle = 'ForestGreen';

		for(var [coord, cell] of map){
			cell.draw(ctx, coord);
		}

		console.log("Done!")

	}
}