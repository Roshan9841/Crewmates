import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';

function CrewmateDetails() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase.from('Crewmates').select('*').eq('id', id).single();
      if (error) console.error(error);
      else setCrewmate(data);
    };
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div className="crewmate-details">
      <h1>{crewmate.name}</h1>
      <p>Speed: {crewmate.speed}</p>
      <p>Color: {crewmate.color}</p>
      <Link to={`/update/${crewmate.id}`}>Update</Link>
    </div>
  );
}

export default CrewmateDetails;