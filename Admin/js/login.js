document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission
            
            const email = document.getElementById("emailInput").value;
            const password = document.getElementById("passwordInput").value;

            // Send login data to backend for validation
            const loginData = { email, password };
            fetch(`{URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Login successful.") {
                    // Set auth_token cookie upon successful login
                    setCookie("auth_token", data.user, 30); // Assuming 30 days expiration
                    // Redirect to admin dashboard if login is successful
                    window.location.href = "dashboard.html";
                } else {
                    alert("Invalid credentials. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    } else {
        console.error("Login form element not found.");
    }
});

function setCookie(name, value, days) {
    if (!value || !value.id || !value.email) {
        console.error("Invalid user data for setting cookie.");
        return;
    }

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    // Construct the cookie value including user ID and email
    const userData = { id: value.id, email: value.email };
    const cookieValue = JSON.stringify(userData);

    document.cookie = name + "=" + cookieValue + ";" + expires + ";path=/";

    console.log("Cookie set successfully:", name, cookieValue);
}
