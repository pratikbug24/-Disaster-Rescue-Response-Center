import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { 
  AlertTriangle, 
  Users, 
  Shield, 
  MapPin,
  Info
} from 'lucide-react';
import { disasters, rescueTeams, safeZones } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DisasterMap = () => {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [mapCenter] = useState([39.8283, -98.5795]); // Center of USA
  const [mapZoom] = useState(4);

  const LayerControl = () => (
    <div className="map-controls">
      <h3>Map Layers</h3>
      <div className="layer-options">
        <label className="layer-option">
          <input
            type="radio"
            name="layer"
            value="all"
            checked={selectedLayer === 'all'}
            onChange={(e) => setSelectedLayer(e.target.value)}
          />
          <span>All Markers</span>
        </label>
        <label className="layer-option">
          <input
            type="radio"
            name="layer"
            value="disasters"
            checked={selectedLayer === 'disasters'}
            onChange={(e) => setSelectedLayer(e.target.value)}
          />
          <AlertTriangle size={16} />
          <span>Disasters Only</span>
        </label>
        <label className="layer-option">
          <input
            type="radio"
            name="layer"
            value="rescue"
            checked={selectedLayer === 'rescue'}
            onChange={(e) => setSelectedLayer(e.target.value)}
          />
          <Users size={16} />
          <span>Rescue Teams Only</span>
        </label>
        <label className="layer-option">
          <input
            type="radio"
            name="layer"
            value="safe"
            checked={selectedLayer === 'safe'}
            onChange={(e) => setSelectedLayer(e.target.value)}
          />
          <Shield size={16} />
          <span>Safe Zones Only</span>
        </label>
      </div>
    </div>
  );

  const MapLegend = () => (
    <div className="map-legend">
      <h4>Legend</h4>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-marker disaster"></div>
          <span>Active Disasters</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker rescue"></div>
          <span>Rescue Teams</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker safe"></div>
          <span>Safe Zones</span>
        </div>
      </div>
    </div>
  );

  const createCustomIcon = (type, status) => {
    let color = '#3388ff';
    if (type === 'disaster') {
      color = status === 'Critical' ? '#ff0000' : status === 'High' ? '#ff6600' : '#ffaa00';
    } else if (type === 'rescue') {
      color = status === 'Active' ? '#00aa00' : status === 'Deployed' ? '#0066ff' : '#888888';
    } else if (type === 'safe') {
      color = '#00ff00';
    }

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const shouldShowMarker = (type) => {
    return selectedLayer === 'all' || 
           (selectedLayer === 'disasters' && type === 'disaster') ||
           (selectedLayer === 'rescue' && type === 'rescue') ||
           (selectedLayer === 'safe' && type === 'safe');
  };

  return (
    <div className="disaster-map-page">
      <div className="map-header">
        <h1>Disaster Response Map</h1>
        <div className="map-info">
          <Info size={16} />
          <span>Real-time view of disasters, rescue teams, and safe zones</span>
        </div>
      </div>

      <div className="map-container-wrapper">
        <LayerControl />
        
        <div className="map-wrapper">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '600px', width: '100%' }}
            className="disaster-map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Disaster Markers */}
            {disasters.map(disaster => (
              shouldShowMarker('disaster') && (
                <div key={`disaster-${disaster.id}`}>
                  <Marker
                    position={disaster.coordinates}
                    icon={createCustomIcon('disaster', disaster.severity)}
                  >
                    <Popup>
                      <div className="map-popup disaster-popup">
                        <h4>{disaster.type}</h4>
                        <p><MapPin size={14} /> {disaster.location}</p>
                        <p><strong>Severity:</strong> {disaster.severity}</p>
                        <p><strong>Status:</strong> {disaster.status}</p>
                        <p><strong>Affected:</strong> {disaster.affectedPeople.toLocaleString()} people</p>
                        <p>{disaster.description}</p>
                        <div className="emergency-contacts">
                          <strong>Emergency Contacts:</strong>
                          {disaster.emergencyContacts.map((contact, idx) => (
                            <div key={idx}>{contact}</div>
                          ))}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Affected area circle */}
                  <Circle
                    center={disaster.coordinates}
                    radius={disaster.severity === 'Critical' ? 50000 : disaster.severity === 'High' ? 30000 : 15000}
                    pathOptions={{
                      color: disaster.severity === 'Critical' ? '#ff0000' : disaster.severity === 'High' ? '#ff6600' : '#ffaa00',
                      fillColor: disaster.severity === 'Critical' ? '#ff0000' : disaster.severity === 'High' ? '#ff6600' : '#ffaa00',
                      fillOpacity: 0.1
                    }}
                  />
                </div>
              )
            ))}

            {/* Rescue Team Markers */}
            {rescueTeams.map(team => (
              shouldShowMarker('rescue') && (
                <Marker
                  key={`rescue-${team.id}`}
                  position={team.coordinates}
                  icon={createCustomIcon('rescue', team.status)}
                >
                  <Popup>
                    <div className="map-popup rescue-popup">
                      <h4>{team.name}</h4>
                      <p><MapPin size={14} /> {team.location}</p>
                      <p><strong>Status:</strong> {team.status}</p>
                      <p><strong>Specialization:</strong> {team.specialization}</p>
                      <p><strong>Members:</strong> {team.members}</p>
                      <p><strong>Equipment:</strong></p>
                      <ul>
                        {team.equipment.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      <p><strong>Contact:</strong> {team.contact}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}

            {/* Safe Zone Markers */}
            {safeZones.map(zone => (
              shouldShowMarker('safe') && (
                <Marker
                  key={`safe-${zone.id}`}
                  position={zone.coordinates}
                  icon={createCustomIcon('safe', zone.status)}
                >
                  <Popup>
                    <div className="map-popup safe-popup">
                      <h4>{zone.name}</h4>
                      <p><MapPin size={14} /> {zone.location}</p>
                      <p><strong>Status:</strong> {zone.status}</p>
                      <p><strong>Capacity:</strong> {zone.capacity.toLocaleString()}</p>
                      <p><strong>Current Occupancy:</strong> {zone.currentOccupancy.toLocaleString()}</p>
                      <p><strong>Available Space:</strong> {(zone.capacity - zone.currentOccupancy).toLocaleString()}</p>
                      <p><strong>Facilities:</strong></p>
                      <ul>
                        {zone.facilities.map((facility, idx) => (
                          <li key={idx}>{facility}</li>
                        ))}
                      </ul>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>

        <MapLegend />
      </div>
    </div>
  );
};

export default DisasterMap;