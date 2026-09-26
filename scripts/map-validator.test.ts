import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, unlinkSync, rmdirSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CAMPAIGN_LEVELS } from '../src/data/levels';
import { createDailyFallbackPuzzle, createPRNG, generateDailyPuzzle, generatePuzzle } from '../src/engine/generator';
import { solvePuzzle, validatePuzzleIntegrity } from '../src/engine/solver';
import type { Puzzle } from '../src/engine/types';
import { validateMap } from './map-validator';

const unique = CAMPAIGN_LEVELS[0];
const ambiguous: Puzzle = { id: 'ambiguous', size: 4, regions: [
  [0, 0, 1, 1], [0, 0, 1, 1], [2, 2, 3, 3], [2, 2, 3, 3],
] };
const impossible: Puzzle = { id: 'impossible', size: 4, regions: [
  [0, 1, 2, 2], [3, 3, 2, 2], [3, 3, 2, 2], [3, 3, 2, 2],
] };

test('independent checker distinguishes zero, one, and multiple solutions', () => {
  assert.equal(validateMap(impossible).solutions.length, 0);
  assert.match(validateMap(impossible).errors.join(), /no solution/);
  assert.equal(validateMap(unique).valid, true);
  assert.equal(validateMap(unique).solutions.length, 1);
  const multiple = validateMap(ambiguous);
  assert.equal(multiple.valid, false);
  assert.equal(multiple.solutions.length, 2);
  assert.notDeepEqual(multiple.solutions[0], multiple.solutions[1]);
  // A stored answer is not a clue: it must never narrow the solution search.
  assert.equal(validateMap({ ...ambiguous, solution: multiple.solutions[0] }).solutions.length, 2);
  assert.equal(validatePuzzleIntegrity(impossible).valid, false);
});

test('checker and production validator reject malformed maps without throwing', () => {
  const disconnected = { ...unique, regions: [[0, 1, 0, 1], [2, 2, 3, 3], [2, 2, 3, 3], [2, 2, 3, 3]] };
  const cases: unknown[] = [null, {}, { ...unique, size: NaN }, { ...unique, size: Infinity },
    { ...unique, size: 4.5 }, { ...unique, size: 3 }, { ...unique, size: 13 },
    { ...unique, regions: null }, { ...unique, regions: [] }, { ...unique, regions: new Array(4) },
    { ...unique, regions: [null, ...unique.regions.slice(1)] },
    { ...unique, regions: ['0000', ...unique.regions.slice(1)] },
    { ...unique, regions: [[0], ...unique.regions.slice(1)] }, disconnected,
    { ...unique, regions: Array.from({ length: 4 }, () => [0, 0, 0, 0]) },
  ];
  for (const badIndex of [NaN, Infinity, -2, 4, 1.5, '0', null, undefined]) {
    cases.push({ ...unique, regions: [[badIndex, ...unique.regions[0].slice(1)], ...unique.regions.slice(1)] });
  }
  for (const input of cases) {
    assert.equal(validateMap(input).valid, false, JSON.stringify(input));
    assert.equal(validatePuzzleIntegrity(input as Puzzle).valid, false, JSON.stringify(input));
  }
});

test('stored answer must be complete, distinct, in bounds, and obey every rule', () => {
  const badAnswers = [[], unique.solution!.slice(0, 1), Array(4).fill(unique.solution![0]),
    [...unique.solution!, unique.solution![0]], null, 'bad',
    [null, ...unique.solution!.slice(1)],
    [{ row: '0', col: 1 }, ...unique.solution!.slice(1)],
    [{ row: 0, col: NaN }, ...unique.solution!.slice(1)],
    [{ row: 0, col: 4 }, ...unique.solution!.slice(1)],
    [{ row: 0, col: 0 }, ...unique.solution!.slice(1)],
  ];
  for (const solution of badAnswers) {
    const map = { ...unique, solution } as Puzzle;
    assert.equal(validateMap(map).valid, false, JSON.stringify(solution));
    assert.equal(validatePuzzleIntegrity(map).valid, false, JSON.stringify(solution));
  }
  for (const solution of [undefined, [...unique.solution!].reverse()]) {
    assert.equal(validateMap({ ...unique, solution }).valid, true);
    assert.equal(validatePuzzleIntegrity({ ...unique, solution }).valid, true);
  }
});

test('search budget exhaustion is inconclusive and fails validation', () => {
  const result = validateMap(unique, 1);
  assert.equal(result.valid, false);
  assert.equal(result.exhausted, true);
  assert.match(result.errors.join(), /UNKNOWN/);
});

// Exhaustively enumerate all column permutations as a third small-board oracle.
function bruteForce(map: Puzzle) {
  const answers: number[][] = [];
  function permute(cols: number[]) {
    if (cols.length === map.size) {
      if (new Set(cols.map((col, row) => map.regions[row][col])).size !== map.size) return;
      if (cols.some((col, row) => row > 0 && Math.abs(col - cols[row - 1]) <= 1)) return;
      answers.push(cols);
      return;
    }
    for (let col = 0; col < map.size; col++) if (!cols.includes(col)) permute([...cols, col]);
  }
  permute([]);
  return answers.map(cols => cols.map((col, row) => ({ row, col })));
}

test('independent solver agrees with exhaustive permutations across 256 connected 4x4 maps', () => {
  const random = createPRNG(938);
  let checked = 0;
  for (let attempt = 0; attempt < 1000 && checked < 256; attempt++) {
    const regions = ambiguous.regions.map(row => [...row]);
    for (let step = 0; step < 8; step++) {
      const row = Math.floor(random() * 4), col = Math.floor(random() * 4);
      const nextRow = Math.min(3, row + 1);
      regions[row][col] = regions[nextRow][col];
    }
    const map = { ...ambiguous, regions };
    const result = validateMap(map);
    if (result.errors.some(error => /empty|disconnected/.test(error))) continue;
    const expected = bruteForce(map);
    assert.equal(result.solutions.length, Math.min(expected.length, 2));
    assert.equal(result.valid, expected.length === 1);
    for (const answer of result.solutions) assert.ok(expected.some(item => JSON.stringify(item) === JSON.stringify(answer)));
    checked++;
  }
  assert.equal(checked, 256);
});

for (const map of CAMPAIGN_LEVELS) {
  test(`${map.id}: independent unique solution and complete stored answer`, () => {
    assert.ok(map.solution);
    const result = validateMap(map);
    assert.equal(result.valid, true, result.errors.join('; '));
    assert.deepEqual(solvePuzzle(map, 2), result.solutions);
  });
}

test('daily fallback has exactly one solution', () => {
  assert.equal(validateMap(createDailyFallbackPuzzle('2026-09-05')).valid, true);
});

test('generated maps are present, independently unique, and repeatable at every supported size', () => {
  for (let size = 4; size <= 12; size++) {
    const map = generatePuzzle(size, 42 + size * 100);
    assert.ok(map, `Generation failed for size ${size}`);
    const result = validateMap(map);
    assert.equal(result.valid, true, result.errors.join('; '));
    assert.deepEqual(generatePuzzle(size, 42 + size * 100), map);
  }
});

test('daily weekday and map are identical in UTC and Los Angeles', () => {
  const code = `import { generateDailyPuzzle } from './src/engine/generator.ts'; console.log(JSON.stringify(generateDailyPuzzle('2026-09-07')));`;
  const outputs = ['UTC', 'America/Los_Angeles'].map(TZ => {
    const result = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', code], {
      cwd: process.cwd(), env: { ...process.env, TZ }, encoding: 'utf8', timeout: 30_000,
    });
    assert.equal(result.status, 0, result.stderr || String(result.error));
    return JSON.parse(result.stdout);
  });
  assert.deepEqual(outputs[0], outputs[1]);
  assert.equal(outputs[0].size, 6, 'Monday must use a 6x6 map');
  assert.deepEqual(outputs[0], generateDailyPuzzle('2026-09-07'));
});

test('CLI checks external maps, writes witnesses, and fails closed with meaningful exit codes', () => {
  const directory = mkdtempSync(join(tmpdir(), 'schrodoku-map-test-'));
  const input = join(directory, 'maps.json');
  const output = join(directory, 'report.json');
  const run = (...args: string[]) => spawnSync(process.execPath,
    ['--import', 'tsx', 'scripts/validate-maps.ts', ...args],
    { cwd: process.cwd(), encoding: 'utf8', timeout: 30_000 });
  try {
    writeFileSync(input, JSON.stringify(unique));
    const success = run('--file', input, '--json', output);
    assert.equal(success.status, 0, success.stderr);
    assert.equal(JSON.parse(readFileSync(output, 'utf8')).summary.passed, 1);
    writeFileSync(input, JSON.stringify([unique, ambiguous, impossible, null]));
    const failure = run('--file', input, '--json', output);
    assert.equal(failure.status, 1, failure.stderr);
    const report = JSON.parse(readFileSync(output, 'utf8'));
    assert.equal(report.summary.failed, 3);
    assert.equal(report.results[1].solutions.length, 2);
    writeFileSync(input, JSON.stringify([unique, unique]));
    assert.equal(run('--file', input).status, 1, 'Duplicate ids must fail');
    writeFileSync(input, JSON.stringify(unique));
    assert.equal(run('--file', input, '--max-nodes', '1').status, 1);
    writeFileSync(input, '[]');
    assert.equal(run('--file', input).status, 2);
    assert.equal(run('--unknown-option').status, 2);
    assert.equal(run('--start', '2026-02-30').status, 2);
    assert.equal(run('--seeds', '-1').status, 2);
  } finally {
    // Only remove the two files created above and their now-empty temporary directory.
    if (existsSync(input)) unlinkSync(input);
    if (existsSync(output)) unlinkSync(output);
    rmdirSync(directory);
  }
});
