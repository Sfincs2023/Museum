let items = document.querySelectorAll('.welcome__slider');
let boxes = document.querySelectorAll('.checkbox-img');
let imgNum = document.querySelector('.pagination-img__current-slide');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  })
  boxes[currentItem].classList.remove('checked');
  imgNum.innerHTML = '';
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  })
  boxes[currentItem].classList.add('checked');
  imgNum.innerHTML = `0${currentItem + 1}`;
}

function previousItem(n) {
  hideItem(hideItem('to-right'))
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem(hideItem('to-left'));
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.arrow-left').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
})

document.querySelector('.arrow-right').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
})

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if(index > currentItem) {
      nextItem(index - 1);
    } else if(index < currentItem) {
      previousItem(index + 1);
    }
  });
});

const swipedetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 100;
  let restraint = 100;
  let allowedTime = 500;

  surface.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  })

  surface.addEventListener('mouseup', function(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if(elapsedTime <= allowedTime) {
      if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if(distX > 0) {
          if(isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if( isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  })

  // surface.addEventListener('touchstart', function(e) {
  //   let touchObj = e.changedTouches[0];
  //   startX = touchObj.pageX;
  //   startY = touchObj.pageY;
  //   startTime = new Date().getTime();
  //   e.preventDefault();
  // })

  // surface.addEventListener('touchmove', function(e) {
  //   e.preventDefault();
  // })

  // surface.addEventListener('touchend', function(e) {
  //   let touchObj = e.changedTouches[0];
  //   distX = touchObj.pageX - startX;
  //   distY = touchObj.pageY - startY;
  //   elapsedTime = new Date().getTime() - startTime;

  //   if(elapsedTime <= allowedTime) {
  //     if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
  //       if(distX > 0) {
  //         if(isEnabled) {
  //           previousItem(currentItem);
  //         }
  //       } else {
  //         if( isEnabled) {
  //           nextItem(currentItem);
  //         }
  //       }
  //     }
  //   }

  //   e.preventDefault();
  // })
}

let el = document.querySelector('.welcome__img');

swipedetect(el);