import { renderOverworld } from './maps/overworld/overworld.js';
import { initUI, addLog } from './ui/ui.js';
import { initTime } from './systems/time.js';
import { generateInventory } from './items/inventory.js';
import { startCharacterCreation, renderCharacterPanel, renderCharacterInfoScreen } from './player/characterCreation.js';
import { renderInventoryGrid } from './items/inventoryUI.js';
import { renderCalendar } from './ui/calendar.js';

document.addEventListener("DOMContentLoaded", () => {
  const charPanel = document.getElementById("character-panel");
  const commandInput = document.getElementById("command-input");
  const viewPort = document.getElementById("view-port");

  // Top bar buttons
  const calendarBtn = document.getElementById("calendar-btn");
  const charInfoBtn = document.getElementById("char-info-btn");
  const mapBtn = document.getElementById("map-btn");
  const inventoryBtn = document.getElementById("inventory-btn");
  const resetWorldBtn = document.getElementById("reset-world-btn");

  // Init systems
  renderOverworld(viewPort);
  initUI();
  initTime();
  generateInventory();
  startCharacterCreation(commandInput, charPanel);

  // Menu controls
  calendarBtn.addEventListener("click", () => renderCalendar(viewPort));
  charInfoBtn.addEventListener("click", () => renderCharacterInfoScreen(viewPort));
  mapBtn.addEventListener("click", () => renderOverworld(viewPort));
  inventoryBtn.addEventListener("click", () => renderInventoryGrid(viewPort));

  // Reset overworld
  resetWorldBtn.addEventListener("click", () => {
  console.log("RESETTING WORLD - forcing fresh generation.");
  localStorage.removeItem("overworld");
  addLog("World has been reset.");
  renderOverworld(viewPort); // will rebuild with defaults (100x100, 8)
});

});
