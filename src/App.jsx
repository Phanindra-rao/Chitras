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
import EventPhotos from './components/EventPhotos/EventPhotos';
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

  // Enhanced moodboard data with all requested features
  const [curatedCollections] = useState([
    {
      id: 'wedding-inspirations',
      name: 'Wedding Inspirations 💍',
      description: 'Dreamy wedding photography and styling ideas',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      followers: 1247,
      items: [
        {
          id: 1,
          type: 'photographer',
          data: {
            id: 1,
            name: 'John Doe',
            specialty: 'Wedding Photography',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            price: '₹15,000'
          }
        },
        {
          id: 2,
          type: 'event',
          data: {
            id: 1,
            title: 'Wedding Photography Masterclass',
            date: 'Dec 15, 2024',
            price: '₹2,500',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200'
          }
        },
        {
          id: 3,
          type: 'inspiration',
          data: {
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200',
            caption: 'Romantic garden wedding setup'
          }
        }
      ]
    },
    {
      id: 'festival-vibes',
      name: 'Festival Vibes 🎉',
      description: 'Vibrant festival and celebration photography',
      coverImage: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
      followers: 892,
      items: [
        {
          id: 4,
          type: 'photographer',
          data: {
            id: 2,
            name: 'Jane Smith',
            specialty: 'Event Photography',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            price: '₹12,000'
          }
        },
        {
          id: 5,
          type: 'inspiration',
          data: {
            image: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=200',
            caption: 'Colorful festival decorations'
          }
        }
      ]
    },
    {
      id: 'fashion-glamour',
      name: 'Fashion & Glamour 👗',
      description: 'Stylish fashion photography and modeling',
      coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      followers: 1563,
      items: [
        {
          id: 6,
          type: 'photographer',
          data: {
            id: 2,
            name: 'Jane Smith',
            specialty: 'Fashion Photography',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            price: '₹18,000'
          }
        },
        {
          id: 7,
          type: 'inspiration',
          data: {
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200',
            caption: 'Elegant fashion shoot setup'
          }
        }
      ]
    },
    {
      id: 'travel-nature',
      name: 'Travel & Nature 🌍',
      description: 'Breathtaking travel and nature photography',
      coverImage: 'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=400',
      followers: 2034,
      items: [
        {
          id: 8,
          type: 'photographer',
          data: {
            id: 3,
            name: 'Mike Johnson',
            specialty: 'Nature Photography',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            price: '₹10,000'
          }
        },
        {
          id: 9,
          type: 'inspiration',
          data: {
            image: 'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=200',
            caption: 'Scenic mountain landscape'
          }
        }
      ]
    }
  ]);

  const [userMoodboards] = useState([
    {
      id: 1,
      userId: 2,
      name: 'My Dream Wedding Board',
      description: 'Planning my perfect wedding day',
      isPublic: true,
      followers: 45,
      items: [
        {
          id: 1,
          type: 'photographer',
          data: {
            id: 1,
            name: 'John Doe',
            specialty: 'Wedding Photography',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            price: '₹15,000'
          }
        },
        {
          id: 2,
          type: 'inspiration',
          data: {
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
            caption: 'Dream wedding venue'
          }
        }
      ]
    },
    {
      id: 2,
      userId: 3,
      name: 'Fashion Portfolio Ideas',
      description: 'Creative fashion photography concepts',
      isPublic: true,
      followers: 123,
      items: [
        {
          id: 3,
          type: 'photographer',
          data: {
            id: 2,
            name: 'Jane Smith',
            specialty: 'Fashion Photography',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            price: '₹18,000'
          }
        }
      ]
    }
  ]);

  const [trendingMoodboards] = useState([
    {
      id: 1,
      name: 'Top 10 Trending Wedding Themes in Hyderabad',
      creator: 'WeddingPlanner Pro',
      followers: 2341,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      items: 15
    },
    {
      id: 2,
      name: 'Corporate Event Photography Trends 2024',
      creator: 'EventMaster',
      followers: 1892,
      coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      items: 23
    }
  ]);

  const [aiRecommendations] = useState([
    {
      id: 1,
      type: 'photographer',
      reason: 'Based on your wedding board',
      data: {
        id: 1,
        name: 'John Doe',
        specialty: 'Wedding Photography',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        price: '₹15,000'
      }
    },
    {
      id: 2,
      type: 'event',
      reason: 'Matches your style preferences',
      data: {
        id: 1,
        title: 'Wedding Photography Masterclass',
        date: 'Dec 15, 2024',
        price: '₹2,500',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200'
      }
    }
  ]);

  const [collaborationPosts] = useState([
    {
      id: 1,
      photographerId: 1,
      photographerName: 'John Doe',
      photographerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      customerId: 2,
      customerName: 'Sarah Wilson',
      customerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      eventType: 'Wedding',
      title: 'Dream Wedding at Taj Palace',
      content: 'Amazing collaboration with Sarah for her dream wedding! The golden hour shots turned out absolutely magical ✨',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
          caption: 'Golden hour ceremony'
        },
        {
          type: 'image', 
          url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
          caption: 'Romantic couple portraits'
        },
        {
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          caption: 'Wedding highlights reel'
        }
      ],
      likes: 89,
      comments: 23,
      timestamp: '2 hours ago',
      tags: ['wedding', 'golden hour', 'romantic', 'dream wedding']
    },
    {
      id: 2,
      photographerId: 2,
      photographerName: 'Jane Smith',
      photographerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      customerId: 3,
      customerName: 'Mike Johnson',
      customerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      eventType: 'Fashion Shoot',
      title: 'Corporate Headshots Session',
      content: 'Professional headshots for Mike\'s corporate portfolio. Clean, modern, and impactful!',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          caption: 'Professional headshot'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          caption: 'Corporate style portrait'
        }
      ],
      likes: 45,
      comments: 12,
      timestamp: '5 hours ago',
      tags: ['corporate', 'headshots', 'professional', 'portrait']
    },
    {
      id: 3,
      photographerId: 3,
      photographerName: 'Mike Johnson',
      photographerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      customerId: 1,
      customerName: 'John Doe',
      customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      eventType: 'Real Estate',
      title: 'Luxury Villa Photography',
      content: 'Stunning architectural photography for John\'s luxury villa listing. Every angle tells a story!',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
          caption: 'Modern villa exterior'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400',
          caption: 'Elegant interior design'
        },
        {
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
          caption: 'Property walkthrough'
        }
      ],
      likes: 67,
      comments: 18,
      timestamp: '1 day ago',
      tags: ['real estate', 'architecture', 'luxury', 'interior design']
    },
    {
      id: 4,
      photographerId: 1,
      photographerName: 'John Doe',
      photographerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      customerId: 4,
      customerName: 'Emma Davis',
      customerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      eventType: 'Birthday Party',
      title: 'Sweet 16 Birthday Celebration',
      content: 'Captured Emma\'s magical Sweet 16 celebration! The decorations and candid moments were perfect 🎉',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
          caption: 'Birthday cake moment'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
          caption: 'Party decorations'
        },
        {
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
          caption: 'Birthday highlights'
        }
      ],
      likes: 123,
      comments: 34,
      timestamp: '3 days ago',
      tags: ['birthday', 'celebration', 'candid', 'party']
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
                    <div className="collaboration-feed-section">
                      <div className="section-header">
                        <h2>🤝 Photographer Collaborations</h2>
                        <p>See amazing collaborations between photographers and customers</p>
                      </div>
                      <div className="collaboration-feed">
                        {collaborationPosts.map(post => (
                          <div key={post.id} className="collaboration-post">
                            <div className="post-header">
                              <div className="collaboration-info">
                                <div className="photographer-info">
                                  <img src={post.photographerImage} alt={post.photographerName} className="profile-img" />
                                  <span className="photographer-name">{post.photographerName}</span>
                                </div>
                                <div className="collaboration-icon">🤝</div>
                                <div className="customer-info">
                                  <img src={post.customerImage} alt={post.customerName} className="profile-img" />
                                  <span className="customer-name">{post.customerName}</span>
                                </div>
                              </div>
                              <div className="post-meta">
                                <span className="event-type">{post.eventType}</span>
                                <span className="timestamp">{post.timestamp}</span>
                              </div>
                            </div>
                            
                            <div className="post-content">
                              <h3 className="post-title">{post.title}</h3>
                              <p className="post-description">{post.content}</p>
                            </div>
                            
                            <div className="post-media">
                              {post.media.map((media, index) => (
                                <div key={index} className="media-item">
                                  {media.type === 'image' ? (
                                    <img src={media.url} alt={media.caption} />
                                  ) : (
                                    <video controls>
                                      <source src={media.url} type="video/mp4" />
                                      Your browser does not support the video tag.
                                    </video>
                                  )}
                                  <p className="media-caption">{media.caption}</p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="post-tags">
                              {post.tags.map((tag, index) => (
                                <span key={index} className="tag">#{tag}</span>
                              ))}
                            </div>
                            
                            <div className="post-engagement">
                              <span className="likes">❤️ {post.likes}</span>
                              <span className="comments">💬 {post.comments}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
          <Moodboard 
            onSave={handleSaveMoodboard}
            curatedCollections={curatedCollections}
            userMoodboards={userMoodboards}
            trendingMoodboards={trendingMoodboards}
            aiRecommendations={aiRecommendations}
            collaborationPosts={collaborationPosts}
            currentUser={currentUser}
            photographers={users.filter(u => u.role === 'photographer')}
            upcomingEvents={upcomingEvents}
            onPhotographerSelect={handlePhotographerClick}
          />
        )}
        
        {view === 'explore' && (
          <ExploreFeed />
        )}
        
        {view === 'event-photos' && (
          <EventPhotos 
            currentUser={currentUser}
            photographers={users.filter(u => u.role === 'photographer')}
            onPhotographerSelect={handlePhotographerClick}
            onSaveToMoodboard={handleSaveMoodboard}
          />
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