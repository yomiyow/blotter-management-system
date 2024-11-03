/*======================================================
                Side navigation
======================================================*/

const toggle = document.querySelector('.toggle-btn');
const sideNav = document.querySelector('.side-nav');

toggle.addEventListener('click', () => {
  const isOpen = sideNav.classList.toggle('isOpen');
  sideNav.style.minWidth = isOpen ? '15rem' : '44px';
  sideNav.style.width = isOpen ? '15rem' : '44px';
  sideNav.classList.toggle('isClose', !isOpen);
});