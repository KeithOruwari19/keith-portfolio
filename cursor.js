/* ==========================================================
   Smooth Red Cursor (Centered + Inertia)
========================================================== */

const ring = document.querySelector(".cursor-outer");
const pulse = document.querySelector(".cursor-inner");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
const speed = 0.17;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function follow() {
  ringX += (mouseX - ringX) * speed;
  ringY += (mouseY - ringY) * speed;

  ring.style.transform = `translate(${ringX - 13}px, ${ringY - 13}px)`;

  requestAnimationFrame(follow);
}
follow();

document.querySelectorAll("a, button, .social-btn").forEach((el) => {
  el.addEventListener("mouseenter", () => ring.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => ring.classList.remove("cursor-hover"));
});

window.addEventListener("mousedown", () => {
  pulse.style.opacity = 1;
  pulse.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px) scale(1)`;

  setTimeout(() => {
    pulse.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px) scale(26)`;
    pulse.style.opacity = 0;
  }, 20);
});
