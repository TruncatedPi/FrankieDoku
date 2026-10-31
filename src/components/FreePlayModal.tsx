import { useState } from 'react';
import { BOARD_SIZES } from '../engine/constants';

export function FreePlayModal({
  onClose,
  onStart,
  initialSize,
  initialDisjointCount = 0,
}: {
  onClose: () => void;
  onStart: (size: number, disjointCount: number) => void;
  initialSize: number;
  initialDisjointCount?: number;
}) {
  const [size, setSize] = useState(initialSize);
  const [disjointCount, setDisjointCount] = useState(() =>
    Math.max(0, Math.min(initialSize - 1, initialDisjointCount))
  );

  const maxDisjoint = size - 1;
  const disjointOptions = Array.from({ length: maxDisjoint + 1 }, (_, i) => i);

  const handleSelectSize = (n: number) => {
    setSize(n);
    setDisjointCount(prev => Math.min(prev, n - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Free Play"
        className="w-full max-w-sm rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-amber-200 dark:border-white/10"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Free Play</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Free Play"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Choose a board size
        </p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {BOARD_SIZES.map(n => (
            <button
              key={n}
              type="button"
              aria-pressed={n === size}
              onClick={() => handleSelectSize(n)}
              className={`py-2.5 rounded-xl border font-bold text-sm transition-all ${
                n === size
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-amber-300'
              }`}
            >
              {n}×{n}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Disjointed Territories
            </label>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300">
              {disjointCount === 0
                ? 'None (Classic)'
                : `${disjointCount} Split ${disjointCount === 1 ? 'Territory' : 'Territories'}`}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
            Number of territories split into non-touching islands (0 to {maxDisjoint})
          </p>
          <div
            role="group"
            aria-label="Disjointed Territories"
            className="grid grid-cols-6 gap-1.5"
          >
            {disjointOptions.map(count => (
              <button
                key={count}
                type="button"
                data-testid={`freeplay-disjoint-${count}`}
                aria-pressed={count === disjointCount}
                aria-label={`${count} disjointed ${count === 1 ? 'territory' : 'territories'}`}
                onClick={() => setDisjointCount(count)}
                className={`py-2 rounded-xl border font-bold text-xs transition-all ${
                  count === disjointCount
                    ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                    : 'border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-violet-400'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onStart(size, disjointCount);
            onClose();
          }}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-md transition-colors"
        >
          Start Free Play
        </button>
      </section>
    </div>
  );
}
