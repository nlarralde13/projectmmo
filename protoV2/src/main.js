import { loadAllSprites, generateOverworld } from './core/terrainGenerator.js';
import { renderOverworld, moveCamera } from './ui/renderOverworld.js';
import { initializeCameraControls } from './core/cameraControls.js';
import { initStatsOverlay } from './ui/statsOverlay.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log("✅ DOM loaded, loading sprites...");
  await loadAllSprites();
  console.log("✅ Sprites loaded.");

  console.log("🚀 Generating overworld with landmass generator...");
  const map = await generateOverworld(100, 100, {
    useLandmass: true,
    targetLandPercentage: 50,
    continentSeeds: 1
  });

  console.log("✅ Overworld generated. Map data is stored in renderer.");

  const container = document.getElementById('game-container');
  if (!container) {
    console.error("❌ Could not find #game-container in DOM.");
    return;
  }

  initStatsOverlay();
  initializeCameraControls(container, map);
  renderOverworld();
  console.log("✅ Camera controls active. Use WASD, click to center, or drag to pan.");
});