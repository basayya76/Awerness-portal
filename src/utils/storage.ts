import { Complaint, ComplaintHistoryEvent, ComplaintStatus, TimelineStep } from '../types';
import { COMPLAINT_CATEGORIES, INITIAL_DEMO_COMPLAINTS } from '../data/legalData';

const STORAGE_KEY = 'nyaya_sahaya_complaints_v1';

export function initializeStorage(): void {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
    }
  } catch (e) {
    console.error('Failed to initialize storage', e);
  }
}

export function getAllComplaints(): Complaint[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
      return INITIAL_DEMO_COMPLAINTS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_COMPLAINTS;
  } catch {
    return INITIAL_DEMO_COMPLAINTS;
  }
}

export function saveComplaint(complaint: Complaint): void {
  try {
    const current = getAllComplaints();
    const updated = [complaint, ...current.filter((c) => c.id !== complaint.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save complaint', e);
  }
}

export function findComplaint(complaintId: string, mobileNumber?: string): Complaint | null {
  const all = getAllComplaints();
  const cleanId = complaintId.trim().toUpperCase();
  const cleanMobile = mobileNumber ? mobileNumber.trim().replace(/\D/g, '') : '';

  const match = all.find((c) => {
    const idMatches = c.id.toUpperCase() === cleanId;
    if (!idMatches) return false;
    if (!cleanMobile) return true;
    const itemMobile = c.mobileNumber.replace(/\D/g, '');
    return itemMobile === cleanMobile || itemMobile.endsWith(cleanMobile) || cleanMobile.endsWith(itemMobile);
  });

  return match || null;
}

export function checkExistingComplaint(
  mobileNumber: string,
  category: CategoryKey,
  subcategory?: string
): Complaint | null {
  const all = getAllComplaints();
  const cleanMobile = mobileNumber.trim().replace(/\D/g, '');
  if (!cleanMobile) return null;

  return all.find((c) => {
    const itemMobile = c.mobileNumber.replace(/\D/g, '');
    const mobileMatches =
      itemMobile === cleanMobile ||
      itemMobile.endsWith(cleanMobile) ||
      cleanMobile.endsWith(itemMobile);

    if (!mobileMatches) return false;
    if (c.category !== category) return false;

    // Check if the existing complaint is actively pending/in-progress (not closed)
    const isOngoing = c.status !== 'Closed';

    if (subcategory && c.subcategory) {
      return isOngoing && c.subcategory.toLowerCase() === subcategory.toLowerCase();
    }
    return isOngoing;
  }) || null;
}

export function generateComplaintId(): string {
  // Format: NYA-2026-XXXXXX as specified in user request
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `NYA-2026-${randomSixDigits}`;
}

export function createNewComplaint(
  data: Omit<
    Complaint,
    | 'id'
    | 'status'
    | 'timelineStep'
    | 'createdAt'
    | 'updatedAt'
    | 'nextRecommendedStep'
    | 'recommendedAuthority'
    | 'officialPortalUrl'
    | 'authorityHelpline'
    | 'history'
  >
): Complaint {
  const id = generateComplaintId();
  const now = new Date().toISOString();
  const formattedDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const catMeta = COMPLAINT_CATEGORIES[data.category] || COMPLAINT_CATEGORIES['Other'];

  const initialHistory: ComplaintHistoryEvent[] = [
    {
      step: 'Complaint Submitted',
      status: 'Submitted',
      date: formattedDate,
      title: 'Complaint Registered',
      description: `Grievance registered under ${data.category} (${data.subcategory || 'General'}). Reference docket initialized.`,
      actor: 'Nyaya Sahaya Citizen Gateway',
    },
    {
      step: 'In Progress',
      status: 'Under Review',
      date: 'Pending Legal Review',
      title: 'Initial Scrutiny & Authority Mapping',
      description: `Case queued for routing to ${catMeta.recommendedAuthority}.`,
      actor: 'Legal Redressal Cell',
    },
  ];

  const newRecord: Complaint = {
    ...data,
    id,
    status: 'Submitted',
    timelineStep: 'Complaint Submitted',
    createdAt: now,
    updatedAt: now,
    nextRecommendedStep: catMeta.nextStepSummary,
    recommendedAuthority: catMeta.recommendedAuthority,
    officialPortalUrl: catMeta.portalUrl,
    authorityHelpline: catMeta.helpline,
    history: initialHistory,
  };

  saveComplaint(newRecord);
  return newRecord;
}

// -------------------------------------------------------------
// Administrative Authentication & Grievance Resolution Functions
// -------------------------------------------------------------

export const DEFAULT_ADMIN_PASSWORD = 'admin123';
const ADMIN_PASSWORD_KEY = 'nyaya_sahaya_admin_pwd_v1';
const ADMIN_SESSION_KEY = 'nyaya_sahaya_admin_session_v1';

export function getAdminPassword(): string {
  try {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
  } catch {
    return DEFAULT_ADMIN_PASSWORD;
  }
}

export function setAdminPassword(newPassword: string): void {
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword.trim());
  } catch (e) {
    console.error('Failed to set admin password', e);
  }
}

export function resetAdminPassword(): void {
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
  } catch (e) {
    console.error('Failed to reset admin password', e);
  }
}

export function verifyAdminPassword(input: string): boolean {
  if (!input) return false;
  return input.trim() === getAdminPassword();
}

export function isAdminSessionActive(): boolean {
  try {
    return (
      sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true' ||
      localStorage.getItem(ADMIN_SESSION_KEY) === 'true'
    );
  } catch {
    return false;
  }
}

export function setAdminSession(active: boolean, remember: boolean = false): void {
  try {
    if (active) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      if (remember) {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      }
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (e) {
    console.error('Failed to update admin session', e);
  }
}

export function updateComplaint(updated: Complaint): boolean {
  try {
    const current = getAllComplaints();
    const index = current.findIndex((c) => c.id.toUpperCase() === updated.id.toUpperCase());
    if (index === -1) {
      current.unshift(updated);
    } else {
      current[index] = { ...updated, updatedAt: new Date().toISOString() };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  } catch (e) {
    console.error('Failed to update complaint', e);
    return false;
  }
}

export interface ResolveComplaintPayload {
  status: ComplaintStatus;
  timelineStep: TimelineStep;
  resolvedBy: string;
  officerRole: string;
  resolutionSummary: string;
  reliefGranted?: string;
  orderNumber?: string;
  internalNotes?: string;
  nextRecommendedStep?: string;
}

export function resolveComplaint(
  complaintId: string,
  resolution: ResolveComplaintPayload
): Complaint | null {
  try {
    const all = getAllComplaints();
    const cleanId = complaintId.trim().toUpperCase();
    const index = all.findIndex((c) => c.id.toUpperCase() === cleanId);
    if (index === -1) return null;

    const target = all[index];
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const orderNum =
      resolution.orderNumber?.trim() ||
      `ORD-NYA-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const isResolvedStatus = resolution.status === 'Resolved';
    const eventTitle = isResolvedStatus
      ? 'Grievance Resolved & Official Relief Ordered'
      : `Adjudication Order: Status Updated to ${resolution.status}`;

    const eventDescription = [
      resolution.resolutionSummary,
      resolution.reliefGranted ? `Relief Granted: ${resolution.reliefGranted}` : '',
      `Order Ref: ${orderNum}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const newHistoryEvent: ComplaintHistoryEvent = {
      step: resolution.timelineStep,
      status: resolution.status,
      date: formattedDate,
      title: eventTitle,
      description: eventDescription,
      actor: `${resolution.resolvedBy} (${resolution.officerRole})`,
    };

    const updatedComplaint: Complaint = {
      ...target,
      status: resolution.status,
      timelineStep: resolution.timelineStep,
      updatedAt: now.toISOString(),
      nextRecommendedStep:
        resolution.nextRecommendedStep?.trim() ||
        (isResolvedStatus
          ? `Grievance has been adjudicated and resolved. Relief granted under Order ${orderNum}. Retain this docket for compliance verification.`
          : target.nextRecommendedStep),
      resolutionDetails: {
        resolvedAt: now.toISOString(),
        resolvedBy: resolution.resolvedBy,
        officerRole: resolution.officerRole,
        resolutionSummary: resolution.resolutionSummary,
        reliefGranted: resolution.reliefGranted,
        orderNumber: orderNum,
        internalNotes: resolution.internalNotes,
      },
      history: [newHistoryEvent, ...target.history],
    };

    all[index] = updatedComplaint;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return updatedComplaint;
  } catch (e) {
    console.error('Failed to resolve complaint', e);
    return null;
  }
}

export function deleteComplaint(complaintId: string): boolean {
  try {
    const current = getAllComplaints();
    const cleanId = (complaintId || '').trim().toUpperCase();
    const filtered = current.filter((c) => (c.id || '').trim().toUpperCase() !== cleanId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    try {
      window.dispatchEvent(new CustomEvent('nyaya_complaints_changed', { detail: { deletedId: cleanId } }));
    } catch {}
    return true;
  } catch (e) {
    console.error('Failed to delete complaint', e);
    return false;
  }
}

export function resetComplaintsToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
  } catch (e) {
    console.error('Failed to reset complaints', e);
  }
}
