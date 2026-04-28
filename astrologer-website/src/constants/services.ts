export interface ServiceItem {
  titleKey: string
  descKey: string
  num: string
}

export const SERVICES: ServiceItem[] = [
  { titleKey: 'services.kundaliTitle', descKey: 'services.kundaliDesc', num: '01' },
  { titleKey: 'services.vastuTitle', descKey: 'services.vastuDesc', num: '02' },
  { titleKey: 'services.shraddhaTitle', descKey: 'services.shraddhaDesc', num: '03' },
  { titleKey: 'services.pujaTitle', descKey: 'services.pujaDesc', num: '04' },
  { titleKey: 'services.muhuratTitle', descKey: 'services.muhuratDesc', num: '05' },
  { titleKey: 'services.generalTitle', descKey: 'services.generalDesc', num: '06' },
  { titleKey: 'services.gunaMilanTitle', descKey: 'services.gunaMilanDesc', num: '07' },
  { titleKey: 'services.brataPuranTitle', descKey: 'services.brataPuranDesc', num: '08' },
  { titleKey: 'services.shantiPujaTitle', descKey: 'services.shantiPujaDesc', num: '09' },
]

export const SERVICE_NAMES = [
  'Kundali / Horoscope Consultation',
  'Vastu Consultation',
  'Shraddha / Ritual Guidance',
  'Puja Consultation',
  'Marriage/Date/Muhurat Consultation',
  'General Astrology Consultation',
]
