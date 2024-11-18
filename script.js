const $canvas = document.querySelector('canvas');
const $ctx = $canvas.getContext('2d');
const $width = ($canvas.width = document.documentElement.scrollWidth);
const $height = ($canvas.height = window.innerHeight);
const LINE_COLOR = '#e81cff';
const CANVAS_BACKGROUND_COLOR = '#000';

const drawWave = ([p1, p2, p3, p4], r) => {
  $ctx.beginPath();
  $ctx.moveTo(p1.x, p1.y);
  $ctx.arcTo(p2.x, p2.y, p3.x, p3.y, r);
  $ctx.lineTo(p3.x, p3.y);
  $ctx.stroke();
  $ctx.closePath();
  $ctx.beginPath();
  $ctx.moveTo(p1.x, p1.y);
  $ctx.arcTo(p4.x, p4.y, p3.x, p3.y, r);
  $ctx.lineTo(p3.x, p3.y);
  $ctx.strokeStyle = LINE_COLOR;
  $ctx.stroke();
  $ctx.closePath();
};

const loop = t => {
  $ctx.clearRect(0, 0, $width, $height);
  const GROW_RADIUS = 50;
  const seconds = t / 1000;
  const angle = seconds % (Math.PI * 6);
  const radius = Math.abs(Math.cos(angle) * GROW_RADIUS);
  $ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  $ctx.fillRect(0, 0, $width, $height);

  for (let _y = 0; _y <= $height; _y += 100) {
    for (let _x = 0; _x <= $width; _x += 100) {
      drawWave(
        [
          { x: -50 + _x, y: 0 + _y },
          { x: 0 + _x, y: -100 + _y },
          { x: 50 + _x, y: 0 + _y },
          { x: 0 + _x, y: 100 + _y }
        ],
        radius
      );
    }
  }

  requestAnimationFrame(loop);
};

loop(0);

/*********************MOBILE ORIENTATION********************S */

let currentOrientation = screen.orientation.type;

function handleOrientationChange() {
  const newOrientation = screen.orientation.type;

  if (
    newOrientation.startsWith('portrait') &&
    !currentOrientation.startsWith('portrait')
  ) {
    currentOrientation = newOrientation;
    location.reload();
  } else if (
    newOrientation.startsWith('landscape') &&
    !currentOrientation.startsWith('landscape')
  ) {
    currentOrientation = newOrientation;
    location.reload();
  }
}

screen.orientation.addEventListener('change', handleOrientationChange);

handleOrientationChange();
