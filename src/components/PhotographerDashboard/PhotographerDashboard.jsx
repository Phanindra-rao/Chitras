import React from 'react';
import './PhotographerDashboard.css';

function PhotographerDashboard() {
  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <h2>Profile</h2>
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-photo" />
        <p className="profile-text">Tell us about yourself...</p>
      </div>
    </div>
  );
}

export default PhotographerDashboard;