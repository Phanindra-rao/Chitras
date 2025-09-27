import React, { useState, useEffect } from 'react';
import './PhotographerDashboard.css';
import PhotographerProfile from '../PhotographerProfile/PhotographerProfile';
import Photobooth from '../Photobooth/Photobooth';

function PhotographerDashboard({ currentUser, photographers, users, onViewProfile, onNavigateToPhotographer }) {
  const [activeView, setActiveView] = useState('home');
  const [leftPanelActive, setLeftPanelActive] = useState('profile');
  const [leftPanelSubActive, setLeftPanelSubActive] = useState(null);
  const [jobsTab, setJobsTab] = useState('post');
  const [portfolioPhotos, setPortfolioPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', category: 'wedding', isFeatured: true },
    { id: 2, url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', category: 'portrait', isFeatured: false },
    { id: 3, url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', category: 'event', isFeatured: true }
  ]);
  const [services, setServices] = useState([
    { id: 1, name: 'Wedding Photography', price: 50000, duration: 'Full Day', description: 'Complete wedding day coverage', isActive: true },
    { id: 2, name: 'Portrait Session', price: 15000, duration: '2 Hours', description: 'Professional portrait photography', isActive: true },
    { id: 3, name: 'Event Coverage', price: 25000, duration: 'Half Day', description: 'Corporate and social events', isActive: true }
  ]);

  // Event media management
  const [eventMedia, setEventMedia] = useState({
    1: [
      { id: 1, type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', name: 'Wedding Ceremony', uploadedAt: '2024-01-15T10:30:00Z' },
      { id: 2, type: 'video', url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', name: 'Reception Highlights', uploadedAt: '2024-01-15T12:00:00Z' },
      { id: 3, type: 'photo', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', name: 'Family Portraits', uploadedAt: '2024-01-15T14:00:00Z' }
    ],
    2: [
      { id: 4, type: 'photo', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', name: 'Conference Setup', uploadedAt: '2024-01-20T09:00:00Z' },
      { id: 5, type: 'photo', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400', name: 'Keynote Speaker', uploadedAt: '2024-01-20T10:30:00Z' }
    ]
  });

  const [selectedEventForMedia, setSelectedEventForMedia] = useState(null);
  const [mediaUploadModal, setMediaUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  
  // Sample data for photographer
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      name: "Wedding Photography - Sarah & John",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "Grand Hotel, Mumbai",
      status: "confirmed",
      client: "Sarah Johnson",
      package: "Premium Wedding Package",
      price: "₹50,000"
    },
    {
      id: 2,
      name: "Corporate Event - Tech Conference",
      date: "2024-02-20",
      time: "9:00 AM",
      location: "Convention Center, Delhi",
      status: "confirmed",
      client: "Tech Corp",
      package: "Corporate Event Package",
      price: "₹25,000"
    }
  ]);

  const [newRequests, setNewRequests] = useState([
    {
      id: 1,
      clientName: "Priya Sharma",
      eventType: "Birthday Party",
      date: "2024-02-25",
      location: "Mumbai",
      budget: "₹15,000",
      description: "Looking for a photographer for my daughter's 10th birthday party",
      status: "pending"
    },
    {
      id: 2,
      clientName: "Raj Patel",
      eventType: "Corporate Meeting",
      date: "2024-02-28",
      location: "Ahmedabad",
      budget: "₹20,000",
      description: "Need professional photography for our quarterly meeting",
      status: "pending"
    }
  ]);

  const [publicRequests, setPublicRequests] = useState([
    {
      id: 1,
      clientName: "Anita Singh",
      eventType: "Wedding",
      date: "2024-03-05",
      location: "Jaipur",
      budget: "₹75,000",
      description: "Traditional Indian wedding photography needed",
      status: "open"
    },
    {
      id: 2,
      clientName: "Vikram Kumar",
      eventType: "Product Launch",
      date: "2024-03-10",
      location: "Bangalore",
      budget: "₹35,000",
      description: "Product launch event photography",
      status: "open"
    }
  ]);

  const [photographerFeed, setPhotographerFeed] = useState([
    {
      id: 1,
      type: "event_completion",
      photographerName: "Rajesh Kumar",
      eventName: "Corporate Event",
      timestamp: "2 hours ago",
      photos: ["https://images.unsplash.com/photo-1511578314322-379afb476865?w=400", "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400"],
      likes: 15,
      comments: 3
    },
    {
      id: 2,
      type: "new_booking",
      photographerName: "Priya Sharma",
      eventName: "Wedding Photography",
      timestamp: "4 hours ago",
      message: "Just booked a new wedding for next month!",
      likes: 8,
      comments: 2
    }
  ]);

  const [jobPosts, setJobPosts] = useState([
    {
      id: 1,
      title: "Need Video Editor",
      description: "Looking for a skilled video editor for wedding highlights",
      budget: "₹10,000",
      postedBy: "Rajesh Kumar",
      timestamp: "1 day ago",
      replies: 3
    }
  ]);

  const [jobRequests, setJobRequests] = useState([
    {
      id: 1,
      title: "Wedding Photography Assistant",
      description: "Need an assistant photographer for a wedding next weekend",
      budget: "₹5,000",
      postedBy: "Priya Sharma",
      timestamp: "2 hours ago",
      status: "open"
    }
  ]);

  const handleAcceptRequest = (requestId) => {
    setNewRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
  };

  const handleDeclineRequest = (requestId) => {
    setNewRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'declined' } : req
    ));
  };

  const handleApplyToRequest = (requestId) => {
    setPublicRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'applied' } : req
    ));
  };

  // Left panel navigation handlers
  const handleLeftPanelNavigation = (section) => {
    setLeftPanelActive(section);
    setLeftPanelSubActive(null);
    console.log('Navigating to:', section);
  };

  const handleSubNavigation = (subSection) => {
    setLeftPanelSubActive(subSection);
    console.log('Navigating to sub-section:', subSection);
  };

  // Portfolio management handlers
  const handleAddPortfolioPhoto = (file) => {
    const newPhoto = {
      id: Date.now(),
      url: URL.createObjectURL(file),
      category: 'general',
      isFeatured: false
    };
    setPortfolioPhotos(prev => [...prev, newPhoto]);
  };

  const handleRemovePortfolioPhoto = (photoId) => {
    setPortfolioPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const handleUpdatePhotoCategory = (photoId, category) => {
    setPortfolioPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, category } : photo
    ));
  };

  const handleToggleFeatured = (photoId) => {
    setPortfolioPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, isFeatured: !photo.isFeatured } : photo
    ));
  };

  // Services management handlers
  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      name: 'New Service',
      price: 0,
      duration: '1 Hour',
      description: 'Service description',
      isActive: true
    };
    setServices(prev => [...prev, newService]);
  };

  const handleUpdateService = (serviceId, field, value) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
  };

  const handleRemoveService = (serviceId) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const handleToggleServiceActive = (serviceId) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, isActive: !service.isActive } : service
    ));
  };

  // Event media handlers
  const handleAddMediaToEvent = (eventId) => {
    setSelectedEventForMedia(eventId);
    setMediaUploadModal(true);
  };

  const handleDeleteMedia = (eventId, mediaId) => {
    setEventMedia(prev => ({
      ...prev,
      [eventId]: prev[eventId].filter(media => media.id !== mediaId)
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUploadMedia = async () => {
    if (selectedFiles.length === 0 || !selectedEventForMedia) return;

    const newMedia = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      type: file.type.startsWith('video/') ? 'video' : 'photo',
      url: URL.createObjectURL(file),
      name: file.name,
      uploadedAt: new Date().toISOString()
    }));

    setEventMedia(prev => ({
      ...prev,
      [selectedEventForMedia]: [...(prev[selectedEventForMedia] || []), ...newMedia]
    }));

    setSelectedFiles([]);
    setMediaUploadModal(false);
    setSelectedEventForMedia(null);
  };

  const renderHeader = () => (
    <div className="photographer-header">
      <div className="header-content">
        <div className="logo-section">
          <h1>Chitrasethu</h1>
          <span className="user-type">Photographer</span>
      </div>

        <nav className="header-nav">
          <button 
            className={`nav-item ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => setActiveView('home')}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-item ${activeView === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveView('requests')}
          >
            📋 Requests
          </button>
          <button 
            className={`nav-item ${activeView === 'community' ? 'active' : ''}`}
            onClick={() => setActiveView('community')}
          >
            💬 Community Buzz
          </button>
          <button 
            className={`nav-item ${activeView === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveView('jobs')}
          >
            💼 Jobs
          </button>
          <button 
            className={`nav-item ${activeView === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveView('bookings')}
          >
            📖 Bookings
          </button>
          <button 
            className={`nav-item ${activeView === 'photobooth' ? 'active' : ''}`}
            onClick={() => setActiveView('photobooth')}
          >
            📸 Photobooth
          </button>
          <button 
            className={`nav-item ${activeView === 'maps' ? 'active' : ''}`}
            onClick={() => setActiveView('maps')}
          >
            🗺️ Maps
          </button>
        </nav>

        <div className="header-actions">
          <button className="messenger-btn" onClick={() => setActiveView('messaging')}>
            💬 Messages
          </button>
          <div className="user-profile">
            <img src={currentUser?.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40"} alt="Profile" />
            <span>{currentUser?.name}</span>
          </div>
        </div>
          </div>
        </div>
  );

  const renderLeftPanel = () => (
    <div className="left-panel">
      <div className="panel-section">
        <h3>Navigation</h3>
        <div className="nav-items">
          <button 
            className={`nav-item ${leftPanelActive === 'profile' ? 'active' : ''}`}
            onClick={() => handleLeftPanelNavigation('profile')}
          >
            👤 My Profile
          </button>
          {leftPanelActive === 'profile' && (
            <div className="sub-nav">
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'edit-profile' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('edit-profile')}
              >
                Edit Profile
              </button>
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'view-public' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('view-public')}
              >
                View as Public
              </button>
          </div>
          )}
          
          <button 
            className={`nav-item ${leftPanelActive === 'event-photos' ? 'active' : ''}`}
            onClick={() => handleLeftPanelNavigation('event-photos')}
          >
            📸 Event Photos
          </button>
          {leftPanelActive === 'event-photos' && (
            <div className="sub-nav">
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'your-events' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('your-events')}
              >
                Your Events
              </button>
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'public-events' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('public-events')}
              >
                Public Events
              </button>
        </div>
          )}
          
          <button 
            className={`nav-item ${leftPanelActive === 'moodboards' ? 'active' : ''}`}
            onClick={() => handleLeftPanelNavigation('moodboards')}
          >
            🎨 Moodboards
          </button>
          {leftPanelActive === 'moodboards' && (
            <div className="sub-nav">
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'editor' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('editor')}
              >
                Editor
              </button>
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'public-moodboards' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('public-moodboards')}
              >
                Public
              </button>
          </div>
          )}
          
          <button 
            className={`nav-item ${leftPanelActive === 'community' ? 'active' : ''}`}
            onClick={() => handleLeftPanelNavigation('community')}
          >
            👥 Community
          </button>
          {leftPanelActive === 'community' && (
            <div className="sub-nav">
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'create-group' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('create-group')}
              >
                Create Group
              </button>
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'share-work' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('share-work')}
              >
                Share Work
              </button>
              <button 
                className={`sub-nav-item ${leftPanelSubActive === 'collaborate' ? 'active' : ''}`}
                onClick={() => handleSubNavigation('collaborate')}
              >
                Collaborate
              </button>
          </div>
          )}
        </div>
            </div>
          </div>
  );

  const renderMiddleSection = () => (
    <div className="middle-section">
      <div className="feed-header">
        <h2>Photographer Feed</h2>
        <button className="refresh-btn">🔄 Refresh</button>
            </div>

      <div className="feed-content">
        {photographerFeed.map(item => (
          <div key={item.id} className="feed-item">
            <div className="feed-header-info">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40" alt="Photographer" />
              <div className="feed-info">
                <h4>{item.photographerName}</h4>
                <p>{item.timestamp}</p>
          </div>
          </div>
            
            <div className="feed-content-main">
              {item.type === 'event_completion' && (
                <div>
                  <p>Completed <strong>{item.eventName}</strong></p>
                  <div className="feed-photos">
                    {item.photos.map((photo, index) => (
                      <img key={index} src={photo} alt="Event photo" />
                    ))}
          </div>
          </div>
              )}
              {item.type === 'new_booking' && (
                <p>{item.message}</p>
              )}
          </div>
            
            <div className="feed-actions">
              <button>❤️ {item.likes}</button>
              <button>💬 {item.comments}</button>
              <button>📤 Share</button>
          </div>
          </div>
        ))}
          </div>
          </div>
  );

  const renderRightPanel = () => (
    <div className="right-panel">
      {/* Upcoming Events */}
      <div className="panel-section">
        <h3>📅 Upcoming Events</h3>
        <div className="events-list">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-info">
                  <h4>{event.name}</h4>
                  <p>📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                  <p>📍 {event.location}</p>
                  <p>👤 {event.client}</p>
                  <p>💰 {event.price}</p>
          </div>
                <div className="event-status">
                  <span className={`status-badge ${event.status}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
          </div>
          </div>
            ))
          ) : (
            <div className="no-events">
              <p>No upcoming events</p>
              <button className="explore-btn">Explore Opportunities</button>
          </div>
          )}
          </div>
          </div>

      {/* New Requests */}
      <div className="panel-section">
        <h3>🆕 New Requests</h3>
        <div className="requests-list">
          {newRequests.filter(req => req.status === 'pending').map(request => (
            <div key={request.id} className="request-card">
              <div className="request-info">
                <h4>{request.clientName}</h4>
                <p>📅 {new Date(request.date).toLocaleDateString()}</p>
                <p>📍 {request.location}</p>
                <p>💰 Budget: {request.budget}</p>
                <p>{request.description}</p>
          </div>
              <div className="request-actions">
                <button 
                  className="accept-btn"
                  onClick={() => handleAcceptRequest(request.id)}
                >
                  ✅ Accept
                </button>
                <button 
                  className="decline-btn"
                  onClick={() => handleDeclineRequest(request.id)}
                >
                  ❌ Decline
                </button>
          </div>
          </div>
          ))}
            </div>
          </div>

      {/* Public Requests */}
      <div className="panel-section">
        <h3>🌐 Public Requests</h3>
        <div className="public-requests-list">
          {publicRequests.filter(req => req.status === 'open').map(request => (
            <div key={request.id} className="public-request-card">
              <div className="request-info">
                <h4>{request.clientName}</h4>
                <p>📅 {new Date(request.date).toLocaleDateString()}</p>
                <p>📍 {request.location}</p>
                <p>💰 Budget: {request.budget}</p>
                <p>{request.description}</p>
          </div>
              <button 
                className="apply-btn"
                onClick={() => handleApplyToRequest(request.id)}
              >
                📝 Apply
              </button>
            </div>
          ))}
          </div>
          </div>
          </div>
  );

  const renderJobsSection = () => (
    <div className="jobs-section">
      <div className="jobs-header">
        <div className="jobs-tabs">
          <button 
            className={`tab-btn ${jobsTab === 'post' ? 'active' : ''}`}
            onClick={() => setJobsTab('post')}
          >
            📝 Post Request
          </button>
          <button 
            className={`tab-btn ${jobsTab === 'requests' ? 'active' : ''}`}
            onClick={() => setJobsTab('requests')}
          >
            📋 Requests
          </button>
            </div>
          </div>

      {jobsTab === 'post' && (
        <div className="post-request-section">
          <div className="post-form">
            <h3>Post a Job Request</h3>
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" placeholder="e.g., Need Video Editor" />
          </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Describe what you need help with..."></textarea>
          </div>
            <div className="form-group">
              <label>Budget</label>
              <input type="text" placeholder="₹5,000" />
          </div>
            <div className="form-group">
              <label>Urgency</label>
              <select>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
          </div>
            <button className="post-btn">📝 Post Request</button>
          </div>
            </div>
      )}

      {jobsTab === 'requests' && (
        <div className="requests-section">
          <div className="my-posts">
            <h3>My Job Posts</h3>
            {jobPosts.map(post => (
              <div key={post.id} className="job-post-card">
                <div className="post-info">
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                  <p>💰 Budget: {post.budget}</p>
                  <p>📅 Posted {post.timestamp}</p>
                  <p>💬 {post.replies} replies</p>
        </div>
                <div className="post-actions">
                  <button className="view-replies-btn">View Replies</button>
                  <button className="edit-btn">Edit</button>
            </div>
              </div>
            ))}
          </div>

          <div className="available-requests">
            <h3>Available Job Requests</h3>
            {jobRequests.map(request => (
              <div key={request.id} className="job-request-card">
                <div className="request-info">
                  <h4>{request.title}</h4>
                  <p>{request.description}</p>
                  <p>💰 Budget: {request.budget}</p>
                  <p>👤 Posted by {request.postedBy}</p>
                  <p>📅 {request.timestamp}</p>
            </div>
                <button className="apply-job-btn">Apply</button>
              </div>
            ))}
            </div>
            </div>
      )}
          </div>
  );

  const renderPhotoboothSection = () => (
    <div className="photobooth-section">
      <Photobooth currentUser={currentUser} showModeSelector={false} />
    </div>
  );

  const renderLeftPanelContent = () => {
    if (leftPanelSubActive) {
      switch (leftPanelSubActive) {
        case 'edit-profile':
          return (
            <div className="left-panel-content">
              <div className="edit-profile-header">
                <h3>Edit Profile</h3>
                <button 
                  className="preview-btn"
                  onClick={() => handleSubNavigation('view-public')}
                >
                  👁️ Preview Profile
                </button>
      </div>

              <div className="profile-edit-form">
                {/* Basic Information */}
                <div className="form-section">
                  <h4>📋 Basic Information</h4>
                  <div className="form-group">
                    <label>Profile Picture</label>
                    <div className="profile-picture-upload">
                      <img src={currentUser?.profilePhoto} alt="Current Profile" className="current-profile-img" />
                      <input type="file" accept="image/*" className="file-input" />
                      <button className="upload-btn">📷 Change Photo</button>
          </div>
        </div>
                  <div className="form-group">
                    <label>Name *</label>
                    <input type="text" defaultValue={currentUser?.name} placeholder="Your full name" />
                </div>
                  <div className="form-group">
                    <label>Studio/Company Name</label>
                    <input type="text" defaultValue={currentUser?.studioName || ''} placeholder="Your studio or company name" />
              </div>
                  <div className="form-group">
                    <label>Location *</label>
                    <input type="text" defaultValue={currentUser?.location} placeholder="City, State" />
            </div>
          </div>

                {/* Professional Details */}
                <div className="form-section">
                  <h4>💼 Professional Details</h4>
                  <div className="form-group">
                    <label>Bio/About Me *</label>
                    <textarea 
                      defaultValue={currentUser?.profileText} 
                      placeholder="Tell customers about your photography style, experience, and what makes you unique..."
                      rows={4}
                    ></textarea>
                </div>
                  <div className="form-group">
                    <label>Specialties *</label>
                    <input 
                      type="text" 
                      defaultValue={currentUser?.specialties?.join(', ')} 
                      placeholder="Wedding Photography, Portrait Sessions, Event Coverage"
                    />
                    <small>Separate specialties with commas</small>
              </div>
                  <div className="form-group">
                    <label>Experience (Years)</label>
                    <input type="number" defaultValue={currentUser?.experience || 0} min="0" max="50" />
            </div>
            </div>

                {/* Portfolio Management */}
                <div className="form-section">
                  <h4>📸 Portfolio Management</h4>
      <div className="portfolio-header">
                    <p>Manage your portfolio photos and showcase your best work</p>
        <div className="portfolio-actions">
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="file-input"
                        onChange={(e) => {
                          Array.from(e.target.files).forEach(file => handleAddPortfolioPhoto(file));
                        }}
                      />
                      <button className="add-photos-btn">📷 Add Photos</button>
        </div>
      </div>

                  <div className="portfolio-grid">
                    {portfolioPhotos.map(photo => (
                      <div key={photo.id} className={`portfolio-item ${photo.isFeatured ? 'featured' : ''}`}>
                        <img src={photo.url} alt="Portfolio" />
                        <div className="photo-overlay">
                          <div className="photo-actions">
                            <select 
                              value={photo.category}
                              onChange={(e) => handleUpdatePhotoCategory(photo.id, e.target.value)}
                              className="category-select"
                            >
                              <option value="wedding">Wedding</option>
                              <option value="portrait">Portrait</option>
                              <option value="event">Event</option>
                              <option value="fashion">Fashion</option>
                              <option value="general">General</option>
                            </select>
                            <button 
                              className={`feature-btn ${photo.isFeatured ? 'featured' : ''}`}
                              onClick={() => handleToggleFeatured(photo.id)}
                            >
                              {photo.isFeatured ? '⭐ Featured' : '⭐ Feature'}
                            </button>
                            <button 
                              className="remove-btn"
                              onClick={() => handleRemovePortfolioPhoto(photo.id)}
                            >
                              🗑️
                            </button>
        </div>
        </div>
                        {photo.isFeatured && <div className="featured-badge">Featured</div>}
        </div>
                    ))}
        </div>
      </div>

                {/* Services Management */}
                <div className="form-section">
                  <h4>💰 Services & Pricing</h4>
                  <div className="services-header">
                    <p>Define your services and pricing packages</p>
                    <button className="add-service-btn" onClick={handleAddService}>
                      ➕ Add Service
                    </button>
      </div>

                  <div className="services-list">
                    {services.map(service => (
                      <div key={service.id} className={`service-item ${service.isActive ? 'active' : 'inactive'}`}>
                        <div className="service-header">
                          <h5>{service.name}</h5>
                          <div className="service-status">
                            <span className={`status-badge ${service.isActive ? 'active' : 'inactive'}`}>
                              {service.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <button 
                              className="toggle-btn"
                              onClick={() => handleToggleServiceActive(service.id)}
                            >
                              {service.isActive ? '⏸️' : '▶️'}
                            </button>
                            <button 
                              className="remove-service-btn"
                              onClick={() => handleRemoveService(service.id)}
                            >
                              🗑️
                            </button>
        </div>
              </div>
                        
                        <div className="service-fields">
                          <div className="field-row">
                            <div className="form-group">
                              <label>Service Name</label>
                              <input 
                                type="text" 
                                value={service.name}
                                onChange={(e) => handleUpdateService(service.id, 'name', e.target.value)}
                              />
            </div>
                            <div className="form-group">
                              <label>Price (₹)</label>
                              <input 
                                type="number" 
                                value={service.price}
                                onChange={(e) => handleUpdateService(service.id, 'price', parseInt(e.target.value))}
                                min="0"
                              />
        </div>
      </div>

                          <div className="field-row">
                            <div className="form-group">
                              <label>Duration</label>
                              <input 
                                type="text" 
                                value={service.duration}
                                onChange={(e) => handleUpdateService(service.id, 'duration', e.target.value)}
                                placeholder="e.g., 2 Hours, Full Day"
                              />
        </div>
                            <div className="form-group">
                              <label>Category</label>
                              <select 
                                value={service.category || 'general'}
                                onChange={(e) => handleUpdateService(service.id, 'category', e.target.value)}
                              >
                                <option value="wedding">Wedding</option>
                                <option value="portrait">Portrait</option>
                                <option value="event">Event</option>
                                <option value="commercial">Commercial</option>
                                <option value="general">General</option>
                              </select>
            </div>
          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <textarea 
                              value={service.description}
                              onChange={(e) => handleUpdateService(service.id, 'description', e.target.value)}
                              placeholder="Describe what's included in this service..."
                              rows={2}
                            />
              </div>
            </div>
              </div>
                    ))}
            </div>
          </div>

                {/* Contact & Social */}
                <div className="form-section">
                  <h4>📞 Contact & Social</h4>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" defaultValue={currentUser?.phone || ''} placeholder="+91 98765 43210" />
              </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={currentUser?.email} disabled />
                    <small>Email cannot be changed</small>
            </div>
                  <div className="form-group">
                    <label>Instagram</label>
                    <input type="text" defaultValue={currentUser?.instagram || ''} placeholder="@yourusername" />
              </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input type="url" defaultValue={currentUser?.website || ''} placeholder="https://yourwebsite.com" />
            </div>
          </div>

                {/* Availability */}
                <div className="form-section">
                  <h4>📅 Availability & Travel</h4>
                  <div className="form-group">
                    <label>Available for Travel</label>
                    <select defaultValue={currentUser?.travelAvailable ? 'yes' : 'no'}>
                      <option value="yes">Yes, I travel</option>
                      <option value="no">Local only</option>
                    </select>
              </div>
                  <div className="form-group">
                    <label>Travel Radius (km)</label>
                    <input type="number" defaultValue={currentUser?.travelRadius || 50} min="0" max="500" />
            </div>
                  <div className="form-group">
                    <label>Available Days</label>
                    <div className="days-selector">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <label key={day} className="day-checkbox">
                          <input type="checkbox" defaultChecked />
                          <span>{day.slice(0, 3)}</span>
                        </label>
                      ))}
          </div>
        </div>
      </div>

                <div className="form-actions">
                  <button className="save-btn">💾 Save All Changes</button>
                  <button className="cancel-btn" onClick={() => handleSubNavigation('profile')}>❌ Cancel</button>
          </div>
      </div>
    </div>
  );
        case 'view-public':
          return (
            <div className="public-profile-view">
              <div className="profile-view-header">
                <h3>View as Public Profile</h3>
                <p>This is how customers see your profile</p>
                <div className="profile-actions">
                  <button className="edit-profile-btn" onClick={() => handleSubNavigation('edit-profile')}>
                    ✏️ Edit Profile
                  </button>
      </div>
          </div>
              <div className="public-profile-content">
                <PhotographerProfile 
                  photographer={currentUser}
                  onBack={() => handleSubNavigation('profile')}
                  onMessage={() => console.log('Message clicked')}
                />
        </div>
          </div>
          );
        case 'your-events':
          return (
            <div className="left-panel-content">
              <div className="your-events-header">
                <h3>Your Events</h3>
                <p>Manage your photography assignments and media</p>
              </div>
              
              <div className="events-list">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="event-item enhanced">
                    <div className="event-header">
                      <div className="event-info">
                        <h4>{event.name}</h4>
                        <p>📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                        <p>📍 {event.location}</p>
                        <p>👤 {event.client}</p>
                        <p>💰 {event.price}</p>
                      </div>
                      <div className="event-status">
                        <span className={`status-badge ${event.status}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Media Management Section */}
                    <div className="event-media-section">
                      <div className="media-header">
                        <h5>📸 Event Media ({eventMedia[event.id]?.length || 0} files)</h5>
                        <button 
                          className="add-media-btn"
                          onClick={() => handleAddMediaToEvent(event.id)}
                        >
                          📤 Add Photos/Videos
                        </button>
                      </div>

                      {eventMedia[event.id] && eventMedia[event.id].length > 0 ? (
                        <div className="media-grid">
                          {eventMedia[event.id].map(media => (
                            <div key={media.id} className="media-item">
                              <div className="media-preview">
                                {media.type === 'photo' ? (
                                  <img src={media.url} alt={media.name} />
                                ) : (
                                  <video poster={media.url} muted>
                                    <source src={media.url} type="video/mp4" />
                                  </video>
                                )}
                                <div className="media-type-badge">
                                  {media.type === 'video' ? '🎥' : '📸'}
                                </div>
                                <button 
                                  className="delete-media-btn"
                                  onClick={() => handleDeleteMedia(event.id, media.id)}
                                  title="Delete media"
                                >
                                  🗑️
                                </button>
                              </div>
                              <div className="media-info">
                                <p className="media-name">{media.name}</p>
                                <p className="media-date">
                                  {new Date(media.uploadedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-media">
                          <p>📷 No media uploaded yet</p>
                          <button 
                            className="upload-first-btn"
                            onClick={() => handleAddMediaToEvent(event.id)}
                          >
                            Upload First Photo/Video
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Event Actions */}
                    <div className="event-actions">
                      <button 
                        className="view-event-btn"
                        onClick={() => console.log('View event details')}
                      >
                        👁️ View Details
                      </button>
                      <button 
                        className="manage-event-btn"
                        onClick={() => console.log('Manage event')}
                      >
                        ⚙️ Manage Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'public-events':
          return (
            <div className="left-panel-content">
              <h3>Public Events</h3>
              <div className="events-list">
                {publicRequests.map(event => (
                  <div key={event.id} className="event-item">
                    <h4>{event.eventType} - {event.clientName}</h4>
                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                    <p>📍 {event.location}</p>
                    <p>💰 {event.budget}</p>
                    <button className="apply-btn" onClick={() => handleApplyToRequest(event.id)}>
                      Apply
                    </button>
              </div>
            ))}
          </div>
        </div>
          );
        case 'editor':
          return (
            <div className="left-panel-content">
              <h3>Moodboard Editor</h3>
              <div className="moodboard-editor">
                <p>Create and edit your moodboards here.</p>
                <button className="create-btn">➕ Create New Moodboard</button>
          </div>
            </div>
          );
        case 'public-moodboards':
          return (
            <div className="left-panel-content">
              <h3>Public Moodboards</h3>
              <div className="moodboards-list">
                <p>Browse public moodboards from the community.</p>
                <button className="browse-btn">🔍 Browse Public Moodboards</button>
            </div>
            </div>
          );
        case 'create-group':
          return (
            <div className="left-panel-content">
              <h3>Create Group</h3>
              <div className="group-creation">
                <div className="form-group">
                  <label>Group Name</label>
                  <input type="text" placeholder="Enter group name" />
            </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Describe your group"></textarea>
            </div>
                <button className="create-btn">👥 Create Group</button>
          </div>
        </div>
          );
        case 'share-work':
          return (
            <div className="left-panel-content">
              <h3>Share Work</h3>
              <div className="work-sharing">
                <p>Share your photography work with the community.</p>
                <button className="share-btn">📤 Share Your Work</button>
          </div>
                </div>
          );
        case 'collaborate':
          return (
            <div className="left-panel-content">
              <h3>Collaborate</h3>
              <div className="collaboration">
                <p>Find collaboration opportunities with other photographers.</p>
                <button className="collaborate-btn">🤝 Find Collaborations</button>
                </div>
              </div>
          );
        default:
          return null;
      }
    }
    return null;
  };

  const renderMainContent = () => {
    // If left panel content is active, show it in main content
    if (leftPanelSubActive) {
      // For public profile view, use full width
      if (leftPanelSubActive === 'view-public') {
        return (
          <div className="public-profile-main-content">
            {renderLeftPanelContent()}
          </div>
        );
      }
      return (
        <div className="left-panel-main-content">
          {renderLeftPanelContent()}
    </div>
  );
    }

    switch (activeView) {
      case 'jobs':
        return renderJobsSection();
      case 'requests':
  return (
          <div className="requests-main">
            <h2>Booking Requests</h2>
            <div className="requests-grid">
              {newRequests.map(request => (
                <div key={request.id} className="request-detail-card">
                  <div className="request-header">
                    <h3>{request.clientName}</h3>
                    <span className={`status-badge ${request.status}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
          </div>
                  <div className="request-details">
                    <p><strong>Event:</strong> {request.eventType}</p>
                    <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {request.location}</p>
                    <p><strong>Budget:</strong> {request.budget}</p>
                    <p><strong>Description:</strong> {request.description}</p>
          </div>
                  {request.status === 'pending' && (
                    <div className="request-actions">
            <button 
                        className="accept-btn"
                        onClick={() => handleAcceptRequest(request.id)}
            >
                        ✅ Accept Request
            </button>
            <button 
                        className="decline-btn"
                        onClick={() => handleDeclineRequest(request.id)}
            >
                        ❌ Decline Request
            </button>
        </div>
                  )}
        </div>
              ))}
            </div>
            </div>
        );
      case 'photobooth':
        return renderPhotoboothSection();
      default:
        return renderMiddleSection();
    }
  };

  return (
    <div className="photographer-dashboard">
      {renderHeader()}
      
      <div className="dashboard-content">
        <div className={`dashboard-layout ${leftPanelSubActive === 'view-public' ? 'public-profile-layout' : ''}`}>
          {leftPanelSubActive !== 'view-public' && (
            <div className="left-panel-container">
              {renderLeftPanel()}
            </div>
          )}
          
          <div className="main-content">
            {renderMainContent()}
          </div>

          {leftPanelSubActive !== 'view-public' && (
            <div className="right-panel-container">
              {renderRightPanel()}
          </div>
          )}
        </div>
      </div>

      {/* Media Upload Modal */}
      {mediaUploadModal && (
        <div className="media-upload-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>📤 Upload Media to Event</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setMediaUploadModal(false);
                  setSelectedEventForMedia(null);
                  setSelectedFiles([]);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {selectedEventForMedia && (
                <div className="selected-event-info">
                  <h4>Event: {upcomingEvents.find(e => e.id === selectedEventForMedia)?.name}</h4>
                  <p>📅 {new Date(upcomingEvents.find(e => e.id === selectedEventForMedia)?.date).toLocaleDateString()}</p>
                </div>
              )}

              <div className="file-upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="file-input"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="upload-label">
                  <div className="upload-icon">📷</div>
                  <h4>Choose Photos & Videos</h4>
                  <p>Select multiple files to upload</p>
                  <div className="upload-stats">
                    <span>Max file size: 100MB per file</span>
                    <span>Supported: JPG, PNG, MP4, MOV</span>
                  </div>
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="selected-files-preview">
                  <h4>Selected Files ({selectedFiles.length})</h4>
                  <div className="files-preview">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="file-preview-item">
                        <div className="file-icon">
                          {file.type.startsWith('video/') ? '🎥' : '📸'}
                        </div>
                        <div className="file-details">
                          <p className="file-name">{file.name}</p>
                          <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button 
                          className="remove-file-btn"
                          onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setMediaUploadModal(false);
                  setSelectedEventForMedia(null);
                  setSelectedFiles([]);
                }}
              >
                Cancel
              </button>
              <button 
                className="upload-btn"
                onClick={handleUploadMedia}
                disabled={selectedFiles.length === 0}
              >
                📤 Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotographerDashboard;