document.addEventListener('DOMContentLoaded', function() {
    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const locality = document.getElementById('locality').value;
            const citizenship = document.getElementById('citizenship').value;
            const aadhar = document.getElementById('aadhar').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, age, phone, email, locality, citizenship, aadhar, password })
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = 'index.html';
                } else {
                    alert(data.error);
                }
            } catch (err) {
                alert('Error registering user');
            }
        });
    }

    // Reset password form submission
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('resetEmail').value;

            try {
                const response = await fetch('/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = 'index.html';
                } else {
                    alert(data.error);
                }
            } catch (err) {
                alert('Error sending reset link');
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Login successful!');
                    window.location.href = 'dashboard.html'; // Assuming you have a dashboard.html
                } else {
                    alert(data.error);
                }
            } catch (err) {
                alert('Error logging in');
            }
        });
    }
    // scripts.js

    document.querySelector('.find-jobs').addEventListener('click', () => {
        window.location.href = '/find-jobs.html';
    });
    document.querySelector('.find-job').addEventListener('click', () => {
        window.location.href = '/find-jobs.html';
    });
    document.querySelector('.give-jobs').addEventListener('click', () => {
        window.location.href = '/give-jobs.html';
    });
    document.querySelector('.give-job').addEventListener('click', () => {
        window.location.href = '/give-jobs.html';
    });
    

});
