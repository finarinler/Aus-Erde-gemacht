/* =========================================================================
   Aus-Erde-gemacht – main logic (clean build)
   - Sammeln (herbs, food, wood, stone + coal/ore drops)
   - Anzeigen aktualisieren
   - Speichern / Laden / Löschen (localStorage)
   - Marktplatz (Vorschau + Verkauf mit Rabatten)
   ====================================================================== */

console.log("Script loaded: clicker_main_extended.js");

// --------------------------- Utilities ---------------------------------
const $ = (id) => document.getElementById(id);
const hasEl = (id) => !!$(id);

// Sanfte Toast-Nachricht
function showMessage(message, bg = "#2b3e5e") {
  const msg = document.createElement("div");
  msg.textContent = message;
  Object.assign(msg.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%) translateY(10px)",
    background: bg,
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(0,0,0,.25)",
    zIndex: 9999,
    opacity: "0",
    transition: "opacity .3s ease, transform .3s ease",
    pointerEvents: "none",
  });
  document.body.appendChild(msg);
  requestAnimationFrame(() => {
    msg.style.opacity = "1";
    msg.style.transform = "translateX(-50%) translateY(-4px)";
  });
  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.transform = "translateX(-50%) translateY(8px)";
    setTimeout(() => msg.remove(), 300);
  }, 2200);
}

// --------------------------- Game State --------------------------------
const state = {
  coins: 0,
  herbs: 0,
  food: 0,
  wood: 0,
  stone: 0,
  coal: 0,
  ore: 0, // nur via Stone-Drops
};

const BASE_PRICES = {
  herbs: 0.5,
  food: 1,
  wood: 1.5,
  stone: 2,
  coal: 3,
  ore: 4,
};

// ----------------------- Rendering / Anzeige ----------------------------
function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = String(value);
}

function updateDisplay() {
  setText("res_money_count", state.coins.toFixed(2));
  setText("res_herbs_count", state.herbs);
  setText("res_food_count", state.food);
  setText("res_wood_count", state.wood);
  setText("res_stone_count", state.stone);
  setText("res_coal_count", state.coal);
  setText("res_ore_count", state.ore);
  updateSalePreview();
}

// ----------------------------- Sammeln ---------------------------------
function gather(resource) {
  switch (resource) {
    case "herbs":
      state.herbs += 1;
      showMessage("🌿 +1 Kräuter");
      break;
    case "food":
      state.food += 1;
      showMessage("🍗 +1 Nahrung");
      break;
    case "wood":
      state.wood += 1;
      showMessage("🪵 +1 Holz");
      break;
    case "stone":
      state.stone += 1;
      const roll = Math.random();
      let dropMsg = "🧱 +1 Stein";
      if (roll < 0.05) {
        state.coal += 1;
        state.ore += 2;
        dropMsg += " • ⚫ +1 Kohle • 🧱🪨 +2 Erz";
      } else {
        if (Math.random() < 0.05) {
          state.ore += 2;
          dropMsg += " • 🧱🪨 +2 Erz";
        }
        if (Math.random() < 0.25) {
          state.coal += 1;
          dropMsg += " • ⚫ +1 Kohle";
        }
      }
      showMessage(dropMsg);
      break;
    default:
      return;
  }
  updateDisplay();
}

// ----------------------- Speicher / Laden / Löschen ---------------------
const SAVE_KEY = "aeg_save_v1";

function saveGame() {
  try {
    const payload = { ...state, ts: Date.now() };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    showMessage("💾 Spiel gespeichert!", "#2e7d32");
  } catch (e) {
    console.error("Save failed:", e);
    showMessage("❌ Speichern fehlgeschlagen!", "#b71c1c");
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      showMessage("ℹ️ Kein Spielstand gefunden.", "#455a64");
      return;
    }
    const data = JSON.parse(raw);
    for (const k of Object.keys(state)) {
      if (typeof data[k] === "number" && Number.isFinite(data[k])) {
        state[k] = data[k];
      }
    }
    updateDisplay();
    showMessage("📂 Spiel geladen!", "#1565c0");
  } catch (e) {
    console.error("Load failed:", e);
    showMessage("❌ Laden fehlgeschlagen!", "#b71c1c");
  }
}

function deleteGame() {
  try {
    localStorage.removeItem(SAVE_KEY);
    for (const k of Object.keys(state)) state[k] = 0;
    updateDisplay();
    showMessage("🗑️ Spielstand gelöscht!", "#b71c1c");
  } catch (e) {
    console.error("Delete failed:", e);
    showMessage("❌ Löschen fehlgeschlagen!", "#b71c1c");
  }
}

// ---------------------------- Marktplatz --------------------------------
const SELL_FIELDS = ["herbs","food","wood","stone","coal","ore"];

function readSellQuantities() {
  const q = {};
  let total = 0;
  for (const r of SELL_FIELDS) {
    const el = $(`sell_${r}`);
    const v = el ? Math.max(0, Math.floor(Number(el.value) || 0)) : 0;
    q[r] = v;
    total += v;
  }
  return { q, total };
}

function calcDiscount(totalQty) {
  if (totalQty >= 5001) return 0.75;
  if (totalQty >= 2501) return 0.50;
  if (totalQty >= 1001) return 0.40;
  if (totalQty >= 501)  return 0.30;
  if (totalQty >= 251)  return 0.20;
  if (totalQty >= 101)  return 0.10;
  return 0;
}

function calcSaleValue(q) {
  let base = 0;
  for (const r of SELL_FIELDS) {
    const qty = q[r] || 0;
    const price = BASE_PRICES[r] ?? 0;
    base += qty * price;
  }
  const totalQty = SELL_FIELDS.reduce((s, r) => s + (q[r] || 0), 0);
  const disc = calcDiscount(totalQty);
  const finalValue = base * (1 - disc);
  return { base, disc, totalQty, finalValue };
}

function updateSalePreview() {
  const pv = $("sale_preview");
  if (!pv) return;
  const { q } = readSellQuantities();
  const { base, disc, totalQty, finalValue } = calcSaleValue(q);
  const discPct = Math.round(disc * 100);
  pv.textContent = totalQty > 0
    ? `Menge: ${totalQty} • Basis: ${base.toFixed(2)} • Rabatt: ${discPct}% • ➜ Ertrag: ${finalValue.toFixed(2)} Münzen`
    : "Bitte Menge eingeben.";
}

function sellResources() {
  const { q } = readSellQuantities();
  for (const r of SELL_FIELDS) {
    if ((q[r] || 0) > state[r]) {
      showMessage(`❌ Zu viel ${r} ausgewählt!`, "#b71c1c");
      return;
    }
  }
  const { finalValue, totalQty } = calcSaleValue(q);
  if (totalQty <= 0) {
    showMessage("ℹ️ Keine Menge zum Verkaufen.", "#455a64");
    return;
  }
  for (const r of SELL_FIELDS) {
    state[r] -= q[r] || 0;
  }
  state.coins += finalValue;
  updateDisplay();
  showMessage(`✅ Verkauf erfolgreich: +${finalValue.toFixed(2)} Münzen`, "#2e7d32");
  for (const r of SELL_FIELDS) {
    const el = $(`sell_${r}`);
    if (el) el.value = "";
  }
}

// --------------------------- Event-Bindings -----------------------------
function bindIfExists(id, type, handler) {
  const el = $(id);
  if (!el) return false;
  el.addEventListener(type, handler);
  return true;
}

function bindGatherButtons() {
  bindIfExists("gather_herbs", "click", () => gather("herbs"));
  bindIfExists("gather_food",  "click", () => gather("food"));
  bindIfExists("gather_wood",  "click", () => gather("wood"));
  bindIfExists("gather_stone", "click", () => gather("stone"));
}

function bindSaveButtons() {
  bindIfExists("save_game",   "click", saveGame);
  bindIfExists("load_game",   "click", loadGame);
  bindIfExists("delete_game", "click", deleteGame);
}

function bindMarket() {
  SELL_FIELDS.forEach(r => {
    const el = $(`sell_${r}`);
    if (el) el.addEventListener("input", updateSalePreview);
  });
  bindIfExists("sell_confirm", "click", sellResources);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded + init bindings");
  bindGatherButtons();
  bindSaveButtons();
  bindMarket();
  updateDisplay();
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        bindGatherButtons();
        bindSaveButtons();
        bindMarket();
        updateDisplay();
      }, 50);
    });
  });
});
