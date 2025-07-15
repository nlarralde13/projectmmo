import { loadAllSprites } from './core/terrainGenerator.js';
import { generateLandmass } from './core/landmassGenerator.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log("✅ DOM loaded, now loading sprites...");
  await loadAllSprites();
  console.log("✅ All sprites loaded.");

  console.log("🚀 Testing landmass generation...");
  const map = generateLandmass(100, 100, { targetLandPercentage: 40, continentSeeds: 4 });
  window.map = map;
  console.log("🗺️ Landmass map generated and stored in window.map");

  // Count biomes
  const biomes = map.flat().reduce((acc, tile) => {
    acc[tile.biome] = (acc[tile.biome] || 0) + 1;
    return acc;
  }, {});
  console.log("🗺️ Biome counts:", biomes);

  // Optional ASCII map print
  /*console.log("🖥️ Sample ASCII map:");
  map.slice(0, 10).forEach(row => {
    console.log(row.map(tile => tile.biome[0]).join(" "));
  });
  */
});