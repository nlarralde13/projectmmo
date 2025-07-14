// 🚀 Top-level module load confirmation
console.log("✅ Loaded main.js");

//loads terrain generator 
import { generateOverworld } from './core/terrainGenerator.js';
console.log("✅ terrainGenerator imported successfully.");

//render overworld viewport
import { renderOverworldMapViewport } from './ui/renderOverworld.js';
console.log("✅ renderOverworld imported successfully.");

//init camera controls
import { initializeCameraControls } from './core/cameraControls.js';
console.log("Initialized camera controls. ");


//generates new overworld terrain
(async () => {
  console.log("🚀 Calling generateOverworld for a 10x10 test map...");
  const map = await generateOverworld(100, 100);

  if (!map || !map.length) {
    console.error("❌ Failed to generate map or returned empty.");
    return;
  }
  console.log("✅ Map generated:", map);

  // Find the container in the HTML
  const container = document.getElementById('game-container');
  if (!container) {
    console.error("❌ Could not find #game-container in DOM.");
    return;
  }
  console.log("✅ Located #game-container.");

 // Initialize the camera system (handles keyboard + viewport rendering)
  initializeCameraControls(container, map, renderOverworldMapViewport);
  console.log("✅ Camera controls active. Use WASD or arrow keys to navigate.");
})();