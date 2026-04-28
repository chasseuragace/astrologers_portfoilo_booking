/// Data model for Booking with JSON serialization.
import type { BookingEntity, BookingStatus } from '../../domain/entities/booking.entity';

export type BookingModel = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  nepaliDate: string;
  location: string;
  description?: string;
  status: string;
  duration?: string;
  adminNote?: string;
  created_at?: string;
  updated_at?: string;
}

export function toEntity(model: BookingModel): BookingEntity {
  return {
    id: model.id,
    name: model.name,
    phone: model.phone,
    email: model.email,
    serviceType: model.serviceType,
    nepaliDate: model.nepaliDate,
    location: model.location,
    description: model.description,
    status: model.status as BookingStatus,
    duration: model.duration,
    adminNote: model.adminNote,
    createdAt: model.created_at ? new Date(model.created_at) : undefined,
    updatedAt: model.updated_at ? new Date(model.updated_at) : undefined,
  };
}

export function fromModel(entity: BookingEntity): BookingModel {
  return {
    id: entity.id,
    name: entity.name,
    phone: entity.phone,
    email: entity.email,
    serviceType: entity.serviceType,
    nepaliDate: entity.nepaliDate,
    location: entity.location,
    description: entity.description,
    status: entity.status,
    duration: entity.duration,
    adminNote: entity.adminNote,
    created_at: entity.createdAt?.toISOString(),
    updated_at: entity.updatedAt?.toISOString(),
  };
}

export function dummyBooking(id: string = '1'): BookingModel {
  return {
    id,
    name: `Client ${id}`,
    phone: `980000000${id}`,
    email: `client${id}@example.com`,
    serviceType: 'Kundali Consultation',
    nepaliDate: '2081/05/12',
    location: 'Biratnagar',
    description: 'General consultation',
    status: 'Pending',
    duration: '30 minutes',
    adminNote: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function dummyBookingList(count: number = 5): BookingModel[] {
  return Array.from({ length: count }, (_, i) => dummyBooking(String(i + 1)));
}
