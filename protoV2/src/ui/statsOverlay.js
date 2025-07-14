console.log("✅ Loaded statsOverlay.js");

// Create a HUD box and attach it to the DOM
export function initStatsOverlay() {
  const hud = document.createElement('div');
  hud.id = 'stats-overlay';
  hud.style.position = 'fixed';
  hud.style.top = '10px';
  hud.style.left = '10px';
  hud.style.padding = '8px 12px';
  hud.style.background = 'rgba(0, 0, 0, 0.75)';
  hud.style.color = '#0f0';
  hud.style.fontFamily = 'monospace';
  hud.style.fontSize = '12px';
  hud.style.border = '1px solid #333';
  hud.style.zIndex = '1000';
  hud.style.pointerEvents = 'none';
  document.body.appendChild(hud);
}

// Update the HUD with current data
export function updateStatsOverlay({ cameraX, cameraY, viewportWidth, viewportHeight }) {
  const hud = document.getElementById('stats-overlay');
  if (!hud) return;

  hud.innerText = [
    `camera: (${cameraX}, ${cameraY})`,
    `viewport: ${viewportWidth} x ${viewportHeight}`,
    `tiles: ${viewportWidth * viewportHeight}`
  ].join('\n');
}
