import React, { useState } from 'react';
import axios from 'axios';
import LoadingCircle from './LoadingCircle';
import EventStatus from './EventStatus';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    price: '',
    tickets: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/v1/events/event', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setStatus({ message: `Event "${response.data.data.name}" created successfully!`, type: 'success' });
    } catch (error) {
      setStatus({ message: 'Something went wrong. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text" 
            name="name" 
            placeholder="Event Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <input 
            type="date" 
            name="date" 
            placeholder="Event Date" 
            value={formData.date} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <input 
            type="text" 
            name="location" 
            placeholder="Event Location" 
            value={formData.location} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <input 
            type="number" 
            name="price" 
            placeholder="Event Price" 
            value={formData.price} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <input 
            type="number" 
            name="tickets" 
            placeholder="Number of Tickets" 
            value={formData.tickets} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
      {loading && <LoadingCircle />}
      {status.message && <EventStatus message={status.message} type={status.type} />}
    </div>
  );
};

export default CreateEvent;
