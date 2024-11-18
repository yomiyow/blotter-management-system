const passwordField = document.getElementById('password');
const passwordToggle = document.querySelector('.js-password-toggle');

passwordToggle.addEventListener('click', () => {
  const isPassword = (passwordField.type === 'password');
  passwordField.type = isPassword ? 'text' : 'password';
  passwordToggle.textContent = isPassword ? 'Hide' : 'Show';
});