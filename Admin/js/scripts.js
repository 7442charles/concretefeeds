document.addEventListener('DOMContentLoaded', function() {
    // Dummy data for daily views
    const dailyViewsData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Daily Views',
        data: [100, 150, 120, 180, 200, 160, 220],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false
      }]
    };
  
    // Get the canvas element
    const ctx = document.getElementById('dailyViewsChart').getContext('2d');
  
    // Create the line chart
    const dailyViewsChart = new Chart(ctx, {
      type: 'line',
      data: dailyViewsData,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Daily Views',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Day'
            },
            ticks: {
              font: {
                size: 12
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Views'
            },
            ticks: {
              font: {
                size: 12
              }
            }
          }
        },
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }
        }
      }
    });
  });
  