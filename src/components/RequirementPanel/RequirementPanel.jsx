import React, { useState } from 'react';
import './RequirementPanel.css';

function RequirementPanel() {
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

  const handlePostRequirement = () => {
    // Handle posting requirement logic
    console.log('Posting requirement...');
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