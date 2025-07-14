export async function placeSettlements(map, options) {
  // Load settlement types config
  const res = await fetch('./src/assets/config/settlementTypes.json');
  const settlementData = await res.json();

  const { type, count, quadrantControl = false } = options;
  const config = settlementData[type];
  if (!config) {
    console.error(`Settlement type "${type}" not found in JSON.`);
    return;
  }

  const height = map.length;
  const width = map[0].length;

  // Track placed settlements
  let placedCount = 0;
  const quadrantTracker = {};  // e.g. {"0,0": true}

  // Try to place up to 'count' settlements
  while (placedCount < count) {
    const size = randInt(config.minSize, config.maxSize);
    const startX = randInt(0, width - 1);
    const startY = randInt(0, height - 1);

    // Check biome constraints
    if (!config.allowedBiomes.includes(map[startY][startX].biome)) continue;

    // Check quadrant rules for large settlements
    if (config.maxPerQuadrant && quadrantControl) {
      const quadX = Math.floor(startX / (width / 2));
      const quadY = Math.floor(startY / (height / 2));
      const quadKey = `${quadX},${quadY}`;
      if (quadrantTracker[quadKey]) continue;  // already has one
      quadrantTracker[quadKey] = true;
    }

    // Place the cluster
    growSettlement(map, startX, startY, size, {
      type,
      sizeCategory: config.sizeCategory,
      population: randInt(config.typicalPopulation[0], config.typicalPopulation[1])
    });

    placedCount++;

    // Check overall maxPerMap
    if (config.maxPerMap && placedCount >= config.maxPerMap) break;
  }

  console.log(`Placed ${placedCount} ${type}(s) on the map.`);
}

// ---- Helper: flood fill style settlement growth
function growSettlement(map, startX, startY, size, settlementInfo) {
  const height = map.length;
  const width = map[0].length;
  const queue = [[startX, startY]];
  const visited = new Set();
  let placedTiles = 0;

  while (queue.length > 0 && placedTiles < size) {
    const [x, y] = queue.shift();
    const key = `${x},${y}`;

    if (
      x >= 0 && x < width && y >= 0 && y < height &&
      !visited.has(key) &&
      !map[y][x].settlement
    ) {
      map[y][x].settlement = settlementInfo;
      visited.add(key);
      placedTiles++;

      const neighbors = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]];
      shuffle(neighbors);
      queue.push(...neighbors);
    }
  }
}

// ---- Utils
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array) {
  for (let i = array.length -1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
