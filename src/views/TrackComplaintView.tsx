import React, { useState, useEffect } from 'react';
import { Complaint, TimelineStep } from '../types';
import { findComplaint, getAllComplaints } from '../utils/storage';
import { ReceiptModal } from '../components/ReceiptModal';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Printer,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Phone,
  Building,
  User,
  Calendar,
  MapPin,
  ArrowRight,
  HelpCircle,
  Gavel,
  Lock,
} from 'lucide-react';

interface TrackComplaintViewProps {
  initialComplaintId?: string;
  onNavigateRaise?: () => void;
  onNavigateAdminResolve?: (complaintId: string) => void;
}

export const TrackComplaintView: React.FC<TrackComplaintViewProps> = ({
  initialComplaintId,
  onNavigateRaise,
  onNavigateAdminResolve,
}) => {
  const { t, tCategory } = useLanguage();
  const [complaintIdInput, setComplaintIdInput] = useState(initialComplaintId || '');
  const [mobileNumberInput, setMobileNumberInput] = useState('');
  const [searchedComplaint, setSearchedComplaint] = useState<Complaint | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receiptOpen, setReceiptOpen] = useState(false);

  // Available complaints list for quick testing
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const list = getAllComplaints();
    setRecentComplaints(list);
  }, []);

  // Auto search if initialComplaintId is passed
  useEffect(() => {
    if (initialComplaintId) {
      setComplaintIdInput(initialComplaintId);
      const found = findComplaint(initialComplaintId);
      if (found) {
        setSearchedComplaint(found);
        setHasSearched(true);
      }
    }
  }, [initialComplaintId]);

  const handleTrackSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setHasSearched(true);

    if (!complaintIdInput.trim()) {
      setErrorMsg('Please enter your Complaint / Docket Reference ID.');
      setSearchedComplaint(null);
      return;
    }

    const found = findComplaint(complaintIdInput.trim(), mobileNumberInput.trim());
    if (found) {
      setSearchedComplaint(found);
    } else {
      setSearchedComplaint(null);
      setErrorMsg(
        `No complaint found matching ID "${complaintIdInput.trim()}"${
          mobileNumberInput ? ` and mobile ending in ${mobileNumberInput.slice(-4)}` : ''
        }. Please check the reference number or select a sample docket below.`
      );
    }
  };

  const loadSampleDocket = (sample: Complaint) => {
    setComplaintIdInput(sample.id);
    setMobileNumberInput(sample.mobileNumber);
    setSearchedComplaint(sample);
    setHasSearched(true);
    setErrorMsg('');
  };

  // Timeline Step logic:
  // Complaint Submitted -> In Progress -> Escalated -> Resolved
  const timelineMilestones: { step: TimelineStep; title: string; subtitle: string }[] = [
    {
      step: 'Complaint Submitted',
      title: t('track_step_submitted'),
      subtitle: 'Registered & Docket Initialized',
    },
    {
      step: 'In Progress',
      title: t('track_step_inprogress'),
      subtitle: 'Legal Review & Authority Mapping',
    },
    {
      step: 'Escalated',
      title: t('track_step_escalated'),
      subtitle: 'Notice Dispatched / Official Cell Engaged',
    },
    {
      step: 'Resolved',
      title: t('track_step_resolved'),
      subtitle: 'Relief Disbursed / Settlement Finalized',
    },
  ];

  const getStepIndex = (step: TimelineStep): number => {
    switch (step) {
      case 'Complaint Submitted':
        return 0;
      case 'In Progress':
        return 1;
      case 'Escalated':
        return 2;
      case 'Resolved':
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIdx = searchedComplaint ? getStepIndex(searchedComplaint.timelineStep) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>{t('track_page_title')}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('track_page_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t('track_page_subtitle')}
        </p>
      </div>

      {/* Lookup Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('track_input_label')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={complaintIdInput}
                onChange={(e) => setComplaintIdInput(e.target.value.toUpperCase())}
                placeholder={t('track_input_placeholder')}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono uppercase focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('track_mobile_label')}
              </label>
              <input
                type="tel"
                maxLength={10}
                value={mobileNumberInput}
                onChange={(e) => setMobileNumberInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit mobile number"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{t('track_submit_button')}</span>
            </button>

            {onNavigateRaise && (
              <button
                type="button"
                onClick={onNavigateRaise}
                className="text-xs text-blue-700 hover:underline font-medium cursor-pointer"
              >
                {t('nav_raise')}?
              </button>
            )}
          </div>
        </form>

        {/* Demo IDs for Quick Testing */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 mb-2 flex items-center gap-1.5 font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Click to test sample dockets across different stages:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentComplaints.slice(0, 4).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => loadSampleDocket(sample)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-all ${
                  searchedComplaint?.id === sample.id
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <span className="font-mono">{sample.id}</span>
                <span className="text-slate-400 ml-1">·</span>
                <span className="ml-1 text-slate-600">{sample.category}</span>
                <span className="text-slate-400 ml-1">({sample.timelineStep})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Record Not Found</div>
            <div>{errorMsg}</div>
          </div>
        </div>
      )}

      {/* TRACKING RESULTS & TIMELINE */}
      {searchedComplaint && (
        <div className="space-y-6">
          {/* Main Status Header Card */}
          <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Official Grievance Docket
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-0.5">
                  {searchedComplaint.id}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Filed on {new Date(searchedComplaint.createdAt).toLocaleString('en-IN')}</span>
                  <span>·</span>
                  <span>{tCategory(searchedComplaint.category)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                    {t('track_current_status')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/40">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    {t(searchedComplaint.status)}
                  </span>
                </div>
                {onNavigateAdminResolve && (
                  <button
                    onClick={() => onNavigateAdminResolve(searchedComplaint.id)}
                    className="p-2.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/50 text-xs flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
                    title={t('track_resolve_docket_btn')}
                  >
                    <Gavel className="w-4 h-4 text-emerald-300" />
                    <span className="hidden sm:inline">{t('track_resolve_docket_btn')}</span>
                  </button>
                )}
                <button
                  onClick={() => setReceiptOpen(true)}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Print official receipt"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('track_receipt_btn')}</span>
                </button>
              </div>
            </div>

            {/* Visual Timeline: Complaint Submitted - In Progress - Escalated - Resolved */}
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-4">
                {t('track_milestones_title')}
              </div>

              {/* Desktop Progress Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
                {timelineMilestones.map((m, idx) => {
                  const isDone = idx < currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div
                      key={m.step}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isCurrent
                          ? 'bg-blue-950/80 border-blue-500 ring-1 ring-blue-500 text-white'
                          : isDone
                          ? 'bg-slate-800/80 border-emerald-500/60 text-slate-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                            isDone
                              ? 'bg-emerald-500 text-slate-950'
                              : isCurrent
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                            Active
                          </span>
                        )}
                        {isDone && (
                          <span className="text-[10px] font-semibold text-emerald-400">
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="font-bold text-sm leading-snug">{m.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-tight">
                        {m.subtitle}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Official Resolution Order Banner (if Resolved) */}
          {(searchedComplaint.status === 'Resolved' || searchedComplaint.resolutionDetails) && (
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-xl p-6 sm:p-7 shadow-lg border-2 border-emerald-500/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-600/40">
                      Disposed with Relief
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                      {t('track_order_banner_title')}
                    </h3>
                  </div>
                </div>

                {searchedComplaint.resolutionDetails?.orderNumber && (
                  <div className="bg-emerald-950/90 px-3 py-1.5 rounded-lg border border-emerald-600/40 text-right">
                    <span className="text-[10px] text-emerald-300 uppercase tracking-wider block">
                      {t('track_order_ref')}
                    </span>
                    <span className="font-mono font-bold text-xs text-white">
                      {searchedComplaint.resolutionDetails.orderNumber}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-emerald-300 text-xs uppercase font-semibold block mb-1">
                    {t('track_order_summary')}
                  </span>
                  <p className="text-slate-100 leading-relaxed bg-emerald-950/40 p-3.5 rounded-lg border border-emerald-800/50">
                    {searchedComplaint.resolutionDetails?.resolutionSummary ||
                      'The grievance has been adjudicated in favour of the citizen and disposed with relief compliance instructions.'}
                  </p>
                </div>

                {searchedComplaint.resolutionDetails?.reliefGranted && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-xs">
                    <span className="font-bold text-emerald-300">{t('track_order_relief')} </span>
                    <span className="text-white font-medium">
                      {searchedComplaint.resolutionDetails.reliefGranted}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-emerald-300/80 border-t border-emerald-800/60">
                  <div>
                    {searchedComplaint.resolutionDetails?.resolvedBy ? (
                      <span>
                        {t('track_order_officer')} <strong>{searchedComplaint.resolutionDetails.resolvedBy}</strong> ({searchedComplaint.resolutionDetails.officerRole})
                      </span>
                    ) : (
                      <span>District Legal Services Authority Adjudication Cell</span>
                    )}
                  </div>
                  <div>
                    {searchedComplaint.resolutionDetails?.resolvedAt && (
                      <span>
                        Disposed on {new Date(searchedComplaint.resolutionDetails.resolvedAt).toLocaleDateString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Box: Next Recommended Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <span>{t('track_next_action_title')}</span>
            </div>

            <div className="text-sm text-slate-800 leading-relaxed font-medium">
              {searchedComplaint.nextRecommendedStep}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <span className="text-slate-500 block">Assigned / Recommended Authority:</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {searchedComplaint.recommendedAuthority}
                </span>
                {searchedComplaint.officialPortalUrl && (
                  <a
                    href={searchedComplaint.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline flex items-center gap-1 mt-1 font-medium"
                  >
                    <span>Visit Authority Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col justify-between">
                <div>
                  <span className="text-slate-500 block">Direct Emergency / Authority Helpline:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">
                    {searchedComplaint.authorityHelpline || '15100 (NALSA Legal Aid)'}
                  </span>
                </div>
                {searchedComplaint.authorityHelpline && (
                  <a
                    href={`tel:${searchedComplaint.authorityHelpline.split(' ')[0]}`}
                    className="text-emerald-700 hover:underline flex items-center gap-1 mt-1 font-bold"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Dial Now</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Grievance Details & Activity History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Grievance Information */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
                Grievance Particulars
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Subject:</span>
                  <span className="font-semibold text-slate-900 text-sm">
                    {searchedComplaint.subject}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 block">Opposite Party / Organization:</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">
                      {searchedComplaint.oppositeParty}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 block">Amount Involved:</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">
                      {searchedComplaint.amountInvolved || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-500 block mb-1">Detailed Description:</span>
                  <p className="p-3.5 bg-slate-50 rounded-lg text-slate-700 leading-relaxed whitespace-pre-line border border-slate-100">
                    {searchedComplaint.detailedDescription}
                  </p>
                </div>

                {searchedComplaint.evidenceFiles && searchedComplaint.evidenceFiles.length > 0 && (
                  <div className="pt-2">
                    <span className="text-slate-500 block mb-1 font-medium">
                      Evidence Uploads ({searchedComplaint.evidenceFiles.length}):
                    </span>
                    <div className="space-y-1.5">
                      {searchedComplaint.evidenceFiles.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span className="font-medium text-slate-800 truncate">{f.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 shrink-0">
                            {f.category} · {f.size}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Complainant & Case Action Log */}
            <div className="space-y-6">
              {/* Complainant Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-sm text-xs">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Complainant Profile
                </h4>
                <div>
                  <span className="text-slate-500 block">Name:</span>
                  <span className="font-semibold text-slate-900">{searchedComplaint.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Mobile:</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    +91 {searchedComplaint.mobileNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Location:</span>
                  <span className="text-slate-800">
                    {searchedComplaint.district}, {searchedComplaint.state}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Incident Date:</span>
                  <span className="text-slate-800">{searchedComplaint.incidentDate}</span>
                </div>
              </div>

              {/* Case History Event Trail */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm text-xs">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Case Action History
                </h4>

                <div className="space-y-4">
                  {searchedComplaint.history.map((ev, i) => (
                    <div key={i} className="relative pl-5 border-l-2 border-blue-200 space-y-1">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-600"></div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{ev.date}</span>
                        <span className="font-medium text-slate-600">{ev.actor}</span>
                      </div>
                      <div className="font-semibold text-slate-900">{ev.title}</div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {ev.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {searchedComplaint && (
        <ReceiptModal
          complaint={searchedComplaint}
          isOpen={receiptOpen}
          onClose={() => setReceiptOpen(false)}
        />
      )}
    </div>
  );
};
