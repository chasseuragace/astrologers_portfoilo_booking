import 'package:flutter/material.dart' hide DateUtils;
import 'package:lucide_icons/lucide_icons.dart';
import 'package:smart_business_card/utils/date_utils.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../models/calendar_event.dart';
import 'package:flutter/material.dart' hide DateUtils;
import 'package:url_launcher/url_launcher.dart';
import 'package:lucide_icons/lucide_icons.dart';

Widget buildMapView(List<CalendarEvent> events) {
  if (events.isEmpty) {
    return const Center(child: Text('No events to display on map'));
  }

  final List<LatLng> positions = events
      .where((e) => e.latitude != null && e.longitude != null)
      .map((e) => LatLng(e.latitude!, e.longitude!))
      .toList();

  final LatLng initialPosition = positions.first;
  final initialCameraPosition = CameraPosition(target: initialPosition, zoom: 13);
  late GoogleMapController mapController;

  Set<Marker> markers = events.asMap().entries.map((entry) {
    final index = entry.key;
    final event = entry.value;
    return Marker(
      markerId: MarkerId('event_$index'),
      position: LatLng(event.latitude ?? 0.0, event.longitude ?? 0.0),
      infoWindow: InfoWindow(title: event.title, snippet: event.location),
    );
  }).toSet();

  void openInGoogleMaps(String location) async {
    final Uri mapsUri = Uri.parse(
      'https://www.google.com/maps/search/?api=1&query=${Uri.encodeComponent(location)}',
    );
    if (await canLaunchUrl(mapsUri)) {
      await launchUrl(mapsUri, mode: LaunchMode.externalApplication);
    }
  }

  void openAllLocationsInMaps(List events) async {
    final locations = events.map((e) => e.location).join(' | ');
    openInGoogleMaps(locations);
  }

  void fitAllMarkers() async {
    if (positions.length < 2) return;

    double minLat = positions.first.latitude;
    double maxLat = positions.first.latitude;
    double minLng = positions.first.longitude;
    double maxLng = positions.first.longitude;

    for (var pos in positions) {
      minLat = pos.latitude < minLat ? pos.latitude : minLat;
      maxLat = pos.latitude > maxLat ? pos.latitude : maxLat;
      minLng = pos.longitude < minLng ? pos.longitude : minLng;
      maxLng = pos.longitude > maxLng ? pos.longitude : maxLng;
    }

    final bounds = LatLngBounds(
      southwest: LatLng(minLat, minLng),
      northeast: LatLng(maxLat, maxLng),
    );

    // Add padding around the edges
    mapController.animateCamera(CameraUpdate.newLatLngBounds(bounds, 50));
  }

  return Column(
    children: [
      Container(
        height: 300,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFF2563EB).withOpacity(0.2), width: 2),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: GoogleMap(
            initialCameraPosition: initialCameraPosition,
            markers: markers,
            myLocationButtonEnabled: false,
            zoomControlsEnabled: true,
            onMapCreated: (GoogleMapController controller) {
              mapController = controller;
              Future.delayed(const Duration(milliseconds: 300), fitAllMarkers);
            },
          ),
        ),
      ),
      const SizedBox(height: 16),
      ...events.asMap().entries.map((entry) {
        final index = entry.key;
        final event = entry.value;
        final colors = [const Color(0xFFEF4444), const Color(0xFF2563EB), const Color(0xFF10B981)];
        final color = colors[index % colors.length];
        return GestureDetector(
          onTap: () => openInGoogleMaps(event.location),
          child: Container(
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
                colors: [const Color(0xFFF9FAFB), color.withOpacity(0.05)],
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFF3F4F6)),
            ),
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: color,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(color: color.withOpacity(0.3), blurRadius: 8, offset: const Offset(0, 2)),
                    ],
                  ),
                  child: Center(
                    child: Text(
                      String.fromCharCode(65 + index),
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(event.title,
                          style: const TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF111827))),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(LucideIcons.clock, size: 16, color: Color(0xFF6B7280)),
                          const SizedBox(width: 4),
                          Text(
                            '${DateUtils.formatTime(event.startTime)} - ${DateUtils.formatTime(event.endTime)}',
                            style: const TextStyle(fontSize: 14, color: Color(0xFF6B7280)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(LucideIcons.mapPin, size: 16, color: Color(0xFF6B7280)),
                          const SizedBox(width: 4),
                          Expanded(
                            child: Text(event.location,
                                style: const TextStyle(fontSize: 14, color: Color(0xFF374151))),
                          ),
                          const Icon(LucideIcons.externalLink, size: 16, color: Color(0xFF2563EB)),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }),
    ],
  );
}

  
 