import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Feed from './components/Feed/Feed';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import PhotographerDashboard from './components/PhotographerDashboard/PhotographerDashboard';
import PhotographerProfile from './components/PhotographerProfile/PhotographerProfile';
import RequirementPanel from './components/RequirementPanel/RequirementPanel';
import MessagingPanel from './components/MessagingPanel/MessagingPanel';
import ContactButton from './components/ContactButton/ContactButton';
import Post from './components/Post/Post';
import RequestForm from './components/RequestForm/RequestForm';
import RequestList from './components/RequestList/RequestList';
import Moodboard from './components/Moodboard/Moodboard';
import ExploreFeed from './components/ExploreFeed/ExploreFeed';
import MemoryTimeline from './components/MemoryTimeline/MemoryTimeline';
import PhotographerDiscovery from './components/PhotographerDiscovery/PhotographerDiscovery';
import CommunityBuzz from './components/CommunityBuzz/CommunityBuzz';

function App() {
  const [view, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      location: 'Mumbai, Maharashtra',
      googleRating: 4.8,
      appRating: 4.9,
      profileText: 'Passionate photographer with 5+ years of experience specializing in wedding photography.',
      specialties: ['Wedding Photography', 'Portrait Sessions', 'Event Coverage'],
      media: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
        'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=400',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'photographer',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      location: 'Delhi, NCR',
      googleRating: 4.9,
      appRating: 4.8,
      profileText: 'Professional photographer specializing in fashion and editorial photography.',
      specialties: ['Fashion Photography', 'Editorial', 'Portrait Sessions'],
      media: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'photographer',
      profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      location: 'Bangalore, Karnataka',
      googleRating: 4.7,
      appRating: 4.6,
      profileText: 'Real estate photographer with expertise in architectural and interior photography.',
      specialties: ['Real Estate', 'Architectural', 'Interior Photography'],
      media: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
        'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400'
      ]
    }
  ]);

  const [posts] = useState([
    {
      id: 1,
      userId: 1,
      content: 'Just completed an amazing wedding shoot! The couple was absolutely perfect.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      userId: 2,
      content: 'Fashion photography session with the latest trends. Love how these turned out!',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      likes: 31,
      comments: 12,
      timestamp: '5 hours ago'
    }
  ]);

  const [moodboards] = useState([
    {
      id: 1,
      userId: 1,
      name: 'Wedding Inspiration',
      items: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200'
      ]
    }
  ]);

  const [memories] = useState([
    {
      id: 1,
      userId: 1,
      title: 'First Wedding Shoot',
      date: '2023-12-15',
      images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=200'],
      description: 'My first professional wedding photography assignment.'
    }
  ]);

  const [bookings] = useState([
    {
      id: 1,
      photographerId: 1,
      customerId: 2,
      date: '2024-01-15',
      eventType: 'Wedding',
      status: 'confirmed'
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Wedding Photography Masterclass',
      date: 'Dec 15, 2024 • 2:00 PM',
      location: 'Mumbai, Maharashtra',
      description: 'Learn the art of wedding photography from industry experts',
      price: '₹2,500',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      badge: 'Workshop'
    },
    {
      id: 2,
      title: 'Professional Portrait Session',
      date: 'Dec 20, 2024 • 10:00 AM',
      location: 'Delhi, NCR',
      description: 'Get stunning professional portraits for your portfolio',
      price: '₹1,800',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      badge: 'Photo Shoot'
    },
    {
      id: 3,
      title: 'Corporate Event Coverage',
      date: 'Dec 25, 2024 • 6:00 PM',
      location: 'Bangalore, Karnataka',
      description: 'Professional event photography for corporate functions',
      price: '₹3,200',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      badge: 'Event'
    },
    {
      id: 4,
      title: 'Fashion Photography Workshop',
      date: 'Jan 5, 2025 • 11:00 AM',
      location: 'Mumbai, Maharashtra',
      description: 'Master fashion photography techniques and styling',
      price: '₹3,500',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
      badge: 'Fashion'
    },
    {
      id: 5,
      title: 'Product Photography Masterclass',
      date: 'Jan 10, 2025 • 3:00 PM',
      location: 'Chennai, Tamil Nadu',
      description: 'Learn commercial product photography techniques',
      price: '₹2,800',
      image: 'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=400',
      badge: 'Commercial'
    }
  ]);

  // Auto-advance slideshow
  useEffect(() => {
    if (currentUser?.role === 'customer') {
      const interval = setInterval(() => {
        setCurrentEventSlide((prev) => (prev + 1) % upcomingEvents.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [currentUser, upcomingEvents.length]);

  const nextSlide = () => {
    setCurrentEventSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  const prevSlide = () => {
    setCurrentEventSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const goToSlide = (index) => {
    setCurrentEventSlide(index);
  };

  const handleLogin = (email, password) => {
    console.log('Login attempt:', { email });
    console.log('Available users:', users.map(u => ({ email: u.email, name: u.name })));
    
    const user = users.find(u => u.email === email);
    if (user) {
      console.log('Login successful:', user.name);
      console.log('User role:', user.role);
      setCurrentUser(user);
      setView('home');
      console.log('View set to home, currentUser set to:', user);
    } else {
      console.log('Login failed: User not found');
      alert('User not found. Please try with a valid email.');
    }
  };

  const handleRegister = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      role: 'customer',
      profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      location: 'Mumbai, Maharashtra',
      googleRating: 4.5,
      appRating: 4.5,
      profileText: 'New photographer on the platform.',
      specialties: ['General Photography'],
      media: []
    };
    setCurrentUser(newUser);
    setView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  const handleSaveMoodboard = (moodboardData) => {
    console.log('Saving moodboard:', moodboardData);
    // Here you would typically save to backend
  };

  const handlePhotographerClick = (photographer) => {
    setSelectedPhotographer(photographer);
    setView('photographer-profile');
  };

  const handleBackToHome = () => {
    setSelectedPhotographer(null);
    setView('home');
  };

  const handleMessage = (photographerId) => {
    console.log('Opening message panel for photographer:', photographerId);
    // Here you would typically open a messaging interface
  };

  const handleNavigation = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      {console.log('Rendering App with:', { currentUser, view })}
      <Header 
        currentUser={currentUser} 
        onSignOut={handleLogout}
        setView={setView}
        view={view}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="main-content">
        {view === 'home' && (
          <>
            {!currentUser ? (
              <Hero onLogin={() => setView('login')} onRegister={() => setView('login')} />
            ) : currentUser?.role === 'customer' ? (
              <>
                <div className="upcoming-events-section">
                  <div className="events-header">
                    <h2>🎉 Upcoming Events</h2>
                    <p>Discover amazing photography events and workshops</p>
                  </div>
                  
                  <div className="events-carousel">
                    <div className="carousel-container">
                      <div 
                        className="carousel-track"
                        style={{
                          transform: `translateX(-${currentEventSlide * 100}%)`,
                          transition: 'transform 0.6s ease-in-out'
                        }}
                      >
                        {upcomingEvents.map((event, index) => (
                          <div key={event.id} className="carousel-slide">
                            <div className="event-card">
                              <div className="event-image">
                                <img src={event.image} alt={event.title} />
                                <div className="event-badge">{event.badge}</div>
                              </div>
                              <div className="event-content">
                                <h3>{event.title}</h3>
                                <p className="event-date">📅 {event.date}</p>
                                <p className="event-location">📍 {event.location}</p>
                                <p className="event-description">{event.description}</p>
                                <div className="event-price">{event.price}</div>
                                <button className="book-event-btn">Book Now</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button className="carousel-btn prev-btn" onClick={prevSlide}>
                        <span>‹</span>
                      </button>
                      <button className="carousel-btn next-btn" onClick={nextSlide}>
                        <span>›</span>
                      </button>
                    </div>
                    
                    <div className="carousel-indicators">
                      {upcomingEvents.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${index === currentEventSlide ? 'active' : ''}`}
                          onClick={() => goToSlide(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="customer-layout">
                  {console.log('Rendering customer layout')}
                  <div className="left-sidebar">
                    <PhotographerDiscovery 
                      photographers={users.filter(u => u.role === 'photographer')}
                      onPhotographerSelect={handlePhotographerClick}
                      currentUser={currentUser}
                    />
                  </div>
                  <div className="center-content">
                    <Feed posts={posts} users={users} />
                  </div>
                  <div className="right-sidebar">
                    <RequirementPanel />
                  </div>
                </div>
              </>
            ) : (
              <PhotographerDashboard user={currentUser} />
            )}
          </>
        )}
        
        {view === 'login' && (
          <Login onLogin={handleLogin} onRegister={handleRegister} />
        )}
        
        {view === 'profile' && currentUser && (
          <Profile user={currentUser} />
        )}
        
        {view === 'photographer-profile' && selectedPhotographer && (
          <PhotographerProfile 
            photographer={selectedPhotographer}
            onBack={handleBackToHome}
            onMessage={handleMessage}
          />
        )}
        
        {view === 'moodboard' && (
          <Moodboard onSave={handleSaveMoodboard} />
        )}
        
        {view === 'explore' && (
          <ExploreFeed />
        )}
        
        {view === 'timeline' && (
          <MemoryTimeline />
        )}
        
        {view === 'community-buzz' && (
          <CommunityBuzz currentUser={currentUser} />
        )}
      </main>
      
      <Footer />
      <ContactButton />
    </div>
  );
}

export default App;