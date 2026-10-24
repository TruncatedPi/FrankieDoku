import React, { useRef, useEffect } from 'react';
import { BoardCell, CatBreed, HintInvolvedCell, HintResult, InputMode, Puzzle, ThemePalette } from '../engine/types';
import { CatIcon } from './CatIcon';
import { Sparkles } from 'lucide-react';
import { REGION_PALETTES } from '../engine/palettes';
import { recordBoardPrimaryPointerDown } from '../utils/interactionGuard';

interface BoardProps {
  puzzle: Puzzle;
  cells: BoardCell[];
  inputMode: InputMode;
  catBreed: CatBreed;
  theme: ThemePalette;
  dimCompleted: boolean;
  highlightConflicts: boolean;
  satisfiedRows: Set<number>;
  satisfiedCols: Set<number>;
  satisfiedRegions: Set<number>;
  onCellAction: (row: number, col: number, actionType: 'tap' | 'doubleTap' | 'cat' | 'mark' | 'drag') => void;
  disabled?: boolean;
  playerBreeds?: Record<1 | 2, CatBreed>;
  activeHint?: HintResult | null;
}

export const Board: React.FC<BoardProps> = ({
  puzzle,
  cells,
  inputMode,
  catBreed,
  theme,
  dimCompleted,
  highlightConflicts,
  satisfiedRows,
  satisfiedCols,
  satisfiedRegions,
  onCellAction,
  disabled = false,
  playerBreeds,
  activeHint = null,
}) => {
  const size = puzzle.size;
  const palette = REGION_PALETTES[theme] || REGION_PALETTES.cozy;
  const isLargeGrid = size >= 9;
  const regionBorderWidth = isLargeGrid ? '1.75px' : '2.5px';

  const involvedMap = React.useMemo(() => {
    const map = new Map<string, HintInvolvedCell>();
    if (activeHint?.involvedCells) {
      for (const inv of activeHint.involvedCells) {
        map.set(`${inv.row},${inv.col}`, inv);
      }
    }
    return map;
  }, [activeHint]);

  const isDragging = useRef(false);
  const dragStartCellRef = useRef<{ row: number; col: number } | null>(null);
  const lastHoveredCellRef = useRef<{ row: number; col: number } | null>(null);
  const lastTappedRef = useRef<{
    row: number;
    col: number;
    time: number;
    wasEmpty: boolean;
    wasCat: boolean;
    justPlacedCat?: boolean;
  } | null>(null);

  useEffect(() => {
    lastTappedRef.current = null;
    isDragging.current = false;
    dragStartCellRef.current = null;
    lastHoveredCellRef.current = null;
  }, [puzzle, inputMode]);

  const handlePointerDown = (row: number, col: number, e: React.PointerEvent) => {
    if (disabled) return;
    // Secondary click (right click) = always toggle Cat
    if (e.button === 2) {
      e.preventDefault();
      onCellAction(row, col, 'cat');
      return;
    }
    if (!e.isPrimary) return;

    const now = Date.now();
    recordBoardPrimaryPointerDown(now);

    isDragging.current = true;
    dragStartCellRef.current = { row, col };
    lastHoveredCellRef.current = { row, col };

    const cellState = cells[row * size + col]?.state;
    const last = lastTappedRef.current;

    // Ignore accidental bounce taps (under 320ms) on the same cell right after placing a cat
    if (last && last.justPlacedCat && last.row === row && last.col === col && now - last.time < 320) {
      return;
    }

    // Detect double-tap timing (under 320ms on same empty cell to place a cat)
    if (last && last.wasEmpty && last.row === row && last.col === col && now - last.time < 320) {
      lastTappedRef.current = {
        row,
        col,
        time: now,
        wasEmpty: false,
        wasCat: true,
        justPlacedCat: true,
      };
      if (inputMode === 'mark') {
        onCellAction(row, col, 'doubleTap');
      }
      return;
    }

    lastTappedRef.current = {
      row,
      col,
      time: now,
      wasEmpty: cellState === 'empty',
      wasCat: cellState === 'cat',
      justPlacedCat: inputMode === 'cat' && cellState !== 'cat',
    };
    onCellAction(row, col, 'tap');
  };

  const handlePointerEnter = (row: number, col: number) => {
    if (disabled || !isDragging.current || inputMode !== 'mark') return;
    // Never trigger drag on the cell where pointerdown initiated the gesture
    if (dragStartCellRef.current && dragStartCellRef.current.row === row && dragStartCellRef.current.col === col) {
      return;
    }
    // Never re-trigger repeatedly on the cell we are already hovering over
    if (lastHoveredCellRef.current && lastHoveredCellRef.current.row === row && lastHoveredCellRef.current.col === col) {
      return;
    }

    lastHoveredCellRef.current = { row, col };
    onCellAction(row, col, 'drag');
  };

  useEffect(() => {
    const handlePointerUp = () => {
      if (isDragging.current && lastTappedRef.current) {
        const now = Date.now();
        lastTappedRef.current.time = now;
        recordBoardPrimaryPointerDown(now);
      }
      isDragging.current = false;
      dragStartCellRef.current = null;
      lastHoveredCellRef.current = null;
    };
    const handleGlobalPointerDown = (e: PointerEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest('[data-testid="game-board"]')) {
        lastTappedRef.current = null;
      }
    };
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('pointerdown', handleGlobalPointerDown);
    window.addEventListener('blur', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('pointerdown', handleGlobalPointerDown);
      window.removeEventListener('blur', handlePointerUp);
    };
  }, []);

  return (
    <div
      data-testid="game-board"
      className="relative w-full aspect-square mx-auto touch-none select-none rounded-2xl sm:rounded-3xl p-1 sm:p-2.5 shadow-xl bg-white/80 dark:bg-cozy-darkCard/80 backdrop-blur-md border border-amber-900/10 dark:border-white/10 transition-all duration-300 shrink-0"
      style={{
        maxWidth: 'min(calc(100vw - 8px), 520px, calc(100dvh - 236px))',
        maxHeight: 'min(calc(100vw - 8px), 520px, calc(100dvh - 236px))',
      }}
      onContextMenu={(e) => e.preventDefault()}
      aria-busy={disabled}
      onPointerMove={e => {
        if (e.pointerType !== 'touch' || !isDragging.current || disabled) return;
        const target = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLButtonElement>('[data-cell]');
        if (target && e.currentTarget.contains(target)) {
          handlePointerEnter(Number(target.dataset.row), Number(target.dataset.col));
        }
      }}
    >
      <div
        className="w-full h-full grid rounded-xl sm:rounded-2xl overflow-hidden shadow-inner border-2 border-black dark:border-black"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell) => {
          const reg = cell.region;
          const bgCol = palette[reg % palette.length];

          const isPrimaryHint = Boolean(activeHint && activeHint.row === cell.row && activeHint.col === cell.col);
          const involved = involvedMap.get(`${cell.row},${cell.col}`);
          const isConflictInvolved = involved?.reason === 'conflict';

          // Faded previews
          const showFadedCat = cell.state === 'empty' && (
            (isPrimaryHint && activeHint?.type === 'placement') ||
            involved?.fadedState === 'cat'
          );
          const showFadedMark = cell.state === 'empty' && !showFadedCat && (
            (isPrimaryHint && activeHint?.type === 'elimination') ||
            involved?.fadedState === 'mark'
          );

          // Compute border thickness based on whether neighbor has different region
          const hasTopBorder = cell.row > 0 && puzzle.regions[cell.row - 1][cell.col] !== reg;
          const hasBottomBorder = cell.row < size - 1 && puzzle.regions[cell.row + 1][cell.col] !== reg;
          const hasLeftBorder = cell.col > 0 && puzzle.regions[cell.row][cell.col - 1] !== reg;
          const hasRightBorder = cell.col < size - 1 && puzzle.regions[cell.row][cell.col + 1] !== reg;

          // Unit satisfaction dimming
          const isSatisfiedUnit =
            dimCompleted &&
            cell.state === 'empty' &&
            (satisfiedRows.has(cell.row) ||
              satisfiedCols.has(cell.col) ||
              satisfiedRegions.has(reg));

          return (
            <button
              key={`${cell.row}-${cell.col}`}
              type="button"
              aria-label={`Row ${cell.row + 1}, Col ${cell.col + 1}, Region ${reg + 1}, ${cell.state}${cell.state === 'mark' && cell.markColor ? ` (${cell.markColor})` : ''}`}
              disabled={disabled}
              data-cell="true"
              data-row={cell.row}
              data-col={cell.col}
              data-state={cell.state}
              data-mark-color={cell.markColor ?? 'black'}
              data-player={cell.player}
              onClick={e => { if (e.detail === 0) onCellAction(cell.row, cell.col, 'tap'); }}
              onPointerDown={(e) => handlePointerDown(cell.row, cell.col, e)}
              onPointerEnter={() => handlePointerEnter(cell.row, cell.col)}
              className={`relative flex items-center justify-center transition-all duration-150 focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:z-20 outline-none select-none ${
                cell.hasConflict && highlightConflicts
                  ? 'bg-rose-400/80 animate-shake ring-2 ring-rose-500 z-10'
                  : ''
              } ${
                isPrimaryHint
                  ? 'ring-4 ring-amber-400 animate-pulse z-20 rounded-lg shadow-lg'
                  : involved?.highlight
                  ? isConflictInvolved
                    ? 'ring-2 ring-rose-500 bg-rose-400/30 z-10 rounded-lg'
                    : 'ring-2 ring-amber-400/90 bg-amber-400/20 z-10 rounded-lg'
                  : ''
              } ${
                isSatisfiedUnit && !isPrimaryHint && !involved ? 'opacity-40 grayscale-[25%]' : 'opacity-100'
              }`}
              style={{
                backgroundColor: cell.hasConflict && highlightConflicts ? undefined : bgCol,
                borderTopWidth: hasTopBorder ? regionBorderWidth : '0.5px',
                borderBottomWidth: hasBottomBorder ? regionBorderWidth : '0.5px',
                borderLeftWidth: hasLeftBorder ? regionBorderWidth : '0.5px',
                borderRightWidth: hasRightBorder ? regionBorderWidth : '0.5px',
                borderTopColor: '#000000',
                borderBottomColor: '#000000',
                borderLeftColor: '#000000',
                borderRightColor: '#000000',
              }}
            >
              {/* Placed Cat Sprite */}
              {cell.state === 'cat' && (
                <div className={`${isLargeGrid ? 'w-[90%] h-[90%]' : 'w-[84%] h-[84%]'} animate-pop-in flex items-center justify-center drop-shadow-md`}>
                  <CatIcon
                    breed={cell.player && playerBreeds ? playerBreeds[cell.player] : catBreed}
                    hasConflict={Boolean((cell.hasConflict && highlightConflicts) || isConflictInvolved)}
                    expression={cell.hasConflict || isConflictInvolved ? 'shocked' : 'happy'}
                  />
                </div>
              )}

              {/* Faded Ghost Cat (Hint preview) */}
              {showFadedCat && (
                <div className={`${isLargeGrid ? 'w-[90%] h-[90%]' : 'w-[84%] h-[84%]'} flex items-center justify-center opacity-50 scale-90 pointer-events-none animate-pulse drop-shadow-sm`}>
                  <CatIcon
                    breed={cell.player && playerBreeds ? playerBreeds[cell.player] : catBreed}
                    hasConflict={false}
                    expression="happy"
                  />
                </div>
              )}

              {/* 'X' Elimination Mark (Normal or Mistake) with Crisp White Outline */}
              {cell.state === 'mark' && (
                <div className="w-[90%] h-[90%] flex items-center justify-center animate-bounce-small pointer-events-none select-none">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full drop-shadow-sm"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* High-contrast crisp white outline/backdrop stroke */}
                    <line x1="18" y1="6" x2="6" y2="18" stroke="#ffffff" strokeWidth="5.5" />
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#ffffff" strokeWidth="5.5" />
                    {/* Inner stroke: Vibrant Red if mistake or red mark, Dark Slate if normal black mark */}
                    <line
                      x1="18"
                      y1="6"
                      x2="6"
                      y2="18"
                      stroke={cell.isMistake || cell.markColor === 'red' ? '#ef4444' : '#0f172a'}
                      strokeWidth="3.2"
                    />
                    <line
                      x1="6"
                      y1="6"
                      x2="18"
                      y2="18"
                      stroke={cell.isMistake || cell.markColor === 'red' ? '#ef4444' : '#0f172a'}
                      strokeWidth="3.2"
                    />
                  </svg>
                </div>
              )}

              {/* Faded Ghost X Mark (Hint preview) */}
              {showFadedMark && (
                <div className="w-[85%] h-[85%] flex items-center justify-center opacity-50 scale-85 pointer-events-none select-none">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full drop-shadow-xs"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" stroke="#ffffff" strokeWidth="5.5" />
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#ffffff" strokeWidth="5.5" />
                    <line
                      x1="18"
                      y1="6"
                      x2="6"
                      y2="18"
                      stroke={involved?.reason === 'starved_unit' || isConflictInvolved ? '#ef4444' : '#0f172a'}
                      strokeWidth="3.2"
                    />
                    <line
                      x1="6"
                      y1="6"
                      x2="18"
                      y2="18"
                      stroke={involved?.reason === 'starved_unit' || isConflictInvolved ? '#ef4444' : '#0f172a'}
                      strokeWidth="3.2"
                    />
                  </svg>
                </div>
              )}

              {/* Hint Sparkle Indicator on primary hinted cell */}
              {isPrimaryHint && (
                <div className={`absolute ${isLargeGrid ? 'top-0.5 right-0.5' : 'top-1 right-1'} text-amber-500 animate-bounce`}>
                  <Sparkles className={`${isLargeGrid ? 'w-2.5 h-2.5 sm:w-3.5 sm:h-3.5' : 'w-3.5 h-3.5'} fill-amber-400`} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
