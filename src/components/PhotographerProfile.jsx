import { useState } from 'react';
import '../css/PhotographerProfile.css';

function PhotographerProfile({ photographer, onBack, onMessage }) {
  const [isCalling, setIsCalling] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const handleCall = () => {
    setIsCalling(true);
    setTimeout(() => setIsCalling(false), 2000);
    alert(`Calling ${photographer.name}...`);
  };

  const posts = photographer.media?.filter(item => item.endsWith('.jpg')) || [];
  const videos = photographer.media?.filter(item => item.endsWith('.mp4')) || [];

  const reviews = [
    { id: 1, user: 'John Doe', rating: 4.5, comment: 'Great work on the event photos!' },
    { id: 2, user: 'Jane Roe', rating: 4.7, comment: 'Amazing video quality, highly recommend!' },
  ];

  return (
    <div className="photographer-profile">
      <button className="back-button" onClick={onBack}>Back</button>
      <div className="profile-header">
        <h2>{photographer.name}</h2>
        <div className="ratings">
          <span>Google Rating: {photographer.googleRating}</span>
          <span>App Rating: {photographer.appRating}</span>
        </div>
      </div>
      <div className="profile-actions">
        <button className="call-button" onClick={handleCall} disabled={isCalling}>
          {isCalling ? 'Calling...' : 'Call'}
        </button>
        <button className="message-button" onClick={() => onMessage(photographer.id)}>Message</button>
      </div>
      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
        <button
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>
      <div className="profile-content">
        {activeTab === 'about' && (
          <div className="profile-section">
            <p>More details about {photographer.name} coming soon...</p>
          </div>
        )}
        {activeTab === 'posts' && (
          <div className="profile-section">
            <div className="media-grid">
              {posts.length > 0 ? (
                posts.map((item, index) => (
                  <div key={index} className="media-item-container">
                    <img src={item} alt={`${photographer.name}'s post`} className="media-item" />
                    <div className="media-caption">{item}</div>
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'videos' && (
          <div className="profile-section">
            <div className="media-grid">
              {videos.length > 0 ? (
                videos.map((item, index) => (
                  <div key={index} className="media-item-container">
                    <video controls className="media-item">
                      <source src={item} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="media-caption">{item}</div>
                  </div>
                ))
              ) : (
                <p>No videos available.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="profile-section">
            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <span className="review-user">{review.user}</span>
                    <span className="review-rating">Rating: {review.rating}/5</span>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotographerProfile;