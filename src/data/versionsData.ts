import { WebsiteVersion, DevicePreset, ViewportConfig, ComparisonMetric } from '../types';

export const INITIAL_VERSIONS: Record<'v1' | 'v2', WebsiteVersion> = {
  v1: {
    id: 'v1',
    title: 'Version 1 (Legacy / Baseline)',
    badge: 'Baseline V1',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400',
    url: 'https://3-tgds-tati.vercel.app/',
    description: 'Initial deployment version serving as the baseline for layout, typography, and functional evaluation.',
    features: ['Original Design Layout', 'Base Component Structure', 'Baseline Visual Hierarchy'],
    lastUpdated: 'Baseline Build',
    status: 'online',
  },
  v2: {
    id: 'v2',
    title: 'Version 2 (MCP Improvement)',
    badge: 'Improved V2',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400',
    url: 'https://mcp-training-3-tgds-improvement.vercel.app/',
    description: 'Enhanced iteration featuring MCP training improvements, refined typography, optimized responsiveness, and UX upgrades.',
    features: ['MCP Training Improvements', 'Refined Component Hierarchy', 'Enhanced Spacing & Palette', 'Optimized Interactions'],
    lastUpdated: 'Latest Release',
    status: 'online',
  },
};

export const DEVICE_PRESETS: ViewportConfig[] = [
  { id: 'responsive', label: 'Fluid / 100%', width: '100%', height: '100%', iconName: 'Maximize2' },
  { id: 'desktop', label: 'Desktop (1440px)', width: 1440, height: 900, iconName: 'Monitor' },
  { id: 'laptop', label: 'Laptop (1024px)', width: 1024, height: 768, iconName: 'Laptop' },
  { id: 'tablet', label: 'Tablet (768px)', width: 768, height: 1024, iconName: 'Tablet' },
  { id: 'mobile', label: 'Mobile (375px)', width: 375, height: 812, iconName: 'Smartphone' },
];

export const INITIAL_METRICS: ComparisonMetric[] = [
  { category: 'Visual Polish & Layout', v1Score: 3, v2Score: 5, notes: 'V2 improves typography hierarchy, spacing rhythm, and visual clarity.' },
  { category: 'Mobile Responsiveness', v1Score: 3.5, v2Score: 5, notes: 'V2 optimizes touch targets, fluid containers, and viewport padding.' },
  { category: 'Interaction & UX', v1Score: 3, v2Score: 4.5, notes: 'V2 features cleaner button feedback and improved navigation states.' },
  { category: 'Performance & Structure', v1Score: 4, v2Score: 4.8, notes: 'V2 streamlines asset loading and DOM structure.' },
];
