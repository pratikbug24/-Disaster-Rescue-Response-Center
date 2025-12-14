export const disasters = [
  {
    id: 1,
    type: 'Earthquake',
    location: 'San Francisco, CA',
    coordinates: [37.7749, -122.4194],
    severity: 'High',
    status: 'Active',
    affectedPeople: 15000,
    description: 'Magnitude 6.8 earthquake struck the Bay Area',
    timestamp: '2025-12-14T06:30:00Z',
    emergencyContacts: ['911', '1-800-RED-CROSS']
  },
  {
    id: 2,
    type: 'Wildfire',
    location: 'Los Angeles, CA',
    coordinates: [34.0522, -118.2437],
    severity: 'Critical',
    status: 'Active',
    affectedPeople: 8500,
    description: 'Large wildfire spreading rapidly through residential areas',
    timestamp: '2025-12-14T04:15:00Z',
    emergencyContacts: ['911', 'CAL FIRE: 1-877-881-3473']
  },
  {
    id: 3,
    type: 'Flood',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    severity: 'Medium',
    status: 'Monitoring',
    affectedPeople: 3200,
    description: 'Heavy rainfall causing flash floods in downtown area',
    timestamp: '2025-12-14T02:45:00Z',
    emergencyContacts: ['911', 'Harris County Emergency: 713-881-3100']
  }
];

export const rescueTeams = [
  {
    id: 1,
    name: 'Alpha Rescue Unit',
    location: 'San Francisco, CA',
    coordinates: [37.7849, -122.4094],
    status: 'Active',
    specialization: 'Urban Search & Rescue',
    members: 12,
    equipment: ['Heavy machinery', 'Medical supplies', 'Communication gear'],
    contact: 'alpha-rescue@emergency.gov'
  },
  {
    id: 2,
    name: 'Fire Response Team Beta',
    location: 'Los Angeles, CA',
    coordinates: [34.0622, -118.2537],
    status: 'Deployed',
    specialization: 'Wildfire Suppression',
    members: 18,
    equipment: ['Fire trucks', 'Aerial support', 'Protective gear'],
    contact: 'beta-fire@emergency.gov'
  },
  {
    id: 3,
    name: 'Water Rescue Delta',
    location: 'Houston, TX',
    coordinates: [29.7704, -95.3598],
    status: 'Standby',
    specialization: 'Water Rescue & Evacuation',
    members: 8,
    equipment: ['Boats', 'Life vests', 'Pumping equipment'],
    contact: 'delta-water@emergency.gov'
  }
];

export const safeZones = [
  {
    id: 1,
    name: 'Golden Gate Park Emergency Center',
    location: 'San Francisco, CA',
    coordinates: [37.7694, -122.4862],
    capacity: 5000,
    currentOccupancy: 1200,
    facilities: ['Medical station', 'Food distribution', 'Shelter', 'Communication center'],
    status: 'Open'
  },
  {
    id: 2,
    name: 'Dodger Stadium Relief Center',
    location: 'Los Angeles, CA',
    coordinates: [34.0739, -118.2400],
    capacity: 8000,
    currentOccupancy: 2800,
    facilities: ['Large shelter', 'Medical facility', 'Pet care', 'Food services'],
    status: 'Open'
  },
  {
    id: 3,
    name: 'NRG Stadium Emergency Hub',
    location: 'Houston, TX',
    coordinates: [29.6847, -95.4107],
    capacity: 12000,
    currentOccupancy: 800,
    facilities: ['Massive shelter', 'Hospital wing', 'Supply distribution', 'Family reunification'],
    status: 'Open'
  }
];

export const sosAlerts = [
  {
    id: 1,
    location: 'Downtown SF, Building 425',
    coordinates: [37.7849, -122.4094],
    priority: 'Critical',
    status: 'Pending',
    message: 'Trapped in collapsed building, 3 people injured',
    timestamp: '2025-12-14T07:15:00Z',
    reportedBy: 'Anonymous'
  },
  {
    id: 2,
    location: 'Malibu Hills Residence',
    coordinates: [34.0259, -118.7798],
    priority: 'High',
    status: 'In Progress',
    message: 'Family of 4 surrounded by fire, need immediate evacuation',
    timestamp: '2025-12-14T06:45:00Z',
    reportedBy: 'John Smith'
  },
  {
    id: 3,
    location: 'Bayou Area, House 123',
    coordinates: [29.7304, -95.3698],
    priority: 'Medium',
    status: 'Resolved',
    message: 'Elderly person needs medical assistance due to flooding',
    timestamp: '2025-12-14T05:30:00Z',
    reportedBy: 'Maria Garcia'
  }
];

export const emergencyGuides = [
  {
    id: 1,
    title: 'Earthquake Safety Guide',
    type: 'Earthquake',
    steps: [
      'Drop to your hands and knees',
      'Take cover under a sturdy desk or table',
      'Hold on to your shelter and protect your head',
      'Stay away from windows and heavy objects',
      'If outdoors, move away from buildings and power lines',
      'After shaking stops, check for injuries and hazards'
    ],
    emergencyKit: ['Water (1 gallon per person per day)', 'Non-perishable food', 'Flashlight', 'First aid kit', 'Radio', 'Medications']
  },
  {
    id: 2,
    title: 'Wildfire Evacuation Guide',
    type: 'Wildfire',
    steps: [
      'Listen to emergency broadcasts for evacuation orders',
      'Gather important documents and medications',
      'Wear protective clothing and N95 masks',
      'Close all windows and doors',
      'Turn off gas, electricity, and water',
      'Follow designated evacuation routes only'
    ],
    emergencyKit: ['Go-bag with essentials', 'Important documents', 'Cash', 'Phone chargers', 'Medications', 'Pet supplies']
  },
  {
    id: 3,
    title: 'Flood Safety Procedures',
    type: 'Flood',
    steps: [
      'Move to higher ground immediately',
      'Avoid walking or driving through flood waters',
      'Stay away from downed power lines',
      'Listen to emergency broadcasts',
      'Do not return home until authorities say it\'s safe',
      'Document damage with photos for insurance'
    ],
    emergencyKit: ['Waterproof containers', 'Battery-powered radio', 'Flashlight', 'First aid supplies', 'Whistle', 'Emergency blankets']
  }
];

export const donationCategories = [
  {
    id: 1,
    name: 'Emergency Relief Fund',
    description: 'Direct financial assistance for immediate disaster response',
    target: 100000,
    raised: 67500,
    urgency: 'Critical'
  },
  {
    id: 2,
    name: 'Medical Supplies',
    description: 'First aid kits, medications, and medical equipment',
    target: 50000,
    raised: 32000,
    urgency: 'High'
  },
  {
    id: 3,
    name: 'Food & Water',
    description: 'Non-perishable food items and clean drinking water',
    target: 75000,
    raised: 45000,
    urgency: 'High'
  },
  {
    id: 4,
    name: 'Shelter & Clothing',
    description: 'Temporary housing materials and warm clothing',
    target: 60000,
    raised: 28000,
    urgency: 'Medium'
  }
];