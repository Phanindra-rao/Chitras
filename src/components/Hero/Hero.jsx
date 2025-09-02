import React from 'react';
import './Hero.css';

function Hero({ onLogin, onRegister }) {
  return (
    <section className="hero">
      <h2>Welcome to Chitrasethu</h2>
      <button onClick={onRegister}>Get Started</button>
    </section>
  );
}

export default Hero;