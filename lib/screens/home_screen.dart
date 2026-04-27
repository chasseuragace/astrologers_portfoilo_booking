import 'package:flutter/material.dart';
import '../models/user.dart';
import '../models/company.dart';
import '../models/calendar_event.dart';
import '../services/data_service.dart';
import '../widgets/profile_header.dart';
import '../widgets/calendar_locations.dart';
import '../widgets/action_buttons.dart';
import 'booking_screen.dart';
import 'feedback_screen.dart';
import 'team_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final DataService _dataService = DataService();
  User? _currentUser;
  Company? _currentCompany;
  List<CalendarEvent> _todaysEvents = [];
  
  // Mock QR code scanning - in real app this would come from URL params
  final String _mockUserId = 'user-1';

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  void _loadUserData() {
    final user = _dataService.getUserById(_mockUserId);
    if (user != null) {
      setState(() {
        _currentUser = user;
        _currentCompany = _dataService.getCompanyById(user.companyId);
        _todaysEvents = _dataService.getTodaysEventsForUser(user.id);
      });
    }
  }

  void _navigateToBooking() {
    if (_currentUser != null) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return Builder(
            builder: (context) {
              return SizedBox(
              
                width: MediaQuery.of(context).size.width * 0.8,
                child: Dialog(
                  
                  child: BookingScreen(
                    userId: _currentUser!.id,
                  ),
                ),
              );
            }
          );
        },
      );
    }
  }

void _showFeedbackDialog() {
  if (_currentUser != null) {
    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          insetPadding: const EdgeInsets.all(16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: SizedBox(
            width: 600,
            height: 500,
            child: FeedbackScreen(
              targetUserId: _currentUser!.id,
              targetUserName: _currentUser!.name,
            ),
          ),
        );
      },
    );
  }
}

  void _navigateToTeam() {
    if (_currentUser != null) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => TeamScreen(companyId: _currentUser!.companyId),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_currentUser == null || _currentCompany == null) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(

      body:Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color(0xFFEFF6FF),
                    Color(0xFFE0E7FF),
                  ],
                ),
              ),
              child:Column(
          children: [
            Expanded(
              child: SafeArea(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      ProfileHeader(
                        user: _currentUser!,
                        company: _currentCompany!,
                      ),
                      const SizedBox(height: 16),
                      CalendarLocations(events: _todaysEvents),
                      const SizedBox(height: 16),
                     
                    ],
                  ),
                ),
              ),
            ),
        
        ActionButtons(
                    onBookingTap: _navigateToBooking,
                    onFeedbackTap: _showFeedbackDialog,
                    onTeamTap: _navigateToTeam,
                    userName: _currentUser!.name,
                    currentUser:_currentUser,
                  ),  ],
        ),
      ),
  
    );
  }
}