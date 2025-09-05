import React, { useState, useEffect } from 'react';
import './EventPhotos.css';

function EventPhotos({ 
  currentUser, 
  photographers, 
  onPhotographerSelect,
  onSaveToMoodboard 
}) {
  const [activeTab, setActiveTab] = useState('my-events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadData, setUploadData] = useState({
    eventId: '',
    description: '',
    tags: '',
    isWatermarked: false,
    price: 0,
    isCustomerUpload: false
  });
  const [tagModal, setTagModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [challengeModal, setChallengeModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Sample event data
  const [events] = useState([
    {
      id: 1,
      name: 'XYZ Music Concert',
      date: '2024-12-15',
      location: 'Mumbai, Maharashtra',
      organizer: 'Music Events Pro',
      status: 'completed',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      photographers: [1, 2],
      totalPhotos: 156,
      totalVideos: 8,
      isPublic: true,
      notifications: ['Photos from XYZ Music Concert are now live – view & download your moments!'],
      challenges: [
        {
          id: 1,
          title: 'Vote for the Best Concert Shot 🎶',
          description: 'Help us find the most amazing moment from the concert!',
          endDate: '2024-12-25',
          totalVotes: 234,
          prize: 'Featured on homepage'
        }
      ],
      leaderboard: {
        topPhotographer: { id: 1, name: 'John Doe', photos: 45, likes: 1234 },
        mostLikedPhoto: { id: 3, likes: 67, photographer: 'John Doe' },
        mostTaggedPerson: { name: 'Sarah Wilson', tags: 23 }
      }
    },
    {
      id: 2,
      name: 'Tech Conference 2024',
      date: '2024-12-10',
      location: 'Bangalore, Karnataka',
      organizer: 'TechCorp',
      status: 'completed',
      coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      photographers: [3],
      totalPhotos: 89,
      totalVideos: 3,
      isPublic: true,
      notifications: ['Tech Conference 2024 photos are ready! Check out your professional moments.'],
      challenges: [],
      leaderboard: {
        topPhotographer: { id: 3, name: 'Mike Johnson', photos: 89, likes: 567 },
        mostLikedPhoto: { id: 4, likes: 34, photographer: 'Mike Johnson' },
        mostTaggedPerson: { name: 'Alex Chen', tags: 15 }
      }
    },
    {
      id: 3,
      name: 'Wedding Celebration',
      date: '2024-12-20',
      location: 'Delhi, NCR',
      organizer: 'Wedding Planners Inc',
      status: 'upcoming',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      photographers: [1],
      totalPhotos: 0,
      totalVideos: 0,
      isPublic: false,
      notifications: [],
      challenges: [],
      leaderboard: null
    }
  ]);

  // Enhanced media data with reactions, tags, and VR content
  const [eventMedia] = useState({
    1: [
      {
        id: 1,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        photographerId: 1,
        photographerName: 'John Doe',
        description: 'Amazing concert moment!',
        likes: 45,
        loves: 12,
        fires: 8,
        comments: [
          { id: 1, user: 'Sarah Wilson', text: 'This is incredible! 🔥', timestamp: '2 hours ago' },
          { id: 2, user: 'Mike Chen', text: 'Best concert ever!', timestamp: '1 hour ago' }
        ],
        isApproved: true,
        isHighlighted: false,
        isWatermarked: true,
        price: 0,
        tags: ['concert', 'music', 'crowd'],
        peopleTags: [
          { id: 1, name: 'Sarah Wilson', x: 25, y: 30 },
          { id: 2, name: 'Mike Chen', x: 70, y: 45 }
        ],
        uploadedAt: '2024-12-15T20:30:00Z',
        isCustomerUpload: false,
        challengeVotes: 23,
        downloadOptions: {
          free: { resolution: '800x600', format: 'JPG' },
          premium: { resolution: '4000x3000', format: 'RAW', price: 500 }
        },
        isVR: false
      },
      {
        id: 2,
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
        photographerId: 2,
        photographerName: 'Jane Smith',
        description: 'Behind the scenes footage',
        likes: 23,
        loves: 8,
        fires: 15,
        comments: [
          { id: 3, user: 'Alex Johnson', text: 'Love the backstage vibes!', timestamp: '3 hours ago' }
        ],
        isApproved: true,
        isHighlighted: true,
        isWatermarked: false,
        price: 500,
        tags: ['behind-scenes', 'concert'],
        peopleTags: [],
        uploadedAt: '2024-12-15T21:15:00Z',
        isCustomerUpload: false,
        challengeVotes: 45,
        downloadOptions: {
          free: { resolution: '720p', format: 'MP4' },
          premium: { resolution: '4K', format: 'MOV', price: 800 }
        },
        isVR: false
      },
      {
        id: 3,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=400',
        photographerId: 1,
        photographerName: 'John Doe',
        description: 'Stage performance',
        likes: 67,
        loves: 25,
        fires: 18,
        comments: [
          { id: 4, user: 'Emma Davis', text: 'This moment was magical! ✨', timestamp: '4 hours ago' }
        ],
        isApproved: true,
        isHighlighted: false,
        isWatermarked: true,
        price: 0,
        tags: ['performance', 'stage'],
        peopleTags: [
          { id: 3, name: 'Emma Davis', x: 50, y: 60 }
        ],
        uploadedAt: '2024-12-15T22:00:00Z',
        isCustomerUpload: true,
        challengeVotes: 67,
        downloadOptions: {
          free: { resolution: '800x600', format: 'JPG' },
          premium: { resolution: '4000x3000', format: 'RAW', price: 300 }
        },
        isVR: false
      },
      {
        id: 4,
        type: 'vr',
        url: 'https://example.com/vr-concert-360.jpg',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        photographerId: 1,
        photographerName: 'John Doe',
        description: '360° Concert Experience',
        likes: 89,
        loves: 34,
        fires: 22,
        comments: [],
        isApproved: true,
        isHighlighted: true,
        isWatermarked: false,
        price: 1000,
        tags: ['vr', '360', 'immersive'],
        peopleTags: [],
        uploadedAt: '2024-12-15T23:00:00Z',
        isCustomerUpload: false,
        challengeVotes: 89,
        downloadOptions: {
          free: { resolution: '2048x1024', format: 'JPG' },
          premium: { resolution: '8192x4096', format: 'RAW', price: 1500 }
        },
        isVR: true
      }
    ],
    2: [
      {
        id: 5,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
        photographerId: 3,
        photographerName: 'Mike Johnson',
        description: 'Keynote speaker presentation',
        likes: 34,
        loves: 12,
        fires: 8,
        comments: [
          { id: 5, user: 'David Kim', text: 'Great insights from the speaker!', timestamp: '1 day ago' }
        ],
        isApproved: true,
        isHighlighted: true,
        isWatermarked: false,
        price: 300,
        tags: ['conference', 'speaker'],
        peopleTags: [
          { id: 4, name: 'David Kim', x: 40, y: 50 }
        ],
        uploadedAt: '2024-12-10T14:30:00Z',
        isCustomerUpload: false,
        challengeVotes: 34,
        downloadOptions: {
          free: { resolution: '800x600', format: 'JPG' },
          premium: { resolution: '4000x3000', format: 'RAW', price: 300 }
        },
        isVR: false
      }
    ]
  });

  const [userEvents, setUserEvents] = useState(events);
  const [notifications, setNotifications] = useState([
    'Photos from XYZ Music Concert are now live – view & download your moments!',
    'Tech Conference 2024 photos are ready! Check out your professional moments.'
  ]);

  const tabs = [
    { id: 'my-events', label: 'My Events', icon: '📅' },
    { id: 'upload', label: 'Upload Media', icon: '📤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'gallery', label: 'Public Gallery', icon: '🖼️' },
    { id: 'challenges', label: 'Photo Challenges', icon: '🏆' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏅' }
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0 && uploadData.eventId) {
      console.log('Uploading files:', selectedFiles);
      console.log('Upload data:', uploadData);
      // Here you would implement actual file upload
      setUploadModal(false);
      setSelectedFiles([]);
      setUploadData({
        eventId: '',
        description: '',
        tags: '',
        isWatermarked: false,
        price: 0,
        isCustomerUpload: false
      });
    }
  };

  const handleReaction = (mediaId, reactionType) => {
    console.log(`${reactionType} reaction on media:`, mediaId);
    // Here you would update reaction count
  };

  const handleComment = (mediaId) => {
    if (commentText.trim()) {
      console.log('Comment on media:', mediaId, commentText);
      // Here you would add comment
      setCommentText('');
      setCommentModal(false);
    }
  };

  const handleShare = (mediaId) => {
    console.log('Sharing media:', mediaId);
    // Here you would implement sharing
  };

  const handleTagRequest = (mediaId) => {
    console.log('Tag request for media:', mediaId);
    setSelectedMedia(eventMedia[selectedEvent.id]?.find(m => m.id === mediaId));
    setTagModal(true);
  };

  const handleAddTag = (personName, x, y) => {
    console.log('Adding tag:', personName, 'at position:', x, y);
    // Here you would add tag to media
    setTagModal(false);
  };

  const handlePurchase = (mediaId, price) => {
    console.log('Purchasing media:', mediaId, 'for ₹', price);
    // Here you would implement purchase flow
  };

  const handleDownload = (mediaId, option) => {
    console.log('Downloading media:', mediaId, 'option:', option);
    setDownloadModal(false);
    // Here you would implement download
  };

  const handleSaveToMoodboard = (mediaId) => {
    console.log('Saving to moodboard:', mediaId);
    // Here you would save to user's moodboard
  };

  const handleVoteChallenge = (mediaId) => {
    console.log('Voting for media in challenge:', mediaId);
    // Here you would implement voting
  };

  const handleApproveMedia = (mediaId) => {
    console.log('Approving media:', mediaId);
    // Here you would implement approval
  };

  const handleRejectMedia = (mediaId) => {
    console.log('Rejecting media:', mediaId);
    // Here you would implement rejection
  };

  const handleHighlightMedia = (mediaId) => {
    console.log('Highlighting media:', mediaId);
    // Here you would implement highlighting
  };

  const renderMyEvents = () => (
    <div className="my-events">
      <div className="section-header">
        <h2>My Events</h2>
        <p>Manage and view photos from your events</p>
      </div>
      
      <div className="events-grid">
        {userEvents.map(event => (
          <div key={event.id} className="event-card" onClick={() => setSelectedEvent(event)}>
            <div className="event-cover">
              <img src={event.coverImage} alt={event.name} />
              <div className="event-status">
                <span className={`status-badge ${event.status}`}>
                  {event.status === 'completed' ? '✅ Completed' : '⏳ Upcoming'}
                </span>
              </div>
              {event.challenges.length > 0 && (
                <div className="challenge-badge">🏆 Active Challenge</div>
              )}
            </div>
            <div className="event-info">
              <h3>{event.name}</h3>
              <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
              <p className="event-location">📍 {event.location}</p>
              <p className="event-organizer">👤 {event.organizer}</p>
              <div className="event-stats">
                <span>📷 {event.totalPhotos} photos</span>
                <span>🎥 {event.totalVideos} videos</span>
              </div>
              <div className="event-photographers">
                <span>📸 {event.photographers.length} photographers</span>
              </div>
              {event.challenges.length > 0 && (
                <div className="event-challenges">
                  <span>🏆 {event.challenges.length} active challenge(s)</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUploadMedia = () => (
    <div className="upload-media">
      <div className="section-header">
        <h2>Upload Media</h2>
        <p>Share your event photos and videos</p>
      </div>
      
      <div className="upload-section">
        <button onClick={() => setUploadModal(true)} className="upload-btn">
          📤 Upload Photos/Videos
        </button>
        
        <div className="upload-guidelines">
          <h3>Upload Guidelines</h3>
          <ul>
            <li>✅ Supported formats: JPG, PNG, MP4, MOV, VR360</li>
            <li>✅ Maximum file size: 50MB per file</li>
            <li>✅ Add descriptions and tags for better discoverability</li>
            <li>✅ Set pricing for premium content</li>
            <li>✅ Choose watermark options</li>
            <li>✅ Customer uploads are moderated by organizers</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications">
      <div className="section-header">
        <h2>Notifications</h2>
        <p>Stay updated with new event photos</p>
      </div>
      
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className="notification-icon">📸</div>
            <div className="notification-content">
              <p>{notification}</p>
              <span className="notification-time">2 hours ago</span>
            </div>
            <button className="view-btn">View</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPhotoChallenges = () => (
    <div className="photo-challenges">
      <div className="section-header">
        <h2>Photo Challenges</h2>
        <p>Vote for the best shots and win prizes!</p>
      </div>
      
      <div className="challenges-grid">
        {userEvents.filter(event => event.challenges.length > 0).map(event => (
          event.challenges.map(challenge => (
            <div key={challenge.id} className="challenge-card">
              <div className="challenge-header">
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
                <div className="challenge-stats">
                  <span>📊 {challenge.totalVotes} votes</span>
                  <span>🏆 {challenge.prize}</span>
                </div>
                <div className="challenge-deadline">
                  <span>⏰ Ends: {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => setSelectedEvent(event)} className="vote-btn">
                Vote Now
              </button>
            </div>
          ))
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="leaderboard">
      <div className="section-header">
        <h2>Leaderboard</h2>
        <p>Top performers and most popular content</p>
      </div>
      
      <div className="leaderboard-grid">
        {userEvents.filter(event => event.leaderboard).map(event => (
          <div key={event.id} className="leaderboard-card">
            <h3>{event.name} Leaderboard</h3>
            
            <div className="leaderboard-section">
              <h4>🏆 Top Photographer</h4>
              <div className="leaderboard-item">
                <img src={photographers.find(p => p.id === event.leaderboard.topPhotographer.id)?.profilePhoto} alt="" />
                <div className="leaderboard-info">
                  <span className="name">{event.leaderboard.topPhotographer.name}</span>
                  <span className="stats">{event.leaderboard.topPhotographer.photos} photos • {event.leaderboard.topPhotographer.likes} likes</span>
                </div>
              </div>
            </div>
            
            <div className="leaderboard-section">
              <h4>❤️ Most Liked Photo</h4>
              <div className="leaderboard-item">
                <span className="name">{event.leaderboard.mostLikedPhoto.likes} likes</span>
                <span className="photographer">by {event.leaderboard.mostLikedPhoto.photographer}</span>
              </div>
            </div>
            
            <div className="leaderboard-section">
              <h4>🏷️ Most Tagged Person</h4>
              <div className="leaderboard-item">
                <span className="name">{event.leaderboard.mostTaggedPerson.name}</span>
                <span className="stats">{event.leaderboard.mostTaggedPerson.tags} tags</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPublicGallery = () => (
    <div className="public-gallery">
      <div className="section-header">
        <h2>Public Gallery</h2>
        <p>Discover amazing event photos from the community</p>
      </div>
      
      <div className="gallery-filters">
        <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Media</option>
          <option value="photos">Photos</option>
          <option value="videos">Videos</option>
          <option value="vr">VR/360°</option>
          <option value="customer">Customer Uploads</option>
        </select>
        <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="likes">Most Liked</option>
          <option value="comments">Most Commented</option>
        </select>
        <select className="filter-select">
          <option>All Photographers</option>
          {photographers.map(p => (
            <option key={p.id}>{p.name}</option>
          ))}
        </select>
        <input type="text" placeholder="Search photos..." className="search-input" />
      </div>
      
      <div className="gallery-grid">
        {Object.values(eventMedia).flat().map(media => (
          <div key={media.id} className="gallery-item">
            <div className="media-container">
              {media.type === 'photo' ? (
                <img src={media.url} alt={media.description} />
              ) : media.type === 'vr' ? (
                <div className="vr-container">
                  <img src={media.thumbnail} alt={media.description} />
                  <div className="vr-badge">360°</div>
                </div>
              ) : (
                <video poster={media.thumbnail} controls>
                  <source src={media.url} type="video/mp4" />
                </video>
              )}
              {media.isHighlighted && <div className="highlighted-badge">⭐ Featured</div>}
              {media.isWatermarked && <div className="watermark-badge">💧 Watermarked</div>}
              {media.isCustomerUpload && <div className="customer-badge">👤 Customer</div>}
              {media.isVR && <div className="vr-badge">360°</div>}
            </div>
            <div className="media-info">
              <h4>{media.description}</h4>
              <p>by {media.photographerName}</p>
              <div className="media-stats">
                <span>❤️ {media.likes}</span>
                <span>💖 {media.loves}</span>
                <span>🔥 {media.fires}</span>
                <span>💬 {media.comments.length}</span>
              </div>
              <div className="media-actions">
                <button onClick={() => handleReaction(media.id, 'like')} className="action-btn">❤️</button>
                <button onClick={() => handleReaction(media.id, 'love')} className="action-btn">💖</button>
                <button onClick={() => handleReaction(media.id, 'fire')} className="action-btn">🔥</button>
                <button onClick={() => { setSelectedMedia(media); setCommentModal(true); }} className="action-btn">💬</button>
                <button onClick={() => handleShare(media.id)} className="action-btn">📤</button>
                <button onClick={() => handleTagRequest(media.id)} className="action-btn">🏷️</button>
                <button onClick={() => handleSaveToMoodboard(media.id)} className="action-btn">📋</button>
                <button onClick={() => { setSelectedMedia(media); setDownloadModal(true); }} className="action-btn">⬇️</button>
                {media.price > 0 && (
                  <button onClick={() => handlePurchase(media.id, media.price)} className="purchase-btn">
                    Buy ₹{media.price}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEventDetail = () => (
    <div className="event-detail">
      <button onClick={() => setSelectedEvent(null)} className="back-btn">
        ← Back to Events
      </button>
      
      <div className="event-header">
        <img src={selectedEvent.coverImage} alt={selectedEvent.name} className="event-hero" />
        <div className="event-meta">
          <h1>{selectedEvent.name}</h1>
          <p>📅 {new Date(selectedEvent.date).toLocaleDateString()}</p>
          <p>📍 {selectedEvent.location}</p>
          <p>👤 {selectedEvent.organizer}</p>
          <div className="event-stats">
            <span>📷 {selectedEvent.totalPhotos} photos</span>
            <span>🎥 {selectedEvent.totalVideos} videos</span>
          </div>
        </div>
      </div>
      
      {selectedEvent.challenges.length > 0 && (
        <div className="event-challenges-section">
          <h3>🏆 Active Challenges</h3>
          <div className="challenges-list">
            {selectedEvent.challenges.map(challenge => (
              <div key={challenge.id} className="challenge-item">
                <h4>{challenge.title}</h4>
                <p>{challenge.description}</p>
                <div className="challenge-meta">
                  <span>📊 {challenge.totalVotes} votes</span>
                  <span>🏆 {challenge.prize}</span>
                  <span>⏰ Ends: {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="event-controls">
        {currentUser?.role === 'photographer' && (
          <button onClick={() => setUploadModal(true)} className="upload-btn">
            📤 Upload to this Event
          </button>
        )}
        {currentUser?.role === 'customer' && (
          <button onClick={() => setUploadModal(true)} className="customer-upload-btn">
            📸 Share My Photos
          </button>
        )}
        {currentUser?.role === 'organizer' && (
          <div className="organizer-controls">
            <button className="approve-btn">✅ Approve Pending</button>
            <button className="highlight-btn">⭐ Highlight Photos</button>
            <button className="settings-btn">⚙️ Event Settings</button>
          </div>
        )}
      </div>
      
      <div className="event-media">
        <div className="media-filters">
          <button className={`filter-btn ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All Media</button>
          <button className={`filter-btn ${filterType === 'photos' ? 'active' : ''}`} onClick={() => setFilterType('photos')}>Photos</button>
          <button className={`filter-btn ${filterType === 'videos' ? 'active' : ''}`} onClick={() => setFilterType('videos')}>Videos</button>
          <button className={`filter-btn ${filterType === 'vr' ? 'active' : ''}`} onClick={() => setFilterType('vr')}>VR/360°</button>
          <button className={`filter-btn ${filterType === 'featured' ? 'active' : ''}`} onClick={() => setFilterType('featured')}>Featured</button>
        </div>
        
        <div className="media-grid">
          {eventMedia[selectedEvent.id]?.map(media => (
            <div key={media.id} className="media-item">
              <div className="media-container">
                {media.type === 'photo' ? (
                  <img src={media.url} alt={media.description} />
                ) : media.type === 'vr' ? (
                  <div className="vr-container">
                    <img src={media.thumbnail} alt={media.description} />
                    <div className="vr-badge">360°</div>
                  </div>
                ) : (
                  <video poster={media.thumbnail} controls>
                    <source src={media.url} type="video/mp4" />
                  </video>
                )}
                {media.isHighlighted && <div className="highlighted-badge">⭐ Featured</div>}
                {media.isWatermarked && <div className="watermark-badge">💧 Watermarked</div>}
                {media.isCustomerUpload && <div className="customer-badge">👤 Customer</div>}
                {media.isVR && <div className="vr-badge">360°</div>}
                {!media.isApproved && <div className="pending-badge">⏳ Pending Approval</div>}
              </div>
              <div className="media-info">
                <h4>{media.description}</h4>
                <p>by {media.photographerName}</p>
                <div className="media-stats">
                  <span>❤️ {media.likes}</span>
                  <span>💖 {media.loves}</span>
                  <span>🔥 {media.fires}</span>
                  <span>💬 {media.comments.length}</span>
                </div>
                <div className="media-actions">
                  <button onClick={() => handleReaction(media.id, 'like')} className="action-btn">❤️</button>
                  <button onClick={() => handleReaction(media.id, 'love')} className="action-btn">💖</button>
                  <button onClick={() => handleReaction(media.id, 'fire')} className="action-btn">🔥</button>
                  <button onClick={() => { setSelectedMedia(media); setCommentModal(true); }} className="action-btn">💬</button>
                  <button onClick={() => handleShare(media.id)} className="action-btn">📤</button>
                  <button onClick={() => handleTagRequest(media.id)} className="action-btn">🏷️</button>
                  <button onClick={() => handleSaveToMoodboard(media.id)} className="action-btn">📋</button>
                  <button onClick={() => { setSelectedMedia(media); setDownloadModal(true); }} className="action-btn">⬇️</button>
                  {media.price > 0 && (
                    <button onClick={() => handlePurchase(media.id, media.price)} className="purchase-btn">
                      Buy ₹{media.price}
                    </button>
                  )}
                  {currentUser?.role === 'organizer' && !media.isApproved && (
                    <div className="approval-actions">
                      <button onClick={() => handleApproveMedia(media.id)} className="approve-btn">✅</button>
                      <button onClick={() => handleRejectMedia(media.id)} className="reject-btn">❌</button>
                    </div>
                  )}
                  {currentUser?.role === 'organizer' && (
                    <button onClick={() => handleHighlightMedia(media.id)} className="highlight-btn">
                      {media.isHighlighted ? '⭐' : '☆'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="event-photos-container">
      {selectedEvent ? (
        renderEventDetail()
      ) : (
        <>
          <div className="event-photos-tabs">
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
          
          <div className="event-photos-content">
            {activeTab === 'my-events' && renderMyEvents()}
            {activeTab === 'upload' && renderUploadMedia()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'gallery' && renderPublicGallery()}
            {activeTab === 'challenges' && renderPhotoChallenges()}
            {activeTab === 'leaderboard' && renderLeaderboard()}
          </div>
        </>
      )}
      
      {/* Upload Modal */}
      {uploadModal && (
        <div className="upload-modal">
          <div className="modal-content">
            <h3>Upload Media</h3>
            <div className="upload-form">
              <select
                value={uploadData.eventId}
                onChange={(e) => setUploadData({ ...uploadData, eventId: e.target.value })}
                className="form-select"
              >
                <option value="">Select Event</option>
                {userEvents.map(event => (
                  <option key={event.id} value={event.id}>{event.name}</option>
                ))}
              </select>
              
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="file-input"
              />
              
              <textarea
                placeholder="Description..."
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                className="form-textarea"
              />
              
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={uploadData.tags}
                onChange={(e) => setUploadData({ ...uploadData, tags: e.target.value })}
                className="form-input"
              />
              
              <div className="upload-options">
                <label>
                  <input
                    type="checkbox"
                    checked={uploadData.isWatermarked}
                    onChange={(e) => setUploadData({ ...uploadData, isWatermarked: e.target.checked })}
                  />
                  Add watermark
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={uploadData.isCustomerUpload}
                    onChange={(e) => setUploadData({ ...uploadData, isCustomerUpload: e.target.checked })}
                  />
                  Customer upload (moderated)
                </label>
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={uploadData.price}
                  onChange={(e) => setUploadData({ ...uploadData, price: e.target.value })}
                  className="form-input"
                />
              </div>
              
              <div className="modal-actions">
                <button onClick={handleUpload} className="upload-submit-btn">Upload</button>
                <button onClick={() => setUploadModal(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tag Modal */}
      {tagModal && selectedMedia && (
        <div className="upload-modal">
          <div className="modal-content">
            <h3>Tag People in Photo</h3>
            <div className="tag-form">
              <div className="tag-preview">
                <img src={selectedMedia.url} alt={selectedMedia.description} />
                <div className="tag-overlay">
                  {selectedMedia.peopleTags.map(tag => (
                    <div 
                      key={tag.id}
                      className="existing-tag"
                      style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter person's name"
                className="form-input"
                id="tagName"
              />
              <p className="tag-instructions">Click on the photo to place the tag</p>
              <div className="modal-actions">
                <button onClick={() => handleAddTag(document.getElementById('tagName').value, 50, 50)} className="upload-submit-btn">Add Tag</button>
                <button onClick={() => setTagModal(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {commentModal && selectedMedia && (
        <div className="upload-modal">
          <div className="modal-content">
            <h3>Add Comment</h3>
            <div className="comment-form">
              <textarea
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="form-textarea"
              />
              <div className="modal-actions">
                <button onClick={() => handleComment(selectedMedia.id)} className="upload-submit-btn">Post Comment</button>
                <button onClick={() => setCommentModal(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {downloadModal && selectedMedia && (
        <div className="upload-modal">
          <div className="modal-content">
            <h3>Download Options</h3>
            <div className="download-form">
              <div className="download-option">
                <h4>Free Download</h4>
                <p>{selectedMedia.downloadOptions.free.resolution} • {selectedMedia.downloadOptions.free.format}</p>
                <button onClick={() => handleDownload(selectedMedia.id, 'free')} className="download-btn">Download Free</button>
              </div>
              {selectedMedia.downloadOptions.premium && (
                <div className="download-option premium">
                  <h4>Premium Download</h4>
                  <p>{selectedMedia.downloadOptions.premium.resolution} • {selectedMedia.downloadOptions.premium.format}</p>
                  <p className="price">₹{selectedMedia.downloadOptions.premium.price}</p>
                  <button onClick={() => handleDownload(selectedMedia.id, 'premium')} className="download-btn premium">Buy & Download</button>
                </div>
              )}
              <div className="modal-actions">
                <button onClick={() => setDownloadModal(false)} className="cancel-btn">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPhotos;
