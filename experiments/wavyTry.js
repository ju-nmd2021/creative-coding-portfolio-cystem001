const numRaindrops = 500;
const raindrops = [];
let synth;
let musicPlaying = false;
const notesToPlay = [];

let noteIndex = 0;
let waterLevel = 0; // Initializes the water level
let waveAngle = 0; // Initializes the wave angle for the ocean-feel effect

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

class Raindrop {
  constructor(x, y, length, angle, fillColor) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.fillColor = fillColor;
    this.speed = random(1, 5);
  }

  // Moves raindrops vertically
  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-this.length, 0);
    }
  }

  // Display raindrops on canvas
  display() {
    push();
    stroke(this.fillColor);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
    pop();
  }

  // Change direction and play sound (if not already playing)
  changeDirection() {
    if (!musicPlaying) {
      musicPlaying = true;
      Tone.Transport.start();

      // Plays the notes sequentially
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
  background(226, 229, 226);

  for (let i = 0; i < numRaindrops; i++) {
    const x = random(width);
    const y = random(-height, 0);
    const length = random(10, 30);
    const angle = random(TWO_PI);
    const fillColor = color(0, 102, 204); // Blue color for raindrops
    const raindrop = new Raindrop(x, y, length, angle, fillColor);
    raindrops.push(raindrop);
  }
}

function draw() {
  clear();
  for (const raindrop of raindrops) {
    raindrop.move();
    raindrop.display();

    // Checks if raindrop reaches the bottom
    if (raindrop.y + raindrop.length >= height) {
      waterLevel += 0.01; // Increase the water level gradually
    }
  }

  // Draws the ocean-like water level with waves
  noStroke();
  fill(0, 102, 204); // Blue color for the ocean feel
  beginShape();
  for (let x = 0; x < width; x += 20) {
    const y = height - waterLevel + sin(waveAngle) * 2; // Adds wavy motion
    vertex(x, y);
    waveAngle += 0.2; // Increase the wave angle
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Listen for mouse click to refresh the water level
  if (mouseIsPressed) {
    waterLevel = 0; // Reset the water level
  }
}
