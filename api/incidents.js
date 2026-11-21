const MOCK_INCIDENTS = [
  {
    id: 'inc-bmd-001',
    headline: 'Major Road Obstruction on Station Hill Descent',
    category: 'mobility',
    severity: 'caution',
    verificationStatus: 'corroborated',
    areaId: 'area-stationhill',
    areaName: 'Station Hill Descent',
    approximateLat: 5.952,
    approximateLng: 10.162,
    timestamp: '2026-11-21T02:15:00Z',
    whatIsKnown: 'Heavy freight transport stalled across both lanes at hairpin bend 3. Small vehicles and motorcycle taxis diverting through lower Atuakom track.',
    whatIsUnknown: 'Expected clearance duration and availability of heavy winch equipment.',
    safetyAdvice: 'Descending vehicles from Up Station are advised to hold until traffic wardens complete initial diversion setup.',
    sourceProvenance: '2 independent local taxi drivers corroborated with photo showing mechanical axle failure.',
    flagsCount: 0,
    tags: ['Traffic Diversion', 'Road Blocked', 'Station Hill']
  },
  {
    id: 'inc-bmd-002',
    headline: 'High Voltage Cable Snap Near Commercial Avenue Junction',
    category: 'health-utility',
    severity: 'urgent',
    verificationStatus: 'official-source',
    areaId: 'area-commercial',
    areaName: 'Commercial Avenue',
    approximateLat: 5.962,
    approximateLng: 10.153,
    timestamp: '2026-11-21T01:40:00Z',
    whatIsKnown: 'Overhead electrical line severed during heavy gusts, conductor resting across pedestrian drainage culvert near main agency branch.',
    whatIsUnknown: 'Exact timeline for utility isolation crew arrival.',
    safetyAdvice: 'Maintain minimum 20-meter perimeter. Do NOT walk through standing rainwater pools adjacent to the culvert.',
    sourceProvenance: 'Reported by municipal civil protection delegate; Eneo emergency dispatch contacted via ticket #BMD-994.',
    flagsCount: 0,
    tags: ['Electrical Hazard', 'Commercial Ave', 'Utility Danger']
  },
  {
    id: 'inc-bmd-003',
    headline: 'Localized Flash Flooding at Food Market Lower Gutters',
    category: 'weather',
    severity: 'caution',
    verificationStatus: 'corroborated',
    areaId: 'area-foodmarket',
    areaName: 'Main Food Market',
    approximateLat: 5.960,
    approximateLng: 10.151,
    timestamp: '2026-11-20T23:50:00Z',
    whatIsKnown: 'Torrential downpour overwhelmed roadside drainage culverts. Ground level market stalls waterlogged by 15-25cm standing runoff.',
    whatIsUnknown: 'Total inventory losses; status of downstream municipal culverts.',
    safetyAdvice: 'Traders moving dry goods to elevated counters. Avoid vehicle access through lower market gate.',
    sourceProvenance: 'Market traders association security liaison report cross-checked with municipal meteorology warning.',
    flagsCount: 0,
    tags: ['Flooding', 'Market Gutter', 'Storm Runoff']
  },
  {
    id: 'inc-bmd-004',
    headline: 'Cautious Movement Advised Along Mile 4 Bypass Axis',
    category: 'security-sensitive',
    severity: 'caution',
    verificationStatus: 'under-review',
    areaId: 'area-mile4',
    areaName: 'Mile 4 Nkwen',
    approximateLat: 5.992,
    approximateLng: 10.184,
    timestamp: '2026-11-20T22:10:00Z',
    whatIsKnown: 'Unusual security checkpoint established near outer perimeter bridge with sporadic traffic delays.',
    whatIsUnknown: 'Whether checkpoint is scheduled routine inspection or security sweep.',
    safetyAdvice: 'Motorists should carry national identity credentials, remain patient, and avoid night transit if unnecessary.',
    sourceProvenance: 'Multiple community alerts under moderation review. Factual observations only; no unsubstantiated rumors.',
    flagsCount: 1,
    tags: ['Checkpoint', 'Mile 4', 'Security Screening']
  }
];

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, severity, areaId } = req.query;
  let results = [...MOCK_INCIDENTS];

  if (category && category !== 'all') {
    results = results.filter(i => i.category === category);
  }
  if (severity && severity !== 'all') {
    results = results.filter(i => i.severity === severity);
  }
  if (areaId) {
    results = results.filter(i => i.areaId === areaId);
  }

  return res.status(200).json({
    total: results.length,
    city: 'Bamenda',
    incidents: results,
    privacyNotice: 'Coarse area projection only. High-precision point coordinates redacted in compliance with Cameroon Law No. 2024/017.'
  });
};
