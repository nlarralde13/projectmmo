// /js/player/player.js
export const player = {
  name: "New Adventurer",
  stats: {
    strength: 0,
    agility: 0,
    intelligence: 0,
    stamina: 0
  },
  skills: [],
  inventory: [],
  equipped: {
    weapon: null,
    armor: null
  }
};

export function createNewCharacter(name = "New Adventurer") {
  player.name = name;

  // Assign random stats (3-6 for prototype simplicity)
  player.stats.strength = rollStat();
  player.stats.agility = rollStat();
  player.stats.intelligence = rollStat();
  player.stats.stamina = rollStat();

  // Starting skills
  player.skills = ["Foraging", "Tracking"];

  // Starting inventory
  player.inventory = ["Rusty Dagger", "Rabbit Jerky"];
  player.equipped.weapon = "Rusty Dagger";

  console.log("Character created:", player);
}

function rollStat() {
  return Math.floor(Math.random() * 4) + 3; // 3-6
}
