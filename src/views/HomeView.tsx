import React, { useState, useMemo } from 'react';
import { NavTab } from '../components/Navbar';
import { COMPLAINT_CATEGORIES, LEGAL_TOPICS } from '../data/legalData';
import { CategoryKey } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  PlusCircle,
  BookOpen,
  LifeBuoy,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  ShoppingBag,
  ShieldAlert,
  HeartHandshake,
  Briefcase,
  Home,
  Scale,
  GraduationCap,
  Users,
  Building2,
  AlertCircle,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: NavTab, params?: { category?: CategoryKey; search?: string }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { t, tCategory } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const exampleSearches = [
    { label: 'Consumer complaint', category: 'Consumer Rights' as CategoryKey },
    { label: 'Cyber fraud', category: 'Cybercrime' as CategoryKey },
    { label: 'Workplace problem', category: 'Labour/Employment' as CategoryKey },
    { label: 'Domestic violence', category: 'Domestic Violence' as CategoryKey },
    { label: 'Property dispute', category: 'Property/Land' as CategoryKey },
    { label: 'Student rights', category: 'Education/Student Rights' as CategoryKey },
    { label: "Women's rights", category: "Women's Rights" as CategoryKey },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('rights', { search: searchQuery.trim() });
    }
  };

  const handleExampleClick = (item: { label: string; category: CategoryKey }) => {
    onNavigate('rights', { category: item.category, search: '' });
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'Consumer Rights': <ShoppingBag className="w-5 h-5 text-blue-600" />,
    'Cybercrime': <ShieldAlert className="w-5 h-5 text-red-600" />,
    "Women's Rights": <HeartHandshake className="w-5 h-5 text-pink-600" />,
    'Domestic Violence': <AlertCircle className="w-5 h-5 text-rose-600" />,
    'Labour/Employment': <Briefcase className="w-5 h-5 text-amber-600" />,
    'Education/Student Rights': <GraduationCap className="w-5 h-5 text-indigo-600" />,
    'Property/Land': <Building2 className="w-5 h-5 text-emerald-600" />,
    'Family Dispute': <Users className="w-5 h-5 text-teal-600" />,
    'Financial Fraud': <ShieldCheck className="w-5 h-5 text-purple-600" />,
    'Government Service': <FileText className="w-5 h-5 text-cyan-600" />,
    'Senior Citizen Rights': <Users className="w-5 h-5 text-amber-700" />,
    'Disability Rights': <HeartHandshake className="w-5 h-5 text-sky-600" />,
    'Housing/Tenancy': <Home className="w-5 h-5 text-orange-600" />,
    'Criminal Matter': <Scale className="w-5 h-5 text-slate-700" />,
    'Other': <FileText className="w-5 h-5 text-slate-500" />,
  };

  const allCategories = Object.keys(COMPLAINT_CATEGORIES) as CategoryKey[];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-850 text-white pt-12 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle National Civic Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-amber-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('hero_badge')}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t('hero_title_1')} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-amber-200">
              {t('hero_title_2')}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Hero Main Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('raise')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-900/40 transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{t('hero_cta_raise')}</span>
            </button>

            <button
              onClick={() => onNavigate('rights')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm sm:text-base transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>{t('hero_cta_rights')}</span>
            </button>

            <button
              onClick={() => onNavigate('track')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm sm:text-base transition-all cursor-pointer"
            >
              <Search className="w-5 h-5 text-sky-400" />
              <span>{t('hero_cta_track')}</span>
            </button>
          </div>

          {/* Large Search Bar */}
          <div className="pt-6 max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative shadow-2xl rounded-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_rights_placeholder')}
                  className="w-full pl-12 pr-28 sm:pr-32 py-4 bg-white text-slate-900 rounded-xl border-2 border-slate-300 focus:border-blue-600 focus:outline-none text-sm sm:text-base shadow-inner placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('search_button')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Quick Search Examples as Requested */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">{t('quick_topic_search')}</span>
              {exampleSearches.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleExampleClick(item)}
                  className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* First-Time User Instructions & Website Keys Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-blue-500/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800/60 pb-5">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center shrink-0 shadow-md text-xl">
                💡
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-semibold mb-1">
                  <span>First-Time User Guide</span>
                  <span>•</span>
                  <span>How To Use Nyaya Sahaya</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Welcome to Nyaya Sahaya — Essential Portal Guide & Key Functions
                </h2>
                <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                  Understand your legal rights, lodge official grievances, track docket progress live, and get free lawyer assistance without confusion.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <span className="text-xs text-blue-200 font-medium hidden sm:inline">Portal Walkthrough</span>
            </div>
          </div>

          {/* Key Functions / Website Keys Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/* Key 1 */}
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-500 text-white font-bold text-xs flex items-center justify-center shadow">
                    1
                  </span>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>Know Your Rights</span>
                  </div>
                </div>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Click any topic (like <strong>Cybercrime</strong>, <strong>Consumer</strong>, or <strong>Workplace</strong>) to read your legal rights in plain language, statutory laws, checklists, and legal remedies.
                </p>
              </div>
              <button
                onClick={() => onNavigate('rights')}
                className="mt-3 text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Legal Rights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key 2 */}
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow">
                    2
                  </span>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <PlusCircle className="w-4 h-4 text-emerald-300" />
                    <span>Raise Complaint</span>
                  </div>
                </div>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Step-by-step grievance wizard that automatically maps your issue to the correct authority, generates an official docket ID (<code>NYA-2026-XXXXXX</code>), and prevents duplicate spam filing.
                </p>
              </div>
              <button
                onClick={() => onNavigate('raise')}
                className="mt-3 text-xs font-semibold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
              >
                <span>File Grievance Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key 3 */}
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 rounded-lg bg-sky-500 text-white font-bold text-xs flex items-center justify-center shadow">
                    3
                  </span>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-sky-300" />
                    <span>Track Complaint</span>
                  </div>
                </div>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Enter your Complaint Reference Number or registered mobile to view live milestone updates, official hearing notices, and authority action orders in real time.
                </p>
              </div>
              <button
                onClick={() => onNavigate('track')}
                className="mt-3 text-xs font-semibold text-sky-300 hover:text-sky-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Check Live Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key 4 */}
            <div className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow">
                    4
                  </span>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <LifeBuoy className="w-4 h-4 text-amber-300" />
                    <span>Free Legal Aid & Emergency</span>
                  </div>
                </div>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Locate government-appointed free legal aid advocates under Constitution Article 39A (NALSA/DLSA), and direct 24x7 toll-free emergency helplines (<strong>112</strong>, <strong>1930</strong>, <strong>181</strong>).
                </p>
              </div>
              <button
                onClick={() => onNavigate('legal-help')}
                className="mt-3 text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Find Free Legal Aid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Tips For Citizens Banner */}
          <div className="mt-5 p-3.5 rounded-xl bg-blue-950/80 border border-blue-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="font-bold text-amber-300 shrink-0">🌐 Mother-Tongue Support:</span>
              <span>
                Use the language switcher on the top bar or inside "Know Your Rights" to view all legal rights in <strong>9 Indian languages</strong> instantly.
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="font-bold text-emerald-400 shrink-0">🔒 Single-Complaint Policy:</span>
              <span>
                To prevent duplicate processing, each citizen can have one active docket per topic.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Civic Statistics Cards (NO INVENTED REAL STATS - AS REQUESTED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Legal Topics */}
          <div
            onClick={() => onNavigate('rights')}
            className="cursor-pointer bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t('card_rights_title')}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('card_rights_desc')}
            </p>
            <div className="mt-3 text-xs font-semibold text-blue-700 group-hover:underline flex items-center gap-1">
              {t('nav_rights')} <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2: Complaint Support */}
          <div
            onClick={() => onNavigate('raise')}
            className="cursor-pointer bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t('card_raise_title')}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('card_raise_desc')}
            </p>
            <div className="mt-3 text-xs font-semibold text-emerald-700 group-hover:underline flex items-center gap-1">
              {t('nav_raise')} <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3: Legal Aid */}
          <div
            onClick={() => onNavigate('legal-help')}
            className="cursor-pointer bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t('card_aid_title')}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('card_aid_desc')}
            </p>
            <div className="mt-3 text-xs font-semibold text-purple-700 group-hover:underline flex items-center gap-1">
              {t('nav_legal_help')} <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 4: Citizen Resources */}
          <div
            onClick={() => onNavigate('track')}
            className="cursor-pointer bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">{t('card_track_title')}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('card_track_desc')}
            </p>
            <div className="mt-3 text-xs font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
              {t('nav_track')} <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {t('process_tag')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              {t('process_heading')}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              {t('process_subheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                  1
                </div>
                <h3 className="font-bold text-base text-white">{t('step1_title')}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {t('step1_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('rights')}
                className="mt-4 text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {t('step1_btn')} <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                  2
                </div>
                <h3 className="font-bold text-base text-white">{t('step2_title')}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {t('step2_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('raise')}
                className="mt-4 text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {t('step2_btn')} <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                  3
                </div>
                <h3 className="font-bold text-base text-white">{t('step3_title')}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {t('step3_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('track')}
                className="mt-4 text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {t('step3_btn')} <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                  4
                </div>
                <h3 className="font-bold text-base text-white">{t('step4_title')}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {t('step4_desc')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('legal-help')}
                className="mt-4 text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {t('step4_btn')} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 15 Legal Categories Quick Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              {t('civic_initiative')}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
              {t('categories_heading')}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t('categories_subheading')}
            </p>
          </div>

          <button
            onClick={() => onNavigate('rights')}
            className="text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{t('hero_cta_rights')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {allCategories.map((catKey) => {
            const meta = COMPLAINT_CATEGORIES[catKey];
            return (
              <div
                key={catKey}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-2.5">
                    {categoryIcons[catKey] || <FileText className="w-4 h-4 text-slate-600" />}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{tCategory(catKey)}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {meta.nextStepSummary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onNavigate('rights', { category: catKey })}
                    className="text-blue-700 hover:text-blue-900 font-medium hover:underline text-[11px] cursor-pointer"
                  >
                    {t('nav_rights')}
                  </button>
                  <button
                    onClick={() => onNavigate('raise', { category: catKey })}
                    className="text-slate-700 hover:text-slate-950 font-semibold flex items-center gap-0.5 text-[11px] cursor-pointer"
                  >
                    <span>{t('nav_raise')}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency & Direct Redressal Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white border border-blue-900/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5" />
                Urgent Citizen Assistance
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Facing an Active Emergency or Immediate Financial Scam?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Do not wait. Dial official national helplines immediately. The first 2 hours are critical for financial cyber fraud and emergency police protection.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:112"
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors"
              >
                <span>Call 112 (Emergency)</span>
              </a>
              <a
                href="tel:1930"
                className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors"
              >
                <span>Call 1930 (Cyber Fraud)</span>
              </a>
              <button
                onClick={() => onNavigate('emergency')}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                View All Emergency Guides
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Official Government Complaint Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="mb-6">
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Official Grievance Systems
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              Direct Access to Government Grievance Portals
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Nyaya Sahaya assists in preparing your case documents before or alongside filing on statutory government portals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            <a
              href="https://edaakhil.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 block">e-Daakhil Portal</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">Consumer Disputes Commission</span>
              </div>
              <div className="mt-2 text-blue-700 font-medium flex items-center gap-1 text-[11px]">
                edaakhil.nic.in <ExternalLink className="w-3 h-3" />
              </div>
            </a>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 block">Cyber Crime Portal</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">Ministry of Home Affairs (I4C)</span>
              </div>
              <div className="mt-2 text-blue-700 font-medium flex items-center gap-1 text-[11px]">
                cybercrime.gov.in <ExternalLink className="w-3 h-3" />
              </div>
            </a>

            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 block">CPGRAMS Portal</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">Central Grievance Redressal</span>
              </div>
              <div className="mt-2 text-blue-700 font-medium flex items-center gap-1 text-[11px]">
                pgportal.gov.in <ExternalLink className="w-3 h-3" />
              </div>
            </a>

            <a
              href="https://nalsa.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 block">NALSA Legal Aid</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">National Legal Services Authority</span>
              </div>
              <div className="mt-2 text-blue-700 font-medium flex items-center gap-1 text-[11px]">
                nalsa.gov.in <ExternalLink className="w-3 h-3" />
              </div>
            </a>

            <a
              href="https://www.tele-law.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 block">Tele-Law</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">Department of Justice, GoI</span>
              </div>
              <div className="mt-2 text-blue-700 font-medium flex items-center gap-1 text-[11px]">
                tele-law.in <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
