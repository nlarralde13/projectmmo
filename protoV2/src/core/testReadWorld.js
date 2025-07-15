import fs from 'fs/promises';

async function validateWorldSchema(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const world = JSON.parse(data);

        // Basic checks
        console.log(`✅ Loaded world: ${world.worldName}`);
        console.log(`Seed: ${world.seed}`);
        console.log(`Dimensions: ${world.dimensions.width} x ${world.dimensions.height}`);

        if (!world.regions || !Array.isArray(world.regions)) {
            throw new Error("Missing or invalid 'regions' array.");
        }

        if (!world.tiles || !Array.isArray(world.tiles)) {
            throw new Error("Missing or invalid 'tiles' array.");
        }

        console.log(`Regions found: ${world.regions.length}`);
        console.log(`Tiles found: ${world.tiles.length}`);

        // Example: print summary of each region
        world.regions.forEach(region => {
            console.log(` - Region: ${region.name} with ${region.settlements?.length || 0} settlements.`);
        });

        console.log("✅ World schema looks valid!");

    } catch (err) {
        console.error("❌ Validation failed:", err.message);
    }
}

validateWorldSchema('../../data/region_01.json');
