document.addEventListener('DOMContentLoaded', function() {
    let startTime;

    // Function to calculate time spent on the page
    function calculateTimeSpent() {
        const endTime = new Date();
        const timeSpent = endTime - startTime; // time spent in milliseconds
        const timeSpentSeconds = Math.round(timeSpent / 1000); // convert to seconds
        return timeSpentSeconds;
    }

    // Start the timer when the page loads
    function startTimer() {
        startTime = new Date();
    }

    // Send time spent to the server
    function sendTimeSpent(timeSpentSeconds) {
        fetch('http://localhost:3000/timespent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ timeSpent: timeSpentSeconds }),
        })
        .then(response => response.json())
        .then(data => console.log('Time spent data sent successfully:', data))
        .catch(error => console.error('Error sending time spent data:', error));
    }

    // Event listener for page unload
    window.addEventListener('beforeunload', function(event) {
        const timeSpentSeconds = calculateTimeSpent();
        sendTimeSpent(timeSpentSeconds);
    });

    // Initialize the timer
    startTimer();
});
