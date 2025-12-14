import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import { disasters, rescueTeams, safeZones, sosAlerts } from '../data/mockData';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeDisasters: 0,
    activeRescueTeams: 0,
    availableSafeZones: 0,
    pendingSOS: 0,
    totalAffected: 0
  });

  useEffect(() => {
    // Calculate statistics from mock data
    const activeDisasters = disasters.filter(d => d.status === 'Active').length;
    const activeRescueTeams = rescueTeams.filter(t => t.status === 'Active' || t.status === 'Deployed').length;
    const availableSafeZones = safeZones.filter(z => z.status === 'Open').length;
    const pendingSOS = sosAlerts.filter(s => s.status === 'Pending').length;
    const totalAffected = disasters.reduce((sum, d) => sum + d.affectedPeople, 0);

    setStats({
      activeDisasters,
      activeRescueTeams,
      availableSafeZones,
      pendingSOS,
      totalAffected
    });
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="stat-card">
      <div className="stat-header">
        <Icon className={`stat-icon ${color}`} size={24} />
        <span className="stat-title">{title}</span>
      </div>
      <div className="stat-value">{value.toLocaleString()}</div>
      {trend && (
        <div className="stat-trend">
          <TrendingUp size={16} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );

  const RecentAlert = ({ alert }) => (
    <div className="recent-alert">
      <div className="alert-priority">
        <AlertTriangle 
          size={16} 
          className={`priority-${alert.priority.toLowerCase()}`} 
        />
        <span className="priority-text">{alert.priority}</span>
      </div>
      <div className="alert-content">
        <div className="alert-location">{alert.location}</div>
        <div className="alert-message">{alert.message}</div>
        <div className="alert-time">
          <Clock size={14} />
          {new Date(alert.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );

  const ActiveDisaster = ({ disaster }) => (
    <div className="active-disaster">
      <div className="disaster-header">
        <div className="disaster-type">{disaster.type}</div>
        <div className={`disaster-severity severity-${disaster.severity.toLowerCase()}`}>
          {disaster.severity}
        </div>
      </div>
      <div className="disaster-location">
        <MapPin size={16} />
        {disaster.location}
      </div>
      <div className="disaster-affected">
        <Users size={16} />
        {disaster.affectedPeople.toLocaleString()} people affected
      </div>
      <div className="disaster-description">{disaster.description}</div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Disaster Response Dashboard</h1>
        <div className="last-updated">
          <Activity size={16} />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={AlertTriangle}
          title="Active Disasters"
          value={stats.activeDisasters}
          color="danger"
          trend="+2 from yesterday"
        />
        <StatCard
          icon={Users}
          title="Active Rescue Teams"
          value={stats.activeRescueTeams}
          color="primary"
        />
        <StatCard
          icon={MapPin}
          title="Available Safe Zones"
          value={stats.availableSafeZones}
          color="success"
        />
        <StatCard
          icon={AlertTriangle}
          title="Pending SOS Alerts"
          value={stats.pendingSOS}
          color="warning"
        />
        <StatCard
          icon={Users}
          title="Total People Affected"
          value={stats.totalAffected}
          color="info"
          trend="+5,200 from yesterday"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Active Disasters</h2>
          <div className="disasters-list">
            {disasters
              .filter(d => d.status === 'Active')
              .map(disaster => (
                <ActiveDisaster key={disaster.id} disaster={disaster} />
              ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent SOS Alerts</h2>
          <div className="alerts-list">
            {sosAlerts
              .filter(alert => alert.status === 'Pending')
              .slice(0, 5)
              .map(alert => (
                <RecentAlert key={alert.id} alert={alert} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;