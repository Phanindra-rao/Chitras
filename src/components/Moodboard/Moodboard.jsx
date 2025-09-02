import React, { useState, useEffect } from 'react';
import './Moodboard.css';

function Moodboard({ moodboard, onSave, onShare, isEditable = true }) {
  const [items, setItems] = useState(moodboard?.items || []);
  const [title, setTitle] = useState(moodboard?.title || '');
  const [description, setDescription] = useState(moodboard?.description || '');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({ type: 'image', url: '', caption: '' });

  const handleAddItem = () => {
    if (newItem.url.trim()) {
      const item = {
        id: Date.now(),
        type: newItem.type,
        url: newItem.url,
        caption: newItem.caption,
        addedAt: new Date().toISOString()
      };
      setItems([...items, item]);
      setNewItem({ type: 'image', url: '', caption: '' });
      setIsAddingItem(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSave = () => {
    const moodboardData = {
      id: moodboard?.id || Date.now(),
      title,
      description,
      items,
      updatedAt: new Date().toISOString()
    };
    onSave(moodboardData);
  };

  return (
    <div className="moodboard">
      <div className="moodboard-header">
        <div className="moodboard-info">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Moodboard Title"
            className="moodboard-title"
            disabled={!isEditable}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your vision..."
            className="moodboard-description"
            disabled={!isEditable}
          />
        </div>
        {isEditable && (
          <div className="moodboard-actions">
            <button onClick={handleSave} className="save-btn">
              Save Moodboard
            </button>
            <button onClick={onShare} className="share-btn">
              Share
            </button>
          </div>
        )}
      </div>

      <div className="moodboard-grid">
        {items.map((item) => (
          <div key={item.id} className="moodboard-item">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.caption} className="moodboard-image" />
            ) : (
              <div className="moodboard-text">{item.url}</div>
            )}
            {item.caption && <p className="item-caption">{item.caption}</p>}
            {isEditable && (
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove-item-btn"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditable && (
        <div className="add-item-section">
          {!isAddingItem ? (
            <button onClick={() => setIsAddingItem(true)} className="add-item-btn">
              + Add Item
            </button>
          ) : (
            <div className="add-item-form">
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                className="item-type-select"
              >
                <option value="image">Image</option>
                <option value="text">Text</option>
              </select>
              <input
                type="text"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                placeholder={newItem.type === 'image' ? 'Image URL' : 'Text content'}
                className="item-url-input"
              />
              <input
                type="text"
                value={newItem.caption}
                onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                placeholder="Caption (optional)"
                className="item-caption-input"
              />
              <div className="add-item-actions">
                <button onClick={handleAddItem} className="confirm-add-btn">
                  Add
                </button>
                <button onClick={() => setIsAddingItem(false)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Moodboard;
