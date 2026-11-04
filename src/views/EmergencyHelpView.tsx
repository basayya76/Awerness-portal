import React from 'react';
import { EMERGENCY_CONTACTS } from '../data/legalData';
import { useLanguage } from '../context/LanguageContext';
import {
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  Scale,
  Clock,
  HeartHandshake,
  CheckCircle2,
  ExternalLink,
  Phone,
  ShieldCheck,
} from 'lucide-react';

export const EmergencyHelpView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Urgent Alert Banner */}
      <div className="bg-red-700 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 border border-red-500/40 text-xs font-bold uppercase tracking-wider text-red-200">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            {t('emergency_critical_badge') || 'Critical Emergency Notice'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('emergency_critical_heading')}
          </h1>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            {t('emergency_critical_text')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href="tel:112"
            className="px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-red-700 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <PhoneCall className="w-5 h-5 text-red-600" />
            <span>{t('emergency_dial_112') || 'Dial 112 Now'}</span>
          </a>
          <a
            href="tel:1930"
            className="px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <ShieldAlert className="w-5 h-5 text-slate-950" />
            <span>{t('emergency_dial_1930') || 'Cyber Fraud 1930'}</span>
          </a>
        </div>
      </div>

      {/* 24x7 Government Helplines Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            24x7 National Crisis & Citizen Helplines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Free government toll-free hotlines operated across all telecommunication networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMERGENCY_CONTACTS.map((em) => (
            <div
              key={em.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-red-300 hover:shadow-md transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="text-blue-700">{em.number}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {em.availability}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {em.title}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {em.subtitle}
                  </div>
                </div>

                <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <strong className="text-slate-900">When to call:</strong> {em.applicableFor}
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider">
                    Immediate Action Guide:
                  </span>
                  {em.actionGuide.map((g, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5"></span>
                      <span className="leading-relaxed">{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={`tel:${em.number.replace(/\D/g, '')}`}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call {em.number} Directly</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Emergency Situations Protocols */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Emergency Legal Protocols: What To Do In Crisis
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Immediate legal rights established by landmark Supreme Court judgments to protect you during crises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Protocol 1: Police Detention & Arrest */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-blue-900 font-bold text-base">
              <Scale className="w-5 h-5 text-blue-700" />
              <span>Protocol 1: If You Are Being Arrested or Detained</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strictly enforced by Supreme Court in <strong>DK Basu v. State of West Bengal</strong>:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Ask for grounds of arrest:</strong> Police are legally bound to state the exact section and offence in writing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Arrest Memo:</strong> Must be prepared at the spot, signed by a local witness or relative, and you.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Right to inform:</strong> You have the absolute right to have one family member or friend notified within 8-12 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Production within 24 hours:</strong> Detention beyond 24 hours without producing before a Judicial Magistrate is illegal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Arrest of Women:</strong> Cannot be arrested between sunset and sunrise, and only by a woman police officer.</span>
              </li>
            </ul>
          </div>

          {/* Protocol 2: Financial Cyber Fraud */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Protocol 2: Cyber Fraud "Golden 2 Hours" Checklist</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The first 120 minutes determine whether your looted money can be blocked in transit:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Call 1930 immediately:</strong> Have your account number, transaction UTR number, and debit card digits ready.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Freeze the cards & net banking:</strong> Open mobile banking or call bank customer care to disable UPI and card transactions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Do NOT uninstall the app yet:</strong> Take screenshots of the SMS notifications, caller numbers, APK links, and UPI IDs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>File online:</strong> Register at <em>cybercrime.gov.in</em> and print acknowledgement docket for bank chargeback.</span>
              </li>
            </ul>
          </div>

          {/* Protocol 3: Domestic Violence & Safety */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-pink-900 font-bold text-base">
              <HeartHandshake className="w-5 h-5 text-pink-600" />
              <span>Protocol 3: Domestic Violence Acute Danger</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Statutory protections under the Protection of Women from Domestic Violence Act (PWDVA) 2005:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <span><strong>Reach physical safety:</strong> If life is in danger, step outside or call <strong>181</strong> or <strong>112</strong> immediately.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <span><strong>Sakhi One Stop Centre (OSC):</strong> Offers shelter, medical checkup, police protection, and counseling under one roof.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <span><strong>Right to Reside:</strong> You cannot be evicted from your matrimonial / shared household by in-laws or husband.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <span><strong>Protection Orders:</strong> A Magistrate can issue an emergency order prohibiting the abuser from entering your workplace or residence.</span>
              </li>
            </ul>
          </div>

          {/* Protocol 4: Road Accident Good Samaritan */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Protocol 4: Road Accident Good Samaritan Shield</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supreme Court & Motor Vehicles (Amendment) Act protections for helping injured citizens:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero Police Harassment:</strong> Good Samaritans cannot be forced to disclose their name, address, or phone number.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Hospital Deposit Requirement:</strong> Hospitals cannot demand advance payment or detain the helper before treating the victim.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Civil & Criminal Immunity:</strong> Helpers who act in good faith are protected from civil and criminal liability.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Voluntary Witness:</strong> You cannot be forced to become a witness in court unless you voluntarily consent.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
