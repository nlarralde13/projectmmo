import { renderOverworld } from './maps/overworld/overworld.js';
import { initUI, addLog } from './ui/ui.js';
import { initTime } from './systems/time.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Checking for back-btn:", document.getElementById("back-btn"));

  // Now that DOM is loaded, get the button once
  const backBtn = document.getElementById("back-btn");

  if (!backBtn) {
    console.error("CRITICAL: #back-btn does NOT exist in DOM!");
    return;
  }

  // Init your UI and overworld
  renderOverworld();
  initUI();
  initTime();

  // Back to Overworld functionality
  backBtn.addEventListener("click", () => {
    renderOverworld();
    backBtn.style.display = "none";
    addLog("You return to the overworld.");
  });
});
