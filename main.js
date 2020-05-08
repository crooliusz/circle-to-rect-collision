import { Vec2D, Circle2D, Rect } from './2d.js';

const player = new Circle2D(new Vec2D(400, 400), 100);
const platforms = [
  new Rect(new Vec2D(200, 200), 100, 100),
  new Rect(new Vec2D(450, 200), 100, 100),
]
let direction = new Vec2D(0, 0);

const pixelRatio = window.devicePixelRatio;
window.onload = start;
const width = 500 * pixelRatio;
const height = 500 * pixelRatio;
let canvasEl;
let ctx;

function start() {
  canvasEl = document.querySelector('canvas');
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  ctx = canvasEl.getContext('2d');

  canvasEl.width = width;
  canvasEl.height = width;
  canvasEl.style.width = width / 2 + 'px';
  canvasEl.style.height = height / 2 + 'px';
  requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  player.pos.x += direction.x * 10;
  player.pos.y += direction.y * 10;


  ctx.lineWidth = 2;

  for (let platform of platforms) {

    ctx.strokeRect(platform.pos.x, platform.pos.y, platform.width, platform.height);
    
    const nearestX = Math.max(platform.pos.x, Math.min(player.pos.x, platform.pos.x + platform.width));
    const nearestY = Math.max(platform.pos.y, Math.min(player.pos.y, platform.pos.y + platform.height));
    const distance = new Vec2D(player.pos.x - nearestX, player.pos.y - nearestY);
    const penetrationDepth = player.radius - distance.mag();

    if (penetrationDepth > 0) {
      const penetration = distance.normalize().mult(penetrationDepth);
      player.pos = player.pos.add(penetration);
    }
  }

  ctx.beginPath();
  ctx.arc(player.pos.x, player.pos.y, player.radius, 0, Math.PI * 2);
  ctx.stroke();

  requestAnimationFrame(draw);
}

function onKeyDown(e) {
  changeDir(e, 1);
}
function onKeyUp(e) {
  changeDir(e, 0);
}
function changeDir(e, d) {
  switch (e.key) {
    case "a":
      direction.x = -1 * d;
      break;
    case "d":
      direction.x = 1 * d;
      break;
    case "w":
      direction.y = -1 * d;
      break;
    case "s":
      direction.y = 1 * d;
      break;
    default:
      break;
  }
  direction = direction.normalize();
}