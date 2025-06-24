import { useState } from 'react';
import '../css/Sidebar.css';

function Sidebar({ user, requests, quotes, onNewQuote }) {
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('photo');
  const [quoteInput, setQuoteInput] = useState({ requestId: null, amount: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(`Uploading ${mediaType}: ${mediaUrl}`);
    setMediaUrl('');
  };

  const handleQuoteSubmit = (e, requestId) => {
    e.preventDefault();
    const amount = parseFloat(quoteInput.amount);
    if (amount <= 0) {
      alert('Please enter a positive amount for the quote.');
      return;
    }
    if (quoteInput.requestId === requestId) {
      onNewQuote(requestId, { amount: `${amount} rupees`, photographerId: user.id });
      setQuoteInput({ requestId: null, amount: '' });
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000); // Hide after 3 seconds
    }
  };

  if (!user || user.role !== 'photographer') return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>About</h3>
        <p>Details about {user.name} go here.</p>
      </div>
      <div className="sidebar-section">
        <h3>Upload</h3>
        <form onSubmit={handleUpload}>
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
          <input
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Enter URL"
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>
      <div className="sidebar-section">
        <h3>Portfolio</h3>
        <ul className="portfolio-list">
          <li>Weddings</li>
          <li>Birthdays</li>
          <li>Corporate Events</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Customer Requests</h3>
        {requests.length === 0 && <p>No requests yet.</p>}
        {requests.map(request => (
          <div key={request.id} className="request-item">
            <p>Event: {request.eventType}, Budget: {request.budget}, Requirements: {request.additionalRequirements}</p>
            {quotes[request.id]?.[user.id] ? (
              <p>Your Quote: {quotes[request.id][user.id].amount} rupees</p>
            ) : (
              <form onSubmit={(e) => handleQuoteSubmit(e, request.id)}>
                <input
                  type="number"
                  value={quoteInput.requestId === request.id ? quoteInput.amount : ''}
                  onChange={(e) => setQuoteInput({ requestId: request.id, amount: e.target.value })}
                  placeholder="Enter quote (rupees)"
                  min="1"
                  step="0.01"
                />
                <button type="submit">Submit Quote</button>
              </form>
            )}
            {showConfirmation && quoteInput.requestId === request.id && (
              <p className="confirmation-message">Quote submitted successfully!</p>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;