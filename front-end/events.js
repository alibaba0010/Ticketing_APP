document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchEvents');
    const eventList = document.getElementById('eventList');

    // Function to fetch events from the backend
    const fetchEvents = async () => {
        try {
            const response = await fetch('/get-events'); // Replace with your actual endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const events = await response.json();
            renderEvents(events);
        } catch (error) {
            console.error('Error fetching events:', error);
            eventList.innerHTML = '<p class="text-red-600">Error fetching events. Please try again later.</p>';
        }
    };

    // Function to render events
    const renderEvents = (events) => {
        eventList.innerHTML = '';
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item p-4 bg-white rounded-lg shadow-md';
            eventItem.innerHTML = `
                <h3 class="text-xl font-semibold mb-2">${event.name}</h3>
                <p class="text-gray-600 mb-2">Date: ${new Date(event.date).toLocaleDateString()}</p>
                <p class="text-gray-600">Location: ${event.location}</p>
            `;
            eventList.appendChild(eventItem);
        });
    };

    // Function to filter events based on search input
    const filterEvents = (events, query) => {
        return events.filter(event => 
            event.name.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Event listener for search input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        fetchEvents().then(() => {
            const filteredEvents = filterEvents(events, query);
            renderEvents(filteredEvents);
        });
    });

    // Initial fetch of events when the page loads
    fetchEvents();
});
