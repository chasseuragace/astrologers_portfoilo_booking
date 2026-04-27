import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/astro_booking.dart';

class BookingService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final CollectionReference _bookingsCollection =
      FirebaseFirestore.instance.collection('bookings');

  Future<void> addBooking(AstroBooking booking) async {
    try {
      await _bookingsCollection.doc(booking.id).set(booking.toJson());
    } catch (e) {
      throw Exception('Failed to add booking: $e');
    }
  }

  Future<List<AstroBooking>> getAllBookings() async {
    try {
      final snapshot = await _bookingsCollection.get();
      return snapshot.docs
          .map((doc) => AstroBooking.fromJson(doc.data() as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw Exception('Failed to fetch bookings: $e');
    }
  }

  Future<void> updateBookingStatus(String bookingId, BookingStatus status) async {
    try {
      await _bookingsCollection.doc(bookingId).update({
        'status': status.name,
        'updated_at': DateTime.now().toIso8601String(),
      });
    } catch (e) {
      throw Exception('Failed to update booking status: $e');
    }
  }

  Stream<List<AstroBooking>> watchBookings() {
    return _bookingsCollection
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => AstroBooking.fromJson(doc.data() as Map<String, dynamic>))
            .toList());
  }
}
