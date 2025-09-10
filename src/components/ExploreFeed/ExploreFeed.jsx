import React, { useState, useEffect } from 'react';
import './ExploreFeed.css';

function ExploreFeed({ posts, moodboards, users, currentUser }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'wedding', name: 'Weddings', icon: '💒' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'portrait', name: 'Portraits', icon: '📸' },
    { id: 'event', name: 'Events', icon: '🎉' },
    { id: 'landscape', name: 'Landscape', icon: '🏞️' },
    { id: 'street', name: 'Street', icon: '🏙️' }
  ];

  const filters = [
    { id: 'all', name: 'All Content' },
    { id: 'photos', name: 'Photos' },
    { id: 'moodboards', name: 'Moodboards' },
    { id: 'talent', name: 'Talent' },
    { id: 'trending', name: 'Trending' }
  ];

  const filteredContent = () => {
    let content = [];

    // Add posts
    if (activeFilter === 'all' || activeFilter === 'photos' || activeFilter === 'trending') {
      content.push(...posts.map(post => ({ ...post, type: 'post' })));
    }

    // Add moodboards
    if (activeFilter === 'all' || activeFilter === 'moodboards' || activeFilter === 'trending') {
      content.push(...moodboards.map(moodboard => ({ ...moodboard, type: 'moodboard' })));
    }

    // Add talent (photographers/models)
    if (activeFilter === 'all' || activeFilter === 'talent' || activeFilter === 'trending') {
      const talent = users.filter(user => user.role === 'photographer' || user.role === 'model');
      content.push(...talent.map(user => ({ ...user, type: 'talent' })));
    }

    // Filter by search query
    if (searchQuery) {
      content = content.filter(item => {
        if (item.type === 'post') {
          return item.content.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (item.type === 'moodboard') {
          return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 item.description.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (item.type === 'talent') {
          return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 item.profileText.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      content = content.filter(item => {
        if (item.type === 'post') {
          return item.category === selectedCategory;
        } else if (item.type === 'moodboard') {
          return item.category === selectedCategory;
        } else if (item.type === 'talent') {
          return item.specialties?.includes(selectedCategory);
        }
        return false;
      });
    }

    return content.sort((a, b) => new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp));
  };

  const renderContentItem = (item) => {
    switch (item.type) {
      case 'post':
        return (
          <div key={item.id} className="explore-item post-item">
            <div className="item-header">
              <img src={item.user?.profilePhoto || 'https://via.placeholder.com/40'} alt="Profile" className="profile-photo" />
              <div className="item-info">
                <h4>{item.user?.name || 'Unknown User'}</h4>
                <span className="timestamp">{new Date(item.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="item-content">
              <p>{item.content}</p>
              {item.media && (
                <img src={item.media[0]} alt="Post media" className="post-media" />
              )}
            </div>
            <div className="item-actions">
              <button className="action-btn">❤️ {item.likes || 0}</button>
              <button className="action-btn">💬 {item.comments || 0}</button>
              <button className="action-btn">📤 Share</button>
            </div>
          </div>
        );

      case 'moodboard':
        return (
          <div key={item.id} className="explore-item moodboard-item">
            <div className="item-header">
              <div className="item-info">
                <h4>{item.title}</h4>
                <span className="author">by {item.author?.name || 'Unknown'}</span>
              </div>
            </div>
            <div className="moodboard-preview">
              {item.items?.slice(0, 4).map((moodItem, index) => (
                <div key={index} className="moodboard-thumbnail">
                  {moodItem.type === 'image' ? (
                    <img src={moodItem.url} alt={moodItem.caption} />
                  ) : (
                    <div className="text-thumbnail">{moodItem.url}</div>
                  )}
                </div>
              ))}
            </div>
            <p className="moodboard-description">{item.description}</p>
            <div className="item-actions">
              <button className="action-btn">💾 Save</button>
              <button className="action-btn">📤 Share</button>
            </div>
          </div>
        );

      case 'talent':
        return (
          <div key={item.id} className="explore-item talent-item">
            <div className="talent-header">
              <img src={item.profilePhoto || 'https://via.placeholder.com/80'} alt="Profile" className="talent-photo" />
              <div className="talent-info">
                <h4>{item.name}</h4>
                <span className="talent-role">{item.role}</span>
                <div className="talent-rating">
                  <span>⭐ {item.googleRating || 4.0}</span>
                  <span>📱 {item.appRating || 4.0}</span>
                </div>
              </div>
            </div>
            <p className="talent-description">{item.profileText}</p>
            <div className="talent-specialties">
              {item.specialties?.map(specialty => (
                <span key={specialty} className="specialty-tag">{specialty}</span>
              ))}
            </div>
            <div className="item-actions">
              <button className="action-btn">👁️ View Profile</button>
              <button className="action-btn">💬 Message</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="explore-feed">
      <div className="explore-header">
        <h2>Explore</h2>
        <p>Discover amazing content and talent</p>
      </div>

      <div className="explore-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search content, moodboards, or talent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="explore-content">
        {filteredContent().length > 0 ? (
          <div className="content-grid">
            {filteredContent().map(renderContentItem)}
          </div>
        ) : (
          <div className="no-content">
            <p>No content found matching your criteria.</p>
            <button onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
              setSelectedCategory('all');
            }} className="reset-filters-btn">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreFeed;




