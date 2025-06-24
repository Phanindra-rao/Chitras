import { useState } from 'react';
import '../css/RequirementPanel.css';

function RequirementPanel({ onNewRequest }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventType, setEventType] = useState('event');
  const [budget, setBudget] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      eventType,
      budget: `${budget} rupees`,
      additionalRequirements,
    };
    onNewRequest(request);
    setIsFormOpen(false);
    setEventType('event');
    setBudget('');
    setAdditionalRequirements('');
  };

  return (
    <aside className="requirement-panel">
      <button onClick={() => setIsFormOpen(true)}>Post +</button>
      <div className={`requirement-form ${isFormOpen ? 'active' : ''}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="event-type">Event Type</label>
          <select
            id="event-type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="event">Event</option>
            <option value="birthday party">Birthday Party</option>
            <option value="marriage">Marriage</option>
            <option value="party">Party</option>
            <option value="custom">Custom</option>
          </select>
          <label htmlFor="budget">Budget</label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g., 100000"
            required
          />
          <label htmlFor="additional-requirements">Additional Requirements</label>
          <textarea
            id="additional-requirements"
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="e.g., outdoor shooting, drone footage"
          />
          <button type="submit">Post Requirement</button>
        </form>
      </div>
    </aside>
  );
}

export default RequirementPanel;