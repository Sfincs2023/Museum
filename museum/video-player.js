const videoPlayer = document.querySelector('.video__player');
const bigButton = document.querySelector('.video__player-button');
const playButton = document.querySelector('.play-button');
const pauseButton = document.querySelector('.pause-button');
const progress = document.querySelector('.progress-video');
const volumeButton = document.querySelector('.volume-button');
const muteButton = document.querySelector('.mute-button');
const volumeSlider = document.querySelector('.progress-volume');
const fullscreenButton = document.querySelector('.full-screen-button');
const exitFullscreenButton = document.querySelector('.full-screen-exit-button');
const videoWrapper = document.querySelector('.video-container');

function playVideo() {
  videoPlayer.play();
  bigButton.classList.add('hidden');
  playButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');
}

function pauseVideo() {
  videoPlayer.pause();
  bigButton.classList.remove('hidden');
  pauseButton.classList.add('hidden');
  playButton.classList.remove('hidden');
}

videoPlayer.addEventListener('click', () => {
  if (videoPlayer.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
});

bigButton.addEventListener('click', () => {
  playVideo();
});

playButton.addEventListener('click', () => {
  playVideo();
});

pauseButton.addEventListener('click', () => {
  pauseVideo();
});

function updateProgressBackground(value) {
  const progress = document.querySelector('.progress-video');
  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

videoPlayer.addEventListener('loadedmetadata', () => {
  progress.value = 0;
  updateProgressBackground(0);
});

videoPlayer.addEventListener('timeupdate', () => {
  const progressPercent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progress.value = progressPercent;
  updateProgressBackground(progressPercent);
});

progress.addEventListener('input', () => {
  const time = (progress.value / 100) * videoPlayer.duration;
  videoPlayer.currentTime = time;
  updateProgressBackground(progressPercent);
});

videoPlayer.addEventListener('ended', () => {
  pauseVideo();
});

function toggleMute() {
  videoPlayer.muted = !videoPlayer.muted;
  volumeButton.classList.toggle('hidden');
  muteButton.classList.toggle('hidden');
}

volumeButton.addEventListener('click', toggleMute);
muteButton.addEventListener('click', toggleMute);

function updateVolumeBackground(value) {
  volumeSlider.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

volumeSlider.addEventListener('input', () => {
  const value = volumeSlider.value;
  videoPlayer.volume = volumeSlider.value / 100;
  videoPlayer.muted = videoPlayer.volume === 0;
  
  volumeButton.classList.toggle('hidden', videoPlayer.muted);
  muteButton.classList.toggle('hidden', !videoPlayer.muted);

  updateVolumeBackground(value);
});

function enterFullscreen() {
  if (videoWrapper.requestFullscreen) {
    videoWrapper.requestFullscreen();
  } else if (videoWrapper.webkitRequestFullscreen) {
    videoWrapper.webkitRequestFullscreen();
  } else if (videoWrapper.msRequestFullscreen) {
    videoWrapper.msRequestFullscreen();
  }

  fullscreenButton.classList.add('hidden');
  exitFullscreenButton.classList.remove('hidden');
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }

  fullscreenButton.classList.remove('hidden');
  exitFullscreenButton.classList.add('hidden');
}

fullscreenButton.addEventListener('click', enterFullscreen);
exitFullscreenButton.addEventListener('click', exitFullscreen);

document.addEventListener('fullscreenchange', () => {
  const isFullscreen = document.fullscreenElement === videoWrapper;
  fullscreenButton.classList.toggle('hidden', isFullscreen);
  exitFullscreenButton.classList.toggle('hidden', !isFullscreen);
});


