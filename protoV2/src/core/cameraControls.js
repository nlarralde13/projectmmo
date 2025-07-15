import { moveCamera, renderOverworld } from '../ui/renderOverworld.js';

console.log("✅ Loaded cameraControls.js");

let mouseDragEnabled = true;

export function initializeCameraControls(container, map) {
  console.log("🎥 Initializing camera controls...");

  let cameraX = Math.floor(map[0].length / 2) - 10;
  let cameraY = Math.floor(map.length / 2) - 10;

  const viewportTilesWide = Math.ceil(1048 / 16);
  const viewportTilesHigh = Math.ceil(688 / 16);
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  moveCamera(cameraX, cameraY);

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        cameraY = Math.max(0, cameraY - 1);
        break;
      case 'ArrowDown':
      case 's':
        cameraY = Math.min(mapHeight - viewportTilesHigh, cameraY + 1);
        break;
      case 'ArrowLeft':
      case 'a':
        cameraX = Math.max(0, cameraX - 1);
        break;
      case 'ArrowRight':
      case 'd':
        cameraX = Math.min(mapWidth - viewportTilesWide, cameraX + 1);
        break;
      case 'm':
        mouseDragEnabled = !mouseDragEnabled;
        console.log(`🖱️ Mouse drag is now ${mouseDragEnabled ? 'ENABLED' : 'DISABLED'}`);
        break;
    }
    moveCamera(cameraX, cameraY);
  });

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let cameraStartX = 0;
  let cameraStartY = 0;

  const canvas = document.getElementById('overworld');

  canvas.addEventListener('mousedown', (e) => {
    if (!mouseDragEnabled) return;
    isDragging = true;
    const rect = canvas.getBoundingClientRect();
    dragStartX = e.clientX - rect.left;
    dragStartY = e.clientY - rect.top;
    cameraStartX = cameraX;
    cameraStartY = cameraY;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging || !mouseDragEnabled) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const dx = currentX - dragStartX;
    const dy = currentY - dragStartY;

    cameraX = cameraStartX - dx / 16;
    cameraY = cameraStartY - dy / 16;

    cameraX = Math.max(0, Math.min(cameraX, mapWidth - viewportTilesWide));
    cameraY = Math.max(0, Math.min(cameraY, mapHeight - viewportTilesHigh));

    moveCamera(cameraX, cameraY);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
}