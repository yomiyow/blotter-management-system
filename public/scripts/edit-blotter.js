const urlParams = new URLSearchParams(window.location.search);
const blotterId = urlParams.get('blotterId');
const rank = sessionStorage.getItem('userRank');

document.addEventListener('DOMContentLoaded', () => {

  async function populateBlotterForm() {
    let blotter;
    try {
      const response = await fetch(`/api/view-blotter/edit?blotterId=${blotterId}&rank=${rank}`);
      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        window.location.href = '/nav/view-blotter';
        return;
      }
      blotter = await response.json();
    } catch (err) {
      console.error('Error populating blotter form: ', err);
      return;
    }

    // Populate complainant fields
    document.getElementById('complainant-firstname').value = blotter.comFirstname;
    document.getElementById('complainant-middlename').value = blotter.comMiddlename;
    document.getElementById('complainant-lastname').value = blotter.comLastname;
    document.getElementById('complainant-nickname').value = blotter.comNickname;
    document.getElementById('complainant-age').value = parseInt(blotter.comAge);
    document.getElementById('complainant-gender').value = blotter.comGender;
    document.getElementById('complainant-civil-status').value = blotter.comCivilStatus;
    document.getElementById('complainant-citizenship').value = blotter.comCitizenship;
    document.getElementById('complainant-birthdate').value = blotter.comBirthdate;
    document.getElementById('complainant-birthplace').value = blotter.comBirthplace;
    document.getElementById('complainant-occupation').value = blotter.comOccupation;
    document.getElementById('complainant-province').value = blotter.comProvince;
    document.getElementById('complainant-city').value = blotter.comCity;
    document.getElementById('complainant-barangay').value = blotter.comBarangay;
    document.getElementById('complainant-houseno-street').value = blotter.comHouseNoStreet;
    document.getElementById('complainant-mobile-no').value = blotter.comMobileNo;
    document.getElementById('complainant-tel-no').value = blotter.comTelNo;
    document.getElementById('complainant-email').value = blotter.comEmail;

    // Populate suspect fields
    document.getElementById('suspect-firstname').value = blotter.susFirstname;
    document.getElementById('suspect-middlename').value = blotter.susMiddlename;
    document.getElementById('suspect-lastname').value = blotter.susLastname;
    document.getElementById('suspect-nickname').value = blotter.susNickname;
    document.getElementById('suspect-age').value = parseInt(blotter.susAge);
    document.getElementById('suspect-gender').value = blotter.susGender;
    document.getElementById('suspect-civil-status').value = blotter.susCivilStatus;
    document.getElementById('suspect-citizenship').value = blotter.susCitizenship;
    document.getElementById('suspect-birthplace').value = blotter.susBirthplace;
    document.getElementById('suspect-birthdate').value = blotter.susBirthdate;
    document.getElementById('suspect-occupation').value = blotter.susOccupation;
    document.getElementById('suspect-province').value = blotter.susProvince;
    document.getElementById('suspect-city').value = blotter.susCity;
    document.getElementById('suspect-barangay').value = blotter.susBarangay;
    document.getElementById('suspect-houseno-street').value = blotter.susHouseNoStreet;
    document.getElementById('suspect-mobile-no').value = blotter.susMobileNo;
    document.getElementById('suspect-tel-no').value = blotter.susTelNo;
    document.getElementById('suspect-email').value = blotter.susEmail;

    // Populate case detail fields
    document.getElementById('street').value = blotter.street;
    document.getElementById('barangay').value = blotter.barangay;
    document.getElementById('date-time-reported').value = blotter.date_time_reported;
    document.getElementById('date-time-incident').value = blotter.date_time_incident;
    document.getElementById('narrative').value = blotter.narrative;
    document.getElementById('category').value = blotter.category;
    document.getElementById('status').value = blotter.status;
  }

  function getFormValues() {
    return {
      comFirstname: document.getElementById('complainant-firstname').value,
      comMiddlename: document.getElementById('complainant-middlename').value,
      comLastname: document.getElementById('complainant-lastname').value,
      comNickname: document.getElementById('complainant-nickname').value,
      comAge: document.getElementById('complainant-age').value,
      comGender: document.getElementById('complainant-gender').value,
      comCivilStatus: document.getElementById('complainant-civil-status').value,
      comCitizenship: document.getElementById('complainant-citizenship').value,
      comBirthdate: document.getElementById('complainant-birthdate').value,
      comBirthplace: document.getElementById('complainant-birthplace').value,
      comOccupation: document.getElementById('complainant-occupation').value,
      comProvince: document.getElementById('complainant-province').value,
      comCity: document.getElementById('complainant-city').value,
      comBarangay: document.getElementById('complainant-barangay').value,
      comHouseNoStreet: document.getElementById('complainant-houseno-street').value,
      comMobileNo: document.getElementById('complainant-mobile-no').value,
      comTelNo: document.getElementById('complainant-tel-no').value,
      comEmail: document.getElementById('complainant-email').value,

      susFirstname: document.getElementById('suspect-firstname').value,
      susMiddlename: document.getElementById('suspect-middlename').value,
      susLastname: document.getElementById('suspect-lastname').value,
      susNickname: document.getElementById('suspect-nickname').value,
      susAge: document.getElementById('suspect-age').value,
      susGender: document.getElementById('suspect-gender').value,
      susCivilStatus: document.getElementById('suspect-civil-status').value,
      susCitizenship: document.getElementById('suspect-citizenship').value,
      susBirthplace: document.getElementById('suspect-birthplace').value,
      susBirthdate: document.getElementById('suspect-birthdate').value,
      susOccupation: document.getElementById('suspect-occupation').value,
      susProvince: document.getElementById('suspect-province').value,
      susCity: document.getElementById('suspect-city').value,
      susBarangay: document.getElementById('suspect-barangay').value,
      susHouseNoStreet: document.getElementById('suspect-houseno-street').value,
      susMobileNo: document.getElementById('suspect-mobile-no').value,
      susTelNo: document.getElementById('suspect-tel-no').value,
      susEmail: document.getElementById('suspect-email').value,

      street: document.getElementById('street').value,
      barangay: document.getElementById('barangay').value,
      dateTimeReported: document.getElementById('date-time-reported').value,
      dateTimeIncident: document.getElementById('date-time-incident').value,
      narrative: document.getElementById('narrative').value,
      category: document.getElementById('category').value,
      status: document.getElementById('status').value
    }
  }

  populateBlotterForm();

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

  // Event listener
  document.querySelector('form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();

      const updatedBlotter = getFormValues();

      try {
        const response = await fetch(`/api/view-blotter/edit/${blotterId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedBlotter)
        });

        const result = await response.json();
        if (!response.ok) {
          alert(result.error);
          return;
        } else {
          showAlert(document.querySelector('.alert-success'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

      } catch (err) {
        console.error('Error updating blotter: ', err);
      }
    });

  document.querySelector('form')
    .addEventListener('reset', () => {
      populateBlotterForm();
    });
});
