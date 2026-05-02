import { Sprout, Briefcase, Building2, DollarSign, Sparkles } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'For You', icon: Sparkles, color: 'from-blue-500 to-purple-600' },
  { id: 'Scheme', label: 'Schemes', icon: Sprout, color: 'from-green-500 to-emerald-600' },
  { id: 'Job', label: 'Jobs', icon: Briefcase, color: 'from-blue-500 to-cyan-600' },
  { id: 'Tender', label: 'Tenders', icon: Building2, color: 'from-purple-500 to-violet-600' },
  { id: 'Compensation', label: 'Compensation', icon: DollarSign, color: 'from-red-500 to-orange-600' },
];

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-14 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
