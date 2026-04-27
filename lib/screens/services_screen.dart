import 'package:flutter/material.dart';
import '../models/service.dart';

class ServicesScreen extends StatelessWidget {
  const ServicesScreen({super.key});

  static final List<Service> defaultServices = [
    Service(
      id: '1',
      title: 'Kundali Consultation',
      description: 'Detailed analysis of your birth chart with predictions and remedies for life events, career, marriage, and health.',
      price: 'Rs. 2,000',
    ),
    Service(
      id: '2',
      title: 'Vastu Consultation',
      description: 'Expert guidance on Vastu principles for home and office to bring harmony, prosperity, and positive energy.',
      price: 'Rs. 3,500',
    ),
    Service(
      id: '3',
      title: 'Ritual Services',
      description: 'Performance of traditional rituals including Puja, Havan, and other ceremonies for various occasions.',
      price: 'Custom',
    ),
    Service(
      id: '4',
      title: 'Gemstone Recommendation',
      description: 'Analysis of your birth chart to recommend suitable gemstones for balancing planetary influences.',
      price: 'Rs. 1,500',
    ),
    Service(
      id: '5',
      title: 'Marriage Compatibility',
      description: 'Detailed matching of Kundalis for marriage compatibility with comprehensive analysis.',
      price: 'Rs. 2,500',
    ),
    Service(
      id: '6',
      title: 'Personal Guidance',
      description: 'One-on-one consultation for personal problems, career guidance, and life decisions based on astrology.',
      price: 'Rs. 1,000',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Our Services'),
        centerTitle: true,
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
        child: ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: defaultServices.length,
          itemBuilder: (context, index) {
            final service = defaultServices[index];
            return _buildServiceCard(context, service, scheme);
          },
        ),
      ),
    );
  }

  Widget _buildServiceCard(BuildContext context, Service service, ColorScheme scheme) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: InkWell(
        onTap: () {
          // Navigate to booking with this service pre-selected
          _navigateToBooking(context, service);
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: scheme.primaryContainer,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      _getServiceIcon(service.id),
                      color: scheme.onPrimaryContainer,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          service.title,
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: scheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 4),
                        if (service.price != null)
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: scheme.secondaryContainer,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              service.price!,
                              style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                color: scheme.onSecondaryContainer,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                service.description,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: scheme.onSurfaceVariant,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton.icon(
                    onPressed: () {
                      _navigateToBooking(context, service);
                    },
                    icon: const Icon(Icons.calendar_today, size: 18),
                    label: const Text('Book Now'),
                    style: TextButton.styleFrom(
                      foregroundColor: scheme.primary,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  IconData _getServiceIcon(String serviceId) {
    switch (serviceId) {
      case '1':
        return Icons.auto_awesome;
      case '2':
        return Icons.home_work;
      case '3':
        return Icons.temple_hindu;
      case '4':
        return Icons.diamond;
      case '5':
        return Icons.favorite;
      case '6':
        return Icons.person_search;
      default:
        return Icons.star;
    }
  }

  void _navigateToBooking(BuildContext context, Service service) {
    // TODO: Navigate to booking screen with service pre-selected
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Booking for ${service.title} - Coming Soon!'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}
