import { generateTerrain } from '../../generation/terrainGenerator.js';
import { renderRegion } from '../../maps/regions/regionGenerator.js';


export function renderOverworld(viewPort, options = {}) {
  if (!viewPort) {
    console.error("CRITICAL: #view-port not found in DOM.");
    return;
  }

  const width = options.width || 100;
  const height = options.height || 100;

  // === LOAD OR GENERATE PERSISTENT OVERWORLD ===
  let overworld;
  if (localStorage.getItem("overworld")) {
    try {
      console.log("Loading persistent overworld from localStorage...");
      overworld = JSON.parse(localStorage.getItem("overworld"));
    } catch (e) {
      console.error("Failed to parse overworld JSON, regenerating...", e);
      overworld = generateTerrain({
        width,
        height,
        numLandBlobs: 12,
        blobSizeRange: [5, 12],
      });
      localStorage.setItem("overworld", JSON.stringify(overworld));
    }
  } else {
    console.log("Generating new persistent overworld...");
    overworld = generateTerrain({
      width,
      height,
      numLandBlobs: 12,
      blobSizeRange: [5, 12],
    });
    localStorage.setItem("overworld", JSON.stringify(overworld));
  }

  console.log(`Rendering overworld: ${overworld[0].length} cols x ${overworld.length} rows`);

  // === CONFIGURE STATIC CONTAINER ===
  viewPort.innerHTML = "";
  viewPort.style.display = "grid";
  viewPort.style.width = "1080px";
  viewPort.style.height = "720px";
  viewPort.style.gridTemplateColumns = `repeat(${overworld[0].length}, 1fr)`;
  viewPort.style.gridTemplateRows = `repeat(${overworld.length}, 1fr)`;
  viewPort.style.gap = "0";
  viewPort.style.padding = "0";
  viewPort.style.margin = "0";
  viewPort.style.boxSizing = "border-box";
  viewPort.style.border = "2px solid #333";

  // === RENDER TILES ===
overworld.forEach((row, y) => {
  row.forEach((zone, x) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.width = "100%";
    tile.style.height = "100%";
    tile.style.boxSizing = "border-box";
    tile.style.padding = "0";
    tile.style.margin = "0";
    tile.style.border = "1px solid rgba(0,0,0,0.1)";

    // === ADD TOOLTIP ===
    tile.title = `(${x},${y}) - ${zone.type}${zone.biome ? ' / ' + zone.biome : ''}`;

    if (zone.type === 'water') {
      tile.style.background = '#3498db';
    } else {
      tile.style.background = getBiomeColor(zone.biome);
    }

    tile.addEventListener("click", () => {
      if (zone.type === 'land') {
        renderRegion(viewPort, zone);
      } else {
        console.log("You can't explore the water.");
      }
    });

    viewPort.appendChild(tile);
  });
});

}

function getBiomeColor(biome) {
  switch (biome) {
    case 'forest': return '#2ecc71';
    case 'desert': return '#f1c40f';
    case 'swamp': return '#27ae60';
    case 'arctic': return '#ecf0f1';
    case 'plains': return '#95a5a6';
    case 'jungle': return '#16a085';
    case 'mountains': return '#7f8c8d';
    case 'polar desert': return '#bdc3c7';
    case 'river': return '#2980b9';
    case 'wasteland': return '#8e7e61';
    default: return '#999';
  }
}
