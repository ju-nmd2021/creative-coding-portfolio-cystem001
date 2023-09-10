let cols, rows;
let scl = 5; // Scale for the flow field
let flowfield = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(226, 229, 246);
  cols = floor(width / scl);
  rows = floor(height / scl);

  // Iflow field with random vectors and colors
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let angle = random(TWO_PI);
      let length = random(10, 50); // Random length for lines
      angle += random(-PI / 4, PI / 4); // randomness to the angle
      let vx = cos(angle) * length;
      let vy = sin(angle) * length;
      let v = createVector(vx, vy);
      let col = color(random(255), random(255), random(255)); // Random stroke color
      flowfield.push({ vector: v, color: col });
    }
  }

  // Display for field
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let x1 = x * scl;
      let y1 = y * scl;
      // Adjust the length of the vectors
      let x2 = x1 + flowfield[index].vector.x;
      let y2 = y1 + flowfield[index].vector.y;
      // Set the stroke color from the flow field
      stroke(flowfield[index].color);
      line(x1, y1, x2, y2);
    }
  }
}

function draw() {}
