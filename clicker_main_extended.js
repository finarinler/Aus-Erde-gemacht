
// === Ressourcen ===
let res_money = 0;
let res_herbs = 0;
let res_food = 0;
let res_wood = 0;
let res_stone = 0;
let res_coal = 0;
let res_ore = 0;

function updateDisplay() {
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  set("res_money_count", res_money);
  set("res_herbs_count", res_herbs);
  set("res_food_count", res_food);
  set("res_wood_count", res_wood);
  set("res_stone_count", res_stone);
  set("res_coal_count", res_coal);
  set("res_metal_count", res_ore);
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  // === GATHER ===
  const gather = (id, action) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", action);
  };

  gather("gather_herbs", () => { res_herbs++; updateDisplay(); });
  gather("gather_food", () => { res_food++; updateDisplay(); });
  gather("gather_wood", () => { res_wood++; updateDisplay(); });
  gather("gather_stone", () => {
    res_stone++;
    const roll = Math.random();
    if (roll <= 0.05) { res_coal++; res_ore += 2; }
    else if (roll <= 0.10) { res_ore += 2; }
    else if (roll <= 0.25) { res_coal++; }
    updateDisplay();
  });

  // === Speicherfunktion (Overview only) ===
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

  // === MARKTPLATZ ===
  const priceMap = {
    herbs: 0.5,
    food: 1,
    wood: 1.5,
    stone: 2,
    coal: 3,
    ore: 4,
  };

  function calculateDiscountedPrice(qty, basePrice) {
    let discount = 0;
    if (qty >= 7501) discount = 0.75;
    else if (qty >= 2001) discount = 0.5;
    else if (qty >= 1001) discount = 0.4;
    else if (qty >= 501) discount = 0.3;
    else if (qty >= 251) discount = 0.2;
    else if (qty >= 101) discount = 0.1;
    return basePrice * qty * (1 - discount);
  }

  const preview = document.getElementById("market_preview");
  const sellBtn = document.getElementById("sell_button");
  if (sellBtn && preview) {
    const inputs = {
      herbs: document.getElementById("sell_herbs"),
      food: document.getElementById("sell_food"),
      wood: document.getElementById("sell_wood"),
      stone: document.getElementById("sell_stone"),
      coal: document.getElementById("sell_coal"),
      ore: document.getElementById("sell_ore"),
    };

    function updateMarketPreview() {
      let total = 0;
      let text = "Verkaufswert:";}
      for (let res in inputs) {
        let qty = parseInt(inputs[res].value) || 0;
        let price = calculateDiscountedPrice(qty, priceMap[res]);
        if (qty > 0) {
          text += `• ${qty} ${res} ➜ ${price.toFixed(2)} Münzen`;
        }
        total += price;
      }
      text += `
💰 Gesamt: ${total.toFixed(2)} Münzen`;
      preview.textContent = text;
    }

    Object.values(inputs).forEach(input =>
      input.addEventListener("input", updateMarketPreview)
    );

    sellBtn.addEventListener("click", () => {
      let earned = 0;
      for (let res in inputs) {
        let qty = parseInt(inputs[res].value) || 0;
        if (qty > 0 && window["res_" + res] >= qty) {
          let price = calculateDiscountedPrice(qty, priceMap[res]);
          earned += price;
          window["res_" + res] -= qty;
          inputs[res].value = 0;
        }
      }
      res_money += earned;
      updateDisplay();
      updateMarketPreview();
      document.getElementById("market_output").textContent = `✅ Du hast ${earned.toFixed(2)} Münzen erhalten.`;
    });

    updateMarketPreview();
  }
});
