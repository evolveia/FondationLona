export type Language = 'fr' | 'en' | 'es' | 'pt' | 'ar' | 'zh';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string; // Emoji flag
  countryCode: string;
}

export interface HeroSlide {
  id: string;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  secondaryCtaKey?: string;
  tagKey: string;
  image: string;
  statsKey: string;
  pillarId: string;
}

export interface Pillar {
  id: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  iconName: string;
  image: string;
  stats: { value: string; labelKey: string }[];
  keyActionsKey: string[];
  badgeColor: string;
}

export interface ProvinceData {
  id: string;
  name: string;
  capital: string;
  region: string;
  beneficiariesCount: string;
  activePrograms: string[];
  descriptionKey: string;
  coordinates: { x: number; y: number }; // Relative coordinates for interactive DRC map
}

export interface ImpactStory {
  id: string;
  name: string;
  roleKey: string;
  location: string;
  category: 'education' | 'health' | 'empowerment' | 'vbg';
  image: string;
  quoteKey: string;
  fullStoryKey: string;
  badgeKey: string;
}

export interface AuditReport {
  id: string;
  year: string;
  titleKey: string;
  fileSize: string;
  auditor: string;
  verified: boolean;
  pages: number;
}

export interface DonorFormState {
  type: 'one-time' | 'monthly';
  amount: number;
  customAmount: string;
  currency: 'USD' | 'CDF' | 'EUR';
  allocatedPillar: string;
  fullName: string;
  email: string;
  country: string;
  anonymous: boolean;
}

export interface ChatbotLead {
  fullName: string;
  email: string;
  country: string;
  profile: 'individual' | 'government' | 'ngo_business';
  subject: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickOptions?: { label: string; action: () => void }[];
  isFinalCard?: boolean;
  whatsappUrl?: string;
}
