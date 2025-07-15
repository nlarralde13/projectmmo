import { getTileAt } from '../core/terrainGenerator.js';
import { mapData } from '../core/terrainGenerator.js';




const container = document.getElementById('game-container');
const canvas = document.getElementById('overworld');
const ctx = canvas.getContext('2d');

const tileSize = 32;
let cameraX = 0;
let cameraY = 0;

let targetCameraX = 0;
let targetCameraY = 0;
let isCameraAnimating = false;

let selectedTileX = null;
let selectedTileY = null;

//tracking variables
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let cameraStartX = 0;
let cameraStartY = 0;


// Hardcode viewport size
canvas.width = 1080
canvas.height = 720 

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

            console.log(`Drawing ${tile.biome} at (${worldX}, ${worldY})`);

            if (tile.sprite.complete && tile.sprite.naturalHeight !== 0) {
                ctx.drawImage(tile.sprite, x * tileSize, y * tileSize, tileSize, tileSize);
                } else {
                    console.log(`Skipping ${tile.biome} — sprite not loaded yet`);
}

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

//MOVE CAMERA
function moveCamera(newX, newY) {
    const viewportTilesWide = Math.ceil(canvas.width / tileSize);
    const viewportTilesHigh = Math.ceil(canvas.height / tileSize);

    // Ideally from your generator
    const mapWidth = mapData[0].length;
    const mapHeight = mapData.length;

    cameraX = Math.max(0, Math.min(cameraX, mapWidth - viewportTilesWide));
    cameraY = Math.max(0, Math.min(cameraY, mapHeight - viewportTilesHigh));

    renderOverworld();
}

function animateCamera() {
    const viewportTilesWide = Math.ceil(canvas.width / tileSize);
    const viewportTilesHigh = Math.ceil(canvas.height / tileSize);
    const mapWidth = mapData[0].length;
    const mapHeight = mapData.length;

    cameraX += (targetCameraX - cameraX) * 0.1;
    cameraY += (targetCameraY - cameraY) * 0.1;

    cameraX = Math.max(0, Math.min(cameraX, mapWidth - viewportTilesWide));
    cameraY = Math.max(0, Math.min(cameraY, mapHeight - viewportTilesHigh));

    renderOverworld();
}


    if (Math.abs(cameraX - targetCameraX) < 0.1 && Math.abs(cameraY - targetCameraY) < 0.1) {
        cameraX = targetCameraX;
        cameraY = targetCameraY;
        isCameraAnimating = false;
        renderOverworld();
    } else {
        requestAnimationFrame(animateCamera);
    }


//MOUSE CLICK LISTENER
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

//MOUSE EVENT HANDLERS
canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = canvas.getBoundingClientRect();
    dragStartX = e.clientX - rect.left;
    dragStartY = e.clientY - rect.top;
    cameraStartX = cameraX;
    cameraStartY = cameraY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const dx = currentX - dragStartX;
    const dy = currentY - dragStartY;

    cameraX = cameraStartX - dx / tileSize;
    cameraY = cameraStartY - dy / tileSize;

    // clamp to 0
    cameraX = Math.max(0, cameraX);
    cameraY = Math.max(0, cameraY);

    renderOverworld();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});


export { moveCamera, renderOverworld };