(async function fetchDashboardCardValue() {
  try {
    const response = await fetch('/api/card-values');
    if (!response.ok) throw new Error('Failed to fetch dashboard card data.');

    const result = await response.json();
    document.querySelector('.js-new-cases').textContent = result[0].new_cases;
    document.querySelector('.js-under-investigation').textContent = result[1].under_investigation;
    document.querySelector('.js-resolved').textContent = result[2].resolved;
    document.querySelector('.js-total-records').textContent = result[3].total_records;
  } catch (err) {
    console.error(err);
    return;
  }
})();

(async function renderChart() {
  let monthlyCasesData = [];
  let underInvestigationData = [];
  let resolvedData = [];

  try {
    const response = await fetch('/api/chart-datasets');
    if (!response.ok) throw new Error('Failed to fetch chart data.');

    const result = await response.json();
    const { monthlyCases, underInvestigation, resolved } = result;

    monthlyCases.forEach((item) => {
      const monthIndex = item.month - 1;
      monthlyCasesData[monthIndex] = item.monthly_cases;
    });

    underInvestigation.forEach((item) => {
      const monthIndex = item.month - 1;
      underInvestigationData[monthIndex] = item.under_investigation;
    });

    resolved.forEach((item) => {
      const monthIndex = item.month - 1;
      resolvedData[monthIndex] = item.resolved;
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

  // datasets
  const monthlyDataset = {
    label: 'Cases',
    data: monthlyCasesData,
    backgroundColor: 'rgba(255, 99, 132)'
  };
  const underInvestigationDataSet = {
    label: 'Under Inverstigation',
    data: underInvestigationData,
    backgroundColor: 'rgb(54, 162, 235)'
  };
  const resolvedDataset = {
    label: 'Resolved',
    data: resolvedData,
    backgroundColor: 'rgba(75, 192, 192)'
  };

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [monthlyDataset, underInvestigationDataSet, resolvedDataset]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: false,
          text: 'Monthly Blotter Entries'
        }
      }
    }
  });
})()



