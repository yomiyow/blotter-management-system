document.addEventListener('DOMContentLoaded', () => {
  const passwordField = document.getElementById('password');
  const passwordToggle = document.querySelector('.js-password-toggle');

  passwordToggle.addEventListener('click', () => {
    const isPassword = (passwordField.type === 'password');
    passwordField.type = isPassword ? 'text' : 'password';
    passwordToggle.textContent = isPassword ? 'Hide' : 'Show';
  });

  document.querySelector('form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();

      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const rank = document.getElementById('rank').value;

      const formData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        rank: rank
      }

      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        const result = await response.json();

        if (!response.ok) {
          alert(result.error);
        } else {
          alert(result.message);
          window.location.href = '/login';
        }

      } catch (err) {
        console.error(err);
      }

      console.log(formData);
    });
});
