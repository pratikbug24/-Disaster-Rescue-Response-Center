import { useState } from 'react';
import { 
  Heart, 
  DollarSign, 
  Target, 
  TrendingUp,
  Users,
  Package,
  CreditCard,
  Gift,
  CheckCircle
} from 'lucide-react';
import { donationCategories } from '../data/mockData';

const Donations = () => {
  const [categories] = useState(donationCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'urgency-critical';
      case 'high': return 'urgency-high';
      case 'medium': return 'urgency-medium';
      case 'low': return 'urgency-low';
      default: return 'urgency-medium';
    }
  };

  const calculateProgress = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const handleDonate = (category) => {
    setSelectedCategory(category);
    setShowDonationForm(true);
  };

  const submitDonation = (e) => {
    e.preventDefault();
    // Simulate donation processing
    setTimeout(() => {
      setDonationComplete(true);
      setTimeout(() => {
        setShowDonationForm(false);
        setDonationComplete(false);
        setSelectedCategory(null);
        setDonationAmount('');
      }, 2000);
    }, 1000);
  };

  const CategoryCard = ({ category }) => {
    const progress = calculateProgress(category.raised, category.target);
    
    return (
      <div className="donation-category">
        <div className="category-header">
          <h3>{category.name}</h3>
          <span className={`urgency-badge ${getUrgencyColor(category.urgency)}`}>
            {category.urgency} Priority
          </span>
        </div>

        <p className="category-description">{category.description}</p>

        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span className="raised">${category.raised.toLocaleString()} raised</span>
            <span className="target">of ${category.target.toLocaleString()} goal</span>
          </div>
          <div className="progress-percentage">{progress.toFixed(1)}% funded</div>
        </div>

        <button 
          className="btn btn-primary donate-btn"
          onClick={() => handleDonate(category)}
        >
          <Heart size={16} />
          Donate Now
        </button>
      </div>
    );
  };

  const DonationForm = () => (
    <div className="donation-form">
      <h3>Donate to {selectedCategory?.name}</h3>
      
      {donationComplete ? (
        <div className="donation-success">
          <CheckCircle size={48} />
          <h4>Thank you for your donation!</h4>
          <p>Your contribution will help save lives and provide essential aid.</p>
        </div>
      ) : (
        <form onSubmit={submitDonation}>
          <div className="amount-selection">
            <h4>Select Amount</h4>
            <div className="preset-amounts">
              {[25, 50, 100, 250, 500].map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`amount-btn ${donationAmount === amount.toString() ? 'selected' : ''}`}
                  onClick={() => setDonationAmount(amount.toString())}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div className="custom-amount">
              <label>Custom Amount</label>
              <div className="amount-input">
                <DollarSign size={16} />
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="donor-info">
            <h4>Donor Information</h4>
            <div className="form-row">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" />
          </div>

          <div className="payment-info">
            <h4>Payment Information</h4>
            <input type="text" placeholder="Card Number" required />
            <div className="form-row">
              <input type="text" placeholder="MM/YY" required />
              <input type="text" placeholder="CVV" required />
            </div>
            <input type="text" placeholder="Cardholder Name" required />
          </div>

          <div className="donation-summary">
            <div className="summary-row">
              <span>Donation Amount:</span>
              <span>${donationAmount || '0'}</span>
            </div>
            <div className="summary-row">
              <span>Processing Fee:</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${donationAmount || '0'}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <CreditCard size={16} />
              Complete Donation
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowDonationForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const DonationStats = () => {
    const totalRaised = categories.reduce((sum, cat) => sum + cat.raised, 0);
    const totalTarget = categories.reduce((sum, cat) => sum + cat.target, 0);
    const overallProgress = (totalRaised / totalTarget) * 100;

    return (
      <div className="donation-stats">
        <div className="stat-card">
          <DollarSign size={24} />
          <div className="stat-content">
            <div className="stat-number">${totalRaised.toLocaleString()}</div>
            <div className="stat-label">Total Raised</div>
          </div>
        </div>
        <div className="stat-card">
          <Target size={24} />
          <div className="stat-content">
            <div className="stat-number">${totalTarget.toLocaleString()}</div>
            <div className="stat-label">Total Goal</div>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={24} />
          <div className="stat-content">
            <div className="stat-number">{overallProgress.toFixed(1)}%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
        </div>
        <div className="stat-card">
          <Users size={24} />
          <div className="stat-content">
            <div className="stat-number">1,247</div>
            <div className="stat-label">Donors</div>
          </div>
        </div>
      </div>
    );
  };

  const OtherWaysToHelp = () => (
    <div className="other-ways">
      <h3>Other Ways to Help</h3>
      <div className="help-options">
        <div className="help-option">
          <Package size={32} />
          <h4>Donate Supplies</h4>
          <p>Contribute essential items like food, water, clothing, and medical supplies</p>
          <button className="btn btn-secondary">Learn More</button>
        </div>
        <div className="help-option">
          <Users size={32} />
          <h4>Volunteer</h4>
          <p>Join our volunteer network to help with disaster response and recovery efforts</p>
          <button className="btn btn-secondary">Sign Up</button>
        </div>
        <div className="help-option">
          <Gift size={32} />
          <h4>Corporate Partnerships</h4>
          <p>Partner with us for large-scale disaster relief and preparedness initiatives</p>
          <button className="btn btn-secondary">Contact Us</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="donations-page">
      <div className="page-header">
        <h1>Support Disaster Relief</h1>
        <p>Your donations help provide immediate aid and long-term recovery support to disaster-affected communities</p>
      </div>

      {showDonationForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <DonationForm />
          </div>
        </div>
      )}

      <DonationStats />

      <div className="donation-categories">
        <h2>Donation Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <OtherWaysToHelp />

      <div className="donation-impact">
        <h3>Your Impact</h3>
        <div className="impact-examples">
          <div className="impact-item">
            <div className="impact-amount">$25</div>
            <div className="impact-description">Provides emergency food for a family of 4 for 2 days</div>
          </div>
          <div className="impact-item">
            <div className="impact-amount">$50</div>
            <div className="impact-description">Supplies clean water for 10 people for a week</div>
          </div>
          <div className="impact-item">
            <div className="impact-amount">$100</div>
            <div className="impact-description">Provides emergency shelter materials for one family</div>
          </div>
          <div className="impact-item">
            <div className="impact-amount">$250</div>
            <div className="impact-description">Funds medical supplies for a rescue team for one week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;