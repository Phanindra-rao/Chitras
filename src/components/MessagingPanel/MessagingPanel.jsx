import { useState, useEffect } from 'react';
import './MessagingPanel.css';

function MessagingPanel({ users, currentUser, onClose, onViewProfile, selectedPhotographerId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Get users you've chatted with
  const chattedUserIds = [...new Set([
    ...messages.filter(msg => msg.userId === currentUser.id).map(msg => msg.recipientId),
    ...messages.filter(msg => msg.recipientId === currentUser.id).map(msg => msg.userId)
  ].filter(id => id !== currentUser.id))];
  const availableUsers = users.filter(u => chattedUserIds.includes(u.id));

  useEffect(() => {
    // Initialize with the first available user or the selected photographer
    if (selectedPhotographerId && users.find(u => u.id === selectedPhotographerId)) {
      setSelectedUserId(selectedPhotographerId);
    } else if (availableUsers.length > 0 && !selectedUserId) {
      setSelectedUserId(availableUsers[0].id);
    }
  }, [availableUsers, selectedUserId, selectedPhotographerId, users]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUserId) {
      const recipient = users.find(u => u.id === selectedUserId);
      if (currentUser.role === 'customer' && recipient.role === 'customer') {
        alert(`${recipient.name} is also a customer`);
      }
      setMessages(prev => [
        ...prev,
        { id: Date.now(), userId: currentUser.id, recipientId: selectedUserId, content: newMessage, timestamp: new Date().toISOString() },
      ]);
      setNewMessage('');
    }
  };

  // Get conversation history with selected user
  const conversation = messages.filter(msg =>
    (msg.userId === currentUser.id && msg.recipientId === selectedUserId) ||
    (msg.userId === selectedUserId && msg.recipientId === currentUser.id)
  );

  return (
    <div className="messaging-panel">
      <div className="messaging-header">
        <h2>Messages</h2>
        <button onClick={onClose} className="close-button">X</button>
      </div>
      <div className="messaging-content">
        <div className="messaging-contacts">
          {availableUsers.length > 0 ? (
            availableUsers.map(user => (
              <div
                key={user.id}
                className={`contact-item ${selectedUserId === user.id ? 'selected' : ''}`}
                onClick={() => setSelectedUserId(user.id)}
              >
                <span>{user.name} ({user.role})</span>
                {user.role === 'photographer' && (
                  <button className="view-profile-btn" onClick={(e) => { e.stopPropagation(); onViewProfile(user.id); }}>View Profile</button>
                )}
              </div>
            ))
          ) : (
            <div className="no-contacts">No previous conversations</div>
          )}
        </div>
        <div className="messaging-thread">
          {selectedUserId ? (
            <>
              <div className="thread-header">
                <h3>Conversation with {users.find(u => u.id === selectedUserId)?.name}</h3>
              </div>
              <div className="message-list">
                {conversation.map(message => (
                  <div
                    key={message.id}
                    className={`message-item ${message.userId === currentUser.id ? 'sent' : 'received'}`}
                  >
                    <p>{message.content}</p>
                    <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="message-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="no-selection">Select a contact to start messaging</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagingPanel;