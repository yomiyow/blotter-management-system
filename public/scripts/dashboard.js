(async function fetchDashboardCardValue() {
  try {
    const response = await fetch('/api/dashboard-card-value');
    if (!response.ok) throw new Error('Failed to fetch dashboard card data.');

    const result = await response.json();
    const { todayTotalEntries, totalBlotterRecords } = result
    document.querySelector('.js-today-total-entry').textContent = todayTotalEntries;
    document.querySelector('.js-total-blotter-records').textContent = totalBlotterRecords;
  } catch (err) {
    throw err;
  }
})();

(async function renderBarGraphDataset() {
  let monthlyTotalEntries = Array(12).fill(0);
  try {
    const response = await fetch('/api/monthly-blotter-entries');
    if (!response.ok) throw new Error('Failed to fetch chart data.');
    const result = await response.json();
    result.forEach(entry => {
      const monthIndex = entry.month - 1;
      monthlyTotalEntries[monthIndex] = entry.month_total_entries;
    });
  } catch (err) {
    throw err;
  }

  const ctx = document.getElementById('chart').getContext('2d');
  const xValues = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ];
  const yValues = monthlyTotalEntries;

  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: xValues,
      datasets: [{
        data: yValues,
        fill: true,
        backgroundColor: 'rgba(68, 68, 68, 1)',
        color: '#444',
        label: '2024'
      }]
    },

    options: {
      legend: { display: true },
      scales: {
        yAxes: [{
          ticks: { beginAtZero: true }
        }],
      },
      plugins: {
        title: {
          display: true,
          text: 'Monthly Blotter Entries'
        },
        subtitle: {
          display: false,
          text: 'Custom Chart Subtitle'
        }
      }
    }
  });
})()



