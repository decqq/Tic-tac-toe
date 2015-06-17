var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// calculates computer's move
function calculate (map) {
	// check if possible to win - digit = 1
	// check if there's something to block - digit = 2
	
	for (var digit = 1; digit <=2; digit++) {
		
		// horizontal
		for (var i = 0; i < 3; i++) {
			if(map[i][0] == digit && map[i][1] == digit && map[i][2] == 0) { map[i][2] = 1; return map; }
			if(map[i][0] == digit && map[i][1] == 0 && map[i][2] == digit) { map[i][1] = 1; return map; }
			if(map[i][0] == 0 && map[i][1] == digit && map[i][2] == digit) { map[i][0] = 1; return map; }
		}

		// vertical
			// first column
			if(map[0][0] == digit && map[1][0] == digit && map[2][0] == 0) { map[2][0] = 1; return map; }
			if(map[0][0] == digit && map[1][0] == 0 && map[2][0] == digit) { map[1][1] = 1; return map; }
			if(map[0][0] == 0 && map[1][0] == digit && map[2][0] == digit) { map[0][2] = 1; return map; }

			// second column
			if(map[0][1] == digit && map[1][1] == digit && map[2][1] == 0) { map[2][1] = 1; return map; }
			if(map[0][1] == digit && map[1][1] == 0 && map[2][1] == digit) { map[1][1] = 1; return map; }
			if(map[0][1] == 0 && map[1][1] == digit && map[2][1] == digit) { map[0][1] = 1; return map; }

			// third column
			if(map[0][2] == digit && map[1][2] == digit && map[2][2] == 0) { map[2][2] = 1; return map; }
			if(map[0][2] == digit && map[1][2] == 0 && map[2][2] == digit) { map[1][2] = 1; return map; }
			if(map[0][2] == 0 && map[1][2] == digit && map[2][2] == digit) { map[0][2] = 1; return map; }
		
		// crossed
			// /
			if(map[0][0] == digit && map[1][1] == digit && map[2][2] == 0) { map[2][2] = 1; return map; }
			if(map[0][0] == digit && map[1][1] == 0 && map[2][2] == digit) { map[1][1] = 1; return map; }
			if(map[0][0] == 0 && map[1][1] == digit && map[2][2] == digit) { map[0][0] = 1; return map; }

			// \
			if(map[0][2] == digit && map[1][1] == digit && map[2][0] == 0) { map[2][0] = 1; return map; }
			if(map[0][2] == digit && map[1][1] == 0 && map[2][0] == digit) { map[1][1] = 1; return map; }
			if(map[0][2] == 0 && map[1][1] == digit && map[2][0] == digit) { map[0][2] = 1; return map; }
	}

	// make some random move
	for (var i = 0; i < 3; i++)
		if(map[i].indexOf(0) != -1){
			map[i][map[i].indexOf(0)] = 1;
			return map;
		}
	
	return map;
}

// request for computer's move
app.get('/move', function (req, res) {
	var map = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];

	// parse map into ints
	for (var i = 0; i < 3; i++)
		for (var j = 0; j < 3; j++)
			map[i][j] = parseInt(req.query.array[i][j]);

	// add computer's move
	map = calculate(map);
	
	// response to front-end
	res.jsonp(map);
});

// home of server
app.get('/', function (req, res) {
	res.send('Tic-tac-toe game by Bartosz Dec');
});

// initialize server
var server = app.listen(3003, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server is listening at http://%s:%s', host, port);
});