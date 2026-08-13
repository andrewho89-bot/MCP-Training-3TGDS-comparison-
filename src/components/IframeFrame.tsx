import React, { useState, useRef, useEffect } from 'react';
import { 
  RefreshCw, 
  ExternalLink, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  AlertCircle,
  Loader2,
  Sparkles,
  Smartphone,
  Tablet,
  Laptop,
  Monitor
} from 'lucide-react';
import { WebsiteVersion, DevicePreset } from '../types';
import { DEVICE_PRESETS } from '../data/versionsData';

interface IframeFrameProps {
  version: WebsiteVersion;
  fullUrl: string;
  devicePreset: DevicePreset;
  scale: number;
  refreshKey: number;
  onRefresh: () => void;
  badgeExtra?: string;
}

export const IframeFrame: React.FC<IframeFrameProps> = ({
  version,
  fullUrl,
  devicePreset,
  scale,
  refreshKey,
  onRefresh,
  badgeExtra,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset loading status on refresh key or URL change
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [fullUrl, refreshKey]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPresetConfig = () => {
    return DEVICE_PRESETS.find((p) => p.id === devicePreset) || DEVICE_PRESETS[0];
  };

  const config = getPresetConfig();
  const isConstrainedDevice = devicePreset !== 'responsive';

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 shadow-2xl border-indigo-500/50' : ''
    }`}>
      {/* Frame Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 shrink-0 select-none">
        <div className="flex items-center gap-2 min-w-0">
          {/* Badge */}
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${version.badgeColor}`}>
            {version.badge}
          </span>

          {/* Title / URL */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-medium text-slate-800 dark:text-slate-200 text-xs truncate">
              {version.id === 'v1' ? 'Version 1' : 'Version 2'}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] truncate hidden lg:inline max-w-[200px]">
              {fullUrl}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live</span>
          </div>

          {/* Copy URL */}
          <button
            onClick={handleCopyUrl}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-md transition-colors"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Refresh Frame */}
          <button
            onClick={onRefresh}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-md transition-colors"
            title="Refresh Frame"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-indigo-500' : ''}`} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-md transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Maximize Frame'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Open External */}
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-md transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Iframe Viewport Area */}
      <div className="relative flex-1 bg-slate-900/5 dark:bg-slate-950/40 overflow-auto flex items-center justify-center p-2 sm:p-4">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 transition-opacity">
            <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Loading {version.title}...
            </p>
          </div>
        )}

        {/* Viewport Container (Handles device dimensions & zoom scale) */}
        <div
          className={`relative transition-all duration-300 ${
            isConstrainedDevice
              ? 'bg-slate-900 p-3 rounded-2xl shadow-xl border-4 border-slate-700 dark:border-slate-800'
              : 'w-full h-full'
          }`}
          style={
            isConstrainedDevice
              ? {
                  width: typeof config.width === 'number' ? `${config.width}px` : config.width,
                  height: typeof config.height === 'number' ? `${config.height}px` : '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }
              : { width: '100%', height: '100%' }
          }
        >
          {/* Device notch/speaker indicator if constrained mobile */}
          {devicePreset === 'mobile' && (
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-800 rounded-b-md z-30 flex items-center justify-center">
              <div className="w-6 h-1 bg-slate-700 rounded-full"></div>
            </div>
          )}

          <div
            className="w-full h-full rounded-lg overflow-hidden bg-white"
            style={{
              transform: scale !== 1 ? `scale(${scale})` : 'none',
              transformOrigin: 'top center',
            }}
          >
            <iframe
              key={`${fullUrl}-${refreshKey}`}
              ref={iframeRef}
              src={fullUrl}
              title={version.title}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
            />
          </div>
        </div>
      </div>

      {/* Frame Footer Info */}
      <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
        <span className="truncate">{version.description}</span>
        <span className="shrink-0 font-mono text-[10px] opacity-75">
          {devicePreset.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
