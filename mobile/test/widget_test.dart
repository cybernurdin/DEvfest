import 'package:flutter_test/flutter_test.dart';
import 'package:safecity_mobile/main.dart';

void main() {
  testWidgets('SafeCity smoke test verifies app bar and disclaimer', (WidgetTester tester) async {
    await tester.pumpWidget(const SafeCityApp());

    // Verify app title and emergency guidance are present
    expect(find.text('SafeCity Bamenda'), findsOneWidget);
    expect(find.text('Alerts'), findsOneWidget);
    expect(find.text('Report'), findsOneWidget);
    expect(find.text('Emergency'), findsOneWidget);
  });
}
