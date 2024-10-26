document.addEventListener("DOMContentLoaded", function () {
  function updateTime() {
    const currentTimeElement = document.getElementById("currentTime");
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    currentTimeElement.textContent = `${hours}:${minutes}`;
  }

  updateTime();

  setInterval(updateTime, 60000);
});
