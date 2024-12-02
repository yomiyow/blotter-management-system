document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown-menu');
  const profile = document.querySelector('.icon-wrapper');

  profile.addEventListener('click', () => dropdown.classList.toggle('show'));

  document.querySelector('a[href="/logout"]')
    .addEventListener('click', () => sessionStorage.clear());

  // Hide dropdown menu when clicking outside of the profile icon
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.icon-wrapper'))
      dropdown.classList.remove('show');
  });
});