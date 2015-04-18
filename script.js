var growingPains, 
    urkel,
    howRude,
    whoa,
    fft,
    bigRadius,
    smallRadius,
    numberOfItems;

function preload() {
  growingPains = loadSound("raw_files/growing_pains.mp3");
  urkel = loadSound("raw_files/urkel.mp3");
  howRude = loadSound("raw_files/how_rude.mp3");
  whoa = loadSound("raw_files/whoa.mp3");
}

function setup() {
  createCanvas(window.innerWidth - 30, window.innerHeight - 30);
  fft = new p5.FFT();
  bigRadius = 100;
  smallRadius = 12;
  numberOfItems = 60;
}

function draw() {
  background(255);
  drawCircles();
  drawText("DO NOT TOUCH THE BANANAS");
}

function keyPressed() {
  var eightiesArray = [growingPains, urkel, howRude, whoa];

  if(keyCode === LEFT_ARROW) {
    eightiesArray[0].play();
  }

  if(keyCode === RIGHT_ARROW) {
    eightiesArray[1].play();
  }

  if(keyCode === UP_ARROW) {
    eightiesArray[2].play();
  }

  if(keyCode === DOWN_ARROW) {
    eightiesArray[3].play();
  }
}

function drawText(msg) {
  push();
  translate(width/2, height/2);
  textAlign(CENTER);
  textSize(56);
  stroke(0, 80);
  fill(0, 100);
  text(msg, 0, 0);
  pop();
}

function drawCircles() {
  var spectrum = fft.analyze();

  push();
  translate(width/2, height/2);
  fill(255, 38, 120);
  noStroke();
  for (var i = 0, len = numberOfItems; i < len; i++) {
    var angle  = (Math.PI*2)/numberOfItems * i,
        factor = map(spectrum[i], 0, 255, 1, 1.9),
        xPos   = bigRadius * cos(angle) * factor,
        yPos   = bigRadius * sin(angle) * factor;
    for (var j = 0; j < 10; j++) {
      ellipse(sqrt(j) * xPos, sqrt(j) * yPos, j * smallRadius * 0.15, j * smallRadius * 0.15);
    }
  }
  pop();
}

