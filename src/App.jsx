import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RequestList from './components/RequestList';
import Profile from './components/Profile';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';
import RequirementPanel from './components/RequirementPanel';
import PhotographerProfile from './components/PhotographerProfile';
import MessagingPanel from './components/MessagingPanel';
import PhotographerDashboard from './components/PhotographerDashboard';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Smith', role: 'photographer', googleRating: 4.5, appRating: 4.7, media: ['photo1.jpg', 'video1.mp4'], profilePhoto: 'https://via.placeholder.com/150', profileText: 'Professional photographer' },
    { id: 2, name: 'Mike Johnson', role: 'photographer', googleRating: 4.2, appRating: 4.4, media: ['photo2.jpg', 'video2.mp4'], profilePhoto: 'https://via.placeholder.com/150', profileText: 'Event specialist' },
    { id: 3, name: 'John Doe', role: 'customer' },
    { id: 4, name: 'Nickel Brown', role: 'customer' },
  ]);
  const [posts, setPosts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState(currentUser ? 'home' : 'login');
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [isMessagingOpen, setIsMessagingOpen] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (user) => {
    const updatedUser = { ...user, profilePhoto: user.profilePhoto || 'https://via.placeholder.com/150', profileText: user.profileText || 'Tell us about yourself...' };
    setCurrentUser(updatedUser);
    setUsers(prev => [...prev.filter(u => u.id !== user.id), updatedUser]);
    setView('home');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setView('login');
    setSelectedPhotographer(null);
  };

  const handleNewRequest = (request) => {
    setRequests([...requests, { id: Date.now(), ...request, userId: currentUser.id, status: 'open' }]);
  };

  const handleNewQuote = (requestId, quote) => {
    if (quote.amount <= 0) return;
    setQuotes(prev => ({
      ...prev,
      [requestId]: {
        ...(prev[requestId] || {}),
        [currentUser.id]: quote,
      },
    }));
    const customer = users.find(u => u.id === requests.find(r => r.id === requestId)?.userId);
    if (customer) {
      setPosts(prev => [
        ...prev,
        {
          id: Date.now(),
          userId: currentUser.id,
          content: `${currentUser.name} submitted a quote for your request (ID: ${requestId})!`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const handlePhotographerSelect = (photographerId) => {
    const photographer = users.find(u => u.id === photographerId && u.role === 'photographer');
    setSelectedPhotographer(photographer);
    setView('photographer-profile');
  };

  const handleBack = () => {
    setView('home');
    setSelectedPhotographer(null);
  };

  const handleMessagingToggle = (photographerId = null) => {
    setIsMessagingOpen(!isMessagingOpen);
    if (photographerId && !isMessagingOpen) {
      setSelectedPhotographer(users.find(u => u.id === photographerId));
    }
  };

  const handleViewPhotographerProfile = (photographerId) => {
    const photographer = users.find(u => u.id === photographerId && u.role === 'photographer');
    setSelectedPhotographer(photographer);
    setView('photographer-profile');
    setIsMessagingOpen(false);
  };

  const handleUpdateProfile = (profileData) => {
    setCurrentUser(prev => ({ ...prev, ...profileData }));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...profileData } : u));
  };

  const handleUploadPhoto = (media) => {
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, media: [...(u.media || []), media.url] } : u));
    setPosts(prev => [
      ...prev,
      {
        id: Date.now(),
        userId: currentUser.id,
        content: `${currentUser.name} uploaded a new ${media.type}!`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const filteredPhotographers = users.filter(user =>
    user.role === 'photographer' && user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-column">
      <Header
        setView={setView}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onMessagingToggle={handleMessagingToggle}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="container">
        {view === 'login' ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            {currentUser?.role === 'photographer' && (
              <Sidebar user={currentUser} requests={requests} quotes={quotes} onNewQuote={handleNewQuote} />
            )}
            {currentUser?.role === 'customer' && (
              view === 'photographer-profile' || isMessagingOpen ? null : (
                <CustomerDashboard
                  users={filteredPhotographers}
                  currentUser={currentUser}
                  onPhotographerSelect={handlePhotographerSelect}
                />
              )
            )}
            <main>
              {view === 'home' && (
                <>
                  {currentUser?.role === 'photographer' ? (
                    <PhotographerDashboard
                      currentUser={currentUser}
                      onUpdateProfile={handleUpdateProfile}
                    />
                  ) : currentUser?.role === 'customer' ? (
                    <Feed posts={posts} users={users} currentUser={currentUser} />
                  ) : (
                    <>
                      <Hero />
                      <Feed posts={posts} users={users} currentUser={currentUser} />
                    </>
                  )}
                </>
              )}
              {view === 'requests' && <RequestList requests={requests} users={users} currentUser={currentUser} />}
              {view === 'profile' && <Profile user={currentUser} onUpdateProfile={handleUpdateProfile} onUploadPhoto={handleUploadPhoto} />}
              {(view === 'photographer-profile' && selectedPhotographer) && (
                <PhotographerProfile photographer={selectedPhotographer} onBack={handleBack} onMessage={() => handleMessagingToggle(selectedPhotographer?.id)} />
              )}
              {isMessagingOpen && (
                <MessagingPanel users={users} currentUser={currentUser} onClose={handleMessagingToggle} onViewProfile={handleViewPhotographerProfile} selectedPhotographerId={selectedPhotographer?.id} />
              )}
            </main>
            {currentUser?.role === 'customer' && !isMessagingOpen && view !== 'photographer-profile' && (
              <RequirementPanel onNewRequest={handleNewRequest} />
            )}
          </>
        )}
      </div>
      {view !== 'login' && <Footer />}
    </div>
  );
}

export default App;