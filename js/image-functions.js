
/**
 * Fill the canvas with a solid color on a per-pixel basis.
 * @param {Number} r 
 * @param {Number} g 
 * @param {Number} b 
 * @param {Number} a 
 */
function canvasSolid(r, g, b, a) {
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = 4 * (x + y * width);
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = a;
    }
  }
  updatePixels();
}

/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in RGB space.
 * @param {Number} r0 
 * @param {Number} g0 
 * @param {Number} b0 
 * @param {Number} a0 
 * @param {Number} r1 
 * @param {Number} g1 
 * @param {Number} b1 
 * @param {Number} a1 
 */
function canvasRGBGradientH(r0, g0, b0, a0, r1, g1, b1, a1)
{
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Normalized coordinate in X axis
      const nx = x / width;

      // Interpolate colors linearly per RGB channel
      const index = 4 * (x + y * width);
      pixels[index + 0] = r0 + nx * (r1 - r0);
      pixels[index + 1] = g0 + nx * (g1 - g0);
      pixels[index + 2] = b0 + nx * (b1 - b0);
      pixels[index + 3] = a0 + nx * (a1 - a0);
    }
  }
  updatePixels();
}

/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in RGB space.
 * @param {Number} r0 
 * @param {Number} g0 
 * @param {Number} b0 
 * @param {Number} a0 
 * @param {Number} r1 
 * @param {Number} g1 
 * @param {Number} b1 
 * @param {Number} a1 
 */
function canvasRGBGradientV(r0, g0, b0, a0, r1, g1, b1, a1)
{
  loadPixels();
  for (let y = 0; y < height; y++) {
    // Normalized coordinate in Y axis
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      // Interpolate colors linearly per RGB channel
      const index = 4 * (x + y * width);
      pixels[index + 0] = r0 + ny * (r1 - r0);
      pixels[index + 1] = g0 + ny * (g1 - g0);
      pixels[index + 2] = b0 + ny * (b1 - b0);
      pixels[index + 3] = a0 + ny * (a1 - a0);
    }
  }
  updatePixels();
}


/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in HSV space.
 * @param {Number} hue0 Start hue value
 * @param {Number} hue1 End hue value
 */
function canvasHueGradientH(hue0, hue1)
{
  loadPixels();
  for (let x = 0; x < width; x++) {
    // Normalized coordinate in X axis
    const nx = x / width;
    const hue = hue0 + nx * (hue1 - hue0);
    const rgb = HSBToRGB([hue, 100, 100, 100]);
    
    for (let y = 0; y < height; y++) {
      const index = 4 * (x + y * width);
      pixels[index + 0] = rgb[0];
      pixels[index + 1] = rgb[1];
      pixels[index + 2] = rgb[2];
      pixels[index + 3] = rgb[3];
    }
  }
  updatePixels();
}

/**
 * Fill the canvas with a gradient color linearly interpolated
 * between two extremes in HSV space.
 * @param {Number} hue0 Start hue value
 * @param {Number} hue1 End hue value
 */
function canvasHueGradientV(hue0, hue1)
{
  loadPixels();
  for (let y = 0; y < height; y++) {
    // Normalized coordinate in Y axis
    const ny = y / height;
    const hue = hue0 + ny * (hue1 - hue0);
    const rgb = HSBToRGB([hue, 100, 100, 100]);

    for (let x = 0; x < width; x++) {
      const index = 4 * (x + y * width);
      pixels[index + 0] = rgb[0];
      pixels[index + 1] = rgb[1];
      pixels[index + 2] = rgb[2];
      pixels[index + 3] = rgb[3];
    }
  }
  updatePixels();
}

/**
 * Fill the canvas with vertical black/white stripes.
 * @param {Number} sizeX 
 */
function canvasStripesV(sizeX) {
  loadPixels();
  for (let x = 0; x < width; x++) {
    // Should pixel be on? 
    // https://graphtoy.com/?f1(x,t)=255*mod(floor((x)/100),2)&v1=true&grid=1&coords=-7.468720867519394,1.4292721536001949,446.71977732982475
    const gray = 255 * (Math.floor(x / sizeX) % 2);

    for (let y = 0; y < height; y++) {
      const index = 4 * (x + y * width);
      pixels[index + 0] = gray;
      pixels[index + 1] = gray;
      pixels[index + 2] = gray;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}

/**
 * Fills the canvas with a BW checker pattern. 
 * @param {Number} sizeX 
 * @param {Number} sizeY 
 */
function canvasCheckers(sizeX, sizeY) 
{
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Should pixel be on? 
      const gray = 255 * ((Math.floor(x / sizeX) + Math.floor(y / sizeY)) % 2);
    
      const index = 4 * (x + y * width);
      pixels[index + 0] = gray;
      pixels[index + 1] = gray;
      pixels[index + 2] = gray;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}

/**
 * Fills the canvas with vertical wave stripes.
 * @param {Number} sizeX 
 */
function canvasWaveV(sizeX)
{
  loadPixels();
  for (let x = 0; x < width; x++) {
    // Compute gray value for X
    // https://graphtoy.com/?f1(x,t)=255%20*%20(0.5%20+%200.5%20*cos(%F0%9D%9C%8F*x%20/%20100))&v1=true&grid=1&coords=67.69140044604674,117.41494066648303,245.41327097380992
    const gray = 255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / sizeX));

    for (let y = 0; y < height; y++) {
      const index = 4 * (x + y * width);
      pixels[index + 0] = gray;
      pixels[index + 1] = gray;
      pixels[index + 2] = gray;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}

/**
 * Fills the canvas with vertical wave stripes.
 * @param {Number} sizeX 
 */
let dd = 0;
function canvasWave2D(sizeX, sizeY)
{
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Compute gray value based on max of X or Y wave.
      var nn = Math.sqrt((x-sizeX)*(x-sizeX)+(y-sizeY)*(y-sizeY));

      const gray =  0.5 * (135 * (0.5 - 0.5 * Math.cos(2 * Math.PI * x / (nn+dd)))) + 
        135 * (0.5 + 0.5 * Math.cos(2 * Math.PI * y / (nn+dd)));
        const gray2 = 0.5 * (123 * (0.5 - 0.5 * Math.cos(2 * Math.PI * x / (nn+dd)))) + 
        123 * (0.5 + 0.5 * Math.cos(2 * Math.PI * y / (nn+dd)));
        
        const index = 4 * (x + y * width);
        pixels[index + 0] = gray;
        pixels[index + 1] = gray2;
        pixels[index + 2] = gray;
        pixels[index + 3] = 255;
    }
  }
  updatePixels();
  updatedd();
}

function updatedd(){
  dd+=0.5;
  if (dd>= 500){
    dd = 500;
  }
  return dd;
}

function newwave(){
  dd = 0;
  return dd;
}

function canvasWave2Dp(sizeX, sizeY)
{
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Compute gray value based on max of X or Y wave.
      // var nn = Math.sqrt((x-mouseX)*(x-mouseX)+(y-mouseY)*(y-mouseY));

      const gray = 0.5 * (255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / sizeX)), 
          255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * y / sizeY)));

      // spirallll
      // const gray = 0.5 * (255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / nn)) + 
      //     255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * y / nn)));
      
      // // concentric ringsss
      // const gray = 0.5 * (255 * (0.5 + 0.5 * Math.cos( nn)) + 
      //     255 * (0.5 + 0.5 * Math.cos( nn)));

      // //Using the MAX value
      // const gray = Math.max(255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / sizeX)), 
      //     255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * y / sizeY)));

      // // Using the MAX value
      // const gray = Math.min(255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * x / sizeX)), 
      //     255 * (0.5 + 0.5 * Math.cos(2 * Math.PI * y / sizeY)));
      
      const index = 4 * (x + y * width);
      pixels[index + 0] = gray;
      pixels[index + 1] = gray;
      pixels[index + 2] = gray;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}