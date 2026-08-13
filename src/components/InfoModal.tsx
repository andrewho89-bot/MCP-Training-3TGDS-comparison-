import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  v1Url: string;
  v2Url: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  v1Url,
  v2Url,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              VS
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white text-base">
                Version Comparison Suite
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evaluating Version 1 Baseline vs Version 2 MCP Improvement
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-5 text-xs text-slate-600 dark:text-slate-300">
          {/* Version Links Breakdown */}
          <div className="space-y-3">
            <span className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              Connected Deployments
            </span>

            <div className="p-3.5 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-semibold text-amber-800 dark:text-amber-300">
                <span>Version 1 — Baseline Deployment</span>
                <a
                  href={v1Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open V1</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="font-mono text-[11px] text-amber-700 dark:text-amber-400 truncate">
                {v1Url}
              </p>
            </div>

            <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Version 2 — MCP Training Improvement
                </span>
                <a
                  href={v2Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open V2</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 truncate">
                {v2Url}
              </p>
            </div>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              Hosting Platform Highlights
            </span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Split Screen Dual View:</strong> Resizable 50/50 side-by-side viewports with draggable partition.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Interactive Overlay Slider:</strong> Visual curtain reveal slider for pixel-perfect layout diff inspection.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Synchronized Pathing:</strong> Appends subpaths (e.g. <code>/dashboard</code>) simultaneously to both V1 & V2.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Device Emulation:</strong> Test desktop, laptop, tablet, and mobile views side-by-side.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs shadow-xs transition-colors"
          >
            Close & Continue Inspecting
          </button>
        </div>

      </div>
    </div>
  );
};
