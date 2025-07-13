export function initTime() {
    const uiBar = document.getElementById("ui-bar");
    let hours = 8 //starts at 8 AM

    function updateTime() {
        hours = (hours + 1 ) % 24;
        uiBar.textContent = `Day 1, ${hours}:00`;
    }

    updateTime();                   //show immediately
    setInterval(updateTime, 2000);  //advance time every 2 sec
}