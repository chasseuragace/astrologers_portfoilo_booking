import 'package:intl/intl.dart';

class DateUtils {
  static String formatTime(DateTime dateTime) {
    return DateFormat('h:mm a').format(dateTime);
  }

  static String formatDate(DateTime dateTime) {
    return DateFormat('EEE, MMM d').format(dateTime);
  }

  static String formatDateTime(DateTime dateTime) {
    return DateFormat('EEE, MMM d, h:mm a').format(dateTime);
  }

  static bool isToday(DateTime dateTime) {
    final now = DateTime.now();
    return dateTime.year == now.year &&
           dateTime.month == now.month &&
           dateTime.day == now.day;
  }

  static String getTimeUntilEvent(DateTime eventTime) {
    final now = DateTime.now();
    final difference = eventTime.difference(now);
    
    if (difference.isNegative) return 'Past';
    
    final hours = difference.inHours;
    final minutes = difference.inMinutes % 60;
    
    if (hours == 0) {
      return '${minutes}m';
    } else if (hours < 24) {
      return '${hours}h ${minutes}m';
    } else {
      final days = difference.inDays;
      return '${days}d';
    }
  }
}