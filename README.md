## Short SRS: Astrologer Website for Shaligram Dahal

### 1. Project Overview

The system is a minimal Flutter-based website for **Shaligram Dahal**, an astrologer/guru based in **Biratnagar, Nepal**. The website allows visitors to explore astrology-related services, view a Nepali calendar, and send booking requests. An admin panel allows the astrologer to approve or reject bookings and set appointment duration.

Recommended calendar/date packages: `nepali_date_picker` for Nepali Bikram Sambat date picking and calendar support, and `nepali_utils` for Nepali date conversion, formatting, Nepali numbers, and related utilities. ([Dart packages][1])

---

### 2. Objectives

The website should:

* Present Shaligram Dahal’s profile and services.
* Show a Nepali calendar with booking status.
* Allow visitors to request appointments.
* Allow the astrologer/admin to manage bookings.
* Show approved and pending bookings on the calendar.
* Provide Facebook links and a QR code that opens/downloads a vCard.

---

### 3. Target Users

**Visitors / Clients**

People who want astrology, vastu, shraddha, puja, or similar guru services.

**Admin / Astrologer**

Shaligram Dahal or an authorized person who manages booking requests.

---

### 4. Main Features

#### 4.1 Public Website

The public website shall contain:

* Home page with name, photo/banner, location, and short introduction.
* Services page/list showing services such as:

  * Kundali / horoscope consultation
  * Vastu consultation
  * Shraddha / ritual guidance
  * Puja consultation
  * Marriage/date/muhurat consultation
  * General astrology consultation
* Calendar page using Nepali Bikram Sambat calendar.
* Booking request form.
* Contact section with:

  * Phone number
  * Location: Biratnagar
  * Facebook link
  * QR code for vCard

---

### 5. Booking System

#### 5.1 Visitor Booking Form

The visitor shall be able to submit a booking request with:

* Full name
* Phone number
* Optional email
* Nepali date
* Time
* Location
* Service type
* Description/message

After submission, the booking status shall be **Pending**.

#### 5.2 Calendar Display

The calendar shall show:

* Approved bookings
* Pending bookings
* Date and time of booking
* Booking status using simple labels or colors

Visitors shall be able to see scheduled and pending booking slots, but private user details should not be fully exposed.

Example public display:

> 2081/05/12 — 10:00 AM — Vastu Consultation — Approved
> 2081/05/13 — 2:00 PM — Booking Pending

---

### 6. Admin Panel

The admin panel shall allow the astrologer to:

* Log in securely.
* View all booking requests.
* Approve booking.
* Reject booking.
* Set appointment duration after approval.
* Edit booking details if needed.
* View bookings in calendar format.
* Manage basic service list.
* Update contact information, Facebook link, and vCard details.

When a booking is approved, the admin must set:

* Start time
* Duration
* Final location, if changed
* Optional admin note

---

### 7. Booking Status

Each booking shall have one of the following statuses:

* Pending
* Approved
* Rejected
* Completed
* Cancelled

---

### 8. Pages Required

#### Public Side

1. Home
2. About Guru
3. Services
4. Calendar / Book Appointment
5. Contact

#### Admin Side

1. Login
2. Dashboard
3. Booking Requests
4. Calendar View
5. Services Management
6. Profile / Contact Settings

---

### 9. Functional Requirements

| ID    | Requirement                                                      |
| ----- | ---------------------------------------------------------------- |
| FR-01 | The system shall display Shaligram Dahal’s profile and services. |
| FR-02 | The system shall display dates using the Nepali calendar.        |
| FR-03 | Visitors shall be able to submit booking requests.               |
| FR-04 | Booking requests shall be saved with Pending status.             |
| FR-05 | Admin shall be able to approve or reject bookings.               |
| FR-06 | Admin shall set appointment duration while approving a booking.  |
| FR-07 | The calendar shall show approved and pending bookings.           |
| FR-08 | The website shall include a Facebook link.                       |
| FR-09 | The website shall show a QR code linked to a vCard.              |
| FR-10 | Admin shall be able to update services and contact details.      |

---

### 10. Non-Functional Requirements

| Type            | Requirement                                                              |
| --------------- | ------------------------------------------------------------------------ |
| Performance     | Website should load quickly on mobile and desktop.                       |
| Security        | Admin panel must require login.                                          |
| Privacy         | Visitor phone numbers and personal details must not be publicly visible. |
| Usability       | Booking process should be simple and mobile-friendly.                    |
| Compatibility   | Website should work on modern mobile and desktop browsers.               |
| Maintainability | Services, bookings, and contact details should be easy to update.        |

---

### 11. Suggested Technology

| Layer          | Technology                                                                  |
| -------------- | --------------------------------------------------------------------------- |
| Frontend       | Flutter Web                                                                 |
| Backend        | Firebase / Supabase / Node.js API                                           |
| Database       | Firestore / Supabase PostgreSQL                                             |
| Authentication | Firebase Auth / Supabase Auth                                               |
| Calendar       | `nepali_date_picker`, `nepali_utils`, or similar Nepali BS calendar package |
| QR Code        | Flutter QR package or generated static QR image                             |
| vCard          | `.vcf` file or vCard text encoded in QR                                     |

`nepali_date_picker` supports Bikram Sambat calendar/date picker features and returns `NepaliDateTime`, which comes from `nepali_utils`. ([Dart packages][2])

---

### 12. Basic Data Models

#### Booking

```txt
Booking
- id
- name
- phone
- email
- serviceType
- nepaliDate
- time
- location
- description
- status
- duration
- adminNote
- createdAt
```

#### Service

```txt
Service
- id
- title
- description
- priceOptional
- active
```

#### Profile

```txt
Profile
- name
- title
- location
- phone
- email
- facebookUrl
- vcardUrl
- shortBio
```

---

### 13. vCard QR Requirement

The system shall display a QR code that stores or links to contact details such as:

```txt
Name: Shaligram Dahal
Role: Astrologer / Guru
Location: Biratnagar, Nepal
Phone: [phone number]
Facebook: [Facebook link]
```

The QR code may either:

* Open a `.vcf` vCard file, or
* Directly encode vCard text.

---

### 14. Scope Limitation

This first version will not include online payment, SMS verification, video consultation, or automatic booking approval. These can be added later.

[1]: https://pub.dev/packages/nepali_date_picker?utm_source=chatgpt.com "nepali_date_picker | Flutter package"
[2]: https://pub.dev/packages/nepali_date_picker/versions/4.2.0%2B1?utm_source=chatgpt.com "nepali_date_picker 4.2.0+1 | Flutter package"
