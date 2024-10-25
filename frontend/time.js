document.addEventListener("DOMContentLoaded", function () {
  function updateTime() {
    const currentTimeElement = document.getElementById("currentTime");
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // 현재 시간을 시:분 형식으로
    currentTimeElement.textContent = `${hours}:${minutes}`;
  }

  updateTime();

  // 1분마다 시간 업데이트
  setInterval(updateTime, 60000); // 60000 밀리초 = 1분
});
