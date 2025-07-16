import seedrandom from 'seedrandom';
import { createNoise2D } from 'simplex-noise';
import regionMap from '../data/regionMap.json';

/**
 * Generates a height map (2D array) using simplex noise.
 * Values normalized 0-1.
 */
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

/**
 * Converts height map values to biome types.
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
 * Generates a flat tile array from height and biome data.
 */
export function generateWorldTiles(heightMap, biomeMap) {
    const tiles = [];
    for (let y = 0; y < heightMap.length; y++) {
        for (let x = 0; x < heightMap[0].length; x++) {
            tiles.push({
                x, y,
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
 * Builds structured regions and continents from your validated regionMap.json.
 * Prepares them for weather, resources, settlements later.
 */
export function generateRegionsFromConfig(regionMap) {
    const regions = [];
    for (const region of regionMap.regions) {
        const newRegion = {
            id: region.id,
            name: region.name,
            bounds: { ...region.bounds },
            weather: [], // future feature
            continents: []
        };

        for (const continent of region.continents) {
            const newContinent = {
                id: continent.id,
                name: continent.name,
                bounds: { ...continent.bounds },
                resourcesSummary: {}
            };
            newRegion.continents.push(newContinent);
        }
        regions.push(newRegion);
    }
    return regions;
}

/**
 * Main orchestrator. Generates everything from your JSON spec.
 * Automatically uses width, height, and seed from regionMap.json.
 */
export function generateWorld() {
    const { width, height } = regionMap.dimensions;
    const seed = regionMap.seed;

    console.log(`Generating world with seed="${seed}", size=${width}x${height}`);

    const heightMap = generateHeightMap(width, height, seed);
    console.log(`HeightMap: ${heightMap.length} rows`);

    const biomeMap = generateBiomeMap(heightMap);
    console.log(`BiomeMap: ${biomeMap.length} rows`);

    const tiles = generateWorldTiles(heightMap, biomeMap);
    console.log(`Tiles generated: ${tiles.length}`);

    const regions = generateRegionsFromConfig(regionMap);
    console.log(`Regions loaded: ${regions.length}`);

    return {
        heightMap,
        biomeMap,
        tiles,
        regions
    };
}
