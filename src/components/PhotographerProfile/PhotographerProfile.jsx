import { useState } from 'react';
import './PhotographerProfile.css';
import BookingSystem from '../BookingSystem/BookingSystem';

function PhotographerProfile({ photographer, onBack, onMessage }) {
  const [isCalling, setIsCalling] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [showBooking, setShowBooking] = useState(false);
  const [activePortfolioFilter, setActivePortfolioFilter] = useState('all');

  const handleCall = () => {
    setIsCalling(true);
    setTimeout(() => setIsCalling(false), 2000);
    alert(`Calling ${photographer.name}...`);
  };

  const handleBookingConfirm = (booking) => {
    console.log('Booking confirmed:', booking);
    alert(`Booking confirmed with ${photographer.name} for ${booking.date.toLocaleDateString()}`);
    setShowBooking(false);
    // Here you would typically send the booking to your backend
  };

  const handleBookNow = () => {
    console.log('Book Now button clicked!');
    console.log('Photographer:', photographer);
    setShowBooking(true);
  };

  const posts = photographer.media?.filter(item => item.endsWith('.jpg')) || [];
  const videos = photographer.media?.filter(item => item.endsWith('.mp4')) || [];

  const reviews = [
    { 
      id: 1, 
      user: 'Priya Sharma', 
      rating: 4.8, 
      comment: 'Absolutely amazing work! Captured our wedding perfectly. The attention to detail and creativity exceeded our expectations. Highly recommend!',
      date: '2024-12-10',
      event: 'Wedding'
    },
    { 
      id: 2, 
      user: 'Rahul Mehta', 
      rating: 4.9, 
      comment: 'Professional, punctual, and incredibly talented. The photos from our corporate event were stunning. Will definitely book again!',
      date: '2024-12-05',
      event: 'Corporate Event'
    },
    { 
      id: 3, 
      user: 'Anjali Patel', 
      rating: 4.7, 
      comment: 'Made our birthday celebration so special with beautiful candid shots. The editing style is unique and modern. Love the results!',
      date: '2024-11-28',
      event: 'Birthday Party'
    }
  ];

  const achievements = [
    { title: 'Best Wedding Photographer 2023', organization: 'Wedding Awards India' },
    { title: 'Excellence in Portrait Photography', organization: 'Photography Society' },
    { title: '5+ Years Experience', organization: 'Professional Photographer' },
    { title: '500+ Happy Clients', organization: 'Customer Satisfaction' }
  ];

  const services = [
    { name: 'Wedding Photography', icon: '💒', description: 'Complete wedding coverage from pre-wedding to reception' },
    { name: 'Portrait Sessions', icon: '📸', description: 'Professional portraits for individuals and families' },
    { name: 'Event Coverage', icon: '🎉', description: 'Corporate events, parties, and special occasions' },
    { name: 'Fashion Photography', icon: '👗', description: 'Fashion shoots and model portfolios' }
  ];

  // Professional Portfolio Categories
  const portfolioCategories = [
    { id: 'all', name: 'All Work', icon: '📷' },
    { id: 'fashion', name: 'Fashion Brands', icon: '👗' },
    { id: 'realestate', name: 'Real Estate', icon: '🏠' },
    { id: 'product', name: 'Product Shoots', icon: '📦' },
    { id: 'corporate', name: 'Corporate', icon: '💼' },
    { id: 'wedding', name: 'Weddings', icon: '💒' },
    { id: 'portrait', name: 'Portraits', icon: '👤' }
  ];

  const portfolioItems = [
    // Fashion Brands
    {
      id: 1,
      category: 'fashion',
      title: 'Luxury Fashion Campaign',
      description: 'High-end fashion photography for leading brands',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      client: 'Vogue India',
      year: '2024',
      features: ['Studio Lighting', 'Professional Models', 'Brand Styling']
    },
    {
      id: 2,
      category: 'fashion',
      title: 'Street Style Editorial',
      description: 'Contemporary street fashion photography',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      client: 'Elle Magazine',
      year: '2024',
      features: ['Natural Lighting', 'Urban Setting', 'Trendy Styling']
    },
    {
      id: 3,
      category: 'fashion',
      title: 'Accessories Collection',
      description: 'Product photography for luxury accessories',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400',
      client: 'Designer Brands',
      year: '2023',
      features: ['Macro Photography', 'Studio Setup', 'Luxury Styling']
    },
    // Real Estate
    {
      id: 4,
      category: 'realestate',
      title: 'Luxury Villa Photography',
      description: 'Architectural photography for premium properties',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      client: 'Luxury Real Estate',
      year: '2024',
      features: ['Wide Angle', 'Natural Light', 'Interior Design']
    },
    {
      id: 5,
      category: 'realestate',
      title: 'Commercial Property',
      description: 'Professional real estate marketing photography',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      client: 'Commercial Developers',
      year: '2024',
      features: ['Aerial Shots', 'HDR Photography', 'Marketing Ready']
    },
    {
      id: 6,
      category: 'realestate',
      title: 'Interior Design',
      description: 'Interior photography showcasing design excellence',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      client: 'Interior Designers',
      year: '2023',
      features: ['Interior Lighting', 'Design Focus', 'Lifestyle Shots']
    },
    // Product Shoots
    {
      id: 7,
      category: 'product',
      title: 'Electronics Product Line',
      description: 'Professional product photography for tech brands',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6a332d66b5?w=400',
      client: 'Tech Brands',
      year: '2024',
      features: ['Product Focus', 'Clean Background', 'Detail Shots']
    },
    {
      id: 8,
      category: 'product',
      title: 'Food & Beverage',
      description: 'Appetizing food photography for restaurants',
      image: 'https://images.unsplash.com/photo-1504674900240-9d8838d6d7c0?w=400',
      client: 'Restaurant Chains',
      year: '2024',
      features: ['Food Styling', 'Natural Lighting', 'Appetizing Angles']
    },
    {
      id: 9,
      category: 'product',
      title: 'Fashion Accessories',
      description: 'Luxury accessories and jewelry photography',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      client: 'Luxury Brands',
      year: '2023',
      features: ['Macro Details', 'Luxury Styling', 'Brand Consistency']
    },
    // Corporate
    {
      id: 10,
      category: 'corporate',
      title: 'Executive Portraits',
      description: 'Professional headshots for corporate leaders',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      client: 'Fortune 500 Companies',
      year: '2024',
      features: ['Professional Lighting', 'Corporate Style', 'Confident Poses']
    },
    {
      id: 11,
      category: 'corporate',
      title: 'Corporate Events',
      description: 'Event photography for business conferences',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
      client: 'Business Conferences',
      year: '2024',
      features: ['Event Coverage', 'Candid Shots', 'Professional Atmosphere']
    },
    {
      id: 12,
      category: 'corporate',
      title: 'Team Photography',
      description: 'Group photography for corporate teams',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      client: 'Corporate Teams',
      year: '2023',
      features: ['Group Dynamics', 'Professional Setting', 'Team Spirit']
    },
    // Weddings
    {
      id: 13,
      category: 'wedding',
      title: 'Traditional Wedding',
      description: 'Complete wedding day coverage',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      client: 'Private Clients',
      year: '2024',
      features: ['Full Day Coverage', 'Traditional Ceremony', 'Reception']
    },
    {
      id: 14,
      category: 'wedding',
      title: 'Destination Wedding',
      description: 'Exotic location wedding photography',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
      client: 'Destination Couples',
      year: '2024',
      features: ['Exotic Locations', 'Natural Beauty', 'Romantic Moments']
    },
    // Portraits
    {
      id: 15,
      category: 'portrait',
      title: 'Family Portraits',
      description: 'Beautiful family photography sessions',
      image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400',
      client: 'Families',
      year: '2024',
      features: ['Natural Poses', 'Family Bonding', 'Outdoor Setting']
    },
    {
      id: 16,
      category: 'portrait',
      title: 'Creative Portraits',
      description: 'Artistic and creative portrait photography',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      client: 'Artists & Models',
      year: '2023',
      features: ['Creative Lighting', 'Artistic Vision', 'Unique Style']
    }
  ];

  const filteredPortfolioItems = activePortfolioFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activePortfolioFilter);

  console.log('PhotographerProfile rendered, showBooking:', showBooking);

  return (
    <div className="photographer-profile">
      {showBooking ? (
        <BookingSystem
          photographer={photographer}
          onClose={() => setShowBooking(false)}
          onBookingConfirm={handleBookingConfirm}
        />
      ) : (
        <>
          <button className="back-button" onClick={onBack}>Back</button>
          
          {/* Hero Section */}
          <div className="profile-hero">
            <div className="hero-background"></div>
            <div className="hero-content">
              <div className="profile-avatar">
                <img src={photographer.profilePhoto} alt={photographer.name} />
                <div className="online-status"></div>
              </div>
              <div className="hero-info">
                <h1>{photographer.name}</h1>
                <p className="tagline">Professional Photographer & Visual Storyteller</p>
                <div className="location-info">
                  <span className="location-icon">📍</span>
                  <span>{photographer.location}</span>
                </div>
                <div className="ratings">
                  <div className="rating-item">
                    <span className="rating-label">Google</span>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < Math.floor(photographer.googleRating) ? 'filled' : ''}`}>★</span>
                      ))}
                    </div>
                    <span className="rating-value">{photographer.googleRating}</span>
                  </div>
                  <div className="rating-item">
                    <span className="rating-label">App</span>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < Math.floor(photographer.appRating) ? 'filled' : ''}`}>★</span>
                      ))}
                    </div>
                    <span className="rating-value">{photographer.appRating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            <button className="book-button" onClick={handleBookNow}>
              <span className="btn-icon">📅</span>
              Book Now
            </button>
            <button className="call-button" onClick={handleCall} disabled={isCalling}>
              <span className="btn-icon">📞</span>
              {isCalling ? 'Calling...' : 'Call'}
            </button>
            <button className="message-button" onClick={() => onMessage(photographer.id)}>
              <span className="btn-icon">💬</span>
              Message
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <span className="tab-icon">👤</span>
              About
            </button>
            <button
              className={`tab-button ${activeTab === 'portfolio' ? 'active' : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              <span className="tab-icon">📷</span>
              Portfolio
            </button>
            <button
              className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <span className="tab-icon">🎯</span>
              Services
            </button>
            <button
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <span className="tab-icon">⭐</span>
              Reviews
            </button>
          </div>

          {/* Content Sections */}
          <div className="profile-content">
            {activeTab === 'about' && (
              <div className="profile-section">
                <div className="about-grid">
                  <div className="about-card">
                    <h3>About Me</h3>
                    <p>{photographer.profileText}</p>
                    <p>With over 5 years of experience in professional photography, I specialize in capturing life's most precious moments. From intimate weddings to grand corporate events, I bring creativity, technical expertise, and a passion for storytelling to every shoot.</p>
                  </div>
                  
                  <div className="about-card">
                    <h3>Specialties</h3>
                    <div className="specialties">
                      {photographer.specialties?.map((specialty, index) => (
                        <span key={index} className="specialty-tag">{specialty}</span>
                      ))}
                    </div>
                  </div>

                  <div className="about-card">
                    <h3>Achievements</h3>
                    <div className="achievements-list">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="achievement-item">
                          <span className="achievement-icon">🏆</span>
                          <div className="achievement-details">
                            <span className="achievement-title">{achievement.title}</span>
                            <span className="achievement-org">{achievement.organization}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="about-card">
                    <h3>Equipment & Style</h3>
                    <div className="equipment-info">
                      <p><strong>Cameras:</strong> Canon EOS R5, Sony A7R IV</p>
                      <p><strong>Lenses:</strong> Professional L-series & G-Master collection</p>
                      <p><strong>Style:</strong> Documentary, Fine Art, Contemporary</p>
                      <p><strong>Editing:</strong> Professional color grading & retouching</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="profile-section">
                <div className="portfolio-header">
                  <h3>Professional Portfolio</h3>
                  <p>Showcasing excellence across fashion brands, real estate, product photography, and corporate portraits</p>
                </div>
                
                <div className="portfolio-filters">
                  {portfolioCategories.map(category => (
                    <button 
                      key={category.id}
                      className={`filter-btn ${activePortfolioFilter === category.id ? 'active' : ''}`}
                      onClick={() => setActivePortfolioFilter(category.id)}
                    >
                      <span className="filter-icon">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="portfolio-grid">
                  {filteredPortfolioItems.length > 0 ? (
                    filteredPortfolioItems.map(item => (
                      <div key={item.id} className="portfolio-item">
                        <div className="portfolio-image-container">
                          <img src={item.image} alt={item.title} className="portfolio-image" />
                          <div className="portfolio-overlay">
                            <div className="portfolio-details">
                              <h4>{item.title}</h4>
                              <p>{item.description}</p>
                              <div className="portfolio-meta">
                                <span className="client">{item.client}</span>
                                <span className="year">{item.year}</span>
                              </div>
                              <div className="portfolio-features">
                                {item.features.map((feature, index) => (
                                  <span key={index} className="feature-tag">{feature}</span>
                                ))}
                              </div>
                            </div>
                            <button className="view-project-btn">View Project</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-portfolio">
                      <div className="empty-icon">📷</div>
                      <h4>No Projects in This Category</h4>
                      <p>Check other categories for amazing work samples!</p>
                    </div>
                  )}
                </div>

                {videos.length > 0 && (
                  <div className="video-section">
                    <h4>Behind the Scenes</h4>
                    <div className="video-grid">
                      {videos.map((item, index) => (
                        <div key={index} className="video-item-container">
                          <video controls className="video-item">
                            <source src={item} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div className="video-caption">Behind the Scenes</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="profile-section">
                <div className="services-header">
                  <h3>Services & Packages</h3>
                  <p>Professional photography services tailored to your needs</p>
                </div>
                
                <div className="services-grid">
                  {services.map((service, index) => (
                    <div key={index} className="service-card">
                      <div className="service-icon">{service.icon}</div>
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                      <div className="service-features">
                        <span className="feature">Professional Equipment</span>
                        <span className="feature">High-Quality Editing</span>
                        <span className="feature">Quick Delivery</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pricing-section">
                  <h4>Starting Prices</h4>
                  <div className="pricing-cards">
                    <div className="pricing-card">
                      <h5>Wedding Package</h5>
                      <div className="price">₹25,000</div>
                      <p>Full day coverage with 500+ edited photos</p>
                    </div>
                    <div className="pricing-card">
                      <h5>Portrait Session</h5>
                      <div className="price">₹5,000</div>
                      <p>2-hour session with 50 edited photos</p>
                    </div>
                    <div className="pricing-card">
                      <h5>Event Coverage</h5>
                      <div className="price">₹8,000</div>
                      <p>4-hour coverage with 200 edited photos</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="profile-section">
                <div className="reviews-header">
                  <h3>Client Reviews</h3>
                  <div className="overall-rating">
                    <div className="rating-big">
                      <span className="rating-number">4.8</span>
                      <div className="stars-big">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < 4 ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p>Based on {reviews.length} reviews</p>
                  </div>
                </div>
                
                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="review-user-info">
                            <div className="user-avatar">{review.user.charAt(0)}</div>
                            <div className="user-details">
                              <span className="review-user">{review.user}</span>
                              <span className="review-event">{review.event}</span>
                            </div>
                          </div>
                          <div className="review-rating">
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`star ${i < Math.floor(review.rating) ? 'filled' : ''}`}>★</span>
                              ))}
                            </div>
                            <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="empty-reviews">
                      <div className="empty-icon">⭐</div>
                      <h4>No Reviews Yet</h4>
                      <p>Be the first to leave a review!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PhotographerProfile;