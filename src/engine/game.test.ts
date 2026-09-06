import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gameReducer, newGame } from './game';
import { CAMPAIGN_LEVELS } from '../data/levels';
import { DEFAULT_SETTINGS } from '../utils/storage';
import { generatePuzzle, generateDailyPuzzle } from './generator';
import { validatePuzzleIntegrity } from './solver';

const map = CAMPAIGN_LEVELS[0];
const config = { player1Name: 'A', player2Name: 'B', player1Breed: 'calico' as const, player2Breed: 'tuxedo' as const };
const move = (row: number, col: number) => ({ type: 'move' as const, row, col, action: 'cat' as const, inputMode: 'cat' as const, settings: DEFAULT_SETTINGS });

test('co-op undo and redo restore turn, ownership, and auto-crossed cells', () => {
  const initial = newGame(map, 'twoplayer', config);
  const first = map.solution![0];
  const placed = gameReducer(initial, move(first.row, first.col));
  assert.equal(placed.currentPlayer, 2);
  assert.equal(placed.cells[first.row * 4 + first.col].player, 1);
  assert.ok(placed.cells.some(c => c.state === 'mark'));
  const undone = gameReducer(placed, { type: 'undo' });
  assert.equal(undone.currentPlayer, 1);
  assert.ok(undone.cells.every(c => c.state === 'empty' && c.player === undefined));
  const redone = gameReducer(undone, { type: 'redo' });
  assert.deepEqual(redone.cells, placed.cells);
  assert.equal(redone.currentPlayer, 2);
});

test('mistakes cost one life, undo cannot refund lives, and game over freezes actions', () => {
  let game = newGame(map, 'campaign');
  game = gameReducer(game, move(0, 0));
  assert.equal(game.hearts, 2);
  assert.equal(game.cells[0].isMistake, true);
  game = gameReducer(game, { type: 'undo' });
  assert.equal(game.hearts, 2);
  game = gameReducer(game, { type: 'redo' });
  assert.equal(game.hearts, 2);
  game = gameReducer(gameReducer(game, move(0, 0)), move(0, 0));
  assert.equal(game.hearts, 0);
  assert.equal(game.isGameOver, true);
  assert.strictEqual(gameReducer(game, move(0, 1)), game);
  assert.strictEqual(gameReducer(game, { type: 'tick' }), game);
});

test('all supported sizes can be completed through real move handling', () => {
  for (let size = 4; size <= 12; size++) {
    const puzzle = generatePuzzle(size, 942);
    let game = newGame(puzzle, 'freeplay');
    for (const q of puzzle.solution!) game = gameReducer(game, move(q.row, q.col));
    assert.equal(game.isWon, true, `size ${size}`);
    assert.equal(game.hearts, 3);
    assert.equal(game.cells.filter(c => c.state === 'cat').length, size);
  }
});

test('even zero growth budget produces a unique map, and unsupported input is rejected', () => {
  for (let size = 4; size <= 12; size++) assert.equal(validatePuzzleIntegrity(generatePuzzle(size, 0, 0)).valid, true);
  for (const size of [0, 3, 13, 4.5, NaN, Infinity]) assert.throws(() => generatePuzzle(size), /size/i);
  assert.throws(() => generatePuzzle(12, NaN), /Seed/);
  for (const date of ['2026-02-30', 'bad', '2026-9-5']) assert.throws(() => generateDailyPuzzle(date));
});
