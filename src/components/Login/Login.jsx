import { useState } from 'react';
import './Login.css';

function Login({ onLogin, onRegister }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('customer');

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    onLogin(email, ''); // Pass empty password since we're not using it
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in all required fields');
      return;
    }
    const newUser = {
      name,
      email,
      phone,
      role: userType,
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
            </div>
          </div>
          
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;