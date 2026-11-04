import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, getTranslation } from '../utils/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  tCategory: (categoryName: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const CATEGORY_TRANSLATION_MAP: Record<string, string> = {
  'Consumer Rights': 'cat_consumer',
  'Cybercrime': 'cat_cyber',
  "Women's Rights": 'cat_women',
  'Domestic Violence': 'cat_domestic',
  'Labour/Employment': 'cat_labour',
  'Property/Land': 'cat_property',
  'Education/Student Rights': 'cat_education',
  'Family Dispute': 'cat_family',
  'Financial Fraud': 'cat_financial',
  'Government Service': 'cat_govt',
  'Senior Citizen Rights': 'cat_senior',
  'Disability Rights': 'cat_disability',
  'Housing/Tenancy': 'cat_housing',
  'Criminal Matter': 'cat_criminal',
  'Other': 'cat_other',
};

const STATUS_TRANSLATION_MAP: Record<string, string> = {
  'Submitted': 'status_submitted',
  'Under Review': 'status_under_review',
  'In Progress': 'status_in_progress',
  'Action Pending': 'status_action_pending',
  'Escalated': 'status_escalated',
  'Resolved': 'status_resolved',
  'Closed': 'status_closed',
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const stored = localStorage.getItem('nyaya_sahaya_user_lang');
      if (
        stored &&
        ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Kannada', 'Gujarati', 'Malayalam'].includes(stored)
      ) {
        return stored as SupportedLanguage;
      }
    } catch {}
    return 'English';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('nyaya_sahaya_user_lang', lang);
    } catch {}
  };

  const t = (key: string, fallback?: string): string => {
    // Check if key is a status
    if (STATUS_TRANSLATION_MAP[key]) {
      return getTranslation(STATUS_TRANSLATION_MAP[key], language);
    }
    const val = getTranslation(key, language);
    if (val === key && fallback) {
      return fallback;
    }
    return val;
  };

  const tCategory = (categoryName: string): string => {
    const key = CATEGORY_TRANSLATION_MAP[categoryName];
    if (key) {
      return getTranslation(key, language);
    }
    return categoryName;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tCategory }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
