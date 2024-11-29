document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  function collectFormData() {
    const formData = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });

    return formData;
  }

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

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/add-blotter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectFormData())
      });

      const result = await response.json();
      if (result.success) {
        showAlert(document.querySelector('.alert-success'));
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(result.error);
      }

    } catch (err) {
      console.error('Error creating blotter: ', err);
    }
  });
})

