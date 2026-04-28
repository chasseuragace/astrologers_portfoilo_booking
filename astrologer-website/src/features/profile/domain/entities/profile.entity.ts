/// Domain entity for Profile. Plain immutable value object — no
/// framework dependencies.
export interface ProfileEntity {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly phone: string;
  readonly email?: string;
  readonly facebookUrl?: string;
  readonly vcardUrl?: string;
  readonly shortBio?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class ProfileEntityClass implements ProfileEntity {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly phone: string;
  readonly email?: string;
  readonly facebookUrl?: string;
  readonly vcardUrl?: string;
  readonly shortBio?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(data: ProfileEntity) {
    this.id = data.id;
    this.name = data.name;
    this.title = data.title;
    this.location = data.location;
    this.phone = data.phone;
    this.email = data.email;
    this.facebookUrl = data.facebookUrl;
    this.vcardUrl = data.vcardUrl;
    this.shortBio = data.shortBio;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  copyWith(partial: Partial<ProfileEntity>): ProfileEntity {
    return new ProfileEntityClass({
      id: partial.id ?? this.id,
      name: partial.name ?? this.name,
      title: partial.title ?? this.title,
      location: partial.location ?? this.location,
      phone: partial.phone ?? this.phone,
      email: partial.email ?? this.email,
      facebookUrl: partial.facebookUrl ?? this.facebookUrl,
      vcardUrl: partial.vcardUrl ?? this.vcardUrl,
      shortBio: partial.shortBio ?? this.shortBio,
      createdAt: partial.createdAt ?? this.createdAt,
      updatedAt: partial.updatedAt ?? this.updatedAt,
    });
  }

  equals(other: ProfileEntity): boolean {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.title === other.title &&
      this.location === other.location &&
      this.phone === other.phone &&
      this.email === other.email &&
      this.facebookUrl === other.facebookUrl &&
      this.vcardUrl === other.vcardUrl &&
      this.shortBio === other.shortBio &&
      this.createdAt?.getTime() === other.createdAt?.getTime() &&
      this.updatedAt?.getTime() === other.updatedAt?.getTime()
    );
  }

  toString(): string {
    return `ProfileEntity(id: ${this.id}, name: ${this.name}, title: ${this.title})`;
  }
}
