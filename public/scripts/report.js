(async () => {
  // Save the data
  let reportsData = [];

  try {
    const response = await fetch('/api/reports');
    reportsData = await response.json();

  } catch (err) {
    console.error(err);
  }

  const barangayLabels = reportsData.map(report => report.barangay);
  const data = reportsData.map(report => report.total_blotter);

  // Generate a chart
  const ctx = document.getElementById('myChart');

  const config = {
    type: 'bar',
    data: {
      labels: barangayLabels,
      datasets: [
        {
          label: 'Total Blotter Records per Barangay',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.9)',
        },
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Barangay Blotter Report'
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 0
          }
        }
      }
    }
  };

  const myChart = new Chart(ctx, config);
})();
