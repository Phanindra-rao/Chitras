import React, { useState, useEffect } from 'react';
import './Moodboard.css';

function Moodboard({ 
  onSave, 
  curatedCollections, 
  userMoodboards, 
  trendingMoodboards, 
  aiRecommendations,
  collaborationPosts,
  currentUser,
  photographers,
  upcomingEvents,
  onPhotographerSelect
}) {
  const [activeTab, setActiveTab] = useState('curated');
  
  // Debug logging
  console.log('Moodboard props:', { collaborationPosts, curatedCollections, userMoodboards });

  // Tab options
  const tabs = [
    { id: 'curated', label: 'Curated Collections', icon: '🎨' },
    { id: 'collaborations', label: 'Collaborations', icon: '🤝' },
    { id: 'my-boards', label: 'My Boards', icon: '📋' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'recommendations', label: 'AI Recommendations', icon: '🤖' }
  ];

  const renderCuratedCollections = () => (
    <div className="media-grid">
      {curatedCollections.map(collection => (
        <div key={collection.id}>
          <img src={collection.coverImage} alt={collection.name} />
          {collection.items.map(item => (
            <div key={item.id}>
              {item.type === 'photographer' ? (
                <img src={item.data.image} alt={item.data.name} />
              ) : item.type === 'event' ? (
                <img src={item.data.image} alt={item.data.title} />
              ) : (
                <img src={item.data.image} alt={item.data.caption} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderMyBoards = () => (
    <div className="media-grid">
      {userMoodboards.map(board => (
        <div key={board.id}>
          {board.items.map(item => (
            <div key={item.id}>
              {item.type === 'photographer' ? (
                <img src={item.data.image} alt={item.data.name} />
              ) : item.type === 'event' ? (
                <img src={item.data.image} alt={item.data.title} />
              ) : (
                <img src={item.data.image} alt={item.data.caption} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderTrending = () => (
    <div className="media-grid">
      {trendingMoodboards.map(board => (
        <div key={board.id}>
          <img src={board.coverImage} alt={board.name} />
          {board.items && board.items.map(item => (
            <div key={item.id}>
              {item.type === 'photographer' ? (
                <img src={item.data.image} alt={item.data.name} />
              ) : item.type === 'event' ? (
                <img src={item.data.image} alt={item.data.title} />
              ) : (
                <img src={item.data.image} alt={item.data.caption} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderRecommendations = () => (
    <div className="media-grid">
      {aiRecommendations.map(rec => (
        <div key={rec.id}>
          {rec.type === 'photographer' ? (
            <img src={rec.data.image} alt={rec.data.name} />
          ) : (
            <img src={rec.data.image} alt={rec.data.title} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCollaborations = () => {
    console.log('Rendering collaborations, posts:', collaborationPosts);
    
    // Simple test first
    return (
      <div className="collaboration-feed">
        <div className="collaboration-post">
          <h2>🤝 Collaboration Feed</h2>
          <p>This is the collaboration feed section!</p>
          <p>Posts count: {collaborationPosts ? collaborationPosts.length : 'undefined'}</p>
        </div>
      </div>
    );
    
    if (!collaborationPosts || collaborationPosts.length === 0) {
      return (
        <div className="collaboration-feed">
          <div className="no-collaborations">
            <p>No collaboration posts available at the moment.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="collaboration-feed">
        {collaborationPosts.map(post => (
          <div key={post.id} className="collaboration-post">
            <div className="post-header">
              <div className="collaboration-info">
                <div className="photographer-info">
                  <img src={post.photographerImage} alt={post.photographerName} className="profile-img" />
                  <span className="photographer-name">{post.photographerName}</span>
                </div>
                <div className="collaboration-icon">🤝</div>
                <div className="customer-info">
                  <img src={post.customerImage} alt={post.customerName} className="profile-img" />
                  <span className="customer-name">{post.customerName}</span>
                </div>
              </div>
              <div className="post-meta">
                <span className="event-type">{post.eventType}</span>
                <span className="timestamp">{post.timestamp}</span>
              </div>
            </div>
            
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.content}</p>
            </div>
            
            <div className="post-media">
              {post.media.map((media, index) => (
                <div key={index} className="media-item">
                  {media.type === 'image' ? (
                    <img src={media.url} alt={media.caption} />
                  ) : (
                    <video controls>
                      <source src={media.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <p className="media-caption">{media.caption}</p>
                </div>
              ))}
            </div>
            
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
            
            <div className="post-engagement">
              <span className="likes">❤️ {post.likes}</span>
              <span className="comments">💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="moodboard-container">
      <div className="moodboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="moodboard-content">
        {activeTab === 'curated' && renderCuratedCollections()}
        {activeTab === 'collaborations' && renderCollaborations()}
        {activeTab === 'my-boards' && renderMyBoards()}
        {activeTab === 'trending' && renderTrending()}
        {activeTab === 'recommendations' && renderRecommendations()}
      </div>
    </div>
  );
}

export default Moodboard;

