import { getTileAt } from '../core/terrainGenerator.js';

const container = document.getElementById('game-container');
const canvas = document.getElementById('overworld');
const ctx = canvas.getContext('2d');

const tileSize = 16;
let cameraX = 0;
let cameraY = 0;

let targetCameraX = 0;
let targetCameraY = 0;
let isCameraAnimating = false;

let selectedTileX = null;
let selectedTileY = null;

// Hardcode viewport size
canvas.width = 1080 - 32;
canvas.height = 720 - 32;

function renderOverworld() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tilesWide = Math.ceil(canvas.width / tileSize);
    const tilesHigh = Math.ceil(canvas.height / tileSize);

    for (let y = 0; y < tilesHigh; y++) {
        for (let x = 0; x < tilesWide; x++) {
            const worldX = Math.floor(cameraX + x);
            const worldY = Math.floor(cameraY + y);

            const tile = getTileAt(worldX, worldY);
            if (!tile || !tile.sprite) continue;

            ctx.drawImage(tile.sprite, x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Draw highlight box if a tile is selected
    if (selectedTileX !== null && selectedTileY !== null) {
        const highlightX = (selectedTileX - cameraX) * tileSize;
        const highlightY = (selectedTileY - cameraY) * tileSize;

        ctx.strokeStyle = '#ff0';
        ctx.lineWidth = 2;
        ctx.strokeRect(highlightX, highlightY, tileSize, tileSize);
    }
}

function moveCamera(newX, newY) {
    cameraX = newX;
    cameraY = newY;
    renderOverworld();
}

function animateCamera() {
    if (!isCameraAnimating) return;

    const speed = 0.1;
    cameraX += (targetCameraX - cameraX) * speed;
    cameraY += (targetCameraY - cameraY) * speed;

    cameraX = Math.round(cameraX * 100) / 100;
    cameraY = Math.round(cameraY * 100) / 100;

    renderOverworld();

    if (Math.abs(cameraX - targetCameraX) < 0.1 && Math.abs(cameraY - targetCameraY) < 0.1) {
        cameraX = targetCameraX;
        cameraY = targetCameraY;
        isCameraAnimating = false;
        renderOverworld();
    } else {
        requestAnimationFrame(animateCamera);
    }
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const tileX = Math.floor(mouseX / tileSize);
    const tileY = Math.floor(mouseY / tileSize);

    const worldX = Math.floor(cameraX + tileX);
    const worldY = Math.floor(cameraY + tileY);

    selectedTileX = worldX;
    selectedTileY = worldY;

    targetCameraX = Math.max(0, worldX - Math.floor((canvas.width / tileSize) / 2));
    targetCameraY = Math.max(0, worldY - Math.floor((canvas.height / tileSize) / 2));
    isCameraAnimating = true;

    animateCamera();
});

export { moveCamera, renderOverworld };