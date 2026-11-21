COMMUNITY SAFETY ALERTS

Full Product Requirements, Architecture and AI Coding Build Contract

Version 1.0 | 20 November 2026 | Initial deployment: Bamenda, Cameroon | Expansion-ready city configuration

Working product name: SafeCity (placeholder; brand/domain to be confirmed). Inspired by Alberta Emergency Alert principles, but independently operated and not affiliated with the Alberta government or Cameroon emergency authorities.

1. Executive decision and scope

Build a mobile-first, multilingual, installable Progressive Web Application (PWA) that lets residents discover nearby safety incidents, submit an incident safely, view verified updates, receive opted-in local notifications, and access emergency contact guidance. The deployment starts in Bamenda; a city/region abstraction permits later expansion to other locations. Use Angular 22 where compatible with the verified stable toolchain at implementation time, Google Cloud Run for the web/API services, and managed Google Cloud/Firebase services for data and notifications.

Essential distinction: user reports are NOT government emergency alerts. Community reports, corroborated reports, and official-source advisories must have visually different labels. The system NEVER claims to dispatch firefighters, ambulances or police unless a documented agreement, integration and acknowledgement are in production. It must provide a prominent call-emergency-services action and clear instructions instead.

2. Goals, stakeholders and non-goals

Priority

Outcome / measurement

P0

Citizen can read nearby public safety notices without account or precise location permission.

P0

Citizen can submit a simple incident; server validates, deduplicates, moderates and records it.

P0

Moderators can review and publish timely, accurate updates; corrections and withdrawals are visible.

P0

Subscribed citizens receive notifications about relevant, approved incidents; opt-out always available.

P0

People at risk are not exposed by raw coordinates, contact details, reporter identity, or sensitive media.

P1

Offline-friendly last-loaded information clearly marked stale; accessibility, English/French support.

P1

Operations dashboard, incident analytics, audit trail, business continuity and abuse controls.

Later

Optional verified responder portal, trusted agency integrations, enterprise traffic/disruption API.

Non-goals for v1: replacing national alerts; guaranteeing response time; live tracking of military/police positions; broadcasting unverified shootings with precise pins; emergency dispatch without a verified partner; automated AI publication of unverified threats; covert individual tracking; monetising access to urgent public warnings.

3. Personas and primary journeys

Persona

Primary job

Required experience

Resident

Understand whether a nearby area is affected

Open home; set city/area; filter map/list; inspect status, timestamp, safe general guidance.

Witness

Report fire, accident, flooding, blockage or suspicious safety concern

Tap Report; choose type; describe; optionally share approximate location and media; submit; get tracking code.

Visitor / commuter

Avoid an affected area

See area-level caution and last update; do not offer unsafe or unverified route guarantees.

Moderator

Resolve submitted reports responsibly

Review inbox; triage sensitive items; corroborate; redact; publish, reject, merge, update, expire.

Trusted partner

Contribute source-confirmed notices

Role-limited dashboard, source attribution and audited publication workflow.

Platform operator

Keep platform functional and compliant

Monitor health, costs, abuse, subscriptions, incidents, audit and retention policies.

4. Incident taxonomy and safety policy

Class

Examples

Publication rule

PUBLIC SAFETY

Fire, flooding, structural collapse, major accident, hazardous smoke

Potential fast review; publish only after policy criteria, with appropriate uncertainty.

MOBILITY

Congestion, road blockage, fallen tree, severe pothole, landslide

May display as unverified community report with conspicuous label after automated checks and safe redaction.

SECURITY-SENSITIVE

Gunshots, armed violence, abduction, active confrontation

Strict human review; DO NOT publish live precise coordinates, individuals, operational positions or detailed movements; use generalized zone and delayed/limited wording if publication is safe.

HEALTH / UTILITY

Water contamination advisory, disease notice, power outages

Trusted-source citation or verified local corroboration; no diagnosis or personal health disclosures.

WEATHER

Heavy rain, storm, extreme heat

Prefer authoritative feed attribution with freshness and coverage metadata.

Every incident carries category, severity (information / caution / urgent), verification (submitted / reviewing / community-reported / corroborated / official-source / disputed / retracted), lifecycle (open / monitoring / resolved / expired), public location precision (city / neighborhood / coarse area), source attribution, createdAt, observedAt, verifiedAt, updatedAt, expiresAt, safety advice and revision number. Never collapse severity and confidence into a single “verified” label.

Safety defaults: separate public projection from private report record; hide precise witness location by default; strip EXIF/GPS metadata from images; avoid publication of faces, vehicle plates, home addresses and named suspects; reject graphic or targeted content. Violence-related moderation must account for risk of amplifying rumors and exposing civilians. Keep incident details factual and avoid inviting residents to investigate or approach a hazard.

5. User-facing feature specification

5.1 Public home, discovery and map

Home top: city selector (Bamenda default), clear “Community safety information — not an official emergency service” identity, active-area notices, latest-updated time, and one primary Report an incident action.

Two synchronized views: accessible list as default for low-data/assistive technology, and map view using MapLibre GL JS with an approved tile provider; accessible map alternatives required. Marker colors are not the only severity signal.

Filters: category, status, verified-source only, radius/area, last 24h/7d; sort by recent/nearby; time displayed in Africa/Douala and relative + exact values.

Incident detail: what happened, area (not necessarily point), reported vs updated time, confidence, what is known/unknown, public guidance, original linked source, corrections timeline, share/copy link and report-inaccuracy action.

Public share cards must preserve uncertainty and expiration; social previews cannot imply a higher status than the incident actually has.

5.2 Incident report wizard

Choose incident category and approximate occurrence time; emergency warning shown if danger is immediate.

Choose city and area manually or allow one-time approximate location. Precise coordinates, if provided, are private and never directly displayed publicly.

Provide short description with guided fields: what is visible, road/area affected, whether it is still happening; no request for armed actors’ locations or identifying details.

Optionally upload up to three compressed images (not for violent incidents by default); inspect, strip metadata, scan and moderate before any public release.

Review privacy message, select submission mode (signed-in or anonymous temporary session), confirm facts are personally observed vs heard second-hand, submit.

Receive opaque tracking reference and ability to check status; reports explicitly say submission does not summon rescue services.

Submission must work on weak networks with retry and draft recovery. A draft may be held on the device (with clear expiration), but a queued offline report must never falsely display “sent”; show “not yet submitted” until server acknowledges. Idempotency key prevents duplicate creation.

5.3 Notifications and subscriptions

Users follow named areas or geofenced coarse cells, selected categories and severity threshold; browser push using Firebase Cloud Messaging where supported, plus email digest as optional future channel.

Permission requested only after an explicit “Enable alerts” action; never on first page load. Explain browser limitations and allow opt-out, quiet hours for noncritical alerts and test notification.

Only publish-approved, actionable incidents create push fan-out; each notification includes summary, confidence/status, general area, update time and deep link. Critical language cannot be claimed unless approved by policy.

Deduplicate by incident ID + revision + audience; rate-limit bursts, prevent duplicate push, suppress resolved/expired items and respect blocked notification tokens.

Use Cloud Tasks/worker queues with bounded retries, idempotency and delivery telemetry. “Delivered to FCM” is not “read by user”; do not promise guaranteed delivery.

5.4 Accounts, accessibility and language

Public read requires no login; reporting may use short-lived anonymous Firebase Auth with anti-abuse protection. Optional Google/email account for subscriptions and reporter status; staff require hardened login + MFA.

English and French interface from day one; architect translatable text and translation review. Avoid machine-translating safety-critical messages without human validation.

WCAG 2.2 AA target: keyboard navigation, semantic headings, focus states, screen reader announcements, 44px touch targets where practicable, high-contrast statuses, reduced motion and readable 12pt-equivalent or larger interface typography.

Installable PWA with clear offline banner, cached app shell, limited cached public feed, expiration stamp and “information may be outdated” warning. Never queue urgent push promises while offline.

6. Admin and trust operations

Dashboard screens: authentication; triage queue; incident workspace (private/raw vs public/redacted side-by-side); duplicate candidate matches; evidence/source timeline; map generalization preview; publish/retract and review history; flagged content; trusted source directory; subscriber/notification delivery overview; category and city settings; analytics; system health and cost metrics; user privacy requests.

Roles: anonymous reader, reporter, moderator, senior editor, trusted partner, platform admin, security auditor. Apply least privilege in backend; no staff moderation via client-only checks. For security-sensitive incidents, two-person approval is recommended for public release; if staffing is unavailable, queue unpublished instead of bypassing safeguards.

Every administrative change logs actor, timestamp, before/after summary, reason code and request ID. Audit log is append-only from the application perspective; retention and access are controlled. Public corrections must not silently overwrite the original public narrative.

7. Verification and publication state machine

State transition

Guard / behavior

draft -> submitted

Server validation succeeds, App Check/auth/rate checks pass, idempotency established.

submitted -> reviewing

Automated duplicate/safety checks route to moderation; no claim of verification.

reviewing -> community-reported

Only lower-risk categories where policy permits and label clearly states unverified.

reviewing -> corroborated

Independent evidence and documented reviewer decision; not just votes from unknown accounts.

reviewing -> official-source

Source provenance checked and exact originating authority linked.

any public -> disputed

Credible contrary information; temporarily suppress risk-amplifying notifications.

public -> updated/resolved/expired

Timestamp + explanation, notification policy respects changes.

public -> retracted

Display correction / retraction notice; stop further fan-out; retain protected audit evidence.

Trust scoring is a moderation aid only, never an automated truth oracle. Weighted indicators may include independent corroboration, report recency, media validity, reliable source attribution and reporter history; the score must be interpretable and must not reveal private identity. No “three reports = verified” rule. Abuse prevention includes CAPTCHA/App Check, rate limits by hashed network signals, device/session and account, moderation queues, duplicate clustering and appeal/report-inaccuracy flows.

8. Recommended system architecture

Frontend: Angular 22 stable (or newest supported stable verified at generation time), TypeScript strict, standalone components, signals/computed/effect for local state, signal-based inputs where supported, Angular Router lazy routes, typed reactive forms, HttpClient with interceptors, defer blocks, SSR + hydration for public SEO pages, Angular CDK/Material selectively customized for clean UI, PWA service worker and i18n. Avoid unstable experimental APIs. Prefer Nx-free straightforward Angular workspace unless module scale justifies a monorepo orchestrator.

Backend: TypeScript Node.js with NestJS or Fastify (select NestJS for modules, DTO validation, OpenAPI, guards) on Cloud Run. A separate Angular SSR web service on Cloud Run (or single well-structured container if justified), API Cloud Run service, and an authenticated Cloud Run notifications/maintenance worker. Firestore Native mode as primary document store for realtime incident/status and subscriptions; Cloud Storage private bucket for attachments; Firebase Auth; Firebase Cloud Messaging; Cloud Tasks; Cloud Scheduler; Secret Manager; Cloud Logging/Monitoring; Cloud Build + Artifact Registry. Use a mapped domain and HTTPS.

Data access: browser NEVER has unrestricted Firestore writes or raw media access. Prefer all incident creation, transitions, moderation and subscription mutation through authenticated API endpoints. Firestore security rules deny direct access to private collections; optionally expose carefully scoped read-only public collection via server API, avoiding split authorization logic.

Geospatial: store coarse public geohash/area IDs separately from encrypted/private exact reporter location; Firestore geohash bounds + distance filtering for nearby public incidents. High sensitivity incidents should use area polygons or neighborhood centroid only, with jitter/generation based on policy; do not expose raw originals through network responses or logs.

External APIs and map tiles: use documented license/attribution, key restrictions, quotas and cost caps. App must work in list mode even if map provider is unavailable. No reliance on Alberta feeds for Bamenda; Alberta is conceptual inspiration only.

8.1 Request and notification flows

Reporter -> Angular PWA -> POST /v1/reports (identity, App Check, idempotency, validation) -> API Cloud Run -> private Firestore report + protected Cloud Storage media pointer.

API -> moderation tasks -> moderator checks independent sources, risk and location -> transactional state transition writes sanitized public incident projection + audit history.

Publication emits outbox event to Firestore/Cloud Tasks worker -> selects coarse-area subscriptions -> deduplicates by event/subscriber -> sends FCM -> records results and revokes invalid tokens.

Public feed -> API queries sanitized projection with bounds and expiry -> cache/ETag -> Angular list/map; public incident corrections generate new revision.

Scheduled expiry/cleanup -> Cloud Scheduler -> authenticated worker -> transition stale notices, remove expired push tokens and media according to retention settings.

9. Entity and data contracts

Use Firestore collections: users/{uid}; userSettings/{uid}; reports/{reportId} PRIVATE; reportEvidence/{evidenceId} PRIVATE; incidents/{incidentId} PUBLIC PROJECTION; incidentRevisions/{incidentId}/revisions/{revisionId}; subscriptions/{subscriptionId} PRIVATE; devices/{deviceId} PRIVATE; moderationActions/{actionId} PRIVATE; notificationEvents/{eventId}; notificationDeliveries/{deliveryId} PRIVATE; trustedSources/{sourceId}; cityConfigs/{cityId}; auditEvents/{id} PRIVATE; abuseSignals/{id} PRIVATE; legalRequests/{id} PRIVATE. Keep ids random and unguessable; index by city/status/updatedAt/category and verified status. Document read/write costs before adding realtime listeners.

Field group

Minimum fields and constraints

Report

id, reporterUid nullable, category, text, sourceType firsthand/secondhand, observedAt, cityId, privateGeo optional, suggestedArea, evidenceIds, status, createdAt, idempotencyKey, abuseDisposition.

Public incident

id, cityId, headline, safeSummary, category, severity, verificationStatus, lifecycle, publicArea{label,polygonOrCentroid,precision}, safetyAdvice, sourceLinks[], observedAt, updatedAt, expiresAt, revision, publishedByRole.

Subscription

id, uid or anonymous sessionId, areaIds/geohash cells, categories[], minimumSeverity, quietHours, language, consentAt, enabled.

Device

id, uid, tokenEncryptedOrProtected, lastSeen, platform, locale, consentState, revokedAt.

Moderation

reportIds[], incidentId, action, reason, redactions, evidenceSummary, actorId, reviewerSecondApproval, createdAt.

Notification

id, incidentId, revision, audienceKey, notificationType, createdAt, sendStatus, attemptCount, providerResponseReference.

Do not put phone numbers, reporter names, authentication tokens, raw images, exact coordinates or abuse fingerprints inside public incident documents. Enforce retention by configuration and document deletion/privacy workflows; agree exact retention periods with legal counsel, rather than invent legal mandates.

10. REST API contract and errors

Method / endpoint

Role

Behavior

GET /v1/health/live ; /health/ready

Operations

Liveness/critical dependency readiness; no secrets.

GET /v1/cities ; GET /v1/categories

Public

City settings, categories and localized safety copy.

GET /v1/incidents?cityId=&bbox=&status=&category=&cursor=

Public

Paginated, sanitized, capped query; no raw exact positions.

GET /v1/incidents/{id}

Public

Public projection, revision and source references.

POST /v1/reports

Reporter/anonymous session

Validated incident submission with Idempotency-Key; rate limit.

GET /v1/reports/{trackingId}/status

Reporter + proof

Limited private status; no others’ data.

POST /v1/reports/{id}/evidence-upload-init

Owner

Short-lived signed upload / controlled file types and size.

POST /v1/subscriptions ; PATCH/DELETE /v1/subscriptions/{id}

Authenticated user

Consent, areas, categories, preferences.

POST /v1/devices/register ; DELETE /v1/devices/{id}

Authenticated user

Push token registration/revocation.

POST /v1/incidents/{id}/flag

Public with controls

Report inaccuracy; triage queue.

GET /v1/admin/reports ; POST /v1/admin/reports/{id}/review

Moderator

Review with audited decisions.

POST /v1/admin/incidents/{id}/publish|update|retract

Editor

Revision, policy guards and approval requirements.

GET /v1/admin/audit ; GET /v1/admin/metrics

Privileged staff

Paginated protected operational records.

API standards: OpenAPI 3.1 generated docs, RFC 7807-style problem+json errors (type,title,status,detail,requestId), JSON ISO-8601 timestamps UTC, server-driven pagination, strict DTO whitelist validation, request/body limits, ETag for public feeds, idempotency for POST and notification sending. Return 401/403/404/409/422/429 correctly; never reveal protected existence in unauthorized reads.

11. Interface and interaction design system

Look and feel: modern, restrained, credible civic-service design without copying any government crest or branding. Plenty of white space, clear hierarchy and concise plain English. Light mode default with optional dark mode. Accessible neutral background, consistent spacing (4/8px system), readable sans-serif, high-contrast alert badges and purposeful iconography. Avoid dramatic animations or sensational colors. Use skeletons sparingly, clear empty states, and no auto-playing content.

Screen

Must have

Home

Service disclaimer, city, accessible search, active safety feed, report CTA, time of last sync, list/map toggle, emergency help link.

Map

City bounds, clustered incident areas, category layer, legend, zoom and pan, list alternative, privacy-safe coarse geometry.

Incident detail

Headline, severity, confidence, status, date, safe area, safety guidance, latest update, source, corrections, share, flag.

Report wizard

Category, time, approximate area, description, optionally photo, privacy review, confirmation reference.

My alerts

Locations, category checkboxes, push consent, quiet hours, delivery test, unsubscribe/delete.

Admin moderation

Queues + filters, evidence separate from public display, compare reports, redaction preview, approvals, revisions and audits.

Emergency help

Call guidance and local numbers confirmed before launch; offline access; caveats on coverage.

Privacy / About

Who operates platform, not government, verification policy, data rights, retention, contact, transparency and accessibility.

Routes: /, /alerts, /map, /alerts/:id, /report, /report/status/:trackingId, /my-alerts, /emergency-help, /about, /privacy, /terms, /corrections, /admin/*, /404. Build mobile navigation with 4 core sections (Alerts, Map, Report, My Alerts). Desktop has compact left sidebar/top navigation. Include an explicit error and connectivity status.

12. Emergency contacts and responder relationships

Do not hard-code “automatic response” claims. On immediate danger, show “Move to safety. Contact local emergency services directly.” A Cameroon emergency number directory should be separately verified with local authorities for Bamenda, including operating scope and whether numbers work locally. Published international sources disagree on some Cameroon fire/ambulance numbers; do not expose an unverified one-tap number as authoritative. Admin must confirm phone, service, coverage and review date. Provide click-to-call only for verified entries and warn that connectivity/response can vary.

Phase 2 responder integration requires signed memorandum, authentication, incident categories accepted, service hours, data-sharing rules, endpoint ownership, delivery receipt/acknowledgement and fallback. Report status “forwarded to partner” only on authenticated acknowledgement; “responder assigned” only on explicit verified external response. Public users must not track responders or receive private dispatch details.

13. Security, privacy, legal and ethical requirements

Threat model: false emergency reports, coordinated misinformation, harassment/doxxing, sensitive location disclosure, account takeover, staff privilege abuse, scraping, malicious uploads, push spam, service outages, data leakage and platform impersonation.

Controls: managed IAM least privilege and dedicated service accounts; MFA for staff; Firebase Auth ID token verification; App Check server verification; RBAC/ABAC enforced server-side; HTTPS/HSTS; secure CSP; CORS allowlist; OWASP ASVS-style input validation; file content sniffing/virus screening; restricted signed URLs; encryption at rest/in transit; Secret Manager; key rotation; audit integrity and access logging with sensitive field redaction.

Application abuse: quotas per account/device/IP prefix with privacy-conscious hashing, geospatial anomaly detection, suspicious duplicate review, reporter throttling, incident publication rate caps, anti-bot challenges triggered as appropriate, and emergency manual publishing controls.

Compliance: conduct Cameroon-specific legal review under Law No. 2024/017 of 23 December 2024 on personal data protection, alongside relevant cybercrime, communications and media obligations. Determine lawful basis, notice/consent, cross-border cloud processing, controller/processor responsibilities, retention, subject-right workflows and incident reporting obligations before launch; do not assert compliance without counsel.

Safety review: deliberate privacy impact assessment, security-sensitive threat model and public-interest content policy. Work with local civic groups and qualified emergency partners without representing an official affiliation.

Ads/revenue: never obstruct free urgent safety notices, never place ads in critical incident detail/notifications, never sell identifiable location streams, sell private operational analytics only when aggregated and lawful. No paid priority safety alerts.

14. Deployment, infrastructure as code and CI/CD

Provide Dockerfiles for Angular SSR and API, a worker image or separate target, Terraform (preferred) or equivalent IaC for Cloud Run, Artifact Registry, Firestore, Cloud Storage, service accounts/IAM, Cloud Tasks, Scheduler, secret bindings, monitoring alert policies and budget alerts. Choose a Google Cloud region based on data residency/legal review, measured latency and availability; do not assume Google Cloud has a Cameroon region. Document the selected region and cross-border implications.

Create dev/staging/prod GCP environments with distinct Firebase projects and restricted credentials; isolated data and push keys. GitHub Actions or Cloud Build pipeline: format -> lint -> unit -> security scan -> integration -> build -> staging deploy -> smoke tests -> manual approval -> production rollout. Workload Identity Federation / short-lived credentials; no service-account JSON in repository. Use immutable image digest, canary/gradual traffic split, rollback command and DB/schema migration strategy.

Set Cloud Run minimum instances to 0 for economical noncritical services if latency acceptable, with configurable warm instances for critical components after load testing. Cap maximum instances and request concurrency, define timeouts and retries, alert on error rate/latency/queue backlog, store minimum necessary logs. Cloud Billing budgets are alerts, not guaranteed spending caps: add quotas, scaling limits, and service-level safeguards. Test cold-start time and error behavior under outage.

15. Operations, availability and offline behavior

Targets for pilot, subject to load test: 95th percentile cached public API < 1.5 seconds over stable network; report server acceptance < 3 seconds under baseline conditions; public UI first usable interaction on a typical mid-range Android over constrained mobile network within an agreed measured budget. Notification queue enqueue < 30 seconds after approved publication at normal load; end-device arrival is not guaranteed. Track successful attempts, not just FCM acknowledgements.

Service reliability: Cloud Monitoring dashboards for API status, p95, Firestore reads/writes, queue lag, failed push, moderator backlog, stale records, invalid official-source feeds, budget threshold; alerts to operations team. Availability SLO to be set after pilot and realistic staffing. Keep manual moderation and a read-only status page for outage response.

Backups: scheduled Firestore export (where available/configured), documented restore rehearsals, private evidence lifecycle and deletion, critical configuration backups. Disaster scenarios: Cloud Run outage, Firestore quota, abusive viral false reports, mispublished sensitive record, compromised moderator, bad push blast, map provider outage, cloud billing spike.

16. Testing, quality and acceptance criteria

Test layer

Specific required tests

Unit / Angular

Signals, forms, labels, query filters, time formatting, permissions, offline state, safe public field mapping.

Backend unit

Transitions, DTO validation, role checks, privacy projections, expiry, geohash filtering, redactions, idempotency.

Integration

Firebase emulator, Firestore rules, private media, notification outbox, signed uploads, moderation approval and retraction.

E2E

Public browse, report without account, staff moderation, subscriptions, push permission refusal, update/retraction, responsive mobile.

Security

OWASP risks, IDOR, privilege bypass, stored XSS, malicious file, SSRF, brute-force, rate abuse, forged client roles, exposed precise location.

Safety

Unverified gunfire has no precise public pin or public automatic push; no false responder dispatch confirmation; correction propagates.

Reliability

Duplicate reports, retries, queue burst, offline report not submitted, dropped token, revoked permission, Cloud Run cold start.

Accessibility

Keyboard, VoiceOver/TalkBack, contrast, reduced motion, French strings, map alternative, large font.

Deployment

Staging/prod isolated, secretless source control, rollback, smoke test, backups and cost alarms.

Release blocker (P0): Any path that exposes private witness coordinates or identity, pushes sensitive violence report without human safety approval, claims authorities have been contacted without acknowledgement, or loses revision/audit trace. A polished UI is NOT an acceptable substitute for these controls.

17. Build milestones and deliverables

Phase

Implementation output / gate

0: Discovery + safety

Operating entity, domain, city area data, verified emergency contacts, moderation owner, privacy assessment, content policy, initial UX wireframes; sign-off.

1: Repository + platform

Angular/NestJS scaffolding, strict tooling, local Firebase emulators, IaC environments, auth, base models, tests, CI.

2: Core citizen MVP

Public city feed + list/map + incident detail + safe reporting wizard + status tracking + moderation workflow.

3: Trust + alerting

Revision history, duplicate checks, notifications opt-in, tasks, subscriptions, flag/corrections, abuse safeguards.

4: Production readiness

Accessibility & translation, SEO, PWA/offline, observability, cost limits, vulnerability review, backup/restore, load and safety tests.

5: Controlled pilot

Invite test residents and moderator team; synthetic incidents first, then controlled real reports; measure false-positive handling and notification consent.

6: Expansion

Responder integration after contracts; official-source feeds; additional cities, local governance and sustainable funding.

Deliverable checklist: complete repo with README, .env.example (no secrets), architecture decision records, openapi.yaml, ERD/schema, Firestore index/rules files, policy config, API and UI test suites, Playwright E2E, Terraform, Dockerfiles, CI workflow, sample safe seeded data, moderation handbook, privacy/terms drafts for legal review, runbooks, cost estimation workbook or clear cost table, user guide, and command-by-command deploy instructions.

18. Commercial plan and business model

The core safety experience remains free. Sustainable potential revenue: (1) opt-in, clearly separated local sponsorship on nonurgent community information pages; (2) paid business disruption dashboard for fleet managers, shops and delivery operations using verified, aggregated incident summaries and reporting; (3) partner subscription for historical area-level analytics compliant with privacy restrictions; (4) grants, CSR support or nonprofit civic sponsorship. Avoid insurance discounts based on personal movement, sale of raw user data or preferential access to danger warnings.

Pilot business validation: interview 10 residents, 5 transport/logistics businesses, 3 local civil society groups and relevant emergency contacts; validate perceived usefulness, accuracy threshold and actual willingness to pay. Revenue scenario is illustrative, not a promise: 10 businesses x 15,000 XAF/month = 150,000 XAF gross monthly, before operations, legal and service costs. Start without ads; establish trust first.

19. AI coding agent master instruction (copy and paste)

ROLE: You are the lead full-stack engineer, security engineer, UX designer, SRE and test engineer implementing the attached “Community Safety Alerts” specification. Build an actual functioning production-oriented codebase, not a mockup or static landing page. Work in the repository available to you. Treat safety, privacy, provenance, usability and end-to-end tests as release conditions. Never claim a deployed system unless you actually deploy it and verify the live URL.

MANDATORY ARCHITECTURE: Angular 22 stable or latest compatible production release with standalone components, strict TypeScript, signals, lazy routes, typed forms, Angular SSR/hydration for public pages, PWA/offline, accessible list-first design and MapLibre with a compliant tile provider. Backend NestJS/TypeScript on Cloud Run, Firestore, Firebase Auth, FCM web push, Cloud Storage private media, Cloud Tasks, Cloud Scheduler, Secret Manager, Cloud Monitoring and Terraform IaC. If any component is unsuitable, create an ADR explaining equivalent alternatives before changing it.

BUILD EXECUTION: (1) Inspect repository/tools and existing Google Cloud credentials without printing secrets. (2) Scaffold repo and environment templates. (3) Implement domain models + OpenAPI + backend with testable authorization and private/public projection. (4) Implement Angular responsive citizen/admin screens with real APIs and complete loading/errors. (5) Wire moderation, notifications and abuse protections with emulators. (6) Add accessibility, translations, PWA and observability. (7) Add Terraform/deployment pipeline. (8) Run lint, build, unit, integration, E2E and security checks; fix failures. (9) Deploy only if authenticated environment and permissions are genuinely provided; otherwise give exact deploy commands and missing prerequisites. (10) Produce a final evidence-based report listing working features, tests, live URLs if any, limits and next steps.

BEHAVIOR RULES: Do not invent APIs, credentials, emergency responders, cities’ official incident feeds or dispatch acknowledgements. Do not bypass human verification for gunfire/armed-violence reports. Do not leak reporter PII or precise position to public endpoints. Do not ship dead buttons, fake success toasts, placeholder alerts posing as real events, unimplemented admin dashboards, or hard-coded production secrets. Protect critical public notifications from advertising/paywalls. If product decisions are missing, choose conservative privacy-safe defaults, document assumptions and proceed. Ask for user authorization only for consequential external actions such as spending money, public deployment and reaching third-party emergency services.

DEFINITION OF DONE: A fresh developer can install deps, run emulator-backed services, seed synthetic sample data, log into test moderator role, submit test fire/accident reports, approve one, see its public area and history, subscribe, receive simulated/integration-tested push behavior, retract it, verify public correction, run tests and deploy to a documented staging GCP project. Every core button works. Evidence links, screenshots and command outputs accompany handoff. Production readiness still requires local partner, legal and safety approvals.

20. Decisions to resolve before public launch

Final brand/domain and operating organisation; “SafeCity” is only a working name.

Exact city coverage and neighborhood/area polygon dataset; do not fabricate road status.

Local moderation hours, escalation owner, staff screening, violence-related review rules.

Locally verified emergency numbers and whether responders have a formal integration.

Google Cloud/Firebase billing account, project ids, DNS domain, allowed budget and rollout authority.

Approved retention schedule, legal basis and cross-border hosting assessment under Cameroon law.

Consent language, public content standards, formal legal/privacy review and incident response process.

Which notification categories may show pending “community report” vs require prior source verification.

21. References and implementation standards

Alberta Emergency Alert — official alert model — https://www.alberta.ca/about-emergency-alerts

Angular supported versions and compatibility — https://angular.dev/reference/versions

Angular server-side and hybrid rendering — https://angular.dev/guide/ssr

Angular hydration — https://angular.dev/guide/hydration

Firebase Cloud Messaging for web — https://firebase.google.com/docs/cloud-messaging/web/get-started

Firestore geoqueries — https://firebase.google.com/docs/firestore/solutions/geoqueries

Firestore Eventarc events to Cloud Run — https://docs.cloud.google.com/eventarc/standard/docs/run/route-trigger-cloud-firestore

Cloud Run scaling and minimum instances — https://docs.cloud.google.com/run/docs/configuring/min-instances

Cloud Tasks queue retries — https://docs.cloud.google.com/tasks/docs/configuring-queues

Firebase App Check — https://firebase.google.com/docs/app-check

Cameroon Law No. 2024/017 (Presidency) — https://www.prc.cm/en/news/the-acts/laws/7602

Cameroon travel advisory and emergency contact caution — https://travel.state.gov/en/international-travel/travel-advisories/cameroon.html

Source note: Technical and legal links were reviewed in November 2026. Reconfirm library versions, terms, numbers and legal advice at implementation and launch. This document is an engineering plan, not proof of legal compliance or official emergency-service accreditation.