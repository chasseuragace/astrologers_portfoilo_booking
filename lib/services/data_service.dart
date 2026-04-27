import '../models/user.dart';
import '../models/company.dart';
import '../models/calendar_event.dart';
import '../models/booking_request.dart';
import '../models/feedback.dart';

class DataService {
  static final DataService _instance = DataService._internal();
  factory DataService() => _instance;
  DataService._internal();

  // Mock data
  final List<Company> _companies = [
    Company(
      id: 'comp-1',
      name: 'Masovision Technology',
      location: 'Anamnagar, Kathamndu',
      logoUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      themeSettings: ThemeSettings(
        primaryColor: '#2563EB',
        logoPosition: 'left',
      ),
    ),
  ];

  final List<User> _users = [
    User(
      id: 'user-1',
      companyId: 'comp-1',
      name: 'Narayan  Chhetri',
      position: 'CEO',
      email: 'masovison@gmail.com',
      phone: '+1 (555) 123-4567',
      avatarUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Passionate product manager with 8+ years of experience in building scalable tech solutions. I love connecting with innovators and exploring new opportunities.',
      qrCodeUrl: '/qr/user-1',
      calendarIntegration: CalendarIntegration(
        googleCalendarId: 'sarah@techvision.com',
        showPublicEvents: true,
      ),
      createdAt: DateTime.parse('2024-01-15T10:00:00Z'),
      updatedAt: DateTime.parse('2024-01-15T10:00:00Z'),
    ),
    User(
      id: 'user-2',
      companyId: 'comp-1',
      name: 'Michael Chen',
      position: 'Lead Developer',
      email: 'michael.chen@techvision.com',
      phone: '+1 (555) 987-6543',
      avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Full-stack developer specializing in modern web technologies. Always excited to discuss tech trends and innovative solutions.',
      qrCodeUrl: '/qr/user-2',
      calendarIntegration: CalendarIntegration(
        googleCalendarId: 'michael@techvision.com',
        showPublicEvents: true,
      ),
      createdAt: DateTime.parse('2024-01-15T10:00:00Z'),
      updatedAt: DateTime.parse('2024-01-15T10:00:00Z'),
    ),
    User(
      id: 'user-3',
      companyId: 'comp-1',
      name: 'Emily Rodriguez',
      position: 'UX Designer',
      email: 'emily.rodriguez@techvision.com',
      phone: '+1 (555) 456-7890',
      avatarUrl: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      bio: 'Creative UX designer focused on human-centered design. I believe great design should be both beautiful and functional.',
      qrCodeUrl: '/qr/user-3',
      calendarIntegration: CalendarIntegration(
        googleCalendarId: 'emily@techvision.com',
        showPublicEvents: true,
      ),
      createdAt: DateTime.parse('2024-01-15T10:00:00Z'),
      updatedAt: DateTime.parse('2024-01-15T10:00:00Z'),
    ),
  ];

 final List<CalendarEvent> _calendarEvents = [
  CalendarEvent(
    id: 'event-1',
    userId: 'user-1',
    googleEventId: 'google-1',
    title: 'ग्राहक भेटघाट',
    location: 'Hotel Himalaya, Pulchowk, Lalitpur',
    startTime: DateTime.now().add(const Duration(hours: 2)),
    endTime: DateTime.now().add(const Duration(hours: 3)),
    isPublic: true,
    isConfirmedAttendance: true,
  )..latitude = 27.6782..longitude = 85.3188,

  CalendarEvent(
    id: 'event-2',
    userId: 'user-1',
    googleEventId: 'google-2',
    title: 'प्रविधि सम्मेलन',
    location: 'Bhrikutimandap Exhibition Hall, Kathmandu',
    startTime: DateTime.now().add(const Duration(hours: 5)),
    endTime: DateTime.now().add(const Duration(hours: 8)),
    isPublic: true,
    isConfirmedAttendance: true,
  )..latitude = 27.7007..longitude = 85.3131,

  CalendarEvent(
    id: 'event-3',
    userId: 'user-2',
    googleEventId: 'google-3',
    title: 'डेभलपर मिटअप',
    location: 'Durbar Square, Bhaktapur',
    startTime: DateTime.now().add(const Duration(hours: 1)),
    endTime: DateTime.now().add(const Duration(hours: 4)),
    isPublic: true,
    isConfirmedAttendance: true,
  )..latitude = 27.6710..longitude = 85.4298,
];


  final List<BookingRequest> _bookingRequests = [];
  final List<AnonymousFeedback> _anonymousFeedback = [
    AnonymousFeedback(
      id: 'feedback-1',
      targetUserId: 'user-1',
      message: 'Sarah was incredibly helpful during our product discussion. Her insights were spot-on and she provided excellent guidance.',
      createdAt: DateTime.parse('2024-01-14T15:30:00Z'),
    ),
    AnonymousFeedback(
      id: 'feedback-2',
      targetUserId: 'user-1',
      message: 'Great presentation at the conference! Your approach to product strategy was very inspiring.',
      createdAt: DateTime.parse('2024-01-13T09:15:00Z'),
    ),
    AnonymousFeedback(
      id: 'feedback-3',
      targetUserId: 'user-2',
      message: 'Michael\'s technical expertise is outstanding. He explained complex concepts in a way that was easy to understand.',
      createdAt: DateTime.parse('2024-01-12T14:20:00Z'),
    ),
  ];

  // User operations
  User? getUserById(String id) {
    try {
      return _users.firstWhere((user) => user.id == id);
    } catch (e) {
      return null;
    }
  }

  Company? getCompanyById(String id) {
    try {
      return _companies.firstWhere((company) => company.id == id);
    } catch (e) {
      return null;
    }
  }

  List<CalendarEvent> getTodaysEventsForUser(String userId) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final tomorrow = today.add(const Duration(days: 1));

    return _calendarEvents.where((event) {
      if (event.userId != userId) return false;
      if (!event.isPublic || !event.isConfirmedAttendance) return false;
      
      return event.startTime.isAfter(today) && event.startTime.isBefore(tomorrow);
    }).toList();
  }

  List<User> getUsersByCompany(String companyId) {
    return _users.where((user) => user.companyId == companyId).toList();
  }

  Future<BookingRequest> createBookingRequest(BookingRequest booking) async {
    _bookingRequests.add(booking);
    return booking;
  }

  Future<AnonymousFeedback> createAnonymousFeedback(AnonymousFeedback feedback) async {
    _anonymousFeedback.add(feedback);
    return feedback;
  }

  int getFeedbackCountForUser(String userId) {
    return _anonymousFeedback.where((feedback) => feedback.targetUserId == userId).length;
  }

  List<AnonymousFeedback> getFeedbackForUser(String userId) {
    return _anonymousFeedback.where((feedback) => feedback.targetUserId == userId).toList();
  }
}