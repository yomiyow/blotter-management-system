document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.js-prev-btn');
  const nextButton = document.querySelector('.js-next-btn');
  const submitButton = document.querySelector('.js-submit-btn');
  const forms = document.querySelectorAll('.js-form-step');
  const tabs = document.querySelectorAll('.js-tab');

  let currentFormIndex = parseInt(localStorage.getItem('currentForm')) || 0;
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

  // Event Listeners

  prevButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (currentFormIndex > COMPLAINANT_FORM_INDEX) {
      currentFormIndex--;
      updateFormVisibility();
      localStorage.setItem('currentForm', currentFormIndex);
    }
  });

  nextButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (currentFormIndex < LAST_FORM_INDEX) {
      currentFormIndex++;
      updateFormVisibility();
      localStorage.setItem('currentForm', currentFormIndex);
    }
  });

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('/new-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collectFormData())

    }).then((response => response.json()))
      .then((result) => console.log('Result: ', result))
      .catch((err) => console.log('Fetch error: ', err));

  });

  // Display complainant form by default
  updateFormVisibility();
});