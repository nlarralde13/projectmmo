import { generateWorld } from './core/worldEngine.js';

const { heightMap, biomeMap, tiles } = generateWorld(25, 25, 'my_seed');
console.log(biomeMap);
console.log(`Generated ${tiles.length} tiles`);
