import React, { useState } from 'react';
import './PhotographerDiscovery.css';

function PhotographerDiscovery({ photographers, onPhotographerSelect, currentUser }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All', icon: '📸' },
    { id: 'wedding', name: 'Wedding', icon: '💒' },
    { id: 'event', name: 'Event', icon: '🎉' },
    { id: 'birthday', name: 'Birthday', icon: '🎂' },
    { id: 'prewedding', name: 'Pre-wedding', icon: '💕' },
    { id: 'portrait', name: 'Portrait', icon: '👤' },
    { id: 'fashion', name: 'Fashion', icon: '👗' }
  ];

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesCategory = selectedCategory === 'all' || 
      photographer.specialties?.some(specialty => 
        specialty.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    const matchesSearch = photographer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photographer.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePhotographerClick = (photographer) => {
    onPhotographerSelect(photographer);
  };

  return (
    <div className="photographer-discovery">
      <div className="discovery-header">
        <h2>Find Photographers</h2>
        <p>Discover talented photographers for your special moments</p>
      </div>

      <div className="discovery-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search photographers or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="photographers-grid">
        {filteredPhotographers.length > 0 ? (
          filteredPhotographers.map(photographer => (
            <div
              key={photographer.id}
              className="photographer-card"
              onClick={() => handlePhotographerClick(photographer)}
            >
              <div className="photographer-header">
                <img
                  src={photographer.profilePhoto}
                  alt={photographer.name}
                  className="photographer-avatar"
                />
                <div className="photographer-info">
                  <h3 className="photographer-name">{photographer.name}</h3>
                  <p className="photographer-location">{photographer.location}</p>
                  <div className="photographer-rating">
                    <span className="rating-stars">⭐ {photographer.appRating}</span>
                    <span className="rating-count">({photographer.googleRating})</span>
                  </div>
                </div>
              </div>

              <p className="photographer-bio">{photographer.profileText}</p>

              <div className="photographer-specialties">
                {photographer.specialties?.map(specialty => (
                  <span key={specialty} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="photographer-actions">
                <button className="view-profile-btn">View Profile</button>
                <button className="contact-btn">Contact</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-photographers">
            <div className="no-photographers-icon">📸</div>
            <h3>No photographers found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotographerDiscovery;
