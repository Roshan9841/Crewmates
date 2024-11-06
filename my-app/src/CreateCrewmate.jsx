import { useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function CreateCrewmate() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Crewmates')
      .insert([{ name, speed, color }]);
    if (error) {
      console.error('Error creating crewmate:', error);
      setMessage('Error creating crewmate');
    } else {
      console.log('Crewmate created:', data);
      setMessage('Crewmate created successfully');
      setName('');
      setSpeed('');
      setColor('');
    }
  };

  const handleSpeedClick = (speedValue) => {
    setSpeed(speedValue);
  };

  return (
    <div className="create-crewmate">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="speed">
          <label>Choose Speed:</label>
          <button type="button" onClick={() => handleSpeedClick('Slow')} className={speed === 'Slow' ? 'selected' : ''}>Slow</button>
          <button type="button" onClick={() => handleSpeedClick('Medium')} className={speed === 'Medium' ? 'selected' : ''}>Medium</button>
          <button type="button" onClick={() => handleSpeedClick('Fast')} className={speed === 'Fast' ? 'selected' : ''}>Fast</button>
        </div>
        <div className="color">
          <label>Choose Color:</label>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Select Color</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Purple">Purple</option>
            <option value="Orange">Orange</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
          </select>
        </div>
        <button type="submit">Create Crewmate</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateCrewmate;