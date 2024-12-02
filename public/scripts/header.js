document.addEventListener('DOMContentLoaded', async () => {
  const dropdown = document.querySelector('.dropdown-menu');
  const profile = document.querySelector('.icon-wrapper');
  const email = sessionStorage.getItem('userEmail');

  profile.addEventListener('click', () => dropdown.classList.toggle('show'));

  document.querySelector('a[href="/logout"]')
    .addEventListener('click', () => sessionStorage.clear());

  // Hide dropdown menu when clicking outside of the profile icon
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.icon-wrapper'))
      dropdown.classList.remove('show');
  });


  // Replace the default profile icon with the user's avatar image
  try {
    const response = await fetch('/api/account-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const [account] = await response.json();

    if (account.avatar_path) {
      const avatarPath = `/images/avatar/${account.avatar_path}`;
      document.querySelector('.icon-wrapper').innerHTML = `
        <img src="${avatarPath}" alt="User Avatar" class="avatar" >
      `;
    }
  } catch (error) {
    console.error('Error fetching account info:', error);
  }

});