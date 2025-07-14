import { player } from '../player/player.js';

export function generateInventory() {
  // This just ensures player starts with some items
  // (In practice, your createNewCharacter already sets this up.)
  
  if (!player.inventory || player.inventory.length === 0) {
    player.inventory = ["Rusty Dagger", "Rabbit Jerky"];
  }

  console.log("Player inventory initialized:", player.inventory);
}
