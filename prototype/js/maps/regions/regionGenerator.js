// === REGION GENERATOR MODULE ===
// This creates and renders detailed region maps for each overworld tile.

export function generateRegion(tile) {
  /**
   * Generates a small local region map (like a zoomed-in chunk)
   * based on the biome of the overworld tile. 
   * The result is stored directly in tile.regionMap for easy persistence.
   */
  const size = 20; // 20x20 mini map
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
   * Creates a basic terrain type based on the region's parent biome.
   * Later we can expand this to include rivers, clearings, ruins, etc.
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

export function renderRegion(viewPort, tile) {
  /**
   * Given a tile (with x,y,biome), loads or generates its local region,
   * then renders it into the same viewPort.
   */
  let regionMap = tile.regionMap;
  if (!regionMap) {
    console.log(`Generating new region for overworld tile (${tile.x},${tile.y})`);
    regionMap = generateRegion(tile);
  }

  console.log(`Rendering region: ${regionMap[0].length} cols x ${regionMap.length} rows for biome ${tile.biome}`);

  // === CONFIGURE VIEWPORT FOR REGION ===
  viewPort.innerHTML = "";
  viewPort.style.display = "grid";
  viewPort.style.width = "720px";   // region is always square here
  viewPort.style.height = "720px";
  viewPort.style.gridTemplateColumns = `repeat(${regionMap[0].length}, 1fr)`;
  viewPort.style.gridTemplateRows = `repeat(${regionMap.length}, 1fr)`;
  viewPort.style.border = "2px solid #333";
  viewPort.style.gap = "0";
  viewPort.style.padding = "0";
  viewPort.style.margin = "0";
  viewPort.style.boxSizing = "border-box";

  // === RENDER REGION CELLS ===
  regionMap.forEach((row, y) => {
    row.forEach((cell, x) => {
      const tile = document.createElement("div");
      tile.style.width = "100%";
      tile.style.height = "100%";
      tile.style.boxSizing = "border-box";
      tile.style.border = "1px solid rgba(0,0,0,0.1)";
      tile.style.background = getRegionColor(cell.terrain);

      // Simple tooltip on hover
      tile.title = `(${x},${y}) - ${cell.terrain}`;

      viewPort.appendChild(tile);
    });
  });

  // === PLACEHOLDER FUTURE HOOKS ===
  // spawnLocalCreatures(regionMap);
  // placeLocalLoot(regionMap);
  // generateStructures(regionMap);
}

function getRegionColor(terrain) {
  /**
   * Simple color palette for terrain types.
   * This lets you visually distinguish different features.
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
