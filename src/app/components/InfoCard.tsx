import { Bookmark, ExternalLink, Calendar, MapPin, CircleCheck } from 'lucide-react';
import { InfoItem } from '../data/mockData';

interface InfoCardProps {
  item: InfoItem;
  onSave: (id: number) => void;
  isSaved: boolean;
  onViewDetails: (item: InfoItem) => void;
}

const categoryColors = {
  Scheme: { border: '#10b981', bg: '#ecfdf5', text: '#047857' },
  Job: { border: '#3b82f6', bg: '#eff6ff', text: '#1e40af' },
  Tender: { border: '#8b5cf6', bg: '#f5f3ff', text: '#6d28d9' },
  Compensation: { border: '#ef4444', bg: '#fef2f2', text: '#b91c1c' },
};

export default function InfoCard({ item, onSave, isSaved, onViewDetails }: InfoCardProps) {
  const colors = categoryColors[item.category];

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl border-l-4 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
      style={{ borderLeftColor: colors.border }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {item.category}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave(item.id);
            }}
            className={`p-2 rounded-lg transition-all hover:scale-110 ${
              isSaved ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="Save for later"
          >
            <Bookmark
              className="w-5 h-5"
              fill={isSaved ? '#3b82f6' : 'none'}
              stroke={isSaved ? '#3b82f6' : 'currentColor'}
            />
          </button>
        </div>

        <h3 className="mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
        <p className="text-sm opacity-70 mb-4">{item.authority}</p>

        <p className="text-sm mb-4 line-clamp-2">{item.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-xs opacity-80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm opacity-70">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">{item.location}</span>
          </div>
          {item.deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">{item.deadline}</span>
            </div>
          )}
        </div>

        {item.benefit && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <CircleCheck className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">{item.benefit}</span>
            </div>
          </div>
        )}

        {item.matchPercentage && item.matchPercentage > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs opacity-70">Eligibility Match</span>
              <span className="text-xs font-semibold">{item.matchPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                style={{ width: `${item.matchPercentage}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => onViewDetails(item)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          View Details
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
