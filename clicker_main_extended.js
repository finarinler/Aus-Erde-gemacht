// Globale Variablen
let res_herbs = 0;
let res_food = 0;
let res_wood = 0;
let res_stone = 0;
let res_metal = 0;
let res_money = 0;

function updateDisplay() {
  document.getElementById("res_herbs_count").textContent = res_herbs;
  document.getElementById("res_food_count").textContent = res_food;
  document.getElementById("res_wood_count").textContent = res_wood;
  document.getElementById("res_stone_count").textContent = res_stone;
  document.getElementById("res_metal_count").textContent = res_metal;
  document.getElementById("res_money_count").textContent = res_money;
}

// Speicherfunktionen
function saveGame() {
  localStorage.setItem("res_herbs", res_herbs);
  localStorage.setItem("res_food", res_food);
  localStorage.setItem("res_wood", res_wood);
  localStorage.setItem("res_stone", res_stone);
  localStorage.setItem("res_metal", res_metal);
  localStorage.setItem("res_money", res_money);
  alert("Spiel gespeichert!");
}

function loadGame() {
  res_herbs = parseInt(localStorage.getItem("res_herbs")) || 0;
  res_food = parseInt(localStorage.getItem("res_food")) || 0;
  res_wood = parseInt(localStorage.getItem("res_wood")) || 0;
  res_stone = parseInt(localStorage.getItem("res_stone")) || 0;
  res_metal = parseInt(localStorage.getItem("res_metal")) || 0;
  res_money = parseInt(localStorage.getItem("res_money")) || 0;
  updateDisplay();
}

function deleteSave() {
  localStorage.clear();
  res_herbs = res_food = res_wood = res_stone = res_metal = res_money = 0;
  updateDisplay();
  alert("Spielstand gelöscht!");
}

function initSection() {
  // Ressourcen sammeln
  const actions = {
    get_herbs_manuell: () => { res_herbs++; },
    get_food_manuell: () => { res_food++; },
    get_wood_manuell: () => { res_wood++; },
    get_stone_manuell: () => { res_stone++; },
    get_metal_manuell: () => { res_metal++; },

    // Verkauf
    sell_all_herbs: () => { res_money += res_herbs * 1; res_herbs = 0; },
    sell_all_food: () => { res_money += res_food * 2; res_food = 0; },
    sell_all_wood: () => { res_money += res_wood * 3; res_wood = 0; },
    sell_all_stone: () => { res_money += res_stone * 5; res_stone = 0; },
    sell_all_metal: () => { res_money += res_metal * 8; res_metal = 0; },

    // Itemshop kaufen
    get_sitchel: () => { res_money -= 25; },
    get_hoe: () => { res_money -= 50; },
    get_axe: () => { res_money -= 100; },
    get_pickaxe: () => { res_money -= 250; },
    get_magnet: () => { res_money -= 500; },

    // Felder kaufen
    get_field1: () => { res_money -= 300; },
    get_field2: () => { res_money -= 500; },
    get_field3: () => { res_money -= 800; },
    get_field4: () => { res_money -= 1000; },

    // Gebäude kaufen (vereinfachte Logik)
    get_civ_tent: () => { res_money -= 200; },
    get_civ_wood_small: () => { res_wood -= 250; },
    get_civ_wood_large: () => { res_wood -= 2500; },
    get_civ_stone_small: () => { res_wood -= 150; res_stone -= 500; },
    get_civ_stone_large: () => { res_wood -= 300; res_stone -= 5000; },
    get_civ_city_small: () => { res_wood -= 2500; res_stone -= 5000; res_metal -= 400; },
    get_civ_city_large: () => { res_wood -= 5000; res_stone -= 10000; res_metal -= 800; }
  };

  Object.keys(actions).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", () => {
        actions[id]();
        updateDisplay();
      });
    }
  });

  // Speichersteuerung
  const btnSave = document.getElementById("savegame");
  if (btnSave) btnSave.addEventListener("click", saveGame);

  const btnLoad = document.getElementById("loadgame");
  if (btnLoad) btnLoad.addEventListener("click", loadGame);

  const btnDelete = document.getElementById("deletesave");
  if (btnDelete) btnDelete.addEventListener("click", deleteSave);
}

// Beim Laden der Seite automatisch Spielstand laden
document.addEventListener("DOMContentLoaded", () => {
  loadGame();
});
