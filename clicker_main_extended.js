
// Globale Ressourcenvariablen
let res_money = 0;
let res_herbs = 0;
let res_food = 0;
let res_wood = 0;
let res_stone = 0;
let res_metal = 0;
let click_total = 0;

// Aktualisiert die Anzeige im Header
function updateDisplay() {
  document.getElementById("res_money_count").textContent = res_money;
  document.getElementById("res_herbs_count").textContent = res_herbs;
  document.getElementById("res_food_count").textContent = res_food;
  document.getElementById("res_wood_count").textContent = res_wood;
  document.getElementById("res_stone_count").textContent = res_stone;
  document.getElementById("res_metal_count").textContent = res_metal;
}

// Speicherfunktionen
function saveGame() {
  const state = {
    res_money, res_herbs, res_food, res_wood,
    res_stone, res_metal, click_total
  };
  localStorage.setItem("clickerSave", JSON.stringify(state));
  alert("Spielstand gespeichert!");
}

function loadGame() {
  const state = JSON.parse(localStorage.getItem("clickerSave"));
  if (state) {
    res_money = state.res_money;
    res_herbs = state.res_herbs;
    res_food = state.res_food;
    res_wood = state.res_wood;
    res_stone = state.res_stone;
    res_metal = state.res_metal;
    click_total = state.click_total;
    updateDisplay();
    alert("Spielstand geladen!");
  }
}

function deleteSave() {
  localStorage.removeItem("clickerSave");
  alert("Spielstand gelöscht!");
}

// Wird nach jedem fetch() aufgerufen
function initSection() {
  console.log("initSection aufgerufen");

  // Übersicht
  $("#savegame").off().on("click", saveGame);
  $("#loadgame").off().on("click", loadGame);
  $("#deletesave").off().on("click", deleteSave);

  // Sammeln
  $("#gather_herbs").off().on("click", () => {
    res_herbs += 1;
    click_total += 1;
    updateDisplay();
  });

  $("#gather_food").off().on("click", () => {
    res_food += 1;
    click_total += 1;
    updateDisplay();
  });

  // Verkauf
  $("#sell_all").off().on("click", () => {
    const total =
      res_herbs * 0.5 +
      res_food * 1 +
      res_wood * 1.5 +
      res_stone * 2 +
      res_metal * 3;
    res_money += total;
    res_herbs = res_food = res_wood = res_stone = res_metal = 0;
    updateDisplay();
  });
}

// Spielstand beim Laden wiederherstellen
window.addEventListener("DOMContentLoaded", () => {
  loadGame();
  updateDisplay();
});



document.getElementById("gather_wood")?.addEventListener("click", () => {
  const display = document.getElementById("res_wood_count");
  if (display) {
    let current = parseInt(display.textContent || "0", 10);
    display.textContent = current + 1;
  }
});
