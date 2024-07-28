import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  // Assuming user data is stored in local storage after successful login
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div
      style={{ backgroundImage: 'linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))' }}
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
    >
      <h1>Welcome, {user ? user.name : 'User'}!</h1>
      <div className="d-flex flex-column">
        <Link to="/create-event" className="btn btn-primary my-2">
          Create-Event
        </Link>
        <Link to="/event-list" className="btn btn-secondary my-2">
          Event-List
        </Link>
        {user && user.isCreator && (
          <Link to="/admin" className="btn btn-warning my-2">
            Admin
          </Link>
        )}
        <Link to="/login" className="btn btn-light my-5">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Home;
