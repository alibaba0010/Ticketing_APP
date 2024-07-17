document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const loadingCircle = document.createElement('div');
    const updateStatus = document.createElement('div');

    // Style for the loading circle
    loadingCircle.className = 'load mx-auto my-4 border-4 border-t-transparent border-purple-500 rounded-full w-12 h-12 animate-spin';
    loadingCircle.style.display = 'none';

    // Insert the loading circle and update status container into the DOM
    profileForm.appendChild(loadingCircle);
    profileForm.appendChild(updateStatus);

    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const profileName = document.getElementById('profileName').value;
        const profileEmail = document.getElementById('profileEmail').value;

        if (profileName && profileEmail) {
            // Show the loading circle
            loadingCircle.style.display = 'block';

            updateStatus.innerHTML = ''; // Clear previous status message

            try {
                const response = await fetch('/update-profile', { // Replace with your actual endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: profileName,
                        email: profileEmail,
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.success) {
                    updateStatus.innerHTML = `<p class="text-green-600">Profile updated successfully!</p>`;
                } else {
                    updateStatus.innerHTML = `<p class="text-red-600">${data.message}</p>`;
                }
            } catch (error) {
                console.error("Error occurred:", error);
                updateStatus.innerHTML = '<p class="text-red-600">Something went wrong. Please try again later.</p>';
            } finally {
                // Hide the loading circle
                loadingCircle.style.display = 'none';
            }
        } else {
            alert("Please fill in all fields.");
        }
    });
});
