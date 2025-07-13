import { addLog } from "../../ui/ui.js";

/**
 * Generates a random 2D region map array based on biome.
 * Each cell is a tile type (string) or null (empty space).
 */
export function generateRegion(biome) {
  const width = Math.floor(Math.random() * 5) + 2;  // 2-6
  const height = Math.floor(Math.random() * 5) + 2; // 2-6

  const region = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      if (Math.random() < 0.7) {  // ~70% chance to place a tile
        switch (biome) {
          case 'desert':
            row.push(Math.random() < 0.5 ? 'sand' : 'rock');
            break;
          case 'forest':
            row.push(Math.random() < 0.5 ? 'grass' : 'trees');
            break;
          case 'swamp':
            row.push(Math.random() < 0.5 ? 'mud' : 'grass');
            break;
          case 'arctic':
            row.push(Math.random() < 0.5 ? 'snow' : 'ice');
            break;
          default:
            row.push('grass');
        }
      } else {
        row.push(null); // empty space, part of irregular shape
      }
    }
    region.push(row);
  }
  return region;
}

/**
 * Renders a given 2D region array inside the #map container.
 * Adjusts grid size dynamically, displays tiles by type,
 * and ensures the back button becomes visible.
 */
export function renderRegion(region) {
  const mapDiv = document.getElementById("map");
  const backBtn = document.getElementById("back-btn");

  if (!mapDiv) {
    console.error("CRITICAL: #map not found in DOM.");
    return;
  }

  // Always make sure back button is shown in region view
  if (backBtn) {
    backBtn.style.display = "inline-block";
  } else {
    console.error("CRITICAL: #back-btn not found in DOM.");
  }

  // Set up grid to match region dimensions
  mapDiv.innerHTML = "";
  mapDiv.style.gridTemplateColumns = `repeat(${region[0].length}, 1fr)`;
  mapDiv.style.gridTemplateRows = `repeat(${region.length}, 1fr)`;

  // Populate grid with tiles
  region.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile !== null) {
        const div = document.createElement("div");
        div.className = "tile";

        // Color tiles based on type
        switch (tile) {
          case 'grass':
          case 'trees':
            div.style.background = '#2ecc71';
            break;
          case 'sand':
          case 'rock':
            div.style.background = '#f1c40f';
            break;
          case 'mud':
            div.style.background = '#7f8c8d';
            break;
          case 'snow':
          case 'ice':
            div.style.background = '#ecf0f1';
            break;
          default:
            div.style.background = '#999'; // fallback color
        }

        // Example interaction: log area type & coords
        div.addEventListener("click", () => {
          addLog(`You enter a ${tile} area at (${y},${x}).`);
          // Future: spawn monsters, start loot checks, show room details...
        });

        mapDiv.appendChild(div);
      }
    });
  });
}
