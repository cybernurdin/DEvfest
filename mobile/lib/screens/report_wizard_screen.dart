import 'package:flutter/material.dart';
import '../models/incident.dart';
import '../services/incident_service.dart';

class ReportWizardScreen extends StatefulWidget {
  final IncidentService incidentService;

  const ReportWizardScreen({super.key, required this.incidentService});

  @override
  State<ReportWizardScreen> createState() => _ReportWizardScreenState();
}

class _ReportWizardScreenState extends State<ReportWizardScreen> {
  int _currentStep = 1;
  IncidentCategory _selectedCategory = IncidentCategory.publicSafety;
  String _selectedArea = 'Commercial Avenue';
  final TextEditingController _descController = TextEditingController();
  final TextEditingController _landmarkController = TextEditingController();
  bool _isStillOngoing = true;
  bool _isFirsthand = true;
  String? _generatedTrackingCode;

  void _submit() {
    if (_descController.text.trim().isEmpty) return;

    final code = widget.incidentService.submitReport(
      category: _selectedCategory,
      areaName: _selectedArea,
      description: _descController.text.trim(),
      roadOrLandmark: _landmarkController.text.trim(),
      isStillOngoing: _isStillOngoing,
      isFirsthand: _isFirsthand,
    );

    setState(() {
      _generatedTrackingCode = code;
      _currentStep = 6; // Success
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Report an Incident'),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: _currentStep == 6 ? _buildSuccessView() : _buildStepView(),
      ),
    );
  }

  Widget _buildStepView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Progress bar
        LinearProgressIndicator(
          value: _currentStep / 5.0,
          backgroundColor: Colors.grey.shade200,
          valueColor: const AlwaysStoppedAnimation(Color(0xFF0284C7)),
        ),
        const SizedBox(height: 8),
        Text(
          'Step $_currentStep of 5',
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey.shade600),
        ),
        const SizedBox(height: 16),

        // STEP 1: Immediate Danger & Category
        if (_currentStep == 1) ...[
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF2F2),
              borderRadius: BorderRadius.circular(6),
              border: Border.all(color: const Color(0xFFFECACA)),
            ),
            child: const Row(
              children: [
                Icon(Icons.warning, color: Color(0xFFDC2626)),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Are lives in danger right now? If yes, move to safety and call Police (117) or Fire (118) directly.',
                    style: TextStyle(fontSize: 12, color: Color(0xFF991B1B), fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Select Incident Category',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          ...IncidentCategory.values.map((cat) {
            return RadioListTile<IncidentCategory>(
              title: Text(cat.name.toUpperCase()),
              value: cat,
              groupValue: _selectedCategory,
              onChanged: (val) {
                if (val != null) setState(() => _selectedCategory = val);
              },
            );
          }),
        ],

        // STEP 2: Location
        if (_currentStep == 2) ...[
          const Text(
            'Neighborhood Sector (Bamenda)',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          const Text(
            'Choose the general area. Exact coordinates are kept private.',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            value: _selectedArea,
            decoration: const InputDecoration(border: OutlineInputBorder()),
            items: widget.incidentService.coarseAreas
                .map((a) => DropdownMenuItem(value: a.name, child: Text(a.name)))
                .toList(),
            onChanged: (val) {
              if (val != null) setState(() => _selectedArea = val);
            },
          ),
          const SizedBox(height: 16),
          const Text('Nearby Landmark or Street (Optional)'),
          const SizedBox(height: 6),
          TextField(
            controller: _landmarkController,
            decoration: const InputDecoration(
              hintText: 'e.g. Near total station or market junction',
              border: OutlineInputBorder(),
            ),
          ),
        ],

        // STEP 3: Description
        if (_currentStep == 3) ...[
          const Text(
            'What Did You Observe?',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          const Text(
            'Describe visible facts (smoke, flooded road, cable on ground).',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _descController,
            maxLines: 4,
            decoration: const InputDecoration(
              hintText: 'Enter factual description...',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),
          CheckboxListTile(
            title: const Text('This hazard is actively ongoing'),
            value: _isStillOngoing,
            onChanged: (v) => setState(() => _isStillOngoing = v ?? true),
          ),
        ],

        // STEP 4: Source Verification
        if (_currentStep == 4) ...[
          const Text(
            'Source & Evidence',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          RadioListTile<bool>(
            title: const Text('I witnessed this firsthand'),
            value: true,
            groupValue: _isFirsthand,
            onChanged: (v) => setState(() => _isFirsthand = v ?? true),
          ),
          RadioListTile<bool>(
            title: const Text('Heard secondhand from neighbors/drivers'),
            value: false,
            groupValue: _isFirsthand,
            onChanged: (v) => setState(() => _isFirsthand = v ?? false),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(6),
            ),
            child: const Row(
              children: [
                Icon(Icons.shield, color: Color(0xFF0284C7), size: 18),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Photos undergo EXIF and location metadata stripping before any public advisory release.',
                    style: TextStyle(fontSize: 11, color: Color(0xFF334155)),
                  ),
                ),
              ],
            ),
          ),
        ],

        // STEP 5: Review & Submit
        if (_currentStep == 5) ...[
          const Text(
            'Review & Confirm Submission',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Category: ${_selectedCategory.name.toUpperCase()}'),
                  const SizedBox(height: 4),
                  Text('Area: $_selectedArea'),
                  const SizedBox(height: 4),
                  Text('Observation: ${_descController.text}'),
                  const SizedBox(height: 4),
                  Text('Witness Type: ${_isFirsthand ? "Firsthand" : "Secondhand"}'),
                ],
              ),
            ),
          ),
        ],

        const SizedBox(height: 24),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            if (_currentStep > 1)
              OutlinedButton(
                onPressed: () => setState(() => _currentStep--),
                child: const Text('Back'),
              )
            else
              const SizedBox(),
            if (_currentStep < 5)
              ElevatedButton(
                onPressed: () => setState(() => _currentStep++),
                child: const Text('Next'),
              )
            else
              ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981)),
                onPressed: _submit,
                child: const Text('Submit Report ✓', style: TextStyle(color: Colors.white)),
              ),
          ],
        ),
      ],
    );
  }

  Widget _buildSuccessView() {
    return Center(
      child: Column(
        children: [
          const SizedBox(height: 32),
          const Icon(Icons.check_circle_outline, color: Color(0xFF10B981), size: 64),
          const SizedBox(height: 12),
          const Text(
            'Report Submitted Safely',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            'Your private tracking code is below. Submissions are corroborated prior to public release.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey, fontSize: 13),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            decoration: BoxDecoration(
              color: const Color(0xFFE0F2FE),
              borderRadius: BorderRadius.circular(6),
              border: Border.all(color: const Color(0xFF0284C7)),
            ),
            child: Text(
              _generatedTrackingCode ?? '',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: Color(0xFF0284C7)),
            ),
          ),
          const SizedBox(height: 28),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Done'),
          ),
        ],
      ),
    );
  }
}
