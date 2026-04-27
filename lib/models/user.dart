class User {
  final String id;
  final String companyId;
  final String name;
  final String position;
  final String email;
  final String phone;
  final String avatarUrl;
  final String bio;
  final String qrCodeUrl;
  final CalendarIntegration calendarIntegration;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.id,
    required this.companyId,
    required this.name,
    required this.position,
    required this.email,
    required this.phone,
    required this.avatarUrl,
    required this.bio,
    required this.qrCodeUrl,
    required this.calendarIntegration,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      companyId: json['company_id'],
      name: json['name'],
      position: json['position'],
      email: json['email'],
      phone: json['phone'],
      avatarUrl: json['avatar_url'],
      bio: json['bio'],
      qrCodeUrl: json['qr_code_url'],
      calendarIntegration: CalendarIntegration.fromJson(json['calendar_integration']),
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }
}

class CalendarIntegration {
  final String googleCalendarId;
  final bool showPublicEvents;

  CalendarIntegration({
    required this.googleCalendarId,
    required this.showPublicEvents,
  });

  factory CalendarIntegration.fromJson(Map<String, dynamic> json) {
    return CalendarIntegration(
      googleCalendarId: json['google_calendar_id'],
      showPublicEvents: json['show_public_events'],
    );
  }
}