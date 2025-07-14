console.log("✅ Loaded renderOverworld.js");

export function renderOverworldMapViewport(container, map, cameraX, cameraY, viewportWidth, viewportHeight) {
  if (!container || !map) {
    console.error("❌ renderOverworldMapViewport missing container or map.");
    return;
  }

  container.innerHTML = '';

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${viewportWidth}, 16px)`;
  grid.style.gridGap = '1px';
  grid.style.border = '3px solid #888';

  for (let y = cameraY; y < cameraY + viewportHeight; y++) {
    for (let x = cameraX; x < cameraX + viewportWidth; x++) {
      const tile = (map[y] && map[y][x]) || { biome: 'water' };

      const cell = document.createElement('div');
      cell.style.width = '16px';
      cell.style.height = '16px';
      cell.style.backgroundSize = 'cover';
      cell.style.imageRendering = 'pixelated';

      let imageName = tile.settlement 
        ? tile.settlement.type 
        : tile.biome;

      if (hasTileImage(imageName)) {
        cell.style.backgroundImage = `url('./src/assets/images/tiles/${imageName}.png')`;
      } else {
        cell.style.backgroundColor = getFallbackColor(imageName);
      }

      grid.appendChild(cell);
    }
  }

  container.appendChild(grid);
}

function hasTileImage(type) {
  return [
    'forest', 'desert', 'swamp', 'tundra', 'volcanic', 'plains', 'water',
    'wagon', 'village', 'capital', 'kingdom'
  ].includes(type);
}

function getFallbackColor(type) {
  switch (type) {
    case 'forest': return '#228B22';
    case 'desert': return '#EDC9AF';
    case 'swamp': return '#556B2F';
    case 'tundra': return '#E0FFFF';
    case 'volcanic': return '#8B0000';
    case 'plains': return '#9ACD32';
    case 'water': return '#1E90FF';
    case 'wagon': return '#D2B48C';
    case 'village': return '#8B4513';
    case 'capital': return '#FF8C00';
    case 'kingdom': return '#FFD700';
    default: return '#000';
  }
}
