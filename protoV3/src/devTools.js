// Dev tool for manual seed generation. 
// Attach to DOM when needed for testing.
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import regionMap from '../data/regionMap.json';
import regionMapSchema from '../data/regionMap.schema.json';


export function addSeedInputUI(generateFunc) {
    const seedInput = document.createElement('input');
    seedInput.type = "text";
    seedInput.placeholder = "Enter seed...";
    document.body.appendChild(seedInput);

    const genBtn = document.createElement('button');
    genBtn.textContent = "Generate World from Seed";
    genBtn.onclick = () => {
        const seed = seedInput.value || 'default_seed';
        generateFunc(seed);
    };
    document.body.appendChild(genBtn);
}


//validate region map on load
/**
 * Validates regionMap.json against schema.
 * Returns { valid: boolean, errors: [] }
 */
export function validateRegionMapJSON() {
    const ajv = new Ajv();
    addFormats(ajv);

    const validate = ajv.compile(regionMapSchema);
    const valid = validate(regionMap);

    if (valid) {
        console.log("✅ regionMap.json is valid against schema!");
        return { valid: true, errors: [] };
    } else {
        console.error("❌ regionMap.json failed validation:", validate.errors);
        return { valid: false, errors: validate.errors };
    }
}


/**
 * Validates regionMap.json against regionMap.schema.json using AJV.
 * Logs validation results to the console.
 */
export function validateSchema() {
    const ajv = new Ajv();
    addFormats(ajv);

    const validate = ajv.compile(regionMapSchema);

    if (validate(regionMap)) {
        console.log("✅ regionMap.json is valid against schema!");
    } else {
        console.error("❌ regionMap.json failed validation:");
        console.table(validate.errors);
    }
}

