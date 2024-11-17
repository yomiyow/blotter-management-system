import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function renderBlotterRecords() {
  let blotters = [];

  try {
    const response = await fetch('/api/view-entry');

    if (!response.ok) {
      const result = await response.json();
      alert(result.error);
      return;
    }

    blotters = await response.json();

  } catch (err) {
    console.error('Error fetching blotters:', err);
  }

  let blotterHTML = '';

  blotters.forEach((blotter) => {
    const dateReported = dayjs(blotter.date_time_reported).format('MMM D, YYYY h:mm A');
    blotterHTML += `
      <tr>
        <td>${blotter.blotter_id}</td>
        <td>${dateReported}</td>
        <td>${blotter.complainant_fullname}</td>
        <td>${blotter.suspect_fullname}</td>
        <td class="dropdown">
          <i class="fa-solid fa-ellipsis-vertical ellipsis-menu js-menu"></i>
          <div class="dropdown-menu js-dropdown-menu">
            <a href="/nav/view-entry/edit?blotterId=${blotter.blotter_id}" 
              class="dropdown-item">
              <i class="fa-regular fa-pen-to-square"></i>
              Edit
            </a> 
            <a 
              href="/nav/view-entry/pdf?blotterId=${blotter.blotter_id}" 
              class="dropdown-item" target="_blank"
            >
              <i class="fa-regular fa-file-pdf"></i>
              View PDF
            </a>
            <a href="#" class="dropdown-item">
              <i class="fa-regular fa-folder"></i>
              View Record
            </a>
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

  function highlightRow(event) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
      row.classList.remove('highlighted');
    });
    const row = event.target.closest('tbody tr');
    if (row) {
      row.classList.add('highlighted');
    }
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
          highlightRow(event)
        } else {
          hideDropDown(dropDown);
        }
      });
    });
  });
}

renderBlotterRecords();