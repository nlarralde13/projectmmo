import { addLog } from "../../ui/ui.js";

export function generateRegion(biome) {
  const width = Math.floor(Math.random() * 5) + 2;  // 2-6
  const height = Math.floor(Math.random() * 5) + 2; // 2-6

  const region = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      if (Math.random() < 0.7) {  // 70% fill for irregular shape
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
        row.push(null);  // empty space
      }
    }
    region.push(row);
  }
  return region;
}

export function renderRegion(region) {
  const mapDiv = document.getElementById("map");
  const backBtn = document.getElementById("back-btn");

  if (!mapDiv) {
    console.error("CRITICAL: #map element not found in DOM.");
    return;
  }

  if (backBtn) {
    backBtn.style.display = "inline-block";
  } else {
    console.error("CRITICAL: #back-btn element not found in DOM.");
  }

  mapDiv.innerHTML = "";
  mapDiv.style.gridTemplateColumns = `repeat(${region[0].length}, 1fr)`;
  mapDiv.style.gridTemplateRows = `repeat(${region.length}, 1fr)`;

  region.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile !== null) {
        const div = document.createElement("div");
        div.className = "tile";

        // Style by tile type with fallback
        if (tile === 'grass' || tile === 'trees') {
          div.style.background = '#2ecc71';
        } else if (tile === 'sand' || tile === 'rock') {
          div.style.background = '#f1c40f';
        } else if (tile === 'mud') {
          div.style.background = '#7f8c8d';
        } else if (tile === 'snow' || tile === 'ice') {
          div.style.background = '#ecf0f1';
        } else {
          div.style.background = '#999'; // fallback color
        }

        div.addEventListener("click", () => {
          addLog(`You enter a ${tile} area at (${y},${x}).`);
        });

        mapDiv.appendChild(div);
      }
    });
  });
}
