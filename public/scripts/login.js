// show password event handler
const passwordField = document.getElementById('password');
const passwordToggle = document.querySelector('.js-password-toggle');

passwordToggle.addEventListener('click', () => {
  const isPassword = (passwordField.type === 'password');
  passwordField.type = isPassword ? 'text' : 'password';
  passwordToggle.textContent = isPassword ? 'Hide' : 'Show';
});

// login button event handler

document.querySelector('form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { email: email, password: password }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (!response.ok) {
        alert(result.error);
      } else {
        sessionStorage.setItem('userEmail', email);
        window.location.href = '/nav/dashboard';
      }

    } catch (err) {
      console.error(err);
    }
  }) 