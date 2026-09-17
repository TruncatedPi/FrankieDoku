import React from 'react';
import { X, Volume2, VolumeX, Heart, Shield, Sparkles, Palette, Trash2 } from 'lucide-react';
import { UserSettings, CatBreed, PlayStyle, ThemePalette } from '../engine/types';
import { CatIcon } from './CatIcon';
import { APP_VERSION } from '../utils/version';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
  onResetProgress: () => void;
}

const BREEDS: { id: CatBreed; name: string; desc: string }[] = [
  { id: 'frankie', name: 'Frankie (Best Dog)', desc: 'Fluffy, happy Sheltie 🐶' },
  { id: 'orange_tabby', name: 'Ginger Tabby', desc: 'Warm & adventurous' },
  { id: 'calico', name: 'Calico', desc: 'Lucky & charming' },
  { id: 'tuxedo', name: 'Tuxedo', desc: 'Dapper & sharp' },
  { id: 'siamese', name: 'Siamese', desc: 'Vocal & elegant' },
  { id: 'black_cat', name: 'Midnight Void', desc: 'Sleek & magical' },
  { id: 'gray_fluff', name: 'Russian Gray', desc: 'Gentle & serene' },
];

const THEMES: { id: ThemePalette; name: string; colors: string[] }[] = [
  { id: 'cozy', name: 'Cozy Warm', colors: ['#f87171', '#38bdf8', '#4ade80', '#fbbf24'] },
  { id: 'pastel', name: 'Sweet Pastel', colors: ['#ff99c8', '#7ee8fa', '#ffd670', '#c77dff'] },
  { id: 'matcha', name: 'Matcha Nature', colors: ['#6a994e', '#f4a261', '#5bc0be', '#ffd166'] },
  { id: 'lavender', name: 'Lavender Dream', colors: ['#c084fc', '#67e8f9', '#f472b6', '#fde047'] },
  { id: 'midnight', name: 'Twilight Neon', colors: ['#1e3a8a', '#065f46', '#701a75', '#7c2d12'] },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-md max-h-[85vh] rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-amber-200 dark:border-white/10 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Settings & Customization
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tune rules, cats, and soothing palettes
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Settings"
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          {/* Game Style (Classic 3 Hearts vs Zen) */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-white/5 border border-amber-200/60 dark:border-white/10 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-100 block text-sm">
              Game Mode
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ playStyle: 'classic' })}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  settings.playStyle === 'classic'
                    ? 'bg-white dark:bg-amber-600 border-amber-400 text-amber-900 dark:text-white shadow-sm ring-2 ring-amber-400/50 font-bold'
                    : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1 text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
                <span>Classic (3 Hearts)</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ playStyle: 'zen' })}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  settings.playStyle === 'zen'
                    ? 'bg-white dark:bg-amber-600 border-amber-400 text-amber-900 dark:text-white shadow-sm ring-2 ring-amber-400/50 font-bold'
                    : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-base">🐾</span>
                <span>Zen (Infinite Lives)</span>
              </button>
            </div>
          </div>

          {/* Sound & Haptics */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
            <label className="flex items-center justify-between">
              <span>Haptic Feedback</span>
              <input type="checkbox" checked={settings.hapticsEnabled} onChange={e => onUpdateSettings({ hapticsEnabled: e.target.checked })} />
            </label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                {settings.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-amber-500" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
                <span>Sound Effects (Meows & Chimes)</span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                aria-label="Sound Effects"
                onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
            </div>

            {settings.soundEnabled && (
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Volume</span>
                <input
                  type="range"
                  aria-label="Volume"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={settings.volume}
                  onChange={(e) => onUpdateSettings({ volume: parseFloat(e.target.value) })}
                  className="flex-1 accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Cat Placement Behavior: Auto-Place X's vs Traditional */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-white/5 border border-amber-200/60 dark:border-white/10 space-y-2">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block text-sm">
                Pet Placement Rule
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                Choose how X marks are handled when placing a pet
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ autoCross: true })}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  settings.autoCross
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-amber-300'
                }`}
              >
                <span className="font-bold text-xs flex items-center gap-1">
                  ⚡ Auto-Place X's
                </span>
                <span className={`text-[10px] leading-tight ${settings.autoCross ? 'text-amber-100' : 'text-slate-400'}`}>
                  Assisted: Auto-marks X in row, column, region & surrounding cells
                </span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ autoCross: false })}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  !settings.autoCross
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-amber-300'
                }`}
              >
                <span className="font-bold text-xs flex items-center gap-1">
                  🎯 Place No X's
                </span>
                <span className={`text-[10px] leading-tight ${!settings.autoCross ? 'text-amber-100' : 'text-slate-400'}`}>
                  Traditional: Place pets only; you manually mark all X's
                </span>
              </button>
            </div>
          </div>

          {/* Smart Assists */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-2.5">
            <span className="font-bold text-slate-800 dark:text-slate-100 block">
              Smart Helpers
            </span>

            {/* Highlight Conflicts */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-200 block">
                  Highlight Conflicts
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Show red warning when pets break rules
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.highlightConflicts}
                onChange={(e) => onUpdateSettings({ highlightConflicts: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
            </label>

            {/* Dim Completed */}
            <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-200/40 dark:border-white/5">
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-200 block">
                  Dim Completed Territories
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Subtly dims rows, cols, and regions that have their pet
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.dimCompleted}
                onChange={(e) => onUpdateSettings({ dimCompleted: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
            </label>
          </div>

          {/* Cat/Pet Breed Customization */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-100 block text-sm">
              Choose Your Pet
            </span>
            <div className="grid grid-cols-3 gap-2">
              {BREEDS.map((breed) => (
                <button
                  key={breed.id}
                  type="button"
                  onClick={() => onUpdateSettings({ catBreed: breed.id })}
                  className={`p-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    settings.catBreed === breed.id
                      ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-400 shadow-sm'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-amber-300'
                  }`}
                >
                  <div className="w-12 h-12">
                    <CatIcon breed={breed.id} expression="happy" />
                  </div>
                  <span className="font-bold text-[11px] text-slate-800 dark:text-slate-100 truncate w-full text-center">
                    {breed.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Palette */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-100 block text-sm">
              Board Color Theme
            </span>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onUpdateSettings({ theme: theme.id })}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between transition-all ${
                    settings.theme === theme.id
                      ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-400 shadow-sm'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-amber-300'
                  }`}
                >
                  <span className="font-semibold text-xs text-slate-700 dark:text-slate-200">
                    {theme.name}
                  </span>
                  <div className="flex gap-1">
                    {theme.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reset progress */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all campaign progress and scores?')) {
                  onResetProgress();
                }
              }}
              className="w-full py-2.5 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Game Progress</span>
            </button>
          </div>

          {/* App Version Info */}
          <div className="pt-1 text-center">
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              SchroDoku {APP_VERSION}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
