class BookingRequest {
  final String id;
  final String userId;
  final String requesterName;
  final String requesterEmail;
  final DateTime requestedTime;
  final int durationMinutes;
  final String locationPreference;
  final String note;
  final BookingStatus status;
  final DateTime createdAt;

  BookingRequest({
    required this.id,
    required this.userId,
    required this.requesterName,
    required this.requesterEmail,
    required this.requestedTime,
    required this.durationMinutes,
    required this.locationPreference,
    required this.note,
    required this.status,
    required this.createdAt,
  });

  factory BookingRequest.fromJson(Map<String, dynamic> json) {
    return BookingRequest(
      id: json['id'],
      userId: json['user_id'],
      requesterName: json['requester_name'],
      requesterEmail: json['requester_email'],
      requestedTime: DateTime.parse(json['requested_time']),
      durationMinutes: json['duration_minutes'],
      locationPreference: json['location_preference'],
      note: json['note'],
      status: BookingStatus.values.firstWhere(
        (e) => e.toString().split('.').last == json['status'],
      ),
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}

enum BookingStatus { pending, confirmed, rejected }