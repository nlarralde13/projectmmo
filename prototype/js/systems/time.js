export function initTime() {
  const uiBar = document.getElementById("time");
  if (!uiBar) {
    console.error("CRITICAL: #time element not found in DOM.");
    return;
  }

  let hours = 8;
  let day = 1;

  function updateTime() {
    hours += 1;
    if (hours >= 24) {
      hours = 0;
      day += 1;
    }
    uiBar.textContent = `Day ${day}, ${hours}:00`;
  }

  updateTime(); // initial display
  setInterval(updateTime, 2000); // tick every 2 seconds
}
