import { parseArgs } from 'node:util';
import { readFileSync, writeFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { CAMPAIGN_LEVELS } from '../src/data/levels';
import { createDailyFallbackPuzzle, generateDailyPuzzle, generatePuzzle } from '../src/engine/generator';
import { solvePuzzle } from '../src/engine/solver';
import type { Puzzle } from '../src/engine/types';
import { validateMap } from './map-validator';

const values = (() => {
  try {
    return parseArgs({ options: {
  seeds: { type: 'string', default: '10' },
  'seed-start': { type: 'string', default: '0' },
  days: { type: 'string', default: '31' },
  start: { type: 'string', default: '2026-09-01' },
  'max-nodes': { type: 'string', default: '1000000' },
  file: { type: 'string' },
  json: { type: 'string' },
  verbose: { type: 'boolean', default: false },
  help: { type: 'boolean', default: false },
    } }).values;
  } catch (error) {
    console.error(String(error));
    process.exit(2);
  }
})();

if (values.help) {
  console.log(`Usage: npm run validate:maps -- [options]
  --seeds N         Generated maps per size, 4..12 (default 10)
  --seed-start N    First deterministic seed (default 0)
  --days N          Consecutive daily maps (default 31)
  --start DATE      First daily date, YYYY-MM-DD (default 2026-09-01)
  --max-nodes N     Independent search budget per map (default 1000000)
  --file PATH       Validate a JSON Puzzle or nonempty Puzzle[] instead of built-in maps
  --json PATH       Write detailed results, including solution witnesses and timings
  --verbose         Print every map result
All campaign maps and the daily fallback are checked unless --file is supplied.
Exit 1 means invalid map, missing generated map, or inconclusive search. Exit 2 means bad arguments/input.`);
  process.exit(0);
}

function integer(name: 'seeds' | 'seed-start' | 'days' | 'max-nodes', minimum = 0) {
  const raw = values[name]!;
  const number = Number(raw);
  if (!/^\d+$/.test(raw) || !Number.isSafeInteger(number) || number < minimum) {
    throw new Error(`--${name} must be an integer >= ${minimum}`);
  }
  return number;
}

try {
  const seeds = integer('seeds');
  const seedStart = integer('seed-start');
  if (!Number.isSafeInteger(seedStart + seeds)) throw new Error('Seed range is too large');
  const days = integer('days');
  const maxNodes = integer('max-nodes', 1);
  const startDate = new Date(`${values.start}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.start!) || !Number.isFinite(startDate.getTime()) ||
      startDate.toISOString().slice(0, 10) !== values.start) throw new Error('--start must be a valid YYYY-MM-DD date');
  const results: Array<ReturnType<typeof validateMap> & { id: string; source: string; size?: number; generationMs: number; validationMs: number }> = [];
  const ids = new Set<string>();
  const started = performance.now();

  function check(id: string, source: string, makeMap: () => unknown) {
    const generationStart = performance.now();
    let map: unknown;
    let generationError: string | undefined;
    try { map = makeMap(); } catch (error) { generationError = String(error); }
    const generationMs = performance.now() - generationStart;
    const validationStart = performance.now();
    const result = validateMap(map, maxNodes);
    if (generationError) result.errors.unshift(`Generation failed: ${generationError}`);
    if (map == null) result.errors.unshift('Map was not produced; this is a failure, not a skipped test');
    if (map && typeof map === 'object') {
      const puzzle = map as Puzzle;
      if (typeof puzzle.id !== 'string' || !puzzle.id.trim()) result.errors.push('Missing map id');
      else {
        if (ids.has(puzzle.id)) result.errors.push(`Duplicate map id: ${puzzle.id}`);
        ids.add(puzzle.id);
      }
      if (source !== 'file' && puzzle.solution === undefined) result.errors.push('Built-in map is missing its stored solution');
      // Cross-check independent and production answers only after structural validation succeeds.
      if (result.valid) {
        const production = solvePuzzle(puzzle, 2);
        if (JSON.stringify(production) !== JSON.stringify(result.solutions)) {
          result.errors.push('Production solver disagrees with independent checker');
        }
      }
    }
    result.valid = result.errors.length === 0;
    const entry = { id, source, size: (map as Puzzle | null)?.size, ...result, generationMs,
      validationMs: performance.now() - validationStart };
    results.push(entry);
    if (values.verbose || !result.valid) {
      console.log(`${result.valid ? 'PASS' : 'FAIL'} ${id}: ${result.valid ? 'exactly one valid solution' : result.errors.join('; ')}`);
      if (!result.valid && result.solutions.length === 2) console.log(`  Witnesses (zero-based): ${JSON.stringify(result.solutions)}`);
    }
  }

  if (values.file) {
    const data: unknown = JSON.parse(readFileSync(values.file, 'utf8'));
    const maps = Array.isArray(data) ? data : [data];
    if (!maps.length) throw new Error('Input map list must not be empty');
    maps.forEach((map, index) => check(`file[${index}]`, 'file', () => map));
  } else {
    if (CAMPAIGN_LEVELS.length !== 100) throw new Error('Expected 100 campaign maps');
    CAMPAIGN_LEVELS.forEach(map => check(map.id, 'campaign', () => map));
    check('daily-fallback', 'fallback', () => createDailyFallbackPuzzle('fallback'));
    for (let day = 0; day < days; day++) {
      const date = new Date(startDate);
      date.setUTCDate(date.getUTCDate() + day);
      const dateString = date.toISOString().slice(0, 10);
      check(`daily-${dateString}`, 'daily', () => generateDailyPuzzle(dateString));
    }
    for (let size = 4; size <= 12; size++) {
      for (let seed = seedStart; seed < seedStart + seeds; seed++) {
        check(`generated-${size}x${size}-seed-${seed}`, 'generated', () => generatePuzzle(size, seed));
      }
    }
  }
  const failed = results.filter(result => !result.valid).length;
  const elapsedMs = performance.now() - started;
  const dailyFallbacks = results.filter(result => result.source === 'daily' && result.size === 5).length;
  const summary = { checked: results.length, passed: results.length - failed, failed, dailyFallbacks, elapsedMs };
  console.log(`${summary.passed}/${summary.checked} maps passed; ${failed} failed; ${(elapsedMs / 1000).toFixed(2)}s`);
  if (dailyFallbacks) console.log(`  ${dailyFallbacks} daily dates used the same 5x5 fallback map`);
  for (const source of ['campaign', 'fallback', 'daily', 'generated', 'file']) {
    const group = results.filter(result => result.source === source);
    if (!group.length) continue;
    const slowest = group.reduce((a, b) => a.generationMs + a.validationMs > b.generationMs + b.validationMs ? a : b);
    console.log(`  ${source}: ${group.length} maps; slowest ${slowest.id}: generation ${slowest.generationMs.toFixed(1)}ms, validation ${slowest.validationMs.toFixed(1)}ms`);
  }
  if (values.json) writeFileSync(values.json, JSON.stringify({ summary, results }, null, 2) + '\n');
  process.exitCode = failed ? 1 : 0;
} catch (error) {
  console.error(String(error));
  process.exitCode = 2;
}
