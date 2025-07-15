import seedrandom from 'seedrandom';
import { generatePerlinNoise } from 'perlin-noise';

// Generate height map with seeded noise
export function generateHeightMap(width, height, seed) {
    const rng = seedrandom(seed);

    // perlin-noise expects array of arrays of random values
    // We'll feed it consistent randoms from our seeded RNG
    const seedArray = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            row.push(rng());
        }
        seedArray.push(row);
    }

    const heightMap = generatePerlinNoise(seedArray, { octaveCount: 4, amplitude: 0.1, persistence: 0.7 });
    return heightMap;
}

// Convert height map into biome map
export function generateBiomeMap(heightMap) {
    return heightMap.map(row =>
        row.map(value => {
            if (value < 0.3) return 'water';
            if (value < 0.5) return 'grassland';
            if (value < 0.7) return 'forest';
            return 'mountain';
        })
    );
}

// Combine into tiles array for your schema
export function generateWorldTiles(heightMap, biomeMap) {
    const tiles = [];
    for (let y = 0; y < heightMap.length; y++) {
        for (let x = 0; x < heightMap[0].length; x++) {
            tiles.push({
                x,
                y,
                biome: biomeMap[y][x],
                tags: [],
                resources: {},
                settlementId: null,
                actions: []
            });
        }
    }
    return tiles;
}

// Example complete generation call
export function generateWorld(width, height, seed) {
    const heightMap = generateHeightMap(width, height, seed);
    const biomeMap = generateBiomeMap(heightMap);
    const tiles = generateWorldTiles(heightMap, biomeMap);
    return {
        heightMap,
        biomeMap,
        tiles
    };
}
