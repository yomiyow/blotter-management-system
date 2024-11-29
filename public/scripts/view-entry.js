function generateBlotterHTML(blotters) {
  document.querySelector('tbody').innerHTML = '';

  let blotterHTML = '';

  blotters.forEach((blotter) => {
    blotterHTML += `
      <tr>
        <td>${blotter.blotter_id}</td>
        <td>${blotter.date_time_reported}</td>
        <td>${blotter.complainant_fullname}</td>
        <td>${blotter.suspect_fullname}</td>
        <td class="dropdown">
          <i class="fa-solid fa-ellipsis-vertical ellipsis-menu js-menu"></i>
          <div class="dropdown-menu js-dropdown-menu">
            <a href="/nav/view-blotter/edit?blotterId=${blotter.blotter_id}" 
              class="dropdown-item">
              <i class="fa-regular fa-pen-to-square"></i>
              Edit
            </a> 
            <a 
              href="/nav/view-blotter/pdf?blotterId=${blotter.blotter_id}" 
              class="dropdown-item" target="_blank"
            >
              <i class="fa-regular fa-file-pdf"></i>
              View PDF
            </a>
          </div>
        </td>
      </tr>
    `;
  });
  document.querySelector('tbody').innerHTML = blotterHTML;
}

function makeDrowDownInteractive() {
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

async function fetchBlotters(url) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error('Error fetching blotter records');

  return await response.json();
}

(async function renderBlotter() {
  try {
    const blotters = await fetchBlotters('/api/view-entry');
    generateBlotterHTML(blotters);
    makeDrowDownInteractive();
  } catch (err) {
    console.error(err);
  }
})();

// Searching at table
document.querySelector('input[type="search"]')
  .addEventListener('input', async (event) => {
    const searchTerm = event.target.value;
    const url = `/api/search?term=${encodeURIComponent(searchTerm)}`;
    try {
      const blotters = await fetchBlotters(url);
      generateBlotterHTML(blotters);
      makeDrowDownInteractive();
    } catch (err) {
      console.error(err,);
    }
  });

// Sorting of table
document.querySelectorAll('thead tr th').forEach((theader) => {
  theader.addEventListener('click', async () => {
    const column = theader.dataset.column;
    const sortOrder = theader.dataset.order === 'ASC' ? 'DESC' : 'ASC';
    theader.dataset.order = sortOrder;
    const theaderIcon = theader.querySelector('i');

    // Remove the icon from unselected table headers
    document.querySelectorAll('thead tr th i').forEach((icon) => {
      if (icon !== theaderIcon) {
        icon.classList.remove('fa-arrow-up', 'fa-arrow-down');
      }
    });

    theaderIcon.classList.toggle('fa-arrow-up', sortOrder === 'ASC');
    theaderIcon.classList.toggle('fa-arrow-down', sortOrder === 'DESC');

    try {
      const url = `/api/sort?column=${column}&order=${sortOrder}`;
      const blotters = await fetchBlotters(url);
      generateBlotterHTML(blotters);
      makeDrowDownInteractive();
    } catch (err) {
      console.error(err);
    }
  });
});