import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requestPuzzle } from './generation-client';
import { CAMPAIGN_LEVELS } from '../data/levels';

class TestWorker {
  static instances: TestWorker[] = [];
  onmessage?: (event: { data: unknown }) => void;
  onerror?: () => void;
  terminated = false;
  constructor() { TestWorker.instances.push(this); }
  postMessage() {}
  terminate() { this.terminated = true; }
}
Object.defineProperty(globalThis, 'Worker', { configurable: true, value: TestWorker });

test('generation abort terminates the worker and rejects without returning stale results', async () => {
  const controller = new AbortController();
  const request = requestPuzzle({ size: 12 }, controller.signal);
  const worker = TestWorker.instances[TestWorker.instances.length - 1];
  controller.abort();
  await assert.rejects(request, { name: 'AbortError' });
  assert.equal(worker.terminated, true);
});

test('worker errors are surfaced and time budget exhaustion terminates the worker', async t => {
  const request = requestPuzzle({ size: 12 }, new AbortController().signal);
  const worker = TestWorker.instances[TestWorker.instances.length - 1];
  worker.onerror!();
  await assert.rejects(request, /Could not create a map/);
  assert.equal(worker.terminated, true);
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const timed = requestPuzzle({ size: 12 }, new AbortController().signal);
  const timedWorker = TestWorker.instances[TestWorker.instances.length - 1];
  const rejected = assert.rejects(timed, /timed out/);
  t.mock.timers.tick(15_000);
  await rejected;
  assert.equal(timedWorker.terminated, true);
});

test('only validated complete worker maps reach the caller', async () => {
  const request = requestPuzzle({ size: 4 }, new AbortController().signal);
  TestWorker.instances[TestWorker.instances.length - 1].onmessage!({ data: { puzzle: CAMPAIGN_LEVELS[0] } });
  assert.deepEqual(await request, CAMPAIGN_LEVELS[0]);
  const broken = requestPuzzle({ size: 4 }, new AbortController().signal);
  TestWorker.instances[TestWorker.instances.length - 1].onmessage!({ data: { puzzle: { ...CAMPAIGN_LEVELS[0], solution: [] } } });
  await assert.rejects(broken, /Invalid generated map/);
});
