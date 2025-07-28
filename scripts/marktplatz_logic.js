
const basePrices = {
  herbs: 0.5,
  food: 1.0,
  wood: 1.5,
  stone: 2.0,
  coal: 3.0,
  ore: 4.0
};

const cooldowns = {};

document.getElementById("sell_button").addEventListener("click", () => {
  let totalCoins = 0;
  let result = [];

  const now = Date.now();

  const sales = [
    ["herbs", res_herbs, "🌿"],
    ["food", res_food, "🍎"],
    ["wood", res_wood, "🪵"],
    ["stone", res_stone, "🧱"],
    ["coal", res_coal, "⚫"],
    ["ore", res_ore, "🪨"]
  ];

  for (const [res, available, emoji] of sales) {
    const input = document.getElementById(`sell_${res}`);
    const qty = parseInt(input.value) || 0;

    if (qty > 0) {
      if (qty > available) {
        result.push(`${emoji} Nicht genug ${res} (${qty} > ${available})`);
        continue;
      }

      let price = basePrices[res];
      if (qty >= 10) {
        if (!cooldowns[res] || now - cooldowns[res] > 30 * 60 * 1000) {
          cooldowns[res] = now;
          price *= 0.9; // 10% Rabatt
        }
      }

      const earned = qty * price;
      totalCoins += earned;
      result.push(`${emoji} ${qty} verkauft für ${earned.toFixed(1)} Münzen`);

      // Ressourcen abziehen
      window[`res_${res}`] -= qty;
    }
  }

  res_money += totalCoins;
  updateDisplay();
  document.getElementById("market_output").innerText = result.length ? result.join("\n") + `\n💰 Gesamt: ${totalCoins.toFixed(1)} Münzen` : "⚠️ Nichts verkauft.";
});
