class Vector {
  constructor(x = 1, y = 0) {
    this.x = x;
    this.y = y
  }

  getX() {
    return this.x
  }

  setX(value) {
    this.x = value;
    return this;
  }

  getY() {
    return this.y;
  }

  setY(value) {
    this.y = value;
    return this;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getAngle() {
    return Math.atan2(this.y, this.y);
  }

  setLength(length) {
    const angle = this.getAngle();

    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;

    return this;
  }

  setAngle(angle) {
    const length = this.getLength();

    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;

    return this;
  }

  add(v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }

  multiply(value) {
    return new Vector(this.x * value, this.y * value);
  }

  divide(value) {
    return new Vector(this.x / value, this.y / value);
  }

  addTo(v2) {
    this.x += v2.getX();
    this.y += v2.getY();

    return this;
  }

  subtractFrom(v2) {
    this.x -= v2.getX();
    this.y -= v2.getY();

    return this;
  }

  multiplyBy(val) {
    this.x *= val;
    this.y *= val;

    return this;
  }

  divideBy(val) {
    this.x /= val;
    this.y /= val;

    return this;
  }
}

export default Vector;
