import { generateRegion, renderRegion } from '../regions/region.js';
import { addLog } from '../../ui/ui.js';

export const overworld = [
  [
    { type: 'land', biome: 'forest' },
    { type: 'land', biome: 'desert' },
    { type: 'water' },
    { type: 'water' },
    { type: 'land', biome: 'swamp' }
  ],
  [
    { type: 'water' },
    { type: 'land', biome: 'arctic' },
    { type: 'land', biome: 'plains' },
    { type: 'land', biome: 'forest' },
    { type: 'water' }
  ],
  [
    { type: 'land', biome: 'jungle' },
    { type: 'land', biome: 'desert' },
    { type: 'water' },
    { type: 'land', biome: 'swamp' },
    { type: 'land', biome: 'forest' }
  ],
  [
    { type: 'water' },
    { type: 'land', biome: 'arctic' },
    { type: 'land', biome: 'mountains' },
    { type: 'land', biome: 'forest' },
    { type: 'water' }
  ],
  [
    { type: 'land', biome: 'plains' },
    { type: 'water' },
    { type: 'water' },
    { type: 'land', biome: 'desert' },
    { type: 'land', biome: 'jungle' }
  ]
];

export function renderOverworld() {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("CRITICAL: #map not found in DOM.");
    return;
  }



  mapDiv.innerHTML = ""; // clear previous map

  overworld.forEach((row, y) => {
    row.forEach((zone, x) => {
      const tile = document.createElement("div");
      tile.className = "tile";

      // Set background color by type/biome
      if (zone.type === 'water') {
        tile.style.background = '#3498db'; // blue water
      } else {
        switch(zone.biome) {
          case 'forest':
            tile.style.background = '#2ecc71';
            break;
          case 'desert':
            tile.style.background = '#f1c40f';
            break;
          case 'swamp':
            tile.style.background = '#27ae60';
            break;
          case 'arctic':
            tile.style.background = '#ecf0f1';
            break;
          case 'plains':
            tile.style.background = '#95a5a6';
            break;
          case 'jungle':
            tile.style.background = '#16a085';
            break;
          case 'mountains':
            tile.style.background = '#7f8c8d';
            break;
          default:
            tile.style.background = '#999'; // fallback color
        }
      }
      mapDiv.style.gridTemplateColumns = `repeat(5, 1fr)`;
      mapDiv.style.gridTemplateRows = `repeat(5, 1fr)`;

      tile.addEventListener("click", () => {
        if (zone.type === 'water') {
          addLog(`Nothing but ocean here at (${y},${x}).`);
        } else {
          addLog(`Travelling to ${zone.biome} region...`);
          const region = generateRegion(zone.biome);
          renderRegion(region);
        }
      });

      mapDiv.appendChild(tile);
    });
  });
}
