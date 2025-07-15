console.log("✅ Loaded terrainGenerator.js");

//imports
import { generateLandmass } from './landmassGenerator.js';


// === SPRITE SYSTEM ===
export const spriteImages = {};

export function loadAllSprites() {
  return Promise.all([
    loadSprite('forest', '/protoV2/src/assets/sprites/forest.png'),
    loadSprite('water', '/protoV2/src/assets/sprites/water.png'),
    loadSprite('desert', '/protoV2/src/assets/sprites/desert.png'),
    loadSprite('mountain', '/protoV2/src/assets/sprites/mountain.png')
  ]);
}

function loadSprite(biome, src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      spriteImages[biome] = img;
      console.log(`✅ Loaded sprite for ${biome}`);
      resolve();
    };
    img.onerror = () => {
      console.error(`❌ Failed to load sprite: ${src}`);
      reject();
    };
    img.src = src;
  });
}

export function getSpriteForBiome(biome) {
  return spriteImages[biome] || null;
}
  //MAPDATA
export let mapData = []; // holds global map after generation

export async function generateOverworld(width, height, options = {}) {
  console.log(`🛠 generateOverworld called with width=${width}, height=${height}`);

  const useLandmass = options.useLandmass ?? false;

  if (useLandmass) {
    console.log("🌍 Using landmass generator...");
    const map = generateLandmass(width, height, {
      targetLandPercentage: options.targetLandPercentage ?? 40,
      continentSeeds: options.continentSeeds ?? 5
    });
    mapData = map;
    return map;
  }

   console.log("🌊 Using classic weighted blob generator...");
  
  if (!width || !height) {
    console.error("❌ Invalid dimensions passed to generateOverworld");
    return [];
  }
  // Load biome JSON
  const res = await fetch('./src/assets/config/biomes.json');
  const biomeData = await res.json();
  console.log("✅ Loaded biomes.json", biomeData);

  // Start map filled with water (with sprites)
 const map = Array.from({ length: height }, () =>
  Array.from({ length: width }, () => ({ biome: 'water', sprite: getSpriteForBiome('water') }))
 );


  // Weighted distribution
  const biomeEntries = Object.entries(biomeData).filter(([k]) => !k.startsWith('_'));
  const totalWeight = biomeEntries.reduce((sum, [_, val]) => sum + val.weight, 0);

  const totalTiles = width * height;
  const biomeTargets = {};
  biomeEntries.forEach(([biome, data]) => {
    biomeTargets[biome] = Math.floor((data.weight / totalWeight) * totalTiles);
  });

  // Place terrain blobs
  biomeEntries.forEach(([biome, data]) => {
    if (biome === 'water') return;
    let tilesRemaining = biomeTargets[biome];
    while (tilesRemaining > 0) {
      const blobSize = Math.min(randInt(data.minSize, data.maxSize), tilesRemaining);
      placeBlob(map, biome, blobSize);
      tilesRemaining -= blobSize;
    }
  });

  // Carve rivers
  generateRivers(map, { count: 5, minLength: 30, maxLength: 60 });
  console.log("✅ Overworld terrain + rivers generated.");

  mapData = map; // update exported mapData reference
  return map;
}

export function getTileAt(x, y) {
  if (mapData[y] && mapData[y][x]) {
    return mapData[y][x];
  }
  return null;
}

function generateRivers(map, options) {
  const { count, minLength, maxLength } = options;
  const height = map.length;
  const width = map[0].length;
  let riversPlaced = 0;

  while (riversPlaced < count) {
    let startX = randInt(0, width - 1);
    let startY = randInt(0, height - 1);

    if (map[startY][startX].biome === 'water') continue;

    let riverLength = randInt(minLength, maxLength);
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < riverLength; i++) {
      if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) break;
      map[currentY][currentX] = { biome: 'water', sprite: getSpriteForBiome('water') };

      switch (randInt(0, 3)) {
        case 0: currentX++; break;
        case 1: currentX--; break;
        case 2: currentY++; break;
        case 3: currentY--; break;
      }
    }
    riversPlaced++;
  }
}

function placeBlob(map, biome, size) {
  const height = map.length;
  const width = map[0].length;
  let startX = randInt(0, width - 1);
  let startY = randInt(0, height - 1);

  const queue = [[startX, startY]];
  const visited = new Set();
  let count = 0;

  while (queue.length > 0 && count < size) {
    const [x, y] = queue.shift();
    const key = `${x},${y}`;
    if (
      x >= 0 && x < width && y >= 0 && y < height &&
      !visited.has(key) &&
      map[y][x].biome === 'water'
    ) {
      map[y][x] = { biome: biome, sprite: getSpriteForBiome(biome) };
      visited.add(key);
      count++;

      const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
      shuffle(neighbors);
      queue.push(...neighbors);
    }
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array) {
  for (let i = array.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
