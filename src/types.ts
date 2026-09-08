export interface ProjectCredit {
  role: string;
  roleEn?: string;
  name: string;
  nameEn?: string;
}

export interface ProjectImageItem {
  id: string;
  url: string;
  caption?: string;
  captionEn?: string;
  alt: string;
  embedHTML?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  subtitleEn?: string;
  category: string;
  categoryEn?: string;
  year: string;
  client: string;
  agency?: string;
  school?: string;
  company?: string;
  studio?: string;
  entry?: string;
  creativeDirection?: string;
  artDirection?: string;
  copywriting?: string;
  marketingDirector?: string;
  scope?: string;
  scopeEn?: string;
  accentColor: string;
  textColor: 'light' | 'dark';
  bgColor: string;
  cardType?: string;
  coverImage?: string;
  summary: string;
  summaryEn?: string;
  description: string;
  descriptionEn?: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  deliverables?: string[];
  externalUrl?: string;
  credits?: ProjectCredit[];
  images?: ProjectImageItem[];
}

export type ThemeMode = 'light' | 'dark';
export type Language = 'pt' | 'en';
