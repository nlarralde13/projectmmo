import { addLog } from './ui.js';


export function initMap() {
    const mapDiv = document.getElementById("map");

    for (let i = 0; i < 10; i++) { //5x5 = 25 tiles}
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = "h";
        tile.addEventListener("click", () => {
            console.log(`clicked tile ${i}`);
            addLog(`You stepped on a tile ${i}`);
            //later: trigger info panel update
        });
        mapDiv.appendChild(tile);
}}