// === TERRAIN GENERATOR ===

export function generateTerrain({
  width,
  height,
  numLandBlobs = 10,
  blobSizeRange = [5, 10]
}) {
  const grid = [];

  // INIT ENTIRE WORLD AS WATER
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push({ type: 'water' });
    }
    grid.push(row);
  }

  console.log(`Initialized ${width}x${height} world as all water.`);

  // PLACE LAND BLOBS
  for (let i = 0; i < numLandBlobs; i++) {
    const centerX = randomInt(0, width - 1);
    const centerY = randomInt(0, height - 1);
    const blobWidth = randomInt(blobSizeRange[0], blobSizeRange[1]);
    const blobHeight = randomInt(blobSizeRange[0], blobSizeRange[1]);

    for (let y = centerY - blobHeight; y <= centerY + blobHeight; y++) {
      for (let x = centerX - blobWidth; x <= centerX + blobWidth; x++) {
        if (x >= 0 && y >= 0 && x < width && y < height) {
          const dx = (x - centerX) / blobWidth;
          const dy = (y - centerY) / blobHeight;
          if (dx * dx + dy * dy <= 1) {
            grid[y][x] = { type: 'land', biome: pickBiomeForPosition(y, height) };
          }
        }
      }
    }
  }

  // FORCE POLAR CAPS AS POLAR DESERTS
  for (let y = 0; y < height; y++) {
    if (y < 3 || y >= height - 3) {
      for (let x = 0; x < width; x++) {
        grid[y][x] = { type: 'land', biome: 'polar desert' };
      }
    }
  }

  // OPTIONAL EXTRAS - UNCOMMENT AS YOU TEST
  addMountainChains(grid, width, height);
  addRivers(grid, width, height);
  addSwampsAdjacentToWater(grid, width, height);

  return grid;
}


// === BIOME HELPERS ===
function pickBiomeForPosition(y, height) {
  if (y >= 40 && y <= 60) {
    return Math.random() < 0.5 ? 'desert' : 'wasteland';
  }
  return randomLandBiome();
}

function randomLandBiome() {
  const biomes = ['forest', 'plains', 'jungle', 'mountains'];
  return biomes[Math.floor(Math.random() * biomes.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// === ADDITIONAL TERRAIN TOOLS ===

function addMountainChains(grid, width, height) {
  const numChains = 10;
  for (let i = 0; i < numChains; i++) {
    const centerX = Math.floor(Math.random() * width);
    const centerY = Math.floor(Math.random() * height);
    const chainLength = Math.floor(Math.random() * 20) + 10;
    const angle = Math.random() * 2 * Math.PI;

    for (let j = -chainLength; j <= chainLength; j++) {
      const offsetX = Math.round(j * Math.cos(angle));
      const offsetY = Math.round(j * Math.sin(angle));
      const x = centerX + offsetX;
      const y = centerY + offsetY;
      if (x >= 0 && x < width && y >= 0 && y < height && grid[y][x].type === 'land') {
        grid[y][x].biome = 'mountains';
      }
    }
  }
}

function addRivers(grid, width, height) {
  const numRivers = 5;
  for (let i = 0; i < numRivers; i++) {
    let x = Math.floor(Math.random() * width);
    let y = 0;
    let direction = Math.random() < 0.5 ? -1 : 1;

    while (y < height) {
      if (x >= 0 && x < width) {
        if (grid[y][x].type === 'land') {
          grid[y][x].biome = 'river';
        } else {
          grid[y][x].type = 'water';
        }
      }
      x += Math.floor(Math.random() * 3 - 1) + direction;
      y += 1;
    }
  }
}

function addSwampsAdjacentToWater(grid, width, height) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x].type === 'land') {
        let adjacentToWater = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (grid[ny][nx].type === 'water') {
                adjacentToWater = true;
              }
            }
          }
        }
        if (adjacentToWater && Math.random() < 0.2) {
          grid[y][x].biome = 'swamp';
        }
      }
    }
  }
}
