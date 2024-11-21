const dropdown = document.querySelector('.dropdown-menu');
const profile = document.querySelector('.icon-wrapper');
profile.addEventListener('click', () => dropdown.classList.toggle('show'));

document.addEventListener('click', (event) => {
  if (!event.target.closest('.icon-wrapper')) dropdown.classList.remove('show');
});