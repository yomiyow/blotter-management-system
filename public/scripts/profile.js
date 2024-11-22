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

  // Handle form submission
  document.querySelector('.personal-info-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('Form submitted');

    })

  // Handle avatar file upload
  const uploadImage = document.getElementById('avatar');
  const avatarPreview = document.querySelector('.avatar-preview');

  uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.src = e.target.result;
        avatarPreview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    }
  });

});

function populateFormFields(accountInfo) {
  document.getElementById('firstname').value = accountInfo.firstname;
  document.getElementById('middlename').value = accountInfo.middlename;
  document.getElementById('lastname').value = accountInfo.lastname;
  document.getElementById('gender').value = accountInfo.gender;
  document.getElementById('birthdate').value = accountInfo.birthdate;
  document.getElementById('civil-status').value = accountInfo.civil_status;
  document.getElementById('address').value = accountInfo.address;
  document.getElementById('email').value = accountInfo.email;
  document.getElementById('contact').value = accountInfo.contact_no;
}