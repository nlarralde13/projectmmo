export function initTime() {
  const timeBtn = document.getElementById("time-btn");
  if (!timeBtn) {
    console.error("CRITICAL: #time-btn element not found in DOM.");
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
    timeBtn.textContent = `Day ${day}, ${hours}:00`;
  }

  updateTime();
  setInterval(updateTime, 300000); //300k MS = 5 min : game
}
