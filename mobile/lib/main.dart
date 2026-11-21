import 'package:flutter/material.dart';
import 'services/incident_service.dart';
import 'screens/alerts_screen.dart';
import 'screens/report_wizard_screen.dart';
import 'screens/emergency_help_screen.dart';
import 'screens/my_alerts_screen.dart';

void main() {
  runApp(const SafeCityApp());
}

class SafeCityApp extends StatefulWidget {
  const SafeCityApp({super.key});

  @override
  State<SafeCityApp> createState() => _SafeCityAppState();
}

class _SafeCityAppState extends State<SafeCityApp> {
  final IncidentService _incidentService = IncidentService();
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final screens = [
      AlertsScreen(incidentService: _incidentService),
      ReportWizardScreen(incidentService: _incidentService),
      EmergencyHelpScreen(incidentService: _incidentService),
      MyAlertsScreen(incidentService: _incidentService),
    ];

    return MaterialApp(
      title: 'SafeCity Bamenda',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0284C7),
          primary: const Color(0xFF0284C7),
          surface: const Color(0xFFF8FAFC),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF0F172A),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      home: Scaffold(
        body: screens[_currentIndex],
        bottomNavigationBar: NavigationBar(
          selectedIndex: _currentIndex,
          onDestinationSelected: (index) {
            setState(() => _currentIndex = index);
          },
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.notifications_active_outlined),
              selectedIcon: Icon(Icons.notifications_active),
              label: 'Alerts',
            ),
            NavigationDestination(
              icon: Icon(Icons.edit_note_outlined),
              selectedIcon: Icon(Icons.edit_note),
              label: 'Report',
            ),
            NavigationDestination(
              icon: Icon(Icons.emergency_outlined),
              selectedIcon: Icon(Icons.emergency),
              label: 'Emergency',
            ),
            NavigationDestination(
              icon: Icon(Icons.tune_outlined),
              selectedIcon: Icon(Icons.tune),
              label: 'My Alerts',
            ),
          ],
        ),
      ),
    );
  }
}
