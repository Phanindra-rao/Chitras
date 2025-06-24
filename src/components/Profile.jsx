import { useState } from 'react';
import ContactButton from './ContactButton';
import '../css/Profile.css';

function Profile({ user, onUpdateProfile, onUploadPhoto }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || 'https://via.placeholder.com/150');
  const [profileText, setProfileText] = useState(user?.profileText || 'Tell us about yourself...');
  const [editPhoto, setEditPhoto] = useState('');
  const [editText, setEditText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('photo');

  const handleEditClick = () => {
    setIsEditing(true);
    setEditPhoto(profilePhoto);
    setEditText(profileText);
  };

  const handleSaveClick = () => {
    if (editPhoto && editText) {
      onUpdateProfile({ profilePhoto: editPhoto, profileText: editText });
      setProfilePhoto(editPhoto);
      setProfileText(editText);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditPhoto('');
    setEditText('');
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (mediaUrl) {
      onUploadPhoto({ url: mediaUrl, type: mediaType });
      setMediaUrl('');
    }
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow">
      <h2>{user.name}</h2>
      <p>Role: {user.role}</p>
      {user.role === 'photographer' && (
        <>
          <img
            src={profilePhoto}
            alt={`${user.name}'s profile`}
            className="profile-photo"
            style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '1rem auto', border: '2px solid #1e40af' }}
          />
          <p>{profileText}</p>
          <p>Rating: {user.rating || 'N/A'}</p>
          {!isEditing && (
            <button onClick={handleEditClick} className="edit-button">
              Edit Profile
            </button>
          )}
          {isEditing && (
            <div className="edit-form">
              <label>Profile Photo URL</label>
              <input
                type="url"
                value={editPhoto}
                onChange={(e) => setEditPhoto(e.target.value)}
                placeholder="Enter photo URL"
              />
              <label>Bio</label>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Edit your bio..."
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          )}
          <div className="portfolio-upload">
            <h3>Upload Portfolio Media</h3>
            <form onSubmit={handleUpload}>
              <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Enter media URL"
                required
              />
              <button type="submit">Upload</button>
            </form>
          </div>
          <ContactButton email={user.email} />
        </>
      )}
      {user.role !== 'photographer' && <ContactButton email={user.email} />}
    </section>
  );
}

export default Profile;