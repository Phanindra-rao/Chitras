import React, { useState } from 'react';
import './CommunityBuzz.css';

function CommunityBuzz({ currentUser }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [newMessage, setNewMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const [events] = useState([
    {
      id: 1,
      title: 'Wedding Photography Masterclass',
      date: 'Dec 15, 2024 • 2:00 PM',
      location: 'Mumbai, Maharashtra',
      description: 'Learn the art of wedding photography from industry experts',
      price: '₹2,500',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      badge: 'Workshop',
      participants: 45,
      status: 'upcoming',
      createdAt: '2024-12-01',
      messages: [
        {
          id: 1,
          user: 'Sarah Wilson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
          message: 'Can\'t wait for this workshop! Anyone else from Delhi attending?',
          timestamp: '2 hours ago',
          likes: 5
        },
        {
          id: 2,
          user: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
          message: 'I\'ll be there! Looking forward to learning new techniques.',
          timestamp: '1 hour ago',
          likes: 3
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200'
      ]
    },
    {
      id: 2,
      title: 'Professional Portrait Session',
      date: 'Dec 20, 2024 • 10:00 AM',
      location: 'Delhi, NCR',
      description: 'Get stunning professional portraits for your portfolio',
      price: '₹1,800',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      badge: 'Photo Shoot',
      participants: 28,
      status: 'upcoming',
      createdAt: '2024-11-28',
      messages: [
        {
          id: 1,
          user: 'Jane Smith',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
          message: 'What should I wear for the portrait session?',
          timestamp: '3 hours ago',
          likes: 2
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200'
      ]
    },
    {
      id: 3,
      title: 'Corporate Event Coverage',
      date: 'Dec 25, 2024 • 6:00 PM',
      location: 'Bangalore, Karnataka',
      description: 'Professional event photography for corporate functions',
      price: '₹3,200',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      badge: 'Event',
      participants: 62,
      status: 'upcoming',
      createdAt: '2024-11-30',
      messages: [],
      photos: []
    },
    {
      id: 4,
      title: 'Live Photography Workshop',
      date: 'Dec 10, 2024 • 3:00 PM',
      location: 'Chennai, Tamil Nadu',
      description: 'Interactive live session on advanced photography techniques',
      price: '₹1,500',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      badge: 'Live',
      participants: 35,
      status: 'live',
      createdAt: '2024-12-05',
      messages: [
        {
          id: 1,
          user: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
          message: 'Great session so far! The lighting tips are amazing.',
          timestamp: '5 minutes ago',
          likes: 8
        }
      ],
      photos: []
    },
    {
      id: 5,
      title: 'Street Photography Walk',
      date: 'Dec 12, 2024 • 7:00 AM',
      location: 'Kolkata, West Bengal',
      description: 'Explore the streets and capture authentic moments',
      price: '₹1,200',
      image: 'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=400',
      badge: 'Walk',
      participants: 20,
      status: 'upcoming',
      createdAt: '2024-12-02',
      messages: [],
      photos: []
    }
  ]);

  const [pastEvents] = useState([
    {
      id: 6,
      title: 'Fashion Photography Workshop',
      date: 'Nov 30, 2024 • 11:00 AM',
      location: 'Mumbai, Maharashtra',
      description: 'Master fashion photography techniques and styling',
      price: '₹3,500',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
      badge: 'Fashion',
      participants: 38,
      status: 'completed',
      createdAt: '2024-11-25',
      messages: [
        {
          id: 1,
          user: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
          message: 'Amazing workshop! Learned so much about lighting techniques.',
          timestamp: '2 days ago',
          likes: 8
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=200',
        'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=200',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200'
      ]
    },
    {
      id: 7,
      title: 'Nature Photography Expedition',
      date: 'Nov 25, 2024 • 6:00 AM',
      location: 'Rishikesh, Uttarakhand',
      description: 'Capture the beauty of nature in its purest form',
      price: '₹2,800',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      badge: 'Nature',
      participants: 25,
      status: 'completed',
      createdAt: '2024-11-20',
      messages: [],
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200'
      ]
    },
    {
      id: 8,
      title: 'Cancelled Event Example',
      date: 'Nov 28, 2024 • 2:00 PM',
      location: 'Pune, Maharashtra',
      description: 'This event was cancelled due to unforeseen circumstances',
      price: '₹1,500',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
      badge: 'Cancelled',
      participants: 0,
      status: 'cancelled',
      createdAt: '2024-11-22',
      messages: [],
      photos: []
    }
  ]);

  const handleSendMessage = (eventId) => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage, 'for event:', eventId);
      setNewMessage('');
    }
  };

  const handleLikeMessage = (messageId) => {
    console.log('Liking message:', messageId);
  };

  const handleSharePhoto = (eventId) => {
    console.log('Sharing photo for event:', eventId);
  };

  // Filtering and sorting logic
  const getFilteredAndSortedEvents = () => {
    let currentEvents = activeTab === 'upcoming' ? events : pastEvents;
    
    // Apply status filter
    if (filterStatus !== 'all') {
      currentEvents = currentEvents.filter(event => event.status === filterStatus);
    }
    
    // Apply sorting
    const sortedEvents = [...currentEvents].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'participants':
          return b.participants - a.participants;
        case 'price-low':
          return parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', ''));
        case 'price-high':
          return parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', ''));
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    return sortedEvents;
  };

  const filteredEvents = getFilteredAndSortedEvents();

  return (
    <div className="community-buzz">
      <div className="buzz-header">
        <h1>🎉 Community Buzz</h1>
        <p>Connect with fellow photographers and share your experiences</p>
      </div>

      <div className="buzz-tabs">
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          📅 Upcoming Events ({events.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          📸 Past Events ({pastEvents.length})
        </button>
      </div>

      <div className="filter-sort-section">
        <div className="filter-group">
          <label className="filter-label">Filter by Status:</label>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({activeTab === 'upcoming' ? events.length : pastEvents.length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilterStatus('upcoming')}
            >
              🔜 Upcoming ({events.filter(e => e.status === 'upcoming').length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'live' ? 'active' : ''}`}
              onClick={() => setFilterStatus('live')}
            >
              🔴 Live ({events.filter(e => e.status === 'live').length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              ✅ Completed ({pastEvents.filter(e => e.status === 'completed').length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilterStatus('cancelled')}
            >
              ❌ Cancelled ({pastEvents.filter(e => e.status === 'cancelled').length})
            </button>
          </div>
        </div>

        <div className="sort-group">
          <label className="sort-label">Sort by:</label>
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">🕒 Most Recent</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="participants">👥 Most Participants</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💰 Price: High to Low</option>
            <option value="alphabetical">🔤 A to Z</option>
          </select>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setFilterStatus('all');
              setSortBy('recent');
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="results-counter">
        <span className="results-text">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          {filterStatus !== 'all' && ` (${filterStatus})`}
          {sortBy !== 'recent' && ` sorted by ${sortBy.replace('-', ' ')}`}
        </span>
      </div>

      <div className="events-grid">
        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              {filterStatus === 'all' 
                ? (activeTab === 'upcoming' ? '📅' : '📸')
                : filterStatus === 'live' ? '🔴' 
                : filterStatus === 'upcoming' ? '🔜'
                : filterStatus === 'completed' ? '✅'
                : '❌'
              }
            </div>
            <h3>
              {filterStatus === 'all' 
                ? (activeTab === 'upcoming' ? 'No Upcoming Events' : 'No Past Events')
                : `No ${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Events Found`
              }
            </h3>
            <p>
              {filterStatus === 'all' 
                ? (activeTab === 'upcoming' 
                  ? 'There are no upcoming events at the moment. Check back later for new opportunities!'
                  : 'No past events to display. Events you participate in will appear here.')
                : `No events match your current filter criteria. Try adjusting your filters or sorting options.`
              }
            </p>
            <div className="empty-state-actions">
              <button 
                className="empty-state-btn"
                onClick={() => {
                  setFilterStatus('all');
                  setSortBy('recent');
                }}
              >
                🔄 Reset Filters
              </button>
              <button className="empty-state-btn secondary">
                {activeTab === 'upcoming' ? 'Create Event' : 'View Upcoming Events'}
              </button>
            </div>
          </div>
        ) : (
          filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-badge">{event.badge}</div>
                <div className={`event-status ${event.status}`}>
                  {event.status === 'upcoming' ? '🔜 Upcoming' : 
                   event.status === 'completed' ? '✅ Completed' : 
                   event.status === 'cancelled' ? '❌ Cancelled' : event.status}
                </div>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-date">📅 {event.date}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-meta">
                  <span className="event-price">{event.price}</span>
                  <span className="event-participants">👥 {event.participants} participants</span>
                  <div className="event-actions">
                    <button className="action-btn primary">Join Event</button>
                    <button className="action-btn secondary">Share</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-content">
              <div className="content-tabs">
                <button 
                  className={`content-tab ${!selectedEvent || selectedEvent !== event.id ? 'active' : ''}`}
                  onClick={() => setSelectedEvent(null)}
                >
                  💬 Chat ({event.messages.length})
                </button>
                <button 
                  className={`content-tab ${selectedEvent === event.id ? 'active' : ''}`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  📷 Photos ({event.photos.length})
                </button>
              </div>

              <div className="content-area">
                {(!selectedEvent || selectedEvent !== event.id) ? (
                  <div className="chat-section">
                    <div className="messages">
                      {event.messages.length > 0 ? (
                        event.messages.map((msg) => (
                          <div key={msg.id} className="message">
                            <div className="message-header">
                              <img src={msg.avatar} alt={msg.user} className="message-avatar" />
                              <div className="message-info">
                                <span className="message-user">{msg.user}</span>
                                <span className="message-time">{msg.timestamp}</span>
                              </div>
                            </div>
                            <p className="message-text">{msg.message}</p>
                            <button 
                              className="like-btn"
                              onClick={() => handleLikeMessage(msg.id)}
                            >
                              ❤️ {msg.likes}
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="no-messages">
                          <p>No messages yet. Be the first to start the conversation!</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="message-input">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(event.id)}
                      />
                      <button 
                        className="send-btn"
                        onClick={() => handleSendMessage(event.id)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="photos-section">
                    {event.photos.length > 0 ? (
                      <div className="photos-grid">
                        {event.photos.map((photo, index) => (
                          <div key={index} className="photo-item">
                            <img src={photo} alt={`Event photo ${index + 1}`} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-photos">
                        <p>No photos shared yet.</p>
                      </div>
                    )}
                    
                    <button 
                      className="share-photo-btn"
                      onClick={() => handleSharePhoto(event.id)}
                    >
                      📷 Share Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommunityBuzz;












