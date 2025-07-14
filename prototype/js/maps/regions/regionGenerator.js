// === REGION GENERATOR MODULE ===
// This generates and renders detailed local region maps in an overlay
// that floats above your main overworld map.

export function generateRegion(tile) {
  /**
   * Creates a 20x20 region map based on the biome of the overworld tile.
   * The generated map is stored in tile.regionMap for persistence.
   */
  const size = 20;
  const regionMap = [];

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      row.push(generateLocalTerrain(tile.biome));
    }
    regionMap.push(row);
  }

  tile.regionMap = regionMap;
  return regionMap;
}


function generateLocalTerrain(biome) {
  /**
   * Creates terrain type based on parent biome.
   * Can expand later for rivers, ruins, local resources.
   */
  switch (biome) {
    case 'forest':
      return Math.random() < 0.7 ? { terrain: 'trees' } : { terrain: 'grass' };
    case 'desert':
    case 'wasteland':
      return Math.random() < 0.8 ? { terrain: 'sand' } : { terrain: 'rock' };
    case 'mountains':
      return Math.random() < 0.6 ? { terrain: 'rock' } : { terrain: 'gravel' };
    case 'swamp':
      return Math.random() < 0.7 ? { terrain: 'mud' } : { terrain: 'water' };
    default:
      return { terrain: 'grass' };
  }
}


export function renderRegion(overlay, tile) {
  /**
   * Renders the detailed local region inside a 640x480 overlay div
   * without removing the underlying overworld. 
   */
  let regionMap = tile.regionMap;
  if (!regionMap) {
    console.log(`Generating new region for overworld tile (${tile.x},${tile.y})`);
    regionMap = generateRegion(tile);
  }

  console.log(`Rendering region: ${regionMap[0].length} cols x ${regionMap.length} rows for biome ${tile.biome}`);

  // === PREPARE OVERLAY CONTAINER ===
  overlay.innerHTML = "";
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

  // === ADD CLOSE BUTTON ===
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "← Back to Overworld";
  closeBtn.style.marginBottom = "8px";
  closeBtn.style.padding = "6px 12px";
  closeBtn.style.fontSize = "14px";
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
  overlay.appendChild(closeBtn);

  // === CONFIGURE REGION GRID ===
  const gridContainer = document.createElement("div");
  gridContainer.style.display = "grid";
  gridContainer.style.width = "100%";
  gridContainer.style.height = "calc(100% - 40px)"; // adjust for button
  gridContainer.style.gridTemplateColumns = `repeat(${regionMap[0].length}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${regionMap.length}, 1fr)`;
  gridContainer.style.border = "2px solid #333";
  gridContainer.style.boxSizing = "border-box";

  // === RENDER REGION CELLS ===
  regionMap.forEach((row, y) => {
    row.forEach((cell, x) => {
      const tile = document.createElement("div");
      tile.style.width = "100%";
      tile.style.height = "100%";
      tile.style.boxSizing = "border-box";
      tile.style.border = "1px solid rgba(255,255,255,0.1)";
      tile.style.background = getRegionColor(cell.terrain);
      tile.title = `(${x},${y}) - ${cell.terrain}`;

      // === FUTURE EXPANSION HOOKS ===
      // attachHoverOverlay(tile, cell);
      // enableResourceClicks(tile, cell);
      // spawnLocalCreatures(tile, cell);

      gridContainer.appendChild(tile);
    });
  });

  overlay.appendChild(gridContainer);
}


function getRegionColor(terrain) {
  /**
   * Simple color palette for terrain types.
   */
  switch (terrain) {
    case 'trees': return '#2ecc71';
    case 'grass': return '#27ae60';
    case 'sand': return '#f1c40f';
    case 'rock': return '#7f8c8d';
    case 'gravel': return '#95a5a6';
    case 'mud': return '#8e5d3b';
    case 'water': return '#3498db';
    default: return '#999';
  }
}
