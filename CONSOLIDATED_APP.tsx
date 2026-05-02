// ============================================================================
// JAANMITR AI - Complete Application (All Components Consolidated)
// File: App.tsx
// ============================================================================

import { useState, useEffect, useRef } from 'react';
import {
  Search, Bookmark, Menu, Mic, MicOff, Volume2, Languages, Check,
  Sun, Moon, Bell, X, Calendar, AlertCircle, CheckCircle, Info,
  User as UserIcon, LogOut, Settings, Award, FileText, TrendingUp,
  ChevronRight, MapPin, Briefcase, MessageCircle, Bot, Send,
  Sparkles, Sprout, Building2, DollarSign, ExternalLink, Mail,
  Lock, Eye, EyeOff, Phone, MessageSquare
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface InfoItem {
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

interface UserProfile {
  role: string;
  location: string;
  category: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: InfoItem[];
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface Notification {
  id: number;
  type: 'deadline' | 'new' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData: InfoItem[] = [
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

const languages: Language[] = [
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

const mockNotifications: Notification[] = [
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

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('darkMode', String(newDark));

    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const handleSelect = (lang: Language) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
        aria-label="Select Language"
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm hidden sm:inline">{selectedLang.flag}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-72 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold">Select Language</h4>
              <p className="text-xs opacity-70 mt-1">Choose your preferred language</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{lang.name}</div>
                      <div className="text-sm opacity-70">{lang.nativeName}</div>
                    </div>
                  </div>
                  {selectedLang.code === lang.code && (
                    <Check className="w-5 h-5 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function VoiceSearch({ onResult }: { onResult: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setIsListening(true);
    setTimeout(() => {
      const sampleQueries = [
        'Show me farming schemes in Bihar',
        'Government jobs for engineers',
        'Student scholarships',
        'Housing schemes',
        'PM Kisan Yojana details',
      ];
      const result = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      onResult(result);
      setIsListening(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={isListening ? () => setIsListening(false) : startListening}
        className={`p-3 rounded-xl transition-all ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
        }`}
        aria-label="Voice Search"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {isListening && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-64">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-sm font-medium">Listening...</span>
          </div>
          <div className="flex gap-1">
            <div className="h-8 w-1 bg-blue-500 rounded-full animate-pulse" />
            <div className="h-8 w-1 bg-purple-500 rounded-full animate-pulse [animation-delay:0.2s]" />
            <div className="h-8 w-1 bg-pink-500 rounded-full animate-pulse [animation-delay:0.4s]" />
            <div className="h-8 w-1 bg-blue-500 rounded-full animate-pulse [animation-delay:0.6s]" />
          </div>
          <p className="text-xs opacity-70 mt-2">Speak now in Hindi or English...</p>
        </div>
      )}
    </div>
  );
}

function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'new':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-96 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Notifications</h4>
                <p className="text-xs opacity-70">{unreadCount} unread</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`w-full p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                    !notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-semibold text-sm">{notif.title}</h5>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-sm opacity-70 mb-1">{notif.message}</p>
                      <p className="text-xs opacity-50">{notif.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function UserProfile({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);

  if (!user) return null;

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="User Profile"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 z-50 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm opacity-90">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-lg p-2 text-center">
                    <div className="font-bold">12</div>
                    <div className="text-xs opacity-90">Applications</div>
                  </div>
                  <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-lg p-2 text-center">
                    <div className="font-bold">5</div>
                    <div className="text-xs opacity-90">Approved</div>
                  </div>
                  <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-lg p-2 text-center">
                    <div className="font-bold">85%</div>
                    <div className="text-xs opacity-90">Match</div>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={() => {
                    setShowStats(true);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3"
                >
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span>View Analytics</span>
                </button>

                <button className="w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span>My Applications</span>
                </button>

                <button className="w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span>Achievements</span>
                </button>

                <button className="w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

                <button
                  onClick={onLogout}
                  className="w-full px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-3 text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showStats && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setShowStats(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2>Your Analytics</h2>
              <button
                onClick={() => setShowStats(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6">
                <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-sm opacity-70">Total Applications</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6">
                <Award className="w-8 h-8 text-green-500 mb-2" />
                <div className="text-3xl font-bold mb-1">5</div>
                <div className="text-sm opacity-70">Approved</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6">
                <FileText className="w-8 h-8 text-purple-500 mb-2" />
                <div className="text-3xl font-bold mb-1">3</div>
                <div className="text-sm opacity-70">Pending Review</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3>Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { title: 'PM Kisan Samman Nidhi', status: 'Approved', date: '2 days ago', color: 'green' },
                  { title: 'Gramin Dak Sevak', status: 'Under Review', date: '5 days ago', color: 'yellow' },
                  { title: 'Scholarship Application', status: 'Approved', date: '1 week ago', color: 'green' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm opacity-70">{item.date}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// MAIN COMPONENTS (Continue in next part due to length)
// ============================================================================

// To be continued...
export default function App() {
  return <div>App Component - See CONSOLIDATED_DATA.ts and CONSOLIDATED_STYLES.css</div>;
}
