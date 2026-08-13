import React from 'react';
import { 
  Columns2, 
  Layers, 
  SquareSplitHorizontal, 
  Smartphone, 
  Monitor, 
  Laptop, 
  Tablet, 
  Maximize2, 
  RefreshCw, 
  ArrowLeftRight, 
  MessageSquarePlus, 
  Info, 
  ExternalLink,
  Moon,
  Sun,
  Sparkles,
  Link2
} from 'lucide-react';
import { ViewMode, DevicePreset } from '../types';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  devicePreset: DevicePreset;
  setDevicePreset: (preset: DevicePreset) => void;
  isSyncedPath: boolean;
  setIsSyncedPath: (synced: boolean) => void;
  onRefreshAll: () => void;
  onSwapSides: () => void;
  onOpenNotes: () => void;
  onOpenInfo: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  v1Url: string;
  v2Url: string;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  devicePreset,
  setDevicePreset,
  isSyncedPath,
  setIsSyncedPath,
  onRefreshAll,
  onSwapSides,
  onOpenNotes,
  onOpenInfo,
  isDarkMode,
  setIsDarkMode,
  v1Url,
  v2Url,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Branding & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/10">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Columns2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-slate-900 dark:text-white text-base leading-tight">
                Website Version Comparison
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                <Sparkles className="w-3 h-3 text-indigo-500" /> V1 vs V2
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Side-by-side evaluation & improvement preview host
            </p>
          </div>
        </div>

        {/* Center: View Modes & Viewport Controls */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Side-by-Side Dual View (Split 50/50)"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            onClick={() => setViewMode('overlay')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'overlay'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Interactive Visual Reveal Slider"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overlay Slider</span>
          </button>

          <button
            onClick={() => setViewMode('v1-only')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'v1-only'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Inspect Version 1 Baseline Only"
          >
            <SquareSplitHorizontal className="w-3.5 h-3.5" />
            <span>V1 Only</span>
          </button>

          <button
            onClick={() => setViewMode('v2-only')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'v2-only'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Inspect Version 2 Improved Only"
          >
            <SquareSplitHorizontal className="w-3.5 h-3.5" />
            <span>V2 Only</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Refresh Both */}
          <button
            onClick={onRefreshAll}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Refresh Both Frames"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Swap Sides */}
          <button
            onClick={onSwapSides}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
            title="Swap V1 and V2 Positions"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          {/* Evaluation Notes */}
          <button
            onClick={onOpenNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium shadow-sm transition-colors"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Evaluation Notes</span>
          </button>

          {/* Info Modal */}
          <button
            onClick={onOpenInfo}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Comparison Info & URLs"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Mode Selector Row */}
      <div className="md:hidden flex items-center justify-around bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 text-xs">
        <button
          onClick={() => setViewMode('split')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Split View
        </button>
        <button
          onClick={() => setViewMode('overlay')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            viewMode === 'overlay' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Overlay Slider
        </button>
        <button
          onClick={() => setViewMode('v1-only')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            viewMode === 'v1-only' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          V1
        </button>
        <button
          onClick={() => setViewMode('v2-only')}
          className={`px-2.5 py-1 rounded-md font-medium ${
            viewMode === 'v2-only' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          V2
        </button>
      </div>
    </header>
  );
};
