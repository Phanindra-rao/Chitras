import React, { useState, useEffect } from 'react';
import './MemoryTimeline.css';

function MemoryTimeline({ bookings, memories, currentUser }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, memories

  // Generate years from first booking to current year
  const years = () => {
    const currentYear = new Date().getFullYear();
    const firstYear = bookings.length > 0 
      ? new Date(bookings[0].date).getFullYear() 
      : currentYear - 2;
    return Array.from({ length: currentYear - firstYear + 1 }, (_, i) => currentYear - i);
  };

  // Group memories by year and month
  const groupedMemories = () => {
    const grouped = {};
    
    // Add bookings
    bookings.forEach(booking => {
      const date = new Date(booking.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][month]) grouped[year][month] = [];
      
      grouped[year][month].push({
        ...booking,
        type: 'booking',
        date: date
      });
    });

    // Add memories
    memories.forEach(memory => {
      const date = new Date(memory.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][month]) grouped[year][month] = [];
      
      grouped[year][month].push({
        ...memory,
        type: 'memory',
        date: date
      });
    });

    return grouped;
  };

  const getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  };

  const getMemoryIcon = (type) => {
    switch (type) {
      case 'booking': return '📅';
      case 'memory': return '💭';
      case 'anniversary': return '🎉';
      case 'repeat': return '🔄';
      default: return '📸';
    }
  };

  const getMemoryColor = (type) => {
    switch (type) {
      case 'booking': return '#1e40af';
      case 'memory': return '#059669';
      case 'anniversary': return '#dc2626';
      case 'repeat': return '#7c3aed';
      default: return '#6b7280';
    }
  };

  const renderTimelineView = () => {
    const grouped = groupedMemories();
    const yearData = grouped[selectedYear] || {};

    return (
      <div className="timeline-view">
        {Object.keys(yearData).length > 0 ? (
          Object.keys(yearData).sort((a, b) => parseInt(b) - parseInt(a)).map(monthIndex => {
            const monthMemories = yearData[monthIndex];
            const monthName = getMonthName(parseInt(monthIndex));
            
            return (
              <div key={monthIndex} className="timeline-month">
                <h3 className="month-header">{monthName}</h3>
                <div className="month-memories">
                  {monthMemories
                    .sort((a, b) => b.date - a.date)
                    .map((memory, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker" style={{ backgroundColor: getMemoryColor(memory.type) }}>
                          {getMemoryIcon(memory.type)}
                        </div>
                        <div className="timeline-content">
                          <div className="memory-header">
                            <h4>{memory.title || `${memory.type} on ${memory.date.toLocaleDateString()}`}</h4>
                            <span className="memory-date">{memory.date.toLocaleDateString()}</span>
                          </div>
                          {memory.description && (
                            <p className="memory-description">{memory.description}</p>
                          )}
                          {memory.photos && memory.photos.length > 0 && (
                            <div className="memory-photos">
                              {memory.photos.slice(0, 3).map((photo, photoIndex) => (
                                <img 
                                  key={photoIndex} 
                                  src={photo} 
                                  alt={`Memory ${photoIndex + 1}`}
                                  className="memory-photo"
                                />
                              ))}
                              {memory.photos.length > 3 && (
                                <div className="more-photos">+{memory.photos.length - 3}</div>
                              )}
                            </div>
                          )}
                          {memory.type === 'booking' && (
                            <div className="booking-details">
                              <span className="booking-status">{memory.status}</span>
                              <span className="booking-photographer">{memory.photographer}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-memories">
            <p>No memories for {selectedYear}</p>
            <button onClick={() => setSelectedYear(new Date().getFullYear())} className="current-year-btn">
              View Current Year
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderCalendarView = () => {
    return (
      <div className="calendar-view">
        <div className="calendar-header">
          <button onClick={() => setSelectedYear(selectedYear - 1)} className="year-nav-btn">←</button>
          <h3>{selectedYear}</h3>
          <button onClick={() => setSelectedYear(selectedYear + 1)} className="year-nav-btn">→</button>
        </div>
        <div className="calendar-grid">
          {Array.from({ length: 12 }, (_, monthIndex) => {
            const monthName = getMonthName(monthIndex);
            const monthMemories = groupedMemories()[selectedYear]?.[monthIndex] || [];
            
            return (
              <div key={monthIndex} className="calendar-month">
                <h4>{monthName}</h4>
                <div className="month-indicators">
                  {monthMemories.map((memory, index) => (
                    <div 
                      key={index}
                      className="memory-indicator"
                      style={{ backgroundColor: getMemoryColor(memory.type) }}
                      title={`${memory.title || memory.type} - ${memory.date.toLocaleDateString()}`}
                    >
                      {getMemoryIcon(memory.type)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="memory-timeline">
      <div className="timeline-header">
        <h2>Memory Timeline</h2>
        <p>Relive your special moments and events</p>
      </div>

      <div className="timeline-controls">
        <div className="view-mode-tabs">
          <button 
            onClick={() => setViewMode('timeline')}
            className={`view-tab ${viewMode === 'timeline' ? 'active' : ''}`}
          >
            📅 Timeline
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`view-tab ${viewMode === 'calendar' ? 'active' : ''}`}
          >
            📊 Calendar
          </button>
          <button 
            onClick={() => setViewMode('memories')}
            className={`view-tab ${viewMode === 'memories' ? 'active' : ''}`}
          >
            💭 Memories
          </button>
        </div>

        <div className="year-selector">
          <label>Year:</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-select"
          >
            {years().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="timeline-content">
        {viewMode === 'timeline' && renderTimelineView()}
        {viewMode === 'calendar' && renderCalendarView()}
        {viewMode === 'memories' && (
          <div className="memories-view">
            <div className="memories-grid">
              {memories
                .filter(memory => new Date(memory.date).getFullYear() === selectedYear)
                .map((memory, index) => (
                  <div key={index} className="memory-card">
                    <div className="memory-card-header">
                      <span className="memory-icon">{getMemoryIcon(memory.type)}</span>
                      <span className="memory-date">{new Date(memory.date).toLocaleDateString()}</span>
                    </div>
                    <h4>{memory.title}</h4>
                    <p>{memory.description}</p>
                    {memory.photos && memory.photos.length > 0 && (
                      <img src={memory.photos[0]} alt="Memory" className="memory-card-photo" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="timeline-stats">
        <div className="stat-item">
          <span className="stat-number">{bookings.length}</span>
          <span className="stat-label">Total Bookings</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{memories.length}</span>
          <span className="stat-label">Memories Created</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{years().length}</span>
          <span className="stat-label">Years Active</span>
        </div>
      </div>
    </div>
  );
}

export default MemoryTimeline;


