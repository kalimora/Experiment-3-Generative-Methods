let isDay = true; // Tracks whether it's day or night
let moonPhaseIndex = 0; // Current moon phase
const moonPhases = [
  { darkOffset: 0, fullMoon: true }, // Full moon
  { darkOffset: 15, fullMoon: false }, // Waning gibbous
  { darkOffset: 25, fullMoon: false }, // Last quarter
  { darkOffset: 40, fullMoon: false }, // Waning crescent
  { darkOffset: 0, fullMoon: true }, // Reset to full moon
];
let clouds = []; // Array to hold cloud objects
let backgroundMusic;

function preload() {
  // Load the background music
  backgroundMusic = loadSound('2009-03-30-clairdelune_64kb.mp3'); 
}

function setup() {
  createCanvas(600, 400);
  spawnClouds(5); // Spawn initial clouds
  backgroundMusic.loop();
  backgroundMusic.setVolume(0.5);
}

function draw() {
  if (isDay) {
    background(135, 206, 250); // Day sky
    drawSun();
    updateClouds(); // Move and draw clouds
    drawEarth(0, 100, 0); // Green earth for day
  } else {
    background(18, 10, 50); // Night sky
    drawMoon();
    drawEarth(0, 50, 100); // Darker earth for night
  }
}

function drawSun() {
  fill(255, 223, 0); // Yellow sun
  circle(width / 2, height / 5, height / 6);
}

function drawMoon() {
