import { useState } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  MapPin, 
  Clock, 
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { sosAlerts } from '../data/mockData';

const SOSAlerts = () => {
  const [alerts, setAlerts] = useState(sosAlerts);
  const [showNewAlertForm, setShowNewAlertForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newAlert, setNewAlert] = useState({
    location: '',
    message: '',
    priority: 'Medium',
    reportedBy: ''
  });

  const handleSubmitAlert = (e) => {
    e.preventDefault();
    const alert = {
      id: alerts.length + 1,
      ...newAlert,
      coordinates: [37.7749, -122.4194], // Default coordinates
      status: 'Pending',
      timestamp: new Date().toISOString()
    };
    setAlerts([alert, ...alerts]);
    setNewAlert({ location: '', message: '', priority: 'Medium', reportedBy: '' });
    setShowNewAlertForm(false);
  };

  const updateAlertStatus = (alertId, newStatus) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => 
    filterStatus === 'all' || alert.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'in progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-pending';
    }
  };

  const AlertCard = ({ alert }) => (
    <div className="alert-card">
      <div className="alert-header">
        <div className="alert-priority">
          <AlertTriangle className={getPriorityColor(alert.priority)} size={20} />
          <span className={`priority-badge ${getPriorityColor(alert.priority)}`}>
            {alert.priority}
          </span>
        </div>
        <div className={`alert-status ${getStatusColor(alert.status)}`}>
          {alert.status}
        </div>
      </div>

      <div className="alert-content">
        <div className="alert-location">
          <MapPin size={16} />
          <span>{alert.location}</span>
        </div>
        
        <div className="alert-message">
          <MessageSquare size={16} />
          <span>{alert.message}</span>
        </div>

        <div className="alert-meta">
          <div className="alert-reporter">
            <User size={16} />
            <span>Reported by: {alert.reportedBy}</span>
          </div>
          <div className="alert-time">
            <Clock size={16} />
            <span>{new Date(alert.timestamp).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {alert.status === 'Pending' && (
        <div className="alert-actions">
          <button 
            className="btn btn-primary"
            onClick={() => updateAlertStatus(alert.id, 'In Progress')}
          >
            <Phone size={16} />
            Respond
          </button>
          <button 
            className="btn btn-success"
            onClick={() => updateAlertStatus(alert.id, 'Resolved')}
          >
            <CheckCircle size={16} />
            Mark Resolved
          </button>
        </div>
      )}
    </div>
  );

  const NewAlertForm = () => (
    <div className="new-alert-form">
      <h3>Report Emergency</h3>
      <form onSubmit={handleSubmitAlert}>
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            value={newAlert.location}
            onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
            placeholder="Enter specific location or address"
            required
          />
        </div>

        <div className="form-group">
          <label>Emergency Description *</label>
          <textarea
            value={newAlert.message}
            onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
            placeholder="Describe the emergency situation in detail"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Priority Level</label>
          <select
            value={newAlert.priority}
            onChange={(e) => setNewAlert({...newAlert, priority: e.target.value})}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your Name (Optional)</label>
          <input
            type="text"
            value={newAlert.reportedBy}
            onChange={(e) => setNewAlert({...newAlert, reportedBy: e.target.value})}
            placeholder="Enter your name or leave blank for anonymous"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-danger">
            <AlertTriangle size={16} />
            Submit Emergency Alert
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setShowNewAlertForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="sos-alerts-page">
      <div className="page-header">
        <h1>SOS Emergency Alerts</h1>
        <button 
          className="btn btn-danger"
          onClick={() => setShowNewAlertForm(true)}
        >
          <Plus size={16} />
          Report Emergency
        </button>
      </div>

      {showNewAlertForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <NewAlertForm />
          </div>
        </div>
      )}

      <div className="alerts-controls">
        <div className="filter-controls">
          <label>Filter by Status:</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Alerts</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="alerts-stats">
          <div className="stat">
            <span className="stat-number">{alerts.filter(a => a.status === 'Pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-number">{alerts.filter(a => a.status === 'In Progress').length}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat">
            <span className="stat-number">{alerts.filter(a => a.status === 'Resolved').length}</span>
            <span className="stat-label">Resolved</span>
          </div>
        </div>
      </div>

      <div className="alerts-list">
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts">
            <AlertTriangle size={48} />
            <h3>No alerts found</h3>
            <p>No emergency alerts match your current filter.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        )}
      </div>
    </div>
  );
};

export default SOSAlerts;