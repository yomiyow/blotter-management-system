document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.js-prev-btn');
  const nextButton = document.querySelector('.js-next-btn');
  const submitButton = document.querySelector('.js-submit-btn');
  const forms = document.querySelectorAll('.js-form-step');
  const tabs = document.querySelectorAll('.js-tab');

  let currentFormIndex = 0;
  const COMPLAINANT_FORM_INDEX = 0;
  const LAST_FORM_INDEX = forms.length - 1;
  const ACTIVE_TAB_COLOR = '#007bff';
  const ACTIVE_TEXT_COLOR = 'white';
  const INACTIVE_TAB_COLOR = 'white';
  const INACTIVE_TEXT_COLOR = '#444444';

  function updateFormVisibility() {
    forms.forEach((form, formIndex) => {
      const isFormVisible = (formIndex === currentFormIndex);
      form.style.display = isFormVisible ? 'flex' : 'none';
    });

    tabs.forEach((tab, index) => {
      const isTabActive = (index === currentFormIndex);
      tab.style.backgroundColor = isTabActive ? ACTIVE_TAB_COLOR : INACTIVE_TAB_COLOR;
      tab.style.color = isTabActive ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR;
    });
  }

  function collectFormData() {
    const formData = {};
    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach((input) => {
        formData[input.name] = input.value;
      });
    });

    return formData;
  }

  function isCurrentFormValid() {
    const currentForm = forms[currentFormIndex];
    const inputs = currentForm.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
      }
    });

    return isValid;
  }

  function setButtonEnableState(button, enable = true) {
    if (enable) {
      button.classList.remove('disabled');
    } else {
      button.classList.add('disabled');
    }
  }

  function resetForm() {
    currentFormIndex = 0;
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach((formField) => {
      formField.value = '';
    });
    updateFormVisibility();
    setButtonEnableState(prevButton, false)
    setButtonEnableState(nextButton);
    submitButton.style.display = 'none';
  }

  let alertTimeout;

  function showAlert(alertElement) {
    alertElement.style.display = 'block';
    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }
    alertTimeout = setTimeout(() => {
      alertElement.style.display = 'none';
    }, 4000);
  }

  // Display complainant form by default
  updateFormVisibility();

  // Disable previous button by default
  setButtonEnableState(prevButton, false);

  // Event Listeners

  prevButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (currentFormIndex > COMPLAINANT_FORM_INDEX) {
      currentFormIndex--;
      updateFormVisibility();

      setButtonEnableState(nextButton);
      submitButton.style.display = 'none';
    }

    if (currentFormIndex === COMPLAINANT_FORM_INDEX) {
      setButtonEnableState(prevButton, false);
    }
  });

  nextButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (!isCurrentFormValid()) {
      showAlert(document.querySelector('.alert-warning'));
      return;
    }

    if (currentFormIndex < LAST_FORM_INDEX) {
      currentFormIndex++;
      updateFormVisibility();

      setButtonEnableState(prevButton);
    }

    if (currentFormIndex === LAST_FORM_INDEX) {
      setButtonEnableState(nextButton, false);
      submitButton.style.display = 'block';
    }
  });

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!isCurrentFormValid()) {
      showAlert(document.querySelector('.alert-warning'));
      return;
    }

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
        resetForm();
      } else {
        alert(result.error);
      }

    } catch (err) {
      console.error('Error creating blotter: ', err);
    }
  });
});