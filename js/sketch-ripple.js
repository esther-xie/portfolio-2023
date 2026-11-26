var xx;
var yy;
var nn;
var start;

function setup() {
  var canvas = createCanvas(600, 300);
  canvas.parent('sketch-holder-r');
  pixelDensity(1);
}

function draw() {
  background(0)
  // canvasSolid(255, 127, frameCount % 256, 255);

  // canvasRGBGradientH(0, 0, 0, 255, 255, 255, 255, 255);
  // canvasRGBGradientV(0, 255, 100, 255, 255, 0, 150, 255);

  // canvasHueGradientH(0, 360);
  // canvasHueGradientV(0, 720);
  // canvasHueGradientV(100 - frameCount, 250 - frameCount);

  // canvasStripesV(100);
  // canvasStripesV(mouseX);

  // canvasCheckers(100, 50);
  // canvasCheckers(mouseX, mouseY);

  // canvasWaveV(mouseX);

  // canvasWave2D(100, 100); 
  //  canvasWave2Dp(100, 100);
   canvasWave2D(xx, yy);

}

function mousePressed(){
  xx = mouseX;
  yy = mouseY;
  newwave();
  
}