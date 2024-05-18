document.addEventListener('DOMContentLoaded', function() {
  // Fetch data from the backend
  fetch(`${URL}/userretention`)
      .then(response => response.json())
      .then(data => {
          // Convert time from seconds to minutes
          const retentionData = data.map(entry => ({
              date: entry.date,
              total_minutes: Math.round(entry.total_minutes / 60)
          }));

          // Ensure we always have 5 days of data
          const requiredDays = 5;
          if (retentionData.length < requiredDays) {
              const missingDays = requiredDays - retentionData.length;
              for (let i = 0; i < missingDays; i++) {
                  const date = new Date();
                  date.setDate(date.getDate() - (retentionData.length + i + 1));
                  retentionData.push({
                      date: date.toISOString().split('T')[0],
                      total_minutes: 0
                  });
              }
          } else if (retentionData.length > requiredDays) {
              retentionData.splice(0, retentionData.length - requiredDays);
          }

          // Sort data by date
          retentionData.sort((a, b) => new Date(a.date) - new Date(b.date));

          // Extract labels (dates) and data (total minutes)
          const labels = retentionData.map(entry => entry.date);
          const minutesData = retentionData.map(entry => entry.total_minutes);

          // Data for the chart
          const dailyViewsData = {
              labels: labels,
              datasets: [{
                  label: 'User Retention (in minutes)',
                  data: minutesData,
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
                          text: 'User Retention in Minutes',
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
                              text: 'Date'
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
                              text: 'User Retention (minutes)'
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
      })
      .catch(error => console.error('Error fetching data:', error));
});
