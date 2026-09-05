import React, { useRef, useState, useEffect } from 'react';
import { BoardCell, CatBreed, InputMode, Puzzle, ThemePalette } from '../engine/types';
import { CatIcon } from './CatIcon';
import { X, Sparkles } from 'lucide-react';

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
}

// Distinct, cozy pastel palettes for regions (up to 12 regions)
const REGION_PALETTES: Record<ThemePalette, string[]> = {
  cozy: [
    '#ffe5d9', // Soft Peach
    '#d8e2dc', // Sage Grey
    '#ffcad4', // Cotton Candy
    '#f4acb7', // Rosy Blush
    '#9d8189', // Dusty Mauve
    '#d0f4de', // Mint Cream
    '#a9def9', // Light Sky
    '#e4c1f9', // Soft Lilac
    '#fcf6bd', // Buttercup
    '#ffd6a5', // Apricot
    '#ffbfb7', // Melon
    '#c7f9cc', // Honeydew
  ],
  pastel: [
    '#ffb3ba', // Pastel Pink
    '#ffdfba', // Pastel Peach
    '#ffffba', // Pastel Yellow
    '#baffc9', // Pastel Mint
    '#bae1ff', // Pastel Azure
    '#dcd6f7', // Pastel Iris
    '#f4eeff', // Soft Lavender
    '#a8d8ea', // Powder Blue
    '#aa96da', // Muted Violet
    '#fcbad3', // Blossom
    '#e8ffe8', // Pale Pistachio
    '#ffeaa7', // Warm Cream
  ],
  matcha: [
    '#e9edc9', // Soft Lime
    '#ccd5ae', // Matcha
    '#faedcd', // Cream Foam
    '#d4a373', // Hazelnut
    '#b7b7a4', // Green Stone
    '#ddbea9', // Warm Ochre
    '#a3b18a', // Olive Green
    '#588157', // Forest Shade
    '#fefae0', // Sweet Milk
    '#cb997e', // Chestnut
    '#829e79', // Tea Leaf
    '#ced4da', // Ceramic Grey
  ],
  lavender: [
    '#f3e8ff', // Violet 100
    '#e9d5ff', // Violet 200
    '#d8b4fe', // Violet 300
    '#fce7f3', // Pink 100
    '#fbcfe8', // Pink 200
    '#e0e7ff', // Indigo 100
    '#c7d2fe', // Indigo 200
    '#ede9fe', // Purple 100
    '#ddd6fe', // Purple 200
    '#fae8ff', // Fuchsia 100
    '#f5d0fe', // Fuchsia 200
    '#e2e8f0', // Slate Mist
  ],
  midnight: [
    '#334155', // Slate 700
    '#1e293b', // Slate 800
    '#3b82f6', // Blue 500
    '#6366f1', // Indigo 500
    '#8b5cf6', // Violet 500
    '#a855f7', // Purple 500
    '#ec4899', // Pink 500
    '#0ea5e9', // Sky 500
    '#14b8a6', // Teal 500
    '#f59e0b', // Amber 500
    '#64748b', // Slate 500
    '#475569', // Slate 600
  ],
};

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
}) => {
  const size = puzzle.size;
  const palette = REGION_PALETTES[theme] || REGION_PALETTES.cozy;

  const isDragging = useRef(false);
  const lastTappedRef = useRef<{ row: number; col: number; time: number } | null>(null);

  const handlePointerDown = (row: number, col: number, e: React.PointerEvent) => {
    // Secondary click (right click) = always toggle Cat
    if (e.button === 2) {
      e.preventDefault();
      onCellAction(row, col, 'cat');
      return;
    }

    isDragging.current = true;

    // Detect double-tap timing (under 300ms on same cell)
    const now = Date.now();
    const last = lastTappedRef.current;
    if (last && last.row === row && last.col === col && now - last.time < 320) {
      lastTappedRef.current = null;
      onCellAction(row, col, 'doubleTap');
      return;
    }

    lastTappedRef.current = { row, col, time: now };
    onCellAction(row, col, 'tap');
  };

  const handlePointerEnter = (row: number, col: number) => {
    if (isDragging.current && inputMode === 'mark') {
      onCellAction(row, col, 'drag');
    }
  };

  useEffect(() => {
    const handlePointerUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  return (
    <div
      className="relative w-full max-w-[min(92vw,480px)] aspect-square mx-auto touch-none select-none rounded-3xl p-3 shadow-xl bg-white/80 dark:bg-cozy-darkCard/80 backdrop-blur-md border border-amber-900/10 dark:border-white/10 transition-all duration-300"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="w-full h-full grid rounded-2xl overflow-hidden shadow-inner border-2 border-slate-700/60 dark:border-slate-300/40"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell) => {
          const reg = cell.region;
          const bgCol = palette[reg % palette.length];

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
              aria-label={`Row ${cell.row + 1}, Col ${cell.col + 1}, Region ${reg + 1}`}
              onPointerDown={(e) => handlePointerDown(cell.row, cell.col, e)}
              onPointerEnter={() => handlePointerEnter(cell.row, cell.col)}
              className={`relative flex items-center justify-center transition-all duration-150 outline-none select-none ${
                cell.hasConflict && highlightConflicts
                  ? 'bg-rose-400/80 animate-shake ring-2 ring-rose-500 z-10'
                  : ''
              } ${
                cell.isHinted
                  ? 'ring-4 ring-amber-400 animate-pulse z-10 rounded-lg shadow-lg'
                  : ''
              } ${
                isSatisfiedUnit ? 'opacity-40 grayscale-[25%]' : 'opacity-100'
              }`}
              style={{
                backgroundColor: cell.hasConflict && highlightConflicts ? undefined : bgCol,
                borderTopWidth: hasTopBorder ? '2.5px' : '0.5px',
                borderBottomWidth: hasBottomBorder ? '2.5px' : '0.5px',
                borderLeftWidth: hasLeftBorder ? '2.5px' : '0.5px',
                borderRightWidth: hasRightBorder ? '2.5px' : '0.5px',
                borderTopColor: hasTopBorder ? '#334155' : 'rgba(100, 116, 139, 0.25)',
                borderBottomColor: hasBottomBorder ? '#334155' : 'rgba(100, 116, 139, 0.25)',
                borderLeftColor: hasLeftBorder ? '#334155' : 'rgba(100, 116, 139, 0.25)',
                borderRightColor: hasRightBorder ? '#334155' : 'rgba(100, 116, 139, 0.25)',
              }}
            >
              {/* Cat Sprite */}
              {cell.state === 'cat' && (
                <div className="w-[84%] h-[84%] animate-pop-in flex items-center justify-center drop-shadow-md">
                  <CatIcon
                    breed={catBreed}
                    hasConflict={Boolean(cell.hasConflict && highlightConflicts)}
                    expression={cell.hasConflict ? 'shocked' : 'happy'}
                  />
                </div>
              )}

              {/* 'X' Elimination Mark - 90% of square cell size and darker for contrast */}
              {cell.state === 'mark' && (
                <div className="w-[90%] h-[90%] flex items-center justify-center animate-bounce-small text-slate-900 dark:text-slate-100">
                  <X className="w-full h-full stroke-[3.5]" />
                </div>
              )}

              {/* Hint Sparkle Indicator */}
              {cell.isHinted && (
                <div className="absolute top-1 right-1 text-amber-500 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
