var eyeballs = [];
var numEyeballs = 12;
var eyeballSize = 80;
var colors=[[20,30,240],[80,90,200],[150,70,230],[160,16,240],[2,30,220],[80,90,200],[150,70,80],[160,160,240],[200,30,50],[80,90,200],[150,70,80],[160,160,240]];
var backgroundCol = [243,243,21];

var player1;
var socket = io();

function setup() {
  
  createCanvas(800,800);
   background(backgroundCol);
  		
 //  	fill([200,30,40]);
	// ellipse(300,300,300);


  for(var i=0;i<numEyeballs;i++) {
  	eyeballs[i] = new Eyeball(100+i*50,100,colors[i]);
  	eyeballs[i].display();
  }

	player1 =  new Player();
	player1.display();

  
}

function draw() {
	background(backgroundCol)
  for(var i=0;i<numEyeballs;i++) {;
  	
  	eyeballs[i].update();
  	eyeballs[i].display();
  }

//   player1.update();
 	player1.addLife(); 
	player1.checkDamage();
	player1.display();


}


function mousePressed() {
  //   fill(color('red'));
  // ellipse(400,400,800);
}

function keyPressed(){

	if(keyCode === LEFT_ARROW){
	 	player1.x = player1.x - 6;
     		console.log("left key");
		
	} else if(keyCode === RIGHT_ARROW){
		player1.x = player1.x + 6;
     		console.log("right key");
	} 	
	
	
}

var Player = function() {

	this.x = width/2-50;
	this.y=740;
	this.height = 30;
	this.width = 100;
	this.color = [20,240,80];

	this.display = function() {
		fill(this.color);
		rect(this.x,this.y, this.width, this.height);
	},

	this.addLife = function(){
		this.width=this.width+0.5;
		this.x=this.x-0.5;
	},

	this.checkDamage = function() {
		console.log('checking');

		eyeballs.forEach(function(eyeball){

			console.log(this.x, this.y);

			if (eyeball.x + eyeball.diameter > this.x && eyeball.x - eyeball.diameter < this.x + this.width  && eyeball.y + eyeball.diameter > this.y  && eyeball.y - eyeball.diameter  < this.y +  this.height) {
				console.log('hit');
				if (this.width > 0) {

					this.width = this.width-10;
					this.color = [random(200),random(200),random(200)];
					}
				}

		}, this);	
	}		


};

var Eyeball = function(x,y,color) {
	this.x=x;
	this.y=y;
	this.xSpeed = random(-1.0,1.0);
	this.ySpeed = random(1.0,5.0);
	this.color = color;
	this.size = eyeballSize;
	this.diameter = this.size/2;

	this.display=function() {
		fill(this.color);
		ellipse(this.x,this.y,this.size);
		fill(0);
		ellipse(this.x,this.y,this.size/5,this.size/1.5);
	},

	this.update = function() {
		this.x+=this.xSpeed;
		this.y+=this.ySpeed;
		if (this.x > 780) {
			this.x = 20;
		}

		if (this.x < 20) {
			this.x = 780;
		}
		if (this.y > 800) {
			this.y = 20;
		}
		if (this.y < 20) {
			this.y = 780;
		}
	}


};



socket.on("leftButton", function(message){
    player1.x = player1.x - 6;
     console.log(message);
  }); 
 
   socket.on("rightButton", function(message){
    player1.x = player1.x + 6;
	console.log(message);
   });
