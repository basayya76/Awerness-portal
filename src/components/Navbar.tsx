import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  PlusCircle,
  Search,
  BookOpen,
  LifeBuoy,
  Home,
  Info,
  Globe,
  Lock,
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '../utils/translations';

export type NavTab =
  | 'home'
  | 'raise'
  | 'track'
  | 'rights'
  | 'legal-help'
  | 'emergency'
  | 'about'
  | 'admin';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
}) => {
  const { t, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('nav_home'), icon: <Home className="w-4 h-4" /> },
    { id: 'raise', label: t('nav_raise'), icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'track', label: t('nav_track'), icon: <Search className="w-4 h-4" /> },
    { id: 'rights', label: t('nav_rights'), icon: <BookOpen className="w-4 h-4" /> },
    { id: 'legal-help', label: t('nav_legal_help'), icon: <LifeBuoy className="w-4 h-4" /> },
    { id: 'emergency', label: t('nav_emergency'), icon: <Phone className="w-4 h-4" /> },
    { id: 'about', label: t('nav_about'), icon: <Info className="w-4 h-4" /> },
    { id: 'admin', label: t('nav_admin'), icon: <Lock className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
      {/* Top Gov Civic Band */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 text-[11px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-400 tracking-wider">{t('satya_meva_jayate')}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">{t('civic_initiative')}</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex items-center gap-3 text-slate-300">
              <span className="text-slate-400">{t('legal_aid_helpline')}:</span>
              <a href="tel:15100" className="hover:text-amber-400 font-semibold transition-colors">
                15100
              </a>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{t('cyber_hotline')}:</span>
              <a href="tel:1930" className="hover:text-amber-400 font-semibold transition-colors">
                1930
              </a>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{t('emergency_label')}:</span>
              <a href="tel:112" className="hover:text-amber-400 font-semibold transition-colors">
                112
              </a>
            </div>

            {/* Officer Access in Top Civic Band */}
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-amber-400 transition-colors py-0.5 px-1.5 rounded hover:bg-slate-800 cursor-pointer"
              title="Restricted Officer / Admin Access"
            >
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>{t('officer_portal')}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              <Globe className="w-3 h-3 text-amber-400" />
              <select
                aria-label="Select Portal Language"
                value={language}
                onChange={(e) => {
                  const val = e.target.value as SupportedLanguage;
                  setLanguage(val);
                  onLanguageChange(val);
                }}
                className="bg-transparent text-[11px] sm:text-xs text-slate-200 outline-none cursor-pointer"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code} className="bg-slate-900 text-white">
                    {opt.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 border border-blue-400/30 flex items-center justify-center text-2xl shadow-inner shadow-blue-500/20 group-hover:border-amber-400/60 transition-all">
              ⚖
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
                  {t('app_name', 'NYAYA SAHAYA')}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-normal hidden xs:inline">
                {t('tagline')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              if (item.id === 'raise') return null; // We render prominent button separately

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white bg-slate-800 border-b-2 border-amber-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Raise a Complaint & Admin Desk */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Official Grievance Redressal Desk"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('admin_desk')}</span>
            </button>

            <button
              onClick={() => handleNavClick('raise')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                currentTab === 'raise'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                  : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('nav_raise')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('raise')}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white"
            >
              {t('nav_raise', 'Raise')}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Language Selector */}
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80">
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('choose_language', 'Choose Portal Language / भाषा चुनें')}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSelected = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      onLanguageChange(opt.code);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left truncate transition-colors ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {opt.nativeName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1">
            {t('menu_navigation', 'Menu Navigation')}
          </div>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <div className="text-xs text-slate-400 px-3">Direct Citizen Helplines:</div>
            <div className="grid grid-cols-2 gap-2 text-xs px-2">
              <a
                href="tel:15100"
                className="flex items-center justify-center gap-1.5 p-2 rounded bg-slate-800 text-amber-400 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" /> 15100 Legal
              </a>
              <a
                href="tel:1930"
                className="flex items-center justify-center gap-1.5 p-2 rounded bg-slate-800 text-amber-400 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" /> 1930 Cyber
              </a>
              <a
                href="tel:181"
                className="flex items-center justify-center gap-1.5 p-2 rounded bg-slate-800 text-amber-400 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" /> 181 Women
              </a>
              <a
                href="tel:112"
                className="flex items-center justify-center gap-1.5 p-2 rounded bg-slate-800 text-amber-400 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" /> 112 Emergency
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
