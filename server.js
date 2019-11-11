const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const five = require('johnny-five');
const Raspi = require("raspi-io");

const publicPath = path.join(__dirname, 'public/');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var ioSocket  = socketIO(server);

var rightButton, leftButton, mysteryButton, buttons;


app.use(express.static(publicPath));

server.listen(port, ()=> {
	console.log(`server is running on port ${port}`);
});



var board = new five.Board({
  io: new Raspi()
});



board.on("ready", function() {
   leftButton = new five.Button("GPIO17")
   rightButton = new five.Button("GPIO4");
   mysteryButton = new five.Button('GPIO22');


    buttons =[leftButton,rightButton, mysteryButton];


  board.repl.inject({
      buttons:buttons
  });


  ioSocket.on('connection', function(socket) {
   
   console.log("new client is connected");


   buttons[0].on("press", function() {
      console.log("left");
      socket.emit("leftButton",{
        message: "left pressed"
   	 })
 	})

   buttons[0].on("release", function() {
      console.log("left");
      socket.emit("leftButton",{
        message: "left pressed"
   	 })
 	})

   buttons[1].on("press", function() {
      console.log("right");
      socket.emit("rightButton",{
        message: "right pressed"
  	  })
   })	 

   buttons[1].on("release", function() {
      console.log("right");
      socket.emit("rightButton",{
        message: "right pressed"
    })
  });


  
  
})





});





