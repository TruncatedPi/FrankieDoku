import { useState } from 'react';
import { BOARD_SIZES } from '../engine/constants';

export function FreePlayModal({ onClose, onStart, initialSize }: { onClose: () => void; onStart: (size: number) => void; initialSize: number }) {
  const [size, setSize] = useState(initialSize);
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] bg-slate-900/60 backdrop-blur-sm">
    <section role="dialog" aria-modal="true" aria-label="Free Play" className="w-full max-w-sm rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-lg">Free Play</h2>
        <button onClick={onClose} aria-label="Close Free Play" className="p-2 rounded-lg">✕</button></div>
      <p className="text-sm mb-3">Choose a board size</p>
      <div className="grid grid-cols-3 gap-2">
        {BOARD_SIZES.map(n => <button key={n} aria-pressed={n === size} onClick={() => setSize(n)}
          className={`py-3 rounded-xl border font-bold ${n === size ? 'bg-amber-500 text-white' : 'border-slate-300'}`}>{n}×{n}</button>)}
      </div>
      <button onClick={() => { onStart(size); onClose(); }} className="w-full mt-4 py-3 bg-amber-500 text-white rounded-xl font-bold">Start Free Play</button>
    </section>
  </div>;
}
