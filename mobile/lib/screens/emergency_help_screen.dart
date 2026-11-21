import 'package:flutter/material.dart';
import '../services/incident_service.dart';

class EmergencyHelpScreen extends StatelessWidget {
  final IncidentService incidentService;

  const EmergencyHelpScreen({super.key, required this.incidentService});

  @override
  Widget build(BuildContext context) {
    final contacts = incidentService.emergencyContacts;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Emergency Contacts'),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Warning Callout
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF2F2),
              borderRadius: BorderRadius.circular(6),
              border: const Border(
                left: BorderSide(color: Color(0xFFDC2626), width: 4),
              ),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '🚨 Life-Safety Emergency Guidance',
                  style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF991B1B), fontSize: 13),
                ),
                SizedBox(height: 4),
                Text(
                  'SafeCity is an independent civic information platform and does NOT dispatch rescue teams. In an immediate danger, dial the direct emergency lines below.',
                  style: TextStyle(fontSize: 12, color: Color(0xFF7F1D1D), height: 1.4),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          const Text(
            'Verified Local Numbers (Mezam Division)',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 12),

          ...contacts.map((c) {
            return Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          c.serviceType.toUpperCase(),
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Color(0xFF0284C7)),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: const Color(0xFFDCFCE7),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: const Text('✓ Verified Local', style: TextStyle(fontSize: 10, color: Color(0xFF166534))),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      c.title,
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      c.notes,
                      style: TextStyle(fontSize: 12, color: Colors.grey.shade700),
                    ),
                    const SizedBox(height: 10),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFDC2626)),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Dialing ${c.phoneNumber}...')),
                        );
                      },
                      icon: const Icon(Icons.phone, size: 16, color: Colors.white),
                      label: Text(
                        'Dial ${c.phoneNumber}',
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),

          // Offline Guidance Box
          Container(
            padding: const EdgeInsets.all(12),
            margin: const EdgeInsets.only(top: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(6),
              border: Border.all(color: Colors.grey.shade300),
            ),
            child: const Row(
              children: [
                Icon(Icons.signal_cellular_alt, color: Colors.grey),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Offline Tip: These emergency numbers remain callable over standard GSM cellular voice even without internet data.',
                    style: TextStyle(fontSize: 11, color: Colors.black87),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
