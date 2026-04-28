/// Domain entity for Service. Plain immutable value object — no
/// framework dependencies.
export interface ServiceEntity {
  readonly id: string;
  readonly name: string;
  readonly titleEn: string;
  readonly titleNp: string;
  readonly descriptionEn: string;
  readonly descriptionNp: string;
  readonly displayOrder: number;
  readonly price?: string;
  readonly active: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class ServiceEntityClass implements ServiceEntity {
  readonly id: string;
  readonly name: string;
  readonly titleEn: string;
  readonly titleNp: string;
  readonly descriptionEn: string;
  readonly descriptionNp: string;
  readonly displayOrder: number;
  readonly price?: string;
  readonly active: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(data: ServiceEntity) {
    this.id = data.id;
    this.name = data.name;
    this.titleEn = data.titleEn;
    this.titleNp = data.titleNp;
    this.descriptionEn = data.descriptionEn;
    this.descriptionNp = data.descriptionNp;
    this.displayOrder = data.displayOrder;
    this.price = data.price;
    this.active = data.active;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  copyWith(partial: Partial<ServiceEntity>): ServiceEntity {
    return new ServiceEntityClass({
      id: partial.id ?? this.id,
      name: partial.name ?? this.name,
      titleEn: partial.titleEn ?? this.titleEn,
      titleNp: partial.titleNp ?? this.titleNp,
      descriptionEn: partial.descriptionEn ?? this.descriptionEn,
      descriptionNp: partial.descriptionNp ?? this.descriptionNp,
      displayOrder: partial.displayOrder ?? this.displayOrder,
      price: partial.price ?? this.price,
      active: partial.active ?? this.active,
      createdAt: partial.createdAt ?? this.createdAt,
      updatedAt: partial.updatedAt ?? this.updatedAt,
    });
  }

  equals(other: ServiceEntity): boolean {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.titleEn === other.titleEn &&
      this.titleNp === other.titleNp &&
      this.descriptionEn === other.descriptionEn &&
      this.descriptionNp === other.descriptionNp &&
      this.displayOrder === other.displayOrder &&
      this.price === other.price &&
      this.active === other.active &&
      this.createdAt?.getTime() === other.createdAt?.getTime() &&
      this.updatedAt?.getTime() === other.updatedAt?.getTime()
    );
  }

  toString(): string {
    return `ServiceEntity(id: ${this.id}, titleEn: ${this.titleEn}, active: ${this.active})`;
  }
}
