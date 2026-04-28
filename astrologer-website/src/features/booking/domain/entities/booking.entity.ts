/// Domain entity for Booking. Plain immutable value object — no
/// framework dependencies.
export type BookingStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';

export type BookingEntity = {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly serviceType: string;
  readonly nepaliDate: string;
  readonly location: string;
  readonly description?: string;
  readonly status: BookingStatus;
  readonly duration?: string;
  readonly adminNote?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class BookingEntityClass implements BookingEntity {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly serviceType: string;
  readonly nepaliDate: string;
  readonly location: string;
  readonly description?: string;
  readonly status: BookingStatus;
  readonly duration?: string;
  readonly adminNote?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(data: BookingEntity) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.serviceType = data.serviceType;
    this.nepaliDate = data.nepaliDate;
    this.location = data.location;
    this.description = data.description;
    this.status = data.status;
    this.duration = data.duration;
    this.adminNote = data.adminNote;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  copyWith(partial: Partial<BookingEntity>): BookingEntity {
    return new BookingEntityClass({
      id: partial.id ?? this.id,
      name: partial.name ?? this.name,
      phone: partial.phone ?? this.phone,
      email: partial.email ?? this.email,
      serviceType: partial.serviceType ?? this.serviceType,
      nepaliDate: partial.nepaliDate ?? this.nepaliDate,
      location: partial.location ?? this.location,
      description: partial.description ?? this.description,
      status: partial.status ?? this.status,
      duration: partial.duration ?? this.duration,
      adminNote: partial.adminNote ?? this.adminNote,
      createdAt: partial.createdAt ?? this.createdAt,
      updatedAt: partial.updatedAt ?? this.updatedAt,
    });
  }

  equals(other: BookingEntity): boolean {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.phone === other.phone &&
      this.email === other.email &&
      this.serviceType === other.serviceType &&
      this.nepaliDate === other.nepaliDate &&
      this.location === other.location &&
      this.description === other.description &&
      this.status === other.status &&
      this.duration === other.duration &&
      this.adminNote === other.adminNote &&
      this.createdAt?.getTime() === other.createdAt?.getTime() &&
      this.updatedAt?.getTime() === other.updatedAt?.getTime()
    );
  }

  toString(): string {
    return `BookingEntity(id: ${this.id}, name: ${this.name}, status: ${this.status})`;
  }
}
