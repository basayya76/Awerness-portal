import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DisclaimerBannerProps {
  onNavigateEmergency?: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ onNavigateEmergency }) => {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            {t('tagline')} · <strong>112</strong> {t('emergency_label')}.
          </span>
          <button
            onClick={() => setDismissed(false)}
            className="ml-auto underline font-medium hover:text-amber-950 text-xs cursor-pointer"
          >
            Show Notice
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Legal portal disclaimer" className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="p-1 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-slate-300 leading-snug">
            <span className="font-semibold text-amber-300 mr-1.5">{t('banner_urgent_notice')}:</span>
            <span>
              {t('banner_urgent_text')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigateEmergency && (
            <button
              onClick={onNavigateEmergency}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 rounded transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{t('banner_call_emergency')}</span>
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss disclaimer"
            className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
