import React, { useState, useRef, useCallback } from 'react';
import { IframeFrame } from './IframeFrame';
import { WebsiteVersion, DevicePreset } from '../types';
import { GripVertical } from 'lucide-react';

interface SideBySideViewProps {
  v1Version: WebsiteVersion;
  v2Version: WebsiteVersion;
  v1Url: string;
  v2Url: string;
  devicePreset: DevicePreset;
  scale: number;
  refreshKeys: { v1: number; v2: number };
  onRefreshV1: () => void;
  onRefreshV2: () => void;
  isSwapped: boolean;
}

export const SideBySideView: React.FC<SideBySideViewProps> = ({
  v1Version,
  v2Version,
  v1Url,
  v2Url,
  devicePreset,
  scale,
  refreshKeys,
  onRefreshV1,
  onRefreshV2,
  isSwapped,
}) => {
  const [splitRatio, setSplitRatio] = useState(50); // percentage for left container
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const leftVersion = isSwapped ? v2Version : v1Version;
  const rightVersion = isSwapped ? v1Version : v2Version;

  const leftUrl = isSwapped ? v2Url : v1Url;
  const rightUrl = isSwapped ? v1Url : v2Url;

  const leftRefresh = isSwapped ? onRefreshV2 : onRefreshV1;
  const rightRefresh = isSwapped ? onRefreshV1 : onRefreshV2;

  const leftKey = isSwapped ? refreshKeys.v2 : refreshKeys.v1;
  const rightKey = isSwapped ? refreshKeys.v1 : refreshKeys.v2;

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const percentage = Math.max(20, Math.min(80, (relativeX / rect.width) * 100));
      setSplitRatio(percentage);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full h-full flex flex-col lg:flex-row p-3 gap-3 overflow-hidden select-none ${
        isDragging ? 'cursor-col-resize' : ''
      }`}
    >
      {/* Left Frame */}
      <div
        className="w-full lg:h-full flex-1 min-h-[350px]"
        style={{ flexBasis: `${splitRatio}%` }}
      >
        <IframeFrame
          version={leftVersion}
          fullUrl={leftUrl}
          devicePreset={devicePreset}
          scale={scale}
          refreshKey={leftKey}
          onRefresh={leftRefresh}
        />
      </div>

      {/* Draggable Splitter (Visible on Desktop LG screens) */}
      <div
        onMouseDown={handleMouseDown}
        className="hidden lg:flex items-center justify-center w-3 hover:w-4 hover:bg-indigo-500/20 active:bg-indigo-500/30 rounded-full transition-all cursor-col-resize group shrink-0"
        title="Drag to resize split ratio"
      >
        <div className="w-1.5 h-10 bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-500 rounded-full flex items-center justify-center transition-colors">
          <GripVertical className="w-3 h-3 text-slate-500 dark:text-slate-400 group-hover:text-white" />
        </div>
      </div>

      {/* Right Frame */}
      <div
        className="w-full lg:h-full flex-1 min-h-[350px]"
        style={{ flexBasis: `${100 - splitRatio}%` }}
      >
        <IframeFrame
          version={rightVersion}
          fullUrl={rightUrl}
          devicePreset={devicePreset}
          scale={scale}
          refreshKey={rightKey}
          onRefresh={rightRefresh}
        />
      </div>

      {/* Dragging overlay to prevent pointer capture inside iframe during drag */}
      {isDragging && <div className="absolute inset-0 z-50 bg-transparent" />}
    </div>
  );
};
