// === ZOOM VIEW MODULE ===
// This renders a local cluster (3x3, 5x5, etc.) of overworld tiles into an overlay.

export function renderZoomedOverworldArea(overlay, overworld, centerX, centerY, radius = 1, backCallback) {
  /**
   * Creates a small subgrid centered on (centerX, centerY)
   * and renders it into an overlay div above the overworld map.
   */
  const zoomGrid = [];

  for (let y = centerY - radius; y <= centerY + radius; y++) {
    const row = [];
    for (let x = centerX - radius; x <= centerX + radius; x++) {
      if (y >= 0 && y < overworld.length && x >= 0 && x < overworld[0].length) {
        const tile = { ...overworld[y][x], x, y };
        row.push(tile);
      } else {
        row.push({ type: 'void', x, y });
      }
    }
    zoomGrid.push(row);
  }

  renderZoomGrid(overlay, zoomGrid, backCallback);
}


function renderZoomGrid(overlay, grid, backCallback) {
  overlay.innerHTML = "";

  // === STYLE THE OVERLAY LIKE THE REGION VIEW ===
  overlay.style.display = "block";
  overlay.style.position = "absolute";
  overlay.style.top = "50%";
  overlay.style.left = "50%";
  overlay.style.transform = "translate(-50%, -50%)";
  overlay.style.width = "640px";
  overlay.style.height = "480px";
  overlay.style.background = "rgba(0,0,0,0.85)";
  overlay.style.border = "2px solid #999";
  overlay.style.boxSizing = "border-box";
  overlay.style.padding = "10px";
  overlay.style.zIndex = "1000";

  // === BACK BUTTON ===
  const backBtn = document.createElement("button");
  backBtn.innerText = "← Back to Overworld";
  backBtn.style.marginBottom = "8px";
  backBtn.style.padding = "6px 12px";
  backBtn.style.fontSize = "14px";
  backBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    if (typeof backCallback === 'function') {
      backCallback();
    }
  });
  overlay.appendChild(backBtn);

  // === CONFIGURE GRID ===
  const gridContainer = document.createElement("div");
  gridContainer.style.display = "grid";
  gridContainer.style.width = "100%";
  gridContainer.style.height = "calc(100% - 40px)";
  gridContainer.style.gridTemplateColumns = `repeat(${grid[0].length}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${grid.length}, 1fr)`;
  gridContainer.style.border = "2px solid #333";
  gridContainer.style.boxSizing = "border-box";

  grid.forEach((row) => {
    row.forEach((tileData) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.width = "100%";
      tile.style.height = "100%";
      tile.style.boxSizing = "border-box";
      tile.style.border = "1px solid rgba(255,255,255,0.1)";

      if (tileData.type === 'void') {
        tile.style.background = '#000';
      } else if (tileData.type === 'water') {
        tile.style.background = '#3498db';
      } else {
        tile.style.background = getBiomeColor(tileData.biome);
      }

      tile.title = `(${tileData.x},${tileData.y}) - ${tileData.type}${tileData.biome ? ' / ' + tileData.biome : ''}`;
      gridContainer.appendChild(tile);
    });
  });

  overlay.appendChild(gridContainer);
}


function getBiomeColor(biome) {
  switch (biome) {
    case 'forest': return '#2ecc71';
    case 'desert': return '#f1c40f';
    case 'swamp': return '#27ae60';
    case 'arctic': return '#ecf0f1';
    case 'plains': return '#95a5a6';
    case 'jungle': return '#16a085';
    case 'mountains': return '#7f8c8d';
    case 'polar desert': return '#bdc3c7';
    case 'river': return '#2980b9';
    case 'wasteland': return '#8e7e61';
    default: return '#999';
  }
}
