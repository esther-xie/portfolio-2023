// Canvas size
const height = 600;
const width = 600;
const sizeAah = 10;    // Approximate size of each AAH

function setup() {
    var canvas = createCanvas(width, height);
    background(240);
    canvas.parent('sketch-holder');
}

function draw() {
    drawAahs(100, sizeAah, {x: 0, y: 0, width: width, height: height});
    var x = random(width);
    var y = random(height);
    
    let dotPositions = [];

    // Draw 100 dots at random locations
    for (let i = 0; i < 300; i++) {
      // Generate random x and y positions
      let x = random(width);
      let y = random(height);
      let r = random(3);
      
      // Store the positions
      dotPositions[i] = [x, y];
      fill(100);
      noStroke();
      // Draw the dot
      ellipse(x, y, r, r);
    }
    noLoop();
    
}

function mousePressed() {
    var armlength = document.getElementById("diameter").value;
    var armnumber = document.getElementById("arm").value;
    var pdsize = document.getElementById("pedal").value;

    var R = document.getElementById("R").value;
    var G = document.getElementById("G").value;
    var B = document.getElementById("B").value;

    xx = mouseX;
    yy = mouseY;
    console.log(R);
    newnewAah(100, [xx, yy], armlength, armnumber, pdsize, R, G, B);
}
