// Import seedrandom to make sure noise is reproducible
import seedrandom from 'seedrandom';
// Import createNoise2D, a helper from simplex-noise that gives us a pure function for 2D noise
import { createNoise2D } from 'simplex-noise';

/**
 * Generates a height map for the world using simplex noise.
 * Returns a 2D array [y][x] of values between 0 and 1.
 */
export function generateHeightMap(width, height, seed) {
    // Use seedrandom so the same seed always generates the same world
    const rng = seedrandom(seed);

    // Create a noise2D function that uses our seeded random generator
    const noise2D = createNoise2D(rng);

    const heightMap = [];

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            // Normalize x/y to -0.5 to +0.5 range to center noise patterns
            const nx = x / width - 0.5;
            const ny = y / height - 0.5;

            // Sample the noise function at scaled coordinates (adjust multiplier for zoom level)
            let value = noise2D(nx * 3, ny * 3);

            // Noise returns values between roughly -1 and 1, so normalize to 0-1
            value = (value + 1) / 2;

            row.push(value);
        }
        heightMap.push(row);
    }

    return heightMap;
}

/**
 * Converts a height map into a biome map.
 * Based on elevation thresholds, assigns a biome string to each cell.
 */
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

/**
 * Converts heightMap + biomeMap into a flat array of tile objects
 * ready to be saved as JSON or used in your game.
 */
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

/**
 * Orchestrates full world generation.
 * Returns { heightMap, biomeMap, tiles } so you can save it or render it.
 */
export function generateWorld(width, height, seed) {
    const heightMap = generateHeightMap(width, height, seed);
    const biomeMap = generateBiomeMap(heightMap);
    const tiles = generateWorldTiles(heightMap, biomeMap);

    return { heightMap, biomeMap, tiles };
}
