import React from 'react';
import { 
  Monitor, 
  Laptop, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  ExternalLink, 
  Globe, 
  ZoomIn, 
  Lock, 
  Unlock,
  CheckCircle2,
  Sliders,
  RotateCcw,
  ArrowUpDown
} from 'lucide-react';
import { DevicePreset, ViewportConfig } from '../types';
import { DEVICE_PRESETS } from '../data/versionsData';

interface ToolbarProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
  isSyncedPath: boolean;
  setIsSyncedPath: (synced: boolean) => void;
  devicePreset: DevicePreset;
  setDevicePreset: (preset: DevicePreset) => void;
  scale: number;
  setScale: (scale: number) => void;
  verticalScale: number;
  setVerticalScale: (scale: number) => void;
  v1BaseUrl: string;
  v2BaseUrl: string;
  v1FullUrl: string;
  v2FullUrl: string;
  onResetUrls: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentPath,
  setCurrentPath,
  isSyncedPath,
  setIsSyncedPath,
  devicePreset,
  setDevicePreset,
  scale,
  setScale,
  verticalScale,
  setVerticalScale,
  v1BaseUrl,
  v2BaseUrl,
  v1FullUrl,
  v2FullUrl,
  onResetUrls,
}) => {
  const getDeviceIcon = (id: DevicePreset) => {
    switch (id) {
      case 'desktop': return <Monitor className="w-3.5 h-3.5" />;
      case 'laptop': return <Laptop className="w-3.5 h-3.5" />;
      case 'tablet': return <Tablet className="w-3.5 h-3.5" />;
      case 'mobile': return <Smartphone className="w-3.5 h-3.5" />;
      default: return <Maximize2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        
        {/* Left: Path Navigation & Sync Bar */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex-1 min-w-0">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 font-mono select-none">Path:</span>
            <input
              type="text"
              value={currentPath}
              onChange={(e) => setCurrentPath(e.target.value)}
              placeholder="/"
              className="bg-transparent border-none outline-none font-mono text-slate-800 dark:text-slate-200 w-full text-xs"
            />
          </div>

          {/* Sync Toggle */}
          <button
            onClick={() => setIsSyncedPath(!isSyncedPath)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-medium transition-all shrink-0 ${
              isSyncedPath
                ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
            title={isSyncedPath ? 'Sync path navigation enabled' : 'Click to sync path navigation across both frames'}
          >
            {isSyncedPath ? <Lock className="w-3.5 h-3.5 text-indigo-500" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">Sync Path</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onResetUrls}
            className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
            title="Reset path to root"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Device Preset Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            {DEVICE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setDevicePreset(preset.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                  devicePreset === preset.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={`${preset.label}`}
              >
                {getDeviceIcon(preset.id)}
                <span className="hidden lg:inline">{preset.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Vertical Height Scale Control (5x Bigger Vertical) */}
          <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 px-2.5 py-1 rounded-lg text-indigo-700 dark:text-indigo-300 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[11px] font-mono hidden sm:inline">Vertical:</span>
            <select
              value={verticalScale}
              onChange={(e) => setVerticalScale(Number(e.target.value))}
              className="bg-transparent border-none outline-none font-mono text-indigo-800 dark:text-indigo-200 text-xs cursor-pointer font-bold"
            >
              <option value={1} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">1x (650px)</option>
              <option value={2} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">2x (1300px)</option>
              <option value={3} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">3x (1950px)</option>
              <option value={5} className="bg-white dark:bg-slate-900 text-indigo-600 font-bold">5x (3250px Default)</option>
              <option value={7} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">7x (4550px)</option>
            </select>
          </div>

          {/* Scale / Zoom Control */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
            <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="bg-transparent border-none outline-none font-mono text-slate-800 dark:text-slate-200 text-xs cursor-pointer"
            >
              <option value={0.75}>75%</option>
              <option value={0.9}>90%</option>
              <option value={1}>100%</option>
              <option value={1.1}>110%</option>
              <option value={1.25}>125%</option>
            </select>
          </div>

          {/* Quick Direct Links */}
          <div className="hidden xl:flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-3">
            <a
              href={v1FullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded text-xs transition-colors"
            >
              <span>V1 Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={v2FullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded text-xs transition-colors"
            >
              <span>V2 Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
