import React from 'react';
import { InputMode, CatBreed } from '../engine/types';
import { Undo2, Redo2, Lightbulb, RotateCcw, X } from 'lucide-react';
import { CatIcon } from './CatIcon';

interface ControlsProps {
  inputMode: InputMode;
  onSetInputMode: (mode: InputMode) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onHint: () => void;
  onReset: () => void;
  catBreed: CatBreed;
  remainingCats: number;
}

export const Controls: React.FC<ControlsProps> = ({
  inputMode,
  onSetInputMode,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onHint,
  onReset,
  catBreed,
  remainingCats,
}) => {
  return (
    <div className="w-full max-w-[min(94vw,480px)] mx-auto mt-2 px-2 flex flex-col gap-2.5 select-none">
      {/* Primary Input Mode Toggle (Single-tap friendly for phones & tablets) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-cozy-darkCard/80 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-sm">
        <button
          type="button"
          onClick={() => onSetInputMode('mark')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-sm transition-all duration-200 ${
            inputMode === 'mark'
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-100 shadow-sm ring-2 ring-amber-400/80 scale-[1.02]'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-white/5'
          }`}
        >
          <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
            <X className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span>Mark ❌</span>
        </button>

        <button
          type="button"
          onClick={() => onSetInputMode('cat')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-sm transition-all duration-200 ${
            inputMode === 'cat'
              ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-400 scale-[1.02]'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-white/5'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <CatIcon breed={catBreed} expression="happy" />
          </div>
          <span>Place Cat ({remainingCats} left)</span>
        </button>
      </div>

      {/* Auxiliary Action Buttons: Undo, Redo, Hint, Restart */}
      <div className="grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl font-semibold text-xs border transition-all ${
            canUndo
              ? 'bg-white/90 dark:bg-cozy-darkCard/90 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 shadow-sm active:scale-95'
              : 'bg-slate-100/50 dark:bg-white/5 text-slate-300 dark:text-slate-600 border-transparent cursor-not-allowed'
          }`}
          title="Undo move"
        >
          <Undo2 className="w-4 h-4" />
          <span>Undo</span>
        </button>

        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl font-semibold text-xs border transition-all ${
            canRedo
              ? 'bg-white/90 dark:bg-cozy-darkCard/90 hover:bg-amber-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 shadow-sm active:scale-95'
              : 'bg-slate-100/50 dark:bg-white/5 text-slate-300 dark:text-slate-600 border-transparent cursor-not-allowed'
          }`}
          title="Redo move"
        >
          <Redo2 className="w-4 h-4" />
          <span>Redo</span>
        </button>

        <button
          type="button"
          onClick={onHint}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl font-semibold text-xs bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/80 text-amber-800 dark:text-amber-200 border border-amber-300/50 dark:border-amber-700/50 shadow-sm active:scale-95 transition-all"
          title="Get smart hint"
        >
          <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Hint</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-2xl font-semibold text-xs bg-white/90 dark:bg-cozy-darkCard/90 hover:bg-rose-50 text-rose-600 dark:text-rose-400 border border-slate-200 dark:border-white/10 shadow-sm active:scale-95 transition-all"
          title="Reset board"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
