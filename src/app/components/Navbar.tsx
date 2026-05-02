import { Search, Bookmark, Menu } from 'lucide-react';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';
import NotificationCenter from './NotificationCenter';
import UserProfile from './UserProfile';
import VoiceSearch from './VoiceSearch';

interface NavbarProps {
  onSearchClick: () => void;
  onBookmarksClick: () => void;
  savedCount: number;
  user: { name: string; email: string; phone: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onVoiceSearch: (text: string) => void;
}

export default function Navbar({
  onSearchClick,
  onBookmarksClick,
  savedCount,
  user,
  onLoginClick,
  onLogout,
  onVoiceSearch
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🤖</span>
              </div>
              <span className="font-semibold tracking-tight">JAANMITR AI</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#schemes" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Schemes</a>
              <a href="#jobs" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Jobs</a>
              <a href="#tenders" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Tenders</a>
              <a href="#compensation" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Compensation</a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <VoiceSearch onResult={onVoiceSearch} />

            <button
              onClick={onSearchClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onBookmarksClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <NotificationCenter />

            <LanguageSelector />

            <DarkModeToggle />

            {user ? (
              <UserProfile user={user} onLogout={onLogout} />
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden sm:block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <a href="#schemes" className="block py-2 text-sm opacity-80 hover:opacity-100">Schemes</a>
            <a href="#jobs" className="block py-2 text-sm opacity-80 hover:opacity-100">Jobs</a>
            <a href="#tenders" className="block py-2 text-sm opacity-80 hover:opacity-100">Tenders</a>
            <a href="#compensation" className="block py-2 text-sm opacity-80 hover:opacity-100">Compensation</a>
            {!user && (
              <button
                onClick={onLoginClick}
                className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
