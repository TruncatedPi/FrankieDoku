import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/** Non-modal so the highlighted board remains available while reading. */
export function HintWindow({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const [position, setPosition] = useState({ x: 12, y: 90 });
  const move = (x: number, y: number) => {
    const rect = panel.current?.getBoundingClientRect();
    setPosition({ x: Math.max(8, Math.min(x, window.innerWidth - (rect?.width ?? 0) - 8)),
      y: Math.max(8, Math.min(y, window.innerHeight - (rect?.height ?? 0) - 8)) });
  };
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    handle.current?.focus({ preventScroll: true });
    const resize = () => setPosition({ x: 8, y: 8 });
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  return createPortal(
    <div ref={panel} role="dialog" aria-label="Why this hint?" onKeyDown={e => { if (e.key === 'Escape') onClose(); }}
      className="fixed z-40 flex flex-col rounded-2xl border-2 border-slate-500 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-2xl overflow-hidden"
      style={{ left: position.x, top: position.y, width: 'min(440px, calc(100vw - 16px))', maxHeight: 'min(60dvh, 520px)' }}>
      <div className="flex items-center border-b border-slate-300 dark:border-slate-600">
        <button ref={handle} type="button" aria-label="Move hint explanation" className="flex-1 p-3 text-left font-bold cursor-move touch-none select-none"
          onPointerDown={e => { if (!e.isPrimary || e.button !== 0) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { id: e.pointerId, x: e.clientX - position.x, y: e.clientY - position.y }; }}
          onPointerMove={e => { const d = drag.current; if (d?.id === e.pointerId) move(e.clientX - d.x, e.clientY - d.y); }}
          onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}
          onKeyDown={e => { const delta = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[e.key]; if (delta) { e.preventDefault(); move(position.x + delta[0], position.y + delta[1]); } }}>
          Why? <span className="text-sm font-normal">— drag to move</span>
        </button>
        <button type="button" aria-label="Close explanation" onPointerUp={e => { if (e.pointerType === 'touch' && e.isPrimary) { e.preventDefault(); onClose(); } }} onClick={onClose} className="p-3 min-w-11 min-h-11 font-bold touch-manipulation">✕</button>
      </div>
      <div className="p-4 overflow-y-auto overscroll-contain text-lg leading-relaxed select-text">{children}</div>
    </div>, document.body);
}
