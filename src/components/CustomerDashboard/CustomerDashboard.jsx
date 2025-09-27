import React, { useState } from 'react';
import './CustomerDashboard.css';

function CustomerDashboard() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    budget: '',
    eventType: '',
    location: '',
    date: ''
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Handle posting logic here
    console.log('Posting requirement:', postData);
    // Reset form and hide it
    setPostData({
      title: '',
      description: '',
      budget: '',
      eventType: '',
      location: '',
      date: ''
    });
    setShowPostForm(false);
    alert('Your event requirement has been posted!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sample memories data
  const memories = [
    {
      id: 1,
      title: 'Wedding Photography',
      date: 'Dec 15, 2024',
      photographer: 'Jane Smith',
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200'
      ]
    },
    {
      id: 2,
      title: 'Corporate Event',
      date: 'Nov 20, 2024',
      photographer: 'Mike Johnson',
      photos: [
        'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=200',
        'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=200'
      ]
    }
  ];

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
        <div className="post-button-section">
          <button 
            className="post-button"
            onClick={() => setShowPostForm(!showPostForm)}
          >
            <span className="post-icon">+</span>
            POST
          </button>
          
          {showPostForm && (
            <div className="post-form-overlay">
              <div className="post-form-container">
                <div className="post-form-header">
                  <h3>Post Event Requirements</h3>
                  <button 
                    className="close-form-btn"
                    onClick={() => setShowPostForm(false)}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handlePostSubmit} className="post-form">
                  <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={postData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Wedding Photography"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="eventType">Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={postData.eventType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="portrait">Portrait Session</option>
                      <option value="fashion">Fashion Shoot</option>
                      <option value="event">Other Event</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="budget">Budget (₹)</label>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={postData.budget}
                      onChange={handleInputChange}
                      placeholder="Enter your budget"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={postData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={postData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={postData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your event requirements..."
                      rows="4"
                      required
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" onClick={() => setShowPostForm(false)}>
                      Cancel
                    </button>
                    <button type="submit">Post Requirement</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        
        <div className="memories-banner">
          <h2>Memories</h2>
          <div className="memories-grid">
            {memories.map(memory => (
              <div key={memory.id} className="memory-card">
                <div className="memory-photos">
                  {memory.photos.slice(0, 3).map((photo, index) => (
                    <img 
                      key={index} 
                      src={photo} 
                      alt={`Memory ${index + 1}`}
                      className="memory-photo"
                    />
                  ))}
                  {memory.photos.length > 3 && (
                    <div className="more-photos">+{memory.photos.length - 3}</div>
                  )}
                </div>
                <div className="memory-info">
                  <h4>{memory.title}</h4>
                  <p className="memory-date">{memory.date}</p>
                  <p className="memory-photographer">by {memory.photographer}</p>
                </div>
              </div>
            ))}
          </div>
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