import { player } from '../player/player.js';

export function renderInventoryGrid(viewPort) {
  if (!viewPort) {
    console.error("CRITICAL: #view-port not found in DOM.");
    return;
  }

  console.log("Rendering inventory in view-port:", player.inventory);

  viewPort.innerHTML = ""; // clear previous content
  viewPort.className = "inventory-grid"; // applies CSS grid

  player.inventory.forEach(item => {
    const itemBox = document.createElement("div");
    itemBox.className = "inventory-item";
    itemBox.textContent = item; // placeholder for future images
    viewPort.appendChild(itemBox);
  });
}
