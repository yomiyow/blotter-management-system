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


