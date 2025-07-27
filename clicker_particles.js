
function spawnParticle(x, y, emoji = "🍃") {
  const particle = document.createElement("div");
  particle.textContent = emoji;
  particle.style.position = "fixed";
  particle.style.left = window.scrollX + x + "px";
  particle.style.top = window.scrollY + y + "px";
  particle.style.fontSize = "20px";
  particle.style.pointerEvents = "none";
  particle.style.opacity = 1;
  particle.style.transition = "transform 1s ease-out, opacity 1s ease-out";
  particle.style.transform = "translateY(0px) scale(1)";
  particle.style.zIndex = 9999;

  document.body.appendChild(particle);

  // Auslösen der Animation
  setTimeout(() => {
    const xShift = (Math.random() - 0.5) * 100;
    const yShift = -60 - Math.random() * 40;
    particle.style.transform = `translate(${xShift}px, ${yShift}px) scale(0.5)`;
    particle.style.opacity = 0;
  }, 10);

  // Entfernen nach Animation
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

// Klickereignisse mit Partikel
document.addEventListener("click", function (e) {
  const target = e.target;
  const { clientX: x, clientY: y } = e;

  if (target.id === "gather_herbs") {
    spawnParticle(x, y, "🌿");
  }
  else if (target.id === "gather_food") {
    spawnParticle(x, y, "🍖");
  }
  else if (target.id === "sell_all") {
    spawnParticle(x, y, "💰");
  }
});
