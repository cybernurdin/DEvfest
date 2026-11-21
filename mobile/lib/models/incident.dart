enum IncidentCategory {
  publicSafety,
  mobility,
  securitySensitive,
  healthUtility,
  weather,
}

enum IncidentSeverity {
  information,
  caution,
  urgent,
}

enum VerificationStatus {
  submitted,
  reviewing,
  communityReported,
  corroborated,
  officialSource,
  disputed,
  retracted,
}

enum IncidentLifecycle {
  open,
  monitoring,
  resolved,
  expired,
}

class CoarseArea {
  final String id;
  final String name;
  final String city;
  final double approximateLat;
  final double approximateLng;

  const CoarseArea({
    required this.id,
    required this.name,
    required this.city,
    required this.approximateLat,
    required this.approximateLng,
  });
}

class Incident {
  final String id;
  final String cityId;
  final String headline;
  final String safeSummary;
  final IncidentCategory category;
  final IncidentSeverity severity;
  final VerificationStatus verificationStatus;
  final IncidentLifecycle lifecycle;
  final String areaName;
  final String safetyAdvice;
  final List<String> sourceLinks;
  final DateTime observedAt;
  final DateTime updatedAt;
  final int revision;

  const Incident({
    required this.id,
    required this.cityId,
    required this.headline,
    required this.safeSummary,
    required this.category,
    required this.severity,
    required this.verificationStatus,
    required this.lifecycle,
    required this.areaName,
    required this.safetyAdvice,
    required this.sourceLinks,
    required this.observedAt,
    required this.updatedAt,
    this.revision = 1,
  });
}

class EmergencyContact {
  final String title;
  final String serviceType;
  final String phoneNumber;
  final String notes;
  final bool verifiedLocal;

  const EmergencyContact({
    required this.title,
    required this.serviceType,
    required this.phoneNumber,
    required this.notes,
    required this.verifiedLocal,
  });
}
