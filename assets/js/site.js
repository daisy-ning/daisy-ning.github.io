// Home page video: start the animation automatically and give visitors a pause button.
(function () {
  var video = document.getElementById("feature-video");
  var button = document.getElementById("video-toggle");
  if (!video) return;

  // Browsers only allow autoplay for muted video, so set it explicitly before playing.
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");

  function label() {
    if (!button) return;
    button.textContent = video.paused ? "Play" : "Pause";
    button.setAttribute("aria-label", video.paused ? "Play animation" : "Pause animation");
  }

  function start() {
    var p = video.play();
    if (p && p.catch) p.catch(function () { label(); });
  }

  if (video.readyState >= 2) start();
  else video.addEventListener("canplay", start, { once: true });

  // If the visitor scrolls away and back, keep it playing unless they paused it.
  var userPaused = false;
  if (button) {
    button.addEventListener("click", function () {
      if (video.paused) { userPaused = false; video.play(); }
      else { userPaused = true; video.pause(); }
    });
  }
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && video.paused && !userPaused) start();
  });

  video.addEventListener("play", label);
  video.addEventListener("pause", label);
  label();
})();
