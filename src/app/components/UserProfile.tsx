import { useState } from 'react';
import { User, LogOut, Settings, Award, FileText, TrendingUp, X } from 'lucide-react';

interface UserProfileProps {
  user: { name: string; email: string; phone: string } | null;
  onLogout: () => void;
}

export default function UserProfile({ user, onLogout }: UserProfileProps) {
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
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
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

      {/* Analytics Modal */}
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
