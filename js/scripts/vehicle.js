class Particle {

  constructor(x, y, targetX, targetY) {
    //Particle start
    this.spawn = createVector(x, y);
    // Particle end
    this.target = createVector(targetX, targetY);
  }
  // Particle speed random and Acceleration in 2d
    vel = createVector(random(), random());
    acc = createVector(); 
    maxSpeed = 5;
    maxForce = 0;
    radius = random(4,9);
    color = random(0, 100);
    saturation = random(60, 100);
    viewable = true;

  // Particle Display
  show = function () {
    fill(this.color, this.saturation, 100);
    noStroke();
    ellipse(this.spawn.x, this.spawn.y, this.radius, this.radius);
  }
  // Particle mouvement and forces
  update = function () {
    // Update the position depending of the spedd
    this.spawn.add(this.vel);
    // Update the spedd depending of the acceleration
    this.vel.add(this.acc);
    // Set the acc to 0 to limit the speed
    this.acc.mult(0);
    // 
    this.behaviors();
    // 
    this.onScreen();
  }
  //Apply the desired acceleration  
  behaviors = function () {
    var arrive = this.arrive(this.target);
    arrive.mult(1);
    this.applyForce(arrive);
  }
  // Add a force to the acceleration
  applyForce = function (f) {
    this.acc.add(f);
  }
  // Get the acceleration of the particle 
  // depending of the distance to his target
  arrive = function (target) {
    // Dist beetween the Particle and the target
    var desired = p5.Vector.sub(target, this.spawn);
    var d = desired.mag();
    //New speed 
    var speed = this.maxSpeed;
    if (d < 200) {
      //When the Particle is near to reach his target it slow down
      speed = map(d, 0, 200, 0, this.maxSpeed);
    }
    //Set desired speed to new speed acording maxspeed 
    desired.setMag(speed);
    // Get the difference to add to the acceleration
    var newVel = p5.Vector.sub(desired, this.vel);
    // Limit the vel with the maxforce  
    newVel.limit(this.maxforce);
    return newVel;
  }
  // Check if the particle is in the screen 
  onScreen = function () {
    if (this.spawn.x < 0) {
      this.viewable = false;
    }
  }
}