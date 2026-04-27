 import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/home_screen.dart';
import 'screens/services_screen.dart';
import 'screens/booking_form_screen.dart';
import 'screens/contact_screen.dart';
import 'models/service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AstrologerWebsiteApp());
}

class AstrologerWebsiteApp extends StatelessWidget {
  const AstrologerWebsiteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Business Card',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(
              builder: (context) => const HomeScreen(),
            );
          case '/services':
            return MaterialPageRoute(
              builder: (context) => const ServicesScreen(),
            );
          case '/booking':
            final service = settings.arguments as Service?;
            return MaterialPageRoute(
              builder: (context) => BookingFormScreen(
                preselectedService: service,
              ),
            );
          case '/contact':
            return MaterialPageRoute(
              builder: (context) => const ContactScreen(),
            );
          default:
            return MaterialPageRoute(
              builder: (context) => const HomeScreen(),
            );
        }
      },
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.interTextTheme(),
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          scrolledUnderElevation: 0,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}