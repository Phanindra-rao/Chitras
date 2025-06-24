import { useState } from 'react';
import '../css/Header.css';

function Header({ setView, currentUser, onSignOut, onMessagingToggle, searchQuery, setSearchQuery }) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <nav>
        <div className="nav-left">
          <div className="logo">Photographer App</div>
        </div>
        {currentUser ? (
          <div className="nav-center">
            <input
              type="text"
              placeholder="Search photographers..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        ) : null}
        {currentUser ? (
          <div className="nav-right">
            <ul>
              <li>
                <button onClick={() => setView('home')}>Home</button>
              </li>
              {currentUser.role === 'photographer' && (
                <li>
                  <button onClick={() => setView('requests')}>Requests</button>
                </li>
              )}
              {currentUser.role === 'customer' && (
                <li>
                  <button onClick={() => setView('profile')}>Profile</button>
                </li>
              )}
              <li>
                <button onClick={onSignOut}>Sign Out</button>
              </li>
              <li>
                <button onClick={onMessagingToggle}>
                  Messages
                  <span className="message-icon">💬</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav-right">
            <ul>
              <li>
                <button onClick={() => setView('login')}>Login</button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;