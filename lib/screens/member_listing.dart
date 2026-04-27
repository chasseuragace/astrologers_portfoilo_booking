import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:smart_business_card/models/user.dart';
import 'package:smart_business_card/screens/team_screen.dart';
import 'package:smart_business_card/services/data_service.dart';

Widget memberListing(
  List<User> _teamMembers,
  DataService _dataService, {
  Function(User member)? onTap,
}) {
  return LayoutBuilder(
    builder: (context, constraints) {
      final isWide = constraints.maxWidth > 600;

      if (isWide) {
        return GridView.builder(
          itemCount: _teamMembers.length,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: const EdgeInsets.all(8),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
            childAspectRatio: 2.5,
          ),
          itemBuilder: (context, index) {
            final member = _teamMembers[index];
            final feedbackCount = _dataService.getFeedbackCountForUser(member.id);

            return GestureDetector(
              onTap: () => onTap?.call(member),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFFE5E7EB)),
                  borderRadius: BorderRadius.circular(16),
                  color: Colors.white,
                ),
                padding: const EdgeInsets.all(16),
                child: MemberCard(member: member, feedbackCount: feedbackCount),
              ),
            );
          },
        );
      }

      // Fallback to ListView for smaller screens
      return ListView.builder(
        itemCount: _teamMembers.length,
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        padding: const EdgeInsets.all(8),
        itemBuilder: (context, index) {
          final member = _teamMembers[index];
          final feedbackCount = _dataService.getFeedbackCountForUser(member.id);

          return Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: GestureDetector(
              onTap: () => onTap?.call(member),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: const Color(0xFFE5E7EB)),
                  borderRadius: BorderRadius.circular(16),
                  color: Colors.white,
                ),
                padding: const EdgeInsets.all(16),
                child: MemberCard(member: member, feedbackCount: feedbackCount),
              ),
            ),
          );
        },
      );
    },
  );
}
class MemberCard extends StatelessWidget {
  const MemberCard({
    super.key,
    required this.member,
    required this.feedbackCount,
  });

  final User member;
  final int feedbackCount;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth > 300;

        return isWide
            ? FittedBox(
              fit: BoxFit.scaleDown,
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    _profileImage(size: 64),
                    const SizedBox(height: 12),
                    Text(
                      member.name,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF111827),
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      member.position,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Color(0xFF6B7280),
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    _actions(isCentered: true),
                  ],
                ),
            )
            : Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _profileImage(size: 48),
                  const SizedBox(width: 12),
                  Expanded(child: _infoColumn(context)),
                ],
              );
      },
    );
  }

  Widget _profileImage({required double size}) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.network(
              member.avatarUrl,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  color: Colors.grey[300],
                  child: Icon(
                    LucideIcons.user,
                    size: size / 2,
                    color: Colors.grey,
                  ),
                );
              },
            ),
          ),
        ),
        if (feedbackCount > 0)
          Positioned(
            top: -6,
            right: -6,
            child: Container(
              width: 20,
              height: 20,
              decoration: const BoxDecoration(
                color: Color(0xFFEA580C),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(
                  feedbackCount.toString(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _infoColumn(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          member.name,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
            color: Color(0xFF111827),
          ),
        ),
        const SizedBox(height: 2),
        Text(
          member.position,
          style: const TextStyle(
            fontSize: 14,
            color: Color(0xFF6B7280),
          ),
        ),
        const SizedBox(height: 4),
        _actions(),
      ],
    );
  }

  Widget _actions({bool isCentered = false}) {
    final row = Row(
      mainAxisAlignment: isCentered ? MainAxisAlignment.center : MainAxisAlignment.start,
      children: [
        GestureDetector(
          onTap: () => launchEmail(member.email),
          child: const Text(
            'Email',
            style: TextStyle(
              fontSize: 12,
              color: Color(0xFF2563EB),
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        if (feedbackCount > 0) ...[
          const SizedBox(width: 12),
          Row(
            children: [
              const Icon(
                LucideIcons.star,
                size: 12,
                color: Color(0xFFEA580C),
              ),
              const SizedBox(width: 2),
              Text(
                '$feedbackCount feedback',
                style: const TextStyle(
                  fontSize: 12,
                  color: Color(0xFFEA580C),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ],
      ],
    );

    return row;
  }
}