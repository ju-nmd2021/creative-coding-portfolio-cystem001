rectMode(CENTER);

class Shape {
  constructor(position, velocity, size, fillColor, shapeType, speed) {
    this.position = position;
    this.velocity = velocity;
    this.size = size;
    this.fillColor = fillColor;
    this.shapeType = shapeType;
    this.speed = speed;
  }

  // Multiply velocity by speed
  move() {
    this.position.add(p5.Vector.mult(this.velocity, this.speed));
  }

  display() {
    push();
    fill(this.fillColor);
    if (this.shapeType === "circle") {
      ellipse(this.position.x, this.position.y, this.size);
    } else if (this.shapeType === "square") {
      rect(this.position.x, this.position.y, this.size, this.size);
    } else if (this.shapeType === "triangle") {
      triangle(
        this.position.x - this.size / 2,
        this.position.y + this.size / 2,
        this.position.x,
        this.position.y - this.size / 2,
        this.position.x + this.size / 2,
        this.position.y + this.size / 2
      );
    }
    pop();
  }

  // change angle of direction and speed when mouse is pressed
  changeDirection() {
    this.velocity = p5.Vector.fromAngle(random(TWO_PI)); // Creates random direction
    this.speed += 1; // Increases the speed by one
  }
}

const numShapes = 200; // Number of shapes on the canvas
const shapes = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(226, 229, 226);
  rectMode(CENTER);

  // Create the initial objects on the canvas
  for (let i = 0; i < numShapes; i++) {
    spawnShape();
  }
}

function draw() {
  clear();

  // displays all shapes and puts them in motion
  for (const shape of shapes) {
    shape.move();
    shape.display();
  }

  // checks if mouse is pressed, then changes the direction and speed of shapes
  if (mouseIsPressed) {
    for (const shape of shapes) {
      shape.changeDirection();
    }
  }

  // checks if shapes have moved off the canvas and then, spawns new shapes to replace them
  const shapesToRemove = [];
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    if (
      shape.position.x < -shape.size / 2 ||
      shape.position.x > width + shape.size / 2 ||
      shape.position.y < -shape.size / 2 ||
      shape.position.y > height + shape.size / 2
    ) {
      shapesToRemove.push(i);
    }
  }

  for (const index of shapesToRemove) {
    shapes.splice(index, 1);
    spawnShape();
  }
}

function spawnShape() {
  const position = createVector(random(width), random(height));
  const velocity = p5.Vector.fromAngle(random(TWO_PI)); // Random direction
  const size = random(10, 30); // Size range for shapes
  const fillColor = color(random(255), random(255), random(255));
  const shapeTypes = ["circle", "square", "triangle"];
  const shapeType = random(shapeTypes); // Randomly select a shape type
  const speed = 1; // Initial speed
  const shape = new Shape(
    position,
    velocity,
    size,
    fillColor,
    shapeType,
    speed
  );
  shapes.push(shape);
}
