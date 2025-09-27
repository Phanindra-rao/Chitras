import React, { useState } from 'react';
import './RequirementPanel.css';

function RequirementPanel() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    budget: '',
    eventType: '',
    location: '',
    date: ''
  });

  const [eventMedia] = useState([
    {
      id: 1,
      title: 'Wedding Photography Collection',
      type: 'Wedding',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200'
      ],
      photographer: 'Jane Smith',
      date: 'Dec 15, 2024',
      likes: 24
    },
    {
      id: 2,
      title: 'Corporate Event Highlights',
      type: 'Corporate',
      images: [
        'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=200',
        'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=200',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200'
      ],
      photographer: 'Mike Johnson',
      date: 'Dec 20, 2024',
      likes: 18
    },
    {
      id: 3,
      title: 'Fashion Photography Portfolio',
      type: 'Fashion',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200'
      ],
      photographer: 'Sarah Wilson',
      date: 'Dec 25, 2024',
      likes: 31
    }
  ]);

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

  const handlePostRequirement = () => {
    setShowPostForm(true);
  };

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

  const handleMediaClick = (mediaId) => {
    // Handle media click to view full gallery
    console.log('Opening media gallery:', mediaId);
  };

  return (
    <div className="requirement-panel">
      <div className="panel-header">
        <h3>Post Your Requirement</h3>
        <p>Share your event details and find the perfect photographer</p>
      </div>

      <button className="post-requirement-btn" onClick={handlePostRequirement}>
        Post +
      </button>

      {/* Post Form Overlay */}
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
                  rows="3"
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

      {/* Memories Section */}
      <div className="memories-section">
        <div className="memories-header">
          <h4>📸 Memories</h4>
          <p>Your past event photos</p>
        </div>
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
                <h5>{memory.title}</h5>
                <p className="memory-date">{memory.date}</p>
                <p className="memory-photographer">by {memory.photographer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="event-media-gallery">
        <div className="gallery-header">
          <h4>📸 Event Media Gallery</h4>
          <p>Latest photography collections</p>
        </div>

        <div className="media-grid">
          {eventMedia.map((media) => (
            <div 
              key={media.id} 
              className="media-card"
              onClick={() => handleMediaClick(media.id)}
            >
              <div className="media-preview">
                <img src={media.images[0]} alt={media.title} />
                <div className="media-overlay">
                  <span className="media-count">+{media.images.length - 1}</span>
                </div>
              </div>
              
              <div className="media-info">
                <h5>{media.title}</h5>
                <div className="media-meta">
                  <span className="media-type">{media.type}</span>
                  <span className="media-photographer">by {media.photographer}</span>
                </div>
                <div className="media-stats">
                  <span className="media-date">{media.date}</span>
                  <span className="media-likes">❤️ {media.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="view-all-btn">
          View All Collections →
        </button>
      </div>
    </div>
  );
}

export default RequirementPanel;