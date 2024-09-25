function playVideo() {
  const { video, playButton } = this;
  video.play();
  playButton.classList.add("playing");
  playButton.classList.remove("paused");
}

function pauseVideo() {
  const { video, playButton } = this;
  video.pause();
  playButton.classList.add("paused");
  playButton.classList.remove("playing");
}

function togglePlay() {
  const { video } = this;
  if (video.paused) {
    this.playVideo();
  } else {
    this.pauseVideo();
  }
}

const simpleVideoContainers = document.querySelectorAll(".simple-video");

simpleVideoContainers.forEach(function assignVideoListeners(svc) {
  const video = svc.querySelector("video");
  const playButton = svc.querySelector(".play-button");
  const videoObj = { video, playButton, playVideo, pauseVideo, togglePlay };

  // Add listeners to the play button so playback can be toggled
  // with a click or the Space bar.
  playButton.addEventListener("click", togglePlay.bind(videoObj));
  playButton.addEventListener("keydown", (e) => {
    if (e.key === "space") togglePlay.bind(videoObj);
  });

  // Add event listener to pause the video when it ends.
  video.addEventListener("ended", pauseVideo.bind(videoObj));
});
