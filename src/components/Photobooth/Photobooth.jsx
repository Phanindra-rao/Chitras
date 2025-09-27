import React, { useState, useEffect } from 'react';
import './Photobooth.css';

function Photobooth({ currentUser, showModeSelector = true }) {
  const [activeMode, setActiveMode] = useState('guest'); // Always start with guest side for user interface
  const [currentEvent, setCurrentEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [qrCode, setQrCode] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalGuests: 0,
    photosUploaded: 0,
    downloads: 0,
    shares: 0
  });

  // Sample event data
  const [events] = useState([
    {
      id: 1,
      name: 'Wedding Reception',
      date: '2024-12-20',
      location: 'Taj Palace, Mumbai',
      logo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=100',
      photographerId: 1,
      photographerName: 'John Doe',
      status: 'live',
      qrToken: 'WED20241220ABC123'
    },
    {
      id: 2,
      name: 'Corporate Event',
      date: '2024-12-18',
      location: 'Convention Center, Delhi',
      logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100',
      photographerId: 2,
      photographerName: 'Jane Smith',
      status: 'completed',
      qrToken: 'CORP20241218XYZ789'
    }
  ]);

  // Sample photos data
  const [eventPhotos] = useState({
    1: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        timestamp: '2024-12-20T18:30:00Z',
        downloads: 12,
        shares: 8,
        viewed: true
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        timestamp: '2024-12-20T19:15:00Z',
        downloads: 15,
        shares: 12,
        viewed: true
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=400',
        timestamp: '2024-12-20T20:00:00Z',
        downloads: 8,
        shares: 5,
        viewed: false
      }
    ],
    2: [
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
        timestamp: '2024-12-18T14:30:00Z',
        downloads: 25,
        shares: 18,
        viewed: true
      }
    ]
  });

  useEffect(() => {
    // Set current event (in real app, this would be based on photographer's active event)
    if (currentUser?.role === 'photographer') {
      const photographerEvent = events.find(e => e.photographerId === currentUser.id && e.status === 'live');
      if (photographerEvent) {
        setCurrentEvent(photographerEvent);
        setPhotos(eventPhotos[photographerEvent.id] || []);
        generateQRCode(photographerEvent.qrToken);
      }
    }
  }, [currentUser]);

  const generateQRCode = (token) => {
    // In real app, this would generate actual QR code
    setQrCode(`https://chitrasethu.com/photobooth/${token}`);
  };

  const handlePhotoUpload = (file) => {
    const newPhoto = {
      id: Date.now(),
      url: URL.createObjectURL(file),
      timestamp: new Date().toISOString(),
      downloads: 0,
      shares: 0,
      viewed: false
    };
    setPhotos(prev => [...prev, newPhoto]);
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      photosUploaded: prev.photosUploaded + 1
    }));
  };

  const handleDownload = (photoId) => {
    const photo = photos.find(p => p.id === photoId);
    if (photo) {
      // Simulate download
      const link = document.createElement('a');
      link.href = photo.url;
      link.download = `photobooth-${photoId}.jpg`;
      link.click();
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        downloads: prev.downloads + 1
      }));
    }
  };

  const handleShare = (photoId, platform) => {
    const photo = photos.find(p => p.id === photoId);
    if (photo) {
      // Simulate sharing
      console.log(`Sharing photo ${photoId} to ${platform}`);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        shares: prev.shares + 1
      }));
    }
  };

  const handleSaveToAlbum = () => {
    if (!currentUser) {
      setShowSignupModal(true);
      return;
    }
    // Save to user's album
    console.log('Saving to album');
  };

  const handleCapture = () => {
    // Simulate photo capture
    const newPhoto = {
      id: Date.now(),
      url: `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 1000000000}?w=400`,
      timestamp: new Date().toISOString(),
      downloads: 0,
      shares: 0,
      viewed: false,
      qrToken: currentEvent?.qrToken || 'DEMO123'
    };
    setPhotos(prev => [...prev, newPhoto]);
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      photosUploaded: prev.photosUploaded + 1,
      totalGuests: prev.totalGuests + 1
    }));
  };

  const handlePrintQR = () => {
    // Simulate printing QR code
    console.log('Printing QR slip for:', qrCode);
    alert('QR slip sent to printer!');
  };

  const handleDeletePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const renderGuestSide = () => {
    // If no current event is set, show a QR scan simulation
    if (!currentEvent) {
      return (
        <div className="photobooth-guest">
          <div className="qr-scan-simulation">
            <div className="qr-scanner">
              <div className="scanner-frame">
                <div className="scanner-corners">
                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>
                </div>
                <div className="scanner-line"></div>
              </div>
            </div>
            <h2>📱 Scan QR Code to Access Event Photos</h2>
            <p>Point your camera at the QR code provided by the photographer</p>
            
            {/* Demo QR Code */}
            <div className="demo-qr-section">
              <h3>Demo QR Code</h3>
              <div className="demo-qr-code">
                <div className="qr-placeholder">
                  <span className="qr-icon">📱</span>
                  <p>QR Code</p>
                </div>
              </div>
              <button 
                className="demo-scan-btn"
                onClick={() => {
                  // Simulate scanning the demo QR code
                  const demoEvent = events[0];
                  setCurrentEvent(demoEvent);
                  setPhotos(eventPhotos[demoEvent.id] || []);
                  setSelectedPhoto(eventPhotos[demoEvent.id]?.[0] || null);
                }}
              >
                🔍 Try Demo QR Code
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="photobooth-guest">
        {/* Header: Event Name + Logo */}
        <div className="guest-header">
          <div className="event-info">
            <img src={currentEvent?.logo} alt="Event Logo" className="event-logo" />
            <h1>{currentEvent?.name}</h1>
          </div>
        </div>

        {/* Big photo preview (latest clicked) */}
        <div className="photo-preview-section">
          {selectedPhoto ? (
            <div className="photo-preview">
              <img src={selectedPhoto.url} alt="Latest Photo" />
              <div className="photo-actions">
                <button 
                  className="action-btn download-btn"
                  onClick={() => handleDownload(selectedPhoto.id)}
                >
                  📥 Download Photo
                </button>
                <button 
                  className="action-btn save-btn"
                  onClick={handleSaveToAlbum}
                >
                  ❤️ Save to My Album
                </button>
                <button 
                  className="action-btn share-btn"
                  onClick={() => handleShare(selectedPhoto.id, 'whatsapp')}
                >
                  🔗 Share
                </button>
              </div>
            </div>
          ) : (
            <div className="no-photo">
              <div className="no-photo-icon">📸</div>
              <h3>No photos yet</h3>
              <p>Photos will appear here once uploaded by the photographer</p>
            </div>
          )}
        </div>

        {/* Gallery View (if multiple photos for guest) */}
        {photos.length > 1 && (
          <div className="gallery-section">
            <div className="gallery-header">
              <h3>📸 Event Gallery</h3>
              <p>{photos.length} photos available</p>
            </div>
            <div className="gallery-grid">
              {photos.map(photo => (
                <div 
                  key={photo.id} 
                  className="gallery-item"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img src={photo.url} alt={`Photo ${photo.id}`} />
                  <div className="photo-overlay">
                    <div className="photo-info">
                      <span className="photo-time">
                        {new Date(photo.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="photo-stats">
                        📥 {photo.downloads} • 🔗 {photo.shares}
                      </span>
                    </div>
                    <div className="photo-actions-overlay">
                      <button 
                        className="quick-download-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(photo.id);
                        }}
                      >
                        📥
                      </button>
                      <button 
                        className="quick-share-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(photo.id, 'whatsapp');
                        }}
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                  {photo.viewed && <div className="viewed-indicator">👁️</div>}
                </div>
              ))}
            </div>
            
            {/* Floating button: "Save All to My Chitrasethu Account." */}
            <div className="floating-save-all">
              <button 
                className="floating-save-btn"
                onClick={handleSaveToAlbum}
              >
                <span className="save-icon">💾</span>
                <span className="save-text">Save All to My Chitrasethu Account</span>
                <span className="save-count">({photos.length})</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer: "Powered by Chitrasethu" */}
        <div className="guest-footer">
          <p>Powered by <strong>Chitrasethu</strong></p>
        </div>
      </div>
    );
  };

  const renderPhotographerSide = () => (
    <div className="photobooth-photographer">
      <div className="photographer-header">
        <h1>📸 Photobooth - Photographer Mode</h1>
        <p>Professional photo booth management</p>
      </div>

      <div className="photographer-content">
        {/* Upload Screen */}
        <div className="upload-section">
          <div className="upload-container">
            <div className="camera-ui">
              <div className="camera-preview">
                <div className="camera-frame">
                  <div className="camera-lens"></div>
                  <div className="camera-flash"></div>
                </div>
                <div className="camera-status">
                  <span className="status-indicator">●</span>
                  <span>Camera Ready</span>
                </div>
              </div>
              
              <button 
                className="capture-btn"
                onClick={handleCapture}
              >
                📸 Capture Photo
              </button>
            </div>
            
            <div className="upload-sidebar">
              {qrCode && (
                <div className="qr-panel">
                  <h3>QR Code Generated</h3>
                  <div className="qr-code-display">
                    <div className="qr-placeholder">
                      <div className="qr-icon">📱</div>
                      <span>QR Code</span>
                    </div>
                  </div>
                  <button 
                    className="print-qr-btn"
                    onClick={handlePrintQR}
                  >
                    🖨️ Print QR Slip
                  </button>
                </div>
              )}
              
              {photos.length > 0 && (
                <div className="recent-photos">
                  <h4>Recent Photos</h4>
                  <div className="photo-thumbnails">
                    {photos.slice(-3).map(photo => (
                      <div key={photo.id} className="thumbnail">
                        <img src={photo.url} alt={`Photo ${photo.id}`} />
                        <span className="photo-id">#{photo.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Dashboard */}
        <div className="dashboard-section">
          <h2>📊 Event Dashboard</h2>
          
          {/* Analytics Cards */}
          <div className="analytics-cards">
            <div className="analytics-card">
              <div className="card-icon">👥</div>
              <div className="card-content">
                <h3>Total Guests</h3>
                <p className="card-number">{analytics.totalGuests}</p>
              </div>
            </div>
            
            <div className="analytics-card">
              <div className="card-icon">📸</div>
              <div className="card-content">
                <h3>Photos Uploaded</h3>
                <p className="card-number">{analytics.photosUploaded}</p>
              </div>
            </div>
            
            <div className="analytics-card">
              <div className="card-icon">📥</div>
              <div className="card-content">
                <h3>Downloads</h3>
                <p className="card-number">{analytics.downloads}</p>
              </div>
            </div>
            
            <div className="analytics-card">
              <div className="card-icon">🔗</div>
              <div className="card-content">
                <h3>Shares</h3>
                <p className="card-number">{analytics.shares}</p>
              </div>
            </div>
          </div>
          
          {/* Photos Table */}
          <div className="table-container">
            <h3>📋 Photo Management</h3>
            <table className="photos-table">
              <thead>
                <tr>
                  <th>Photo ID</th>
                  <th>Guest QR Token</th>
                  <th>Status</th>
                  <th>Downloads</th>
                </tr>
              </thead>
              <tbody>
                {photos.map(photo => (
                  <tr key={photo.id}>
                    <td>
                      <div className="photo-id-cell">
                        <span className="photo-id">#{photo.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="qr-token">
                        <span className="token-prefix">QR</span>
                        <span className="token-code">{photo.qrToken}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${photo.viewed ? 'viewed' : 'not-viewed'}`}>
                        {photo.viewed ? '👁️ Viewed' : '⏳ Not Viewed'}
                      </span>
                    </td>
                    <td>
                      <span className="download-count">📥 {photo.downloads}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignupModal = () => (
    <div className="signup-modal-overlay">
      <div className="signup-modal">
        <div className="modal-header">
          <h3>💝 Want to keep your event memories forever?</h3>
          <button 
            className="close-modal"
            onClick={() => setShowSignupModal(false)}
          >
            ×
          </button>
        </div>
        <div className="modal-content">
          <p>Sign up to save all your photobooth photos and access them anytime!</p>
          <div className="modal-actions">
            <button className="signup-btn">
              🔑 Sign Up (Email/Phone/Google login)
            </button>
            <button 
              className="guest-btn"
              onClick={() => setShowSignupModal(false)}
            >
              ❌ Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="photobooth-container">
      {showModeSelector && (
        <div className="mode-selector">
          <button 
            className={`mode-btn ${activeMode === 'guest' ? 'active' : ''}`}
            onClick={() => setActiveMode('guest')}
          >
            📱 Guest Side
          </button>
          <button 
            className={`mode-btn ${activeMode === 'photographer' ? 'active' : ''}`}
            onClick={() => setActiveMode('photographer')}
          >
            📸 Photographer Side
          </button>
        </div>
      )}

      {/* Always show guest side when accessed from main header */}
      {showModeSelector ? (activeMode === 'guest' ? renderGuestSide() : renderPhotographerSide()) : renderGuestSide()}
      
      {showSignupModal && renderSignupModal()}
    </div>
  );
}

export default Photobooth;
