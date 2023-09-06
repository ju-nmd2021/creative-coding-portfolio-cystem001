function setup() {
  createCanvas(innerWidth, innerHeight);
  background(226, 229, 226);
  rectMode(CENTER);
}

function draw() {
  // Drawing multiple stars at random positions on the canvas
  push();

  for (let i = 0; i < 4; i++) {
    let x = random(width);
    let y = random(height);
    let outerRadius = random(30, 100);
    let innerRadius = random(10, 40);
    let numPoints = int(random(4, 9, 12, 16));
    let fillColor = color(random(255), random(255), random(255));

    Star(x, y, outerRadius, innerRadius, numPoints, fillColor);
  }

  pop();
}

// Draws the star when called
function Star(x, y, outerRadius, innerRadius, numPoints, fillColor) {
  push();
  translate(x, y);
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
