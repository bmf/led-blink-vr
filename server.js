// server.js
var express = require('express');
var app = express();
var server = require("http").createServer(app);
var five = require("johnny-five");
var io = require('socket.io')(server);
var port = 3000;

//create the node server and serve the files
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
server.listen(port);
console.log('Server started, page available at http://localhost:' + port);

//Arduino board connection
var board = new five.Board();
board.on("ready", function() {
    led = new five.Led(10);
    console.log('Arduino connected');

    

//SocketIO connection handler and listening

io.on('connection', function (socket) {

        console.log("your socket id is ", socket.id);

        socket.on('led:on', function () {
            led.on();
            console.log('LED On Received');
        });

        socket.on('led:off', function () {
            led.off();
            console.log('LED Off Received');
        });

        socket.on('disconnect', function() {
          console.log('browser closed');
        })
    });
    
});
    
//if nothing else is happened yet.
console.log('Waiting for arduino connection..');
