function getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }
  const username = localStorage.getItem("loggedInUser");
  const greeting = document.getElementById("greeting");
  
  if (username) {
    greeting.textContent = `Welcome, ${username}!`;
  } else {
    greeting.textContent = "No user is currently logged in.";
  }
  
 /* function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("name");
    window.location.href = "login.html";
  }*/ //change to go to homepage