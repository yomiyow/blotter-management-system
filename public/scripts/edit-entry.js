async function loadBlotterForm() {

  async function fetchBlotterById() {
    const urlParams = new URLSearchParams(window.location.search);
    const blotterId = urlParams.get('blotterId');

    const response = await fetch(`/api/view-entry/edit/${blotterId}`);
    const blotterData = await response.json();

    return blotterData;
  }

  const [blotter] = await fetchBlotterById();

  // Populate complainant fields
  document.getElementById('complainant-firstname').value = blotter.complainant_firstname;
  document.getElementById('complainant-middlename').value = blotter.complainant_middlename;
  document.getElementById('complainant-lastname').value = blotter.complainant_lastname;
  document.getElementById('complainant-nickname').value = blotter.complainant_nickname;
  document.getElementById('complainant-age').value = parseInt(blotter.complainant_age);
  document.getElementById('complainant-gender').value = blotter.complainant_gender;
  document.getElementById('complainant-civil-status').value = blotter.complainant_civil_status;
  document.getElementById('complainant-citizenship').value = blotter.complainant_citizenship;
  document.getElementById('complainant-birthplace').value = blotter.complainant_birthplace;
  document.getElementById('complainant-birthdate').value = blotter.complainant_birthdate;
  document.getElementById('complainant-occupation').value = blotter.complainant_occupation;
  document.getElementById('complainant-province').value = blotter.complainant_province;
  document.getElementById('complainant-city').value = blotter.complainant_city;
  document.getElementById('complainant-barangay').value = blotter.complainant_barangay;
  document.getElementById('complainant-houseno-street').value = blotter.complainant_house_no_street;
  document.getElementById('complainant-mobile-no').value = blotter.complainant_mobile_no;
  document.getElementById('complainant-tel-no').value = blotter.complainant_tel_no;
  document.getElementById('complainant-email').value = blotter.complainant_email;

  // // Populate suspect fields
  document.getElementById('suspect-firstname').value = blotter.suspect_firstname;
  document.getElementById('suspect-middlename').value = blotter.suspect_middlename;
  document.getElementById('suspect-lastname').value = blotter.suspect_lastname;
  document.getElementById('suspect-nickname').value = blotter.suspect_nickname;
  document.getElementById('suspect-age').value = parseInt(blotter.suspect_age);
  document.getElementById('suspect-gender').value = blotter.suspect_gender;
  document.getElementById('suspect-civil-status').value = blotter.suspect_civil_status;
  document.getElementById('suspect-citizenship').value = blotter.suspect_citizenship;
  document.getElementById('suspect-birthplace').value = blotter.suspect_birthplace;
  document.getElementById('suspect-birthdate').value = blotter.suspect_birthdate;
  document.getElementById('suspect-occupation').value = blotter.suspect_occupation;
  document.getElementById('suspect-province').value = blotter.suspect_province;
  document.getElementById('suspect-city').value = blotter.suspect_city;
  document.getElementById('suspect-barangay').value = blotter.suspect_barangay;
  document.getElementById('suspect-houseno-street').value = blotter.suspect_house_no_street;
  document.getElementById('suspect-mobile-no').value = blotter.suspect_mobile_no;
  document.getElementById('suspect-tel-no').value = blotter.suspect_tel_no;
  document.getElementById('suspect-email').value = blotter.suspect_email;

  // // Populate case detail fields
  document.getElementById('street').value = blotter.street;
  document.getElementById('barangay').value = blotter.barangay;
  document.getElementById('date-time-reported').value = blotter.date_time_reported;
  document.getElementById('date-time-incident').value = blotter.date_time_incident;
  document.getElementById('narrative').value = blotter.narrative;
}

loadBlotterForm();