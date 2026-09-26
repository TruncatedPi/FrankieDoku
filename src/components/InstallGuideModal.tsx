import React, { useState } from 'react';
import { X, Smartphone, Apple, Monitor, CheckCircle, Share, PlusSquare, ArrowRight, Download } from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'windows'>('ios');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-md max-h-[85vh] rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-amber-200 dark:border-white/10 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Install on Your Devices
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Zero ads, 100% offline, full screen
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-white/5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'ios'
                ? 'bg-white dark:bg-amber-600 text-amber-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iPhone / iPad</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'android'
                ? 'bg-white dark:bg-amber-600 text-amber-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('windows')}
            className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'windows'
                ? 'bg-white dark:bg-amber-600 text-amber-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Windows</span>
          </button>
        </div>

        {/* Tab Instructions Content */}
        <div className="flex-1 overflow-y-auto pr-1 text-xs space-y-3">
          {activeTab === 'ios' && (
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/50 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-100 block">
                    Open in Safari
                  </strong>
                  Open this web app link on your iPhone or iPad using Apple Safari.
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/50 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    Tap the Share Icon <Share className="w-3.5 h-3.5" />
                  </strong>
                  Tap the Share button at the bottom of your iPhone screen (or top right on iPad).
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/50 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    Select "Add to Home Screen" <PlusSquare className="w-3.5 h-3.5" />
                  </strong>
                  Scroll down the share sheet and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  Launches full-screen like an official App Store app, works 100% offline, and never expires!
                </span>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/50 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-100 block">
                    Open in Chrome
                  </strong>
                  Open the game in Google Chrome on your Android phone or tablet.
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/50 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-100 block">
                    Tap "Install App" or Menu (⋮)
                  </strong>
                  Chrome will prompt "Add Meowdoku to Home screen", or tap the 3 dots in the top right and select <strong>Install App</strong>.
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  Installed onto your Android app drawer with full offline caching and haptics!
                </span>
              </div>
            </div>
          )}

          {activeTab === 'windows' && (
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/50 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-100 block">
                    Install as Desktop Window
                  </strong>
                  In Edge or Chrome, click the small <strong>Install Meowdoku</strong> icon on the right side of the address bar.
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/50 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-100 block">
                    Local Dev / Build
                  </strong>
                  Run <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-mono">npm run dev</code> for local instant testing with hot reload!
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <Smartphone className="w-4 h-4 shrink-0 text-indigo-600" />
                <span>
                  <strong>Native Mobile Bundles:</strong> Capacitor configs are also ready (<code className="px-1 py-0.5 bg-black/10 rounded">npx cap add ios</code> / <code className="px-1 py-0.5 bg-black/10 rounded">android</code>) whenever you want native APKs/Xcode projects!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Got it CTA */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md transition-all"
        >
          Got It!
        </button>
      </div>
    </div>
  );
};
