import React, { useState } from 'react';
import './PhotographerDashboard.css';

function PhotographerDashboard({ user }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const upcomingEvents = [
    {
      id: 1,
      title: 'Wedding Photography - Sarah & John',
      date: 'Dec 20, 2024',
      time: '10:00 AM',
      location: 'Taj Palace, Mumbai',
      status: 'confirmed',
      client: 'Sarah Wilson',
      budget: '₹25,000'
    },
    {
      id: 2,
      title: 'Corporate Event - Tech Summit',
      date: 'Dec 22, 2024',
      time: '2:00 PM',
      location: 'Convention Center, Delhi',
      status: 'pending',
      client: 'TechCorp India',
      budget: '₹15,000'
    },
    {
      id: 3,
      title: 'Fashion Shoot - Vogue Magazine',
      date: 'Dec 25, 2024',
      time: '9:00 AM',
      location: 'Studio 5, Bangalore',
      status: 'confirmed',
      client: 'Vogue India',
      budget: '₹30,000'
    }
  ];

  const recentUploads = [
    {
      id: 1,
      title: 'Wedding Collection - Golden Hour',
      category: 'Wedding',
      uploadDate: '2 hours ago',
      likes: 45,
      comments: 12,
      saves: 8,
      views: 234
    },
    {
      id: 2,
      title: 'Fashion Editorial - Winter Collection',
      category: 'Fashion',
      uploadDate: '1 day ago',
      likes: 78,
      comments: 23,
      saves: 15,
      views: 456
    },
    {
      id: 3,
      title: 'Corporate Headshots - CEO Series',
      category: 'Corporate',
      uploadDate: '3 days ago',
      likes: 32,
      comments: 8,
      saves: 5,
      views: 189
    }
  ];

  const engagementHighlights = {
    moodboardSaves: 3,
    photoViews: 120,
    bookingInquiries: 2,
    newFollowers: 8,
    profileVisits: 45
  };

  const jobBoardPreview = [
    {
      id: 1,
      title: 'New Year Party Photography',
      location: 'Mumbai',
      budget: '₹12,000',
      date: 'Dec 31, 2024',
      category: 'Event',
      postedBy: 'Party Planners Inc'
    },
    {
      id: 2,
      title: 'Product Photography - E-commerce',
      location: 'Delhi',
      budget: '₹8,000',
      date: 'Jan 5, 2025',
      category: 'Commercial',
      postedBy: 'Fashion Store'
    },
    {
      id: 3,
      title: 'Real Estate Photography',
      location: 'Bangalore',
      budget: '₹6,000',
      date: 'Jan 10, 2025',
      category: 'Real Estate',
      postedBy: 'Property Developers'
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Alex Chen', points: 2450, specialty: 'Wedding' },
    { rank: 2, name: 'Priya Sharma', points: 2380, specialty: 'Fashion' },
    { rank: 3, name: 'Rahul Kumar', points: 2150, specialty: 'Event' },
    { rank: 4, name: user?.name || 'You', points: 1980, specialty: 'Portrait' }
  ];

  const renderEventsBookings = () => (
    <div className="events-bookings">
      <div className="events-header">
        <h1>📅 Events & Bookings</h1>
        <div className="events-actions">
          <button className="add-event-btn">➕ Add Event</button>
          <button className="calendar-view-btn">📅 Calendar View</button>
        </div>
      </div>

      {/* Booking Stats */}
      <div className="booking-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Pending Requests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>45</h3>
            <p>Completed Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹2.4L</h3>
            <p>This Month</p>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="calendar-section">
        <div className="section-header">
          <h2>📅 Calendar</h2>
          <div className="calendar-controls">
            <button className="calendar-btn">‹</button>
            <span className="current-month">December 2024</span>
            <button className="calendar-btn">›</button>
          </div>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day">
            <div className="day-number">1</div>
            <div className="day-events">
              <div className="event-dot confirmed"></div>
            </div>
          </div>
          <div className="calendar-day">
            <div className="day-number">2</div>
            <div className="day-events">
              <div className="event-dot pending"></div>
            </div>
          </div>
          <div className="calendar-day">
            <div className="day-number">3</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">4</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">5</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">6</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">7</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">8</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">9</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">10</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">11</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">12</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">13</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">14</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">15</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">16</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">17</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">18</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">19</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">20</div>
            <div className="day-events">
              <div className="event-dot confirmed"></div>
              <div className="event-dot confirmed"></div>
            </div>
          </div>
          <div className="calendar-day">
            <div className="day-number">21</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">22</div>
            <div className="day-events">
              <div className="event-dot pending"></div>
            </div>
          </div>
          <div className="calendar-day">
            <div className="day-number">23</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">24</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">25</div>
            <div className="day-events">
              <div className="event-dot confirmed"></div>
            </div>
          </div>
          <div className="calendar-day">
            <div className="day-number">26</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">27</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">28</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">29</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">30</div>
            <div className="day-events"></div>
          </div>
          <div className="calendar-day">
            <div className="day-number">31</div>
            <div className="day-events">
              <div className="event-dot confirmed"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events-section">
        <div className="section-header">
          <h2>⏰ Upcoming Events</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="events-list">
          <div className="event-card">
            <div className="event-date">
              <div className="date-day">20</div>
              <div className="date-month">Dec</div>
            </div>
            <div className="event-details">
              <h4>Wedding Photography - Sarah & John</h4>
              <p className="event-time">10:00 AM - 6:00 PM</p>
              <p className="event-location">📍 Taj Palace, Mumbai</p>
              <p className="event-client">👤 Sarah Wilson</p>
              <div className="event-tags">
                <span className="tag confirmed">Confirmed</span>
                <span className="tag budget">₹25,000</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="action-btn chat">💬</button>
              <button className="action-btn edit">✏️</button>
              <button className="action-btn more">⋯</button>
            </div>
          </div>

          <div className="event-card">
            <div className="event-date">
              <div className="date-day">22</div>
              <div className="date-month">Dec</div>
            </div>
            <div className="event-details">
              <h4>Corporate Event - Tech Summit</h4>
              <p className="event-time">2:00 PM - 8:00 PM</p>
              <p className="event-location">📍 Convention Center, Delhi</p>
              <p className="event-client">👤 TechCorp India</p>
              <div className="event-tags">
                <span className="tag pending">Pending</span>
                <span className="tag budget">₹15,000</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="action-btn accept">✅</button>
              <button className="action-btn decline">❌</button>
              <button className="action-btn chat">💬</button>
            </div>
          </div>

          <div className="event-card">
            <div className="event-date">
              <div className="date-day">25</div>
              <div className="date-month">Dec</div>
            </div>
            <div className="event-details">
              <h4>Fashion Shoot - Vogue Magazine</h4>
              <p className="event-time">9:00 AM - 5:00 PM</p>
              <p className="event-location">📍 Studio 5, Bangalore</p>
              <p className="event-client">👤 Vogue India</p>
              <div className="event-tags">
                <span className="tag confirmed">Confirmed</span>
                <span className="tag budget">₹30,000</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="action-btn chat">💬</button>
              <button className="action-btn edit">✏️</button>
              <button className="action-btn more">⋯</button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Requests */}
      <div className="booking-requests">
        <div className="section-header">
          <h2>📋 Booking Requests</h2>
          <div className="request-filters">
            <button className="filter-btn active">All (5)</button>
            <button className="filter-btn">Pending (3)</button>
            <button className="filter-btn">Accepted (2)</button>
          </div>
        </div>
        <div className="requests-list">
          <div className="request-card">
            <div className="request-header">
              <div className="client-info">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50" alt="Client" className="client-avatar" />
                <div className="client-details">
                  <h4>Emma Davis</h4>
                  <p>Birthday Party Photography</p>
                </div>
              </div>
              <div className="request-status pending">Pending</div>
            </div>
            <div className="request-details">
              <p><strong>Date:</strong> Dec 28, 2024</p>
              <p><strong>Time:</strong> 6:00 PM - 11:00 PM</p>
              <p><strong>Location:</strong> Grand Hotel, Mumbai</p>
              <p><strong>Budget:</strong> ₹8,000</p>
              <p><strong>Message:</strong> "Hi! I'm planning my daughter's Sweet 16 party and would love to have professional photos. Can you please let me know your availability?"</p>
            </div>
            <div className="request-actions">
              <button className="accept-btn">Accept</button>
              <button className="decline-btn">Decline</button>
              <button className="message-btn">Message</button>
            </div>
          </div>

          <div className="request-card">
            <div className="request-header">
              <div className="client-info">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50" alt="Client" className="client-avatar" />
                <div className="client-details">
                  <h4>Michael Chen</h4>
                  <p>Corporate Headshots</p>
                </div>
              </div>
              <div className="request-status accepted">Accepted</div>
            </div>
            <div className="request-details">
              <p><strong>Date:</strong> Jan 5, 2025</p>
              <p><strong>Time:</strong> 10:00 AM - 2:00 PM</p>
              <p><strong>Location:</strong> Office Building, Delhi</p>
              <p><strong>Budget:</strong> ₹12,000</p>
              <p><strong>Message:</strong> "Need professional headshots for our team of 20 people. Please confirm availability."</p>
            </div>
            <div className="request-actions">
              <button className="message-btn">Message</button>
              <button className="edit-btn">Edit Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolioManager = () => (
    <div className="portfolio-manager">
      <div className="portfolio-header">
        <h1>📂 Portfolio Manager</h1>
        <div className="portfolio-actions">
          <button className="upload-btn">📤 Upload Photos</button>
          <button className="create-gallery-btn">📁 Create Gallery</button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="portfolio-stats">
        <div className="stat-item">
          <div className="stat-number">24</div>
          <div className="stat-label">Total Galleries</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1,247</div>
          <div className="stat-label">Total Photos</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">89</div>
          <div className="stat-label">Featured Work</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2.3M</div>
          <div className="stat-label">Total Views</div>
        </div>
      </div>

      {/* Gallery Categories */}
      <div className="gallery-categories">
        <h2>Gallery Categories</h2>
        <div className="category-tabs">
          <button className="category-tab active">All (24)</button>
          <button className="category-tab">Wedding (8)</button>
          <button className="category-tab">Fashion (5)</button>
          <button className="category-tab">Corporate (4)</button>
          <button className="category-tab">Event (3)</button>
          <button className="category-tab">Portrait (2)</button>
          <button className="category-tab">Real Estate (2)</button>
        </div>
      </div>

      {/* Featured Work */}
      <div className="featured-work-section">
        <div className="section-header">
          <h2>⭐ Featured Work</h2>
          <button className="manage-featured-btn">Manage Featured</button>
        </div>
        <div className="featured-grid">
          <div className="featured-item">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=300" alt="Featured 1" />
            <div className="featured-overlay">
              <h4>Golden Hour Wedding</h4>
              <p>Wedding Photography</p>
              <div className="featured-stats">
                <span>❤️ 234</span>
                <span>👁️ 1.2k</span>
                <span>🔖 45</span>
              </div>
            </div>
          </div>
          <div className="featured-item">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300" alt="Featured 2" />
            <div className="featured-overlay">
              <h4>Fashion Editorial</h4>
              <p>Fashion Photography</p>
              <div className="featured-stats">
                <span>❤️ 189</span>
                <span>👁️ 856</span>
                <span>🔖 32</span>
              </div>
            </div>
          </div>
          <div className="featured-item">
            <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300" alt="Featured 3" />
            <div className="featured-overlay">
              <h4>Corporate Headshots</h4>
              <p>Corporate Photography</p>
              <div className="featured-stats">
                <span>❤️ 156</span>
                <span>👁️ 678</span>
                <span>🔖 28</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Galleries */}
      <div className="recent-galleries">
        <div className="section-header">
          <h2>📁 Recent Galleries</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="galleries-grid">
          <div className="gallery-card">
            <div className="gallery-preview">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=200" alt="Gallery 1" />
              <div className="gallery-overlay">
                <button className="gallery-action">👁️</button>
                <button className="gallery-action">✏️</button>
                <button className="gallery-action">⚙️</button>
              </div>
            </div>
            <div className="gallery-info">
              <h4>Wedding Collection - Sarah & John</h4>
              <p className="gallery-meta">45 photos • 2 days ago</p>
              <div className="gallery-tags">
                <span className="tag">Wedding</span>
                <span className="tag">Golden Hour</span>
                <span className="tag">Featured</span>
              </div>
              <div className="gallery-stats">
                <span>❤️ 234</span>
                <span>👁️ 1.2k</span>
                <span>🔖 45</span>
              </div>
            </div>
          </div>

          <div className="gallery-card">
            <div className="gallery-preview">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200" alt="Gallery 2" />
              <div className="gallery-overlay">
                <button className="gallery-action">👁️</button>
                <button className="gallery-action">✏️</button>
                <button className="gallery-action">⚙️</button>
              </div>
            </div>
            <div className="gallery-info">
              <h4>Fashion Editorial - Winter 2024</h4>
              <p className="gallery-meta">32 photos • 5 days ago</p>
              <div className="gallery-tags">
                <span className="tag">Fashion</span>
                <span className="tag">Editorial</span>
                <span className="tag">Studio</span>
              </div>
              <div className="gallery-stats">
                <span>❤️ 189</span>
                <span>👁️ 856</span>
                <span>🔖 32</span>
              </div>
            </div>
          </div>

          <div className="gallery-card">
            <div className="gallery-preview">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200" alt="Gallery 3" />
              <div className="gallery-overlay">
                <button className="gallery-action">👁️</button>
                <button className="gallery-action">✏️</button>
                <button className="gallery-action">⚙️</button>
              </div>
            </div>
            <div className="gallery-info">
              <h4>Corporate Event - Tech Summit</h4>
              <p className="gallery-meta">28 photos • 1 week ago</p>
              <div className="gallery-tags">
                <span className="tag">Corporate</span>
                <span className="tag">Event</span>
                <span className="tag">Conference</span>
              </div>
              <div className="gallery-stats">
                <span>❤️ 156</span>
                <span>👁️ 678</span>
                <span>🔖 28</span>
              </div>
            </div>
          </div>

          <div className="gallery-card">
            <div className="gallery-preview">
              <img src="https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=200" alt="Gallery 4" />
              <div className="gallery-overlay">
                <button className="gallery-action">👁️</button>
                <button className="gallery-action">✏️</button>
                <button className="gallery-action">⚙️</button>
              </div>
            </div>
            <div className="gallery-info">
              <h4>Birthday Party - Emma's Sweet 16</h4>
              <p className="gallery-meta">38 photos • 2 weeks ago</p>
              <div className="gallery-tags">
                <span className="tag">Event</span>
                <span className="tag">Birthday</span>
                <span className="tag">Candid</span>
              </div>
              <div className="gallery-stats">
                <span>❤️ 98</span>
                <span>👁️ 432</span>
                <span>🔖 15</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark Settings */}
      <div className="watermark-settings">
        <h2>🏷️ Watermark Settings</h2>
        <div className="watermark-options">
          <div className="watermark-option">
            <input type="radio" id="no-watermark" name="watermark" defaultChecked />
            <label htmlFor="no-watermark">No Watermark</label>
          </div>
          <div className="watermark-option">
            <input type="radio" id="text-watermark" name="watermark" />
            <label htmlFor="text-watermark">Text Watermark</label>
          </div>
          <div className="watermark-option">
            <input type="radio" id="logo-watermark" name="watermark" />
            <label htmlFor="logo-watermark">Logo Watermark</label>
          </div>
        </div>
        <div className="watermark-preview">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=200" alt="Watermark Preview" />
          <div className="watermark-text">© Your Name</div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-main">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome back, {user?.name || 'Photographer'}! 👋</h1>
        <p>Here's what's happening with your photography business today</p>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{upcomingEvents.length}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📸</div>
          <div className="stat-content">
            <h3>{recentUploads.length}</h3>
            <p>Recent Uploads</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h3>{engagementHighlights.bookingInquiries}</h3>
            <p>New Inquiries</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{engagementHighlights.newFollowers}</h3>
            <p>New Followers</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Upcoming Events */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>📅 Upcoming Events</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-item">
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p className="event-details">
                    📅 {event.date} at {event.time}<br/>
                    📍 {event.location}<br/>
                    👤 {event.client}
                  </p>
                </div>
                <div className="event-actions">
                  <span className={`status-badge ${event.status}`}>{event.status}</span>
                  <div className="event-budget">{event.budget}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>📸 Recent Uploads</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="uploads-list">
            {recentUploads.map(upload => (
              <div key={upload.id} className="upload-item">
                <div className="upload-info">
                  <h4>{upload.title}</h4>
                  <p className="upload-category">{upload.category}</p>
                  <p className="upload-date">{upload.uploadDate}</p>
                </div>
                <div className="upload-stats">
                  <div className="stat">❤️ {upload.likes}</div>
                  <div className="stat">💬 {upload.comments}</div>
                  <div className="stat">🔖 {upload.saves}</div>
                  <div className="stat">👁️ {upload.views}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Highlights */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>📊 Engagement Highlights</h2>
          </div>
          <div className="engagement-stats">
            <div className="engagement-item">
              <span className="engagement-icon">🔖</span>
              <span className="engagement-text">{engagementHighlights.moodboardSaves} new moodboard saves</span>
            </div>
            <div className="engagement-item">
              <span className="engagement-icon">👁️</span>
              <span className="engagement-text">{engagementHighlights.photoViews} photo views today</span>
            </div>
            <div className="engagement-item">
              <span className="engagement-icon">💬</span>
              <span className="engagement-text">{engagementHighlights.bookingInquiries} booking inquiries</span>
            </div>
            <div className="engagement-item">
              <span className="engagement-icon">👥</span>
              <span className="engagement-text">{engagementHighlights.newFollowers} new followers</span>
            </div>
            <div className="engagement-item">
              <span className="engagement-icon">📈</span>
              <span className="engagement-text">{engagementHighlights.profileVisits} profile visits</span>
            </div>
          </div>
        </div>

        {/* Job Board Preview */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>💼 Job Board Preview</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="job-list">
            {jobBoardPreview.map(job => (
              <div key={job.id} className="job-item">
                <div className="job-info">
                  <h4>{job.title}</h4>
                  <p className="job-details">
                    📍 {job.location} • 📅 {job.date}<br/>
                    🏷️ {job.category} • 👤 {job.postedBy}
                  </p>
                </div>
                <div className="job-actions">
                  <div className="job-budget">{job.budget}</div>
                  <button className="apply-btn">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>🏆 Photographer Leaderboard</h2>
          </div>
          <div className="leaderboard">
            {leaderboardData.map(photographer => (
              <div key={photographer.rank} className={`leaderboard-item ${photographer.name === user?.name ? 'current-user' : ''}`}>
                <div className="rank">#{photographer.rank}</div>
                <div className="photographer-info">
                  <div className="name">{photographer.name}</div>
                  <div className="specialty">{photographer.specialty}</div>
                </div>
                <div className="points">{photographer.points} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="photographer-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <h2>📸 Chitrasethu Pro</h2>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search gigs, clients, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        <div className="header-right">
          <button className="header-action-btn" title="Upload Photos">📤</button>
          <button className="header-action-btn" title="Calendar">📅</button>
          <button className="header-action-btn" title="Messages">💬</button>
          <button className="header-action-btn" title="Notifications">🔔</button>
          <button className="header-action-btn" title="Profile">⚙️</button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Dashboard</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}
              onClick={() => setActiveSection('portfolio')}
            >
              <span className="nav-icon">📂</span>
              <span className="nav-text">My Portfolio</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'events' ? 'active' : ''}`}
              onClick={() => setActiveSection('events')}
            >
              <span className="nav-icon">📅</span>
              <span className="nav-text">Events & Bookings</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'jobboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('jobboard')}
            >
              <span className="nav-icon">💼</span>
              <span className="nav-text">Job Board</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveSection('analytics')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Analytics</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'community' ? 'active' : ''}`}
              onClick={() => setActiveSection('community')}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-text">Community</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'learning' ? 'active' : ''}`}
              onClick={() => setActiveSection('learning')}
            >
              <span className="nav-icon">🎓</span>
              <span className="nav-text">Learning Hub</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveSection('wallet')}
            >
              <span className="nav-icon">💰</span>
              <span className="nav-text">Wallet & Earnings</span>
            </button>
            <button 
              className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveSection('settings')}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'portfolio' && renderPortfolioManager()}
          {activeSection === 'events' && renderEventsBookings()}
          {activeSection === 'jobboard' && <div className="coming-soon">Job Board - Coming Soon</div>}
          {activeSection === 'analytics' && <div className="coming-soon">Analytics - Coming Soon</div>}
          {activeSection === 'community' && <div className="coming-soon">Community - Coming Soon</div>}
          {activeSection === 'learning' && <div className="coming-soon">Learning Hub - Coming Soon</div>}
          {activeSection === 'wallet' && <div className="coming-soon">Wallet & Earnings - Coming Soon</div>}
          {activeSection === 'settings' && <div className="coming-soon">Settings - Coming Soon</div>}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="notifications-section">
            <h3>🔔 Notifications</h3>
            <div className="notification-item">
              <span className="notification-text">New moodboard save on your wedding collection</span>
              <span className="notification-time">2m ago</span>
            </div>
            <div className="notification-item">
              <span className="notification-text">Booking inquiry from Sarah Wilson</span>
              <span className="notification-time">1h ago</span>
            </div>
            <div className="notification-item">
              <span className="notification-text">New follower: Alex Chen</span>
              <span className="notification-time">3h ago</span>
            </div>
          </div>

          <div className="quick-actions">
            <h3>⚡ Quick Actions</h3>
            <button className="quick-action-btn">📤 Upload Photos</button>
            <button className="quick-action-btn">💼 Apply for Gig</button>
            <button className="quick-action-btn">💰 Check Earnings</button>
            <button className="quick-action-btn">📊 View Analytics</button>
          </div>

          <div className="tips-section">
            <h3>💡 Tip of the Day</h3>
            <p>Golden hour photography (1 hour after sunrise or before sunset) creates the most flattering natural light for portraits. Plan your shoots accordingly!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotographerDashboard;