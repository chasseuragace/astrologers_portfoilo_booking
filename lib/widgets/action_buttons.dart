import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:smart_business_card/models/user.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:io' as io;
import 'action_buttons_stub.dart'
    if (dart.library.html) 'action_buttons_web.dart';

class ActionButtons extends StatelessWidget {
  final VoidCallback onBookingTap;
  final VoidCallback onFeedbackTap;
  final VoidCallback onTeamTap;
  final String userName;
  final User? currentUser;

  const ActionButtons({
    super.key,
    required this.onBookingTap,
    required this.onFeedbackTap,
    required this.onTeamTap,
    required this.userName,
    this.currentUser,
  });

  void _handleDownloadContact(BuildContext context) async {
    final user = currentUser;
    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Contact information not available'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    // Generate vCard content
    final vCardContent = _generateVCard(user);
    
    if (kIsWeb) {
      // For web: Download as file
      _downloadVCardWeb(user, vCardContent);
    } else {
      // For desktop/mobile: Save to file
      try {
        final downloadsDir = io.Platform.environment['HOME'];
        if (downloadsDir != null) {
          final file = io.File('$downloadsDir/Downloads/${_sanitizeFileName(user.name)}.vcf');
          await file.writeAsString(vCardContent);
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Row(
                children: [
                  const Icon(LucideIcons.check, color: Colors.white, size: 20),
                  const SizedBox(width: 8),
                  Text('${user.name}\'s contact saved to Downloads'),
                ],
              ),
              backgroundColor: Colors.green,
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
          );
        } else {
          // Fallback to clipboard
          Clipboard.setData(ClipboardData(text: vCardContent));
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Row(
                children: [
                  const Icon(LucideIcons.check, color: Colors.white, size: 20),
                  const SizedBox(width: 8),
                  Text('${user.name}\'s contact copied to clipboard'),
                ],
              ),
              backgroundColor: Colors.green,
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
          );
        }
      } catch (e) {
        // Fallback to clipboard on error
        Clipboard.setData(ClipboardData(text: vCardContent));
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Row(
              children: [
                const Icon(LucideIcons.check, color: Colors.white, size: 20),
                const SizedBox(width: 8),
                Text('${user.name}\'s contact copied to clipboard'),
              ],
            ),
            backgroundColor: Colors.green,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
      }
    }
  }

  void _downloadVCardWeb(User user, String vCardContent) {
    downloadVCardWeb(_sanitizeFileName(user.name), vCardContent);
  }

  String _sanitizeFileName(String name) {
    // Remove or replace invalid characters for filename
    return name.replaceAll(RegExp(r'[<>:"/\\|?*]'), '_').trim();
  }

  String _generateVCard(User user) {
    final buffer = StringBuffer();
    
    buffer.writeln('BEGIN:VCARD');
    buffer.writeln('VERSION:3.0');
    buffer.writeln('FN:${user.name}');
    
    // Split name for proper vCard format
    final nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      final lastName = nameParts.last;
      final firstName = nameParts.sublist(0, nameParts.length - 1).join(' ');
      buffer.writeln('N:$lastName;$firstName;;;');
    } else {
      buffer.writeln('N:${user.name};;;;');
    }
    
    if (user.position.isNotEmpty) {
      buffer.writeln('TITLE:${user.position}');
    }
    
    if (user.email.isNotEmpty) {
      buffer.writeln('EMAIL;TYPE=INTERNET:${user.email}');
    }
    
    if (user.phone.isNotEmpty) {
      buffer.writeln('TEL;TYPE=VOICE:${user.phone}');
    }
    
    if (user.bio.isNotEmpty) {
      buffer.writeln('NOTE:${user.bio}');
    }
    
    buffer.writeln('UID:${user.id}');
    buffer.writeln('END:VCARD');
    
    return buffer.toString();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 20,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: _ActionButton(
                  icon: LucideIcons.calendar,
                  label: 'Book Meeting',
                  color: const Color(0xFF2563EB),
                  onTap: onBookingTap,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _ActionButton(
                  icon: LucideIcons.messageSquare,
                  label: 'Send Feedback',
                  color: const Color(0xFFEA580C),
                  onTap: onFeedbackTap,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _ActionButton(
                  icon: LucideIcons.users,
                  label: 'View Team',
                  color: const Color(0xFF059669),
                  onTap: onTeamTap,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _ActionButton(
                  icon: LucideIcons.download,
                  label: kIsWeb ? 'Download Contact' : 'Save Contact',
                  color: const Color(0xFF4B5563),
                  onTap: () => _handleDownloadContact(context),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _ActionButton({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.3),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 20,
              color: Colors.white,
            ),
            const SizedBox(width: 8),
            Flexible(
              child: Text(
                label,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

