import { useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function CreateCrewmate() {
  const [name, setName] = useState('');
  const [attributes, setAttributes] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Crewmates')
      .insert([{ name, attributes, category }]);
    if (error) {
      console.error('Error creating crewmate:', error);
      setMessage('Error creating crewmate');
    } else {
      console.log('Crewmate created:', data);
      setMessage('Crewmate created successfully');
      setName('');
      setAttributes('');
      setCategory('');
    }
  };

  const handleAttributeClick = (attribute) => {
    setAttributes(attribute);
  };

  return (
    <div className="create-crewmate">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="attributes">
          <button type="button" onClick={() => handleAttributeClick('Strength')}>Strength</button>
          <button type="button" onClick={() => handleAttributeClick('Agility')}>Agility</button>
          <button type="button" onClick={() => handleAttributeClick('Intelligence')}>Intelligence</button>
        </div>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Create Crewmate</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreateCrewmate;