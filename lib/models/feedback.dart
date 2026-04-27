class AnonymousFeedback {
  final String id;
  final String targetUserId;
  final String message;
  final DateTime createdAt;

  AnonymousFeedback({
    required this.id,
    required this.targetUserId,
    required this.message,
    required this.createdAt,
  });

  factory AnonymousFeedback.fromJson(Map<String, dynamic> json) {
    return AnonymousFeedback(
      id: json['id'],
      targetUserId: json['target_user_id'],
      message: json['message'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}