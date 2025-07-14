export function generateRoom({
  width,
  height,
  mustHaveExitNorth = false,
  mustHaveExitSouth = false,
  mustHaveExitEast = false,
  mustHaveExitWest = false,
  monsterDensity = 0.1,
  itemDensity = 0.1
}) {
  const grid = [];

  // === INITIAL EMPTY ROOM FILL ===
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push({ type: 'floor', content: [] }); 
      // content array could later hold items, monsters, traps
    }
    grid.push(row);
  }

  // === PLACE ROOM EXITS IF REQUIRED ===
  enforceExits(grid, width, height, {
    north: mustHaveExitNorth,
    south: mustHaveExitSouth,
    east: mustHaveExitEast,
    west: mustHaveExitWest
  });

  // === POPULATE MONSTERS & ITEMS ===
  placeMonsters(grid, monsterDensity);
  placeItems(grid, itemDensity);

  // === PLACE ADDITIONAL FUTURE ROOM RULES HERE ===
  // Examples: locked doors, special altars, treasure chests.

  return grid;
}

// === PLACE ROOM EXITS ===
function enforceExits(grid, width, height, exits) {
  if (exits.north) {
    const midX = Math.floor(width / 2);
    grid[0][midX].type = 'exit-north';
  }
  if (exits.south) {
    const midX = Math.floor(width / 2);
    grid[height - 1][midX].type = 'exit-south';
  }
  if (exits.east) {
    const midY = Math.floor(height / 2);
    grid[midY][width - 1].type = 'exit-east';
  }
  if (exits.west) {
    const midY = Math.floor(height / 2);
    grid[midY][0].type = 'exit-west';
  }
}

// === PLACE MONSTERS RANDOMLY ===
function placeMonsters(grid, density) {
  grid.forEach(row => {
    row.forEach(cell => {
      if (Math.random() < density) {
        cell.content.push({ type: 'monster', species: randomMonster() });
      }
    });
  });
}

// === PLACE ITEMS RANDOMLY ===
function placeItems(grid, density) {
  grid.forEach(row => {
    row.forEach(cell => {
      if (Math.random() < density) {
        cell.content.push({ type: 'item', name: randomItem() });
      }
    });
  });
}

// === PLACEHOLDER RANDOM SELECTORS ===
function randomMonster() {
  const monsters = ['goblin', 'skeleton', 'rat', 'orc'];
  return monsters[Math.floor(Math.random() * monsters.length)];
}

function randomItem() {
  const items = ['gold coin', 'rusty sword', 'healing herb', 'torch'];
  return items[Math.floor(Math.random() * items.length)];
}
