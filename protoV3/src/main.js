import { generateWorld } from './worldEngine.js';

const { heightMap, biomeMap, tiles } = generateWorld(50, 30, 'my_seed');

console.log("Biome Map:", biomeMap);
console.log(`Generated ${tiles.length} tiles.`);

// Simple text preview
const pre = document.createElement('pre');
pre.textContent = biomeMap
    .map(row => row.map(b => b[0].toUpperCase()).join(' '))
    .join('\n');
document.body.appendChild(pre);
