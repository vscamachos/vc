let img;

function preload() {
  img = loadImage("/vc/docs/sketches/lenna.png");
}

function setup() {
  // Create a canvas that's at least the size of the image.
  createCanvas(512, 512);
  noLoop();
  // image.hide()
  // frameRate(1); // set the frameRate to 1 since we don't need it to be running quicklimg.height/2 in this case
}

function draw() {
  let img1;
  let img2;

  image(img, 0, 0, img.width/2, img.height/2);
  
  img1 = createImage(img.width, img.height)
  img1.loadPixels();
  for (let i = 1; i <= img.width; i++) {
    for (let j = 1; j <= img.height; j++) {
      c = img.get(i,j);
      img1.set(i, j, color(red(c)*0.3 + green(c)*0.59 + blue(c)*0.11));
    }
  }
  img1.updatePixels();

  // outline
  // let kernel = [[-1,-1,-1], 
  //               [-1,8,-1],
  //               [-1,-1,-1]]

  // bottom sobel
  // let kernel = [[-1,-2,-1], 
  //               [0,0,0],
  //               [1,2,1]]

  // rightSobel
  // let kernel = [[-1,0,1], 
  //               [-2,0,2],
  //               [-1,0,1]]

  // leftSobel
  // let kernel = [[1,0,-1], 
  //               [2,0,-2],
  //               [1,0,-1]]

  // emboss
  // let kernel = [[-2,-1,0], 
  //               [-1,1,1],
  //               [0,1,2]]
  
  // blur
  // let kernel = [[0.0625,0.125,0.0625],
  //               [0.125,0.25,0.125],
  //               [0.0625,0.125,0.0625]]
  
  // sharpen
  let kernel = [[0,-1,0],
                [-1,5,-1],
                [0,-1,0]]
  

  img2 = createImage(img.width, img.height);
  img2.loadPixels();
  for (let x = 1; x < img1.width; x++) {
    for (let y = 1; y < img1.height; y++) {
      let sum = 0;
      for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
          let xpos = x + kx;
          let ypos = y + ky;
          let val = brightness(img1.get(xpos, ypos));
          sum += kernel[kx+1][ky+1] * val;
        }
      }

      img2.set(x, y, color(sum));

    }
  }
  img2.updatePixels();

  image(img1, img.width/2, 0, img.width/2, img.height/2);
  image(img2, 0, img.height/2, img.width/2, img.height/2);
  image(img1, img.width/2, img.height/2, img.width/2, img.height/2);
}