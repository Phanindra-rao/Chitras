import { useState } from 'react';
import './Login.css';

function Login({ onLogin, onRegister }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('customer');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [website, setWebsite] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolio, setPortfolio] = useState([]);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    onLogin(email, ''); // Pass empty password since we're not using it
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSpecialties([...specialties, value]);
    } else {
      setSpecialties(specialties.filter(s => s !== value));
    }
  };

  const handlePortfolioUpload = (e) => {
    const files = Array.from(e.target.files);
    setPortfolio([...portfolio, ...files]);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Additional validation for photographers
    if (userType === 'photographer' && (!location || !bio)) {
      alert('Please fill in location and bio for photographer profile');
      return;
    }

    const newUser = {
      name,
      email,
      phone,
      role: userType,
      profilePhoto: profilePhoto ? URL.createObjectURL(profilePhoto) : null,
      location,
      bio,
      specialties,
      website,
      experience,
      portfolio: portfolio.map(file => URL.createObjectURL(file)),
      googleRating: 0,
      appRating: 0,
      profileText: bio,
      media: portfolio.map(file => URL.createObjectURL(file))
    };
    onRegister(newUser);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Chitrasethu</h2>
          <p>Connect with talented photographers</p>
        </div>
        
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        <form className={`signin-form ${activeTab === 'signin' ? 'active' : ''}`} onSubmit={handleSignInSubmit}>
          <div className="form-group">
            <label htmlFor="signin-email">EMAIL</label>
            <input
              type="email"
              id="signin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="login-btn">Sign In</button>
        </form>

        {/* Sign Up Form */}
        <form className={`signup-form ${activeTab === 'signup' ? 'active' : ''}`} onSubmit={handleSignUpSubmit}>
          <div className="form-group">
            <label htmlFor="signup-name">NAME</label>
            <input
              type="text"
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-email">EMAIL</label>
            <input
              type="email"
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-phone">PHONE NUMBER (OPTIONAL)</label>
            <input
              type="tel"
              id="signup-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="user-type">
            <label>I am a:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="customer"
                  checked={userType === 'customer'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="photographer"
                  checked={userType === 'photographer'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Photographer
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="event-organizer"
                  checked={userType === 'event-organizer'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Event Organizer
              </label>
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div className="form-group">
            <label htmlFor="profile-photo">PROFILE PHOTO</label>
            <div className="photo-upload-container">
              <input
                type="file"
                id="profile-photo"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="photo-input"
              />
              <label htmlFor="profile-photo" className="photo-upload-btn">
                {profilePhoto ? (
                  <div className="photo-preview">
                    <img src={URL.createObjectURL(profilePhoto)} alt="Profile preview" />
                    <span>Change Photo</span>
                  </div>
                ) : (
                  <div className="photo-placeholder">
                    <span className="photo-icon">📷</span>
                    <span>Upload Profile Photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Additional fields for photographers and event organizers */}
          {(userType === 'photographer' || userType === 'event-organizer') && (
            <>
              <div className="form-group">
                <label htmlFor="location">LOCATION *</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Mumbai, Maharashtra"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">BIO *</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself and your experience..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">WEBSITE (OPTIONAL)</label>
                <input
                  type="url"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">EXPERIENCE</label>
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3-5 years)</option>
                  <option value="expert">Expert (5+ years)</option>
                </select>
              </div>

              {/* Specialties for photographers */}
              {userType === 'photographer' && (
                <div className="form-group">
                  <label>SPECIALTIES</label>
                  <div className="specialties-grid">
                    {[
                      'Wedding Photography',
                      'Portrait Sessions',
                      'Event Coverage',
                      'Fashion Photography',
                      'Corporate Events',
                      'Family Photography',
                      'Product Photography',
                      'Real Estate Photography'
                    ].map(specialty => (
                      <label key={specialty} className="specialty-checkbox">
                        <input
                          type="checkbox"
                          value={specialty}
                          checked={specialties.includes(specialty)}
                          onChange={handleSpecialtyChange}
                        />
                        <span>{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Upload */}
              <div className="form-group">
                <label htmlFor="portfolio">PORTFOLIO SAMPLES</label>
                <div className="portfolio-upload-container">
                  <input
                    type="file"
                    id="portfolio"
                    accept="image/*"
                    multiple
                    onChange={handlePortfolioUpload}
                    className="portfolio-input"
                  />
                  <label htmlFor="portfolio" className="portfolio-upload-btn">
                    <span className="upload-icon">📁</span>
                    <span>Upload Portfolio Images</span>
                  </label>
                  {portfolio.length > 0 && (
                    <div className="portfolio-preview">
                      <p>{portfolio.length} image(s) selected</p>
                      <div className="portfolio-thumbnails">
                        {portfolio.slice(0, 3).map((file, index) => (
                          <img key={index} src={URL.createObjectURL(file)} alt={`Portfolio ${index + 1}`} />
                        ))}
                        {portfolio.length > 3 && <span className="more-count">+{portfolio.length - 3}</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;