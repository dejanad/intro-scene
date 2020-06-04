let intro = [1];

// empty array of bubbles 
let bubbles = [];

//load fonts
let LHFConvectaBASE;
let ArialNarrow;
function preload() {
  LHFConvectaBASE = loadFont('LHFConvectaBASE.otf');
  ArialNarrow = loadFont('Arial Narrow.ttf');
}
//----start scene----
let timer = 10;
let startingCanvas;


w = 640;
h = 480;
let r = 10; //size of ellipse
let x = 320; //canvas width/2
let y = 240; //canvas height/2

function setup() {
  background("clear");
  video = createCapture(VIDEO);
  video.size(w, h);
  createCanvas(w, h);
  video.hide();
// startingCanvas = createGraphics(w,h);
  for (let i = 0; i < 1; i++) {
    let x = width / 2;
    let y = height / 2;
    let r = 50;
    let b = new swipeToStart(x, y, r);
    intro.push(b);
  }
  
  //how many bubbles are drawn
  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(8, 60);
    // let col = color(255, 175, 0, 150);//flat orange
    let col = color(133,226,255,100);//flat blue 
    let b = new Bubble(x, y, r, col);
    bubbles.push(b);
  }
}

function draw() {
  // background(0);
  push();
  translate(w, 0);
  scale(-1, 1);
  image(video, 0, 0, w, h);
  pop();

   translate(width, 0);
  scale(-1, 1);

 //draw wrist detection after 10 seconds
  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer--;
} if (timer == 0) {
   //flip posenet balls to track left and right as we see them
  intro[1].Swipe(mouseX, mouseY);
}
  drawScene1();
  drawSwipeScene();
  
  if(this.alive==false){
    //load bubbles
    GameBegins();
  }

}
function drawScene1(){
  textSize(0.1);
  text(timer, width/2, height/2);
}
//-------DRAWS SPHERE + 
function drawSwipeScene(){
  intro[1].show();   
}

function GameBegins(){
   push();
  //draw all bubbles in array
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].Show();
  }
  pop(); //keeps style of bubbles seperate 
}



// ----------------------------------------------------
//                SWIPE INTERACTION CLASS
// ----------------------------------------------------

class swipeToStart {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r
    this.alive = true

  }
  Swipe(rx, ry) {
    let alive = true;
    let d = dist(rx, ry, this.x, this.y);
    if (d < this.r) {
      alive = false;
      this.x = 100000;
      this.y = 100000;

    }
  }
  show() {
    noStroke();
    fill(255, 255, 0);
    stroke(255);
    ellipse(this.x, this.y, this.r * 2);
    //flip text back to normal 
    translate(width, 0);
    scale(-1, 1);
    //swipe to start 
    textFont(LHFConvectaBASE);
    textSize(20);
    noStroke();
    fill(255);
    textAlign(CENTER);
    // scale(-1, 1);
    text('swipe to start', this.x, this.y);
     textFont(ArialNarrow);
    text('please stand 2m from your laptop', this.x, this.y-200);
  }
}

// ---------------------------------------------
//                BLUE BUBBLE CLASS
// ---------------------------------------------
class Bubble {
  constructor(x, y, r, col) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.alive = true;
    this.col = col;
  }

  //bubble disappears and sound plays 
  burst(bx, by) {
    let d = dist(bx, by, this.x, this.y);
    if (d < this.r) {
      this.alive = false;
      this.x = 1000000;
      this.y = 1000000;
      popSound.play();
      score++; //score icrement 
    }
  }

  Show() {
    stroke(255);
    strokeWeight(0.25);
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2)
  }
}