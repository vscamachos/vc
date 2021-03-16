let img;
let img1;

function preload() {
  img = loadImage("/vc/docs/sketches/lenna.png");
}

function setup() {
  // Create a canvas that's at least the size of the image.
  createCanvas(512, 512);
  image(img, 0, 0, 250, 250);
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      c = get(i,j);
      img.set(i, j, color(255-red(c), 255-green(c), 255-blue(c)));
    }
  }
  img.updatePixels();
  image(img, 250, 0);
  image(img, 0, 250);
  image(img, 250, 250);

  // image.hide()
  frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
}

