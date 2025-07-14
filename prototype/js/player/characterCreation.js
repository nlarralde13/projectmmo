import { player } from './player.js';
import { addLog } from '../ui/ui.js';

export function startCharacterCreation(inputEl, charPanel) {
  if (!inputEl) return;

  inputEl.placeholder = "Enter your character name...";
  let creatingCharacter = true;

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const inputValue = inputEl.value.trim();
      if (inputValue !== "") {
        if (creatingCharacter) {
          createNewCharacter(inputValue);
          renderCharacterPanel(charPanel);
          addLog(`Welcome, ${player.name}! Your adventure begins.`);
          creatingCharacter = false;
          inputEl.placeholder = "Enter command...";
          inputEl.value = "";
        }
      }
    }
  });
}

export function createNewCharacter(name = "New Adventurer") {
  player.name = name;
  player.stats.strength = rollStat();
  player.stats.agility = rollStat();
  player.stats.intelligence = rollStat();
  player.stats.stamina = rollStat();
  player.skills = ["Foraging", "Tracking"];
  player.inventory = ["Rusty Dagger", "Rabbit Jerky"];
  player.equipped.weapon = "Rusty Dagger";

  console.log("Character created:", player);
}

function rollStat() {
  return Math.floor(Math.random() * 4) + 3; // 3-6
}

export function renderCharacterPanel(panel) {
  if (!panel) return;
  panel.innerHTML = `
    <h3>${player.name}</h3>
    <p><strong>Stats:</strong></p>
    <ul>
      <li>STR: ${player.stats.strength}</li>
      <li>AGI: ${player.stats.agility}</li>
      <li>INT: ${player.stats.intelligence}</li>
      <li>STA: ${player.stats.stamina}</li>
    </ul>
    <p><strong>Skills:</strong> ${player.skills.join(", ")}</p>
    <p><strong>Equipped:</strong></p>
    <ul>
      <li>Weapon: ${player.equipped.weapon ?? "None"}</li>
      <li>Armor: ${player.equipped.armor ?? "None"}</li>
    </ul>
    <p><strong>Inventory:</strong> ${player.inventory.join(", ")}</p>
  `;
}

export function renderCharacterInfoScreen(viewPort) {
  if (!viewPort) {
    console.error("CRITICAL: #view-port not found in DOM.");
    return;
  }

  viewPort.innerHTML = `
    <div style="padding:20px; color:#fff;">
      <h2>${player.name}</h2>
      <p><strong>Stats:</strong></p>
      <ul>
        <li>STR: ${player.stats.strength}</li>
        <li>AGI: ${player.stats.agility}</li>
        <li>INT: ${player.stats.intelligence}</li>
        <li>STA: ${player.stats.stamina}</li>
      </ul>
      <p><strong>Skills:</strong> ${player.skills.join(", ")}</p>
      <p><strong>Equipped:</strong> ${player.equipped.weapon ?? "None"}</p>
      <p><strong>Inventory:</strong> ${player.inventory.join(", ")}</p>
    </div>
  `;
  viewPort.style.display = "block";
}

