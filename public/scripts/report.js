function generateBlotterHTML(blotters) {
  document.querySelector('tbody').innerHTML = '';

  let blotterHTML = '';

  blotters.forEach((blotter) => {
    blotterHTML += `
      <tr>
        <td>${blotter.blotter_id}</td>
        <td>${blotter.date_time_reported}</td>
        <td>${blotter.category}</td>
        <td>${blotter.narrative}</td>
        <td>${blotter.status}</td>
      </tr>
    `;
  });
  document.querySelector('tbody').innerHTML = blotterHTML;
}

async function fetchBlotters(url) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error('Error fetching blotter records');

  return await response.json();
}

// Show all blotters

(async function renderBlotter() {
  try {
    const blotters = await fetchBlotters('/api/reports');
    generateBlotterHTML(blotters);
  } catch (err) {
    console.error(err);
    return;
  }
})();

// Searching at table

document.querySelector('input[type="search"]')
  .addEventListener('input', async (event) => {
    const searchTerm = event.target.value;
    const url = `/api/search-report?term=${encodeURIComponent(searchTerm)}`;
    try {
      const blotters = await fetchBlotters(url);
      generateBlotterHTML(blotters);
    } catch (err) {
      console.error(err);
      return;
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
      const url = `/api/sort-reports?column=${column}&order=${sortOrder}`;
      const sortedBlotters = await fetchBlotters(url);
      generateBlotterHTML(sortedBlotters);
    } catch (err) {
      console.error(err);
      return;
    }
  });
});

// Filter table

const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');

async function updateFilter() {
  const category = categoryFilter.value;
  const status = statusFilter.value;
  try {
    const url = `/api/filter-reports?category=${category}&status=${status}`;
    const fliteredBlotters = await fetchBlotters(url);
    generateBlotterHTML(fliteredBlotters);
  } catch (err) {
    console.error(err);
    return;
  }
}

categoryFilter.addEventListener('change', updateFilter);
statusFilter.addEventListener('change', updateFilter);

// Export table content to excel

document.querySelector('.export-btn').addEventListener('click', () => {
  console.log('exported');
  const table = document.querySelector('table');
  const wb = XLSX.utils.table_to_book(table, { sheets: "Sheet1" });
  XLSX.writeFile(wb, 'blotter-report.xlsx')
});

