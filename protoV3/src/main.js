import { generateWorld } from './worldEngine.js';

const { heightMap, biomeMap, tiles } = generateWorld(50, 50, 'my_seed');

console.log("Generated biome map:", biomeMap);
console.log(`Total tiles: ${tiles.length}`);

// Simple text visualization
const pre = document.createElement('pre');
pre.textContent = biomeMap
    .map(row => row.map(b => b[0].toUpperCase()).join(' '))
    .join('\n');
document.body.appendChild(pre);
