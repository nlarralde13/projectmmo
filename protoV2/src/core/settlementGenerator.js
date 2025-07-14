console.log("✅ Loaded settlementGenerator.js");

import { placeSettlements } from './settlementPlacer.js';

export async function generateSettlements(map) {
  if (!map || !map.length) {
    console.error("❌ generateSettlements received invalid map data.");
    return;
  }

  console.log("🏘️ Starting settlement placement...");

  await placeSettlements(map, { type: 'kingdom', count: 4, quadrantControl: true });
  await placeSettlements(map, { type: 'capital', count: 3 });
  await placeSettlements(map, { type: 'village', count: 15 });
  await placeSettlements(map, { type: 'wagon', count: 40 });

  console.log("✅ Settlements placed successfully.");
}
