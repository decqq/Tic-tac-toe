var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// ...

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