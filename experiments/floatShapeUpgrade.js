const numShapes = 300;
const shapes = [];
let synth;
let musicPlaying = false;
const notesToPlay = [
  "C4",
  "D4",
  "E4",
  "G4",
  "E4",
  "C4",
  "B3",
  "D4",
  "F4",
  "G4",
  "F4",
  "D4",
  "C4",
  "E4",
  "G4",
  "B4",
  "G4",
  "E4",
  "A3",
  "C4",
  "E4",
  "G4",
  "E4",
  "C4",
];

let noteIndex = 0;

window.addEventListener("load", () => {
  // Initialize the synth and set its properties
  synth = new Tone.PolySynth().toDestination();
  synth.set({
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.3,
      release: 0.5,
    },
  });
});

class Shape {
  constructor(position, velocity, size, fillColor, shapeType, speed) {
    this.position = position;
    this.velocity = velocity;
    this.size = size;
    this.fillColor = fillColor;
    this.shapeType = shapeType;
    this.speed = speed;
  }

  // move shapes based on velocity and speed
  move() {
    this.position.add(p5.Vector.mult(this.velocity, this.speed));
  }

  // display shapes on canvas
  display() {
    push();
    noStroke();

    // Determine the grid cell the shape is in
    const gridSize = 160; // Size of each grid cell
    const gridX = Math.floor(this.position.x / gridSize);
    const gridY = Math.floor(this.position.y / gridSize);

    // Calculate the color for the current grid cell
    const bgColor1 = color(9, 20, 60, 60); // Light color for the background
    const bgColor2 = color(200, 200, 200, 60); // Dark color for the background
    let gridColor;
    if ((gridX + gridY) % 2 === 0) {
      gridColor = bgColor1;
    } else {
      gridColor = bgColor2;
    }

    // Determine if the shape is in the brighter or darker part of the grid
    const isInBrighterRegion = gridColor.levels[0] < 100;

    // Set the transparency (alpha) based on the region
    if (isInBrighterRegion) {
      this.fillColor.setAlpha(255); // Make the shape invisible in the brighter region
    } else {
      this.fillColor.setAlpha(0); // Make the shape fully visible in the darker region
    }

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
    } else if (this.shapeType === "star") {
      const x = this.position.x;
      const y = this.position.y;
      const outerRadius = this.size;
      const innerRadius = this.size / 2;
      const angle = TWO_PI / 8;
      beginShape();
      for (let i = 0; i < TWO_PI; i += angle) {
        const x1 = x + cos(i) * outerRadius;
        const y1 = y + sin(i) * outerRadius;
        vertex(x1, y1);
        const x2 = x + cos(i + angle / 2) * innerRadius;
        const y2 = y + sin(i + angle / 2) * innerRadius;
        vertex(x2, y2);
      }
      endShape(CLOSE);
    }
    pop();
  }

  // change direction and speed of shapes
  changeDirection() {
    this.velocity = p5.Vector.fromAngle(random(TWO_PI));
    this.speed += 1;

    if (!musicPlaying) {
      musicPlaying = true;
      Tone.Transport.start();

      // plays the notes sequentially
      const sequence = new Tone.Sequence(
        (time, note) => {
          synth.triggerAttackRelease(note, "4n", time);
        },
        notesToPlay,
        "4n"
      );

      // Start the sequence and loop it
      sequence.start();
      sequence.loop = true;
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);

  for (let i = 0; i < numShapes; i++) {
    spawnShape();
  }
}

function draw() {
  for (const shape of shapes) {
    shape.move();
    shape.display();
  }

  // Draw the chessboard-like grid
  const gridSize = 160; // Size of each grid cell
  const cols = width / gridSize;
  const rows = height / gridSize;
  const bgColor1 = color(9, 20, 60, 60); // Dark color for the background
  const bgColor2 = color(200, 200, 200, 60); // Light color for the background

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if ((i + j) % 2 === 0) {
        fill(bgColor1);
      } else {
        fill(bgColor2);
      }
      rect(
        i * gridSize + gridSize / 2,
        j * gridSize + gridSize / 2,
        gridSize,
        gridSize
      );
    }
  }

  // Remove shapes that are out of bounds and spawn new ones
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
  const velocity = p5.Vector.fromAngle(random(TWO_PI));
  const size = random([10, 15, 20, 30, 40]); // Random size from the provided values
  const fillColor = color(random(255), random(255), random(255));
  const shapeTypes = ["circle", "square", "triangle", "star"];
  const shapeType = random(shapeTypes);
  const speed = 2;
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

// Listen for mouse click to change direction
function mousePressed() {
  for (const shape of shapes) {
    shape.changeDirection();
  }
}
