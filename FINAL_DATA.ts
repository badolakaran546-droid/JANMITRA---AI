// ============================================================================
// JAANMITR AI - All Data Types and Mock Data
// File: data.ts
// ============================================================================

export interface InfoItem {
  id: number;
  category: 'Scheme' | 'Job' | 'Tender' | 'Compensation';
  title: string;
  authority: string;
  eligibility: string[];
  location: string;
  benefit?: string;
  deadline?: string;
  description: string;
  tags: string[];
  matchPercentage?: number;
}

export interface UserProfile {
  role: string;
  location: string;
  category: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: InfoItem[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Notification {
  id: number;
  type: 'deadline' | 'new' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const mockData: InfoItem[] = [
  {
    id: 1,
    category: 'Scheme',
    title: 'PM Kisan Samman Nidhi',
    authority: 'Ministry of Agriculture',
    eligibility: ['Farmer', 'Landowner'],
    location: 'National',
    benefit: '₹6,000/year',
    description: 'Direct income support to farmers with landholding. Provides ₹2,000 per installment, three times a year.',
    tags: ['Agriculture', 'Direct Benefit', 'All States'],
  },
  {
    id: 2,
    category: 'Job',
    title: 'Gramin Dak Sevak',
    authority: 'India Post',
    eligibility: ['10th Pass', '18-40 years'],
    location: 'State-wise',
    deadline: '2026-06-15',
    description: 'Postal service jobs in rural areas. Includes delivery, counter services, and administrative work.',
    tags: ['Government', 'Permanent', 'All India'],
  },
  {
    id: 3,
    category: 'Scheme',
    title: 'MGNREGA (100 Days Work)',
    authority: 'Ministry of Rural Development',
    eligibility: ['Rural Resident', 'Adult'],
    location: 'Pan-India',
    benefit: '100 days guaranteed employment',
    description: 'Rural employment guarantee providing at least 100 days of wage employment in a financial year.',
    tags: ['Employment', 'Rural', 'Unskilled Work'],
  },
  {
    id: 4,
    category: 'Tender',
    title: 'Rural Road Construction - Bihar',
    authority: 'Bihar Rural Development Department',
    eligibility: ['Registered Contractor', 'Class B License'],
    location: 'Bihar',
    deadline: '2026-05-20',
    description: 'Construction of 50 km rural roads under PMGSY. Total project value ₹15 crores.',
    tags: ['Infrastructure', 'Construction', 'PMGSY'],
  },
  {
    id: 5,
    category: 'Compensation',
    title: 'Crop Insurance Claim - Kharif 2025',
    authority: 'Agricultural Insurance Company',
    eligibility: ['Farmer', 'Insured Crop'],
    location: 'National',
    benefit: 'Up to ₹50,000',
    deadline: '2026-05-30',
    description: 'Compensation for crop loss due to natural calamities for Kharif season 2025.',
    tags: ['Insurance', 'Natural Disaster', 'Agriculture'],
  },
  {
    id: 6,
    category: 'Job',
    title: 'Anganwadi Worker',
    authority: 'State Women & Child Development',
    eligibility: ['Female', '18-40 years', '8th Pass'],
    location: 'State-wise',
    deadline: '2026-06-01',
    description: 'Community health workers for child nutrition and pre-school education programs.',
    tags: ['Women', 'Healthcare', 'Education'],
  },
  {
    id: 7,
    category: 'Scheme',
    title: 'Pradhan Mantri Awas Yojana',
    authority: 'Ministry of Housing',
    eligibility: ['BPL', 'No House'],
    location: 'National',
    benefit: '₹1.2-2.5 Lakh subsidy',
    description: 'Housing for all scheme providing financial assistance for construction of pucca houses.',
    tags: ['Housing', 'Subsidy', 'Urban & Rural'],
  },
  {
    id: 8,
    category: 'Tender',
    title: 'Solar Panel Installation - Schools',
    authority: 'Rajasthan Energy Department',
    eligibility: ['Renewable Energy Firm', 'ISO Certified'],
    location: 'Rajasthan',
    deadline: '2026-05-25',
    description: 'Installation of solar panels in 100 government schools. Project value ₹8 crores.',
    tags: ['Solar', 'Education', 'Green Energy'],
  },
  {
    id: 9,
    category: 'Job',
    title: 'Junior Engineer (Civil)',
    authority: 'Public Works Department',
    eligibility: ['Diploma/B.Tech Civil', '21-35 years'],
    location: 'Uttar Pradesh',
    deadline: '2026-06-10',
    description: 'Engineering positions for infrastructure development and maintenance projects.',
    tags: ['Engineering', 'Infrastructure', 'Technical'],
  },
  {
    id: 10,
    category: 'Compensation',
    title: 'Flood Relief Assistance',
    authority: 'State Disaster Management',
    eligibility: ['Flood Affected', 'Verified Loss'],
    location: 'Assam, Bihar, UP',
    benefit: '₹10,000-₹95,000',
    deadline: '2026-05-15',
    description: 'Financial assistance for families affected by floods. Compensation based on loss assessment.',
    tags: ['Disaster Relief', 'Emergency', 'Direct Benefit'],
  },
  {
    id: 11,
    category: 'Scheme',
    title: 'National Scholarship Portal',
    authority: 'Ministry of Education',
    eligibility: ['Student', 'SC/ST/OBC', 'Merit Based'],
    location: 'National',
    benefit: '₹10,000-₹50,000/year',
    description: 'Scholarships for students from disadvantaged backgrounds pursuing higher education.',
    tags: ['Education', 'Scholarship', 'Merit'],
  },
  {
    id: 12,
    category: 'Job',
    title: 'Forest Guard Recruitment',
    authority: 'State Forest Department',
    eligibility: ['12th Pass', 'Physical Fitness', '18-30 years'],
    location: 'Madhya Pradesh',
    deadline: '2026-05-28',
    description: 'Recruitment for forest protection and wildlife conservation roles.',
    tags: ['Forestry', 'Conservation', 'Government'],
  },
];

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'deadline',
    title: 'Application Deadline Soon',
    message: 'Gramin Dak Sevak application closes in 3 days',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'new',
    title: 'New Scheme Added',
    message: 'PM Awas Yojana 2026 is now available in your area',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Application Submitted',
    message: 'Your PM Kisan application was successfully submitted',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'info',
    title: 'Document Required',
    message: 'Upload Aadhaar card to complete your profile',
    time: '2 days ago',
    read: true,
  },
];

export const categoryColors = {
  Scheme: { border: '#10b981', bg: '#ecfdf5', text: '#047857' },
  Job: { border: '#3b82f6', bg: '#eff6ff', text: '#1e40af' },
  Tender: { border: '#8b5cf6', bg: '#f5f3ff', text: '#6d28d9' },
  Compensation: { border: '#ef4444', bg: '#fef2f2', text: '#b91c1c' },
};
