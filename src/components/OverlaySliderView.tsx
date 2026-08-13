import React, { useState, useRef, useCallback } from 'react';
import { WebsiteVersion, DevicePreset } from '../types';
import { GripVertical, RefreshCw, ExternalLink, Sparkles } from 'lucide-react';

interface OverlaySliderViewProps {
  v1Version: WebsiteVersion;
  v2Version: WebsiteVersion;
  v1Url: string;
  v2Url: string;
  devicePreset: DevicePreset;
  scale: number;
  verticalScale: number;
  refreshKeys: { v1: number; v2: number };
  onRefreshV1: () => void;
  onRefreshV2: () => void;
}

export const OverlaySliderView: React.FC<OverlaySliderViewProps> = ({
  v1Version,
  v2Version,
  v1Url,
  v2Url,
  devicePreset,
  scale,
  verticalScale,
  refreshKeys,
  onRefreshV1,
  onRefreshV2,
}) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatedHeight = Math.round(650 * verticalScale);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  return (
    <div className="flex flex-col p-3 gap-2 select-none">
      {/* Slider Header Control */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Interactive Visual Reveal</span>
          <span className="text-slate-400 font-mono">Drag handle to compare changes</span>
        </div>

        {/* Position percentage indicator & Range input */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-amber-600 dark:text-amber-400 font-semibold">V1: {Math.round(sliderPos)}%</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">V2: {Math.round(100 - sliderPos)}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="w-28 sm:w-40 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* Main Stacked Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full bg-slate-900/5 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
        style={{ height: `${calculatedHeight}px` }}
      >
        {/* Layer 2: Version 2 (Base Layer beneath reveal) */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            key={`v2-${v2Url}-${refreshKeys.v2}`}
            src={v2Url}
            title="Version 2 Overlay Base"
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 text-white shadow-md pointer-events-none">
            V2 Improved
          </div>
        </div>

        {/* Layer 1: Version 1 (Top Layer clipped by sliderPos) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
          }}
        >
          <iframe
            key={`v1-${v1Url}-${refreshKeys.v1}`}
            src={v1Url}
            title="Version 1 Overlay Top"
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-600 text-white shadow-md pointer-events-none">
            V1 Baseline
          </div>
        </div>

        {/* Vertical Divider Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-indigo-500 shadow-xl cursor-col-resize -translate-x-1/2 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center border-2 border-white pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>

        {/* Dragging Overlay */}
        {isDragging && <div className="absolute inset-0 z-40 bg-transparent cursor-col-resize" />}
      </div>
    </div>
  );
};
