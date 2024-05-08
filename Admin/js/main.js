function logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You wan't be able to Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EC2A10",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "logging Out!",
          text: "Your have been logged out.",
          icon: "success"
        });
        console.log('log out');
        setTimeout(function() {
          // Redirect to the login page
          deleteCookie('auth_token');
          window.location.href = "login.html";
        }, 3000);
      }
    });
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
