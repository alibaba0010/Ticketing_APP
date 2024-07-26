import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/events');
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">Event List</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4" key={event._id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p className="card-text">Location: {event.location}</p>
                  <p className="card-text">Price: ${event.price}</p>
                  <p className="card-text">Tickets: {event.tickets}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
