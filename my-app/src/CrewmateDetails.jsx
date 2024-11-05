import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';

function CrewmateDetails() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase.from('crewmates').select('*').eq('id', id).single();
      if (error) console.error(error);
      else setCrewmate(data);
    };
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div className="crewmate-details">
      <h1>{crewmate.name}</h1>
      <p>Attributes: {crewmate.attributes}</p>
      <p>Category: {crewmate.category}</p>
      <Link to={`/update/${crewmate.id}`}>Update</Link>
    </div>
  );
}

export default CrewmateDetails;