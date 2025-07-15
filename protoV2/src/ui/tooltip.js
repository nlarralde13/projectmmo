import { getTileAt } from '../core/terrainGenerator.js';
import { cameraX, cameraY, tileSize } from '../ui/renderOverworld.js';

console.log("✅ Loaded tooltip.js");

export function initializeTooltip() {
    const canvas = document.getElementById('overworld');
    const tooltip = document.getElementById('hover-tooltip');

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const tileX = Math.floor(mouseX / tileSize);
        const tileY = Math.floor(mouseY / tileSize);

        const worldX = Math.floor(cameraX + tileX);
        const worldY = Math.floor(cameraY + tileY);

        const tile = getTileAt(worldX, worldY);

        if (tile) {
            tooltip.style.left = `${e.clientX + 10}px`;
            tooltip.style.top = `${e.clientY + 10}px`;
            tooltip.style.display = 'block';
            tooltip.textContent = `(${worldX},${worldY}) - ${tile.biome}`;
        } else {
            tooltip.style.display = 'none';
        }
    });

    canvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
}