import React from 'react';
import { NavTab } from './Navbar';
import { useLanguage } from '../context/LanguageContext';
import { Scale, Phone, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Upper Helpline Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-blue-900/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white">{t('footer_section_helplines') || 'Emergency Citizen Helplines 24x7'}</div>
                <div className="text-xs text-slate-400">
                  {t('emergency_page_subtitle') || 'Direct government toll-free numbers for urgent intervention across India'}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
              <a
                href="tel:112"
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <strong>112</strong> National Emergency
              </a>
              <a
                href="tel:1930"
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <strong>1930</strong> Cyber Fraud
              </a>
              <a
                href="tel:181"
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <strong>181</strong> Women in Distress
              </a>
              <a
                href="tel:15100"
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <strong>15100</strong> Free Legal Aid (NALSA)
              </a>
              <a
                href="tel:1915"
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <strong>1915</strong> Consumer Helpline
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚖</span>
              <span className="text-xl font-bold text-white tracking-tight">
                {t('app_name', 'NYAYA SAHAYA')}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "{t('tagline')}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to closing India's legal literacy and grievance access gap. Enabling everyday citizens, workers, students, consumers, and families to understand legal options and lodge actionable complaints.
            </p>
            <div className="pt-2 text-xs text-amber-400/90 font-mono bg-slate-900/80 p-2.5 rounded border border-slate-800">
              <div className="font-semibold text-slate-200">Article 39A — Constitution of India</div>
              <div>"Equal justice and free legal aid to ensure opportunities for securing justice are not denied to any citizen."</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer_section_links') || 'Portal Sections'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('raise')}
                  className="hover:text-white text-blue-400 font-medium transition-colors cursor-pointer"
                >
                  {t('nav_raise')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('track')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_track')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('rights')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_rights')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('legal-help')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav_legal_help')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('emergency')}
                  className="hover:text-white text-amber-400 transition-colors cursor-pointer"
                >
                  {t('nav_emergency')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors"
                >
                  About Mission & Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('admin')}
                  className="hover:text-amber-400 text-amber-400/90 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>⚖ Officer / Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Official Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://edaakhil.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>e-Daakhil (Consumer Commission)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>CPGRAMS (Central Grievance)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://nalsa.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>National Legal Services Authority</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tele-law.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Tele-Law (Dept of Justice)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="http://ncw.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>National Commission for Women</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Safeguards */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Legal Safeguard Notice
            </h4>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Not Legal Advice
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Nyaya Sahaya is a public legal information & grievance facilitation service. Using this platform does not create an attorney-client relationship. Please consult an advocate or approach your nearest DLSA for judicial representation.
              </p>
            </div>
            <div className="text-[11px] text-slate-400">
              Zero tolerance for spam, fraudulent submissions, or harassment. All data is handled with privacy care.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {t('app_name', 'NYAYA SAHAYA')}. {t('footer_tagline') || 'Citizen Legal Support & Grievance Portal.'}
          </div>
          <div className="flex items-center gap-4">
            <span>Built for Citizen Empowerment</span>
            <span>·</span>
            <span>WCAG 2.1 AA Compliant</span>
            <span>·</span>
            <button onClick={() => onSelectTab('about')} className="hover:text-white underline">
              Legal Disclaimer & Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
