class AstroBooking {
  final String id;
  final String name;
  final String phone;
  final String? email;
  final String serviceType;
  final String nepaliDate;
  final String time;
  final String location;
  final String? description;
  final BookingStatus status;
  final String? duration;
  final String? adminNote;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  AstroBooking({
    required this.id,
    required this.name,
    required this.phone,
    this.email,
    required this.serviceType,
    required this.nepaliDate,
    required this.time,
    required this.location,
    this.description,
    this.status = BookingStatus.pending,
    this.duration,
    this.adminNote,
    this.createdAt,
    this.updatedAt,
  });

  AstroBooking copyWith({
    String? id,
    String? name,
    String? phone,
    String? email,
    String? serviceType,
    String? nepaliDate,
    String? time,
    String? location,
    String? description,
    BookingStatus? status,
    String? duration,
    String? adminNote,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return AstroBooking(
      id: id ?? this.id,
      name: name ?? this.name,
      phone: phone ?? this.phone,
      email: email ?? this.email,
      serviceType: serviceType ?? this.serviceType,
      nepaliDate: nepaliDate ?? this.nepaliDate,
      time: time ?? this.time,
      location: location ?? this.location,
      description: description ?? this.description,
      status: status ?? this.status,
      duration: duration ?? this.duration,
      adminNote: adminNote ?? this.adminNote,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'phone': phone,
        'email': email,
        'service_type': serviceType,
        'nepali_date': nepaliDate,
        'time': time,
        'location': location,
        'description': description,
        'status': status.name,
        'duration': duration,
        'admin_note': adminNote,
        'created_at': createdAt?.toIso8601String(),
        'updated_at': updatedAt?.toIso8601String(),
      };

  factory AstroBooking.fromJson(Map<String, dynamic> json) {
    return AstroBooking(
      id: json['id'] as String,
      name: json['name'] as String,
      phone: json['phone'] as String,
      email: json['email'] as String?,
      serviceType: json['service_type'] as String,
      nepaliDate: json['nepali_date'] as String,
      time: json['time'] as String,
      location: json['location'] as String,
      description: json['description'] as String?,
      status: BookingStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => BookingStatus.pending,
      ),
      duration: json['duration'] as String?,
      adminNote: json['admin_note'] as String?,
      createdAt: json['created_at'] is String
          ? DateTime.parse(json['created_at'] as String)
          : null,
      updatedAt: json['updated_at'] is String
          ? DateTime.parse(json['updated_at'] as String)
          : null,
    );
  }
}

enum BookingStatus {
  pending,
  approved,
  rejected,
  completed,
  cancelled,
}

extension BookingStatusExtension on BookingStatus {
  String get displayName {
    switch (this) {
      case BookingStatus.pending:
        return 'Pending';
      case BookingStatus.approved:
        return 'Approved';
      case BookingStatus.rejected:
        return 'Rejected';
      case BookingStatus.completed:
        return 'Completed';
      case BookingStatus.cancelled:
        return 'Cancelled';
    }
  }
}
