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
  img1 = createImage(x, y);
  img1.copy(img, 0,0, x, y, 0, 0, x, y)
  img1.loadPixels();
  for (let i = 0; i < img1.width; i++) {
    for (let j = 0; j < img1.height; j++) {
      c = get(i,j);
      img1.set(i, j, color(255-red(c), 255-green(c), 255-blue(c)));
    }
  }
  img1.updatePixels();

  // y = R*O.3+G*O.59+B*O.11 escala de grises
  img2 = createImage(x, y)
  img2.copy(img, 0,0, x, y, 0, 0, x, y)
  img2.loadPixels();
  for (let i = 0; i < img2.width; i++) {
    for (let j = 0; j < img2.height; j++) {
      c = get(i,j);
      img2.set(i, j, color(red(c)*0.3 + green(c)*0.59 + blue(c)*0.11));
    }
  }
  img2.updatePixels();

  img3 = createImage(x, y)
  img3.copy(img, 0,0, x, y, 0, 0, x, y)
  img3.loadPixels();
  for (let i = 0; i < img3.width; i++) {
    for (let j = 0; j < img3.height; j++) {
      c = get(i,j);
      img3.set(i, j, color(red(c) + green(c) + blue(c)/3));
    }
  }
  img3.updatePixels();

  image(img1, 256, 0);
  image(img2, 0, 256);
  image(img3, 256, 256);

  // image.hide()
  frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
}