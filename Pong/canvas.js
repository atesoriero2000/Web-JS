var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

var c = canvas.getContext('2d');

var Ball = {

  x: 0,
  y: 0,

  dx: 4,
  dy: 2,

  radius: 10,

  hits: 0,

  checkBoundaries: function(){

    //Check y checkBoundaries
    if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
      this.dy *= -1;
    }

    //check x checkBoundaries (player hits and scores)
    if(this.x - this.radius <= Player1.x + Player1.width && this.y + this.radius >= Player1.y && this.y-this.radius <= Player1.y + Player1.height ){
      this.hits++;
      this.dx = 4 + this.hits/10;
      this.dy = (this.y - Player1.y - Player1.height/2)/(Player1.height/2) * 4; // - means top half

    }


    if(this.x + this.radius >= Player2.x && this.y + this.radius >= Player2.y && this.y-this.radius <= Player2.y + Player2.height ){
      this.hits++;
      this.dx = -(4 + this.hits/10);
      this.dy = (this.y - Player2.y - Player2.height/2)/(Player2.height/2) * 4; // - means top half
    }

    if (this.x + this.radius >= canvas.width){// if player 1 scored
      Player1.handleScore();
    }
    if (this.x - this.radius <= 0){// if player 2 scored
      Player2.handleScore();
    }

  },

  respawn: function(){


    this.hits = 0;
    this.dx *= -1;
    this.dy = (Math.random() * 4) - 2;

    this.x = canvas.width/2;
    this.y = Math.random() * (canvas.height-50) + 25;


  },

  update: function(){

    this.x += this.dx;
    this.y += this.dy;

    this.checkBoundaries();

    c.fillStyle = 'rgb(255,0,0)';
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    c.closePath();
    c.fill();
  },

}

var Player1 = {
  x: 10,
  y: (canvas.height/2 - 30),
  width: 10,
  height: 60,
  dy: 0,
  score: 0,

  checkBoundaries: function(){
    if(this.y <= 0 || this.y + this.height >= canvas.height){
      this.dy = 0;
    }
  },

  update: function(){
    this.y += this.dy;
    this.checkBoundaries();
    c.fillStyle = 'rgb(0,0,0)';
    c.fillRect(this.x, this.y, this.width, this.height);
  },

  handleScore: function() {
    this.score++;
    console.log("Score: " + this.score + " : " + Player2.score);

    if(this.score >= 10){
      endGame();

    } else {
      Ball.respawn();
    }

  },

}

var Player2 = {
    x: canvas.width - 10 - 10,
    y: (canvas.height/2 - 30),
    dy: 0,
    width: 10,
    height: 60,
    score: 0,

    checkBoundaries: function(){
      if(this.y <= 0 || this.y + this.height >= canvas.height){
        this.dy = 0;
      }
    },

    update: function(){
      this.y += this.dy;
      this.checkBoundaries();
      c.fillStyle = 'rgb(0,0,0)';
      c.fillRect(this.x, this.y, this.width, this.height);
    },

    handleScore: function() {
      this.score++;
      console.log("Score: " + Player1.score + " : " + this.score);

      if(this.score >= 10){
        endGame();

      } else {
        Ball.respawn();
      }

    },

}


var END_GAME = false;
function endGame() {

  Ball.x = canvas.width/2;
  Ball.y = canvas.height/2;

  Ball.dx = 0;
  Ball.dy = 0;

  END_GAME = true;

}

function drawScoreBoard() {


  c.beginPath();
  c.moveTo(canvas.width/2, 0);
  c.lineTo(canvas.width/2, canvas.height);
  c.stroke();

  c.fillStyle = 'rgb(255,255,255)';
  c.fillRect(canvas.width/2 - 60, 24, 120, 35);

  c.fillStyle = 'rgb(0,0,0)';
  c.font = "40px monospace";
  c.fillText( Player1.score + " : " + Player2.score, canvas.width/2 - 60, 50 );





  if (END_GAME){
    c.font = "50px monospace";
    if(Player1.score === 10){
      c.fillText( "Player 1 Wins!!", canvas.width/2 - 150, canvas.height/2 - 50 );

    } else {
      c.fillText( "Player 2 Wins!!", canvas.width/2 - 150, canvas.height/2 - 50 );

    }
  }

}

function animate() {

  requestAnimationFrame(animate);

  c.clearRect(0,0,window.innerWidth, window.innerHeight);

  drawScoreBoard();
  Ball.update();
  Player1.update();
  Player2.update();
  console.log(Ball.hits + ", " + Ball.dx);

}

Ball.respawn();

animate();


var v = 10;
window.addEventListener('keypress', (key) => {

  console.log("Down: " + key.key);

  key.key = key.key.toLowerCase();

  if (key.key === "w" && Player1.y > 0){
    Player1.dy = -v;

  } else if (key.key === "s" && Player1.y + Player1.height < canvas.height){
    Player1.dy = v;

  }

  if (key.key === "o" && Player2.y > 0){
    Player2.dy = -v;

  } else if (key.key === "l" && Player2.y + Player2.height < canvas.height){
    Player2.dy = v;

  }
});

window.addEventListener('keyup', (key) => {

  console.log("Up: " + key.key);

  key.key = key.key.toLowerCase();

  if (key.key === "w"){
    Player1.dy = 0;

  } else if (key.key === "s"){
    Player1.dy = 0;

  }

  if (key.key === "o"){
    Player2.dy = 0;

  } else if (key.key === "l"){
    Player2.dy = 0;

  }
});
