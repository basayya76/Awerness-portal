# -*- coding: utf-8 -*-
"""
Python script to build src/data/legalTopicsTranslations.ts with full translations
for all 9 supported languages:
English, Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, Gujarati, Malayalam.
"""

import json

# We will generate the TypeScript code directly
ts_code = '''import { LegalTopic, LegalTermGlossary, CategoryKey } from '../types';
import { SupportedLanguage } from '../utils/translations';
import { LEGAL_TOPICS, LEGAL_GLOSSARY } from './legalData';

export interface LocalizedLegalTopicContent {
  title: string;
  shortDescription: string;
  fullExplanation: string;
  primaryLaw: string;
  keyRights: string[];
  whatToDoIfViolated: string[];
  recommendedAuthority: string;
  helpline: string;
}

export interface LocalizedGlossaryContent {
  term: string;
  nativeTerm?: string;
  simplifiedMeaning: string;
  practicalExample: string;
}
'''

print("Ready to construct translations")
