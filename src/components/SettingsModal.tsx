import React from 'react';
import { X, Volume2, VolumeX, Heart, Shield, Sparkles, Palette, Trash2 } from 'lucide-react';
import { UserSettings, CatBreed, PlayStyle, ThemePalette } from '../engine/types';
import { CatIcon } from './CatIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
  onResetProgress: () => void;
}

const BREEDS: { id: CatBreed; name: string; desc: string }[] = [
  { id: 'orange_tabby', name: 'Ginger Tabby', desc: 'Warm & adventurous' },
  { id: 'calico', name: 'Calico', desc: 'Lucky & charming' },
  { id: 'tuxedo', name: 'Tuxedo', desc: 'Dapper & sharp' },
  { id: 'siamese', name: 'Siamese', desc: 'Vocal & elegant' },
  { id: 'black_cat', name: 'Midnight Void', desc: 'Sleek & magical' },
  { id: 'gray_fluff', name: 'Russian Gray', desc: 'Gentle & serene' },
];

const THEMES: { id: ThemePalette; name: string; colors: string[] }[] = [
  { id: 'cozy', name: 'Cozy Warm', colors: ['#ffe5d9', '#d8e2dc', '#ffcad4', '#f4acb7'] },
  { id: 'pastel', name: 'Sweet Pastel', colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9'] },
  { id: 'matcha', name: 'Matcha Tea', colors: ['#e9edc9', '#ccd5ae', '#faedcd', '#d4a373'] },
  { id: 'lavender', name: 'Lavender Dream', colors: ['#f3e8ff', '#e9d5ff', '#d8b4fe', '#fce7f3'] },
  { id: 'midnight', name: 'Twilight Night', colors: ['#334155', '#3b82f6', '#8b5cf6', '#ec4899'] },
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

          {/* Smart Assists */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-2.5">
            <span className="font-bold text-slate-800 dark:text-slate-100 block">
              Smart Helpers
            </span>

            {/* Auto-Cross */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-200 block">
                  Auto-Cross on Cat Place
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Automatically marks 'X' in row, column, region, and 8 neighbors
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoCross}
                onChange={(e) => onUpdateSettings({ autoCross: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
            </label>

            {/* Highlight Conflicts */}
            <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-200/40 dark:border-white/5">
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-200 block">
                  Highlight Conflicts
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Show red warning when cats break rules
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
                  Subtly dims rows, cols, and regions that have their cat
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

          {/* Cat Breed Customization */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-100 block text-sm">
              Choose Your Cat
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
        </div>
      </div>
    </div>
  );
};
