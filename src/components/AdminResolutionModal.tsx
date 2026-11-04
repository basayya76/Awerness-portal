import React, { useState } from 'react';
import { Complaint, ComplaintStatus, TimelineStep } from '../types';
import { resolveComplaint, ResolveComplaintPayload } from '../utils/storage';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Gavel,
  Printer,
  Sparkles,
  FileText,
  User,
  Calendar,
  Building,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';

interface AdminResolutionModalProps {
  complaint: Complaint;
  isOpen: boolean;
  onClose: () => void;
  onResolved: (updatedComplaint: Complaint) => void;
}

export const AdminResolutionModal: React.FC<AdminResolutionModalProps> = ({
  complaint,
  isOpen,
  onClose,
  onResolved,
}) => {
  if (!isOpen) return null;

  // Form State initialized with thoughtful defaults for resolving
  const [targetStatus, setTargetStatus] = useState<ComplaintStatus>('Resolved');
  const [targetStep, setTargetStep] = useState<TimelineStep>('Resolved');
  const [officerName, setOfficerName] = useState('Sri Arvind Nambiar');
  const [officerRole, setOfficerRole] = useState('District Grievance Redressal Officer, DLSA');
  const [reliefGranted, setReliefGranted] = useState(
    complaint.amountInvolved
      ? `Full refund of ${complaint.amountInvolved} ordered to be credited within 10 days, plus ₹3,000 litigation hardship compensation.`
      : 'Direction issued to respondent for complete redressal and cessation of violation.'
  );
  const [resolutionSummary, setResolutionSummary] = useState(
    `Matter heard and examined under relevant statutory provisions. Grievance against "${complaint.oppositeParty}" resolved in favour of complainant ${complaint.fullName}. Respondent directed to comply with redressal terms immediately.`
  );
  const [nextRecommendedStep, setNextRecommendedStep] = useState(
    'Relief granted. Retain official disposal order for records. Complainant may report any non-compliance to DLSA Helpline 15100.'
  );
  const [orderNumber, setOrderNumber] = useState(
    complaint.resolutionDetails?.orderNumber ||
      `ORD-NYA-2026-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [internalNotes, setInternalNotes] = useState(
    'Evidence verified against statutory checklist. Notice response reviewed. File closed with satisfaction order.'
  );

  const [showCertificateView, setShowCertificateView] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  // Resolution Presets
  const applyPreset = (preset: {
    status: ComplaintStatus;
    step: TimelineStep;
    relief: string;
    summary: string;
    nextStep: string;
    notes: string;
  }) => {
    setTargetStatus(preset.status);
    setTargetStep(preset.step);
    setReliefGranted(preset.relief);
    setResolutionSummary(preset.summary);
    setNextRecommendedStep(preset.nextStep);
    setInternalNotes(preset.notes);
  };

  const handleStatusChange = (newStatus: ComplaintStatus) => {
    setTargetStatus(newStatus);
    if (newStatus === 'Resolved') {
      setTargetStep('Resolved');
    } else if (newStatus === 'Escalated') {
      setTargetStep('Escalated');
    } else if (newStatus === 'Under Review' || newStatus === 'Action Pending') {
      setTargetStep('In Progress');
    }
  };

  const handleSubmitResolution = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: ResolveComplaintPayload = {
      status: targetStatus,
      timelineStep: targetStep,
      resolvedBy: officerName.trim(),
      officerRole: officerRole.trim(),
      resolutionSummary: resolutionSummary.trim(),
      reliefGranted: reliefGranted.trim() || undefined,
      orderNumber: orderNumber.trim(),
      internalNotes: internalNotes.trim() || undefined,
      nextRecommendedStep: nextRecommendedStep.trim() || undefined,
    };

    const updated = resolveComplaint(complaint.id, payload);
    if (updated) {
      setSuccessNotice(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onResolved(updated);
      }, 500);
    } else {
      setIsSubmitting(false);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full my-6 overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 text-lg">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white">
                  Officer Adjudication & Redressal Desk
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded border border-amber-400/30">
                  CONFIDENTIAL
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Resolve citizen grievance docket <span className="font-mono text-amber-400">{complaint.id}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Quick Grievance Context Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Complainant:</span>
              <span className="font-bold text-slate-900 text-sm">{complaint.fullName}</span>
              <span className="text-slate-500 block mt-0.5 font-mono">
                +91 {complaint.mobileNumber} · {complaint.district}, {complaint.state}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Grievance Category:</span>
              <span className="font-semibold text-slate-900">{complaint.category}</span>
              <span className="text-slate-600 block mt-0.5">{complaint.subcategory}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Opposite Party & Claim:</span>
              <span className="font-semibold text-slate-900">{complaint.oppositeParty}</span>
              <span className="text-emerald-700 font-bold block mt-0.5">
                Amount: {complaint.amountInvolved || 'Non-monetary claim'}
              </span>
            </div>
          </div>

          {/* Grievance Subject & Description preview */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950 uppercase tracking-wider text-[11px]">
                Citizen Grievance Submission
              </span>
              <span className="text-slate-500">
                Filed on {new Date(complaint.createdAt).toLocaleDateString('en-IN')}
              </span>
            </div>
            <div className="font-semibold text-slate-900">{complaint.subject}</div>
            <p className="text-slate-600 line-clamp-3 leading-relaxed">
              {complaint.detailedDescription}
            </p>
          </div>

          {/* Quick Resolution Templates */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Resolution Presets</span>
              </label>
              <span className="text-[11px] text-slate-500">Click to autofill standard legal order templates</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    status: 'Resolved',
                    step: 'Resolved',
                    relief: complaint.amountInvolved
                      ? `Full refund of ${complaint.amountInvolved} ordered within 10 days plus ₹5,000 compensation.`
                      : 'Full statutory refund and restitution ordered.',
                    summary: `Consumer grievance examined. Vendor held liable for deficiency of service under Consumer Protection Act 2019. Full refund ordered along with mental harassment compensation.`,
                    nextStep: 'Relief sanctioned. Vendor has 15 days to credit refund. Contact NCH 1915 if delayed.',
                    notes: 'Deficiency proven from invoice & email communications. Complaint closed in consumer favor.',
                  })
                }
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-slate-900 group-hover:text-emerald-900 flex items-center justify-between">
                  <span>Consumer Refund Approved</span>
                  <span className="text-[10px] text-emerald-600 font-bold">100% Free</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Full refund + statutory damage relief
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    status: 'Resolved',
                    step: 'Resolved',
                    relief: 'Fraudulent bank account frozen via I4C/1930 portal; FIR registered under Sec 66D IT Act.',
                    summary: `Cyber Fraud Cell intervention completed. Transaction lien placed on scammer's beneficiary bank account. Fund reversal process initiated under CrPC Sec 102 / BNSS.`,
                    nextStep: 'Lien successful. Citizen may collect court de-freeze release certificate from local Cyber Police.',
                    notes: 'Action taken within Golden Hour. Beneficiary KYC flagged on National Cyber Crime Reporting Portal.',
                  })
                }
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                  <span>Cyber Freeze & FIR Lodged</span>
                  <span className="text-[10px] text-blue-600 font-bold">Sec 66D</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Bank lien active & reversal initiated
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    status: 'Resolved',
                    step: 'Resolved',
                    relief: 'Free Advocate Assigned under NALSA Section 12 scheme (Docket Advocate: Adv. K. Swaminathan).',
                    summary: `Grievance assessed for statutory legal aid. Complainant verified eligible under Article 39A. Dedicated DLSA legal aid counsel assigned to file petition without court fees.`,
                    nextStep: 'DLSA advocate assigned. Counsel will contact citizen within 48 hours for vakalatnama signing.',
                    notes: 'Application approved by DLSA Secretary. 100% legal aid authorized with court fee waiver.',
                  })
                }
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-purple-50 hover:border-purple-300 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-slate-900 group-hover:text-purple-900 flex items-center justify-between">
                  <span>Legal Aid Counsel Assigned</span>
                  <span className="text-[10px] text-purple-600 font-bold">NALSA</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Free court representation appointed
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    status: 'Resolved',
                    step: 'Resolved',
                    relief: 'Mutual settlement deed signed before Lok Adalat bench; all disputes resolved amicably.',
                    summary: `Pre-litigation conciliation held. Both parties appeared before Lok Adalat panel and agreed to full compliance without further adversarial litigation.`,
                    nextStep: 'Non-appealable Lok Adalat award passed. Order enforceable as a civil court decree.',
                    notes: 'Mediation consent signed by both parties. No court fee payable. Case disposed.',
                  })
                }
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-amber-50 hover:border-amber-300 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-slate-900 group-hover:text-amber-900 flex items-center justify-between">
                  <span>Lok Adalat Conciliation</span>
                  <span className="text-[10px] text-amber-600 font-bold">Award</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Amicable mutual agreement finalized
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    status: 'Escalated',
                    step: 'Escalated',
                    relief: 'Formal statutory show-cause notice issued to respondent with 7-day summons.',
                    summary: `Prima facie violation substantiated. Official notice issued to ${complaint.oppositeParty} demanding explanation within 7 working days, failing which ex-parte proceedings will initiate.`,
                    nextStep: 'Notice dispatched via registered speed post. Awaiting respondent reply within 7 days.',
                    notes: 'Notice dispatched with Docket tracking. Inspection team alerted.',
                  })
                }
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-300 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-slate-900 group-hover:text-orange-900 flex items-center justify-between">
                  <span>Escalate & Issue Summons</span>
                  <span className="text-[10px] text-orange-600 font-bold">Notice</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Formal notice & 7-day compliance deadline
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    status: 'Action Pending',
                    step: 'In Progress',
                    relief: 'Site inspection & document verification ordered.',
                    summary: `Field officer deputed to verify facts on site. Verification report awaited within 5 working days.`,
                    nextStep: 'Site inspection pending. Citizen may keep original property/purchase proofs ready.',
                    notes: 'Field verification initiated with local municipal/revenue cell.',
                  })
                }
                className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                  <span>Inspection & Scrutiny</span>
                  <span className="text-[10px] text-slate-600 font-bold">Pending</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Order field inquiry & document audit
                </div>
              </button>
            </div>
          </div>

          {/* Adjudication Form */}
          <form onSubmit={handleSubmitResolution} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Update Docket Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={targetStatus}
                  onChange={(e) => handleStatusChange(e.target.value as ComplaintStatus)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-semibold focus:border-blue-600 focus:outline-none"
                >
                  <option value="Resolved">Resolved (Redressal Approved & Disposed)</option>
                  <option value="Escalated">Escalated (Summons / Authority Dispatched)</option>
                  <option value="In Progress">In Progress (Active Hearing / Investigation)</option>
                  <option value="Under Review">Under Review (Scrutiny Phase)</option>
                  <option value="Action Pending">Action Pending (Awaiting Documents)</option>
                  <option value="Closed">Closed (Dismissed / Settled)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Citizen Timeline Stage <span className="text-red-500">*</span>
                </label>
                <select
                  value={targetStep}
                  onChange={(e) => setTargetStep(e.target.value as TimelineStep)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-blue-600 focus:outline-none"
                >
                  <option value="Resolved">Resolved (Milestone 4 - Relief Disbursed)</option>
                  <option value="Escalated">Escalated (Milestone 3 - Official Cell Engaged)</option>
                  <option value="In Progress">In Progress (Milestone 2 - Scrutiny)</option>
                  <option value="Complaint Submitted">Complaint Submitted (Milestone 1)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Adjudicating Officer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Officer Designation / Cell <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={officerRole}
                  onChange={(e) => setOfficerRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Disposal / Order Ref No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Relief / Remedy Granted */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Relief / Remedy Granted to Citizen
              </label>
              <input
                type="text"
                value={reliefGranted}
                onChange={(e) => setReliefGranted(e.target.value)}
                placeholder="e.g. Full refund of ₹24,999 directed and compensation of ₹5,000 awarded"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none bg-emerald-50/40 text-emerald-950 font-medium"
              />
            </div>

            {/* Official Resolution Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Order / Disposal Directions <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={resolutionSummary}
                onChange={(e) => setResolutionSummary(e.target.value)}
                placeholder="Enter detailed statutory order, instructions to respondent, and disposal reasons..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Next Recommended Citizen Steps */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Next Directions for Complainant
              </label>
              <input
                type="text"
                value={nextRecommendedStep}
                onChange={(e) => setNextRecommendedStep(e.target.value)}
                placeholder="Instructions visible on the Track Complaint portal for the citizen"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Internal Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confidential Bench / Audit Remarks (Internal)
              </label>
              <input
                type="text"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Internal verification notes, officer remarks, or dispatch ledger numbers"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700 focus:border-blue-600 focus:outline-none font-mono"
              />
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCertificateView(!showCertificateView)}
                  className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>{showCertificateView ? 'Hide Certificate' : 'Preview Disposal Certificate'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-2 transition-all ${
                    targetStatus === 'Resolved'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  {targetStatus === 'Resolved' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <ClipboardCheck className="w-4 h-4" />
                  )}
                  <span>
                    {isSubmitting
                      ? 'Applying Order...'
                      : targetStatus === 'Resolved'
                      ? 'Resolve & Issue Order'
                      : 'Update Case Docket'}
                  </span>
                </button>
              </div>
            </div>
          </form>

          {/* Printable Official Disposal Order Certificate Preview */}
          {showCertificateView && (
            <div
              id="disposal-certificate"
              className="mt-6 p-6 sm:p-8 bg-slate-50 rounded-xl border-2 border-slate-300 space-y-6 text-xs text-slate-900 shadow-inner"
            >
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚖</span>
                  <div>
                    <div className="font-extrabold text-sm uppercase tracking-wide text-slate-950">
                      Grievance Redressal & Disposal Order Certificate
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Nyaya Sahaya Citizen Legal Portal · Authorized Adjudication Registry
                    </div>
                  </div>
                </div>
                <button
                  onClick={handlePrintCertificate}
                  className="px-3 py-1.5 rounded-md bg-white border border-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Grievance Docket:</span>
                  <span className="font-bold font-mono text-xs">{complaint.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Order Reference:</span>
                  <span className="font-bold font-mono text-xs text-blue-700">{orderNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Disposal Date:</span>
                  <span className="font-bold text-xs">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Final Disposition:</span>
                  <span className="font-bold text-xs text-emerald-700">{targetStatus}</span>
                </div>
              </div>

              <div className="space-y-2 bg-white p-4 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Operative Order & Directions:</div>
                <p className="text-slate-700 leading-relaxed italic">{resolutionSummary}</p>
                {reliefGranted && (
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <span className="font-bold text-emerald-800">Relief Sanctioned: </span>
                    <span className="text-slate-800 font-medium">{reliefGranted}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-300">
                <div className="text-[11px] text-slate-500">
                  Digitally issued under the authority of District Legal Services Authority (DLSA).
                  Enforceable under statutory legal provisions.
                </div>
                <div className="text-right sm:min-w-[200px]">
                  <div className="font-bold text-slate-950 font-serif text-sm">{officerName}</div>
                  <div className="text-[10px] text-slate-600 font-medium">{officerRole}</div>
                  <div className="text-[9px] text-emerald-700 font-mono mt-0.5">
                    [Digitally Sealed & Verified]
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
