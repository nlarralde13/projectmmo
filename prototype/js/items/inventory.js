export function generateInventory() {
  const inventoryList = document.getElementById("inventory-list");

  if (!inventoryList) {
    console.error("CRITICAL: #inventory-list not found in DOM.");
    return;
  }

  const items = [
    { name: "Worn Leather Boots", desc: "Sturdy enough for long travels." },
    { name: "Rusty Dagger", desc: "Has seen many battles, still sharp." },
    { name: "Silver Coin Pouch", desc: "Contains a few silver coins." },
    { name: "Healing Potion", desc: "Restores minor wounds." },
    { name: "Traveler's Map", desc: "Hand-drawn routes through forests." },
    { name: "Torch", desc: "Provides light for exploring caves." },
    { name: "Lockpick Set", desc: "Used for opening tricky chests." },
    { name: "Spell Scroll", desc: "Arcane runes glow faintly." },
    { name: "Wooden Shield", desc: "Scarred from past battles." },
    { name: "Rabbit Jerky", desc: "Dried meat for the road." }
  ];

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.title = item.desc;
    inventoryList.appendChild(li);
  });
}
