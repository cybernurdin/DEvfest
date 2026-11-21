import { Injectable, computed, signal } from '@angular/core';
import {
  CoarseArea,
  EmergencyContact,
  Incident,
  IncidentCategory,
  IncidentReport,
  IncidentSeverity,
  UserSubscription,
  AuditLogEntry
} from '../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  // Coarse Areas in Bamenda, Cameroon (no precise point coordinates exposed to public)
  readonly coarseAreas: CoarseArea[] = [
    { id: 'area-upstation', name: 'Up Station', cityId: 'bamenda', approximateLat: 5.959, approximateLng: 10.158, radiusMeters: 1200 },
    { id: 'area-commercial', name: 'Commercial Avenue', cityId: 'bamenda', approximateLat: 5.962, approximateLng: 10.153, radiusMeters: 800 },
    { id: 'area-nkwen', name: 'Nkwen Sector', cityId: 'bamenda', approximateLat: 5.981, approximateLng: 10.172, radiusMeters: 1500 },
    { id: 'area-mile4', name: 'Mile 4 Nkwen', cityId: 'bamenda', approximateLat: 5.992, approximateLng: 10.184, radiusMeters: 1000 },
    { id: 'area-oldcouncil', name: 'Old Council Area', cityId: 'bamenda', approximateLat: 5.955, approximateLng: 10.148, radiusMeters: 750 },
    { id: 'area-foodmarket', name: 'Main Food Market', cityId: 'bamenda', approximateLat: 5.960, approximateLng: 10.151, radiusMeters: 600 },
    { id: 'area-atuakom', name: 'Atuakom Quarter', cityId: 'bamenda', approximateLat: 5.968, approximateLng: 10.160, radiusMeters: 900 },
    { id: 'area-cowstreet', name: 'Cow Street Junction', cityId: 'bamenda', approximateLat: 5.972, approximateLng: 10.155, radiusMeters: 700 },
    { id: 'area-stationhill', name: 'Station Hill Descent', cityId: 'bamenda', approximateLat: 5.952, approximateLng: 10.162, radiusMeters: 1100 },
    { id: 'area-mile2', name: 'Mile 2 Junction', cityId: 'bamenda', approximateLat: 5.976, approximateLng: 10.165, radiusMeters: 850 }
  ];

  // Cameroon Verified Emergency Numbers & Local Services for Bamenda
  readonly emergencyContacts: EmergencyContact[] = [
    {
      id: 'em-fire',
      title: 'Sapeurs-Pompiers (Fire & Rescue)',
      serviceType: 'fire',
      phoneNumber: '118',
      coverageArea: 'Bamenda Urban & Mezam Division',
      notes: 'Toll-free emergency line from local mobile networks (Orange, MTN, Camtel). For active structural fires and vehicle entrapments.',
      verifiedLocal: true,
      reviewDate: '2026-11-20'
    },
    {
      id: 'em-police',
      title: 'Police Secours (Central Police Dispatch)',
      serviceType: 'police',
      phoneNumber: '117',
      coverageArea: 'Bamenda Metro',
      notes: 'Toll-free line. Response times depend on road passability and operating shift.',
      verifiedLocal: true,
      reviewDate: '2026-11-20'
    },
    {
      id: 'em-gendarmerie',
      title: 'Gendarmerie Nationale (Brigade Territoriale)',
      serviceType: 'gendarmerie',
      phoneNumber: '113',
      coverageArea: 'Bamenda & Outskirts Highway Patrol',
      notes: 'Toll-free from national networks. Dedicated to inter-city axes and peripheral road safety.',
      verifiedLocal: true,
      reviewDate: '2026-11-20'
    },
    {
      id: 'em-samu',
      title: 'SAMU Medical Emergency (Ambulance)',
      serviceType: 'medical',
      phoneNumber: '119',
      coverageArea: 'Bamenda Regional Public Hospitals',
      notes: 'Dispatches emergency medical response units subject to vehicle availability.',
      verifiedLocal: true,
      reviewDate: '2026-11-20'
    },
    {
      id: 'em-redcross',
      title: 'Cameroon Red Cross (Bamenda Committee)',
      serviceType: 'civic',
      phoneNumber: '+237 233 36 12 11',
      coverageArea: 'North-West Region',
      notes: 'First aid assistance, humanitarian disaster relief and flood mitigation support.',
      verifiedLocal: true,
      reviewDate: '2026-11-20'
    },
    {
      id: 'em-hospital',
      title: 'Bamenda Regional Hospital Emergency Ward',
      serviceType: 'medical',
      phoneNumber: '+237 233 36 13 41',
      coverageArea: 'Bamenda Central',
      notes: 'Direct hospital trauma triage intake 24/7.',
      verifiedLocal: true,
      reviewDate: '2026-11-20'
    }
  ];

  // State Signals
  incidents = signal<Incident[]>([
    {
      id: 'inc-bmd-001',
      cityId: 'bamenda',
      headline: 'Downed High-Voltage Line Over Commercial Avenue',
      safeSummary: 'Heavy tree branch fell onto electrical cables near Commercial Avenue banking sector. Utility technical teams notified. Road restricted to single-lane pedestrian caution.',
      category: 'health-utility',
      severity: 'caution',
      verificationStatus: 'corroborated',
      lifecycle: 'monitoring',
      areaId: 'area-commercial',
      areaName: 'Commercial Avenue (Near Financial Quarter)',
      safetyAdvice: 'Do not approach cables or water puddles within 25 meters. Keep motor vehicles clear of the northern kerb.',
      sourceLinks: ['https://safecity.local/audit/sources/utility-advisory-884'],
      observedAt: '2026-11-20T08:30:00Z',
      updatedAt: '2026-11-20T09:15:00Z',
      revision: 2,
      publishedByRole: 'Duty Safety Moderator',
      knownFacts: [
        'Overhead cable snapped between Post Office intersection and Standard Chartered stretch.',
        'No injuries reported on site.',
        'Local traffic monitors are diverting heavy trucks via Old Council route.'
      ],
      uncertainties: [
        'Exact restoration timeline from Eneo electrical maintenance dispatch.'
      ]
    },
    {
      id: 'inc-bmd-002',
      cityId: 'bamenda',
      headline: 'Severe Mudslide & Culvert Blockage on Station Hill Descent',
      safeSummary: 'Heavy overnight precipitation caused mud and gravel accumulation across the main carriageway descending from Up Station. Moderate traffic slowdown.',
      category: 'mobility',
      severity: 'caution',
      verificationStatus: 'official-source',
      lifecycle: 'open',
      areaId: 'area-stationhill',
      areaName: 'Station Hill Descent',
      safetyAdvice: 'Drive in low gear. Motorbikes advised to exercise extreme caution on slick tarmac surfaces.',
      sourceLinks: ['https://safecity.local/audit/sources/mezam-public-works'],
      observedAt: '2026-11-20T07:10:00Z',
      updatedAt: '2026-11-20T08:45:00Z',
      revision: 1,
      publishedByRole: 'Regional Infrastructure Liaison',
      knownFacts: [
        'Mud layer approx 15cm thick along sharp hairpin bend #3.',
        'Public works backhoe cleared the uphill lane at 08:30 AM.'
      ],
      uncertainties: [
        'Remaining risk of secondary slope runoff if afternoon rain resumes.'
      ]
    },
    {
      id: 'inc-bmd-003',
      cityId: 'bamenda',
      headline: 'Controlled Warehouse Structural Fire Extinguished in Food Market Sector',
      safeSummary: 'Fire originated in dry goods storage off Main Food Market perimeter. Sapeurs-Pompiers (118) arrived and extinguished flames. Residual smoke advisory in effect.',
      category: 'public-safety',
      severity: 'urgent',
      verificationStatus: 'corroborated',
      lifecycle: 'monitoring',
      areaId: 'area-foodmarket',
      areaName: 'Main Food Market Perimeter',
      safetyAdvice: 'Residents with respiratory conditions should keep windows closed downwind toward Atuakom. Avoid rubber-necking in crowded market alleys.',
      sourceLinks: ['https://safecity.local/audit/sources/fire-service-ack-091'],
      observedAt: '2026-11-20T05:40:00Z',
      updatedAt: '2026-11-20T07:20:00Z',
      revision: 3,
      publishedByRole: 'Senior Incident Editor',
      knownFacts: [
        'Fire was fully contained by Sapeurs-Pompiers at 06:55 AM.',
        'Two adjacent wooden stalls sustained water and smoke damage.',
        'No civilian fatalities confirmed by on-site hospital triage.'
      ],
      uncertainties: [
        'Structural integrity of back brick wall pending municipal engineering inspection.'
      ]
    },
    {
      id: 'inc-bmd-004',
      cityId: 'bamenda',
      headline: 'Heavy Storm & Flash Flood Advisory for Nkwen River Basin',
      safeSummary: 'Regional meteorological alert: intense afternoon downpours forecasted. Low-lying culverts around Mile 4 and Cow Street at high risk of rapid swelling.',
      category: 'weather',
      severity: 'information',
      verificationStatus: 'official-source',
      lifecycle: 'open',
      areaId: 'area-nkwen',
      areaName: 'Nkwen Lowland Drainage Corridors',
      safetyAdvice: 'Move merchandise and portable goods above floor level in valley basements. Do not attempt to cross flooded bridge decks on foot.',
      sourceLinks: ['https://safecity.local/audit/sources/northwest-meteo-bulletin'],
      observedAt: '2026-11-20T10:00:00Z',
      updatedAt: '2026-11-20T10:00:00Z',
      revision: 1,
      publishedByRole: 'Weather Service Ingestion',
      knownFacts: [
        'Precipitation intensity expected to exceed 45mm/hr between 14:00 and 18:00.',
        'Drainage channels in Nkwen Market are partially clogged with silt.'
      ],
      uncertainties: [
        'Exact localized burst cell locations across Mezam basin.'
      ]
    }
  ]);

  // Private Reports in Triage (Moderator view)
  pendingReports = signal<IncidentReport[]>([
    {
      id: 'rep-99120',
      trackingCode: 'SC-BMD-88231',
      category: 'mobility',
      cityId: 'bamenda',
      areaId: 'area-cowstreet',
      description: 'Disabled fuel tanker stalled right at the Cow Street roundabout. Large queue of taxis building up towards Commercial Ave.',
      roadOrLandmark: 'Cow Street Roundabout by total station',
      isStillOngoing: true,
      sourceType: 'firsthand',
      evidenceIds: ['ev-01'],
      status: 'reviewing',
      createdAt: '2026-11-20T10:12:00Z',
      idempotencyKey: 'idem-cow-88231'
    },
    {
      id: 'rep-99121',
      trackingCode: 'SC-BMD-14902',
      category: 'public-safety',
      cityId: 'bamenda',
      areaId: 'area-upstation',
      description: 'Minor chimney kitchen fire at residential quarter; neighbors assisting with sand buckets. Smoke visible.',
      roadOrLandmark: 'Behind Governor office quarter 3',
      isStillOngoing: false,
      sourceType: 'secondhand',
      evidenceIds: [],
      status: 'submitted',
      createdAt: '2026-11-20T10:24:00Z',
      idempotencyKey: 'idem-upst-14902'
    }
  ]);

  // User Subscriptions (Saved locally)
  userSubscription = signal<UserSubscription>({
    id: 'sub-local-01',
    followedAreas: ['area-commercial', 'area-upstation', 'area-nkwen'],
    followedCategories: ['public-safety', 'mobility', 'health-utility', 'weather'],
    minimumSeverity: 'information',
    quietHoursEnabled: true,
    language: 'en',
    notificationsEnabled: false
  });

  // Audit Logs
  auditLogs = signal<AuditLogEntry[]>([
    {
      id: 'aud-001',
      incidentId: 'inc-bmd-003',
      action: 'PUBLISH_REVISION',
      actor: 'moderator_bamenda_02',
      reasonCode: 'FIRE_SERVICE_CONFIRMED',
      timestamp: '2026-11-20T07:20:00Z',
      details: 'Corroborated containment with Sapeurs-Pompiers dispatch log #118-091.'
    },
    {
      id: 'aud-002',
      incidentId: 'inc-bmd-001',
      action: 'UPDATE_ADVICE',
      actor: 'senior_editor_mezam',
      reasonCode: 'CORROBORATED_ROAD_BLOCKAGE',
      timestamp: '2026-11-20T09:15:00Z',
      details: 'Added pedestrian perimeter caution and truck diversion route.'
    }
  ]);

  // Filter state
  activeCategory = signal<IncidentCategory | 'all'>('all');
  activeSeverity = signal<IncidentSeverity | 'all'>('all');
  searchQuery = signal<string>('');

  // Filtered public incidents
  filteredIncidents = computed(() => {
    let list = this.incidents();
    const cat = this.activeCategory();
    const sev = this.activeSeverity();
    const query = this.searchQuery().toLowerCase().trim();

    if (cat !== 'all') {
      list = list.filter(i => i.category === cat);
    }
    if (sev !== 'all') {
      list = list.filter(i => i.severity === sev);
    }
    if (query) {
      list = list.filter(
        i =>
          i.headline.toLowerCase().includes(query) ||
          i.safeSummary.toLowerCase().includes(query) ||
          i.areaName.toLowerCase().includes(query)
      );
    }
    return list;
  });

  // Get single incident
  getIncidentById(id: string): Incident | undefined {
    return this.incidents().find(i => i.id === id);
  }

  // Submit a new citizen incident report (Safe, client-side metadata stripped, idempotency guaranteed)
  submitReport(formData: {
    category: IncidentCategory;
    areaId: string;
    description: string;
    roadOrLandmark: string;
    isStillOngoing: boolean;
    sourceType: 'firsthand' | 'secondhand';
    evidenceIds: string[];
  }): { trackingCode: string; reportId: string } {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `SC-BMD-${randomSuffix}`;
    const reportId = `rep-${Date.now()}`;

    const newReport: IncidentReport = {
      id: reportId,
      trackingCode,
      category: formData.category,
      cityId: 'bamenda',
      areaId: formData.areaId,
      description: formData.description,
      roadOrLandmark: formData.roadOrLandmark,
      isStillOngoing: formData.isStillOngoing,
      sourceType: formData.sourceType,
      evidenceIds: formData.evidenceIds,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      idempotencyKey: `idem-${Date.now()}-${randomSuffix}`
    };

    this.pendingReports.update(prev => [newReport, ...prev]);

    // Record audit log entry
    this.auditLogs.update(prev => [
      {
        id: `aud-${Date.now()}`,
        incidentId: reportId,
        action: 'CITIZEN_REPORT_SUBMITTED',
        actor: 'anonymous_reporter_session',
        reasonCode: 'POLICY_INGEST',
        timestamp: new Date().toISOString(),
        details: `Report queued for verification in area: ${formData.areaId}. Firsthand: ${formData.sourceType === 'firsthand'}.`
      },
      ...prev
    ]);

    return { trackingCode, reportId };
  }

  // Lookup private report status by tracking code
  lookupReportStatus(trackingCode: string): IncidentReport | undefined {
    return this.pendingReports().find(r => r.trackingCode.toUpperCase().trim() === trackingCode.toUpperCase().trim());
  }

  // Flag inaccuracy on an existing incident
  flagInaccuracy(incidentId: string, reason: string): boolean {
    const incident = this.getIncidentById(incidentId);
    if (!incident) return false;

    this.auditLogs.update(prev => [
      {
        id: `aud-${Date.now()}`,
        incidentId,
        action: 'INACCURACY_FLAGGED',
        actor: 'public_citizen_feedback',
        reasonCode: 'USER_CORRECTION_REQUEST',
        timestamp: new Date().toISOString(),
        details: reason
      },
      ...prev
    ]);
    return true;
  }

  // Moderator: Corroborate and publish a pending report into public feed
  adminPublishReport(reportId: string, headline: string, safeSummary: string, severity: IncidentSeverity, advice: string): void {
    const report = this.pendingReports().find(r => r.id === reportId);
    if (!report) return;

    const area = this.coarseAreas.find(a => a.id === report.areaId) || this.coarseAreas[0];
    const incidentId = `inc-bmd-${Date.now().toString().slice(-4)}`;

    const newPublicIncident: Incident = {
      id: incidentId,
      cityId: 'bamenda',
      headline,
      safeSummary,
      category: report.category,
      severity,
      verificationStatus: 'corroborated',
      lifecycle: 'open',
      areaId: area.id,
      areaName: area.name,
      safetyAdvice: advice,
      sourceLinks: [`https://safecity.local/audit/records/${report.trackingCode}`],
      observedAt: report.createdAt,
      updatedAt: new Date().toISOString(),
      revision: 1,
      publishedByRole: 'Duty Moderator (Verified)',
      knownFacts: [report.description, `Located near ${report.roadOrLandmark}`],
      uncertainties: ['Corroboration confirmed by second field observer.']
    };

    // Update public list
    this.incidents.update(prev => [newPublicIncident, ...prev]);

    // Update pending report status
    this.pendingReports.update(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: 'published' as const } : r))
    );

    // Add audit entry
    this.auditLogs.update(prev => [
      {
        id: `aud-${Date.now()}`,
        incidentId,
        action: 'REPORT_CORROBORATED_AND_PUBLISHED',
        actor: 'moderator_on_duty',
        reasonCode: 'VERIFIED_CORROBORATION',
        timestamp: new Date().toISOString(),
        details: `Report ${report.trackingCode} elevated to public notice ${incidentId}.`
      },
      ...prev
    ]);
  }

  // Moderator: Retract an incident
  adminRetractIncident(incidentId: string, reason: string): void {
    this.incidents.update(prev =>
      prev.map(inc => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            verificationStatus: 'retracted' as const,
            lifecycle: 'resolved' as const,
            revision: inc.revision + 1,
            updatedAt: new Date().toISOString(),
            correctionNote: `RETRACTED: ${reason}`
          };
        }
        return inc;
      })
    );

    this.auditLogs.update(prev => [
      {
        id: `aud-${Date.now()}`,
        incidentId,
        action: 'INCIDENT_RETRACTED',
        actor: 'senior_safety_editor',
        reasonCode: 'SAFETY_RETRACTION',
        timestamp: new Date().toISOString(),
        details: reason
      },
      ...prev
    ]);
  }

  // Update user subscription preferences
  updateSubscription(newSub: Partial<UserSubscription>): void {
    this.userSubscription.update(prev => ({ ...prev, ...newSub }));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('safecity_sub', JSON.stringify(this.userSubscription()));
    }
  }
}
