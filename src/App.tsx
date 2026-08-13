import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { SideBySideView } from './components/SideBySideView';
import { OverlaySliderView } from './components/OverlaySliderView';
import { SingleView } from './components/SingleView';
import { FeedbackNotesDrawer } from './components/FeedbackNotesDrawer';
import { InfoModal } from './components/InfoModal';
import { ViewMode, DevicePreset, WebsiteVersion } from './types';
import { INITIAL_VERSIONS } from './data/versionsData';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [devicePreset, setDevicePreset] = useState<DevicePreset>('responsive');
  const [scale, setScale] = useState<number>(1);
  const [verticalScale, setVerticalScale] = useState<number>(5); // Default to 5x vertical size
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isSyncedPath, setIsSyncedPath] = useState<boolean>(true);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [activeSingleVersion, setActiveSingleVersion] = useState<'v1' | 'v2'>('v2');

  const [refreshKeys, setRefreshKeys] = useState<{ v1: number; v2: number }>({ v1: 0, v2: 0 });
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  // Dark mode state with default dark theme support
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Construct full URLs based on base URLs and currentPath
  const formatUrl = (baseUrl: string, path: string) => {
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    let cleanPath = path.trim();
    if (!cleanPath) return `${cleanBase}/`;
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
    return `${cleanBase}${cleanPath}`;
  };

  const v1BaseUrl = INITIAL_VERSIONS.v1.url;
  const v2BaseUrl = INITIAL_VERSIONS.v2.url;

  const v1FullUrl = isSyncedPath ? formatUrl(v1BaseUrl, currentPath) : v1BaseUrl;
  const v2FullUrl = isSyncedPath ? formatUrl(v2BaseUrl, currentPath) : v2BaseUrl;

  const handleRefreshV1 = () => {
    setRefreshKeys((prev) => ({ ...prev, v1: prev.v1 + 1 }));
  };

  const handleRefreshV2 = () => {
    setRefreshKeys((prev) => ({ ...prev, v2: prev.v2 + 1 }));
  };

  const handleRefreshAll = () => {
    setRefreshKeys((prev) => ({ v1: prev.v1 + 1, v2: prev.v2 + 1 }));
  };

  const handleSwapSides = () => {
    setIsSwapped(!isSwapped);
  };

  const handleResetUrls = () => {
    setCurrentPath('');
    handleRefreshAll();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors overflow-x-hidden">
      {/* Top Main Navigation Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        devicePreset={devicePreset}
        setDevicePreset={setDevicePreset}
        isSyncedPath={isSyncedPath}
        setIsSyncedPath={setIsSyncedPath}
        onRefreshAll={handleRefreshAll}
        onSwapSides={handleSwapSides}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        v1Url={v1FullUrl}
        v2Url={v2FullUrl}
      />

      {/* Path & Viewport Controls Toolbar */}
      <Toolbar
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        isSyncedPath={isSyncedPath}
        setIsSyncedPath={setIsSyncedPath}
        devicePreset={devicePreset}
        setDevicePreset={setDevicePreset}
        scale={scale}
        setScale={setScale}
        verticalScale={verticalScale}
        setVerticalScale={setVerticalScale}
        v1BaseUrl={v1BaseUrl}
        v2BaseUrl={v2BaseUrl}
        v1FullUrl={v1FullUrl}
        v2FullUrl={v2FullUrl}
        onResetUrls={handleResetUrls}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 relative w-full overflow-y-auto flex flex-col">
        {viewMode === 'split' && (
          <SideBySideView
            v1Version={INITIAL_VERSIONS.v1}
            v2Version={INITIAL_VERSIONS.v2}
            v1Url={v1FullUrl}
            v2Url={v2FullUrl}
            devicePreset={devicePreset}
            scale={scale}
            verticalScale={verticalScale}
            refreshKeys={refreshKeys}
            onRefreshV1={handleRefreshV1}
            onRefreshV2={handleRefreshV2}
            isSwapped={isSwapped}
          />
        )}

        {viewMode === 'overlay' && (
          <OverlaySliderView
            v1Version={INITIAL_VERSIONS.v1}
            v2Version={INITIAL_VERSIONS.v2}
            v1Url={v1FullUrl}
            v2Url={v2FullUrl}
            devicePreset={devicePreset}
            scale={scale}
            verticalScale={verticalScale}
            refreshKeys={refreshKeys}
            onRefreshV1={handleRefreshV1}
            onRefreshV2={handleRefreshV2}
          />
        )}

        {(viewMode === 'v1-only' || viewMode === 'v2-only') && (
          <SingleView
            activeVersion={viewMode === 'v1-only' ? 'v1' : 'v2'}
            setActiveVersion={(v) => setViewMode(v === 'v1' ? 'v1-only' : 'v2-only')}
            v1Version={INITIAL_VERSIONS.v1}
            v2Version={INITIAL_VERSIONS.v2}
            v1Url={v1FullUrl}
            v2Url={v2FullUrl}
            devicePreset={devicePreset}
            scale={scale}
            verticalScale={verticalScale}
            refreshKeys={refreshKeys}
            onRefreshV1={handleRefreshV1}
            onRefreshV2={handleRefreshV2}
          />
        )}
      </main>

      {/* Evaluation Notes Panel */}
      <FeedbackNotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        v1Url={v1FullUrl}
        v2Url={v2FullUrl}
      />

      {/* Information Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        v1Url={v1FullUrl}
        v2Url={v2FullUrl}
      />
    </div>
  );
}
