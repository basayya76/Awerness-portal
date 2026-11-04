import React from 'react';
import { Complaint } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { X, Printer, CheckCircle2, ShieldCheck, Download, ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';

interface ReceiptModalProps {
  complaint: Complaint;
  isOpen: boolean;
  onClose: () => void;
  onTrackNow?: (id: string) => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  complaint,
  isOpen,
  onClose,
  onTrackNow,
}) => {
  const { t, tCategory } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚖</span>
            <div>
              <h3 className="font-bold text-base text-white">{t('receipt_modal_title')}</h3>
              <p className="text-xs text-slate-300">{t('receipt_issued_by')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div id="printable-receipt" className="p-6 sm:p-8 space-y-6 text-sm">
          {/* Top Seal & Reference Number */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-800">
                Nyaya Sahaya Portal Reference Docket
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-950 mt-1">
                {complaint.id}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('receipt_filed_on') || 'Registered:'} {new Date(complaint.createdAt).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-lg text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-xs uppercase tracking-wide">
                  {t('receipt_status') || 'Status:'} {t(complaint.status)}
                </div>
                <div className="text-[11px] text-emerald-700">Docket Validated & Logged</div>
              </div>
            </div>
          </div>

          {/* Citizen Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">{t('receipt_complainant')}</span>
              <span className="font-semibold text-slate-900 text-sm">{complaint.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Registered Mobile Number:</span>
              <span className="font-semibold text-slate-900 font-mono text-sm">+91 {complaint.mobileNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email Address:</span>
              <span className="font-semibold text-slate-900">{complaint.email || 'Not Specified'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Jurisdiction / Location:</span>
              <span className="font-semibold text-slate-900 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {complaint.cityTown ? `${complaint.cityTown}, ` : ''}{complaint.district}, {complaint.state}
              </span>
            </div>
          </div>

          {/* Grievance Specifics */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-blue-900">
              <Tag className="w-4 h-4" />
              Grievance Summary
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">{t('receipt_category')}</span>
                <span className="font-semibold text-slate-900">{tCategory(complaint.category)}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Subcategory:</span>
                <span className="font-semibold text-slate-900">{complaint.subcategory}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">{t('receipt_opposite')}</span>
                <span className="font-semibold text-slate-900">{complaint.oppositeParty}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Amount Involved:</span>
                <span className="font-semibold text-slate-900">{complaint.amountInvolved || 'N/A'}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block mb-1">Subject of Complaint:</span>
              <span className="font-semibold text-slate-900 block">{complaint.subject}</span>
              <p className="text-slate-600 mt-1 line-clamp-3 leading-relaxed">{complaint.detailedDescription}</p>
            </div>
          </div>

          {/* Official Resolution / Order Details (if resolved) */}
          {complaint.resolutionDetails && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Official Redressal & Disposal Order
                </span>
                <span className="font-mono font-bold text-emerald-800">
                  {complaint.resolutionDetails.orderNumber}
                </span>
              </div>
              <div className="text-slate-800 leading-relaxed font-medium">
                {complaint.resolutionDetails.resolutionSummary}
              </div>
              {complaint.resolutionDetails.reliefGranted && (
                <div className="text-emerald-900 font-semibold pt-1 border-t border-emerald-200">
                  Relief Sanctioned: {complaint.resolutionDetails.reliefGranted}
                </div>
              )}
              <div className="text-[11px] text-emerald-700 flex items-center justify-between pt-1">
                <span>
                  Adjudicated by: {complaint.resolutionDetails.resolvedBy} (
                  {complaint.resolutionDetails.officerRole})
                </span>
                <span>
                  Date:{' '}
                  {new Date(complaint.resolutionDetails.resolvedAt).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>
          )}

          {/* Next Recommended Step & Authority */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              Recommended Redressal Authority & Next Action
            </div>
            <div className="text-slate-800">
              <strong>Primary Authority:</strong> {complaint.recommendedAuthority}
            </div>
            <div className="text-slate-700 leading-relaxed">
              <strong>Recommended Action:</strong> {complaint.nextRecommendedStep}
            </div>
            {complaint.authorityHelpline && (
              <div className="text-slate-700">
                <strong>Direct Official Helpline:</strong>{' '}
                <a href={`tel:${complaint.authorityHelpline.split(' ')[0]}`} className="font-bold text-blue-700 underline">
                  {complaint.authorityHelpline}
                </a>
              </div>
            )}
          </div>

          {/* Notice Note */}
          <div className="text-[11px] text-slate-500 leading-snug border-t border-slate-200 pt-3">
            Please retain this reference number for all future correspondence. You can check the current processing stage at any time via the <strong>Track Complaint</strong> section.
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              {t('receipt_print_btn') || 'Print / Save Slip'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onTrackNow && (
              <button
                onClick={() => {
                  onClose();
                  onTrackNow(complaint.id);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                {t('raise_btn_track') || 'Track This Complaint Now'}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              {t('close') || 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
