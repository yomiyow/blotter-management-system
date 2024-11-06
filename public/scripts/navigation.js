/*======================================================
                Side navigation
======================================================*/
document.addEventListener('DOMContentLoaded', () => {

  const toggle = document.querySelector('.toggle-btn');
  const sideNav = document.querySelector('.side-nav');

  toggle.addEventListener('click', () => {
    const isOpen = sideNav.classList.toggle('isOpen');
    sideNav.style.minWidth = isOpen ? '15rem' : '44px';
    sideNav.style.width = isOpen ? '15rem' : '44px';
    sideNav.classList.toggle('isClose', !isOpen);
  });

  const menus = document.querySelectorAll('.menu-link');

  menus.forEach((menu) => {
    menu.addEventListener('click', (event) => {
      // event.preventDefault();

      menus.forEach((menu) => menu.classList.remove('isActive'));
      menu.classList.add('isActive');

      const pageURL = menu.getAttribute('href');
      window.history.pushState({ pageURL }, '', pageURL);
    });
  });
});

