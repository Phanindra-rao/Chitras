import React, { useState } from 'react';
import './CommunityBuzz.css';

function CommunityBuzz({ currentUser }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [newMessage, setNewMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      messages: [],
      photos: []
    }
  ]);

  const [pastEvents] = useState([
    {
      id: 4,
      title: 'Fashion Photography Workshop',
      date: 'Nov 30, 2024 • 11:00 AM',
      location: 'Mumbai, Maharashtra',
      description: 'Master fashion photography techniques and styling',
      price: '₹3,500',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
      badge: 'Fashion',
      participants: 38,
      status: 'completed',
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

  const filteredEvents = activeTab === 'upcoming' ? events : pastEvents;

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

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-badge">{event.badge}</div>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-date">📅 {event.date}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-meta">
                  <span className="event-price">{event.price}</span>
                  <span className="event-participants">👥 {event.participants} participants</span>
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
        ))}
      </div>
    </div>
  );
}

export default CommunityBuzz;


