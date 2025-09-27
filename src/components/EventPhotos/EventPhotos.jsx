import React, { useState, useEffect } from 'react';
import './EventPhotos.css';

function EventPhotos({ 
  currentUser, 
  photographers, 
  onPhotographerSelect,
  onSaveToMoodboard,
  onNavigateToPhotographer
}) {
  const [activeTab, setActiveTab] = useState('my-events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadData, setUploadData] = useState({
    eventId: '',
    description: '',
    tags: '',
    isWatermarked: false,
    price: 0,
    isCustomerUpload: false,
    category: 'general',
    isFeatured: false,
    clientApproval: 'pending',
    deliveryDate: '',
    resolution: 'high',
    format: 'jpeg'
  });
  
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [challengeModal, setChallengeModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [liveEvents, setLiveEvents] = useState([]);
  const [autoUploadEnabled, setAutoUploadEnabled] = useState(true);
  const [viewerModal, setViewerModal] = useState(false);
  const [viewingMedia, setViewingMedia] = useState(null);

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
    },
    {
      id: 4,
      name: 'Live Music Festival',
      date: '2024-12-18',
      location: 'Mumbai, Maharashtra',
      organizer: 'Live Events Co',
      status: 'live',
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      photographers: [1, 2, 3],
      totalPhotos: 45,
      totalVideos: 3,
      isPublic: true,
      notifications: ['Live photos are being uploaded automatically!'],
      challenges: [],
      leaderboard: null,
      isLive: true,
      autoUpload: true
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
    ],
    4: [
      {
        id: 23,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        photographerId: 1,
        photographerName: 'John Doe',
        description: 'Live performance moment',
        likes: 12,
        loves: 3,
        fires: 5,
        comments: [],
        isApproved: true,
        isHighlighted: false,
        isWatermarked: false,
        price: 0,
        tags: ['live', 'music', 'performance'],
        peopleTags: [],
        uploadedAt: new Date().toISOString(),
        isCustomerUpload: false,
        challengeVotes: 0,
        downloadOptions: {
          free: { resolution: '800x600', format: 'JPG' },
          premium: { resolution: '4000x3000', format: 'RAW', price: 200 }
        },
        isVR: false,
        isLiveUpload: true
      },
      {
        id: 24,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
        photographerId: 2,
        photographerName: 'Jane Smith',
        description: 'Crowd energy',
        likes: 8,
        loves: 2,
        fires: 3,
        comments: [],
        isApproved: true,
        isHighlighted: false,
        isWatermarked: false,
        price: 0,
        tags: ['live', 'crowd', 'energy'],
        peopleTags: [],
        uploadedAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        isCustomerUpload: false,
        challengeVotes: 0,
        downloadOptions: {
          free: { resolution: '800x600', format: 'JPG' },
          premium: { resolution: '4000x3000', format: 'RAW', price: 200 }
        },
        isVR: false,
        isLiveUpload: true
      }
    ]
  });

  const [userEvents, setUserEvents] = useState(events);

  // Filtering and sorting logic
  const getFilteredAndSortedEvents = () => {
    let currentEvents = [...userEvents];
    
    // Apply status filter
    if (filterStatus !== 'all') {
      currentEvents = currentEvents.filter(event => event.status === filterStatus);
    }
    
    // Apply sorting
    const sortedEvents = [...currentEvents].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'participants':
          return b.photographers.length - a.photographers.length;
        case 'photos':
          return b.totalPhotos - a.totalPhotos;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    return sortedEvents;
  };

  const filteredEvents = getFilteredAndSortedEvents();

  // Different tabs based on user role
  const getTabs = () => {
    if (currentUser?.role === 'photographer') {
      return [
    { id: 'my-events', label: 'My Events', icon: '📅' },
        { id: 'photographer-upload', label: 'Upload Photos', icon: '📤' },
        { id: 'live-photos', label: 'Live Photos', icon: '🔴' },
        { id: 'past-events', label: 'Past Events', icon: '📚' },
    { id: 'challenges', label: 'Photo Challenges', icon: '🏆' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏅' }
  ];
    } else {
      return [
        { id: 'my-events', label: 'My Events', icon: '📅' },
        { id: 'live-photos', label: 'Live Photos', icon: '🔴' },
        { id: 'past-events', label: 'Past Events', icon: '📚' },
        { id: 'challenges', label: 'Photo Challenges', icon: '🏆' },
        { id: 'leaderboard', label: 'Leaderboard', icon: '🏅' }
      ];
    }
  };

  const tabs = getTabs();

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
        isCustomerUpload: false,
        category: 'general',
        isFeatured: false,
        clientApproval: 'pending',
        deliveryDate: '',
        resolution: 'high',
        format: 'jpeg'
      });
    }
  };

  const handleProfessionalUpload = async () => {
    if (selectedFiles.length === 0 || !uploadData.eventId) {
      alert('Please select files and choose an event');
      return;
    }

    setIsUploading(true);
    setUploadQueue(selectedFiles);

    // Simulate professional upload process
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileId = `file_${Date.now()}_${i}`;
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({
          ...prev,
          [fileId]: progress
        }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Complete upload
    setIsUploading(false);
    setUploadQueue([]);
    setUploadProgress({});
    setSelectedFiles([]);
    
    // Reset form
    setUploadData({
      eventId: '',
      description: '',
      tags: '',
      isWatermarked: false,
      price: 0,
      isCustomerUpload: false,
      category: 'general',
      isFeatured: false,
      clientApproval: 'pending',
      deliveryDate: '',
      resolution: 'high',
      format: 'jpeg'
    });

    alert(`Successfully uploaded ${selectedFiles.length} photos to ${events.find(e => e.id == uploadData.eventId)?.name}`);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    
    // Auto-generate tags based on file names
    const autoTags = files.map(file => {
      const name = file.name.toLowerCase();
      if (name.includes('wedding')) return 'wedding';
      if (name.includes('portrait')) return 'portrait';
      if (name.includes('event')) return 'event';
      return 'general';
    }).filter((tag, index, arr) => arr.indexOf(tag) === index);
    
    setUploadData(prev => ({
      ...prev,
      tags: autoTags.join(', ')
    }));
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

  const handlePhotoClick = (media) => {
    console.log('Photo clicked, redirecting to photographer:', media.photographerId);
    if (onNavigateToPhotographer) {
      onNavigateToPhotographer(media.photographerId);
    }
  };

  const handleMediaView = (media) => {
    setViewingMedia(media);
    setViewerModal(true);
  };

  // Auto-upload functionality for live events
  useEffect(() => {
    const liveEventsList = events.filter(event => event.isLive && event.autoUpload);
    setLiveEvents(liveEventsList);

    if (autoUploadEnabled && liveEventsList.length > 0) {
      const interval = setInterval(() => {
        // Simulate automatic photo uploads for live events
        liveEventsList.forEach(event => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            type: 'photo',
            url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=400`,
            photographerId: event.photographers[Math.floor(Math.random() * event.photographers.length)],
            photographerName: photographers.find(p => p.id === event.photographers[Math.floor(Math.random() * event.photographers.length)])?.name || 'Unknown',
            description: `Live moment captured at ${event.name}`,
            likes: 0,
            loves: 0,
            fires: 0,
            comments: [],
            isApproved: true,
            isHighlighted: false,
            isWatermarked: false,
            price: 0,
            tags: ['live', 'auto-upload'],
            peopleTags: [],
            uploadedAt: new Date().toISOString(),
            isCustomerUpload: false,
            challengeVotes: 0,
            downloadOptions: {
              free: { resolution: '800x600', format: 'JPG' },
              premium: { resolution: '4000x3000', format: 'RAW', price: 200 }
            },
            isVR: false,
            isLiveUpload: true
          };

          // Update event media
          setUserEvents(prevEvents => 
            prevEvents.map(e => 
              e.id === event.id 
                ? { ...e, totalPhotos: e.totalPhotos + 1 }
                : e
            )
          );

          // Add notification
          setNotifications(prev => [
            `New live photo uploaded to ${event.name}!`,
            ...prev
          ]);

          console.log('Auto-uploaded photo for live event:', event.name, newPhoto);
        });
      }, 30000); // Upload every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoUploadEnabled, photographers]);

  const renderLivePhotos = () => (
    <div className="live-photos">
      <div className="section-header">
        <h2>🔴 Live Event Photos</h2>
        <p>Real-time photos from ongoing events</p>
      </div>
      
      {liveEvents.length > 0 ? (
        <div className="live-events-grid">
          {liveEvents.map(event => (
            <div key={event.id} className="live-event-card">
              <div className="live-event-header">
                <div className="live-event-info">
                  <h3>{event.name}</h3>
                  <p>📍 {event.location}</p>
                  <div className="live-status">
                    <span className="live-dot"></span>
                    <span>LIVE NOW</span>
                  </div>
                </div>
                <div className="live-stats">
                  <span>📸 {event.totalPhotos} photos</span>
                  <span>🎥 {event.totalVideos} videos</span>
                </div>
              </div>
              
              <div className="live-photos-grid">
                {eventMedia[event.id]?.filter(media => media.isLiveUpload).map(media => (
                  <div key={media.id} className="live-photo-item">
                    <div className="media-container" onClick={() => handleMediaView(media)}>
                      {media.type === 'photo' ? (
                        <img 
                          src={media.url} 
                          alt={media.description} 
                          style={{ cursor: 'pointer' }}
                          title="Click to view full size"
                        />
                      ) : media.type === 'video' ? (
                        <video 
                          poster={media.thumbnail} 
                          style={{ cursor: 'pointer' }}
                          title="Click to view full size"
                        >
                          <source src={media.url} type="video/mp4" />
                        </video>
                      ) : (
                        <img 
                          src={media.thumbnail || media.url} 
                          alt={media.description} 
                          style={{ cursor: 'pointer' }}
                          title="Click to view full size"
                        />
                      )}
                      <div className="live-badge">LIVE</div>
                      <div className="upload-time">
                        {new Date(media.uploadedAt).toLocaleTimeString()}
                      </div>
                      <div className="media-type-badge">
                        {media.type === 'video' ? '🎥' : media.type === 'vr' ? '360°' : '📸'}
                      </div>
                    </div>
                    <div className="photo-info">
                      <p>{media.description}</p>
                      <p>by {media.photographerName}</p>
                      <button 
                        className="photographer-link-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhotoClick(media);
                        }}
                      >
                        View Photographer Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setSelectedEvent(event)} 
                className="view-event-btn"
              >
                View Full Event
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-live-events">
          <div className="no-live-icon">🔴</div>
          <h3>No Live Events</h3>
          <p>Currently no events are happening live. Check back later!</p>
        </div>
      )}
    </div>
  );

  const renderPastEvents = () => (
    <div className="past-events">
      <div className="section-header">
        <h2>📚 Past Events</h2>
        <p>Completed events and their photo galleries</p>
      </div>

      <div className="past-events-grid">
        {userEvents.filter(event => event.status === 'completed').map(event => (
          <div key={event.id} className="past-event-card">
            <div className="event-cover">
              <img src={event.coverImage} alt={event.name} />
              <div className="event-status">
                <span className="status-badge completed">✅ Completed</span>
              </div>
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
                </div>
            <button 
              onClick={() => setSelectedEvent(event)} 
              className="view-gallery-btn"
            >
              View Gallery
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPhotographerUpload = () => (
    <div className="photographer-upload-section">
      <div className="section-header">
        <h2>📤 Professional Photo Upload</h2>
        <p>Upload and organize your event photos professionally</p>
      </div>
      
      <div className="upload-workflow">
        {/* Step 1: Event Selection */}
        <div className="upload-step">
          <div className="step-header">
            <span className="step-number">1</span>
            <h3>Select Event</h3>
          </div>
          <div className="step-content">
            <div className="event-selection">
              <label>Choose Event:</label>
              <select
                value={uploadData.eventId}
                onChange={(e) => setUploadData({ ...uploadData, eventId: e.target.value })}
                className="event-select"
              >
                <option value="">Select an event...</option>
                {userEvents.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.name} - {new Date(event.date).toLocaleDateString()} ({event.status})
                  </option>
                ))}
              </select>
            </div>
            
            {uploadData.eventId && (
              <div className="selected-event-info">
                {(() => {
                  const selectedEvent = userEvents.find(e => e.id == uploadData.eventId);
                  return selectedEvent ? (
                    <div className="event-preview">
                      <img src={selectedEvent.coverImage} alt={selectedEvent.name} />
                      <div className="event-details">
                        <h4>{selectedEvent.name}</h4>
                        <p>📅 {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <p>📍 {selectedEvent.location}</p>
                        <p>👤 {selectedEvent.organizer}</p>
                        <span className={`status-badge ${selectedEvent.status}`}>
                          {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Step 2: File Selection */}
        <div className="upload-step">
          <div className="step-header">
            <span className="step-number">2</span>
            <h3>Select Photos</h3>
          </div>
          <div className="step-content">
            <div className="file-upload-area">
              <input
                type="file"
                multiple
                accept="image/*,.raw,.cr2,.nef,.arw"
                onChange={handleFileSelect}
                className="file-input"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="upload-label">
                <div className="upload-icon">📷</div>
                <h4>Choose Photos to Upload</h4>
                <p>Drag & drop or click to select photos (JPG, PNG, RAW formats supported)</p>
                <div className="upload-stats">
                  <span>Max file size: 50MB per photo</span>
                  <span>Supported formats: JPG, PNG, RAW</span>
                </div>
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div className="selected-files">
                <h4>Selected Files ({selectedFiles.length})</h4>
                <div className="files-grid">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="file-preview">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={file.name}
                        className="preview-image"
                      />
                      <div className="file-info">
                        <p className="file-name">{file.name}</p>
                        <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button 
                        className="remove-file"
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
        </div>

        {/* Step 3: Metadata & Settings */}
        <div className="upload-step">
          <div className="step-header">
            <span className="step-number">3</span>
            <h3>Photo Details & Settings</h3>
        </div>
          <div className="step-content">
            <div className="metadata-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  >
                    <option value="wedding">Wedding</option>
                    <option value="portrait">Portrait</option>
                    <option value="event">Event</option>
                    <option value="fashion">Fashion</option>
                    <option value="commercial">Commercial</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Resolution</label>
                  <select
                    value={uploadData.resolution}
                    onChange={(e) => setUploadData({ ...uploadData, resolution: e.target.value })}
                  >
                    <option value="high">High (Original)</option>
                    <option value="medium">Medium (Compressed)</option>
                    <option value="low">Low (Preview)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  placeholder="Describe these photos or add any special notes..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={uploadData.tags}
                  onChange={(e) => setUploadData({ ...uploadData, tags: e.target.value })}
                  placeholder="wedding, ceremony, reception, portrait..."
                />
                <small>Separate tags with commas</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Delivery Date</label>
                  <input
                    type="date"
                    value={uploadData.deliveryDate}
                    onChange={(e) => setUploadData({ ...uploadData, deliveryDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Client Approval Required</label>
                  <select
                    value={uploadData.clientApproval}
                    onChange={(e) => setUploadData({ ...uploadData, clientApproval: e.target.value })}
                  >
                    <option value="pending">Pending Approval</option>
                    <option value="approved">Pre-approved</option>
                    <option value="not-required">Not Required</option>
                  </select>
                </div>
              </div>

              <div className="upload-options">
                <div className="option-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={uploadData.isWatermarked}
                      onChange={(e) => setUploadData({ ...uploadData, isWatermarked: e.target.checked })}
                    />
                    <span className="checkmark"></span>
                    Add Watermark
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={uploadData.isFeatured}
                      onChange={(e) => setUploadData({ ...uploadData, isFeatured: e.target.checked })}
                    />
                    <span className="checkmark"></span>
                    Mark as Featured
                  </label>
                </div>

                <div className="pricing-section">
                  <label>Pricing (₹)</label>
                  <div className="pricing-options">
                    <input
                      type="number"
                      value={uploadData.price}
                      onChange={(e) => setUploadData({ ...uploadData, price: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      min="0"
                    />
                    <span className="price-note">Leave 0 for free photos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Upload Progress */}
        {isUploading && (
          <div className="upload-step">
            <div className="step-header">
              <span className="step-number">4</span>
              <h3>Uploading Photos</h3>
            </div>
            <div className="step-content">
              <div className="upload-progress">
                <div className="overall-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Object.values(uploadProgress).length > 0 ? 
                        Object.values(uploadProgress).reduce((a, b) => a + b, 0) / Object.values(uploadProgress).length : 0}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {Object.values(uploadProgress).length > 0 ? 
                      Math.round(Object.values(uploadProgress).reduce((a, b) => a + b, 0) / Object.values(uploadProgress).length) : 0}% Complete
                  </span>
                </div>
                
                <div className="files-progress">
                  {uploadQueue.map((file, index) => (
                    <div key={index} className="file-progress">
                      <span className="file-name">{file.name}</span>
                      <div className="progress-bar small">
                        <div 
                          className="progress-fill"
                          style={{ width: `${uploadProgress[`file_${Date.now()}_${index}`] || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="upload-actions">
          <button
            className="professional-upload-btn"
            onClick={handleProfessionalUpload}
            disabled={selectedFiles.length === 0 || !uploadData.eventId || isUploading}
          >
            {isUploading ? '⏳ Uploading...' : `📤 Upload ${selectedFiles.length} Photos`}
          </button>
        </div>
      </div>
    </div>
  );

  const renderMyEvents = () => (
    <div className="my-events">
      <div className="section-header">
        <h2>{currentUser?.role === 'photographer' ? 'My Photography Events' : 'My Events'}</h2>
        <p>{currentUser?.role === 'photographer' ? 'Manage your photography assignments and upload photos' : 'View photos from events you attended'}</p>
      </div>

      <div className="filter-sort-section">
        <div className="filter-group">
          <label className="filter-label">Filter by Status:</label>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({userEvents.length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilterStatus('upcoming')}
            >
              🔜 Upcoming ({userEvents.filter(e => e.status === 'upcoming').length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'live' ? 'active' : ''}`}
              onClick={() => setFilterStatus('live')}
            >
              🔴 Live ({userEvents.filter(e => e.status === 'live').length})
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              ✅ Completed ({userEvents.filter(e => e.status === 'completed').length})
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
            <option value="participants">👥 Most Photographers</option>
            <option value="photos">📷 Most Photos</option>
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
                ? '📅'
                : filterStatus === 'live' ? '🔴' 
                : filterStatus === 'upcoming' ? '🔜'
                : '✅'
              }
            </div>
            <h3>
              {filterStatus === 'all' 
                ? 'No Events Found'
                : `No ${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Events Found`
              }
            </h3>
            <p>
              {filterStatus === 'all' 
                ? 'No events match your current criteria. Try adjusting your filters or sorting options.'
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
            </div>
          </div>
        ) : (
          filteredEvents.map(event => (
          <div key={event.id} className={`event-card ${currentUser?.role === 'photographer' ? 'photographer-event' : ''}`} onClick={() => setSelectedEvent(event)}>
            <div className="event-cover">
              <img src={event.coverImage} alt={event.name} />
              <div className="event-status">
                <span className={`status-badge ${event.status}`}>
                  {event.status === 'completed' ? '✅ Completed' : 
                   event.status === 'live' ? '🔴 LIVE' : '⏳ Upcoming'}
                </span>
              </div>
              {event.challenges.length > 0 && (
                <div className="challenge-badge">🏆 Active Challenge</div>
              )}
              {currentUser?.role === 'photographer' && event.photographers.includes(currentUser.id) && (
                <div className="photographer-badge">📸 Your Event</div>
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
              
              {/* Photographer-specific actions */}
              {currentUser?.role === 'photographer' && event.photographers.includes(currentUser.id) && (
                <div className="photographer-actions">
                  {event.status === 'upcoming' && (
                    <button 
                      className="quick-upload-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadData(prev => ({ ...prev, eventId: event.id }));
                        setActiveTab('photographer-upload');
                      }}
                    >
                      📤 Quick Upload
                    </button>
                  )}
                  {event.status === 'live' && (
                    <button 
                      className="live-upload-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadData(prev => ({ ...prev, eventId: event.id }));
                        setActiveTab('photographer-upload');
                      }}
                    >
                      🔴 Live Upload
                    </button>
                  )}
                  {event.status === 'completed' && (
                    <button 
                      className="final-upload-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadData(prev => ({ ...prev, eventId: event.id }));
                        setActiveTab('photographer-upload');
                      }}
                    >
                      📸 Final Upload
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          ))
        )}
      </div>
      
      {/* Photographer-specific summary */}
      {currentUser?.role === 'photographer' && (
        <div className="photographer-summary">
          <div className="summary-cards">
            <div className="summary-card">
              <h4>📸 My Events</h4>
              <p className="summary-number">{userEvents.filter(e => e.photographers.includes(currentUser.id)).length}</p>
              <p className="summary-label">Total Assignments</p>
            </div>
            <div className="summary-card">
              <h4>✅ Completed</h4>
              <p className="summary-number">{userEvents.filter(e => e.status === 'completed' && e.photographers.includes(currentUser.id)).length}</p>
              <p className="summary-label">Finished Events</p>
            </div>
            <div className="summary-card">
              <h4>🔴 Live</h4>
              <p className="summary-number">{userEvents.filter(e => e.status === 'live' && e.photographers.includes(currentUser.id)).length}</p>
              <p className="summary-label">Ongoing Events</p>
            </div>
            <div className="summary-card">
              <h4>⏳ Upcoming</h4>
              <p className="summary-number">{userEvents.filter(e => e.status === 'upcoming' && e.photographers.includes(currentUser.id)).length}</p>
              <p className="summary-label">Scheduled Events</p>
            </div>
          </div>
        </div>
      )}
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
        {currentUser?.role === 'photographer' && selectedEvent.photographers.includes(currentUser.id) && (
          <div className="photographer-controls">
            <button 
              onClick={() => {
                setUploadData(prev => ({ ...prev, eventId: selectedEvent.id }));
                setActiveTab('photographer-upload');
                setSelectedEvent(null);
              }} 
              className="upload-btn"
            >
              📤 Upload Photos
            </button>
            <button className="manage-photos-btn">
              📋 Manage My Photos
            </button>
            <button className="event-stats-btn">
              📊 View My Stats
            </button>
            <button className="client-delivery-btn">
              📦 Client Delivery
            </button>
          </div>
        )}
        {currentUser?.role === 'photographer' && !selectedEvent.photographers.includes(currentUser.id) && (
          <div className="photographer-info">
            <p>You are not assigned to this event</p>
            <button className="request-assignment-btn">
              📝 Request Assignment
            </button>
          </div>
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
          <button className="filter-btn active">All Media</button>
          <button className="filter-btn">Photos</button>
          <button className="filter-btn">Videos</button>
          <button className="filter-btn">VR/360°</button>
          <button className="filter-btn">Featured</button>
        </div>
        
        <div className="media-grid">
          {eventMedia[selectedEvent.id]?.map(media => (
            <div key={media.id} className={`media-item ${media.photographerId === currentUser?.id ? 'my-photo' : ''}`}>
              <div className="media-container" onClick={() => media.type === 'photo' && handlePhotoClick(media)}>
                {media.type === 'photo' ? (
                  <img 
                    src={media.url} 
                    alt={media.description} 
                    style={{ cursor: 'pointer' }}
                    title="Click to view photographer profile"
                  />
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
                {media.photographerId === currentUser?.id && <div className="my-photo-badge">📸 My Photo</div>}
              </div>
              <div className="media-info">
                <h4>{media.description}</h4>
                <p>by {media.photographerName}</p>
                
                {/* Photographer-specific photo info */}
                {currentUser?.role === 'photographer' && media.photographerId === currentUser.id && (
                  <div className="photographer-photo-info">
                    <div className="photo-performance">
                      <span className="performance-metric">
                        <strong>{media.likes + media.loves + media.fires}</strong> total reactions
                      </span>
                      <span className="performance-metric">
                        <strong>{media.comments.length}</strong> comments
                      </span>
                      {media.price > 0 && (
                        <span className="performance-metric">
                          <strong>₹{media.price}</strong> price
                        </span>
                      )}
                    </div>
                    <div className="photo-status">
                      <span className={`status-indicator ${media.isApproved ? 'approved' : 'pending'}`}>
                        {media.isApproved ? '✅ Approved' : '⏳ Pending'}
                      </span>
                      {media.isHighlighted && <span className="status-indicator featured">⭐ Featured</span>}
                    </div>
                  </div>
                )}
                
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
                  
                  {/* Photographer-specific actions for their own photos */}
                  {currentUser?.role === 'photographer' && media.photographerId === currentUser.id && (
                    <div className="photographer-photo-actions">
                      <button className="edit-photo-btn" title="Edit photo details">
                        ✏️
                      </button>
                      <button className="duplicate-photo-btn" title="Duplicate this photo">
                        📋
                      </button>
                      <button className="delete-photo-btn" title="Delete photo">
                        🗑️
                      </button>
                    </div>
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
            {activeTab === 'photographer-upload' && renderPhotographerUpload()}
            {activeTab === 'live-photos' && renderLivePhotos()}
            {activeTab === 'past-events' && renderPastEvents()}
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

      {/* Media Viewer Modal */}
      {viewerModal && viewingMedia && (
        <div className="media-viewer-modal">
          <div className="viewer-overlay" onClick={() => setViewerModal(false)}></div>
          <div className="viewer-content">
            <div className="viewer-header">
              <div className="viewer-info">
                <h3>{viewingMedia.description}</h3>
                <p>by {viewingMedia.photographerName}</p>
                <p className="upload-time">
                  Uploaded: {new Date(viewingMedia.uploadedAt).toLocaleString()}
                </p>
              </div>
              <button 
                className="close-viewer-btn"
                onClick={() => setViewerModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="viewer-media">
              {viewingMedia.type === 'photo' ? (
                <img 
                  src={viewingMedia.url} 
                  alt={viewingMedia.description}
                  className="viewer-image"
                />
              ) : viewingMedia.type === 'video' ? (
                <video 
                  src={viewingMedia.url}
                  controls
                  autoPlay
                  className="viewer-video"
                >
                  <source src={viewingMedia.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={viewingMedia.thumbnail || viewingMedia.url} 
                  alt={viewingMedia.description}
                  className="viewer-image"
                />
              )}
            </div>
            
            <div className="viewer-actions">
              <button 
                className="photographer-profile-btn"
                onClick={() => {
                  setViewerModal(false);
                  handlePhotoClick(viewingMedia);
                }}
              >
                📸 View Photographer Profile
              </button>
              <button 
                className="download-btn"
                onClick={() => {
                  setViewerModal(false);
                  setSelectedMedia(viewingMedia);
                  setDownloadModal(true);
                }}
              >
                ⬇️ Download
              </button>
              <button 
                className="share-btn"
                onClick={() => handleShare(viewingMedia.id)}
              >
                📤 Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPhotos;
