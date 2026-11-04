import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, CategoryKey } from '../types';
import {
  getAllComplaints,
  verifyAdminPassword,
  isAdminSessionActive,
  setAdminSession,
  getAdminPassword,
  setAdminPassword,
  resetAdminPassword,
  DEFAULT_ADMIN_PASSWORD,
  deleteComplaint,
  resetComplaintsToDefault,
} from '../utils/storage';
import { AdminResolutionModal } from '../components/AdminResolutionModal';
import { ReceiptModal } from '../components/ReceiptModal';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Gavel,
  RefreshCw,
  LogOut,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Building2,
  Phone,
  Calendar,
  Trash2,
  Printer,
  Sparkles,
  ArrowUpDown,
  Download,
  HelpCircle,
  Check,
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface AdminViewProps {
  initialResolveComplaintId?: string;
}

export const AdminView: React.FC<AdminViewProps> = ({ initialResolveComplaintId }) => {
  const { t, tCategory } = useLanguage();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [authError, setAuthError] = useState('');

  // Password Change Modal State
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [changePasswordMessage, setChangePasswordMessage] = useState<{ text: string; error: boolean } | null>(null);

  // In-app Delete & Reset Modal State
  const [complaintToDelete, setComplaintToDelete] = useState<Complaint | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Complaints & Table State
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [activeTabFilter, setActiveTabFilter] = useState<'ALL' | 'UNRESOLVED' | 'RESOLVED' | 'MONETARY'>('ALL');

  // Selected complaint for resolution
  const [selectedForResolution, setSelectedForResolution] = useState<Complaint | null>(null);
  // Selected complaint for full inspection
  const [selectedForInspection, setSelectedForInspection] = useState<Complaint | null>(null);
  // Receipt modal
  const [selectedForReceipt, setSelectedForReceipt] = useState<Complaint | null>(null);

  // Initial check for active session and event listener for real-time changes
  useEffect(() => {
    if (isAdminSessionActive()) {
      setIsAuthenticated(true);
      loadComplaints();
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      loadComplaints();
    };
    window.addEventListener('nyaya_complaints_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('nyaya_complaints_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadComplaints = () => {
    const list = getAllComplaints();
    setComplaints(list);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!passwordInput.trim()) {
      setAuthError('Please enter the administrative password.');
      return;
    }

    if (verifyAdminPassword(passwordInput)) {
      setIsAuthenticated(true);
      setAdminSession(true, rememberSession);
      setPasswordInput('');
      loadComplaints();
    } else {
      setAuthError('Invalid administrator credentials. Please verify your password.');
    }
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAuthenticated(false);
    setSelectedForResolution(null);
    setSelectedForInspection(null);
  };

  const handleQuickFillPassword = () => {
    const current = getAdminPassword();
    setPasswordInput(current);
    setAuthError('');
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordMessage(null);

    if (!verifyAdminPassword(oldPasswordInput)) {
      setChangePasswordMessage({ text: 'Current password does not match.', error: true });
      return;
    }

    if (newPasswordInput.length < 4) {
      setChangePasswordMessage({ text: 'New password must be at least 4 characters.', error: true });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setChangePasswordMessage({ text: 'New passwords do not match.', error: true });
      return;
    }

    setAdminPassword(newPasswordInput);
    setChangePasswordMessage({ text: 'Password successfully updated!', error: false });
    setTimeout(() => {
      setChangePasswordModalOpen(false);
      setOldPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      setChangePasswordMessage(null);
    }, 1200);
  };

  const handleResetPasswordToDefault = () => {
    resetAdminPassword();
    setChangePasswordMessage({
      text: `Password reset to default: "${DEFAULT_ADMIN_PASSWORD}"`,
      error: false,
    });
  };

  const handleOpenDelete = (complaint: Complaint) => {
    setComplaintToDelete(complaint);
  };

  const handleConfirmDelete = () => {
    if (!complaintToDelete) return;
    const targetId = complaintToDelete.id;
    deleteComplaint(targetId);
    const freshComplaints = getAllComplaints();
    setComplaints(freshComplaints);
    if (selectedForInspection?.id.toUpperCase() === targetId.toUpperCase()) {
      setSelectedForInspection(null);
    }
    if (selectedForResolution?.id.toUpperCase() === targetId.toUpperCase()) {
      setSelectedForResolution(null);
    }
    setComplaintToDelete(null);
    setToastMessage(`Docket ${targetId} has been permanently deleted.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmReset = () => {
    resetComplaintsToDefault();
    loadComplaints();
    setResetConfirmOpen(false);
    setToastMessage('Dockets have been reset to default seed state.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleComplaintResolved = (updated: Complaint) => {
    loadComplaints();
    setSelectedForResolution(null);
    if (selectedForInspection?.id === updated.id) {
      setSelectedForInspection(updated);
    }
  };

  // Metrics Calculations
  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length;
  const pendingCount = complaints.filter((c) => c.status === 'Submitted' || c.status === 'Under Review').length;
  const escalatedCount = complaints.filter((c) => c.status === 'Escalated' || c.status === 'Action Pending').length;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedCount / totalComplaints) * 100) : 0;

  // Filtered List
  const filteredComplaints = complaints.filter((c) => {
    // Search query
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchId = c.id.toLowerCase().includes(query);
      const matchName = c.fullName.toLowerCase().includes(query);
      const matchMobile = c.mobileNumber.includes(query);
      const matchSubject = c.subject.toLowerCase().includes(query);
      const matchParty = c.oppositeParty.toLowerCase().includes(query);
      if (!matchId && !matchName && !matchMobile && !matchSubject && !matchParty) {
        return false;
      }
    }

    // Status Filter
    if (selectedStatusFilter !== 'ALL' && c.status !== selectedStatusFilter) {
      return false;
    }

    // Category Filter
    if (selectedCategoryFilter !== 'ALL' && c.category !== selectedCategoryFilter) {
      return false;
    }

    // Tab Filter
    if (activeTabFilter === 'UNRESOLVED' && (c.status === 'Resolved' || c.status === 'Closed')) {
      return false;
    }
    if (activeTabFilter === 'RESOLVED' && c.status !== 'Resolved' && c.status !== 'Closed') {
      return false;
    }
    if (activeTabFilter === 'MONETARY' && (!c.amountInvolved || c.amountInvolved === 'N/A')) {
      return false;
    }

    return true;
  });

  // Export CSV summary
  const handleExportCSV = () => {
    const headers = ['Docket ID', 'Citizen Name', 'Mobile', 'Category', 'Status', 'Date Filed', 'Subject', 'Opposite Party', 'Order Number'];
    const rows = filteredComplaints.map((c) => [
      c.id,
      `"${c.fullName.replace(/"/g, '""')}"`,
      c.mobileNumber,
      `"${c.category}"`,
      c.status,
      new Date(c.createdAt).toLocaleDateString('en-IN'),
      `"${c.subject.replace(/"/g, '""')}"`,
      `"${c.oppositeParty.replace(/"/g, '""')}"`,
      c.resolutionDetails?.orderNumber || 'Pending',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nyaya_Sahaya_Grievances_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // VIEW 1: LOCKED PASSWORD AUTHENTICATION BLOCK
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-slate-900 border border-blue-400/40 flex items-center justify-center text-3xl shadow-lg mb-1">
                ⚖
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Restricted Officer Access Block</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Officer & Administrator Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Authorized Judicial Grievance Redressal Cell · District Legal Services Authority (DLSA) Portal for Reviewing & Resolving Citizen Complaints.
              </p>
            </div>
          </div>

          {/* Login Form Body */}
          <div className="p-6 sm:p-10 max-w-md mx-auto space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Officer Designation
                </label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2.5 text-xs text-slate-700">
                  <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="font-semibold text-slate-900">
                    Grievance Disposal & Redressal Officer
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Administrative Passcode <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:outline-none pr-10 font-mono"
                  />
                  <div className="absolute right-3.5 top-3.5 text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberSession}
                    onChange={(e) => setRememberSession(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-0"
                  />
                  <span>Keep session active on this device</span>
                </label>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>{authError}</div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Verify Passcode & Enter Admin Block</span>
              </button>
            </form>

            {/* Quick Demo Credentials Helper */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Evaluation Access Notice</span>
              </div>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                The default officer administration password is set to{' '}
                <span className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded text-slate-900">
                  admin123
                </span>
                . You can change this passcode at any time once logged in.
              </p>
              <button
                type="button"
                onClick={handleQuickFillPassword}
                className="w-full py-2 px-3 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-amber-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Quick-Fill Default Passcode (admin123)</span>
              </button>
            </div>

            {/* Statutory Security Disclaimer */}
            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Official activity on this adjudication desk is logged for regulatory compliance under Citizen Grievance Redressal Norms.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN RESOLUTION DASHBOARD
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Officer Session Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/30 flex items-center justify-center text-2xl shadow-inner">
            ⚖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white">Grievance Adjudication & Resolution Bench</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Officer Signed In
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>DLSA Grievance Cell</span>
              <span>·</span>
              <span className="text-amber-400">Resolution Authority Active</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setChangePasswordModalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('admin_change_pwd_btn')}</span>
          </button>

          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reload initial seed dockets"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('admin_reset_dockets_btn')}</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('admin_signout_btn')}</span>
          </button>
        </div>
      </div>

      {/* KPI & Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {t('admin_kpi_total')}
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {totalComplaints}
          </div>
          <span className="text-[11px] text-slate-500 block">Registered citizen dockets</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">
            {t('admin_kpi_pending')}
          </span>
          <div className="text-3xl font-extrabold text-amber-700 font-mono">
            {pendingCount}
          </div>
          <span className="text-[11px] text-slate-500 block">Under initial legal review</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            {t('admin_kpi_escalated')}
          </span>
          <div className="text-3xl font-extrabold text-blue-700 font-mono">
            {escalatedCount}
          </div>
          <span className="text-[11px] text-slate-500 block">Summons / Agency engaged</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
            {t('admin_kpi_resolved')}
          </span>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono">
            {resolvedCount}
          </div>
          <span className="text-[11px] text-emerald-800 block">Relief granted & orders issued</span>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block">
              {t('admin_kpi_clearance')}
            </span>
            <div className="text-3xl font-extrabold text-indigo-700 font-mono mt-1">
              {resolutionRate}%
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${resolutionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Roster & Grievance Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Table Filter & Search Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTabFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTabFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('admin_tab_all')} ({totalComplaints})
            </button>
            <button
              onClick={() => setActiveTabFilter('UNRESOLVED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTabFilter === 'UNRESOLVED'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('admin_tab_unresolved')} ({totalComplaints - resolvedCount})
            </button>
            <button
              onClick={() => setActiveTabFilter('RESOLVED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTabFilter === 'RESOLVED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('admin_tab_resolved')} ({resolvedCount})
            </button>
            <button
              onClick={() => setActiveTabFilter('MONETARY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTabFilter === 'MONETARY'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('admin_tab_monetary')}
            </button>
          </div>

          {/* Export Report CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>{t('admin_export_csv') || 'Export CSV Dossier'}</span>
            </button>
          </div>
        </div>

        {/* Search & Dropdown Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('admin_search_placeholder')}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:border-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">{t('admin_filter_status_all')}</option>
              <option value="Submitted">{t('status_submitted')}</option>
              <option value="Under Review">{t('status_under_review')}</option>
              <option value="In Progress">{t('status_in_progress')}</option>
              <option value="Action Pending">{t('status_action_pending')}</option>
              <option value="Escalated">{t('status_escalated')}</option>
              <option value="Resolved">{t('status_resolved')}</option>
              <option value="Closed">{t('status_closed')}</option>
            </select>
          </div>

          <div>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:border-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">{t('admin_filter_category_all')}</option>
              <option value="Consumer Rights">{tCategory('Consumer Rights')}</option>
              <option value="Cybercrime">{tCategory('Cybercrime')}</option>
              <option value="Women's Rights">{tCategory("Women's Rights")}</option>
              <option value="Domestic Violence">{tCategory('Domestic Violence')}</option>
              <option value="Labour/Employment">{tCategory('Labour/Employment')}</option>
              <option value="Property/Land">{tCategory('Property/Land')}</option>
              <option value="Financial Fraud">{tCategory('Financial Fraud')}</option>
              <option value="Education/Student Rights">{tCategory('Education/Student Rights')}</option>
              <option value="Senior Citizen Rights">{tCategory('Senior Citizen Rights')}</option>
              <option value="Other">{tCategory('Other')}</option>
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">{t('admin_col_docket')}</th>
                <th className="py-3 px-4">{t('admin_col_complainant')}</th>
                <th className="py-3 px-4">{t('admin_col_category')}</th>
                <th className="py-3 px-4">{t('admin_col_opposite')}</th>
                <th className="py-3 px-4">{t('admin_col_status')}</th>
                <th className="py-3 px-4">{t('admin_col_date')}</th>
                <th className="py-3 px-4 text-right">{t('admin_col_action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No grievance records match the current filters.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => {
                  const isResolved = c.status === 'Resolved' || c.status === 'Closed';

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      {/* Docket ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedForInspection(c)}
                          className="hover:text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <span>{c.id}</span>
                        </button>
                        {c.resolutionDetails?.orderNumber && (
                          <span className="block text-[10px] font-mono text-emerald-700 font-medium">
                            {c.resolutionDetails.orderNumber}
                          </span>
                        )}
                      </td>

                      {/* Complainant */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{c.fullName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">+91 {c.mobileNumber}</div>
                        <div className="text-[10px] text-slate-400">{c.district}, {c.state}</div>
                      </td>

                      {/* Category & Subject */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 mb-1">
                          {c.category}
                        </span>
                        <div className="font-medium text-slate-900 truncate" title={c.subject}>
                          {c.subject}
                        </div>
                        {c.amountInvolved && (
                          <div className="text-[10px] font-bold text-emerald-700">
                            Claim: {c.amountInvolved}
                          </div>
                        )}
                      </td>

                      {/* Opposite Party */}
                      <td className="py-3.5 px-4 max-w-[140px] truncate text-slate-700" title={c.oppositeParty}>
                        {c.oppositeParty}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            c.status === 'Resolved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : c.status === 'Escalated'
                              ? 'bg-orange-100 text-orange-800 border border-orange-300'
                              : c.status === 'Under Review' || c.status === 'Action Pending'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                          }`}
                        >
                          {c.status === 'Resolved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          <span>{c.status}</span>
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Stage: {c.timelineStep}
                        </div>
                      </td>

                      {/* Date Filed */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                        {new Date(c.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Prominent Resolve Problem Button */}
                          <button
                            onClick={() => setSelectedForResolution(c)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95 ${
                              isResolved
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white ring-1 ring-emerald-400'
                            }`}
                            title="Open Adjudication & Resolution Window"
                          >
                            <Gavel className="w-3.5 h-3.5" />
                            <span>{isResolved ? t('admin_action_amend') : t('admin_action_resolve')}</span>
                          </button>

                          {/* Quick Inspect Button */}
                          <button
                            onClick={() => setSelectedForInspection(c)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Inspect Complaint Details"
                          >
                            <FileText className="w-4 h-4" />
                          </button>

                          {/* Print Receipt */}
                          <button
                            onClick={() => setSelectedForReceipt(c)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Print Acknowledgement Slip"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleOpenDelete(c)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title={t('admin_action_delete')}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPLAINT RESOLUTION MODAL */}
      {selectedForResolution && (
        <AdminResolutionModal
          complaint={selectedForResolution}
          isOpen={true}
          onClose={() => setSelectedForResolution(null)}
          onResolved={handleComplaintResolved}
        />
      )}

      {/* FULL COMPLAINT INSPECTION DRAWER/MODAL */}
      {selectedForInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Citizen Grievance Docket Dossier
                </span>
                <h3 className="text-xl font-bold font-mono text-white mt-0.5">
                  {selectedForInspection.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedForInspection(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-slate-700">
              {/* Complainant Grid */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-500 block">Complainant:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {selectedForInspection.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Mobile Number:</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    +91 {selectedForInspection.mobileNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Jurisdiction:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedForInspection.district}, {selectedForInspection.state}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Incident Date:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedForInspection.incidentDate}
                  </span>
                </div>
              </div>

              {/* Status & Resolution Order Highlights (if resolved) */}
              {selectedForInspection.resolutionDetails ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      Official Resolution Order Active
                    </span>
                    <span className="font-mono text-emerald-800 font-bold">
                      Order Ref: {selectedForInspection.resolutionDetails.orderNumber}
                    </span>
                  </div>
                  <p className="text-emerald-900 text-sm leading-relaxed">
                    {selectedForInspection.resolutionDetails.resolutionSummary}
                  </p>
                  {selectedForInspection.resolutionDetails.reliefGranted && (
                    <div className="pt-1 text-emerald-950 font-semibold">
                      Relief Granted: {selectedForInspection.resolutionDetails.reliefGranted}
                    </div>
                  )}
                  <div className="text-[11px] text-emerald-700 pt-1 border-t border-emerald-200 flex items-center justify-between">
                    <span>
                      Adjudicated by: {selectedForInspection.resolutionDetails.resolvedBy} (
                      {selectedForInspection.resolutionDetails.officerRole})
                    </span>
                    <span>
                      Date: {new Date(selectedForInspection.resolutionDetails.resolvedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-amber-900 text-xs">Awaiting Formal Disposal</div>
                    <div className="text-amber-800 text-[11px]">
                      This case docket has not yet been resolved. Click "Resolve Problem" to record an official order.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedForResolution(selectedForInspection);
                      setSelectedForInspection(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-sm"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>Resolve Problem Now</span>
                  </button>
                </div>
              )}

              {/* Subject & Description */}
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Grievance Subject:</span>
                  <span className="font-bold text-slate-900 text-sm block">
                    {selectedForInspection.subject}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-1">Detailed Complainant Statement:</span>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedForInspection.detailedDescription}
                  </p>
                </div>
              </div>

              {/* Evidence Uploads */}
              {selectedForInspection.evidenceFiles && selectedForInspection.evidenceFiles.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900 block mb-2">
                    Evidence Attached ({selectedForInspection.evidenceFiles.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedForInspection.evidenceFiles.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-medium text-slate-900 truncate">{ev.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0">
                          {ev.category} · {ev.size}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* History Trail */}
              <div>
                <span className="font-bold text-slate-900 block mb-2">
                  Action History & Audit Trail:
                </span>
                <div className="space-y-3 border-l-2 border-blue-200 pl-4">
                  {selectedForInspection.history.map((h, i) => (
                    <div key={i} className="space-y-0.5 relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900">{h.title}</span>
                        <span className="text-slate-400 font-mono">{h.date}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {h.description}
                      </p>
                      <div className="text-[10px] text-slate-400 font-medium">Actor: {h.actor}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedForResolution(selectedForInspection);
                    setSelectedForInspection(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Gavel className="w-4 h-4" />
                  <span>
                    {selectedForInspection.status === 'Resolved'
                      ? (t('admin_action_amend') || 'Amend Resolution Order')
                      : (t('admin_action_resolve') || 'Resolve Problem')}
                  </span>
                </button>

                <button
                  onClick={() => {
                    const target = selectedForInspection;
                    handleOpenDelete(target);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Permanently remove this grievance docket"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('admin_action_delete') || 'Delete Docket'}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedForInspection(null)}
                className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer"
              >
                {t('close') || 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {selectedForReceipt && (
        <ReceiptModal
          complaint={selectedForReceipt}
          isOpen={true}
          onClose={() => setSelectedForReceipt(null)}
        />
      )}

      {/* CHANGE PASSWORD MODAL */}
      {changePasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Change Administrative Password</h3>
              </div>
              <button
                onClick={() => {
                  setChangePasswordModalOpen(false);
                  setChangePasswordMessage(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={oldPasswordInput}
                  onChange={(e) => setOldPasswordInput(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter new secure password"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  placeholder="Confirm new secure password"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-blue-600 focus:outline-none"
                />
              </div>

              {changePasswordMessage && (
                <div
                  className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                    changePasswordMessage.error
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                  }`}
                >
                  {changePasswordMessage.error ? (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{changePasswordMessage.text}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetPasswordToDefault}
                  className="text-xs text-amber-700 hover:underline"
                >
                  Reset to default ({DEFAULT_ADMIN_PASSWORD})
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setChangePasswordModalOpen(false);
                      setChangePasswordMessage(null);
                    }}
                    className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IN-APP DELETE CONFIRMATION MODAL */}
      {complaintToDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-red-950 text-white px-6 py-4 flex items-center justify-between border-b border-red-900">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-900/80 border border-red-700 flex items-center justify-center text-red-300">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{t('admin_delete_modal_title')}</h3>
                  <span className="text-[10px] text-red-300 font-mono font-bold">{complaintToDelete.id}</span>
                </div>
              </div>
              <button
                onClick={() => setComplaintToDelete(null)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="leading-relaxed">
                {t('admin_delete_modal_text')} <strong className="font-mono text-slate-900 font-bold">{complaintToDelete.id}</strong> (
                {complaintToDelete.fullName} - {tCategory(complaintToDelete.category)})?
              </p>

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-[11px] leading-relaxed">
                <strong>Permanent Action:</strong> This record will be permanently deleted from local storage. The citizen docket reference will no longer exist in the system.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setComplaintToDelete(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium cursor-pointer"
                >
                  {t('admin_delete_modal_cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('admin_delete_modal_confirm')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Reset Sample Dockets</h3>
              </div>
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="leading-relaxed">
                Reset all dockets to the initial pre-configured legal grievances? Any custom complaints or resolution edits you made will be refreshed.
              </p>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setResetConfirmOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTICE */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
