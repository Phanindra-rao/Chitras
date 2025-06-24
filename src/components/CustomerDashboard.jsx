import React from 'react';
import '../css/CustomerDashboard.css';

function CustomerDashboard() {
  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <h2>Profile</h2>
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-photo" />
        <p className="profile-text">Customer details here...</p>
      </div>
      <div className="feed-section">
        <h2>Feed</h2>
        <div className="feed-post">
          <h3>Recent Update</h3>
          <p>This is a sample update for customers...</p>
          <img src="https://via.placeholder.com/300x200" alt="Feed Media" />
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;