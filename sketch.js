const length_1 = 100;
const length_2 = 100;
const mass_1 = 20;
const mass_2 = 20;
let angle_1;
let angle_2;
let vel_1 = 0;
let vel_2 = 0;
let acc_1 = 0;
let acc_2 = 0;
const g = 1;

let history = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  angle_1 = PI / 2;
  angle_2 = PI / 2;
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  stroke(255, 0, 0);
  strokeWeight(10);
  noFill();

  point(0, 0);

  const x1 = length_1 * sin(angle_1);
  const y1 = length_1 * cos(angle_1);
  const x2 = x1 + length_2 * sin(angle_2);
  const y2 = y1 + length_2 * cos(angle_2);

  history.push(new p5.Vector(x2, y2));

  stroke(0, 255, 0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i < history.length; i++) {
    vertex(history[i].x, history[i].y);
  }
  endShape();

  stroke(255);
  strokeWeight(3);
  noFill();

  //first arm
  line(0, 0, x1, y1);
  //second arm
  line(x1, y1, x2, y2);

  noStroke();
  fill(255);

  //first bob
  ellipse(x1, y1, mass_1);
  //second bob
  ellipse(x2, y2, mass_2);

  acc_1 = (-g * (2 * mass_1 + mass_2) * sin(angle_1) - mass_2 * g * sin(angle_1 - 2 * angle_2) - 2 * sin(angle_1 - angle_2) * mass_2 * (pow(vel_2, 2) * length_2 + pow(vel_1, 2) * length_1 * cos(angle_1 - angle_2))) / (length_1 * (2 * mass_1 + mass_2 - mass_2 * cos(2 * angle_1 - 2 * angle_2)))
  acc_2 = (2 * sin(angle_1 - angle_2) * (pow(vel_1, 2) * length_1 * (mass_1 + mass_2) + g * (mass_1 + mass_2) * cos(angle_1) + pow(vel_2, 2) * length_2 * mass_2 * cos(angle_1 - angle_2))) / (length_2 * (2 * mass_1 + mass_2 - mass_2 * cos(2 * angle_1 - 2 * angle_2)));

  vel_1 += acc_1;
  vel_2 += acc_2;
  angle_1 += vel_1;
  angle_2 += vel_2;
}