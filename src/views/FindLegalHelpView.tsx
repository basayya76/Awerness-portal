import React, { useState } from 'react';
import { LEGAL_AID_SERVICES } from '../data/legalData';
import { useLanguage } from '../context/LanguageContext';
import {
  LifeBuoy,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  MapPin,
  HelpCircle,
  FileText,
  UserCheck,
  Building,
  AlertCircle,
} from 'lucide-react';

export const FindLegalHelpView: React.FC = () => {
  const { t } = useLanguage();

  // Eligibility Checker State
  const [eligibilityAnswers, setEligibilityAnswers] = useState({
    isWomanOrChild: false,
    isScSt: false,
    isIndustrialWorkman: false,
    isPersonWithDisability: false,
    isTraffickingVictim: false,
    isInCustody: false,
    isLowIncome: false,
  });

  const isEligible = Object.values(eligibilityAnswers).some(Boolean);

  const toggleCheck = (key: keyof typeof eligibilityAnswers) => {
    setEligibilityAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold">
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>{t('aid_article_39a_badge') || 'Statutory Free Legal Services'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('aid_page_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {t('aid_page_subtitle')}
        </p>
      </div>

      {/* Free Legal Aid Eligibility Checker (Interactive Tool) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Interactive Tool · Section 12 LSA Act 1987
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {t('aid_eligibility_heading')}
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Check any criteria that apply to you
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none transition-colors">
            <input
              type="checkbox"
              checked={eligibilityAnswers.isWomanOrChild}
              onChange={() => toggleCheck('isWomanOrChild')}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">{t('aid_elig_women')}</span>
              <span className="text-slate-500">{t('aid_elig_women_desc')}</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none transition-colors">
            <input
              type="checkbox"
              checked={eligibilityAnswers.isScSt}
              onChange={() => toggleCheck('isScSt')}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">{t('aid_elig_scst')}</span>
              <span className="text-slate-500">{t('aid_elig_scst_desc')}</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none transition-colors">
            <input
              type="checkbox"
              checked={eligibilityAnswers.isPersonWithDisability}
              onChange={() => toggleCheck('isPersonWithDisability')}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">Person with Disability</span>
              <span className="text-slate-500">Entitled under Section 12(d) of the Legal Services Act.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none transition-colors">
            <input
              type="checkbox"
              checked={eligibilityAnswers.isIndustrialWorkman}
              onChange={() => toggleCheck('isIndustrialWorkman')}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">{t('aid_elig_industrial')}</span>
              <span className="text-slate-500">{t('aid_elig_industrial_desc')}</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none transition-colors">
            <input
              type="checkbox"
              checked={eligibilityAnswers.isTraffickingVictim}
              onChange={() => toggleCheck('isTraffickingVictim')}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">{t('aid_elig_disaster')}</span>
              <span className="text-slate-500">{t('aid_elig_disaster_desc')}</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none transition-colors">
            <input
              type="checkbox"
              checked={eligibilityAnswers.isLowIncome}
              onChange={() => toggleCheck('isLowIncome')}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block">{t('aid_elig_lowincome')}</span>
              <span className="text-slate-500">{t('aid_elig_lowincome_desc')}</span>
            </div>
          </label>
        </div>

        {/* Checker Result Card */}
        {isEligible ? (
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Congratulations: You are entitled to 100% Free Legal Aid!</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Under Section 12 of the Legal Services Authorities Act, you do <strong>not</strong> need to pay advocate fees, court drafting charges, or process fees. You can walk into the District Legal Services Authority (DLSA) front office at your local District Court or dial <strong>15100</strong> to be assigned a panel advocate.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Even if you do not qualify for complete free representation, you can still use the <strong>Tele-Law Scheme</strong> (₹30 consultation) or attend <strong>Lok Adalat</strong> sessions for zero-cost amicable dispute settlement.
            </span>
          </div>
        )}
      </section>

      {/* Directory of Legal Aid Services */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Government Legal Aid Organizations & Schemes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Authoritative bodies offering pro bono counsel, telephonic advice, and courtroom defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEGAL_AID_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {srv.type}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {srv.charges}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {srv.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Eligibility:</strong> {srv.eligibility}
                  </div>
                  {srv.address && (
                    <div className="text-slate-600 flex items-start gap-1 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{srv.address}</span>
                    </div>
                  )}
                </div>

                {/* Services list */}
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider">
                    Services Provided:
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {srv.servicesOffered.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer with Contact & Website */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${srv.contactNumber.split(' ')[0]}`}
                  className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{srv.contactNumber}</span>
                </a>

                <a
                  href={srv.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide: How to Walk-in to Your Nearest DLSA */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Step-by-Step Citizen Guide
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            How to Get Free Legal Representation at Your District Court
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every district in India has a DLSA Front Office located inside the premises of the District & Sessions Court.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              1
            </span>
            <div className="font-bold text-white text-sm">Visit DLSA Front Office</div>
            <p className="text-slate-300 leading-relaxed">
              Walk into your nearest District Court. Ask the security or reception for the "DLSA Front Office / Legal Aid Clinic". No appointment needed.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              2
            </span>
            <div className="font-bold text-white text-sm">Meet Para-Legal Volunteer</div>
            <p className="text-slate-300 leading-relaxed">
              Staff will fill out a simple one-page application form. Bring Aadhaar card, any notice/police paper received, and income proof (if applicable).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              3
            </span>
            <div className="font-bold text-white text-sm">Panel Advocate Assigned</div>
            <p className="text-slate-300 leading-relaxed">
              Within 2-3 working days, a qualified advocate will be assigned to draft your replies, appear in court, and contest your case with zero fees.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
