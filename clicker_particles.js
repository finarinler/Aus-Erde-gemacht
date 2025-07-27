
function spawnClickEffect(x, y, text = "+1", color = "#2ecc71") {
  const effect = document.createElement("div");
  effect.textContent = text;
  effect.style.position = "fixed";
  effect.style.left = x + "px";
  effect.style.top = y + "px";
  effect.style.fontSize = "16px";
  effect.style.fontWeight = "bold";
  effect.style.color = color;
  effect.style.pointerEvents = "none";
  effect.style.opacity = 1;
  effect.style.transition = "all 1s ease-out";
  effect.style.zIndex = 9999;

  document.body.appendChild(effect);

  setTimeout(() => {
    effect.style.top = (y - 50) + "px";
    effect.style.opacity = 0;
  }, 20);

  setTimeout(() => {
    effect.remove();
  }, 1000);
}

// Ereignisse anhängen für Klick-Feedback
document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.id === "gather_herbs") {
    spawnClickEffect(e.clientX, e.clientY, "+1 Kräuter", "#27ae60");
  }
  else if (target.id === "gather_food") {
    spawnClickEffect(e.clientX, e.clientY, "+1 Nahrung", "#e67e22");
  }
  else if (target.id === "sell_all") {
    spawnClickEffect(e.clientX, e.clientY, "💰 Verkauft", "#f1c40f");
  }
});
