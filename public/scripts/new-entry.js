const prevButtons = document.querySelectorAll('.js-prev-btn');
const nextButtons = document.querySelectorAll('.js-next-btn');
const forms = document.querySelectorAll('.js-entry-form');
const tabs = document.querySelectorAll('.js-tab');

let currentFormIndex = 0;
const COMPLAINANT_FORM_INDEX = 0;
const LAST_FORM_INDEX = forms.length - 1;

// Function to update form visibility
function updateFormVisibility() {
  forms.forEach((form, formIndex) => {
    form.style.display = (formIndex === currentFormIndex) ? 'flex' : 'none';
  });

  tabs.forEach((tab, index) => {
    tab.style.backgroundColor = (index === currentFormIndex) ? '#007bff' : 'white';
    tab.style.color = (index === currentFormIndex) ? 'white' : '#444444';
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
    }
  });
});

nextButtons.forEach((nextButton) => {
  nextButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (currentFormIndex < LAST_FORM_INDEX) {
      currentFormIndex++;
      updateFormVisibility();
    }
  });
});



