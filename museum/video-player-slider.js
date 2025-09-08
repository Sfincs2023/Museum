document.addEventListener('DOMContentLoaded', function () {
  const vItems = Array.from(document.querySelectorAll('.video__list-item'));
  const dots = Array.from(document.querySelectorAll('.list-slider__button'));
  const arrowLeft = document.querySelector('.list-slider__arrow-left');
  const arrowRight = document.querySelector('.list-slider__arrow-right');

  const mainVideo = document.querySelector('.video__player');

  const total = vItems.length;
  if (total === 0) return;

  const videoSources = [
    'assets/video/video0.mp4',
    'assets/video/video1.mp4',
    'assets/video/video2.mp4',
    'assets/video/video3.mp4',
    'assets/video/video4.mp4'
  ];

  const posterSources = [
    'assets/video/poster0.jpg',
    'assets/video/poster1.jpg',
    'assets/video/poster2.jpg',
    'assets/video/poster3.jpg',
    'assets/video/poster4.jpg'
  ];

  let currentFirst = 0;
  let visibleCount = 3;

  function updateVisibleCount() {
    const w = window.innerWidth;
    visibleCount = w < 900 ? 2 : 3;
  }

  function updateView() {
    vItems.forEach((el, i) => {
      const rel = (i - currentFirst + total) % total;
      el.style.order = rel;
      if (rel < visibleCount) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    dots.forEach(dot => dot.classList.remove('checked'));
    if (dots[currentFirst]) dots[currentFirst].classList.add('checked');

    if (videoSources[currentFirst]) {
      mainVideo.src = videoSources[currentFirst];
      mainVideo.poster = posterSources[currentFirst];
    }
  }

  function onResize() {
    updateVisibleCount();
    updateView();
  }

  if (arrowRight) {
    arrowRight.addEventListener('click', () => {
      currentFirst = (currentFirst + 1) % total;
      updateView();
    });
  }

  if (arrowLeft) {
    arrowLeft.addEventListener('click', () => {
      currentFirst = (currentFirst - 1 + total) % total;
      updateView();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentFirst = idx % total;
      updateView();
    });
  });

  window.addEventListener('resize', onResize);

  updateVisibleCount();
  updateView();
});