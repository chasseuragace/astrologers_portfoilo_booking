/**
 * Centralized Guru Configuration
 * 
 * This file contains all guru-specific data that needs to be customized
 * when porting the website for a different guru.
 * 
 * To port for another guru, update the values in this file.
 */

export interface GuruConfig {
  // Personal Information
  name: {
    english: string;
    nepali: string;
  };
  title: {
    english: string;
    nepali: string;
  };
  
  // Contact Information
  contact: {
    phone: string;
    email: string;
    location: string;
    website: string;
    facebookUrl: string;
    facebookHandle: string;
    mapEmbedUrl: string;
  };
  
  // Bio Information
  bio: {
    english: {
      intro: string;
      expertise: string;
      services: string;
    };
    nepali: {
      intro: string;
      expertise: string;
      services: string;
    };
  };
  
  // Assets
  assets: {
    coverImage: string;
    qrLogo: string;
  };
  
  // vCard Information
  vcard: {
    firstName: string;
    lastName: string;
    title: string;
    org: string;
    note: string;
  };
}

export const guruConfig: GuruConfig = {
  name: {
    english: 'Shaligram Dahal',
    nepali: 'शालिग्राम दाहाल',
  },
  
  title: {
    english: 'Astrologer & Spiritual Guide',
    nepali: 'ज्योतिषी र आध्यात्मिक गुरु',
  },
  
  contact: {
    phone: '+977-9842081092',
    email: 'shaligramdahal2012@gmail.com',
    location: 'Biratnagar Pitchara, Nepal',
    website: 'https://shaligram-guru.netlify.app',
    facebookUrl: 'https://www.facebook.com/shaligram.dahal.58',
    facebookHandle: 'shaligram.dahal.58',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!4v1777363375827!6m8!1m7!1s-OjsCWsOaBtNyBFCbsIY1A!2m2!1d26.45236569653541!2d87.26708356223959!3f182.12!4f6.569999999999993!5f0.4000000000000002',
  },
  
  bio: {
    english: {
      intro: 'I am Shaligram Dahal, a renowned astrologer and spiritual guide based in Biratnagar, Nepal. With years of experience in Vedic astrology, vastu shastra, and ritual ceremonies, I have helped countless individuals find clarity, peace, and prosperity in their lives.',
      expertise: 'I specialize in Kundali (horoscope) analysis, vastu consultation, and guidance for important religious ceremonies like shraddha and puja. I combine ancient wisdom with practical guidance to help my clients navigate life\'s challenges.',
      services: 'Whether you\'re seeking marriage compatibility analysis, muhurat (auspicious timing) for important events, or general spiritual guidance, I provide personalized consultations based on traditional Vedic principles.',
    },
    nepali: {
      intro: 'म शालिग्राम दाहाल, बिराटनगर, नेपालमा आधारित एक प्रख्यात ज्योतिषी र आध्यात्मिक गाइड हुँ। वैदिक ज्योतिष, वास्तु शास्त्र, र अनुष्ठान समारोहहरूमा वर्षौंको अनुभवका साथ, मैले असंख्य व्यक्तिहरूलाई आफ्नो जीवनमा स्पष्टता, शान्ति, र समृद्धि पाउन मद्दत गरेका छु।',
      expertise: 'म कुण्डली (राशिफल) विश्लेषण, वास्तु परामर्श, र श्राद्ध र पूजा जस्ता महत्त्वपूर्ण धार्मिक समारोहहरूको लागि मार्गदर्शनमा विशेषज्ञ हुँ। म प्राचीन ज्ञान र व्यावहारिक मार्गदर्शनलाई जोडेर मेरा ग्राहकहरूलाई जीवनका चुनौतीहरू सामना गर्न मद्दत गर्छु।',
      services: 'चाहे तपाईं विवाह संगतता विश्लेषण, महत्त्वपूर्ण कार्यक्रमहरूको लागि मुहूर्त (शुभ समय), वा सामान्य आध्यात्मिक मार्गदर्शन खोज्दै हुनुहुन्छ, म परम्परागत वैदिक सिद्धान्तहरूको आधारमा व्यक्तिगत परामर्श प्रदान गर्छु।',
    },
  },
  
  assets: {
    coverImage: '/cover.jpeg',
    qrLogo: '/ganpati.png',
  },
  
  vcard: {
    firstName: 'Shaligram',
    lastName: 'Dahal',
    title: 'Astrologer & Spiritual Guru',
    org: 'Shaligram Dahal Astrology',
    note: 'Renowned astrologer specializing in Vedic astrology, vastu consultation, and ritual ceremonies.',
  },
};
