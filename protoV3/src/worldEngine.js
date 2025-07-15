import seedrandom from 'seedrandom';
import { createNoise2D } from 'simplex-noise';

export function generateHeightMap(width, height, seed) {
    const rng = seedrandom(seed);
    const noise2D = createNoise2D(rng);

    const heightMap = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const nx = x / width - 0.5;
            const ny = y / height - 0.5;
            let value = noise2D(nx * 3, ny * 3);
            value = (value + 1) / 2;
            row.push(value);
        }
        heightMap.push(row);
    }

    return heightMap;
}

// Keep your biome + tile generation unchanged
export function generateBiomeMap(heightMap) { /* ... */ }
export function generateWorldTiles(heightMap, biomeMap) { /* ... */ }
export function generateWorld(width, height, seed) { /* ... */ }
