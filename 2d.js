export class Vec2D {
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    const l = this.mag();
    if (l === 0) {
      return new Vec2D(0, 0);
    }
    return new Vec2D(this.x / l, this.y / l);
  }
  mult(scalar) {
    return new Vec2D(this.x * scalar, this.y * scalar);
  }
  /**
   * 
   * @param {Vec2D} vec 
   * @returns {Vec2D}
   */
  sub(vec) {
    return new Vec2D(this.x - vec.x, this.y - vec.y)
  }
  /**
   * 
   * @param {Vec2D} vec 
   * @returns {Vec2D}
   */
  add(vec) {
    return new Vec2D(this.x + vec.x, this.y + vec.y)
  }
}

export class Circle2D {
  /**
   * 
   * @param {Vec2D} pos 
   * @param {number} radius 
   */
  constructor(pos, radius) {
    this.pos = pos;
    this.radius = radius;
  }
}

export class Rect {
  /**
   * 
   * @param {Vec2D} pos 
   * @param {number} width 
   * @param {number} height 
   */
  constructor(pos, width, height) {
    this.pos = pos;
    this.width = width;
    this.height = height;
  }
  copy() {
    return new Rect(this.pos.copy(), this.width, this.height);
  }
  get minX() {
    return this.pos.x;
  }
  get minY() {
    return this.pos.y;
  }
  get maxX() {
    return this.pos.x + this.width;
  }
  get maxY() {
    return this.pos.y + this.height;
  }
  get midX() {
    return this.pos.x + this.halfWidth;
  }
  get midY() {
    return this.pos.y + this.halfHeight;
  }
  get halfWidth() {
    return this.width / 2;
  }
  get halfHeight() {
    return this.height / 2;
  }
}