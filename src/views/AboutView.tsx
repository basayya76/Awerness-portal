import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Scale,
  ShieldAlert,
  HeartHandshake,
  Lock,
  HelpCircle,
  FileText,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { t } = useLanguage();
  const faqs = [
    {
      q: 'Is Nyaya Sahaya an official court or police station?',
      a: 'No. Nyaya Sahaya is a citizen-focused public legal support and information portal. We help citizens understand their legal rights in simple language, organize and register their grievances, generate standard reference dockets, and identify the official statutory authority (e-Daakhil, Cybercrime Portal, DLSA, Police, or Lokayukta) where formal action must be taken.',
    },
    {
      q: 'Does registering a complaint here automatically file an FIR or court lawsuit?',
      a: 'No. Registering a complaint here generates an organized citizen dossier and assigns a reference docket. It prepares your grievance for submission to statutory bodies. We guide you on whether an FIR, consumer complaint, DLSA application, or administrative notice is required, and provide direct links and helplines.',
    },
    {
      q: 'Is there any fee or payment required to use Nyaya Sahaya?',
      a: 'No. Nyaya Sahaya is 100% free of cost for all Indian citizens. We do not charge any fee for generating dockets, reading legal guides, tracking statuses, or checking legal aid eligibility.',
    },
    {
      q: 'How does Nyaya Sahaya protect my sensitive data and privacy?',
      a: 'We follow strict data minimization standards. We urge citizens never to upload sensitive financial passwords, ATM PINs, or confidential IDs. Dockets are stored securely in your browser and local registry.',
    },
    {
      q: 'Can I get a free lawyer through this portal?',
      a: 'We direct eligible citizens directly to the District Legal Services Authority (DLSA) and NALSA (15100), where under Article 39A of the Constitution of India, all women, children, SC/ST members, persons with disability, and low-income families are entitled to free courtroom advocates.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* View Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>{t('about_page_title')}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('about_page_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t('about_page_subtitle')}
        </p>
      </div>

      {/* Crucial Statutory Legal Notice as Mandated */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 text-amber-950 space-y-3">
        <div className="flex items-center gap-2.5 font-bold text-amber-900 text-base">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <span>IMPORTANT STATUTORY LEGAL NOTICE</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
          Nyaya Sahaya is an information, legal-literacy, and complaint-support platform. It is <strong>NOT</strong> a replacement for a practicing lawyer, police department, court of law, government authority, or emergency service.
        </p>
        <p className="text-xs text-amber-800 leading-relaxed">
          Nothing contained on this website constitutes formal legal advice or creates an advocate-client relationship. If you are facing an active crime, domestic violence, or threat to physical safety, please dial <strong>112</strong> immediately.
        </p>
      </div>

      {/* Core Mission Pillars */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Our Core Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">1. Demystifying the Law</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transforming complex legal jargon and voluminous acts into simple, clear citizen rights with actionable step-by-step remedies.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">2. Systematic Grievance Lodging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enabling citizens to organize facts, calculate financial amounts, preserve digital evidence, and generate clean dockets ready for official authorities.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">3. Promoting Legal Aid (Art. 39A)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensuring no citizen is denied justice due to financial or social backwardness by popularizing NALSA, DLSA, and Tele-Law schemes.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Common questions regarding how Nyaya Sahaya functions and assists citizens.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
