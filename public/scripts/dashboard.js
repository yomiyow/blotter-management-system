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



