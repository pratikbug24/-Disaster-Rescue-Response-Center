import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DisasterMap from './pages/DisasterMap';
import SOSAlerts from './pages/SOSAlerts';
import RescueTeams from './pages/RescueTeams';
import EmergencyGuides from './pages/EmergencyGuides';
import Donations from './pages/Donations';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<DisasterMap />} />
            <Route path="/sos" element={<SOSAlerts />} />
            <Route path="/rescue-teams" element={<RescueTeams />} />
            <Route path="/guides" element={<EmergencyGuides />} />
            <Route path="/donations" element={<Donations />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
