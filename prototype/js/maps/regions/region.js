import { generateRoom } from '../../generation/roomGenerator.js';
import { renderRoom } from '../renderRoom.js';

export function renderRegion(viewPort, zone) {
  if (!viewPort) {
    console.error("CRITICAL: #view-port not found in DOM.");
    return;
  }

  console.log(`Generating region inside ${zone.biome} zone...`);

  viewPort.innerHTML = "";
  viewPort.style.display = "flex";
  viewPort.style.justifyContent = "center";
  viewPort.style.alignItems = "center";

  const width = Math.floor(Math.random() * 2) + 3;  // 3-4
  const height = Math.floor(Math.random() * 2) + 3;
  console.log(`Generated region size: ${width}x${height}`);

  const regionContainer = document.createElement("div");
  regionContainer.style.width = "80%";
  regionContainer.style.height = "80%";
  regionContainer.style.border = "4px solid #fff";
  regionContainer.style.display = "grid";
  regionContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  regionContainer.style.gridTemplateRows = `repeat(${height}, 1fr)`;
  regionContainer.style.gap = "2px";
  regionContainer.style.boxSizing = "border-box";

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.background = randomRegionColor(zone.biome);

      tile.addEventListener("click", () => {
        console.log(`Clicked inside region at (${y},${x}), generating room...`);
        const room = generateRoom({
          width: 6,
          height: 6,
          mustHaveExitNorth: true,
          monsterDensity: 0.2,
          itemDensity: 0.15
        });
        renderRoom(viewPort, room);
      });

      regionContainer.appendChild(tile);
    }
  }

  viewPort.appendChild(regionContainer);
}

function randomRegionColor(biome) {
  switch (biome) {
    case 'forest': return '#2ecc71';
    case 'desert': return '#f1c40f';
    case 'swamp': return '#27ae60';
    case 'arctic': return '#ecf0f1';
    case 'plains': return '#95a5a6';
    case 'jungle': return '#16a085';
    case 'mountains': return '#7f8c8d';
    default: return '#999';
  }
}
