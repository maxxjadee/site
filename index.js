document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const enteredEmail = event.target[0].value;
    const enteredPassword = event.target[1].value;

    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedName = localStorage.getItem('name');

    if (enteredEmail === savedEmail && enteredPassword === savedPassword) {
        localStorage.setItem("loggedInUser", savedName); 
        window.location.href = "welcome.html";
    } else {
        alert("Invalid email or password.");
    }
});

