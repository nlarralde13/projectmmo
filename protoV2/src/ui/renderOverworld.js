import { getTileAt, mapData } from '../core/terrainGenerator.js';

const container = document.getElementById('game-container');
const canvas = document.getElementById('overworld');
const ctx = canvas.getContext('2d');

const tileSize = 32;
let cameraX = 0;
let cameraY = 0;

canvas.width = 1048;
canvas.height = 688;

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
}

function moveCamera(newX, newY) {
    const viewportTilesWide = Math.ceil(canvas.width / tileSize);
    const viewportTilesHigh = Math.ceil(canvas.height / tileSize);
    const mapWidth = mapData[0].length;
    const mapHeight = mapData.length;

    cameraX = Math.max(0, Math.min(newX, mapWidth - viewportTilesWide));
    cameraY = Math.max(0, Math.min(newY, mapHeight - viewportTilesHigh));
    renderOverworld();
}

export { moveCamera, renderOverworld };