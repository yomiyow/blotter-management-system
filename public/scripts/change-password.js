import isValidPassword from '../utils/password.js'

document.addEventListener('DOMContentLoaded', () => {
  // show password event handler
  const passwordFields = document.querySelectorAll('input[type="password"]');
  const passwordToggles = document.querySelectorAll('.js-password-toggle');

  passwordToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
      const field = passwordFields[index];
      const isPassword = (field.type === 'password');
      field.type = (isPassword) ? 'text' : 'password';
      toggle.textContent = (isPassword) ? 'Hide' : 'Show';
    });
  });

  // Get the email of the current login user
  const userEmail = sessionStorage.getItem('userEmail');

  document.querySelector('.change-password-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();

      const currentPassword = document.getElementById('current-password').value.trim();
      const newPassword = document.getElementById('new-password').value.trim();
      const confirmPassword = document.getElementById('confirm-password').value.trim();

      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }

      if (!isValidPassword(newPassword)) {
        alert('Password must be at least 8 characters long and contain both letters and numbers.');
        return;
      }

      try {
        const response = await fetch('api/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail, currentPassword, newPassword })
        });

        const result = await response.json();
        if (!response.ok) {
          alert(result.message);
        } else {
          alert(result.message);
          document.getElementById('current-password').value = '';
          document.getElementById('new-password').value = '';
          document.getElementById('confirm-password').value = '';
        }

      } catch (err) {
        console.error(err);
      }
    });
});

