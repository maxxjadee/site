document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Registration successful! You can now log in.');
    window.location.href = 'index.html';
});
