import 'package:flutter/material.dart';
import '../models/incident.dart';
import '../services/incident_service.dart';
import 'incident_detail_screen.dart';

class AlertsScreen extends StatefulWidget {
  final IncidentService incidentService;

  const AlertsScreen({super.key, required this.incidentService});

  @override
  State<AlertsScreen> createState() => _AlertsScreenState();
}

class _AlertsScreenState extends State<AlertsScreen> {
  final TextEditingController _searchController = TextEditingController();

  Color _getSeverityColor(IncidentSeverity sev) {
    switch (sev) {
      case IncidentSeverity.urgent:
        return const Color(0xFFDC2626);
      case IncidentSeverity.caution:
        return const Color(0xFFD97706);
      case IncidentSeverity.information:
        return const Color(0xFF0284C7);
    }
  }

  String _getCategoryLabel(IncidentCategory cat) {
    switch (cat) {
      case IncidentCategory.publicSafety:
        return 'Public Safety';
      case IncidentCategory.mobility:
        return 'Mobility & Roads';
      case IncidentCategory.securitySensitive:
        return 'Security-Sensitive';
      case IncidentCategory.healthUtility:
        return 'Health & Utility';
      case IncidentCategory.weather:
        return 'Weather Hazards';
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: widget.incidentService,
      builder: (context, _) {
        final items = widget.incidentService.incidents;

        return Scaffold(
          appBar: AppBar(
            title: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SafeCity Bamenda',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
                ),
                Text(
                  'Community Safety Alerts',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
            elevation: 1,
            backgroundColor: const Color(0xFF0F172A),
            foregroundColor: Colors.white,
          ),
          body: Column(
            children: [
              // Top Non-Affiliation Civic Disclaimer Banner
              Container(
                width: double.infinity,
                color: const Color(0xFF7F1D1D),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                child: const Row(
                  children: [
                    Icon(Icons.warning_amber_rounded, color: Colors.white, size: 20),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Community safety notice — Not an emergency dispatch service. Call emergency services in immediate danger.',
                        style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600),
                      ),
                    ),
                  ],
                ),
              ),

              // Search Box
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 6),
                child: TextField(
                  controller: _searchController,
                  decoration: InputDecoration(
                    hintText: 'Search notices or neighborhood...',
                    prefixIcon: const Icon(Icons.search),
                    suffixIcon: _searchController.text.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear),
                            onPressed: () {
                              _searchController.clear();
                              widget.incidentService.updateSearch('');
                            },
                          )
                        : null,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                    contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 12),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                  onChanged: (val) => widget.incidentService.updateSearch(val),
                ),
              ),

              // Category Filter Scroll
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                child: Row(
                  children: [
                    ChoiceChip(
                      label: const Text('All Categories'),
                      selected: widget.incidentService.selectedCategory == null,
                      onSelected: (_) => widget.incidentService.filterCategory(null),
                    ),
                    const SizedBox(width: 8),
                    ...IncidentCategory.values.map((cat) {
                      final isSelected = widget.incidentService.selectedCategory == cat;
                      return Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: ChoiceChip(
                          label: Text(_getCategoryLabel(cat)),
                          selected: isSelected,
                          onSelected: (_) => widget.incidentService.filterCategory(isSelected ? null : cat),
                        ),
                      );
                    }),
                  ],
                ),
              ),

              // Incidents List
              Expanded(
                child: items.isEmpty
                    ? const Center(
                        child: Text(
                          'No active incidents in this filter.',
                          style: TextStyle(color: Colors.grey),
                        ),
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.all(16),
                        itemCount: items.length,
                        separatorBuilder: (_, __) => const SizedBox(height: 12),
                        itemBuilder: (context, index) {
                          final inc = items[index];
                          final color = _getSeverityColor(inc.severity);

                          return InkWell(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => IncidentDetailScreen(incident: inc),
                                ),
                              );
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: Colors.grey.shade300),
                                boxShadow: const [
                                  BoxShadow(
                                    color: Colors.black12,
                                    blurRadius: 4,
                                    offset: Offset(0, 2),
                                  ),
                                ],
                              ),
                              child: IntrinsicHeight(
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.stretch,
                                  children: [
                                    Container(
                                      width: 5,
                                      decoration: BoxDecoration(
                                        color: color,
                                        borderRadius: const BorderRadius.only(
                                          topLeft: Radius.circular(8),
                                          bottomLeft: Radius.circular(8),
                                        ),
                                      ),
                                    ),
                                    Expanded(
                                      child: Padding(
                                        padding: const EdgeInsets.all(14),
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Row(
                                              children: [
                                                Container(
                                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                                  decoration: BoxDecoration(
                                                    color: color,
                                                    borderRadius: BorderRadius.circular(4),
                                                  ),
                                                  child: Text(
                                                    inc.severity.name.toUpperCase(),
                                                    style: const TextStyle(
                                                      color: Colors.white,
                                                      fontWeight: FontWeight.w800,
                                                      fontSize: 10,
                                                    ),
                                                  ),
                                                ),
                                                const SizedBox(width: 8),
                                                Text(
                                                  '📍 ${inc.areaName}',
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.w700,
                                                    fontSize: 12,
                                                    color: Colors.grey.shade800,
                                                  ),
                                                ),
                                              ],
                                            ),
                                            const SizedBox(height: 8),
                                            Text(
                                              inc.headline,
                                              style: const TextStyle(
                                                fontWeight: FontWeight.w800,
                                                fontSize: 15,
                                                color: Color(0xFF0F172A),
                                              ),
                                            ),
                                            const SizedBox(height: 6),
                                            Text(
                                              inc.safeSummary,
                                              maxLines: 2,
                                              overflow: TextOverflow.ellipsis,
                                              style: TextStyle(
                                                fontSize: 13,
                                                color: Colors.grey.shade700,
                                                height: 1.3,
                                              ),
                                            ),
                                            const SizedBox(height: 10),
                                            Container(
                                              padding: const EdgeInsets.all(8),
                                              decoration: BoxDecoration(
                                                color: const Color(0xFFF8FAFC),
                                                borderRadius: BorderRadius.circular(4),
                                                border: Border.all(color: Colors.grey.shade200),
                                              ),
                                              child: Row(
                                                children: [
                                                  const Text('💡 ', style: TextStyle(fontSize: 12)),
                                                  Expanded(
                                                    child: Text(
                                                      inc.safetyAdvice,
                                                      style: const TextStyle(
                                                        fontSize: 11,
                                                        fontWeight: FontWeight.w600,
                                                        color: Color(0xFF0369A1),
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        );
      },
    );
  }
}
