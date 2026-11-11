import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/** Non-modal so the highlighted board remains available while reading. */
export function HintWindow({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const [position, setPosition] = useState({ x: 12, y: 90 });
  const [isMoving, setIsMoving] = useState(false);
  const move = (x: number, y: number) => {
    const rect = panel.current?.getBoundingClientRect();
    const halfW = (rect?.width ?? 0) * 0.5;
    const halfH = (rect?.height ?? 0) * 0.5;
    setPosition({
      x: Math.max(-halfW, Math.min(x, window.innerWidth - halfW)),
      y: Math.max(-halfH, Math.min(y, window.innerHeight - halfH)),
    });
  };
  const startDrag = (e: React.PointerEvent<HTMLElement>) => {
    if (!e.isPrimary || e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    drag.current = { id: e.pointerId, x: e.clientX - position.x, y: e.clientY - position.y };
    setIsMoving(true);
  };
  const moveDrag = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (d?.id === e.pointerId) move(e.clientX - d.x, e.clientY - d.y);
  };
  const endDrag = () => {
    drag.current = null;
    setIsMoving(false);
  };
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    handle.current?.focus({ preventScroll: true });
    const resize = () => setPosition({ x: 8, y: 8 });
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  return createPortal(
    <div ref={panel} role="dialog" aria-label="Why this hint?" data-moving={isMoving ? 'true' : 'false'} onKeyDown={e => { if (e.key === 'Escape') onClose(); }}
      className={`fixed z-40 flex flex-col rounded-2xl border-2 border-slate-500 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-2xl overflow-hidden transition-opacity duration-100 ${isMoving ? 'opacity-50' : 'opacity-100'}`}
      style={{ left: position.x, top: position.y, width: 'min(440px, calc(100vw - 16px))', maxHeight: 'min(60dvh, 520px)' }}>
      <div className="flex items-center border-b border-slate-300 dark:border-slate-600">
        <button ref={handle} type="button" aria-label="Move hint explanation" className="flex-1 p-3 text-left font-bold cursor-move touch-none select-none"
          onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
          onKeyDown={e => { const delta = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[e.key]; if (delta) { e.preventDefault(); setIsMoving(true); move(position.x + delta[0], position.y + delta[1]); } }}
          onKeyUp={() => { if (!drag.current) setIsMoving(false); }} onBlur={() => { if (!drag.current) setIsMoving(false); }}>
          Why? <span className="text-sm font-normal">— drag to move</span>
        </button>
        <button type="button" aria-label="Close explanation" onPointerUp={e => { if (e.pointerType === 'touch' && e.isPrimary) { e.preventDefault(); onClose(); } }} onClick={onClose} className="p-3 min-w-11 min-h-11 font-bold touch-manipulation">✕</button>
      </div>
      <div className="p-4 overflow-y-auto overscroll-contain text-lg leading-relaxed select-text cursor-move"
        onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>{children}</div>
    </div>, document.body);
}
