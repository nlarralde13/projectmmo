import { updateStatsOverlay } from '../ui/statsOverlay.js';

console.log("✅ Loaded cameraControls.js");



export function initializeCameraControls(container, map, renderer) {
  console.log("🎥 Initializing camera controls...");

  if (!container || !map || !renderer) {
    console.error("❌ Missing parameters for cameraControls.");
    return;
  }

  let cameraX = Math.floor(map[0].length / 2) - 10;
  let cameraY = Math.floor(map.length / 2) - 10;
  const viewportWidth = 20;
  const viewportHeight = 20;

  renderer(container, map, cameraX, cameraY, viewportWidth, viewportHeight);
  console.log(`🎥 Camera initialized at (${cameraX}, ${cameraY})`);

  document.addEventListener('keydown', (e) => {
    let moved = false;
    switch (e.key) {
      case 'ArrowUp':
      case 'w': cameraY = Math.max(0, cameraY - 1); moved = true; break;
      case 'ArrowDown':
      case 's': cameraY = Math.min(map.length - viewportHeight, cameraY + 1); moved = true; break;
      case 'ArrowLeft':
      case 'a': cameraX = Math.max(0, cameraX - 1); moved = true; break;
      case 'ArrowRight':
      case 'd': cameraX = Math.min(map[0].length - viewportWidth, cameraX + 1); moved = true; break;
    }
    if (moved) {
      console.log(`🎥 Camera moved to (${cameraX}, ${cameraY})`);
      renderer(container, map, cameraX, cameraY, viewportWidth, viewportHeight);
      updateStatsOverlay({cameraX, cameraY, viewportWidth, viewportHeight});

    }
  });
}


