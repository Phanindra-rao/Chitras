import React, { useState, useEffect } from 'react';
import './Maps.css';

function Maps({ currentUser, photographers, onPhotographerSelect }) {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPhotographers, setNearbyPhotographers] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('photographers');
  const [searchRadius, setSearchRadius] = useState(10); // km

  // Sample data for demonstration
  const samplePhotographers = [
    {
      id: 1,
      name: 'John Doe',
      specialty: 'Wedding Photography',
      rating: 4.8,
      price: '₹15,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      location: { lat: 19.0760, lng: 72.8777, address: 'Mumbai, Maharashtra' },
      distance: 2.5
    },
    {
      id: 2,
      name: 'Jane Smith',
      specialty: 'Fashion Photography',
      rating: 4.9,
      price: '₹18,000',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      location: { lat: 19.0765, lng: 72.8780, address: 'Mumbai, Maharashtra' },
      distance: 3.2
    },
    {
      id: 3,
      name: 'Mike Johnson',
      specialty: 'Corporate Events',
      rating: 4.7,
      price: '₹12,000',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      location: { lat: 19.0755, lng: 72.8770, address: 'Mumbai, Maharashtra' },
      distance: 1.8
    }
  ];

  const sampleEvents = [
    {
      id: 1,
      title: 'Wedding Photography Workshop',
      date: 'Dec 20, 2024',
      location: { lat: 19.0762, lng: 72.8775, address: 'Mumbai, Maharashtra' },
      distance: 2.1,
      price: '₹2,500',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200'
    },
    {
      id: 2,
      title: 'Fashion Photography Masterclass',
      date: 'Dec 25, 2024',
      location: { lat: 19.0768, lng: 72.8782, address: 'Mumbai, Maharashtra' },
      distance: 4.1,
      price: '₹3,000',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=200'
    }
  ];

  useEffect(() => {
    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Fallback to Mumbai coordinates
          setUserLocation({ lat: 19.0760, lng: 72.8777 });
        }
      );
    } else {
      // Fallback to Mumbai coordinates
      setUserLocation({ lat: 19.0760, lng: 72.8777 });
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Filter photographers and events based on radius
      const filteredPhotographers = samplePhotographers.filter(p => p.distance <= searchRadius);
      const filteredEvents = sampleEvents.filter(e => e.distance <= searchRadius);
      
      setNearbyPhotographers(filteredPhotographers);
      setNearbyEvents(filteredEvents);
    }
  }, [userLocation, searchRadius]);

  const handlePhotographerClick = (photographer) => {
    if (onPhotographerSelect) {
      onPhotographerSelect(photographer.id);
    }
  };

  return (
    <div className="maps-container">
      <div className="maps-header">
        <h1>🗺️ Maps</h1>
        <p>Discover photographers and events near you</p>
      </div>

      <div className="maps-content">
        <div className="maps-controls">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${selectedFilter === 'photographers' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('photographers')}
            >
              📸 Photographers
            </button>
            <button 
              className={`filter-tab ${selectedFilter === 'events' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('events')}
            >
              🎉 Events
            </button>
          </div>

          <div className="radius-control">
            <label htmlFor="radius">Search Radius: {searchRadius} km</label>
            <input
              type="range"
              id="radius"
              min="1"
              max="50"
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="radius-slider"
            />
          </div>
        </div>

        <div className="maps-main">
          <div className="map-placeholder">
            <div className="map-content">
              <h3>📍 Interactive Map</h3>
              <p>Your location: {userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : 'Loading...'}</p>
              <div className="map-visualization">
                <div className="user-location">
                  <div className="location-pin">📍</div>
                  <span>You are here</span>
                </div>
                {selectedFilter === 'photographers' && nearbyPhotographers.map(photographer => (
                  <div 
                    key={photographer.id} 
                    className="photographer-pin"
                    style={{
                      position: 'absolute',
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 60 + 20}%`
                    }}
                    onClick={() => handlePhotographerClick(photographer)}
                  >
                    📸
                  </div>
                ))}
                {selectedFilter === 'events' && nearbyEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="event-pin"
                    style={{
                      position: 'absolute',
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 60 + 20}%`
                    }}
                  >
                    🎉
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="results-panel">
            <h3>
              {selectedFilter === 'photographers' 
                ? `📸 Nearby Photographers (${nearbyPhotographers.length})`
                : `🎉 Nearby Events (${nearbyEvents.length})`
              }
            </h3>
            
            <div className="results-list">
              {selectedFilter === 'photographers' ? (
                nearbyPhotographers.map(photographer => (
                  <div 
                    key={photographer.id} 
                    className="result-card photographer-card"
                    onClick={() => handlePhotographerClick(photographer)}
                  >
                    <img src={photographer.image} alt={photographer.name} className="card-image" />
                    <div className="card-content">
                      <h4>{photographer.name}</h4>
                      <p className="specialty">{photographer.specialty}</p>
                      <div className="card-meta">
                        <span className="rating">⭐ {photographer.rating}</span>
                        <span className="price">{photographer.price}</span>
                        <span className="distance">{photographer.distance} km away</span>
                      </div>
                      <p className="address">{photographer.location.address}</p>
                    </div>
                  </div>
                ))
              ) : (
                nearbyEvents.map(event => (
                  <div key={event.id} className="result-card event-card">
                    <img src={event.image} alt={event.title} className="card-image" />
                    <div className="card-content">
                      <h4>{event.title}</h4>
                      <div className="card-meta">
                        <span className="date">📅 {event.date}</span>
                        <span className="price">{event.price}</span>
                        <span className="distance">{event.distance} km away</span>
                      </div>
                      <p className="address">{event.location.address}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedFilter === 'photographers' && nearbyPhotographers.length === 0 && (
              <div className="no-results">
                <p>No photographers found within {searchRadius} km radius.</p>
                <p>Try increasing the search radius.</p>
              </div>
            )}

            {selectedFilter === 'events' && nearbyEvents.length === 0 && (
              <div className="no-results">
                <p>No events found within {searchRadius} km radius.</p>
                <p>Try increasing the search radius.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maps;


