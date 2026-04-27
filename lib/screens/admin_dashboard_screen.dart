import 'package:flutter/material.dart';
import '../models/astro_booking.dart';
import '../services/booking_service.dart';

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  BookingStatus? _selectedFilter;
  final BookingService _bookingService = BookingService();
  List<AstroBooking> _bookings = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadBookings();
  }

  Future<void> _loadBookings() async {
    try {
      final bookings = await _bookingService.getAllBookings();
      if (mounted) {
        setState(() {
          _bookings = bookings;
        });
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load bookings: $e')),
        );
      }
    }
  }

  List<AstroBooking> get _filteredBookings {
    if (_selectedFilter == null) return _bookings;
    return _bookings.where((b) => b.status == _selectedFilter).toList();
  }

  Future<void> _updateBookingStatus(AstroBooking booking, BookingStatus newStatus) async {
    try {
      await _bookingService.updateBookingStatus(booking.id, newStatus);
      setState(() {
        final index = _bookings.indexWhere((b) => b.id == booking.id);
        if (index != -1) {
          _bookings[index] = booking.copyWith(status: newStatus);
        }
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Booking ${newStatus.displayName}'),
            backgroundColor: newStatus == BookingStatus.approved
                ? Colors.green
                : Colors.orange,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to update booking: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final filtered = _filteredBookings;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Dashboard'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacementNamed(context, '/');
            },
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              scheme.primary.withOpacity(0.05),
              scheme.surface,
            ],
          ),
        ),
        child: Column(
          children: [
            _buildStatsCards(scheme),
            _buildFilterChips(scheme),
            Expanded(
              child: filtered.isEmpty
                  ? Center(
                      child: Text(
                        'No bookings found',
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: scheme.onSurfaceVariant,
                        ),
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: filtered.length,
                      itemBuilder: (context, index) {
                        return _buildBookingCard(filtered[index], scheme);
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatsCards(ColorScheme scheme) {
    final pending = _bookings.where((b) => b.status == BookingStatus.pending).length;
    final approved = _bookings.where((b) => b.status == BookingStatus.approved).length;
    final completed = _bookings.where((b) => b.status == BookingStatus.completed).length;

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Expanded(
            child: _buildStatCard('Pending', pending, Colors.orange, scheme),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: _buildStatCard('Approved', approved, Colors.green, scheme),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: _buildStatCard('Completed', completed, Colors.blue, scheme),
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard(String label, int count, Color color, ColorScheme scheme) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              count.toString(),
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: Theme.of(context).textTheme.labelMedium?.copyWith(
                color: scheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterChips(ColorScheme scheme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            FilterChip(
              label: const Text('All'),
              selected: _selectedFilter == null,
              onSelected: (selected) {
                setState(() => _selectedFilter = selected ? null : _selectedFilter);
              },
              selectedColor: scheme.primaryContainer,
            ),
            const SizedBox(width: 8),
            ...BookingStatus.values.map((status) {
              return Padding(
                padding: const EdgeInsets.only(right: 8),
                child: FilterChip(
                  label: Text(status.displayName),
                  selected: _selectedFilter == status,
                  onSelected: (selected) {
                    setState(() => _selectedFilter = selected ? status : null);
                  },
                  selectedColor: scheme.primaryContainer,
                ),
              );
            }),
          ],
        ),
      ),
    );
  }

  Widget _buildBookingCard(AstroBooking booking, ColorScheme scheme) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  booking.name,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                _buildStatusChip(booking.status, scheme),
              ],
            ),
            const SizedBox(height: 12),
            _buildInfoRow(Icons.phone, booking.phone, scheme),
            _buildInfoRow(Icons.calendar_today, '${booking.nepaliDate} at ${booking.time}', scheme),
            _buildInfoRow(Icons.list_alt, booking.serviceType, scheme),
            _buildInfoRow(Icons.location_on, booking.location, scheme),
            if (booking.description != null) ...[
              const SizedBox(height: 8),
              Text(
                booking.description!,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: scheme.onSurfaceVariant,
                ),
              ),
            ],
            const SizedBox(height: 16),
            if (booking.status == BookingStatus.pending)
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _updateBookingStatus(booking, BookingStatus.rejected),
                      icon: const Icon(Icons.close, size: 18),
                      label: const Text('Reject'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.red,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () => _updateBookingStatus(booking, BookingStatus.approved),
                      icon: const Icon(Icons.check, size: 18),
                      label: const Text('Approve'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ),
                ],
              )
            else if (booking.status == BookingStatus.approved)
              ElevatedButton.icon(
                onPressed: () => _updateBookingStatus(booking, BookingStatus.completed),
                icon: const Icon(Icons.done_all, size: 18),
                label: const Text('Mark Complete'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: scheme.primary,
                  foregroundColor: scheme.onPrimary,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String text, ColorScheme scheme) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(icon, size: 16, color: scheme.onSurfaceVariant),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: scheme.onSurface,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatusChip(BookingStatus status, ColorScheme scheme) {
    Color chipColor;
    switch (status) {
      case BookingStatus.pending:
        chipColor = Colors.orange;
        break;
      case BookingStatus.approved:
        chipColor = Colors.green;
        break;
      case BookingStatus.rejected:
        chipColor = Colors.red;
        break;
      case BookingStatus.completed:
        chipColor = Colors.blue;
        break;
      case BookingStatus.cancelled:
        chipColor = Colors.grey;
        break;
    }

    return Chip(
      label: Text(
        status.displayName,
        style: const TextStyle(fontSize: 12, color: Colors.white),
      ),
      backgroundColor: chipColor,
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    );
  }
}
