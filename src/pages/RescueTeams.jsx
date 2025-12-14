import { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Activity,
  Package,
  Filter,
  Search
} from 'lucide-react';
import { rescueTeams } from '../data/mockData';

const RescueTeams = () => {
  const [teams] = useState(rescueTeams);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(team => {
    const matchesStatus = filterStatus === 'all' || team.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'deployed': return 'status-deployed';
      case 'standby': return 'status-standby';
      case 'offline': return 'status-offline';
      default: return 'status-standby';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return '🟢';
      case 'deployed': return '🔵';
      case 'standby': return '🟡';
      case 'offline': return '🔴';
      default: return '🟡';
    }
  };

  const TeamCard = ({ team }) => (
    <div className="team-card">
      <div className="team-header">
        <div className="team-name">
          <Users size={20} />
          <h3>{team.name}</h3>
        </div>
        <div className={`team-status ${getStatusColor(team.status)}`}>
          <span className="status-indicator">{getStatusIcon(team.status)}</span>
          <span>{team.status}</span>
        </div>
      </div>

      <div className="team-info">
        <div className="info-item">
          <MapPin size={16} />
          <span>{team.location}</span>
        </div>
        
        <div className="info-item">
          <Activity size={16} />
          <span>{team.specialization}</span>
        </div>

        <div className="info-item">
          <Users size={16} />
          <span>{team.members} team members</span>
        </div>

        <div className="info-item">
          <Mail size={16} />
          <span>{team.contact}</span>
        </div>
      </div>

      <div className="team-equipment">
        <h4>
          <Package size={16} />
          Equipment & Resources
        </h4>
        <div className="equipment-list">
          {team.equipment.map((item, index) => (
            <span key={index} className="equipment-tag">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="team-actions">
        <button className="btn btn-primary">
          <Phone size={16} />
          Contact Team
        </button>
        <button className="btn btn-secondary">
          <MapPin size={16} />
          View on Map
        </button>
      </div>
    </div>
  );

  const TeamStats = () => {
    const stats = {
      total: teams.length,
      active: teams.filter(t => t.status === 'Active').length,
      deployed: teams.filter(t => t.status === 'Deployed').length,
      standby: teams.filter(t => t.status === 'Standby').length,
      totalMembers: teams.reduce((sum, t) => sum + t.members, 0)
    };

    return (
      <div className="team-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Teams</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.deployed}</div>
          <div className="stat-label">Deployed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.standby}</div>
          <div className="stat-label">On Standby</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalMembers}</div>
          <div className="stat-label">Total Personnel</div>
        </div>
      </div>
    );
  };

  return (
    <div className="rescue-teams-page">
      <div className="page-header">
        <h1>Rescue Teams</h1>
        <p>Coordinate and monitor rescue team operations</p>
      </div>

      <TeamStats />

      <div className="teams-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search teams by name, location, or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <Filter size={16} />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Teams</option>
            <option value="active">Active</option>
            <option value="deployed">Deployed</option>
            <option value="standby">Standby</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      <div className="teams-grid">
        {filteredTeams.length === 0 ? (
          <div className="no-teams">
            <Users size={48} />
            <h3>No teams found</h3>
            <p>No rescue teams match your current search and filter criteria.</p>
          </div>
        ) : (
          filteredTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))
        )}
      </div>

      <div className="teams-legend">
        <h4>Status Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="status-indicator">🟢</span>
            <span>Active - Ready for immediate deployment</span>
          </div>
          <div className="legend-item">
            <span className="status-indicator">🔵</span>
            <span>Deployed - Currently on a mission</span>
          </div>
          <div className="legend-item">
            <span className="status-indicator">🟡</span>
            <span>Standby - Available but not actively deployed</span>
          </div>
          <div className="legend-item">
            <span className="status-indicator">🔴</span>
            <span>Offline - Not available for deployment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescueTeams;