export function renderRoom(viewPort, room) {
  if (!viewPort) {
    console.error("CRITICAL: #view-port not found in DOM.");
    return;
  }

  console.log(`Rendering room of size ${room[0].length}x${room.length}`);

  const width = room[0].length;
  const height = room.length;

  viewPort.innerHTML = "";
  viewPort.style.display = "grid";
  viewPort.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  viewPort.style.gridTemplateRows = `repeat(${height}, 1fr)`;

  room.forEach((row, y) => {
    row.forEach((cell, x) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.boxSizing = "border-box";

      // === COLORING BASED ON TYPE ===
      if (cell.type.startsWith('exit')) {
        tile.style.background = '#f39c12'; // orange exit
      } else {
        tile.style.background = '#7f8c8d'; // floor
      }

      // === OVERLAY FOR MONSTERS ===
      if (cell.content.some(c => c.type === 'monster')) {
        tile.style.background = '#c0392b'; // red for monsters
      }

      // === OVERLAY FOR ITEMS ===
      if (cell.content.some(c => c.type === 'item')) {
        tile.style.background = '#27ae60'; // green for loot
      }

      tile.addEventListener("click", () => {
        console.log(`Clicked room cell at (${y},${x})`, cell);
      });

      viewPort.appendChild(tile);
    });
  });
}
