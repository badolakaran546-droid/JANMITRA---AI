import { useState } from 'react';
import { ChevronRight, MapPin, Briefcase, User } from 'lucide-react';

interface UserProfile {
  role: string;
  location: string;
  category: string;
}

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    role: '',
    location: '',
    category: '',
  });

  const roles = [
    { id: 'farmer', label: 'Farmer', icon: '🌾' },
    { id: 'student', label: 'Student', icon: '🎓' },
    { id: 'worker', label: 'Worker', icon: '👷' },
    { id: 'contractor', label: 'Contractor', icon: '🏗️' },
    { id: 'jobseeker', label: 'Job Seeker', icon: '💼' },
    { id: 'other', label: 'Other', icon: '👤' },
  ];

  const states = [
    'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Tamil Nadu',
    'Uttar Pradesh', 'West Bengal', 'All India'
  ];

  const categories = [
    { id: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'employment', label: 'Employment', icon: '💼' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { id: 'healthcare', label: 'Healthcare', icon: '⚕️' },
    { id: 'all', label: 'All Categories', icon: '✨' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="mb-2">Welcome to JAANMITR AI</h1>
          <p className="opacity-70">Your AI-powered government information assistant</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    step >= s
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <User className="w-6 h-6 text-blue-500" />
                <h2>Who are you?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setProfile({ ...profile, role: role.id })}
                    className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                      profile.role === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{role.icon}</div>
                    <div className="font-medium">{role.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-blue-500" />
                <h2>Where are you from?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {states.map((state) => (
                  <button
                    key={state}
                    onClick={() => setProfile({ ...profile, location: state })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      profile.location === state
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-6 h-6 text-blue-500" />
                <h2>What interests you most?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setProfile({ ...profile, category: category.id })}
                    className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                      profile.category === category.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <div className="font-medium text-sm">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !profile.role) ||
              (step === 2 && !profile.location) ||
              (step === 3 && !profile.category)
            }
            className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {step === 3 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
