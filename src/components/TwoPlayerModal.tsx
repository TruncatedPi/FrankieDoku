import React, { useState } from 'react';
import { X, Users, Heart, Play } from 'lucide-react';
import { CatBreed } from '../engine/types';
import { CatIcon } from './CatIcon';
import { BOARD_SIZES } from '../engine/constants';

interface TwoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTwoPlayer: (config: {
    player1Name: string;
    player2Name: string;
    player1Breed: CatBreed;
    player2Breed: CatBreed;
    gridSize: number;
  }) => void;
}

const BREEDS: { id: CatBreed; label: string }[] = [
  { id: 'frankie', label: 'Frankie (Best Dog)' },
  { id: 'orange_tabby', label: 'Ginger Tabby' },
  { id: 'calico', label: 'Sweet Calico' },
  { id: 'tuxedo', label: 'Tuxedo' },
  { id: 'siamese', label: 'Siamese' },
  { id: 'black_cat', label: 'Midnight Void' },
  { id: 'gray_fluff', label: 'Silvery Gray' },
];

export const TwoPlayerModal: React.FC<TwoPlayerModalProps> = ({
  isOpen,
  onClose,
  onStartTwoPlayer,
}) => {
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');
  const [p1Breed, setP1Breed] = useState<CatBreed>('frankie');
  const [p2Breed, setP2Breed] = useState<CatBreed>('calico');
  const [gridSize, setGridSize] = useState(7);

  if (!isOpen) return null;

  const handleStart = () => {
    onStartTwoPlayer({
      player1Name: p1Name.trim() || 'Player 1',
      player2Name: p2Name.trim() || 'Player 2',
      player1Breed: p1Breed,
      player2Breed: p2Breed,
      gridSize,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-cozy-darkCard p-6 shadow-2xl border border-amber-200 dark:border-white/10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Cozy Co-Op Mode
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Play together turn-by-turn
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

        {/* Players setup */}
        <div className="grid grid-cols-2 gap-3">
          {/* Player 1 */}
          <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-white/5 border border-amber-200/60 dark:border-white/10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 p-1 bg-white dark:bg-white/10 rounded-2xl shadow-sm">
              <CatIcon breed={p1Breed} expression="happy" />
            </div>
            <input
              type="text"
              value={p1Name}
              onChange={(e) => setP1Name(e.target.value)}
              className="w-full text-center text-xs font-bold py-1 px-2 rounded-lg bg-white dark:bg-white/10 border border-amber-200 dark:border-white/10 text-slate-800 dark:text-slate-100"
              placeholder="Player 1"
              maxLength={100}
              aria-label="Player 1 name"
            />
            <select
              value={p1Breed}
              onChange={(e) => setP1Breed(e.target.value as CatBreed)}
              className="w-full text-[11px] py-1 px-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
            >
              {BREEDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          {/* Player 2 */}
          <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-white/5 border border-rose-200/60 dark:border-white/10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 p-1 bg-white dark:bg-white/10 rounded-2xl shadow-sm">
              <CatIcon breed={p2Breed} expression="happy" />
            </div>
            <input
              type="text"
              value={p2Name}
              onChange={(e) => setP2Name(e.target.value)}
              className="w-full text-center text-xs font-bold py-1 px-2 rounded-lg bg-white dark:bg-white/10 border border-rose-200 dark:border-white/10 text-slate-800 dark:text-slate-100"
              placeholder="Player 2"
              maxLength={100}
              aria-label="Player 2 name"
            />
            <select
              value={p2Breed}
              onChange={(e) => setP2Breed(e.target.value as CatBreed)}
              className="w-full text-[11px] py-1 px-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
            >
              {BREEDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Board Size Picker */}
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1.5">
            Select Board Size
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {BOARD_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setGridSize(size)}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                  gridSize === size
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-amber-50'
                }`}
              >
                {size}x{size}
              </button>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        <button
          type="button"
          onClick={handleStart}
          className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-1"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Co-Op Game</span>
        </button>
      </div>
    </div>
  );
};
