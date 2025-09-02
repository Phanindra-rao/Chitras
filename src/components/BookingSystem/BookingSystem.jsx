import React, { useState, useEffect } from 'react';
import './BookingSystem.css';

function BookingSystem({ photographer, onClose, onBookingConfirm }) {
  console.log('BookingSystem component rendered with photographer:', photographer);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState({
    startTime: '09:00',
    endTime: '12:00',
    hours: 3
  });
  const [bookingDetails, setBookingDetails] = useState({
    eventType: '',
    location: '',
    description: '',
    guestCount: '',
    budget: ''
  });

  // Generate next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (photographer's day off)
      if (date.getDay() !== 0) {
        dates.push({
          date: date,
          available: Math.random() > 0.3, // 70% chance of availability
          booked: Math.random() > 0.8 // 20% chance of being booked
        });
      }
    }
    
    return dates;
  };

  // Time slots
  const timeSlots = [
    { id: 'morning', label: 'Morning (9 AM - 12 PM)', start: '09:00', end: '12:00', price: 1500 },
    { id: 'afternoon', label: 'Afternoon (2 PM - 5 PM)', start: '14:00', end: '17:00', price: 1800 },
    { id: 'evening', label: 'Evening (6 PM - 9 PM)', start: '18:00', end: '21:00', price: 2000 },
    { id: 'fullday', label: 'Full Day (9 AM - 9 PM)', start: '09:00', end: '21:00', price: 3500 }
  ];

  // Package options
  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 2500,
      includes: ['2 hours of photography', '50 edited photos', 'Online gallery', 'Basic editing'],
      duration: '2 hours'
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 4500,
      includes: ['4 hours of photography', '100 edited photos', 'Online gallery', 'Advanced editing', 'Print rights'],
      duration: '4 hours'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 7500,
      includes: ['8 hours of photography', '200 edited photos', 'Online gallery', 'Premium editing', 'Print rights', 'Photo album'],
      duration: '8 hours'
    }
  ];

  const [availableDates] = useState(generateAvailableDates());

  const handleDateSelect = (date) => {
    console.log('Date selected:', date);
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    setShowCustomTime(false);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    console.log('Time slot selected:', timeSlot);
    setSelectedTimeSlot(timeSlot);
    setShowCustomTime(false);
  };

  const handleCustomTimeToggle = () => {
    setShowCustomTime(!showCustomTime);
    if (!showCustomTime) {
      setSelectedTimeSlot(null);
    }
  };

  const handleCustomTimeChange = (field, value) => {
    setCustomTime(prev => {
      const updated = { ...prev, [field]: value };
      
      // Calculate hours when start or end time changes
      if (field === 'startTime' || field === 'endTime') {
        const start = new Date(`2000-01-01T${updated.startTime}`);
        const end = new Date(`2000-01-01T${updated.endTime}`);
        const diffHours = (end - start) / (1000 * 60 * 60);
        updated.hours = Math.max(1, Math.round(diffHours));
      }
      
      return updated;
    });
  };

  const handleCustomTimeConfirm = () => {
    const customSlot = {
      id: 'custom',
      label: `Custom (${customTime.startTime} - ${customTime.endTime})`,
      start: customTime.startTime,
      end: customTime.endTime,
      price: calculateCustomPrice(customTime.hours),
      hours: customTime.hours
    };
    setSelectedTimeSlot(customSlot);
    setShowCustomTime(false);
  };

  const calculateCustomPrice = (hours) => {
    // Base price per hour: ₹800
    // Additional charge for early morning (before 9 AM) or late evening (after 9 PM): +₹200/hour
    const basePricePerHour = 800;
    const earlyMorningCharge = customTime.startTime < '09:00' ? 200 : 0;
    const lateEveningCharge = customTime.endTime > '21:00' ? 200 : 0;
    
    return hours * (basePricePerHour + earlyMorningCharge + lateEveningCharge);
  };

  const handlePackageSelect = (pkg) => {
    console.log('Package selected:', pkg);
    setSelectedPackage(pkg);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTimeSlot || !selectedPackage) {
      alert('Please select a date, time slot, and package');
      return;
    }

    const booking = {
      photographerId: photographer.id,
      photographerName: photographer.name,
      date: selectedDate.date,
      timeSlot: selectedTimeSlot,
      package: selectedPackage,
      details: bookingDetails,
      totalPrice: selectedPackage.price,
      status: 'pending'
    };

    onBookingConfirm(booking);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDateAvailable = (dateInfo) => {
    return dateInfo.available && !dateInfo.booked;
  };

  return (
    <div className="booking-system">
      <div className="booking-header">
        <h2>Book {photographer.name}</h2>
        <p>Select your preferred date, time, and package</p>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="booking-content">
        {/* Date Selection */}
        <div className="booking-section">
          <h3>Select Date</h3>
          <div className="date-grid">
            {availableDates.map((dateInfo, index) => (
              <button
                key={index}
                className={`date-btn ${!isDateAvailable(dateInfo) ? 'unavailable' : ''} ${selectedDate === dateInfo ? 'selected' : ''}`}
                onClick={() => isDateAvailable(dateInfo) && handleDateSelect(dateInfo)}
                disabled={!isDateAvailable(dateInfo)}
              >
                <span className="date-day">{formatDate(dateInfo.date).split(',')[0]}</span>
                <span className="date-number">{dateInfo.date.getDate()}</span>
                <span className="date-month">{formatDate(dateInfo.date).split(',')[1]}</span>
                {dateInfo.booked && <span className="booked-badge">Booked</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedDate && (
          <div className="booking-section">
            <h3>Select Time Slot</h3>
            <div className="time-slots">
              {timeSlots.map(timeSlot => (
                <button
                  key={timeSlot.id}
                  className={`time-slot-btn ${selectedTimeSlot?.id === timeSlot.id ? 'selected' : ''}`}
                  onClick={() => handleTimeSlotSelect(timeSlot)}
                >
                  <div className="time-slot-info">
                    <span className="time-label">{timeSlot.label}</span>
                    <span className="time-price">₹{timeSlot.price}</span>
                  </div>
                </button>
              ))}
              
              {/* Custom Time Slot Option */}
              <button
                className={`time-slot-btn custom-time-btn ${showCustomTime ? 'selected' : ''}`}
                onClick={handleCustomTimeToggle}
              >
                <div className="time-slot-info">
                  <span className="time-label">Custom Time Slot</span>
                  <span className="time-price">₹{calculateCustomPrice(customTime.hours)}</span>
                </div>
              </button>
            </div>

            {/* Custom Time Input */}
            {showCustomTime && (
              <div className="custom-time-section">
                <h4>Set Your Custom Time</h4>
                <div className="custom-time-inputs">
                  <div className="time-input-group">
                    <label htmlFor="startTime">Start Time</label>
                    <input
                      type="time"
                      id="startTime"
                      value={customTime.startTime}
                      onChange={(e) => handleCustomTimeChange('startTime', e.target.value)}
                      min="06:00"
                      max="22:00"
                    />
                  </div>
                  <div className="time-input-group">
                    <label htmlFor="endTime">End Time</label>
                    <input
                      type="time"
                      id="endTime"
                      value={customTime.endTime}
                      onChange={(e) => handleCustomTimeChange('endTime', e.target.value)}
                      min="06:00"
                      max="22:00"
                    />
                  </div>
                  <div className="time-input-group">
                    <label>Duration</label>
                    <div className="duration-display">{customTime.hours} hours</div>
                  </div>
                </div>
                <div className="custom-time-pricing">
                  <p>Base Rate: ₹800/hour</p>
                  {customTime.startTime < '09:00' && (
                    <p className="early-charge">Early Morning Charge: +₹200/hour (before 9 AM)</p>
                  )}
                  {customTime.endTime > '21:00' && (
                    <p className="late-charge">Late Evening Charge: +₹200/hour (after 9 PM)</p>
                  )}
                  <div className="total-custom-price">
                    Total: ₹{calculateCustomPrice(customTime.hours)}
                  </div>
                </div>
                <button
                  className="confirm-custom-time-btn"
                  onClick={handleCustomTimeConfirm}
                  disabled={customTime.hours < 1 || customTime.hours > 12}
                >
                  Confirm Custom Time
                </button>
              </div>
            )}
          </div>
        )}

        {/* Package Selection */}
        {selectedTimeSlot && (
          <div className="booking-section">
            <h3>Select Package</h3>
            <div className="package-grid">
              {packages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`package-card ${selectedPackage?.id === pkg.id ? 'selected' : ''}`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <div className="package-header">
                    <h4>{pkg.name}</h4>
                    <span className="package-price">₹{pkg.price}</span>
                  </div>
                  <div className="package-duration">{pkg.duration}</div>
                  <ul className="package-features">
                    {pkg.includes.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Details Form */}
        {selectedPackage && (
          <div className="booking-section">
            <h3>Event Details</h3>
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="eventType">Event Type</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={bookingDetails.eventType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="fashion">Fashion Shoot</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={bookingDetails.location}
                    onChange={handleInputChange}
                    placeholder="Event location"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guestCount">Expected Guests</label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={bookingDetails.guestCount}
                    onChange={handleInputChange}
                    placeholder="Number of guests"
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={bookingDetails.budget}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5000">Under ₹5,000</option>
                    <option value="5000-10000">₹5,000 - ₹10,000</option>
                    <option value="10000-20000">₹10,000 - ₹20,000</option>
                    <option value="20000-50000">₹20,000 - ₹50,000</option>
                    <option value="above-50000">Above ₹50,000</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Additional Details</label>
                <textarea
                  id="description"
                  name="description"
                  value={bookingDetails.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your event, special requirements, or any questions..."
                  rows="4"
                />
              </div>

              {/* Booking Summary */}
              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-item">
                  <span>Date:</span>
                  <span>{selectedDate && formatDate(selectedDate.date)}</span>
                </div>
                <div className="summary-item">
                  <span>Time:</span>
                  <span>{selectedTimeSlot?.label}</span>
                </div>
                <div className="summary-item">
                  <span>Package:</span>
                  <span>{selectedPackage?.name}</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>₹{selectedPackage?.price}</span>
                </div>
              </div>

              <div className="booking-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingSystem;
