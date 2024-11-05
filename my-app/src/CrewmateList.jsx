import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';
import './App.css';

function CrewmateList() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase.from('Crewmates').select('*');
      if (error) console.error(error);
      else setCrewmates(data);
    };
    fetchCrewmates();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('crewmates').delete().eq('id', id);
    if (error) console.error(error);
    else setCrewmates(crewmates.filter(crewmate => crewmate.id !== id));
  };

  return (
    <div className="crewmate-list">
      <h1>Crewmate List</h1>
      <Link to="/create">Create New Crewmate</Link>
      <ul>
        {crewmates.map((crewmate) => (
          <li key={crewmate.id}>
            <Link to={`/crewmate/${crewmate.id}`}>{crewmate.name}</Link>
            <button onClick={() => handleDelete(crewmate.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrewmateList;