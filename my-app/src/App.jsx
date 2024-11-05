import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCrewmate from './CreateCrewmate';
import CrewmateList from './CrewmateList';
import CrewmateDetails from './CrewmateDetails';
import UpdateCrewmate from './UpdateCrewmate';
import './App.css'; // Import the consolidated CSS file

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/create">Create Crewmate</Link>
        
      </div>
      <Routes>
        <Route path="/" element={<CrewmateList />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/crewmate/:id" element={<CrewmateDetails />} />
        <Route path="/update/:id" element={<UpdateCrewmate />} />
      </Routes>
    </Router>
  );
}

export default App;