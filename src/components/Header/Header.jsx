import { useState } from 'react';
import './Header.css';

function Header({ setView, currentUser, onSignOut, onMessagingToggle, searchQuery, setSearchQuery }) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (view) => {
    setView(view);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="logo" onClick={() => setView('home')}>Chitrasethu</h1>
          {currentUser && (
            <nav className="nav-menu">
              <button onClick={() => handleNavigation('home')} className="nav-btn">
                🏠 Home
              </button>
              <button onClick={() => handleNavigation('explore')} className="nav-btn">
                🔍 Explore
              </button>
              <button onClick={() => handleNavigation('event-photos')} className="nav-btn">
                📸 Event Photos
              </button>
              <button onClick={() => handleNavigation('moodboard')} className="nav-btn">
                🎨 Moodboard
              </button>
              <button onClick={() => handleNavigation('requests')} className="nav-btn">
                📋 Requests
              </button>
              <button onClick={() => handleNavigation('community-buzz')} className="nav-btn community-buzz-nav-btn">
                🎉 Community Buzz
              </button>
              <button onClick={() => handleNavigation('photobooth')} className="nav-btn photobooth-nav-btn">
                📸 Photobooth
              </button>
              <button onClick={() => handleNavigation('maps')} className="nav-btn">
                🗺️ Maps
              </button>
            </nav>
          )}
        </div>

        <div className="header-center">
          {currentUser && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search photographers, models, or content..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          )}
        </div>

        <div className="header-right">
          {currentUser ? (
            <div className="user-menu">
              <button onClick={onMessagingToggle} className="messenger-btn">
                <span className="messenger-icon">💬</span>
                <span className="messenger-text">Messages</span>
              </button>
              <button onClick={() => handleNavigation('profile')} className="profile-btn">
                <img src={currentUser.profilePhoto || 'https://via.placeholder.com/32'} alt="Profile" className="profile-photo" />
                <span>{currentUser.name}</span>
              </button>
              <button onClick={onSignOut} className="signout-btn">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={() => setView('login')} className="login-btn">
                Login
              </button>
              <button onClick={() => setView('login')} className="register-btn">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;