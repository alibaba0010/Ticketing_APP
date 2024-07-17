document.addEventListener('DOMContentLoaded', () => {
    const createEventForm = document.getElementById('createEventForm');
    const loadingCircle = document.createElement('div');
    const eventStatus = document.createElement('div');

    // Style for the loading circle
    loadingCircle.className = 'load mx-auto my-4 border-4 border-t-transparent border-indigo-500 rounded-full w-12 h-12 animate-spin';
    loadingCircle.style.display = 'none';

    // Insert the loading circle and event status container into the DOM
    createEventForm.appendChild(loadingCircle);
    createEventForm.appendChild(eventStatus);

    createEventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventPrice = document.getElementById('eventPrice').value;
        const eventTickets = document.getElementById('eventTickets').value;

        if (eventName && eventDate && eventLocation && eventPrice && eventTickets) {
            // Show the loading circle
            loadingCircle.style.display = 'block';

            eventStatus.innerHTML = ''; // Clear previous status message

            try {
                const response = await fetch('/create-event', { // Replace with your actual endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: eventName,
                        date: eventDate,
                        location: eventLocation,
                        price: eventPrice,
                        tickets: eventTickets,
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                eventStatus.innerHTML = `<p class="text-green-600">Event "${data.name}" created successfully!</p>`;
            } catch (error) {
                console.error("Error occurred:", error);
                eventStatus.innerHTML = '<p class="text-red-600">Something went wrong. Please try again later.</p>';
            } finally {
                // Hide the loading circle
                loadingCircle.style.display = 'none';
            }
        } else {
            alert("Please fill in all fields.");
        }
    });
});
