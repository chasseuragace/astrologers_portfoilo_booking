class CalendarEvent {
  final String id;
  final String userId;
  final String googleEventId;
  final String title;
  final String location;
  final DateTime startTime;
  final DateTime endTime;
  final bool isPublic;
  final bool isConfirmedAttendance;

  CalendarEvent({
    required this.id,
    required this.userId,
    required this.googleEventId,
    required this.title,
    required this.location,
    required this.startTime,
    required this.endTime,
    required this.isPublic,
    required this.isConfirmedAttendance,
  });

  factory CalendarEvent.fromJson(Map<String, dynamic> json) {
    return CalendarEvent(
      id: json['id'],
      userId: json['user_id'],
      googleEventId: json['google_event_id'],
      title: json['title'],
      location: json['location'],
      startTime: DateTime.parse(json['start_time']),
      endTime: DateTime.parse(json['end_time']),
      isPublic: json['is_public'],
      isConfirmedAttendance: json['is_confirmed_attendance'],
    );
  }

  double? latitude;
  double? longitude;

  // Optionally, you can add setters/getters if you want to compute or set these values later
  double? getLatitude() => latitude;
  double? getLongitude() => longitude;
}