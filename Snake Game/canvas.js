var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

c.fillStyle = 'rgba(255,100,50,2)';
c.fillRect(20,20,20,20);




// c.beginPath();
// c.moveTo(0,100);
//
// for(var count = 0; count<20; count++ ){
//   var width = Math.random()*window.innerWidth;
//   var height = Math.random()*window.innerHeight;
//
//   c.lineTo(width, height);
// }
//
// c.strokeStyle = 'rgba(255,0,0,255)';
// c.stroke();

var dx =1;
var x =20;

window.addEventListener('keydown', (num)=>{

  console.log(num.keyCode);

  switch (num.keyCode) {
    case 37:
      dx=-1;
      break;

      case 39:
      dx=1;

        break;


    default:

  }


});

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0,0,window.innerWidth, window.innerHeight);
  c.fillStyle = 'rgba(255,100,50,2)';
  c.fillRect(x,20,20,20);

  x+=dx;

}

animate();
