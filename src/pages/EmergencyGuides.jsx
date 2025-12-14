import { useState } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle, 
  Package,
  Phone,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { emergencyGuides } from '../data/mockData';

const EmergencyGuides = () => {
  const [guides] = useState(emergencyGuides);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || guide.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getDisasterIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'earthquake': return '🌍';
      case 'wildfire': return '🔥';
      case 'flood': return '🌊';
      case 'hurricane': return '🌀';
      case 'tornado': return '🌪️';
      default: return '⚠️';
    }
  };

  const GuideCard = ({ guide }) => (
    <div className="guide-card" onClick={() => setSelectedGuide(guide)}>
      <div className="guide-header">
        <div className="guide-icon">
          {getDisasterIcon(guide.type)}
        </div>
        <div className="guide-info">
          <h3>{guide.title}</h3>
          <span className="guide-type">{guide.type}</span>
        </div>
      </div>
      
      <div className="guide-preview">
        <p>Essential safety procedures and emergency preparedness steps</p>
        <div className="guide-stats">
          <span>{guide.steps.length} steps</span>
          <span>{guide.emergencyKit.length} kit items</span>
        </div>
      </div>

      <div className="guide-actions">
        <button className="btn btn-primary">
          <BookOpen size={16} />
          Read Guide
        </button>
        <button className="btn btn-secondary">
          <Download size={16} />
          Download PDF
        </button>
      </div>
    </div>
  );

  const GuideDetail = ({ guide, onClose }) => (
    <div className="guide-detail">
      <div className="guide-detail-header">
        <div className="guide-title">
          <span className="guide-icon-large">{getDisasterIcon(guide.type)}</span>
          <div>
            <h2>{guide.title}</h2>
            <span className="guide-type-badge">{guide.type}</span>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="guide-content">
        <div className="safety-steps">
          <h3>
            <AlertTriangle size={20} />
            Emergency Safety Steps
          </h3>
          <ol className="steps-list">
            {guide.steps.map((step, index) => (
              <li key={index} className="step-item">
                <CheckCircle size={16} />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="emergency-kit">
          <h3>
            <Package size={20} />
            Emergency Kit Essentials
          </h3>
          <div className="kit-items">
            {guide.emergencyKit.map((item, index) => (
              <div key={index} className="kit-item">
                <CheckCircle size={14} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="emergency-contacts">
          <h3>
            <Phone size={20} />
            Emergency Contacts
          </h3>
          <div className="contact-list">
            <div className="contact-item">
              <strong>Emergency Services:</strong> 911
            </div>
            <div className="contact-item">
              <strong>Red Cross:</strong> 1-800-RED-CROSS
            </div>
            <div className="contact-item">
              <strong>FEMA:</strong> 1-800-621-3362
            </div>
            <div className="contact-item">
              <strong>Poison Control:</strong> 1-800-222-1222
            </div>
          </div>
        </div>
      </div>

      <div className="guide-actions-detail">
        <button className="btn btn-primary">
          <Download size={16} />
          Download Complete Guide
        </button>
        <button className="btn btn-secondary">
          <Phone size={16} />
          Share Guide
        </button>
      </div>
    </div>
  );

  const QuickTips = () => (
    <div className="quick-tips">
      <h3>Quick Emergency Tips</h3>
      <div className="tips-grid">
        <div className="tip-card">
          <AlertTriangle size={24} />
          <h4>Stay Informed</h4>
          <p>Monitor emergency broadcasts and official alerts</p>
        </div>
        <div className="tip-card">
          <Package size={24} />
          <h4>Emergency Kit</h4>
          <p>Keep a 72-hour emergency kit ready at all times</p>
        </div>
        <div className="tip-card">
          <Phone size={24} />
          <h4>Communication Plan</h4>
          <p>Have a family communication plan and meeting point</p>
        </div>
        <div className="tip-card">
          <CheckCircle size={24} />
          <h4>Practice Drills</h4>
          <p>Regularly practice emergency procedures with family</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="emergency-guides-page">
      <div className="page-header">
        <h1>Emergency Preparedness Guides</h1>
        <p>Essential safety information and emergency procedures</p>
      </div>

      {selectedGuide ? (
        <GuideDetail 
          guide={selectedGuide} 
          onClose={() => setSelectedGuide(null)} 
        />
      ) : (
        <>
          <QuickTips />

          <div className="guides-controls">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search guides by disaster type or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-controls">
              <Filter size={16} />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Disasters</option>
                <option value="earthquake">Earthquake</option>
                <option value="wildfire">Wildfire</option>
                <option value="flood">Flood</option>
                <option value="hurricane">Hurricane</option>
                <option value="tornado">Tornado</option>
              </select>
            </div>
          </div>

          <div className="guides-grid">
            {filteredGuides.length === 0 ? (
              <div className="no-guides">
                <BookOpen size={48} />
                <h3>No guides found</h3>
                <p>No emergency guides match your current search criteria.</p>
              </div>
            ) : (
              filteredGuides.map(guide => (
                <GuideCard key={guide.id} guide={guide} />
              ))
            )}
          </div>

          <div className="emergency-numbers">
            <h3>Important Emergency Numbers</h3>
            <div className="numbers-grid">
              <div className="number-card">
                <Phone size={24} />
                <div>
                  <strong>911</strong>
                  <span>Emergency Services</span>
                </div>
              </div>
              <div className="number-card">
                <Phone size={24} />
                <div>
                  <strong>1-800-RED-CROSS</strong>
                  <span>American Red Cross</span>
                </div>
              </div>
              <div className="number-card">
                <Phone size={24} />
                <div>
                  <strong>1-800-621-3362</strong>
                  <span>FEMA Disaster Assistance</span>
                </div>
              </div>
              <div className="number-card">
                <Phone size={24} />
                <div>
                  <strong>211</strong>
                  <span>Community Resources</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyGuides;