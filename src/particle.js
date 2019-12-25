import Vector from './vector';

class Particle {
  constructor({ x, y, speed, direction, grav }) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0).setLength(speed).setAngle(direction);
    this.gravity = new Vector(0, grav || 0);
  }

  accelerate(accel) {
    this.velocity.addTo(accel);

    return this;
  }

  update() {
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  }
}

export default Particle;
