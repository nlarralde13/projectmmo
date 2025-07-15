import { getSpriteForBiome } from './terrainGenerator.js';


console.log("✅ Loaded landmassGenerator.js");

/**
 * Generates a large-scale landmass map.
 * Designed for big continents, target % land, and climate band overlays.
 * 
 * @param {number} width - Width of the map in tiles
 * @param {number} height - Height of the map in tiles
 * @param {object} settings - Landmass generation settings
 * @returns {Array} 2D array representing the world map
 */
export function generateLandmass(width, height, settings) {
    console.log(`🌍 generateLandmass called with width=${width}, height=${height}`);

    // === DEFAULT SETTINGS ===
    const targetLandPercentage = settings?.targetLandPercentage ?? 40; // % of total map
    const continentSeeds = settings?.continentSeeds ?? 5; // initial large blobs

    // === INIT EMPTY MAP (all water) ===
   const map = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
        biome: 'water',
        sprite: getSpriteForBiome('water')
  }))
);

    // === STEP 1: Place continent seeds ===
    console.log(`🧭 Placing ${continentSeeds} continent seeds...`);
    for (let i = 0; i < continentSeeds; i++) {
        placeContinentSeed(map, width, height);
    }

    // === STEP 2: Grow land until target coverage ===
    const totalTiles = width * height;
    const targetLandTiles = Math.floor(totalTiles * (targetLandPercentage / 100));
    console.log(`🌎 Growing land to reach ${targetLandTiles} tiles (${targetLandPercentage}% coverage)...`);

    growLandmass(map, targetLandTiles);

    // === STEP 3: Overlay climate bands (by Y) ===
    console.log("❄️🌳🌵 Assigning biomes by latitude...");
    assignBiomesByLatitude(map);

    // Future: overlay noise / elevation / rivers
    return map;
}

/**
 * Places an initial large continent seed on the map.
 * Future: randomize size / shape for more organic starting shapes.
 */
function placeContinentSeed(map, width, height) {
    const startX = randInt(0, width - 1);
    const startY = randInt(0, height - 1);

    map[startY][startX].biome = 'land';
}

/**
 * Grows land outward from existing land tiles until reaching target count.
 */
function growLandmass(map, targetLandTiles) {
    const height = map.length;
    const width = map[0].length;

    let currentLandCount = countLandTiles(map);

    while (currentLandCount < targetLandTiles) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (map[y][x].biome === 'land' && Math.random() < 0.25) {
                    const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
                    neighbors.forEach(([nx, ny]) => {
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height && map[ny][nx].biome === 'water') {
                            map[ny][nx].biome = 'land';
                            currentLandCount++;
                            if (currentLandCount >= targetLandTiles) return;
                        }
                    });
                }
            }
        }
    }
}

/**
 * Assigns biomes to land tiles based on Y coordinate (latitude bands).
 */
function assignBiomesByLatitude(map) {
    const height = map.length;
    for (let y = 0; y < height; y++) {
        let biome;
        if (y < height * 0.2) biome = 'tundra';
        else if (y < height * 0.4) biome = 'forest';
        else if (y < height * 0.6) biome = 'desert';
        else if (y < height * 0.8) biome = 'forest';
        else biome = 'tundra';

        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x].biome === 'land') {
                map[y][x] = {
                    biome: biome,
                    sprite: getSpriteForBiome(biome)
};
;
            }
        }
    }
}

/**
 * Utility to count current land tiles.
 */
function countLandTiles(map) {
    return map.flat().reduce((sum, tile) => tile.biome === 'land' ? sum + 1 : sum, 0);
}

/**
 * Utility: random integer between min and max inclusive.
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
