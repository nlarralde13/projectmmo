export function renderCalendar(viewPort) {
  if (!viewPort) {
    console.error("CRITICAL: #view-port not found in DOM.");
    return;
  }

  viewPort.innerHTML = `
    <div style="padding:20px; color:#fff;">
      <h2>In-Game Calendar</h2>
      <p>Upcoming events will appear here.</p>
      <p>Future: will connect to server-side master calendar to sync world events.</p>
    </div>
  `;
  viewPort.style.display = "block";
}
