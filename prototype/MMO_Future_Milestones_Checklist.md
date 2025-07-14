
# 📜 MMO Project — Future Milestones & Checklist

## 🚀 Summary of Future Milestones

| Milestone | Focus Area                                           |
|-----------|------------------------------------------------------|
| **2**     | World building (loot, structures, biomes, exploration layers) |
| **3**     | Mob generation (passive & hostile wildlife)          |
| **4**     | Player creation (character gen, attributes, persistence) |
| **5**     | Combat & loot (turn-based, rewards)                  |


---

## 🏗️ Milestone 2 — World Building Expansion

### 📍 Milestone 2.1 — Advanced Region Features
- [ ] Build `lootSpawner.js` to place biome-based resources (herbs, ores, wood)
- [ ] Build `structureGenerator.js` for ruins, caves, abandoned camps
- [ ] Update `regionGenerator.js` to integrate both
- [ ] Add simple hover tooltips in regions showing loot / structure type

### 📍 Milestone 2.2 — Overworld Diversity
- [ ] Add new overworld biome types (volcanic, tundra, wetlands)
- [ ] Tune terrain generator weights to spawn them
- [ ] Introduce rare large features (lakes, long mountains)
- [ ] Display unique biome colors on the overworld map

### 📍 Milestone 2.3 — Map & Exploration Layers
- [ ] Implement fog-of-war on overworld (unexplored tiles darker or covered)
- [ ] Mark tiles as explored after zoom or region visit
- [ ] Optional: small minimap overlay to track exploration progress

---

## 🐾 Milestone 3 — Mob Generation & Local Wildlife

### 📍 Milestone 3.1 — Passive Wildlife
- [ ] Build `wildlifeSpawner.js` for ambient creatures by biome
- [ ] Render small creature icons on region tiles or overlays

### 📍 Milestone 3.2 — Predators & Hostile Mobs
- [ ] Expand spawner to include hostile mobs with basic stats
- [ ] Add simple AI: patrol or static guarding

### 📍 Milestone 3.3 — World Integration
- [ ] Tie mobs to region memory so they persist or respawn
- [ ] Show creature presence on zoom views with tooltips

---

## 🧙 Milestone 4 — Character Generation & Stats

### 📍 Milestone 4.1 — Character Builder
- [ ] Create `characterGenerator.js` for race, class, initial stats

### 📍 Milestone 4.2 — Attributes & UI
- [ ] Implement strength, dexterity, intelligence, health
- [ ] Display in existing character panel

### 📍 Milestone 4.3 — Persistence
- [ ] Store player character in local storage, load on start

---

## ⚔ Milestone 5 — Combat & Basic Loot

### 📍 Milestone 5.1 — Combat System
- [ ] Build `combatEngine.js` to handle turn-based attacks
- [ ] Calculate damage from player + mob stats

### 📍 Milestone 5.2 — Loot Drops
- [ ] Integrate loot drops from mobs (simple items)

### 📍 Milestone 5.3 — Combat UI & Log
- [ ] Log combat events in UI console
- [ ] Visual indicator on tiles if combat occurred
