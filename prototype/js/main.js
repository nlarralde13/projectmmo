import { renderOverworld } from './maps/overworld/overworld.js';
import { initUI, addLog } from './ui/ui.js';
import { initTime } from './systems/time.js';
import { generateInventory } from './items/inventory.js';

document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("back-btn");
  const charBtn = document.getElementById("char-info-btn");

  if (!backBtn || !charBtn) {
    console.error("Menu buttons not found in DOM!");
    return;
  }

  renderOverworld();
  initUI();
  initTime();
  generateInventory();

  charBtn.addEventListener("click", () => {
    addLog("Character info not implemented yet.");
  });

  backBtn.addEventListener("click", () => {
    renderOverworld();
    backBtn.style.display = "none";
    addLog("You return to the overworld.");
  });
});
