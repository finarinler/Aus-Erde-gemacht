
let res_money = 0;
let res_herbs = 0;
let res_food = 0;
let res_wood = 0;
let res_stone = 0;
let res_coal = 0;
let res_ore = 0;

function updateDisplay() {
  document.getElementById("res_money_count").innerText = res_money;
  document.getElementById("res_herbs_count").innerText = res_herbs;
  document.getElementById("res_food_count").innerText = res_food;
  document.getElementById("res_wood_count").innerText = res_wood;
  document.getElementById("res_stone_count").innerText = res_stone;
  document.getElementById("res_coal_count").innerText = res_coal;
  document.getElementById("res_ore_count").innerText = res_ore;
}

function saveGame() {
  const saveData = {
    res_money,
    res_herbs,
    res_food,
    res_wood,
    res_stone,
    res_coal,
    res_ore
  };
  localStorage.setItem("clickerSave", JSON.stringify(saveData));
  alert("Spielstand gespeichert!");
}

function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("clickerSave"));
  if (saveData) {
    res_money = saveData.res_money || 0;
    res_herbs = saveData.res_herbs || 0;
    res_food = saveData.res_food || 0;
    res_wood = saveData.res_wood || 0;
    res_stone = saveData.res_stone || 0;
    res_coal = saveData.res_coal || 0;
    res_ore = saveData.res_ore || 0;
    updateDisplay();
    alert("Spielstand geladen!");
  } else {
    alert("Kein Spielstand gefunden.");
  }
}

function deleteSave() {
  localStorage.removeItem("clickerSave");
  alert("Spielstand gelöscht!");
}

function initSection() {
  const herbsBtn = document.getElementById("gather_herbs");
  if (herbsBtn) {
    herbsBtn.addEventListener("click", () => {
      res_herbs += 1;
      updateDisplay();
    });
  }

  const foodBtn = document.getElementById("gather_food");
  if (foodBtn) {
    foodBtn.addEventListener("click", () => {
      res_food += 1;
      updateDisplay();
    });
  }

  const woodBtn = document.getElementById("gather_wood");
  if (woodBtn) {
    woodBtn.addEventListener("click", () => {
      res_wood += 1;
      updateDisplay();
    });
  }

  const stoneBtn = document.getElementById("gather_stone");
  if (stoneBtn) {
    stoneBtn.addEventListener("click", () => {
      res_stone += 1;
      const roll = Math.random();
      if (roll <= 0.05) {
        res_coal += 1;
        res_ore += 2;
      } else if (roll <= 0.10) {
        res_ore += 2;
      } else if (roll <= 0.35) {
        res_coal += 1;
      }
      updateDisplay();
    });
  }

  const saveBtn = document.getElementById("save_game");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveGame);
  }

  const loadBtn = document.getElementById("load_game");
  if (loadBtn) {
    loadBtn.addEventListener("click", loadGame);
  }

  const deleteBtn = document.getElementById("delete_game");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", deleteSave);
  }

  updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  initSection();
});
