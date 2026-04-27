class Profile {
  final String name;
  final String title;
  final String location;
  final String phone;
  final String? email;
  final String facebookUrl;
  final String vcardUrl;
  final String shortBio;

  Profile({
    required this.name,
    required this.title,
    required this.location,
    required this.phone,
    this.email,
    required this.facebookUrl,
    required this.vcardUrl,
    required this.shortBio,
  });

  Profile copyWith({
    String? name,
    String? title,
    String? location,
    String? phone,
    String? email,
    String? facebookUrl,
    String? vcardUrl,
    String? shortBio,
  }) {
    return Profile(
      name: name ?? this.name,
      title: title ?? this.title,
      location: location ?? this.location,
      phone: phone ?? this.phone,
      email: email ?? this.email,
      facebookUrl: facebookUrl ?? this.facebookUrl,
      vcardUrl: vcardUrl ?? this.vcardUrl,
      shortBio: shortBio ?? this.shortBio,
    );
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'title': title,
        'location': location,
        'phone': phone,
        'email': email,
        'facebook_url': facebookUrl,
        'vcard_url': vcardUrl,
        'short_bio': shortBio,
      };

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      name: json['name'] as String,
      title: json['title'] as String,
      location: json['location'] as String,
      phone: json['phone'] as String,
      email: json['email'] as String?,
      facebookUrl: json['facebook_url'] as String,
      vcardUrl: json['vcard_url'] as String,
      shortBio: json['short_bio'] as String,
    );
  }

  static Profile get defaultProfile => Profile(
        name: 'Shaligram Dahal',
        title: 'Astrologer / Guru',
        location: 'Biratnagar, Nepal',
        phone: '+977-XXXXXXXXXX',
        email: 'shaligram@example.com',
        facebookUrl: 'https://facebook.com/shaligramdahal',
        vcardUrl: '/assets/vcard/shaligram.vcf',
        shortBio: 'Experienced astrologer providing Kundali consultation, Vastu guidance, and ritual services.',
      );
}
