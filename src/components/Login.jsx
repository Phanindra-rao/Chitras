import { useState } from 'react';
import '../css/Login.css';

function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('customer');

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Mock sign-in logic (replace with API call)
    const existingUser = { id: Date.now(), email, role: 'customer' }; // Simplified for demo
    onLogin(existingUser);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone,
      role: userType,
    };
    onLogin(newUser);
  };

  return (
    <div className="login">
      <h2>Chitrasetu Login</h2>
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
        <label htmlFor="signin-email">Email</label>
        <input
          type="email"
          id="signin-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="signin-password">Password</label>
        <input
          type="password"
          id="signin-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      {/* Sign Up Form */}
      <form className={`signup-form ${activeTab === 'signup' ? 'active' : ''}`} onSubmit={handleSignUpSubmit}>
        <label htmlFor="signup-name">Name</label>
        <input
          type="text"
          id="signup-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="signup-phone">Phone Number (Optional)</label>
        <input
          type="tel"
          id="signup-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="signup-password">Password</label>
        <input
          type="password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="photographer"
              checked={userType === 'photographer'}
              onChange={(e) => setUserType(e.target.value)}
            /> Photographer
          </label>
          <label>
            <input
              type="radio"
              value="customer"
              checked={userType === 'customer'}
              onChange={(e) => setUserType(e.target.value)}
            /> Customer
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Login;