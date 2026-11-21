export type IncidentCategory =
  | 'public-safety'
  | 'mobility'
  | 'security-sensitive'
  | 'health-utility'
  | 'weather';

export type IncidentSeverity = 'information' | 'caution' | 'urgent';

export type VerificationStatus =
  | 'submitted'
  | 'reviewing'
  | 'community-reported'
  | 'corroborated'
  | 'official-source'
  | 'disputed'
  | 'retracted';

export type IncidentLifecycle = 'open' | 'monitoring' | 'resolved' | 'expired';

export interface CoarseArea {
  id: string;
  name: string;
  cityId: string;
  approximateLat: number;
  approximateLng: number;
  radiusMeters: number;
}

export interface Incident {
  id: string;
  cityId: string;
  headline: string;
  safeSummary: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  verificationStatus: VerificationStatus;
  lifecycle: IncidentLifecycle;
  areaId: string;
  areaName: string;
  safetyAdvice: string;
  sourceLinks: string[];
  observedAt: string;
  updatedAt: string;
  expiresAt?: string;
  revision: number;
  publishedByRole: string;
  knownFacts: string[];
  uncertainties: string[];
  correctionNote?: string;
}

export interface IncidentReport {
  id: string;
  trackingCode: string;
  category: IncidentCategory;
  cityId: string;
  areaId: string;
  description: string;
  roadOrLandmark: string;
  isStillOngoing: boolean;
  sourceType: 'firsthand' | 'secondhand';
  evidenceIds: string[];
  status: 'submitted' | 'reviewing' | 'published' | 'rejected';
  createdAt: string;
  idempotencyKey: string;
}

export interface EmergencyContact {
  id: string;
  title: string;
  serviceType: 'police' | 'gendarmerie' | 'fire' | 'medical' | 'civic';
  phoneNumber: string;
  coverageArea: string;
  notes: string;
  verifiedLocal: boolean;
  reviewDate: string;
}

export interface UserSubscription {
  id: string;
  followedAreas: string[];
  followedCategories: IncidentCategory[];
  minimumSeverity: IncidentSeverity;
  quietHoursEnabled: boolean;
  language: 'en' | 'fr';
  notificationsEnabled: boolean;
}

export interface AuditLogEntry {
  id: string;
  incidentId: string;
  action: string;
  actor: string;
  reasonCode: string;
  timestamp: string;
  details: string;
}
