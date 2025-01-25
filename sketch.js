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
  let moonX = width / 2;
  let moonY = height / 5;
  let moonSize = height / 6;

  fill(255); // Full moon base
  circle(moonX, moonY, moonSize);

  let phase = moonPhases[moonPhaseIndex];
  if (!phase.fullMoon) {
    fill(18, 10, 50); // Dark overlay for crescent phases
    circle(moonX + phase.darkOffset, moonY, moonSize);
  }
}

function drawEarth(r, g, b) {
  fill(r, g, b); // Earth color changes for day/night
  ellipse(width / 2, height, width * 2, height);
}
function spawnClouds(count) {
  for (let i = 0; i < count; i++) {
    let x = random(width); // Random x position
    let y = random(50, height / 2 - 50); // Random y position above the earth
    let size = random(50, 100); // Random size
    clouds.push({ x, y, size, speed: random(1, 2) }); // Add cloud object
  }
}

function updateClouds() {
  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];
    drawCloud(cloud.x, cloud.y, cloud.size);
    cloud.x += cloud.speed; // Move cloud to the right

    // Reset cloud position when it moves off screen
    if (cloud.x > width) {
      cloud.x = -cloud.size;
      cloud.y = random(50, height / 2 - 50); // Spawning above the earth
    }
  }
}

function drawCloud(x, y, size) {
  fill(255, 255, 255, 200); // transparent white for clouds
  noStroke();
  ellipse(x, y, size, size / 2); // Main cloud body
  ellipse(x - size / 3, y + size / 8, size / 1.5, size / 3); // Left part
  ellipse(x + size / 3, y + size / 8, size / 1.5, size / 3); // Right part
}


function mouseClicked() {
  isDay = !isDay; // Toggle between day and night
  if (!isDay) {
    moonPhaseIndex = (moonPhaseIndex + 1) % moonPhases.length; // Cycle moon phase
  }
}

