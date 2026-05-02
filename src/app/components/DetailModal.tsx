import { X, Calendar, MapPin, CheckCircle, ExternalLink, Bookmark } from 'lucide-react';
import { InfoItem } from '../data/mockData';

interface DetailModalProps {
  item: InfoItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number) => void;
  isSaved: boolean;
}

const categoryColors = {
  Scheme: { bg: '#ecfdf5', text: '#047857', border: '#10b981' },
  Job: { bg: '#eff6ff', text: '#1e40af', border: '#3b82f6' },
  Tender: { bg: '#f5f3ff', text: '#6d28d9', border: '#8b5cf6' },
  Compensation: { bg: '#fef2f2', text: '#b91c1c', border: '#ef4444' },
};

export default function DetailModal({ item, isOpen, onClose, onSave, isSaved }: DetailModalProps) {
  if (!isOpen || !item) return null;

  const colors = categoryColors[item.category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div
          className="sticky top-0 bg-gradient-to-r p-6 border-b-4"
          style={{ borderBottomColor: colors.border }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mb-3"
                style={{ backgroundColor: colors.bg, color: colors.text }}
              >
                {item.category}
              </span>
              <h2 className="mb-2">{item.title}</h2>
              <p className="opacity-70">{item.authority}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onSave(item.id)}
                className={`p-3 rounded-xl transition-all hover:scale-110 ${
                  isSaved ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-700'
                }`}
              >
                <Bookmark
                  className="w-6 h-6"
                  fill={isSaved ? '#3b82f6' : 'none'}
                  stroke={isSaved ? '#3b82f6' : 'currentColor'}
                />
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-white dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Location</span>
              </div>
              <p>{item.location}</p>
            </div>

            {item.deadline && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Deadline</span>
                </div>
                <p>{item.deadline}</p>
              </div>
            )}
          </div>

          {item.benefit && (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-green-800">Benefit</h3>
              </div>
              <p className="font-semibold text-green-900">{item.benefit}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-3">Description</h3>
            <p className="leading-relaxed opacity-80">{item.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-3">Eligibility Criteria</h3>
            <div className="space-y-2">
              {item.eligibility.map((criteria, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          {item.matchPercentage && item.matchPercentage > 0 && (
            <div className="mb-6">
              <h3 className="mb-3">Your Eligibility Match</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Match Score</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {item.matchPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                    style={{ width: `${item.matchPercentage}%` }}
                  />
                </div>
                <p className="text-sm opacity-70 mt-2">
                  {item.matchPercentage >= 75
                    ? 'Highly Eligible - Great match for you!'
                    : item.matchPercentage >= 50
                    ? 'Moderately Eligible - You may qualify'
                    : 'Check eligibility criteria carefully'}
                </p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
            Apply Now
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
