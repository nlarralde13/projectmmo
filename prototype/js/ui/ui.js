export function initUI() {
  const infoDiv = document.getElementById("info");
  infoDiv.textContent = "You stand on an empty field.";

  addLog("Game started");
}

// 🔥 make sure addLog is outside
export function addLog(message) {
  const logDiv = document.getElementById("log");
  const p = document.createElement("p");
  p.textContent = message;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}
