
// === Ressourcen ===
let res_money = 0;
let res_herbs = 0;
let res_food = 0;
let res_wood = 0;
let res_stone = 0;
let res_coal = 0;
let res_ore = 0;

function updateDisplay() {
  document.getElementById("res_money_count").textContent = res_money;
  document.getElementById("res_herbs_count").textContent = res_herbs;
  document.getElementById("res_food_count").textContent = res_food;
  document.getElementById("res_wood_count").textContent = res_wood;
  document.getElementById("res_stone_count").textContent = res_stone;
  document.getElementById("res_coal_count").textContent = res_coal;
  document.getElementById("res_metal_count").textContent = res_ore;
}
document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  const gather = (id, action) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", action);
    }
  };

  gather("gather_herbs", () => {
    res_herbs++;
    updateDisplay();
  });

  gather("gather_food", () => {
    res_food++;
    updateDisplay();
  });

  gather("gather_wood", () => {
    res_wood++;
    updateDisplay();
  });

  gather("gather_stone", () => {
    res_stone++;
    // Chance auf Kohle und Erz
    let roll = Math.random();
    if (roll <= 0.015) { res_coal++; res_ore ++; }
    else if (roll <= 0.035) { res_ore ++; }
    else if (roll <= 0.10) { res_coal++; }
    updateDisplay();
  });

  // Speicherfunktion (nur auf Overview)
  const save = document.getElementById("save_game");
  const load = document.getElementById("load_game");
  const del = document.getElementById("delete_game");

  if (save) save.addEventListener("click", () => {
    localStorage.setItem("clickerSave", JSON.stringify({
      money: res_money,
      herbs: res_herbs,
      food: res_food,
      wood: res_wood,
      stone: res_stone,
      coal: res_coal,
      ore: res_ore
    }));
  });

  if (load) load.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("clickerSave") || "{}");
    res_money = data.money || 0;
    res_herbs = data.herbs || 0;
    res_food = data.food || 0;
    res_wood = data.wood || 0;
    res_stone = data.stone || 0;
    res_coal = data.coal || 0;
    res_ore = data.ore || 0;
    updateDisplay();
  });

  if (del) del.addEventListener("click", () => {
    localStorage.removeItem("clickerSave");
    res_money = res_herbs = res_food = res_wood = res_stone = res_coal = res_ore = 0;
    updateDisplay();
  });
});
