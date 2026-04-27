class Company {
  final String id;
  final String name;
  final String location;
  final String logoUrl;
  final ThemeSettings themeSettings;

  Company({
    required this.id,
    required this.name,
    required this.location,
    required this.logoUrl,
    required this.themeSettings,
  });

  factory Company.fromJson(Map<String, dynamic> json) {
    return Company(
      id: json['id'],
      name: json['name'],
      location: json['location'],
      logoUrl: json['logo_url'],
      themeSettings: ThemeSettings.fromJson(json['theme_settings']),
    );
  }
}

class ThemeSettings {
  final String primaryColor;
  final String logoPosition;

  ThemeSettings({
    required this.primaryColor,
    required this.logoPosition,
  });

  factory ThemeSettings.fromJson(Map<String, dynamic> json) {
    return ThemeSettings(
      primaryColor: json['primary_color'],
      logoPosition: json['logo_position'],
    );
  }
}