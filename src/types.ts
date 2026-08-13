export type ViewMode = 'split' | 'overlay' | 'v1-only' | 'v2-only';

export type DevicePreset = 'responsive' | 'desktop' | 'laptop' | 'tablet' | 'mobile';

export interface ViewportConfig {
  id: DevicePreset;
  label: string;
  width: number | string; // e.g. 375 or '100%'
  height: number | string;
  iconName: string;
}

export interface WebsiteVersion {
  id: 'v1' | 'v2';
  title: string;
  badge: string;
  badgeColor: string;
  url: string;
  description: string;
  features: string[];
  lastUpdated?: string;
  status: 'online' | 'loading' | 'error';
}

export interface ComparisonNote {
  id: string;
  version: 'v1' | 'v2' | 'both';
  category: 'UI/UX' | 'Performance' | 'Layout' | 'Bug' | 'General';
  title: string;
  description: string;
  rating?: number; // 1 to 5 stars
  timestamp: string;
}

export interface ComparisonMetric {
  category: string;
  v1Score: number;
  v2Score: number;
  notes: string;
}

