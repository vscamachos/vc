let img;

function preload() {
  img = loadImage("/vc/docs/sketches/lenna.png");
}

function setup() {
  let img1;
  let img2;
  let img3;
  // Create a canvas that's at least the size of the image.
  createCanvas(512, 512);
  image(img, 0, 0, 256, 256);
  let x = img.width
  let y = img.height

  img1 = createImage(x, y)
  img1.copy(img, 0,0, x, y, 0, 0, x, y)
  img1.loadPixels();
  for (let i = 0; i < img1.width; i++) {
    for (let j = 0; j < img1.height; j++) {
      c = get(i,j);
      img1.set(i, j, color(red(c)*0.3 + green(c)*0.59 + blue(c)*0.11));
    }
  }
  img1.updatePixels();

  let rightSobel = [-1,0,1, 
                    -2,0,2,
                    -1,0,1]

  img2 = createImage(x, y);
  img2.copy(img1, 0,0, x, y, 0, 0, x, y)
  img2.loadPixels();
  for (let i = 1; i < img2.width-1; i++) {
    for (let j = 1; j < img2.height-1; j++) {
      a = brightness(get(i-1,j-1))
      b = brightness(get(i-1,j))
      c = brightness(get(i-1,j+1))
      d = brightness(get(i,j-1))
      e = brightness(get(i,j))
      f = brightness(get(i,j+1))
      g = brightness(get(i+1,j-1))
      h = brightness(get(i+1,j))
      k = brightness(get(i+1,j+1))

      img2.set(i, j, color((a*rightSobel[0])+(b*rightSobel[1])+(c*rightSobel[2])
                          +(d*rightSobel[3])+(e*rightSobel[4])+(f*rightSobel[5])
                          +(g*rightSobel[6])+(h*rightSobel[7])+(k*rightSobel[8])))
    }
  }
  img2.updatePixels();

  // let outline = [-1,-1,-1, 
  //               -1,8,-1,
  //               -1,-1,-1]

  // let blur = [0.0625,0.125,0.0625,
  //               0.125,0.25,0.125,
  //               0.0625,0.125,0.0625]

  let kernel = [0,-1,0,
                -1,5,-1,
                0,-1,0]

  img3 = createImage(x, y);
  img3.copy(img1, 0,0, x, y, 0, 0, x, y)
  img3.loadPixels();
  for (let i = 1; i < img3.width-1; i++) {
  for (let j = 1; j < img3.height-1; j++) {
  a = brightness(get(i-1,j-1))
  b = brightness(get(i-1,j))
  c = brightness(get(i-1,j+1))
  d = brightness(get(i,j-1))
  e = brightness(get(i,j))
  f = brightness(get(i,j+1))
  g = brightness(get(i+1,j-1))
  h = brightness(get(i+1,j))
  k = brightness(get(i+1,j+1))

  img3.set(i, j, color((a*kernel[0])+(b*kernel[1])+(c*kernel[2])
                    +(d*kernel[3])+(e*kernel[4])+(f*kernel[5])
                    +(g*kernel[6])+(h*kernel[7])+(k*kernel[8])))
  }
  }
  img3.updatePixels();

  image(img1, 256, 0);
  image(img2, 0, 256);
  image(img3, 256, 256);

  // image.hide()
  frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
}