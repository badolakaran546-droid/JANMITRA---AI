import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Phone, MessageSquare } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string; phone: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'otp') {
      // OTP verification
      onLogin({
        name: formData.name || 'User',
        email: formData.email,
        phone: formData.phone,
      });
      onClose();
    } else {
      // Regular login/signup
      onLogin({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone,
      });
      onClose();
    }
  };

  const handleSocialLogin = (provider: string) => {
    onLogin({
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      phone: '+91 98765 43210',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="mb-1">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Verify OTP'}
              </h2>
              <p className="text-sm opacity-70">
                {mode === 'login'
                  ? 'Sign in to access your personalized dashboard'
                  : mode === 'signup'
                  ? 'Join thousands using JAANMITR AI'
                  : 'Enter the OTP sent to your phone'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {mode !== 'otp' && (
            <>
              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 hover:border-blue-500 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </button>

                <button
                  onClick={() => handleSocialLogin('Aadhaar')}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl py-3 hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <span className="font-medium">Login with Aadhaar</span>
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm mb-2 opacity-70">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            )}

            {mode === 'otp' ? (
              <div>
                <label className="block text-sm mb-2 opacity-70 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  OTP Code
                </label>
                <input
                  type="text"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center text-2xl tracking-widest"
                  required
                />
                <p className="text-xs opacity-70 mt-2 text-center">
                  Didn't receive? <button type="button" className="text-blue-500 hover:underline">Resend OTP</button>
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm mb-2 opacity-70 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="+91"
                      disabled
                      className="w-16 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-3 text-center"
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="98765 43210"
                      className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 opacity-70 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 opacity-70 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
                      className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all mt-6"
            >
              {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Verify & Continue'}
            </button>
          </form>

          {mode !== 'otp' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-sm text-blue-500 hover:underline"
              >
                {mode === 'login'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setMode('otp')}
                className="text-sm text-purple-500 hover:underline"
              >
                Login with OTP instead
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
