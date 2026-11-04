export type ComplaintStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Additional Information Required'
  | 'Referred'
  | 'Action Pending'
  | 'Escalated'
  | 'Resolved'
  | 'Closed';

export type TimelineStep =
  | 'Complaint Submitted'
  | 'In Progress'
  | 'Escalated'
  | 'Resolved';

export type CategoryKey =
  | 'Consumer Rights'
  | 'Cybercrime'
  | "Women's Rights"
  | 'Domestic Violence'
  | 'Labour/Employment'
  | 'Education/Student Rights'
  | 'Property/Land'
  | 'Family Dispute'
  | 'Financial Fraud'
  | 'Government Service'
  | 'Senior Citizen Rights'
  | 'Disability Rights'
  | 'Housing/Tenancy'
  | 'Criminal Matter'
  | 'Other';

export interface EvidenceFile {
  id: string;
  name: string;
  size: string;
  type: string;
  category: 'Image' | 'PDF' | 'Screenshot' | 'Receipt' | 'Video' | 'Document';
}

export interface ComplaintHistoryEvent {
  step: TimelineStep;
  status: ComplaintStatus;
  date: string;
  title: string;
  description: string;
  actor: string;
}

export interface ResolutionDetails {
  resolvedAt: string;
  resolvedBy: string;
  officerRole: string;
  resolutionSummary: string;
  reliefGranted?: string;
  orderNumber?: string;
  internalNotes?: string;
}

export interface Complaint {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  state: string;
  district: string;
  cityTown: string;
  preferredLanguage: string;
  category: CategoryKey;
  subcategory: string;
  incidentDate: string;
  incidentLocation: string;
  subject: string;
  detailedDescription: string;
  amountInvolved?: string;
  oppositeParty: string;
  previousReferenceNo?: string;
  evidenceFiles: EvidenceFile[];
  consentGiven: boolean;
  status: ComplaintStatus;
  timelineStep: TimelineStep;
  createdAt: string;
  updatedAt: string;
  nextRecommendedStep: string;
  recommendedAuthority: string;
  officialPortalUrl?: string;
  authorityHelpline?: string;
  history: ComplaintHistoryEvent[];
  resolutionDetails?: ResolutionDetails;
}

export interface LegalTopic {
  id: string;
  category: CategoryKey;
  title: string;
  shortDescription: string;
  fullExplanation: string;
  primaryLaw: string;
  keyRights: string[];
  whatToDoIfViolated: string[];
  recommendedAuthority: string;
  officialPortal: string;
  helpline: string;
  iconName: string;
}

export interface LegalAidService {
  id: string;
  name: string;
  shortName: string;
  type: 'Statutory Body' | 'Government Scheme' | 'Emergency Cell' | 'Tribunal' | 'Commission';
  description: string;
  eligibility: string;
  contactNumber: string;
  website: string;
  address?: string;
  servicesOffered: string[];
  charges: '100% Free' | 'Nominal Fee' | 'Free for Eligible Persons';
}

export interface EmergencyContact {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  availability: string;
  applicableFor: string;
  icon: string;
  actionGuide: string[];
}

export interface LegalTermGlossary {
  term: string;
  hindiTerm?: string;
  simplifiedMeaning: string;
  practicalExample: string;
}
