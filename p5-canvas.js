const sketchContainer = document.getElementById('sketch-container');
const containerWidth = sketchContainer.clientWidth;
const containerHeight = sketchContainer.clientHeight;

let img; // Global variable to store the image

let ballx = 100;
let bally = 100;
let ballxspeed = 6;
let ballyspeed = 4;
let highlights = [];
let fadeSpeed = 1; // Controls fade-out speed

function preload() {
  // Correctly load the image in preload()
  img = loadImage('assets/floatinghead.png'); // Update the path if needed
  img.resize(0,30);
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  noStroke(); // Smooth blending
  background(250, 250, 250);
  noCursor();
}

function draw() {
  // Draw the base gray background
  background(250, 250, 250);

  // Draw and update highlights
  for (let i = highlights.length - 1; i >= 0; i--) {
    let h = highlights[i];

    // Draw green glow
    for (let j = 40; j > 0; j--) { // Smaller, diffused circles
      let alpha = map(j, 0, 20, h.alpha, 1); // Fading alpha
      let radius = j * 4; // Smaller radius
      fill(240, 240, 240, alpha); 
      ellipse(h.x, h.y, radius, radius); // Draw highlight
    }

    // Gradually fade the highlight
    h.alpha -= fadeSpeed;
    if (h.alpha <= 0) {
      highlights.splice(i, 1); // Remove completely faded highlights
    }
  }

  img.resize(0,200);

  // Draw the image instead of the ellipse
  image(img, ballx, bally); // Adjust size as needed

  // Move the image
  ballx += ballxspeed;
  bally += ballyspeed;

  // Bounce off edges
  if (ballx > windowWidth || ballx < 0) ballxspeed *= -1; // Account for image width
  if (bally > windowHeight - 100 || bally < 0) ballyspeed *= -1; // Account for image height

  // Add a new highlight at the mouse position
  highlights.push({ x: mouseX, y: mouseY, alpha: 50 }); // Initial alpha value
}

function mouseMoved() {
  // Ensure highlights get added when the mouse moves
  highlights.push({ x: mouseX, y: mouseY, alpha: 50 });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize
}
