/// Data model for Service with JSON serialization.
import type { ServiceEntity } from '../../domain/entities/service.entity';

export interface ServiceModel {
  id: string;
  title: string;
  titleEn: string;
  titleNp: string;
  descriptionEn: string;
  descriptionNp: string;
  displayOrder: number;
  price?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export function toEntity(model: ServiceModel): ServiceEntity {
  return {
    id: model.id,
    name: model.title,
    titleEn: model.titleEn,
    titleNp: model.titleNp,
    descriptionEn: model.descriptionEn,
    descriptionNp: model.descriptionNp,
    displayOrder: model.displayOrder,
    price: model.price,
    active: model.active,
    createdAt: model.created_at ? new Date(model.created_at) : undefined,
    updatedAt: model.updated_at ? new Date(model.updated_at) : undefined,
  };
}

export function fromModel(entity: ServiceEntity): ServiceModel {
  return {
    id: entity.id,
    title: entity.name,
    titleEn: entity.titleEn,
    titleNp: entity.titleNp,
    descriptionEn: entity.descriptionEn,
    descriptionNp: entity.descriptionNp,
    displayOrder: entity.displayOrder,
    price: entity.price,
    active: entity.active,
    created_at: entity.createdAt?.toISOString(),
    updated_at: entity.updatedAt?.toISOString(),
  };
}

export function dummyService(id: string = '1'): ServiceModel {
  const serviceData = [
    {
      titleEn: 'Kundali / Horoscope Consultation',
      titleNp: 'कुण्डली / राशिफल परामर्श',
      descriptionEn: 'Detailed analysis of your birth chart to provide insights into your personality, life path, and future events. Includes marriage, foreign travel, business predictions.',
      descriptionNp: 'तपाईंको व्यक्तित्व, जीवन पथ, र भविष्यको घटनाहरूमा अन्तर्दृष्टि प्रदान गर्न तपाईंको जन्म कुण्डलीको विस्तृत विश्लेषण। विवाह, बिदेश यात्रा, व्यापारको फलादेश समावेश छन्।',
    },
    {
      titleEn: 'Vastu Consultation',
      titleNp: 'वास्तु परामर्श',
      descriptionEn: 'Special guidance on Vastu principles for your home, office, or business premises. Ensure harmony and prosperity through proper spatial arrangements.',
      descriptionNp: 'तपाईंको घर, कार्यालय, वा व्यावसायिक परिसरको लागि वास्तु सिद्धान्तहरूमा विशेष मार्गदर्शन। उचित स्थानीय व्यवस्थाको माध्यमबाट सद्भाव र समृद्धि सुनिश्चित गर्न।',
    },
    {
      titleEn: 'Shraddha / Ritual Guidance',
      titleNp: 'श्राद्ध / अनुष्ठान मार्गदर्शन',
      descriptionEn: 'Complete guidance for Shraddha ceremonies and other important rituals. Learn the proper procedures, timings, and significance.',
      descriptionNp: 'श्राद्ध समारोहहरू र अन्य महत्त्वपूर्ण अनुष्ठानहरूको लागि पूर्ण मार्गदर्शन। उचित प्रक्रियाहरू, समय, र महत्व सिक्न।',
    },
    {
      titleEn: 'Puja Consultation',
      titleNp: 'पूजा परामर्श',
      descriptionEn: 'Guidance for various pujas and religious ceremonies. Learn which pujas to perform for specific needs and how to perform them properly.',
      descriptionNp: 'विभिन्न पूजाहरू र धार्मिक समारोहहरूको लागि मार्गदर्शन। विशिष्ट आवश्यकताहरूको लागि कुन पूजाहरू गर्ने र तिनीहरूलाई कसरी उचित रूपमा गर्ने सिक्न।',
    },
    {
      titleEn: 'Marriage/Date/Muhurat Consultation',
      titleNp: 'विवाह/मिति/मुहूर्त परामर्श',
      descriptionEn: 'Find the most auspicious dates (muhurat) for marriage, housewarming, business start, foundation laying, and other important life events.',
      descriptionNp: 'विवाह, गृह प्रवेश, व्यापार सुरुवात, शिलान्यास, र अन्य महत्त्वपूर्ण जीवन घटनाहरूको लागि सबैभन्दा शुभ मितिहरू (मुहूर्त) पत्ता लगाउन।',
    },
    {
      titleEn: 'General Astrology Consultation',
      titleNp: 'जन्म कुण्डली निर्माण',
      descriptionEn: 'Create your personal birth chart based on your birth date and time.',
      descriptionNp: 'जन्म मिति र समयको आधारमा तपाईंको व्यक्तिगत जन्म कुण्डली निर्माण गर्न।',
    },
    {
      titleEn: 'Guna Milan / Marriage Compatibility',
      titleNp: 'गुण मिलन / विवाह संगतता',
      descriptionEn: 'Kundali matching based on 36 gunas for marriage. Detailed analysis of Ashtakoot, Nadi, Rashi, Gana, Tara, Vashya, Yoni, and other gunas.',
      descriptionNp: 'विवाहको लागि ३६ गुणको आधारमा कुण्डली मिलान। अस्टकूट, नाडी, राशि, गण, तारा, वश्य, योनी, र अन्य गुणहरूको विस्तृत विश्लेषण।',
    },
    {
      titleEn: 'Brata Udhyapan, Brata Pratishtha & Puran Path',
      titleNp: 'ब्रत उद्यापन, ब्रत प्रतिष्ठा र पुराण पाठ',
      descriptionEn: 'Special guidance and services for brata udhyapan, brata pratishtha, Garud Puran, Chandi Path, Bhagavat Path, and Gita Path.',
      descriptionNp: 'ब्रत उद्यापन, ब्रत प्रतिष्ठा, गरुड पुराण, चण्डी पाठ, भागवत पाठ, र गीता पाठको लागि विशेष मार्गदर्शन र सेवा।',
    },
    {
      titleEn: 'Shanti Puja - Moola Janit, Ashubha Nakshatra, Mangalika Yoga',
      titleNp: 'शान्ति पूजा - मूल जनित, अशुभ नक्षत्र, मांगलिक योग',
      descriptionEn: 'Special shanti puja and guidance for moola janit dosh, ashubha nakshatra birth shanti, mangalika yoga shanti, and ark vivah / kumbh vivah.',
      descriptionNp: 'मूल जनित दोष, अशुभ नक्षत्र जन्म शान्ति, मांगलिक योग शान्ति, र अर्क विवाह / कुम्भ विवाहको लागि विशेष शान्ति पूजा र मार्गदर्शन।',
    },
  ];
  const index = parseInt(id) % serviceData.length;
  const data = serviceData[index];
  return {
    id,
    title: data.titleEn,
    titleEn: data.titleEn,
    titleNp: data.titleNp,
    descriptionEn: data.descriptionEn,
    descriptionNp: data.descriptionNp,
    displayOrder: index + 1,
    price: 'NPR 1000',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function dummyServiceList(count: number = 6): ServiceModel[] {
  return Array.from({ length: count }, (_, i) => dummyService(String(i + 1)));
}
