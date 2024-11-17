(async () => {
  const response = await fetch('/api/dashboard');
  const result = await response.json();
  const { todayTotalEntries, totalBlotterRecords } = result;

  document.querySelector('.js-today-total-entry').textContent = todayTotalEntries;
  document.querySelector('.js-total-blotter-records').textContent = totalBlotterRecords;
})()

const ctx = document.getElementById('line-chart').getContext('2d');
const xValues = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'
];
const yValues = [100, 200, 900, 200, 100, 145, 292, 121, 222, 323, 199, 222];

new Chart(ctx, {
  type: 'bar',

  data: {
    labels: xValues,
    datasets: [{
      data: yValues,
      fill: true,
      backgroundColor: 'rgba(68, 68, 68, 0.9)',
      color: '#444',
      label: 'dataset'
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


