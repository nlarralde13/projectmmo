import { loadAllSprites, generateOverworld } from './core/terrainGenerator.js';
import { renderOverworld, moveCamera } from './ui/renderOverworld.js';
import { initializeCameraControls } from './core/cameraControls.js';
import { initStatsOverlay } from './ui/statsOverlay.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log("✅ DOM loaded, now loading sprites...");
  await loadAllSprites();
  console.log("✅ All sprites loaded.");

  console.log("🚀 Calling generateOverworld for a 500x500 map...");
  const map = await generateOverworld(500, 500);

  if (!map || !map.length) {
    console.error("❌ Failed to generate map or returned empty.");
    return;
  }

  const container = document.getElementById('game-container');
  if (!container) {
    console.error("❌ Could not find #game-container in DOM.");
    return;
  }

  initStatsOverlay();
  initializeCameraControls(container, map);
  renderOverworld();
  console.log("✅ Game world initialized.");
});
