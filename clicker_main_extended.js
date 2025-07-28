
// Ressourcen initialisieren
let res_money = 0;
let res_herbs = 0;
let res_food = 0;
let res_wood = 0;
let res_stone = 0;
let res_coal = 0;
let res_ore = 0;

// Anzeige aktualisieren
function updateDisplay() {
  if (document.getElementById("res_money_count")) document.getElementById("res_money_count").textContent = res_money;
  if (document.getElementById("res_herbs_count")) document.getElementById("res_herbs_count").textContent = res_herbs;
  if (document.getElementById("res_food_count")) document.getElementById("res_food_count").textContent = res_food;
  if (document.getElementById("res_wood_count")) document.getElementById("res_wood_count").textContent = res_wood;
  if (document.getElementById("res_stone_count")) document.getElementById("res_stone_count").textContent = res_stone;
  if (document.getElementById("res_coal_count")) document.getElementById("res_coal_count").textContent = res_coal;
  if (document.getElementById("res_ore_count")) document.getElementById("res_ore_count").textContent = res_ore;
}

// Ressourcen sammeln
document.addEventListener("DOMContentLoaded", () => {
  const safe = (id, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", fn);
  };

  safe("gather_herbs", () => {
    res_herbs++;
    updateDisplay();
  });

  safe("gather_food", () => {
    res_food++;
    updateDisplay();
  });

  safe("gather_wood", () => {
    res_wood++;
    updateDisplay();
  });

  safe("gather_stone", () => {
    res_stone++;
    const chance = Math.random();
    if (chance < 0.05) {
      res_ore += 2;
      res_coal += 1;
    } else if (chance < 0.10) {
      res_ore += 2;
    } else if (chance < 0.25) {
      res_coal += 1;
    }
    updateDisplay();
  });

  // Speicherfunktion
  safe("save_game", () => {
    const data = {
      res_money, res_herbs, res_food, res_wood,
      res_stone, res_coal, res_ore
    };
    localStorage.setItem("clickerSave", JSON.stringify(data));
    alert("Spiel gespeichert!");
  });

  // Ladefunktion
  safe("load_game", () => {
    const data = JSON.parse(localStorage.getItem("clickerSave"));
    if (data) {
      res_money = data.res_money || 0;
      res_herbs = data.res_herbs || 0;
      res_food = data.res_food || 0;
      res_wood = data.res_wood || 0;
      res_stone = data.res_stone || 0;
      res_coal = data.res_coal || 0;
      res_ore = data.res_ore || 0;
      updateDisplay();
      alert("Spielstand geladen!");
    }
  });

  // Löschen
  safe("delete_game", () => {
    localStorage.removeItem("clickerSave");
    res_money = res_herbs = res_food = res_wood = res_stone = res_coal = res_ore = 0;
    updateDisplay();
    alert("Spielstand gelöscht!");
  });

  updateDisplay();
});
