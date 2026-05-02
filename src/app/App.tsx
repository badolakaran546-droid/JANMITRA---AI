import { useState, useEffect } from 'react';
import OnboardingWizard from './components/OnboardingWizard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryTabs from './components/CategoryTabs';
import InfoCard from './components/InfoCard';
import SearchModal from './components/SearchModal';
import DetailModal from './components/DetailModal';
import AIChatbot from './components/AIChatbot';
import LoginModal from './components/LoginModal';
import { mockData, InfoItem } from './data/mockData';

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

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<InfoItem | null>(null);
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedItems');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }

    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
      setShowOnboarding(false);
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowOnboarding(false);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleVoiceSearch = (text: string) => {
    setSearchOpen(true);
    // The search modal would use this text
  };

  const handleSaveItem = (id: number) => {
    const newSaved = savedItems.includes(id)
      ? savedItems.filter(itemId => itemId !== id)
      : [...savedItems, id];
    setSavedItems(newSaved);
    localStorage.setItem('savedItems', JSON.stringify(newSaved));
  };

  const calculateMatchPercentage = (item: InfoItem): number => {
    if (!userProfile) return 0;

    let matches = 0;
    const criteria: string[] = [];

    if (userProfile.role === 'farmer' && item.eligibility.some(e => e.toLowerCase().includes('farmer'))) {
      matches++;
      criteria.push('role');
    }
    if (userProfile.role === 'student' && item.eligibility.some(e => e.toLowerCase().includes('student'))) {
      matches++;
      criteria.push('role');
    }
    if (item.location.toLowerCase().includes(userProfile.location.toLowerCase()) ||
        item.location.toLowerCase() === 'national' ||
        item.location.toLowerCase() === 'pan-india') {
      matches++;
      criteria.push('location');
    }
    if (item.tags.some(tag => tag.toLowerCase().includes(userProfile.category)) ||
        userProfile.category === 'all') {
      matches++;
      criteria.push('category');
    }

    const maxCriteria = 3;
    return Math.round((matches / maxCriteria) * 100);
  };

  const getFilteredData = (): InfoItem[] => {
    let filtered = mockData;

    if (showBookmarks) {
      filtered = filtered.filter(item => savedItems.includes(item.id));
    } else if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    return filtered.map(item => ({
      ...item,
      matchPercentage: calculateMatchPercentage(item),
    })).sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  };

  if (showOnboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar
        onSearchClick={() => setSearchOpen(true)}
        onBookmarksClick={() => {
          setShowBookmarks(!showBookmarks);
          setActiveCategory('all');
        }}
        savedCount={savedItems.length}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        onVoiceSearch={handleVoiceSearch}
      />

      <Hero userName={userProfile?.role ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) : undefined} />

      {!showBookmarks && (
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setShowBookmarks(false);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {showBookmarks && (
          <div className="mb-6">
            <h2 className="mb-2">Saved Items ({savedItems.length})</h2>
            <p className="opacity-70">Your bookmarked schemes, jobs, tenders, and compensation programs</p>
          </div>
        )}

        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="mb-2">No items found</h3>
            <p className="opacity-70">
              {showBookmarks
                ? 'You haven\'t saved any items yet'
                : 'Try selecting a different category'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <InfoCard
                key={item.id}
                item={item}
                onSave={handleSaveItem}
                isSaved={savedItems.includes(item.id)}
                onViewDetails={setDetailItem}
              />
            ))}
          </div>
        )}
      </div>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        data={mockData}
        onSelectItem={setDetailItem}
      />

      <DetailModal
        item={detailItem}
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        onSave={handleSaveItem}
        isSaved={detailItem ? savedItems.includes(detailItem.id) : false}
      />

      <AIChatbot
        data={mockData}
        onSelectItem={setDetailItem}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}