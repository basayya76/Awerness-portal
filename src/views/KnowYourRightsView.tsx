import React, { useState, useMemo } from 'react';
import { CategoryKey } from '../types';
import {
  LEGAL_TOPICS,
  LEGAL_GLOSSARY,
  COMPLAINT_CATEGORIES,
} from '../data/legalData';
import {
  getLocalizedLegalTopics,
  getLocalizedLegalGlossary,
} from '../data/legalTopicsTranslations';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGE_OPTIONS } from '../utils/translations';
import {
  BookOpen,
  Search,
  Scale,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  ShoppingBag,
  ShieldAlert,
  HeartHandshake,
  Briefcase,
  Home,
  GraduationCap,
  Users,
  PlusCircle,
  BookMarked,
  Globe,
  Languages,
} from 'lucide-react';

interface KnowYourRightsViewProps {
  initialCategory?: CategoryKey;
  initialSearch?: string;
  onFileComplaint: (category: CategoryKey) => void;
}

export const KnowYourRightsView: React.FC<KnowYourRightsViewProps> = ({
  initialCategory,
  initialSearch = '',
  onFileComplaint,
}) => {
  const { language, setLanguage, t, tCategory } = useLanguage();
  const [activeTab, setActiveTab] = useState<'guides' | 'glossary'>('guides');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'ALL');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  // Sync state whenever props change (e.g. user clicked a topic or example search from Home page)
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const allCategories = Object.keys(COMPLAINT_CATEGORIES) as CategoryKey[];

  const localizedTopics = useMemo(
    () => getLocalizedLegalTopics(language),
    [language]
  );

  const localizedGlossary = useMemo(
    () => getLocalizedLegalGlossary(language),
    [language]
  );

  const filteredTopics = useMemo(() => {
    return localizedTopics.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'ALL' || topic.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const originalEng = LEGAL_TOPICS.find((t) => t.id === topic.id);

      // Check category name in English and localized
      const matchesCategoryName =
        topic.category.toLowerCase().includes(q) ||
        (originalEng && originalEng.category.toLowerCase().includes(q));

      // Check words individually for forgiving multi-word matching
      const words = q.split(/\s+/).filter(Boolean);

      return (
        topic.title.toLowerCase().includes(q) ||
        topic.shortDescription.toLowerCase().includes(q) ||
        topic.primaryLaw.toLowerCase().includes(q) ||
        topic.keyRights.some((r) => r.toLowerCase().includes(q)) ||
        matchesCategoryName ||
        words.some((w) =>
          topic.title.toLowerCase().includes(w) ||
          topic.category.toLowerCase().includes(w)
        ) ||
        (originalEng && (
          originalEng.title.toLowerCase().includes(q) ||
          originalEng.shortDescription.toLowerCase().includes(q) ||
          originalEng.primaryLaw.toLowerCase().includes(q) ||
          originalEng.keyRights.some((r) => r.toLowerCase().includes(q)) ||
          words.some((w) =>
            originalEng.title.toLowerCase().includes(w) ||
            originalEng.category.toLowerCase().includes(w)
          )
        ))
      );
    });
  }, [localizedTopics, selectedCategory, searchQuery]);

  // If filtered topics has exactly 1 match (e.g. navigated to Cybercrime), automatically expand it!
  React.useEffect(() => {
    if (filteredTopics.length === 1 && !expandedTopicId) {
      setExpandedTopicId(filteredTopics[0].id);
    }
  }, [filteredTopics, expandedTopicId]);

  const filteredGlossary = useMemo(() => {
    if (!searchQuery.trim()) return localizedGlossary;
    const q = searchQuery.toLowerCase().trim();
    return localizedGlossary.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        (g.hindiTerm && g.hindiTerm.toLowerCase().includes(q)) ||
        g.simplifiedMeaning.toLowerCase().includes(q) ||
        g.practicalExample.toLowerCase().includes(q)
    );
  }, [localizedGlossary, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedTopicId(expandedTopicId === id ? null : id);
  };

  const currentLangOption = LANGUAGE_OPTIONS.find((l) => l.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* View Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('rights_badge', 'Citizen Legal Literacy')}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('rights_current_lang', 'Reading in:')} <strong className="text-blue-900">{currentLangOption.nativeName}</strong></span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('rights_page_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {t('rights_page_subtitle')}
        </p>
      </div>

      {/* Prominent Quick Mother-Tongue Language Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-lg border border-blue-800/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-amber-300">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                <span>{t('rights_read_in_native', 'Read Legal Rights In Your Own Language')}</span>
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  9 Languages
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {t('rights_lang_hint', 'Click any language below to translate all laws, rights, remedy steps, and legal terms instantly.')}
              </p>
            </div>
          </div>
        </div>

        {/* 9 Language Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {LANGUAGE_OPTIONS.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow-md shadow-amber-400/30 font-bold scale-105 ring-2 ring-amber-300/60'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10'
                }`}
              >
                <span>{lang.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Sub-navigation Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'guides'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('rights_guides_tab', 'Legal Rights Guides')} ({localizedTopics.length})
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'glossary'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('rights_legal_glossary_title', 'Important Legal Terms Made Simple')} ({localizedGlossary.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('rights_search_placeholder')}
            className="w-full pl-9 pr-3 py-2 bg-white rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* GUIDES TAB */}
      {activeTab === 'guides' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t('rights_all_categories')}
            </button>
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tCategory(c)}
              </button>
            ))}
          </div>

          {/* Topics List */}
          {filteredTopics.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              <BookMarked className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <div className="font-semibold text-slate-700">{t('rights_no_guides_found', 'No legal guides found')}</div>
              <p className="text-xs text-slate-500 mt-1">
                {t('rights_no_guides_desc', 'Try searching with different keywords or switch the category filter above.')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="mt-3 px-3 py-1.5 text-xs text-blue-700 underline font-medium"
              >
                {t('rights_reset_filters', 'Reset Filters')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTopics.map((topic) => {
                const isExpanded = expandedTopicId === topic.id;

                return (
                  <div
                    key={topic.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-300 transition-all"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                            <span>{tCategory(topic.category)}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500 font-normal">{topic.primaryLaw}</span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                            {topic.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {topic.shortDescription}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          <button
                            onClick={() => onFileComplaint(topic.category)}
                            className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>{t('rights_file_issue_btn', 'File Issue')}</span>
                          </button>

                          <button
                            onClick={() => toggleExpand(topic.id)}
                            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Toggle details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Section: Deep Breakdown */}
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-slate-100 space-y-6 text-xs sm:text-sm">
                          {/* Full Plain-language explanation */}
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                              {t('rights_what_law_says', 'What Does The Law Say In Simple Terms?')}
                            </span>
                            <p className="text-slate-700 leading-relaxed">
                              {topic.fullExplanation}
                            </p>
                          </div>

                          {/* Key Enforceable Rights */}
                          <div className="space-y-2">
                            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-blue-900">
                              <ShieldCheck className="w-4 h-4 text-blue-700" />
                              {t('rights_key_demands', 'Key Rights You Can Legally Demand')}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              {topic.keyRights.map((r, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100"
                                >
                                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                  <span className="text-slate-800 leading-snug">{r}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* What to do if violated */}
                          <div className="space-y-2">
                            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-900">
                              <AlertCircle className="w-4 h-4 text-emerald-700" />
                              {t('rights_steps_if_violated', 'What Steps To Take If Your Rights Are Violated')}
                            </h4>
                            <ol className="space-y-2 text-xs">
                              {topic.whatToDoIfViolated.map((step, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200"
                                >
                                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="text-slate-800 leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Authority & Helpline */}
                          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider block">
                                {t('rights_competent_auth', 'Official Competent Authority')}
                              </span>
                              <div className="font-bold text-sm text-white">
                                {topic.recommendedAuthority}
                              </div>
                              <div className="text-xs text-slate-300 mt-0.5">
                                {t('rights_direct_helpline', 'Direct Official Helpline:')} <strong>{topic.helpline}</strong>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {topic.officialPortal && (
                                <a
                                  href={topic.officialPortal}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                                >
                                  <span>{t('rights_auth_portal', 'Authority Portal')}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => onFileComplaint(topic.category)}
                                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
                              >
                                {t('rights_raise_here', 'Raise Complaint Here')}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* GLOSSARY TAB */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <strong>{t('rights_dict_title', 'Citizen Legal Dictionary:')}</strong> {t('rights_dict_desc', 'Indian court & police terminology translated into everyday words so you are never intimidated by legal notices or court documents.')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item) => (
              <div
                key={item.term}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3"
              >
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-base text-slate-900">{item.term}</h3>
                  {item.hindiTerm && (
                    <span className="text-xs text-blue-700 font-medium">{item.hindiTerm}</span>
                  )}
                </div>

                <div className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    {t('rights_meaning_simple', 'What it means in simple terms:')}
                  </span>
                  {item.simplifiedMeaning}
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 block mb-0.5">{t('rights_example_practice', 'Example in practice:')}</span>
                  {item.practicalExample}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
