/// Domain entity for Service. Plain immutable value object — no
/// framework dependencies.
export interface ServiceEntity {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly price?: string;
  readonly active: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class ServiceEntityClass implements ServiceEntity {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly price?: string;
  readonly active: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(data: ServiceEntity) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.active = data.active;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  copyWith(partial: Partial<ServiceEntity>): ServiceEntity {
    return new ServiceEntityClass({
      id: partial.id ?? this.id,
      title: partial.title ?? this.title,
      description: partial.description ?? this.description,
      price: partial.price ?? this.price,
      active: partial.active ?? this.active,
      createdAt: partial.createdAt ?? this.createdAt,
      updatedAt: partial.updatedAt ?? this.updatedAt,
    });
  }

  equals(other: ServiceEntity): boolean {
    return (
      this.id === other.id &&
      this.title === other.title &&
      this.description === other.description &&
      this.price === other.price &&
      this.active === other.active &&
      this.createdAt?.getTime() === other.createdAt?.getTime() &&
      this.updatedAt?.getTime() === other.updatedAt?.getTime()
    );
  }

  toString(): string {
    return `ServiceEntity(id: ${this.id}, title: ${this.title}, active: ${this.active})`;
  }
}
