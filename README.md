# SafeCity — Civilian Safety Alerts & Crisis Awareness Platform

SafeCity is an open, human-moderated civilian safety awareness platform designed for rapid, low-bandwidth crisis dissemination and community reporting. The initial reference deployment is tailored to **Bamenda, Northwest Region, Cameroon**.

> **IMPORTANT CIVIC SAFETY DISCLAIMER**
> SafeCity is an independent community safety information platform. It is **NOT** a government 911 dispatch service and **DOES NOT** automatically dispatch police, firefighters, or ambulances. In an active life-threatening emergency, call the direct official Cameroon emergency numbers immediately (Police: **117**, Fire: **118**, Ambulance/SAMU: **119**, Gendarmerie: **113**).

---

## Architecture Overview

```
DEvfest/
├── src/                          # Angular SSR Web Application (Root Workspace)
│   ├── app/
│   │   ├── core/
│   │   │   ├── components/       # Header (Civic banner, 1-tap call, i18n) & Footer (Mobile nav, legal)
│   │   │   ├── models/           # Types, enums, verification status, audit records
│   │   │   └── services/         # IncidentService (Signals, Bamenda data, audit logs), I18nService (EN/FR)
│   │   ├── features/
│   │   │   ├── alerts/           # Incident feed + Interactive SVG Coarse Sector Map + Filters
│   │   │   ├── incident-detail/  # Full safety notice, what is known/unknown, advice, audit trail
│   │   │   ├── report-wizard/    # 5-step factual reporting wizard with anonymous tracking ID
│   │   │   ├── report-status/    # Incident lifecycle tracker by tracking code (e.g. SC-BMD-XXXXXX)
│   │   │   ├── my-alerts/        # Sector subscriptions, push toggle, quiet hours
│   │   │   ├── emergency-help/   # Verified emergency telephone directory with 1-tap GSM dialing
│   │   │   ├── about/            # Legal disclosures, Cameroon Law No. 2024/017 compliance, retention
│   │   │   └── admin/            # Triage moderation queue, projection editor, publish/retract, audit log
│   │   ├── app.routes.ts         # Lazy-loaded Angular route declarations
│   │   └── app.routes.server.ts  # Angular SSR Server Routing (Prerender static, Server dynamic)
│   └── styles.scss               # High-contrast accessible design tokens, crisis callouts, responsive utilities
│
├── mobile/                       # Flutter Cross-Platform Mobile Application
│   ├── lib/
│   │   ├── models/incident.dart  # Strongly-typed Dart incident & report models
│   │   ├── services/             # IncidentService with in-memory state & mock Bamenda incidents
│   │   ├── screens/
│   │   │   ├── alerts_screen.dart          # Live feed, category filters, emergency drawer
│   │   │   ├── incident_detail_screen.dart # Verified safety notice, advice, provenance
│   │   │   ├── report_wizard_screen.dart   # Safety triage + coarse location + photo strip notice
│   │   │   ├── emergency_help_screen.dart  # Direct GSM dialer for Cameroon emergency services
│   │   │   └── my_alerts_screen.dart       # Local notifications & sector preferences
│   │   └── main.dart             # Material 3 responsive root with navigation bar
│   └── test/
│       └── widget_test.dart      # Flutter smoke and widget verification tests
│
└── specification.md              # Full build specification (Bamenda pilot implementation)
```

---

## Cameroon Legal & Privacy Safeguards (Law No. 2024/017)

SafeCity enforces strict civilian protection principles:
1. **Coarse Geolocation Only**: Never captures, stores, or renders high-precision GPS coordinates, street addresses, or private house numbers. All reports are strictly mapped to coarse neighborhood sectors (e.g., *Up Station, Commercial Avenue, Nkwen, Mile 4, Station Hill, Food Market*).
2. **Metadata Stripping**: Image uploads pass through local canvas/EXIF stripping routines that purge GPS, device identifiers, and timestamps before staging.
3. **Identity Protection**: Eyewitnesses submit without accounts or phone numbers. A pseudorandom tracking code (`SC-BMD-XXXXXX`) allows reporters to track verification status anonymously.
4. **Human Moderation Gate**: Security-sensitive categories (armed clashes, security operations) cannot be automatically published; each notice requires human triage to avoid panic, doxxing, or operational interference.
5. **Data Retention**: Resolved reports automatically expire from active public maps after 48 hours to minimize stale hazard risk.

---

## Web Application (Angular SSR)

### Prerequisites
- Node.js 20+
- npm 10+

### Development
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
# App runs at: http://localhost:4200/
```

### Production Build & SSR Execution
```bash
# Build optimized client bundles and Node SSR server
npm run build

# Run SSR server locally
node dist/safecity/server/server.mjs
# Server listens on http://localhost:4000/
```

### Running Unit Tests
```bash
npm test -- --watch=false
```

---

## Mobile Application (Flutter)

### Prerequisites
- Flutter 3.29+ / Dart 3.7+
- Android SDK / Xcode (for device builds)

### Development & Execution
```bash
cd mobile

# Fetch packages
flutter pub get

# Run test suite
flutter test

# Launch on connected device / emulator
flutter run
```

---

## Verified Bamenda Emergency Directory

SafeCity integrates direct one-tap telephone links (`tel:`) ensuring rapid connection over cellular GSM voice even when mobile internet data is disconnected:

| Agency | Telephone | Availability |
| :--- | :--- | :--- |
| **Police Secours** | `117` | 24/7 Toll-free |
| **Sapeurs-Pompiers (Fire & Rescue)** | `118` | 24/7 Toll-free |
| **SAMU (Medical Emergency Ambulance)** | `119` | 24/7 Toll-free |
| **Gendarmerie Nationale** | `113` | 24/7 Toll-free |
| **Cameroon Red Cross (Bamenda Committee)** | `+237 233 36 12 88` | Standard Working Hours |
| **Bamenda Regional Hospital Emergency Ward**| `+237 233 36 12 34` | 24/7 Emergency Reception |

---

## License & Compliance
This software is developed in adherence with Cameroon Law No. 2024/017 on Personal Data Protection.
All synthetic incidents and coarse sector references are purely illustrative for civil safety preparedness.
