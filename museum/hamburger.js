const btnHamburger = document.querySelector('.hamburger');
const modalMenuTable = document.querySelector('.modal-menu-table');
const modalMenuPhone = document.querySelector('.modal-menu-mobile');
const btnCross = document.querySelector('.hamburger-cross');
const welcome = document.querySelector('.welcome__content');
const body = document.body;

const closeMenu = () => {
    btnHamburger.style.display = 'flex';
    btnCross.style.display = 'none';
    welcome.style.display = "block";
    modalMenuTable.classList.remove('show');
    modalMenuPhone.classList.remove('show');
    // body.classList.remove('no-scroll');
};

btnHamburger.addEventListener('click', () => {
    btnHamburger.style.display = 'none';
    btnCross.style.display = 'block';
    welcome.style.display = "none";
    // body.classList.toggle('no-scroll');

    if (window.innerWidth <= 768) {
        modalMenuPhone.classList.add('show');
    } else {
        modalMenuTable.classList.add('show');
    }
});

document.addEventListener('click', (event) => {
  const clickedInsideMenu = event.target.closest('.modal-menu-table');
  const clickedHamburger = event.target.closest('.hamburger');

  if (!clickedInsideMenu && !clickedHamburger) {
    closeMenu();
  }
});

modalMenuTable.addEventListener('click', (event) => {
    if (event.target.closest('.header__nav-link')) {
        closeMenu();
    }
});

btnCross.addEventListener('click', (event) => {
    if (event.target.closest('.hamburger-cross')) {
        closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
        btnHamburger.style.display = 'none';
        btnCross.style.display = 'none';
        welcome.style.display = "block";
        modalMenuTable.classList.remove('show');
        body.classList.remove('no-scroll');
    } else {
        btnHamburger.style.display = 'flex';
    }
});