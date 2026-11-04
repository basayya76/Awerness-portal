import React, { useState, useEffect, useRef } from 'react';
import { CategoryKey, Complaint, EvidenceFile } from '../types';
import {
  COMPLAINT_CATEGORIES,
  INDIAN_STATES_DISTRICTS,
} from '../data/legalData';
import { createNewComplaint, checkExistingComplaint } from '../utils/storage';
import { ReceiptModal } from '../components/ReceiptModal';
import { useLanguage } from '../context/LanguageContext';
import {
  PlusCircle,
  Upload,
  AlertTriangle,
  FileCheck2,
  Trash2,
  FileText,
  Image,
  Film,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building,
  HelpCircle,
  Download,
  Info,
} from 'lucide-react';

interface RaiseComplaintViewProps {
  initialCategory?: CategoryKey;
  onTrackNavigate: (complaintId: string) => void;
}

export const RaiseComplaintView: React.FC<RaiseComplaintViewProps> = ({
  initialCategory,
  onTrackNavigate,
}) => {
  const { t, tCategory } = useLanguage();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Delhi (NCT)');
  const [district, setDistrict] = useState('New Delhi');
  const [cityTown, setCityTown] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('English');

  const [category, setCategory] = useState<CategoryKey>(initialCategory || 'Consumer Rights');
  const [subcategory, setSubcategory] = useState(
    COMPLAINT_CATEGORIES[initialCategory || 'Consumer Rights'].subcategories[0] || ''
  );
  const [incidentDate, setIncidentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [incidentLocation, setIncidentLocation] = useState('');
  const [subject, setSubject] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [amountInvolved, setAmountInvolved] = useState('');
  const [oppositeParty, setOppositeParty] = useState('');
  const [previousReferenceNo, setPreviousReferenceNo] = useState('');

  // Evidence Files
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [evidenceCategory, setEvidenceCategory] = useState<EvidenceFile['category']>('Receipt');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Consent
  const [consentGiven, setConsentGiven] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateComplaint, setDuplicateComplaint] = useState<Complaint | null>(null);

  // Post Submission State
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  // When initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      const sub = COMPLAINT_CATEGORIES[initialCategory]?.subcategories[0] || '';
      setSubcategory(sub);
    }
  }, [initialCategory]);

  // When category changes, update available subcategories
  const handleCategoryChange = (newCat: CategoryKey) => {
    setCategory(newCat);
    const subcats = COMPLAINT_CATEGORIES[newCat]?.subcategories || [];
    setSubcategory(subcats[0] || '');
  };

  // When state changes, update available districts
  const availableDistricts = INDIAN_STATES_DISTRICTS[state] || ['Central District', 'Urban', 'Rural'];
  useEffect(() => {
    if (availableDistricts.length > 0 && !availableDistricts.includes(district)) {
      setDistrict(availableDistricts[0]);
    }
  }, [state]);

  // File upload simulator with size & type metadata
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: EvidenceFile[] = Array.from(files).map((file, idx) => {
      let cat: EvidenceFile['category'] = evidenceCategory;
      if (file.type.startsWith('image/')) cat = 'Image';
      else if (file.type === 'application/pdf') cat = 'PDF';
      else if (file.type.startsWith('video/')) cat = 'Video';

      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

      return {
        id: `ev-${Date.now()}-${idx}`,
        name: file.name,
        size: sizeStr,
        type: file.type || 'document',
        category: cat,
      };
    });

    setEvidenceFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (id: string) => {
    setEvidenceFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!subject.trim()) {
      setErrorMsg('Please provide a subject for your complaint.');
      return;
    }
    if (!detailedDescription.trim() || detailedDescription.trim().length < 20) {
      setErrorMsg('Please provide a detailed description (minimum 20 characters) explaining what occurred.');
      return;
    }
    if (!oppositeParty.trim()) {
      setErrorMsg('Please mention the opposite party, organization, or person involved.');
      return;
    }
    if (!consentGiven) {
      setErrorMsg('Please confirm the consent declaration before submitting.');
      return;
    }

    // AVOID MULTIPLE TIME COMPLAINT RAISE ON THE SAME TOPIC BY THE SINGLE USER
    const existing = checkExistingComplaint(cleanMobile, category, subcategory);
    if (existing) {
      setDuplicateComplaint(existing);
      setErrorMsg('');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord = createNewComplaint({
        fullName: fullName.trim(),
        mobileNumber: cleanMobile,
        email: email.trim(),
        state,
        district,
        cityTown: cityTown.trim(),
        preferredLanguage,
        category,
        subcategory,
        incidentDate,
        incidentLocation: incidentLocation.trim() || 'Online / Not Disclosed',
        subject: subject.trim(),
        detailedDescription: detailedDescription.trim(),
        amountInvolved: amountInvolved.trim() ? `₹${amountInvolved.replace(/[^0-9,.]/g, '')}` : undefined,
        oppositeParty: oppositeParty.trim(),
        previousReferenceNo: previousReferenceNo.trim() || undefined,
        evidenceFiles,
        consentGiven: true,
      });

      setSubmittedComplaint(newRecord);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleResetForm = () => {
    setSubmittedComplaint(null);
    setSubject('');
    setDetailedDescription('');
    setOppositeParty('');
    setAmountInvolved('');
    setPreviousReferenceNo('');
    setEvidenceFiles([]);
    setConsentGiven(false);
  };

  const allCategories = Object.keys(COMPLAINT_CATEGORIES) as CategoryKey[];

  // POST SUBMISSION CONFIRMATION VIEW
  if (submittedComplaint) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Success Card */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-6 sm:p-8 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                  {t('raise_success_title')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {t('raise_success_title')}
                </h2>
              </div>
            </div>
            <p className="text-emerald-100 text-xs sm:text-sm mt-3 leading-relaxed">
              {t('raise_success_text')} <span className="font-mono font-bold text-white">{submittedComplaint.id}</span>
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Key Information Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs text-slate-500 block">{t('receipt_docket_ref') || 'Complaint ID:'}</span>
                <span className="text-lg font-mono font-extrabold text-blue-900">
                  {submittedComplaint.id}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">{t('receipt_filed_on') || 'Date of Filing:'}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {new Date(submittedComplaint.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">{t('receipt_category') || 'Category:'}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {tCategory(submittedComplaint.category)}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">{t('receipt_status') || 'Current Status:'}</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  {t(submittedComplaint.status)}
                </span>
              </div>
            </div>

            {/* Next Recommended Step Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                <span>Next Recommended Step & Authority</span>
              </div>
              <div className="text-sm text-slate-800 leading-relaxed">
                <span className="font-semibold text-slate-900">Recommended Redressal Body:</span>{' '}
                {submittedComplaint.recommendedAuthority}
              </div>
              <div className="text-sm text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-lg border border-blue-100">
                <span className="font-semibold text-slate-900 block mb-1">Recommended Immediate Action:</span>
                {submittedComplaint.nextRecommendedStep}
              </div>
              {submittedComplaint.authorityHelpline && (
                <div className="text-xs text-slate-700 pt-1">
                  Official Direct Helpline:{' '}
                  <a
                    href={`tel:${submittedComplaint.authorityHelpline.split(' ')[0]}`}
                    className="font-bold text-blue-800 underline"
                  >
                    {submittedComplaint.authorityHelpline}
                  </a>
                </div>
              )}
            </div>

            {/* Grievance Preview */}
            <div className="border border-slate-200 rounded-xl p-5 text-xs text-slate-700 space-y-2">
              <div className="font-semibold text-slate-900 text-sm">Grievance Overview:</div>
              <div>
                <strong>Subject:</strong> {submittedComplaint.subject}
              </div>
              <div>
                <strong>Opposite Party:</strong> {submittedComplaint.oppositeParty}
              </div>
              {submittedComplaint.amountInvolved && (
                <div>
                  <strong>Amount Involved:</strong> {submittedComplaint.amountInvolved}
                </div>
              )}
              {submittedComplaint.evidenceFiles.length > 0 && (
                <div className="flex items-center gap-2 text-slate-600">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>{submittedComplaint.evidenceFiles.length} supporting evidence file(s) attached</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setReceiptOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('raise_btn_receipt')}</span>
                </button>
                <button
                  onClick={() => onTrackNavigate(submittedComplaint.id)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <span>{t('raise_btn_track')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleResetForm}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium underline cursor-pointer"
              >
                Raise Another Complaint
              </button>
            </div>
          </div>
        </div>

        {/* Printable Modal */}
        <ReceiptModal
          complaint={submittedComplaint}
          isOpen={receiptOpen}
          onClose={() => setReceiptOpen(false)}
          onTrackNow={(id) => onTrackNavigate(id)}
        />
      </div>
    );
  }

  // COMPLAINT ENTRY FORM
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Introduction */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{t('raise_portal_badge') || 'Citizen Grievance Gateway'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('raise_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t('raise_desc')}
        </p>
      </div>

      {/* Duplicate Complaint Alert Banner */}
      {duplicateComplaint && (
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 shadow-md space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-200 border border-amber-300 flex items-center justify-center text-amber-900 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-amber-950">
                Active Complaint Already Registered For This Topic
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                You already have an ongoing docket{' '}
                <strong className="font-mono text-slate-900 bg-amber-200/60 px-1.5 py-0.5 rounded">
                  {duplicateComplaint.id}
                </strong>{' '}
                under <strong>{duplicateComplaint.category}</strong>{' '}
                ({duplicateComplaint.subcategory || 'General'}) with status{' '}
                <strong className="text-blue-900 uppercase">"{duplicateComplaint.status}"</strong>.
              </p>
              <p className="text-xs text-amber-700">
                To prevent duplicate processing by the authority, please track your existing complaint or add evidence directly to your open docket rather than filing multiple times.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-amber-200">
            <button
              type="button"
              onClick={() => onTrackNavigate(duplicateComplaint.id)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span>Track Existing Docket ({duplicateComplaint.id})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                // If user confirms it's a completely different second incident
                setDuplicateComplaint(null);
                setIsSubmitting(true);
                setTimeout(() => {
                  const cleanMobile = mobileNumber.replace(/\D/g, '');
                  const newRecord = createNewComplaint({
                    fullName: fullName.trim(),
                    mobileNumber: cleanMobile,
                    email: email.trim(),
                    state,
                    district,
                    cityTown: cityTown.trim(),
                    preferredLanguage,
                    category,
                    subcategory,
                    incidentDate,
                    incidentLocation: incidentLocation.trim() || 'Online / Not Disclosed',
                    subject: subject.trim(),
                    detailedDescription: detailedDescription.trim(),
                    amountInvolved: amountInvolved.trim() ? `₹${amountInvolved.replace(/[^0-9,.]/g, '')}` : undefined,
                    oppositeParty: oppositeParty.trim(),
                    previousReferenceNo: previousReferenceNo.trim() || undefined,
                    evidenceFiles,
                    consentGiven: true,
                  });
                  setSubmittedComplaint(newRecord);
                  setIsSubmitting(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 600);
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              This is a Separate Incident (Proceed Anyway)
            </button>
            <button
              type="button"
              onClick={() => setDuplicateComplaint(null)}
              className="text-xs text-slate-500 hover:text-slate-800 underline ml-auto cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Please check your inputs:</div>
            <div>{errorMsg}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Personal Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('raise_step1_title')}</h2>
              <p className="text-xs text-slate-500">Contact details for case updates and verification.</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Step 1 of 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_full_name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('raise_full_name_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_mobile')} <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-semibold text-slate-500 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder={t('raise_mobile_placeholder')}
                  className="w-full pl-12 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:border-blue-600 focus:outline-none"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Required for status tracking & SMS updates.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('raise_email_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_language_pref')}
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none bg-white cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_state')} <span className="text-red-500">*</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none bg-white cursor-pointer"
              >
                {Object.keys(INDIAN_STATES_DISTRICTS).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_district')} <span className="text-red-500">*</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none bg-white cursor-pointer"
              >
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_city')}
              </label>
              <input
                type="text"
                value={cityTown}
                onChange={(e) => setCityTown(e.target.value)}
                placeholder={t('raise_city_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Complaint Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('raise_step2_title')}</h2>
              <p className="text-xs text-slate-500">Provide incident specifics and opposite party details.</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Step 2 of 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_category_label')} <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as CategoryKey)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none bg-white font-medium text-slate-900 cursor-pointer"
              >
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {tCategory(c)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_subcategory_label')} <span className="text-red-500">*</span>
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none bg-white text-slate-800 cursor-pointer"
              >
                {(COMPLAINT_CATEGORIES[category]?.subcategories || []).map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_date_label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_location_label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={incidentLocation}
                onChange={(e) => setIncidentLocation(e.target.value)}
                placeholder={t('raise_location_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_subject_label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t('raise_subject_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_desc_label')} <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                placeholder={t('raise_desc_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none leading-relaxed"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Minimum 20 characters. Include transaction IDs, order numbers, and communication dates.</span>
                <span>{detailedDescription.length} characters</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_amount_label')}
              </label>
              <input
                type="text"
                value={amountInvolved}
                onChange={(e) => setAmountInvolved(e.target.value)}
                placeholder={t('raise_amount_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_opposite_label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={oppositeParty}
                onChange={(e) => setOppositeParty(e.target.value)}
                placeholder={t('raise_opposite_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('raise_prior_ref_label')}
              </label>
              <input
                type="text"
                value={previousReferenceNo}
                onChange={(e) => setPreviousReferenceNo(e.target.value)}
                placeholder={t('raise_prior_ref_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Evidence Upload */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('raise_step3_title')}</h2>
              <p className="text-xs text-slate-500">
                {t('raise_evidence_desc')}
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Step 3 of 4</span>
          </div>

          {/* Warning Banner Required by User Brief */}
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-semibold">
              Do not upload highly sensitive documents unless necessary.
            </span>
            <span className="text-amber-800 hidden sm:inline">
              (e.g. mask debit card CVVs or passwords before uploading).
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">{t('raise_evidence_label')}:</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Images</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">PDF documents</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Screenshots</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Receipts</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Videos</span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Other supporting</span>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50/50">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-800">
                Choose files or drag & drop here
              </div>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, PDF, MP4 up to 10MB each
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <select
                  value={evidenceCategory}
                  onChange={(e) => setEvidenceCategory(e.target.value as EvidenceFile['category'])}
                  className="text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white cursor-pointer"
                >
                  <option value="Receipt">Receipt / Tax Invoice</option>
                  <option value="Screenshot">Screenshot / Chat Log</option>
                  <option value="PDF">Legal Notice / PDF Agreement</option>
                  <option value="Image">Photo Evidence</option>
                  <option value="Video">Video Recording</option>
                  <option value="Document">Other Document</option>
                </select>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,video/*,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="evidence-file-input"
                />
                <label
                  htmlFor="evidence-file-input"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-colors"
                >
                  {t('raise_evidence_btn')}
                </label>
              </div>
            </div>

            {/* Uploaded Files List */}
            {evidenceFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-700">
                  Attached Files ({evidenceFiles.length}):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evidenceFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {file.category === 'PDF' && <FileText className="w-4 h-4 text-red-600 shrink-0" />}
                        {file.category === 'Image' && <Image className="w-4 h-4 text-blue-600 shrink-0" />}
                        {file.category === 'Video' && <Film className="w-4 h-4 text-purple-600 shrink-0" />}
                        {file.category === 'Screenshot' && <Image className="w-4 h-4 text-amber-600 shrink-0" />}
                        {file.category === 'Receipt' && <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {file.category === 'Document' && <FileText className="w-4 h-4 text-slate-600 shrink-0" />}

                        <div className="truncate">
                          <span className="font-medium text-slate-900 truncate block">{file.name}</span>
                          <span className="text-[10px] text-slate-500">
                            {file.category} · {file.size}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Declaration & Consent */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{t('raise_step4_title')}</h2>
            <span className="text-xs text-slate-400 font-mono">Step 4 of 4</span>
          </div>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span className="text-xs sm:text-sm text-slate-800 leading-snug font-medium">
              "{t('raise_declaration')}"
            </span>
          </label>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            By submitting, you authorize the generation of an official Nyaya Sahaya reference docket. You acknowledge that this platform provides civic information and referral guidance to statutory government authorities, and is not a formal substitute for a judicial order or law enforcement intervention.
          </p>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>{t('raise_submitting')}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t('raise_submit_btn')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
