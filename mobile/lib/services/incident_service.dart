import 'package:flutter/foundation.dart';
import '../models/incident.dart';

class IncidentService extends ChangeNotifier {
  final List<CoarseArea> coarseAreas = const [
    CoarseArea(id: 'area-upstation', name: 'Up Station', city: 'Bamenda', approximateLat: 5.959, approximateLng: 10.158),
    CoarseArea(id: 'area-commercial', name: 'Commercial Avenue', city: 'Bamenda', approximateLat: 5.962, approximateLng: 10.153),
    CoarseArea(id: 'area-nkwen', name: 'Nkwen Sector', city: 'Bamenda', approximateLat: 5.981, approximateLng: 10.172),
    CoarseArea(id: 'area-mile4', name: 'Mile 4 Nkwen', city: 'Bamenda', approximateLat: 5.992, approximateLng: 10.184),
    CoarseArea(id: 'area-oldcouncil', name: 'Old Council Area', city: 'Bamenda', approximateLat: 5.955, approximateLng: 10.148),
    CoarseArea(id: 'area-foodmarket', name: 'Main Food Market', city: 'Bamenda', approximateLat: 5.960, approximateLng: 10.151),
    CoarseArea(id: 'area-stationhill', name: 'Station Hill Descent', city: 'Bamenda', approximateLat: 5.952, approximateLng: 10.162),
    CoarseArea(id: 'area-cowstreet', name: 'Cow Street Junction', city: 'Bamenda', approximateLat: 5.972, approximateLng: 10.155),
  ];

  final List<EmergencyContact> emergencyContacts = const [
    EmergencyContact(
      title: 'Sapeurs-Pompiers (Fire & Rescue)',
      serviceType: 'Fire & Rescue',
      phoneNumber: '118',
      notes: 'Toll-free emergency line from all national mobile carriers.',
      verifiedLocal: true,
    ),
    EmergencyContact(
      title: 'Police Secours (Central Dispatch)',
      serviceType: 'Police',
      phoneNumber: '117',
      notes: 'Toll-free direct police line for active public danger.',
      verifiedLocal: true,
    ),
    EmergencyContact(
      title: 'Gendarmerie Nationale',
      serviceType: 'Gendarmerie',
      phoneNumber: '113',
      notes: 'Toll-free patrol line for highway and inter-city axes.',
      verifiedLocal: true,
    ),
    EmergencyContact(
      title: 'SAMU Medical Emergency (Ambulance)',
      serviceType: 'Medical Ambulance',
      phoneNumber: '119',
      notes: 'Emergency hospital transport triage.',
      verifiedLocal: true,
    ),
    EmergencyContact(
      title: 'Cameroon Red Cross (Bamenda)',
      serviceType: 'Humanitarian & First Aid',
      phoneNumber: '+237 233 36 12 11',
      notes: 'First aid, disaster relief and flood mitigation support.',
      verifiedLocal: true,
    ),
  ];

  final List<Incident> _incidents = [
    Incident(
      id: 'inc-bmd-001',
      cityId: 'bamenda',
      headline: 'Downed High-Voltage Line Over Commercial Avenue',
      safeSummary: 'Heavy tree branch fell onto electrical cables near Commercial Avenue banking sector. Single lane pedestrian caution in effect.',
      category: IncidentCategory.healthUtility,
      severity: IncidentSeverity.caution,
      verificationStatus: VerificationStatus.corroborated,
      lifecycle: IncidentLifecycle.monitoring,
      areaName: 'Commercial Avenue',
      safetyAdvice: 'Do not approach cables or water puddles within 25 meters. Keep vehicles clear.',
      sourceLinks: const ['https://safecity.local/audit/sources/utility-advisory-884'],
      observedAt: DateTime.now().subtract(const Duration(hours: 2)),
      updatedAt: DateTime.now().subtract(const Duration(minutes: 45)),
    ),
    Incident(
      id: 'inc-bmd-002',
      cityId: 'bamenda',
      headline: 'Mudslide & Culvert Blockage on Station Hill',
      safeSummary: 'Overnight rainfall caused gravel and mud accumulation on Station Hill descent. Traffic slowed to single lane.',
      category: IncidentCategory.mobility,
      severity: IncidentSeverity.caution,
      verificationStatus: VerificationStatus.officialSource,
      lifecycle: IncidentLifecycle.open,
      areaName: 'Station Hill Descent',
      safetyAdvice: 'Drive in low gear. Motorbikes should exercise extreme caution on slick tarmac.',
      sourceLinks: const ['https://safecity.local/audit/sources/mezam-public-works'],
      observedAt: DateTime.now().subtract(const Duration(hours: 4)),
      updatedAt: DateTime.now().subtract(const Duration(hours: 1)),
    ),
    Incident(
      id: 'inc-bmd-003',
      cityId: 'bamenda',
      headline: 'Food Market Warehouse Fire Cleared',
      safeSummary: 'Structural dry goods fire fully contained by Sapeurs-Pompiers (118). Smoke advisory remains for downwind residents.',
      category: IncidentCategory.publicSafety,
      severity: IncidentSeverity.urgent,
      verificationStatus: VerificationStatus.corroborated,
      lifecycle: IncidentLifecycle.monitoring,
      areaName: 'Main Food Market Perimeter',
      safetyAdvice: 'Keep residential windows closed downwind towards Atuakom. Avoid crowds.',
      sourceLinks: const ['https://safecity.local/audit/sources/fire-service-ack-091'],
      observedAt: DateTime.now().subtract(const Duration(hours: 6)),
      updatedAt: DateTime.now().subtract(const Duration(hours: 3)),
    ),
  ];

  IncidentCategory? selectedCategory;
  String searchQuery = '';

  List<Incident> get incidents {
    return _incidents.where((inc) {
      if (selectedCategory != null && inc.category != selectedCategory) {
        return false;
      }
      if (searchQuery.isNotEmpty) {
        final q = searchQuery.toLowerCase();
        return inc.headline.toLowerCase().contains(q) ||
            inc.safeSummary.toLowerCase().contains(q) ||
            inc.areaName.toLowerCase().contains(q);
      }
      return true;
    }).toList();
  }

  void filterCategory(IncidentCategory? cat) {
    selectedCategory = cat;
    notifyListeners();
  }

  void updateSearch(String query) {
    searchQuery = query;
    notifyListeners();
  }

  String submitReport({
    required IncidentCategory category,
    required String areaName,
    required String description,
    required String roadOrLandmark,
    required bool isStillOngoing,
    required bool isFirsthand,
  }) {
    final code = 'SC-BMD-${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}';
    notifyListeners();
    return code;
  }
}
