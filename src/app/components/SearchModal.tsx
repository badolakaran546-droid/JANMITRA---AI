import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { InfoItem } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InfoItem[];
  onSelectItem: (item: InfoItem) => void;
}

export default function SearchModal({ isOpen, onClose, data, onSelectItem }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredResults = data.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    item.authority.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes, jobs, tenders..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4">
          {query === '' ? (
            <div className="text-center py-12 opacity-70">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search...</p>
              <p className="text-sm mt-2">Try: "Kisan", "Naukri", "Housing"</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-2">
              {filteredResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-blue-600">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm opacity-70 line-clamp-1">{item.description}</p>
                      <div className="flex gap-2 mt-2">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 opacity-70">
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
