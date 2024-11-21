(async function fetchDashboardCardValue() {
  try {
    const response = await fetch('/api/dashboard-card-value');
    if (!response.ok) throw new Error('Failed to fetch dashboard card data.');

    const result = await response.json();
    const { todayTotalEntries, totalBlotterRecords } = result
    document.querySelector('.js-today-total-entry').textContent = todayTotalEntries;
    document.querySelector('.js-total-blotter-records').textContent = totalBlotterRecords;
  } catch (err) {
    console.error(err);
    return;
  }
})();

(async function renderBarGraphDataset() {
  let monthlyTotalEntries = [];

  try {
    const response = await fetch('/api/monthly-blotter-entries');
    if (!response.ok) throw new Error('Failed to fetch chart data.');

    const results = await response.json();
    results.forEach(entry => {
      const monthIndex = entry.month - 1;
      if (entry.year !== 2024) return;
      monthlyTotalEntries[monthIndex] = entry.month_total_entries;
    });

  } catch (err) {
    console.error(err);
    return;
  }

  const ctx = document.getElementById('chart').getContext('2d');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: '2024',
        data: monthlyTotalEntries,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Monthly Blotter Entries'
        }
      }
    }
  });
})()



