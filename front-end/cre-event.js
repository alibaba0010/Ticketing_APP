document.addEventListener('DOMContentLoaded', () => {
    const createEventForm = document.getElementById('createEventForm');
    const loadingCircle = document.getElementById('loading-circle');
    const eventStatus = document.getElementById('eventStatus');

    // Function to handle event creation
    const handleCreateEvent = async (event) => {
        event.preventDefault();

        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventPrice = document.getElementById('eventPrice').value;
        const eventTickets = document.getElementById('eventTickets').value;

        if(eventName && eventDate && eventLocation && eventPrice && eventTickets) {
            loadingCircle.style.display = 'block';
            eventStatus.innerHTML = ''; // this will Clear previous content
            const endpointUrl = '/create-event'; // Replace this with the actual endpoint

            try {
                const response = await fetch(endpointUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: eventName,
                        date: eventDate,
                        location: eventLocation,
                        price: eventPrice,
                        tickets: eventTickets
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
                loadingCircle.style.display = 'none';
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Event listener for form submission
    createEventForm.addEventListener('submit', handleCreateEvent);
});
