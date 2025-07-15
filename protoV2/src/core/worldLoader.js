import { getSpriteForBiome, getTileAt, mapData } from './terrainGenerator.js';

import fs from 'fs'; // if using Node. Or adapt to browser with fetch/localStorage.

export async function loadWorld(path = '/protoV2/data/region_01.json') {
    try {
        const data = await fs.promises.readFile(path, 'utf-8');
        const world = JSON.parse(data);
        console.log(`Loaded world: ${world.worldName}`);
        return world;
    } catch (err) {
        console.error("Error loading world:", err);
        return null;
    }
}

export async function saveWorld(world, path = '/protoV2/data/region_01.json') {
    try {
        const json = JSON.stringify(world, null, 2);
        await fs.promises.writeFile(path, json, 'utf-8');
        console.log(`World saved to ${path}`);
    } catch (err) {
        console.error("Error saving world:", err);
    }
}

export function generateNewWorld() {
    // Example stub: build a 25x25 region_1 with dummy data
    const width = 25;
    const height = 25;
    const tiles = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            tiles.push({
                x, y,
                biome: (Math.random() < 0.5) ? "forest" : "grassland",
                tags: [],
                resources: { wood: Math.floor(Math.random() * 5) },
                settlementId: null,
                actions: ["explore"]
            });
        }
    }

    return {
        worldName: "PrototypeWorld",
        seed: 123456,
        dimensions: { width, height },
        regions: [
            {
                id: "region_1",
                name: "The Verdant March",
                bounds: { startX: 0, startY: 0, endX: 24, endY: 24 },
                continents: [
                    {
                        id: "continent_1",
                        name: "Eldara",
                        bounds: { startX: 5, startY: 5, endX: 20, endY: 20 },
                        biomes: ["forest", "grassland"],
                        resourcesSummary: { wood: 500 },
                        tags: ["rich_game"]
                    }
                ],
                settlements: [
                    {
                        id: "settlement_1",
                        name: "Oakfield",
                        location: { x: 10, y: 12 },
                        population: 100,
                        decay: 0,
                        owner: "neutral",
                        tags: ["market_town"]
                    }
                ]
            }
        ],
        chunks: [], // can add this later
        tiles,
        metadata: {
            created: new Date().toISOString(),
            lastSaved: new Date().toISOString(),
            version: "0.1"
        }
    };
}
