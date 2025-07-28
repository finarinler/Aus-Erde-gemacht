

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

  try {

    localStorage.setItem("clickerSave", JSON.stringify(saveData));

    alert("💾 Spielstand gespeichert!");

  } catch (e) {

    console.error("Fehler beim Speichern:", e);

    alert("❌ Speichern fehlgeschlagen.");

  }

}

;

  localStorage.setItem("clickerSave", JSON.stringify(saveData));

  alert("Spielstand gespeichert!");





function loadGame() {

  try {

    const saveData = JSON.parse(localStorage.getItem("clickerSave"));

    if (saveData && typeof saveData === "object") {

      res_money = saveData.res_money ?? 0;

      res_herbs = saveData.res_herbs ?? 0;

      res_food = saveData.res_food ?? 0;

      res_wood = saveData.res_wood ?? 0;

      res_stone = saveData.res_stone ?? 0;

      res_coal = saveData.res_coal ?? 0;

      res_ore = saveData.res_ore ?? 0;

      updateDisplay();

      alert("📂 Spielstand geladen!");

    } else {

      alert("⚠️ Kein gültiger Spielstand gefunden.");

    }

  } catch (e) {

    console.error("Fehler beim Laden:", e);

    alert("❌ Laden fehlgeschlagen.");

  }

}

else {

    alert("Kein Spielstand gefunden.");



function deleteSave() {

  localStorage.removeItem("clickerSave");

  alert("Spielstand gelöscht!");

}



function initSection() {

  // Ressourcen sammeln

  const $ = (id) => document.getElementById(id);



  $("gather_herbs")?.addEventListener("click", () => {

    res_herbs++;

    updateDisplay();

  });



  $("gather_food")?.addEventListener("click", () => {

    res_food++;

    updateDisplay();

  });



  $("gather_wood")?.addEventListener("click", () => {

    res_wood++;

    updateDisplay();

  });



  $("gather_stone")?.addEventListener("click", () => {

    res_stone++;

    let r = Math.random();

    if (r < 0.05) {

      res_coal++;

      res_ore += 2;

    } else if (r < 0.10) {

      res_ore += 2;

    } else if (r < 0.35) {

      res_coal++;

    }

    updateDisplay();

  });



  // Verkaufsfunktion

  const sell = (amount, price) => {

    if (amount > 0) {

      res_money += amount * price;

      return 0;

    }

    return amount;

  };



  $("sell_herbs")?.addEventListener("click", () => {

    res_herbs = sell(res_herbs, 1);

    updateDisplay();

  });



  $("sell_food")?.addEventListener("click", () => {

    res_food = sell(res_food, 2);

    updateDisplay();

  });



  $("sell_wood")?.addEventListener("click", () => {

    res_wood = sell(res_wood, 3);

    updateDisplay();

  });



  $("sell_stone")?.addEventListener("click", () => {

    res_stone = sell(res_stone, 4);

    updateDisplay();

  });



  $("sell_coal")?.addEventListener("click", () => {

    res_coal = sell(res_coal, 5);

    updateDisplay();

  });



  $("sell_ore")?.addEventListener("click", () => {

    res_ore = sell(res_ore, 10);

    updateDisplay();

  });



  $("sell_all")?.addEventListener("click", () => {

    res_herbs = sell(res_herbs, 1);

    res_food = sell(res_food, 2);

    res_wood = sell(res_wood, 3);

    res_stone = sell(res_stone, 4);

    res_coal = sell(res_coal, 5);

    res_ore = sell(res_ore, 10);

    updateDisplay();

  });



  // Speichern, Laden, Löschen

  $("save_game")?.addEventListener("click", saveGame);

  $("load_game")?.addEventListener("click", loadGame);

  $("delete_game")?.addEventListener("click", deleteSave);

});

  document.getElementById("gather_food")?.addEventListener("click", () => {

    res_food++;

    updateDisplay();

  });

  document.getElementById("gather_wood")?.addEventListener("click", () => {

    res_wood++;

    updateDisplay();

  });

  document.getElementById("gather_stone")?.addEventListener("click", () => {

    res_stone++;

    // Kohle und Erz Wahrscheinlichkeit

    let r = Math.random();

    if (r < 0.05) {

      res_coal++;

      res_ore += 2;

    } else if (r < 0.10) {

      res_ore += 2;

    } else if (r < 0.35) {

      res_coal++;

    }

    updateDisplay();

  });



  // Ressourcen verkaufen

  const sell = (res, price) => {

    if (res > 0) {

      res_money += res * price;

      return 0;

    }

    return res;

  };

  document.getElementById("sell_herbs")?.addEventListener("click", () => { res_herbs = sell(res_herbs, 1); updateDisplay(); });

  document.getElementById("sell_food")?.addEventListener("click", () => { res_food = sell(res_food, 2); updateDisplay(); });

  document.getElementById("sell_wood")?.addEventListener("click", () => { res_wood = sell(res_wood, 3); updateDisplay(); });

  document.getElementById("sell_stone")?.addEventListener("click", () => { res_stone = sell(res_stone, 4); updateDisplay(); });

  document.getElementById("sell_coal")?.addEventListener("click", () => { res_coal = sell(res_coal, 5); updateDisplay(); });

  document.getElementById("sell_ore")?.addEventListener("click", () => { res_ore = sell(res_ore, 10); updateDisplay(); });



  document.getElementById("sell_all")?.addEventListener("click", () => {

    res_herbs = sell(res_herbs, 1);

    res_food = sell(res_food, 2);

    res_wood = sell(res_wood, 3);

    res_stone = sell(res_stone, 4);

    res_coal = sell(res_coal, 5);

    res_ore = sell(res_ore, 10);

    updateDisplay();

  });



  // Speicherfunktionen

  document.getElementById("save_game")?.addEventListener("click", saveGame);

  document.getElementById("load_game")?.addEventListener("click", loadGame);

  document.getElementById("delete_game")?.addEventListener("click", deleteSave);

});



  const foodBtn = document.getElementById("gather_food");

  if (foodBtn) {

    foodBtn.addEventListener("click", () => {

      res_food += 1;

      updateDisplay();

    });



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



document.addEventListener("DOMContentLoaded", () => {

  initSection();

});
