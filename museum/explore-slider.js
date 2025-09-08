const container = document.querySelector('.explore__slider-container');

document.querySelector('.explore__slider').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
})