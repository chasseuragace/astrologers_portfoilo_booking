class Service {
  final String id;
  final String title;
  final String description;
  final String? price;
  final bool active;

  Service({
    required this.id,
    required this.title,
    required this.description,
    this.price,
    this.active = true,
  });

  Service copyWith({
    String? id,
    String? title,
    String? description,
    String? price,
    bool? active,
  }) {
    return Service(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      price: price ?? this.price,
      active: active ?? this.active,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
        'price': price,
        'active': active,
      };

  factory Service.fromJson(Map<String, dynamic> json) {
    return Service(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      price: json['price'] as String?,
      active: json['active'] as bool? ?? true,
    );
  }
}
