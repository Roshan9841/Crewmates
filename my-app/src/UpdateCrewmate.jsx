import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';

function UpdateCrewmate() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [attributes, setAttributes] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase.from('crewmates').select('*').eq('id', id).single();
      if (error) console.error(error);
      else {
        setName(data.name);
        setAttributes(data.attributes);
        setCategory(data.category);
      }
    };
    fetchCrewmate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .update({ name, attributes, category })
      .eq('id', id);
    if (error) {
      console.error('Error updating crewmate:', error);
      setMessage('Error updating crewmate');
    } else {
      console.log('Crewmate updated:', data);
      setMessage('Crewmate updated successfully');
    }
  };

  return (
    <div className="update-crewmate">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Attributes" value={attributes} onChange={(e) => setAttributes(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Update Crewmate</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UpdateCrewmate;