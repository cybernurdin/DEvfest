import 'package:flutter/material.dart';
import '../services/incident_service.dart';

class MyAlertsScreen extends StatefulWidget {
  final IncidentService incidentService;

  const MyAlertsScreen({super.key, required this.incidentService});

  @override
  State<MyAlertsScreen> createState() => _MyAlertsScreenState();
}

class _MyAlertsScreenState extends State<MyAlertsScreen> {
  bool _pushEnabled = false;
  bool _quietHours = true;
  final Set<String> _followed = {'Commercial Avenue', 'Up Station', 'Nkwen Sector'};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Alerts & Preferences'),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          SwitchListTile(
            title: const Text('Push Notifications', style: TextStyle(fontWeight: FontWeight.bold)),
            subtitle: const Text('Receive alerts for corroborated notices in followed sectors'),
            value: _pushEnabled,
            onChanged: (val) => setState(() => _pushEnabled = val),
          ),
          const Divider(),
          const SizedBox(height: 8),

          const Text(
            'Followed Neighborhood Sectors',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            children: widget.incidentService.coarseAreas.map((a) {
              final isFollowed = _followed.contains(a.name);
              return FilterChip(
                label: Text(a.name),
                selected: isFollowed,
                onSelected: (selected) {
                  setState(() {
                    if (selected) {
                      _followed.add(a.name);
                    } else {
                      _followed.remove(a.name);
                    }
                  });
                },
              );
            }).toList(),
          ),
          const SizedBox(height: 20),

          const Text(
            'Notification Timing',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          SwitchListTile(
            title: const Text('Quiet Hours (22:00 - 06:00)'),
            subtitle: const Text('Silence non-urgent cautions overnight'),
            value: _quietHours,
            onChanged: (val) => setState(() => _quietHours = val),
          ),
          const SizedBox(height: 24),

          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0284C7)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Preferences saved. Ready to receive verified local notices.'),
                ),
              );
            },
            icon: const Icon(Icons.save, color: Colors.white),
            label: const Text('Save Alert Preferences', style: TextStyle(color: Colors.white)),
          ),
          const SizedBox(height: 8),
          OutlinedButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  backgroundColor: Color(0xFF0F172A),
                  content: Text('🔔 [SafeCity Push Test] Road blockage on Commercial Avenue cleared.'),
                ),
              );
            },
            child: const Text('Simulate Test Alert'),
          ),
        ],
      ),
    );
  }
}
