// Globale Ressourcenvariablen
let res_money = 0;
let res_herbs = 0;
let res_food = 0;
let res_wood = 0;
let res_stone = 0;
let res_metal = 0;

// Aktualisiert die Anzeige im Header
function updateDisplay() {
  document.getElementById("res_money_count").textContent = res_money;
  document.getElementById("res_herbs_count").textContent = res_herbs;
  document.getElementById("res_food_count").textContent = res_food;
      document.getElementById("res_ore_count").textContent = res_metal;
}

// Speicherfunktionen
function saveGame() {
  const state = {
    res_money, res_herbs, res_food, res_wood,
    res_stone, res_metal
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
    updateDisplay();
    alert("Spielstand geladen!");
  }
}

function deleteSave() {
  localStorage.removeItem("clickerSave");
  alert("Spielstand gelöscht!");
}

// Wird nach jedem fetch() aufgerufen
);

  $("#gather_food").off().on("click", () => {
    res_food += 1;
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



document.getElementById("gather_stone")?.addEventListener("click", () => {
  const stoneDisplay = document.getElementById("res_stone_count");
  const coalDisplay = document.getElementById("res_coal_count");
  const metalDisplay = document.getElementById("res_ore_count");

  if (stoneDisplay) {
    let current = parseInt(stoneDisplay.textContent || "0", 10);
    stoneDisplay.textContent = current + 1;
  }

  // Wahrscheinlichkeitseffekte:
  const roll = Math.random();
  if (roll <= 0.05) {
    // 5% -> 1 Kohle & 2 Erz
    if (coalDisplay) {
      let coal = parseInt(coalDisplay.textContent || "0", 10);
      coalDisplay.textContent = coal + 1;
    }
    if (metalDisplay) {
      let metal = parseInt(metalDisplay.textContent || "0", 10);
      metalDisplay.textContent = metal + 2;
    }
  } else if (roll <= 0.15) {
    // 10% -> 2 Erz
    if (metalDisplay) {
      let metal = parseInt(metalDisplay.textContent || "0", 10);
      metalDisplay.textContent = metal + 2;
    }
  } else if (roll <= 0.30) {
    // 15% -> 1 Kohle
    if (coalDisplay) {
      let coal = parseInt(coalDisplay.textContent || "0", 10);
      coalDisplay.textContent = coal + 1;
    }
  }
});

function initSection() {
  const woodBtn = document.getElementById("gather_wood");
  if (woodBtn) {
    woodBtn.addEventListener("click", () => {
      const woodDisplay = document.getElementById("res_wood_count");
      if (woodDisplay) {
        let current = parseInt(woodDisplay.textContent || "0", 10);
        woodDisplay.textContent = current + 1;
      }
    });
  }

  const stoneBtn = document.getElementById("gather_stone");
  if (stoneBtn) {
    stoneBtn.addEventListener("click", () => {
      const stoneDisplay = document.getElementById("res_stone_count");
      const coalDisplay = document.getElementById("res_coal_count");
      const oreDisplay = document.getElementById("res_ore_count");

      if (stoneDisplay) {
        let current = parseInt(stoneDisplay.textContent || "0", 10);
        stoneDisplay.textContent = current + 1;
      }

      const roll = Math.random();
      if (roll <= 0.05) {
        if (coalDisplay) coalDisplay.textContent = parseInt(coalDisplay.textContent || "0", 10) + 1;
        if (oreDisplay) oreDisplay.textContent = parseInt(oreDisplay.textContent || "0", 10) + 2;
      } else if (roll <= 0.15) {
        if (oreDisplay) oreDisplay.textContent = parseInt(oreDisplay.textContent || "0", 10) + 2;
      } else if (roll <= 0.30) {
        if (coalDisplay) coalDisplay.textContent = parseInt(coalDisplay.textContent || "0", 10) + 1;
      }
    });
  }
}
