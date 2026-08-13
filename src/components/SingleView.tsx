import React from 'react';
import { WebsiteVersion, DevicePreset } from '../types';
import { IframeFrame } from './IframeFrame';

interface SingleViewProps {
  activeVersion: 'v1' | 'v2';
  setActiveVersion: (version: 'v1' | 'v2') => void;
  v1Version: WebsiteVersion;
  v2Version: WebsiteVersion;
  v1Url: string;
  v2Url: string;
  devicePreset: DevicePreset;
  scale: number;
  refreshKeys: { v1: number; v2: number };
  onRefreshV1: () => void;
  onRefreshV2: () => void;
}

export const SingleView: React.FC<SingleViewProps> = ({
  activeVersion,
  setActiveVersion,
  v1Version,
  v2Version,
  v1Url,
  v2Url,
  devicePreset,
  scale,
  refreshKeys,
  onRefreshV1,
  onRefreshV2,
}) => {
  const currentVersion = activeVersion === 'v1' ? v1Version : v2Version;
  const currentUrl = activeVersion === 'v1' ? v1Url : v2Url;
  const currentRefresh = activeVersion === 'v1' ? onRefreshV1 : onRefreshV2;
  const currentKey = activeVersion === 'v1' ? refreshKeys.v1 : refreshKeys.v2;

  return (
    <div className="flex flex-col h-full p-3 gap-2 overflow-hidden">
      {/* Top Toggle Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveVersion('v1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeVersion === 'v1'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Version 1 (Baseline)
          </button>
          <button
            onClick={() => setActiveVersion('v2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeVersion === 'v2'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Version 2 (MCP Improvement)
          </button>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
          {currentUrl}
        </span>
      </div>

      {/* Frame Container */}
      <div className="flex-1 w-full h-full min-h-[450px]">
        <IframeFrame
          version={currentVersion}
          fullUrl={currentUrl}
          devicePreset={devicePreset}
          scale={scale}
          refreshKey={currentKey}
          onRefresh={currentRefresh}
        />
      </div>
    </div>
  );
};
