import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map, 
  AlertTriangle, 
  Users, 
  BookOpen, 
  Heart,
  Shield
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/map', icon: Map, label: 'Disaster Map' },
    { path: '/sos', icon: AlertTriangle, label: 'SOS Alerts' },
    { path: '/rescue-teams', icon: Users, label: 'Rescue Teams' },
    { path: '/guides', icon: BookOpen, label: 'Emergency Guides' },
    { path: '/donations', icon: Heart, label: 'Donations' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Shield className="brand-icon" />
        <span className="brand-text">Disaster Response Center</span>
      </div>
      
      <div className="navbar-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;