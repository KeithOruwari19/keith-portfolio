/* ==========================================================
   Red Mist Cursor Trail
========================================================== */

const trailCanvas = document.getElementById("trail-canvas");
const tctx = trailCanvas.getContext("2d");

function resizeTrailCanvas() {
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
}
resizeTrailCanvas();
window.addEventListener("resize", resizeTrailCanvas);

let mistPoints = [];

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  for (let i = 0; i < 2; i++) {
    mistPoints.push({
      x: x + (Math.random() - 0.5) * 7,
      y: y + (Math.random() - 0.5) * 7,
      r: 12 + Math.random() * 18,
      alpha: 0.2 + Math.random() * 0.08,
      life: 1,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    });
  }

  if (mistPoints.length > 55) {
    mistPoints.splice(0, mistPoints.length - 55);
  }
});

function renderMist() {
  const w = trailCanvas.width;
  const h = trailCanvas.height;
  tctx.clearRect(0, 0, w, h);

  for (let i = mistPoints.length - 1; i >= 0; i--) {
    const p = mistPoints[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life *= 0.94;
    p.alpha *= 0.94;
    p.r *= 0.99;

    if (p.alpha < 0.015 || p.r < 4) {
      mistPoints.splice(i, 1);
      continue;
    }

    const grad = tctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    grad.addColorStop(0, `rgba(255, 35, 35, ${p.alpha})`);
    grad.addColorStop(0.35, `rgba(150, 0, 15, ${p.alpha * 0.7})`);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    tctx.fillStyle = grad;
    tctx.beginPath();
    tctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    tctx.fill();
  }

  requestAnimationFrame(renderMist);
}

renderMist();
