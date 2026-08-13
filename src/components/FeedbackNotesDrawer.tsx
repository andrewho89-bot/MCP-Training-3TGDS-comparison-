import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Star, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  BarChart3, 
  MessageSquare, 
  CheckCircle2 
} from 'lucide-react';
import { ComparisonNote, ComparisonMetric } from '../types';
import { INITIAL_METRICS } from '../data/versionsData';

interface FeedbackNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  v1Url: string;
  v2Url: string;
}

export const FeedbackNotesDrawer: React.FC<FeedbackNotesDrawerProps> = ({
  isOpen,
  onClose,
  v1Url,
  v2Url,
}) => {
  const [metrics, setMetrics] = useState<ComparisonMetric[]>(INITIAL_METRICS);
  const [notes, setNotes] = useState<ComparisonNote[]>([
    {
      id: '1',
      version: 'v2',
      category: 'UI/UX',
      title: 'Enhanced Typography & Layout Polish',
      description: 'Version 2 features cleaner font hierarchy, balanced padding, and superior visual contrast compared to V1.',
      rating: 5,
      timestamp: new Date().toLocaleDateString(),
    },
    {
      id: '2',
      version: 'v2',
      category: 'Performance',
      title: 'MCP Improvement Integration',
      description: 'Streamlined container layouts and faster rendering behavior on mobile screens.',
      rating: 5,
      timestamp: new Date().toLocaleDateString(),
    },
  ]);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<ComparisonNote['category']>('UI/UX');
  const [newTargetVersion, setNewTargetVersion] = useState<ComparisonNote['version']>('v2');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const note: ComparisonNote = {
      id: Date.now().toString(),
      version: newTargetVersion,
      category: newCategory,
      title: newTitle.trim(),
      description: newDesc.trim(),
      rating: 5,
      timestamp: new Date().toLocaleDateString(),
    };

    setNotes([note, ...notes]);
    setNewTitle('');
    setNewDesc('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const generateMarkdownReport = () => {
    let report = `# Website Version Comparison Report\n\n`;
    report += `**Version 1 Baseline:** ${v1Url}\n`;
    report += `**Version 2 Improved:** ${v2Url}\n`;
    report += `**Generated On:** ${new Date().toLocaleString()}\n\n`;

    report += `## Comparison Scores\n\n`;
    metrics.forEach((m) => {
      report += `- **${m.category}**: V1 (${m.v1Score}/5) vs V2 (${m.v2Score}/5) - ${m.notes}\n`;
    });

    report += `\n## Evaluation Notes (${notes.length})\n\n`;
    notes.forEach((n, idx) => {
      report += `### ${idx + 1}. [${n.version.toUpperCase()}] [${n.category}] ${n.title}\n`;
      report += `${n.description}\n\n`;
    });

    return report;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const text = generateMarkdownReport();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `V1-vs-V2-Comparison-Report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white text-sm">
                Evaluation & Audit Notes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Record findings comparing V1 and V2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">

          {/* Metrics Overview Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-500" /> Key Metrics Comparison
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700 space-y-2.5">
              {metrics.map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between font-medium text-slate-700 dark:text-slate-300">
                    <span>{m.category}</span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-amber-600 dark:text-amber-400">V1: {m.v1Score}★</span>
                      <span className="text-slate-300 dark:text-slate-600">→</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">V2: {m.v2Score}★</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {m.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Note Form */}
          <form onSubmit={handleAddNote} className="space-y-3 bg-indigo-50/50 dark:bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
            <span className="font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-600" /> Log Evaluation Note
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Target Version</label>
                <select
                  value={newTargetVersion}
                  onChange={(e) => setNewTargetVersion(e.target.value as any)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="v2">Version 2 (Improved)</option>
                  <option value="v1">Version 1 (Baseline)</option>
                  <option value="both">Both / General</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="UI/UX">UI / UX Polish</option>
                  <option value="Performance">Performance</option>
                  <option value="Layout">Layout & Spacing</option>
                  <option value="Bug">Bug / Issue</option>
                  <option value="General">General Note</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g. Clean typography & responsive navigation"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1">Observation Details</label>
              <textarea
                rows={2}
                placeholder="Describe your observation..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-xs shadow-xs transition-colors"
            >
              Add Note
            </button>
          </form>

          {/* Existing Notes List */}
          <div className="space-y-3">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Recorded Notes ({notes.length})
            </span>

            {notes.length === 0 ? (
              <p className="text-slate-400 text-center py-6">No evaluation notes logged yet.</p>
            ) : (
              <div className="space-y-2.5">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          note.version === 'v2' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {note.version.toUpperCase()}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {note.category}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                      {note.title}
                    </p>
                    {note.description && (
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        {note.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer Export Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleCopyReport}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Report' : 'Copy Report'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>
        </div>

      </div>
    </div>
  );
};
