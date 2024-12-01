document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.toggle-btn');
  const sideNav = document.querySelector('.side-nav');
  const mainContent = document.querySelector('.main-content');

  // Retrieve the state from localStorage and set the initial state
  const savedState = localStorage.getItem('sideNavState');
  sideNav.dataset.state = savedState;
  const size = (savedState === 'open') ? '15rem' : '44px';

  sideNav.style.minWidth = size;
  sideNav.style.width = size;
  mainContent.style.marginLeft = size; ``

  toggle.addEventListener('click', () => {
    const isOpen = sideNav.dataset.state === 'open';
    const newState = isOpen ? 'close' : 'open';
    sideNav.dataset.state = newState;
    const size = (newState === 'open') ? '15rem' : '44px';

    sideNav.style.minWidth = size;
    sideNav.style.width = size;
    mainContent.style.marginLeft = size;

    // Save the state to localStorage
    localStorage.setItem('sideNavState', newState);
  });
});