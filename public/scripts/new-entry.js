document.addEventListener('DOMContentLoaded', () => {
  const prevButtons = document.querySelectorAll('.js-prev-btn');
  const nextButtons = document.querySelectorAll('.js-next-btn');
  const forms = document.querySelectorAll('.js-form-step');
  const tabs = document.querySelectorAll('.js-tab');

  let currentFormIndex = parseInt(localStorage.getItem('currentForm')) || 0;
  const COMPLAINANT_FORM_INDEX = 0;
  const LAST_FORM_INDEX = forms.length - 1;

  // Function to update form visibility
  function updateFormVisibility() {
    forms.forEach((form, formIndex) => {
      const isFormVisible = (formIndex === currentFormIndex);
      form.style.display = isFormVisible ? 'flex' : 'none';
    });

    tabs.forEach((tab, index) => {
      const isTabActive = (index === currentFormIndex);
      tab.style.backgroundColor = isTabActive ? '#007bff' : 'white';
      tab.style.color = isTabActive ? 'white' : '#444444';
    });
  }

  // Display complainant form by default
  updateFormVisibility();

  prevButtons.forEach((prevButton) => {
    prevButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (currentFormIndex > COMPLAINANT_FORM_INDEX) {
        currentFormIndex--;
        updateFormVisibility();
        localStorage.setItem('currentForm', currentFormIndex);
      }
    });
  });

  nextButtons.forEach((nextButton) => {
    nextButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (currentFormIndex < LAST_FORM_INDEX) {
        currentFormIndex++;
        updateFormVisibility();
        localStorage.setItem('currentForm', currentFormIndex);
      }
    });
  });
});