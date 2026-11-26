// Canvas size
// const height = 600;
// const width = 1000;
const sizeAah = 10;    // Approximate size of each AAH
var flowersize;

function setup() {
  var height = windowHeight;
  var width = windowWidth;
    var canvas = createCanvas(windowWidth, windowHeight);
    var n = Math.floor(width/4);
    canvas.parent('sketch-holder');
    background(240);
    drawAahs(n, sizeAah, {x: 0, y: 0, width: width, height: height});
    // noLoop();

    let dotPositions = [];

    // Draw 100 dots at random locations
    for (let i = 0; i < Math.floor(width/3); i++) {
      // Generate random x and y positions
      let x = random(width);
      let y = random(height);
      let r = random(3);
      
      // Store the positions
      dotPositions[i] = [x, y];
      fill(171, 172, 255, 200);
      noStroke();
      // Draw the dot
      ellipse(x, y, r, r);
    }
}

function draw() {
    bloom();
    // shrink();
    for (i=0; i<allgrass.length; i++) {
      drawAah(allgrass[i], 42, 75, 255);
    }
  }

function bloom(){
  for (i=0; i<allgrass.length; i++) {
    let d = dist(allgrass[i].x, allgrass[i].y, mouseX, mouseY);
    let xl = (300-d)/100;
    if (d<100){
      updateAah(allgrass[i], xl);
      growAah(allgrass[i]);
      }
  }
}

function shrink(){
  for (i=0; i<allgrass.length; i++) {
    let d = dist(allgrass[i].x, allgrass[i].y, mouseX, mouseY);
    let xl = (300-d)/20;
    if (d>=100){
        decAah(allgrass[i], xl);
        growAah(allgrass[i]);
      }
  }
}

function updateAah(aah, xl) {
  if (aah.length <=30){
    aah.length+=xl;
  }
}

function decAah(aah, xl) {
  if (aah.length >=1 ){
    aah.length-=xl;
  }
}