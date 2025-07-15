import { getSpriteForBiome, getTileAt, mapData } from './terrainGenerator.js';


export function serializeWorld(mapData, settlements) {
  const height = mapData.length;
  const width = mapData[0].length;

  const tiles = mapData.map(row => 
    row.map(tile => ({ biome: tile.biome }))
  );

  return {
    version: 1,
    map: {
      width,
      height,
      tiles
    },
    settlements,
    metadata: {
      createdAt: new Date().toISOString(),
      notes: "Exported from MMO sandbox"
    }
  };
}


export function loadWorldFromJSON(json) {
  const mapData = json.map.tiles.map(row =>
    row.map(tile => ({
      biome: tile.biome,
      sprite: getSpriteForBiome(tile.biome)
    }))
  );

  // Also return settlements if you want to load them
  const settlements = json.settlements ?? [];

  console.log("✅ Loaded world from JSON:", json);
  return { mapData, settlements };
}

