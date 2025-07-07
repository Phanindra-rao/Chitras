import React from 'react';
import '../css/CustomerDashboard.css';


function CustomerDashboard() {
  return (
    <div className="dashboard-container">
      <div className="photographers-list">
        <h2>Photographers</h2>
        <ul>
          <li>Photographer 1</li>
          <li>Photographer 2</li>
          <li>Photographer 3</li>
        </ul>
      </div>
      <div className="feed-section">
        <h2>Feed</h2>
        <div className="feed-post">
          <h3>Recent Update</h3>
          <p>This is a sample update for customers...</p>
          <img src="https://via.placeholder.com/300x200" alt="Feed Media" className="feed-media" />
        </div>
      </div>
      <div className="post-section">
        <h2>Posts</h2>
        <div className="post-item">
          <h3>New Post</h3>
          <p>Details about a recent photoshoot post...</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;