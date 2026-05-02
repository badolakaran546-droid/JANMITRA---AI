import { Sparkles } from 'lucide-react';

interface HeroProps {
  userName?: string;
}

export default function Hero({ userName }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Personalized for you</span>
          </div>

          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {userName ? `Welcome back, ${userName}` : 'JAANMITR AI - Your Smart Assistant'}
          </h1>

          <p className="max-w-2xl mx-auto opacity-70 mb-8">
            AI-powered platform connecting you to schemes, jobs, tenders, and compensation programs.
            Personalized government opportunities, intelligently matched to your profile.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex-1 min-w-[200px] max-w-[250px]">
              <div className="text-4xl mb-2">🌾</div>
              <div className="font-semibold text-green-600">500+ Schemes</div>
              <p className="text-sm opacity-70">Welfare Programs</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex-1 min-w-[200px] max-w-[250px]">
              <div className="text-4xl mb-2">💼</div>
              <div className="font-semibold text-blue-600">1000+ Jobs</div>
              <p className="text-sm opacity-70">Government Openings</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex-1 min-w-[200px] max-w-[250px]">
              <div className="text-4xl mb-2">🏗️</div>
              <div className="font-semibold text-purple-600">200+ Tenders</div>
              <p className="text-sm opacity-70">Business Opportunities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
    </div>
  );
}
