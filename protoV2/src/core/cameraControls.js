import { updateStatsOverlay } from '../ui/statsOverlay.js';
import { moveCamera } from '../ui/renderOverworld.js';

console.log("✅ Loaded cameraControls.js");

export function initializeCameraControls(container, map) {
  console.log("🎥 Initializing camera controls...");

  if (!container || !map) {
    console.error("❌ Missing parameters for cameraControls.");
    return;
  }

  let cameraX = Math.floor(map[0].length / 2) - 10;
  let cameraY = Math.floor(map.length / 2) - 10;

  moveCamera(cameraX, cameraY);
  console.log(`🎥 Camera initialized at (${cameraX}, ${cameraY})`);

  document.addEventListener('keydown', (e) => {
    let moved = false;
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        cameraY = Math.max(0, cameraY - 1);
        moved = true;
        break;
      case 'ArrowDown':
      case 's':
        cameraY = Math.min(map.length - 1, cameraY + 1);
        moved = true;
        break;
      case 'ArrowLeft':
      case 'a':
        cameraX = Math.max(0, cameraX - 1);
        moved = true;
        break;
      case 'ArrowRight':
      case 'd':
        cameraX = Math.min(map[0].length - 1, cameraX + 1);
        moved = true;
        break;
    }

    if (moved) {
      console.log(`🎥 Camera moved to (${cameraX}, ${cameraY})`);
      moveCamera(cameraX, cameraY);
      updateStatsOverlay({ cameraX, cameraY, viewportWidth: null, viewportHeight: null });
    }
  });
}
