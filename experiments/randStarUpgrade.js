function setup() {
  createCanvas(innerWidth, innerHeight);
  background(226, 229, 226);
  rectMode(CENTER);
}

function draw() {
  // Draws multiple stars at random positions on the canvas
  push();

  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let outerRadius = random(20, 60);
    let innerRadius = random(10, 15, 20);
    let numPoints = int(random(8, 12, 16));
    let fillColor = color(random(10), random(20), random(130));

    Star(x, y, outerRadius, innerRadius, numPoints, fillColor);
  }

  pop();
}

// Draws the star when called
function Star(x, y, outerRadius, innerRadius, numPoints, fillColor) {
  push();
  translate(x, y);

  // Adds the glow-like effect to the stars
  for (let i = outerRadius; i > 0; i -= 2) {
    let gradientColor = color(255, 255, 255, map(i, 0, outerRadius, 0, 80)); // Radial gradient fill
    fill(gradientColor);
    ellipse(0, 0, i * 2, i * 2);
  }

  fill(fillColor);

  let angle = TWO_PI / numPoints;

  beginShape();
  for (let i = 0; i < TWO_PI; i += angle) {
    let x1 = outerRadius * cos(i);
    let y1 = outerRadius * sin(i);
    vertex(x1, y1);

    let x2 = innerRadius * cos(i + angle / 2);
    let y2 = innerRadius * sin(i + angle / 2);
    vertex(x2, y2);
  }
  endShape(CLOSE);

  pop();
}
