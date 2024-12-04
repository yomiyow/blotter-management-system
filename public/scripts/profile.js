document.addEventListener('DOMContentLoaded', async () => {
  const email = sessionStorage.getItem('userEmail');
  let accountInfo = {};
  try {
    const response = await fetch('/api/account-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      return;
    }
    [accountInfo] = await response.json();

  } catch (err) {
    console.error(err);
    return;
  }

  populateFormFields(accountInfo);

  // Update Account Info
  document.querySelector('.personal-info-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const url = `/api/account-info/update?email=${encodeURIComponent(email)}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message);
        return;
      } else {
        showAlert(document.querySelector('.alert-success'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })
});

let alertTimeout;
function showAlert(alertElement) {
  alertElement.style.display = 'block';
  if (alertTimeout) {
    clearTimeout(alertTimeout);
  }
  alertTimeout = setTimeout(() => {
    alertElement.style.display = 'none';
  }, 5000);
}

function populateFormFields(accountInfo) {
  document.getElementById('firstname').value = accountInfo.firstname;
  document.getElementById('middlename').value = accountInfo.middlename;
  document.getElementById('lastname').value = accountInfo.lastname;
  document.getElementById('gender').value = accountInfo.gender ||
    document.getElementById('gender').options[0].value;
  document.getElementById('birthdate').value = accountInfo.birthdate;
  document.getElementById('civilStatus').value = accountInfo.civil_status ||
    document.getElementById('civilStatus').options[0].value;
  document.getElementById('rank').value = accountInfo.rank;
  document.getElementById('address').value = accountInfo.address;
  document.getElementById('email').value = accountInfo.email;
  document.getElementById('contact').value = accountInfo.contact_no;
  document.querySelector('.avatar-preview').src = accountInfo.avatar_path
    ? `/images/avatar/${accountInfo.avatar_path}`
    : `/images/avatar/default-avatar.png`;

  // Show avatar preview
  const uploadImage = document.getElementById('avatar');
  const avatarPreview = document.querySelector('.avatar-preview');
  uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => avatarPreview.src = e.target.result;
      reader.readAsDataURL(file);
    }
  });
}