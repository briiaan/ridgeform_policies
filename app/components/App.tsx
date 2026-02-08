import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import ridgeformLogo from '/ridgeform_logo.svg';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { CookiePolicy } from './CookiePolicy';

export type Tab = 'privacy' | 'terms' | 'cookies';

type AppProps = {
  tab?: Tab;
};

export default function App({ tab }: AppProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial tab from URL path, prop, or default to 'privacy'
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    // 1. From prop (SSR)
    if (tab) return tab;

    // 2. From URL path on client
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.split('/')[1]; // "/terms" -> "terms"
      if (path === 'privacy' || path === 'terms' || path === 'cookies') return path as Tab;
    }

    // 3. Default to 'privacy'
    return 'privacy';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Update document title on tab change
  useEffect(() => {
    const titles: Record<Tab, string> = {
      privacy: 'Privacy Policy | Ridgeform Construction',
      terms: 'Terms of Service | Ridgeform Construction',
      cookies: 'Cookie Policy | Ridgeform Construction',
    };
    document.title = titles[activeTab];
  }, [activeTab]);

  // Save tab to localStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // Update URL without reloading
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`, { replace: true }); // Updates URL without reloading
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <img src={ridgeformLogo} alt="Ridgeform Construction Logo" className="h-10" />
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Dropdown */}
          <div className="md:hidden py-4">
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => handleTabClick(e.target.value as Tab)}
                className="appearance-none block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-[#222A34] focus:outline-none focus:ring-2 focus:ring-[#222A34] focus:border-[#222A34]"
              >
                <option value="privacy">Privacy Policy</option>
                <option value="terms">Terms of Service</option>
                <option value="cookies">Cookie Policy</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex space-x-8" aria-label="Tabs">
            {['privacy', 'terms', 'cookies'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTabClick(t as Tab)}
                className={`py-4 px-1 border-b-2 transition-colors cursor-pointer ${
                  activeTab === t ? 'border-[#222A34] text-[#222A34]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t === 'privacy' ? 'Privacy Policy' : t === 'terms' ? 'Terms of Service' : 'Cookie Policy'}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {activeTab === 'privacy' && <PrivacyPolicy />}
          {activeTab === 'terms' && <TermsOfService />}
          {activeTab === 'cookies' && <CookiePolicy />}
        </div>
      </main>

          {/* Footer */}
      <footer className="bg-[#222A34] text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Ridgeform Construction. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
            {(['privacy', 'terms', 'cookies'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => handleTabClick(t)}
                  className="text-gray-300 hover:text-white text-sm transition-colors cursor-pointer"
                >
                  {t === 'privacy' ? 'Privacy Policy' : t === 'terms' ? 'Terms of Service' : 'Cookie Policy'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
