rectMode(CENTER);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }
}

let circlePosition = createVector(100, 100);
let circleVelocity = createVector(1, 3.3);
const circleRadius = 40;

let squarePosition = createVector(200, 200);
let squareVelocity = createVector(2, -2);
const squareSize = 40;

let trianglePosition = createVector(300, 300);
let triangleVelocity = createVector(-2, 2);
const triangleSize = 40;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(226, 229, 226);
  rectMode(CENTER);
}

function draw() {
  clear();

  //   update shape's position
  // circle
  circlePosition.add(circleVelocity);

  // square
  squarePosition.add(squareVelocity);

  // triangle
  trianglePosition.add(triangleVelocity);

  // Check collisions and prevent them
  checkCollision(circlePosition, circleRadius, squarePosition, squareSize);
  checkCollision(circlePosition, circleRadius, trianglePosition, triangleSize);
  checkCollision(squarePosition, squareSize, trianglePosition, triangleSize);

  // Check if shapes hits the canvas edges and reverse velocities
  handleBoundaryCollision(circlePosition, circleVelocity, circleRadius);
  handleBoundaryCollision(squarePosition, squareVelocity, squareSize);
  handleBoundaryCollision(trianglePosition, triangleVelocity, triangleSize);

  // Draw the shapes
  drawShape(circlePosition, circleRadius, "circle", color(160, 160, 80));
  drawShape(squarePosition, squareSize, "square", color(60, 160, 80));
  drawShape(trianglePosition, triangleSize, "triangle", color(80, 60, 160));
}

function checkCollision(pos1, size1, pos2, size2) {
  let distance = dist(pos1.x, pos1.y, pos2.x, pos2.y);
  if (distance < size1 / 2 + size2 / 2) {
    // Reverse velocities to prevent collision
    let temp = pos1.copy();
    pos1.set(pos2);
    pos2.set(temp);
  }
}

function handleBoundaryCollision(position, velocity, size) {
  if (
    position.x + size / 2 > width ||
    position.x - size / 2 < 0 ||
    position.y + size / 2 > height ||
    position.y - size / 2 < 0
  ) {
    // Reverse velocities to keep shapes inside the canvas
    velocity.mult(-1);
  }
}

function drawShape(position, size, shapeType, fillColor) {
  push();
  fill(fillColor);
  if (shapeType === "circle") {
    ellipse(position.x, position.y, size);
  } else if (shapeType === "square") {
    rect(position.x, position.y, size);
  } else if (shapeType === "triangle") {
    triangle(
      position.x - size / 2,
      position.y + size / 2,
      position.x,
      position.y - size / 2,
      position.x + size / 2,
      position.y + size / 2
    );
  }
  pop();
}
