var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  	var ledGreen = new five.Led("P1-13");
	var ledRed = new five.Led("P1-36");
	var button = new five.Button("GPIO4");

	board.repl.inject({
		button:button
	});

	button.on("press", function(){
		console.log("down");
		ledGreen.on();
		ledRed.off();
	});

	button.on("release", function() {
		console.log("release");
		ledGreen.off();
		ledRed.on();
	});


});
