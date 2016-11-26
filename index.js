var app = require('express')(),
	http = require('http').Server(app),
	io	 = require('socket.io')(http),
	redis = require('socket.io-redis');


var port = process.env.VCAP_PORT || 3001;
io.adapter(redis({host: 'localhost', port: 6379}));


// Send index.html on connect
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// On a connection event
io.on('connection', function(socket) {
	console.log('a user connected');

	// Time test
	socket.on('time', function(date) {
		io.emit('date', date);
	});

	// When a user disconnects
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

http.listen(port, function() {
	console.log('Controller app listening on %s', port);
});

