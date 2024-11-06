import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';

function UpdateCrewmate() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase.from('Crewmates').select('*').eq('id', id).single();
      if (error) console.error(error);
      else {
        setName(data.name);
        setSpeed(data.speed);
        setColor(data.color);
      }
    };
    fetchCrewmate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Crewmates')
      .update({ name, speed, color })
      .eq('id', id);
    if (error) {
      console.error('Error updating crewmate:', error);
      setMessage('Error updating crewmate');
    } else {
      console.log('Crewmate updated:', data);
      setMessage('Crewmate updated successfully');
    }
  };

  const handleSpeedClick = (speedValue) => {
    setSpeed(speedValue);
  };

  return (
    <div className="update-crewmate">
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
        <button type="submit">Update Crewmate</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UpdateCrewmate;