sketchFadeAlpha = 0


function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  noStroke(); // Smooth blending
  background(250); // Light gray background
  noCursor();
}

function draw() {
  // Draw the base gray background
  background(255, 255, 255);

  // Draw and update highlights
  for (let i = highlights.length - 1; i >= 0; i--) {
    let h = highlights[i];

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