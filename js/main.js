window.onload = function() {
    const player = document.getElementById("player");
    const btnPlay = document.getElementById("btnPlay");
    const icon = btnPlay.querySelector("i");
    const currentTime = document.querySelector(".current-time");
    const progress = document.querySelector(".progress .played");

    player.addEventListener("timeupdate", function() {
      currentTime.innerHTML = formatTime(player.currentTime);
      progress.style.width = (player.currentTime / player.duration) * 100 + "%";
    });
  
    btnPlay.addEventListener("click", function() {
      if (player.paused) {
        player.play();
        icon.innerHTML = "pause";
      } else {
        player.pause();
        icon.innerHTML = "play_arrow";
      }
    });
  
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
  }
  