function Particle(x, y, vX, vY, color, firework) {

  this.pos = createVector(x, y);
  this.vel = createVector(vX, vY);
  this.acc = createVector();
  this.color = color;
  this.r = random(2, 5);
  this.opacity = 100;
  this.saturation = random(40, 100);
  this.firework = firework;
  this.transformed = false;

  this.update = function() {

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.r === 0 && !this.transformed && points.length > vehicles.length) {

      if (frameCount % 2 === 0) {
        vehicles.push(new Vehicle(points[vehicles.length].x, points[vehicles.length].y, this.pos.x, this.pos.y, this.r));
      }
      this.transformed = true;
    }
    if (this.firework === 1) {
      if (this.r > 0) {
        this.r -= 0.05;

      } else {
        this.r = 0;
      }
    }
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    noStroke();

    if (this.firework === 0) {
      fill(this.color, 100, 100);
      rect(this.pos.x, this.pos.y, width / 1000, width / 500);
    } else if (this.firework === 1) {
      fill(this.color, this.saturation, this.opacity);
      ellipse(this.pos.x + 2, this.pos.y - 2, this.r);

    } else if (this.firework === 2) {
      fill(20, 50, 100);
      rect(this.pos.x + random(-8, 8), this.pos.y + random(-8, 8), this.r / random(3, 10), this.r / 3);
    }

  }

}