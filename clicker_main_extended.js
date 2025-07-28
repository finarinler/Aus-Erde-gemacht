
// === Ressourcen ===
let res_money = 0;
let res_herbs = 1000;
let res_food = 800;
let res_wood = 600;
let res_stone = 500;
let res_coal = 300;
let res_ore = 100;

function updateDisplay() {
  const money = document.getElementById("res_money_count");
  if (money) money.textContent = res_money.toFixed(1);
}
updateDisplay();

// === Marktplatz ===
const basePrices = {
  herbs: 0.5,
  food: 1.0,
  wood: 1.5,
  stone: 2.0,
  coal: 3.0,
  ore: 4.0
};

function getDiscount(qty) {
  if (qty >= 7501) return 0.25;
  if (qty >= 2001) return 0.5;
  if (qty >= 1001) return 0.6;
  if (qty >= 501)  return 0.7;
  if (qty >= 251)  return 0.8;
  if (qty >= 101)  return 0.9;
  return 1.0;
}

document.addEventListener("DOMContentLoaded", () => {
  const sellButton = document.getElementById("sell_button");
  const inputs = ["herbs", "food", "wood", "stone", "coal", "ore"].map(res => document.getElementById(`sell_${res}`));
  const preview = document.getElementById("market_preview");
  const output = document.getElementById("market_output");

  function calculatePreview() {
    let totalCoins = 0;
    const breakdown = [];

    for (const res of ["herbs", "food", "wood", "stone", "coal", "ore"]) {
      const qty = parseInt(document.getElementById(`sell_${res}`).value || "0");
      if (qty > 0) {
        const discount = getDiscount(qty);
        const earned = qty * basePrices[res] * discount;
        breakdown.push(`${qty} × ${res} → ${earned.toFixed(1)} 💰`);
        totalCoins += earned;
      }
    }

    if (preview) {
      preview.innerText = breakdown.length ? `Vorschau: ${breakdown.join(", ")}
Gesamt: ${totalCoins.toFixed(1)} Münzen` : "";
    }
  }

  inputs.forEach(input => input?.addEventListener("input", calculatePreview));

  if (sellButton) {
    sellButton.addEventListener("click", () => {
      let totalCoins = 0;
      let result = [];

      const sales = [
        ["herbs", res_herbs, "🌿"],
        ["food", res_food, "🍎"],
        ["wood", res_wood, "🪵"],
        ["stone", res_stone, "🧱"],
        ["coal", res_coal, "⚫"],
        ["ore", res_ore, "🪨"]
      ];

      for (const [res, _, emoji] of sales) {
        const input = document.getElementById(`sell_${res}`);
        const qty = parseInt(input?.value || "0");

        if (qty > 0) {
          if (qty > window[`res_${res}`]) {
            result.push(`${emoji} Nicht genug ${res}`);
            continue;
          }

          const discount = getDiscount(qty);
          const earned = qty * basePrices[res] * discount;
          totalCoins += earned;
          window[`res_${res}`] -= qty;
          result.push(`${emoji} ${qty} verkauft für ${earned.toFixed(1)} Münzen`);
        }
      }

      res_money += totalCoins;
      updateDisplay();
      if (output) output.innerText = result.join("\n") + `\n💰 Gesamt: ${totalCoins.toFixed(1)} Münzen`;
      if (preview) preview.innerText = "";
    });
  }
});
