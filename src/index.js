'user strict';
import './styles/index.scss';

import Particle from './particle';

function getById(id) {
  return document.getElementById(id);
} 
function randomNumBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * ---------------------
 * Snowflake class
 * ---------------------
 */
class Snowflake extends Particle {
  constructor({
    x, y, speed, direction, grav,radius,
    offsetAlpha = 0.4,
    baseAlpha = 0.5,
    alphaSpeed = 0.05,
    offsetDirection = direction,
  }) {
    super({ x, y, speed, direction, grav });

    this.direction = direction;
    this.baseDirection = direction / 2;
    this.offsetDirection = offsetDirection;
    this.angle = 0;
    this.angleSpeed = 0.005;

    // alpha channel
    this.offsetAlpha = offsetAlpha;
    this.baseAlpha = baseAlpha;
    this.radius = radius;
    this.angleAlpha = 0;
    this.alphaSpeed = alphaSpeed;
    this.alpha = this.baseAlpha + Math.sin(this.angleAlpha) * this.offsetAlpha;
  }

  changeAlpha() {
    this.angleAlpha += this.alphaSpeed;
    this.alpha = this.baseAlpha + Math.sin(this.angleAlpha) * this.offsetAlpha;
  }

  changeDirection() {
    this.angle += this.angleSpeed;
    this.direction = this.baseDirection + Math.sin(this.angle) * this.offsetDirection;
    this.velocity.setAngle(this.direction);
  }

  checkCollision(w, h) {
    if (this.position.getX() > w + this.radius) {
      this.position.setX(-this.radius);
    } else if (this.position.getX() < -this.radius) {
      this.position.setX(this.w + this.radius);
    }

    if (this.position.getY() > h + this.radius) {
      this.position.setY(-this.radius);
    } else if (this.position.getY() < -this.radius) {
      this.position.setY(this.h + this.radius);
    }
  }

  render(state) {
    super.update();
    this.changeAlpha();
    this.checkCollision(state.w, state.h);
    this.changeDirection();

    const context = state.context;

    context.save();

    context.fillStyle = `rgba(100, 120, 250, ${this.alpha})`;
    context.beginPath();
    context.arc(
      this.position.getX(),
      this.position.getY(),
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    context.fill();

    context.restore();
  }
}

/**
 * ---------------------
 * Scene class
 * ---------------------
 */
class Scene {
  constructor(args) {
    this.canvas = getById(args.canvas);
    this.context = this.canvas.getContext('2d');
    this.ratio = window.devicePixelRatio || 1;
    this.width = this.canvas.width = window.innerWidth * this.ratio;
    this.height = this.canvas.height = window.innerHeight * this.ratio;
    this.particles = [];
  }

  // ----- Handle resize when width width or height was changed -----
  handleResize() {
    this.ratio = window.devicePixelRatio || 1;
    this.width = this.canvas.width = window.innerWidth * this.ratio;
    this.height = this.canvas.height = window.innerHeight * this.ratio;
  }

  // ----- Initialize listeners and start animations -----
  init() {
    window.addEventListener('resize', this.handleResize.bind(this, false));
    this.generateParticles(150);
  }

  // ----- Create objects and push them to a group -----
  createObject(item, group) {
    this[group].push(item);
  }

  // ----- Call render method on each object -----
  updateObjects(group) {
    this[group].forEach(item => {
      item.render({
        context: this.context,
        w: this.width,
        h: this.height,
      });
    });
  }

  generateParticles(howMany) {
    for (let i = 0; i < howMany; i += 1) {
      const p = new Snowflake({
        x: randomNumBetween(0, this.width),
        y: randomNumBetween(0, this.height),
        speed: randomNumBetween(0.1, 0.9),
        direction: randomNumBetween(0, Math.PI / 2.8),
        grav: 0,
        radius: randomNumBetween(1, 3),
        alphaSpeed: randomNumBetween(0.005, 0.05),
      });
      this.createObject(p, 'particles');
    }
  }

  // ----- Update all objects position, speed, etc... -----
  update() {
    const context = this.context;

    context.save();

    context.fillStyle = '#171717';
    context.globalAlpha = 0.7;
    context.fillRect(0, 0, this.width, this.height);
    context.globalAlpha = 1;

    this.updateObjects('particles');

    context.restore();

    requestAnimationFrame(() => {this.update()});
  }
}

const scene = new Scene({ canvas: 'canvas' });
scene.init();
scene.update();
