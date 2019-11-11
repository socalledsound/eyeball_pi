var socket =io();
var incomingMessage;

function setup() {
  
  createCanvas(1000,800);
  background(120);
 
fill(255);
ellipse(200,200,200);


   socket.on("buttonPressed", function(message){
    background(120);
	   fill(color('red'));
     ellipse(200,200,200);
     console.log(message);
  }) 
 
   socket.on("buttonReleased", function(message){
 	background(120);
	   fill(color('green'));
     ellipse(400,200,200);
     console.log(message);
   }) 
  

}

// socket.on('connect', function(){
//   console.log("browser connected");
// })

// socket.on("disconnect", function(){
//    console.log("browser disconnected");
// })







// function draw() {
  
// }


// function mousePressed() {
//     fill(color('red'));
//   ellipse(400,400,800);
// }
