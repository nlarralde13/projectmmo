import { generateWorld } from './worldEngine.js';
import { validateRegionMapJSON } from './devTools.js';

let heightMap, biomeMap, tiles, regions, world;

// Validate regionMap.json against schema first
const validation = validateRegionMapJSON();

if (validation.valid) {
    // Only build the world if JSON is valid
    world = generateWorld();
    ({ heightMap, biomeMap, tiles, regions } = world);

    console.log("World generated:", world);

    renderBiomeMapCanvas(biomeMap, regions);

    // Add a reset button to regenerate from same JSON
    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Reset & Regenerate World";
    resetBtn.onclick = () => {
        world = generateWorld();
        ({ heightMap, biomeMap, tiles, regions } = world);
        renderBiomeMapCanvas(biomeMap, regions);
    };
    document.body.appendChild(resetBtn);

} else {
    console.error("Validation errors:", validation.errors);

    // Display HTML error block with all issues
    const errorDiv = document.createElement('div');
    errorDiv.style.color = "red";
    errorDiv.style.padding = "1em";
    errorDiv.style.background = "#ffeeee";
    errorDiv.style.border = "2px solid red";
    errorDiv.innerHTML = `<h3>❌ regionMap.json failed validation</h3>
        <ul>${validation.errors.map(err =>
          `<li><b>${err.instancePath || '/'}</b>: ${err.message}</li>`
        ).join('')}</ul>`;
    document.body.appendChild(errorDiv);
}

/**
 * Renders the biome map on a canvas, draws continent borders & names
 */
function renderBiomeMapCanvas(biomeMap, regions, tileSize = 10) {
    const oldCanvas = document.querySelector('canvas');
    if (oldCanvas) oldCanvas.remove();

    const width = biomeMap[0].length;
    const height = biomeMap.length;

    const canvas = document.createElement('canvas');
    canvas.width = width * tileSize;
    canvas.height = height * tileSize;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Draw biome tiles
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const biome = biomeMap[y][x];
            ctx.fillStyle = getBiomeColor(biome);
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Draw continent borders & names
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.font = `${Math.max(tileSize, 10)}px sans-serif`;
    ctx.fillStyle = '#000';

    regions.forEach(region => {
        region.continents.forEach(continent => {
            const { startX, startY, endX, endY } = continent.bounds;
            ctx.strokeRect(
                startX * tileSize,
                startY * tileSize,
                (endX - startX + 1) * tileSize,
                (endY - startY + 1) * tileSize
            );
            ctx.fillText(
                continent.name,
                ((startX + endX) / 2) * tileSize,
                ((startY + endY) / 2) * tileSize
            );
        });
    });
}

/**
 * Maps biome type to color
 */
function getBiomeColor(biome) {
    switch(biome) {
        case 'water': return '#3399ff';
        case 'grassland': return '#66cc66';
        case 'forest': return '#336633';
        case 'mountain': return '#999999';
        default: return '#000000';
    }
}
