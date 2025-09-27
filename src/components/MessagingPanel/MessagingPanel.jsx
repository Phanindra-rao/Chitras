import { useState, useEffect } from 'react';
import './MessagingPanel.css';

function MessagingPanel({ users, currentUser, onClose, onViewProfile, selectedPhotographerId }) {
  const [messages, setMessages] = useState([
    // Sample messages to demonstrate color differences
    {
      id: 1,
      userId: 1, // Customer
      recipientId: 2, // Photographer
      content: "Hi! I'm interested in booking a wedding photography session.",
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      type: 'text'
    },
    {
      id: 2,
      userId: 2, // Photographer
      recipientId: 1, // Customer
      content: "Hello! I'd love to help you with your wedding photography. What's your budget range?",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      type: 'text'
    },
    {
      id: 3,
      userId: 1, // Customer
      recipientId: 2, // Photographer
      content: "My budget is around $2000-3000. Do you have any portfolio samples I can see?",
      timestamp: new Date(Date.now() - 3400000).toISOString(),
      type: 'text'
    },
    {
      id: 4,
      userId: 2, // Photographer
      recipientId: 1, // Customer
      content: "Perfect! That's within my range. Let me share some of my recent wedding work.",
      timestamp: new Date(Date.now() - 3300000).toISOString(),
      type: 'text'
    },
    {
      id: 5,
      userId: 2, // Photographer
      recipientId: 1, // Customer
      content: "📸 Photo shared",
      timestamp: new Date(Date.now() - 3200000).toISOString(),
      type: 'media',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      fileName: 'wedding_sample_1.jpg',
      fileSize: 2048000
    },
    {
      id: 6,
      userId: 1, // Customer
      recipientId: 2, // Photographer
      content: "Wow! These are beautiful! I love the lighting in the ceremony shots.",
      timestamp: new Date(Date.now() - 3100000).toISOString(),
      type: 'text'
    },
    {
      id: 7,
      userId: 2, // Photographer
      recipientId: 1, // Customer
      content: "Thank you! I specialize in natural lighting photography. When is your wedding date?",
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      type: 'text'
    },
    {
      id: 8,
      userId: 1, // Customer
      recipientId: 2, // Photographer
      content: "It's on June 15th, 2024. The ceremony will be outdoors at sunset.",
      timestamp: new Date(Date.now() - 2900000).toISOString(),
      type: 'text'
    },
    {
      id: 9,
      userId: 2, // Photographer
      recipientId: 1, // Customer
      content: "Perfect timing! Sunset ceremonies are my specialty. I'd be happy to work with you!",
      timestamp: new Date(Date.now() - 2800000).toISOString(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Get users you've chatted with
  const chattedUserIds = [...new Set([
    ...messages.filter(msg => msg.userId === currentUser.id).map(msg => msg.recipientId),
    ...messages.filter(msg => msg.recipientId === currentUser.id).map(msg => msg.userId)
  ].filter(id => id !== currentUser.id))];
  const availableUsers = users.filter(u => chattedUserIds.includes(u.id));
  
  // Get all other users for starting new chats
  const allOtherUsers = users.filter(u => u.id !== currentUser.id);

  useEffect(() => {
    // Initialize with the first available user or the selected photographer
    if (selectedPhotographerId && users.find(u => u.id === selectedPhotographerId)) {
      setSelectedUserId(selectedPhotographerId);
    } else if (availableUsers.length > 0 && !selectedUserId) {
      // Auto-select the first photographer for demonstration
      const photographer = availableUsers.find(u => u.role === 'photographer');
      setSelectedUserId(photographer ? photographer.id : availableUsers[0].id);
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
        { 
          id: Date.now(), 
          userId: currentUser.id, 
          recipientId: selectedUserId, 
          content: newMessage, 
          timestamp: new Date().toISOString(),
          type: 'text'
        },
      ]);
      setNewMessage('');
    }
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedUserId) return;

    setUploadingMedia(true);
    
    // Simulate upload process
    setTimeout(() => {
      const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
      const mediaUrl = URL.createObjectURL(file);
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          userId: currentUser.id,
          recipientId: selectedUserId,
          content: `${mediaType === 'image' ? '📸 Photo' : '🎥 Video'} shared`,
          timestamp: new Date().toISOString(),
          type: 'media',
          mediaType: mediaType,
          mediaUrl: mediaUrl,
          fileName: file.name,
          fileSize: file.size
        }
      ]);
      
      setUploadingMedia(false);
      setShowMediaUpload(false);
    }, 1500);
  };

  const handleStartNewChat = (userId) => {
    setSelectedUserId(userId);
    // Add a welcome message to start the conversation
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        userId: currentUser.id,
        recipientId: userId,
        content: `Hi! I'd like to discuss photography services.`,
        timestamp: new Date().toISOString(),
        type: 'text'
      }
    ]);
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
          <div className="contacts-header">
            <h3>Contacts</h3>
          </div>
          
          {/* Previous Conversations */}
          {availableUsers.length > 0 && (
            <div className="contacts-section">
              <h4>Recent Chats</h4>
              {availableUsers.map(user => (
                <div
                  key={user.id}
                  className={`contact-item ${user.role} ${selectedUserId === user.id ? 'selected' : ''}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div className="contact-info">
                    <span className="contact-name">{user.name}</span>
                    <span className="contact-role">{user.role}</span>
                  </div>
                  {user.role === 'photographer' && (
                    <button className="view-profile-btn" onClick={(e) => { e.stopPropagation(); onViewProfile(user.id); }}>View Profile</button>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* All Users for New Chats */}
          <div className="contacts-section">
            <h4>Start New Chat</h4>
            {allOtherUsers.map(user => (
              <div
                key={user.id}
                className={`contact-item new-chat ${user.role} ${selectedUserId === user.id ? 'selected' : ''}`}
                onClick={() => handleStartNewChat(user.id)}
              >
                <div className="contact-info">
                  <span className="contact-name">{user.name}</span>
                  <span className="contact-role">{user.role}</span>
                </div>
                {user.role === 'photographer' && (
                  <button className="view-profile-btn" onClick={(e) => { e.stopPropagation(); onViewProfile(user.id); }}>View Profile</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="messaging-thread">
          {selectedUserId ? (
            <>
              <div className="thread-header">
                <h3>Conversation with {users.find(u => u.id === selectedUserId)?.name}</h3>
              </div>
              <div className="message-list">
                {conversation.map(message => {
                  const messageUser = users.find(u => u.id === message.userId);
                  const userRole = messageUser?.role || 'customer';
                  const isSent = message.userId === currentUser.id;
                  
                  return (
                    <div
                      key={message.id}
                      className={`message-item ${isSent ? 'sent' : 'received'} ${userRole}`}
                    >
                    {message.type === 'media' ? (
                      <div className="media-message">
                        <div className="media-preview">
                          {message.mediaType === 'image' ? (
                            <img src={message.mediaUrl} alt={message.fileName} className="media-image" />
                          ) : (
                            <video src={message.mediaUrl} controls className="media-video">
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                        <div className="media-info">
                          <p className="media-name">{message.fileName}</p>
                          <p className="media-size">{(message.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                    <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                    </div>
                  );
                })}
                {uploadingMedia && (
                  <div className="message-item sent uploading">
                    <div className="uploading-indicator">
                      <div className="upload-spinner"></div>
                      <p>Uploading media...</p>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="message-form">
                <div className="message-input-container">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                  />
                  <div className="message-actions">
                    <button
                      type="button"
                      className="media-btn"
                      onClick={() => setShowMediaUpload(!showMediaUpload)}
                      title="Attach media"
                    >
                      📎
                    </button>
                    <button type="submit" className="send-btn">Send</button>
                  </div>
                </div>
                
                {showMediaUpload && (
                  <div className="media-upload-section">
                    <div className="media-upload-options">
                      <label className="media-upload-btn">
                        📸 Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMediaUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <label className="media-upload-btn">
                        🎥 Video
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleMediaUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                )}
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