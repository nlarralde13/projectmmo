import { initMap } from './map.js';
import { initUI } from './ui.js';
import { initTime } from './time.js';

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initUI();
    initTime();
});