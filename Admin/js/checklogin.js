document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is logged in
      checkLoggedIn();
    });

function checkLoggedIn() {
    // Check if the "loggedIn" cookie exists
    const loggedInCookie = getCookie("auth_token");

    if (loggedInCookie) {
        // User is logged in
        const userInfo = JSON.parse(loggedInCookie);
        const userInfoText = `Logged in as ${userInfo.email} (ID: ${userInfo.id})`;
        // document.getElementById("userInfo").textContent = userInfoText;
        console.log(userInfoText)
    } else {
        // User is not logged in, redirect to login page
        window.location.href = "login.html";
    }
}

// Function to get a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}