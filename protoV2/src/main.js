import { loadAllSprites, generateOverworld } from './core/terrainGenerator.js';
import { renderOverworld, moveCamera } from './ui/renderOverworld.js';
import { initializeCameraControls } from './core/cameraControls.js';
import { initStatsOverlay } from './ui/statsOverlay.js';
import { serializeWorld, loadWorldFromJSON } from './core/worldLoader.js';
import { initializeTooltip } from './ui/tooltip.js';
import { getTileAt, mapData } from '../src/core/terrainGenerator.js';


//init tooltip
initializeTooltip();


document.addEventListener('DOMContentLoaded', async () => {
  console.log("✅ DOM loaded, loading sprites...");
  await loadAllSprites();
  console.log("✅ Sprites loaded.");


  //GENERATE OVERWOLRD MAP
  console.log("🚀 Generating overworld with landmass generator...");
  const map = await generateOverworld(50, 36, {
    useLandmass: true, //BOOLEAN , continent builder
    targetLandPercentage: 65,
    continentSeeds: 12
  });

  console.log("✅ Overworld generated. Map data is stored in renderer.");

  // To save current world
  const savedJSON = serializeWorld(mapData);
  console.log(JSON.stringify(savedJSON, null, 2));

  // To load a world
  fetch('/protoV2/data/world_01.json')
    .then(res => {
      if (!res.ok) throw new Error("Failed to load JSON file");
      return res.text();
    })
    .then(text => {
      if (!text) throw new Error("Empty JSON file!");
      return JSON.parse(text);
    })
    .then(json => {
      const { mapData, settlements } = loadWorldFromJSON(json);
      initializeCameraControls(container, mapData);
      renderOverworld();
    })
    .catch(err => console.error("💥 JSON load error:", err));


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