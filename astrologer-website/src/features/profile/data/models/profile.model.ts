/// Data model for Profile with JSON serialization.
import type { ProfileEntity } from '../../domain/entities/profile.entity';

export interface ProfileModel {
  id: string;
  name: string;
  title: string;
  location: string;
  phone: string;
  email?: string;
  facebookUrl?: string;
  vcardUrl?: string;
  shortBio?: string;
  created_at?: string;
  updated_at?: string;
}

export function toEntity(model: ProfileModel): ProfileEntity {
  return {
    id: model.id,
    name: model.name,
    title: model.title,
    location: model.location,
    phone: model.phone,
    email: model.email,
    facebookUrl: model.facebookUrl,
    vcardUrl: model.vcardUrl,
    shortBio: model.shortBio,
    createdAt: model.created_at ? new Date(model.created_at) : undefined,
    updatedAt: model.updated_at ? new Date(model.updated_at) : undefined,
  };
}

export function fromModel(entity: ProfileEntity): ProfileModel {
  return {
    id: entity.id,
    name: entity.name,
    title: entity.title,
    location: entity.location,
    phone: entity.phone,
    email: entity.email,
    facebookUrl: entity.facebookUrl,
    vcardUrl: entity.vcardUrl,
    shortBio: entity.shortBio,
    created_at: entity.createdAt?.toISOString(),
    updated_at: entity.updatedAt?.toISOString(),
  };
}

export function dummyProfile(id: string = '1'): ProfileModel {
  return {
    id,
    name: 'Shaligram Dahal',
    title: 'Astrologer / Guru',
    location: 'Biratnagar, Nepal',
    phone: '9800000000',
    email: 'shaligram@example.com',
    facebookUrl: 'https://facebook.com/shaligramdahal',
    vcardUrl: '/vcf/shaligram-dahal.vcf',
    shortBio: 'Renowned astrologer and spiritual guide specializing in Vedic astrology, vastu, and ritual ceremonies.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function dummyProfileList(): ProfileModel[] {
  return [dummyProfile()];
}
