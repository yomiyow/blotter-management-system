import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function renderBlotterRecords() {

  async function fetchBlotterData() {
    try {
      const response = await fetch('/view-entry');
      const blottersData = response.json();

      return blottersData;
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }

  let blotters = await fetchBlotterData();

  let blotterHTML = '';

  blotters.forEach((blotter) => {
    const formattedDate = dayjs(blotter.date_time_reported).format('MMM D, YYYY h:mm A');
    blotterHTML += `
      <tr>
        <td>${blotter.blotter_id}</td>
        <td>${formattedDate}</td>
        <td>${blotter.complainant_fullname}</td>
        <td>${blotter.suspect_fullname}</td>
        <td class="menu-wrapper">
          <i class="fa-solid fa-ellipsis-vertical menu js-menu"></i>
          <div class="dropdown-menu js-dropdown-menu">
            <a href="edit-record.html" class="dropdown-item">Edit</a>
            <a href="#" class="dropdown-item">View PDF</a>
            <a href="#" class="dropdown-item">View Record</a>
          </div>
        </td>
      </tr>
    `;
  });

  document.querySelector('tbody').innerHTML = blotterHTML;

  const dropDownMenu = document.querySelectorAll('.js-dropdown-menu');

  function showDropDown(dropDown) {
    dropDown.style.display = 'flex';
  }

  function hideDropDown(dropDown) {
    dropDown.style.display = 'none';
  }

  // Initially hide all dropdown menus
  dropDownMenu.forEach(dropDown => hideDropDown(dropDown));

  // Event listener

  /*
    Hides all dropdown menus when the
    document is clicked outside of a menu.
  */
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.js-menu'))
      dropDownMenu.forEach((dropDown) => hideDropDown(dropDown));
  });

  document.querySelectorAll('.js-menu').forEach((menu) => {
    menu.addEventListener('click', (event) => {
      const currentDropDown = menu.nextElementSibling;
      dropDownMenu.forEach((dropDown) => {
        if (dropDown === currentDropDown) {
          showDropDown(dropDown);
        } else {
          hideDropDown(dropDown);
        }
      });
    });
  });
}

renderBlotterRecords();