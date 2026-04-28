/// Data model for Service with JSON serialization.
import type { ServiceEntity } from '../../domain/entities/service.entity';

export interface ServiceModel {
  id: string;
  title: string;
  description?: string;
  price?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export function toEntity(model: ServiceModel): ServiceEntity {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    price: model.price,
    active: model.active,
    createdAt: model.created_at ? new Date(model.created_at) : undefined,
    updatedAt: model.updated_at ? new Date(model.updated_at) : undefined,
  };
}

export function fromModel(entity: ServiceEntity): ServiceModel {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    price: entity.price,
    active: entity.active,
    created_at: entity.createdAt?.toISOString(),
    updated_at: entity.updatedAt?.toISOString(),
  };
}

export function dummyService(id: string = '1'): ServiceModel {
  const services = [
    'Kundali / Horoscope Consultation',
    'Vastu Consultation',
    'Shraddha / Ritual Guidance',
    'Puja Consultation',
    'Marriage/Date/Muhurat Consultation',
    'General Astrology Consultation'
  ];
  return {
    id,
    title: services[parseInt(id) % services.length],
    description: `Description for ${services[parseInt(id) % services.length]}`,
    price: 'NPR 1000',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function dummyServiceList(count: number = 6): ServiceModel[] {
  return Array.from({ length: count }, (_, i) => dummyService(String(i + 1)));
}
