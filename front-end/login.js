document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loadingCircle = document.createElement('div');
    const loginStatus = document.createElement('div');

    // Style for the loading circle
    loadingCircle.className = 'load mx-auto my-4 border-4 border-t-transparent border-blue-500 rounded-full w-12 h-12 animate-spin';
    loadingCircle.style.display = 'none';

    // Insert the loading circle and login status container into the DOM
    loginForm.appendChild(loadingCircle);
    loginForm.appendChild(loginStatus);

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (loginEmail && loginPassword) {
            // Show the loading circle
            loadingCircle.style.display = 'block';

            loginStatus.innerHTML = ''; // Clear previous status message

            try {
                const response = await fetch('/login', { // Replace with your actual endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: loginEmail,
                        password: loginPassword,
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.success) {
                    loginStatus.innerHTML = `<p class="text-green-600">Login successful! Redirecting...</p>`;
                    // Redirect to another page after successful login
                    setTimeout(() => {
                        window.location.href = 'events.html'; // Replace with your target page
                    }, 2000);
                } else {
                    loginStatus.innerHTML = `<p class="text-red-600">${data.message}</p>`;
                }
            } catch (error) {
                console.error("Error occurred:", error);
                loginStatus.innerHTML = '<p class="text-red-600">Something went wrong. Please try again later.</p>';
            } finally {
                // Hide the loading circle
                loadingCircle.style.display = 'none';
            }
        } else {
            alert("Please fill in all fields.");
        }
    });
});
