import { generateWorld, generateRegionsFromConfig, generateHeightMap, generateBiomeMap, generateWorldTiles} from './worldEngine.js';
import regionMap from '../data/regionMap.json';

/**
 * Saves the entire world object to a downloadable JSON file.
 */
export function saveWorld(world, filename = 'myWorld1.json') {
    const json = JSON.stringify(world, null, 2); // pretty print with indentation
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url); // clean up
}

/**
 * Loads a JSON file selected via <input type="file">
 * Returns a Promise that resolves to the parsed world object.
 */
export function loadWorld(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const world = JSON.parse(event.target.result);
                resolve(world);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

/**
 * Saves the world object to localStorage under a fixed key.
 */
export function saveWorldToLocalStorage(world) {
    try {
        localStorage.setItem("savedWorld", JSON.stringify(world));
        console.log("World saved to localStorage.");
    } catch (err) {
        console.error("Failed to save to localStorage:", err);
    }
}

/**
 * Attempts to load the world object from localStorage.
 * Returns the parsed world object or null if none exists.
 */
export function loadWorldFromLocalStorage() {
    const data = localStorage.getItem("savedWorld");
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch {
        console.warn("Corrupt localStorage data, ignoring.");
        return null;
    }
}

/**
 * High-level function: tries to load from localStorage,
 * else generates a new world using the seed and saves it.
 */
export function generateOrLoadWorld(width, height, seed) {
    let world = loadWorldFromLocalStorage();
    if (!world) {
        console.log("No saved world found. Generating new...");
        world = generateWorld(width, height, seed);
        saveWorldToLocalStorage(world);
    } else {
        console.log("Loaded existing world from localStorage.");
    }
    return world;
}

export function generateWorld(width, height, seed) {
    const heightMap = generateHeightMap(width, height, seed);
    const biomeMap = generateBiomeMap(heightMap);
    const tiles = generateWorldTiles(heightMap, biomeMap);

    // 🔥 Build regions and continents from JSON
    const regions = generateRegionsFromConfig(regionMap);

    return {
        heightMap,
        biomeMap,
        tiles,
        regions
    };
}