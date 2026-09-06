# SchroDoku: repaired application and 12×12 support

The application is a React/TypeScript puzzle game built with Vite, PWA caching,
and Capacitor configuration. Campaign maps are embedded; daily, free-play, and
co-op maps are generated locally. Settings, progress, and the active session are
stored on the device. There is no server-side puzzle database.

## Rules and supported sizes

Boards support integer sizes **4 through 12**, inclusive. Free Play and Co-Op
both expose all nine sizes. The existing 50 campaign maps remain unchanged;
the daily schedule remains 6–9. A complete answer has exactly one cat in every
row, column, and connected colored territory. Cats cannot touch, including
diagonally. Distant diagonal cats are allowed; these are not chess queens.

## Repairs

- **Generation reliability:** Replaced cycling region refinement with growth
  from an initially unique map. N−1 singleton regions force N−1 cats; the last
  row and column force the final cat. Non-touching seeds leave the background
  connected. Growth is accepted only while region connectivity and uniqueness
  remain true. Even a zero growth budget returns a valid map. Generation no
  longer returns null or silently substitutes a small campaign/daily map.
- **Reproducible daily maps:** Seeded Fisher–Yates replaces random sort
  comparators. Dates are validated and interpreted consistently in UTC for
  weekday sizing. Generated maps carry algorithm version 2. The bounded daily
  cache includes the version, and saved sessions retain the actual map.
- **Responsive larger boards:** Generation runs in a Web Worker with cancellation,
  a 15-second timeout, a loading indicator, and visible failure/retry guidance.
  Superseded requests cannot overwrite the current game.
- **Solver and board costs:** Search selects constrained rows/regions, uses
  bit masks, and prunes impossible regions. Auto-cross uses one pass over cells
  instead of searching the full cell array inside a nested board scan.
- **Render loop and state consistency:** Replaced the effect that repeatedly
  rewrote the cells array with a pure game reducer. Moves, hearts, victory,
  auto-cross, and history update together. Idle renders settle normally.
- **Daily completion and streaks:** Completion is keyed by the selected puzzle
  date; replays cannot invent extra streak days. Streaks derive from consecutive
  completed dates, including leap days and missing days. Calendar labels and
  day keys both use local calendar dates. Best times and hearts survive replays.
- **Co-op history and appearance:** Cats retain their placing player's breed;
  undo/redo restore the correct turn and ownership. Mistake markers restore
  correctly. Undo/redo does not refund or repeatedly deduct lives.
- **Persistence and input validation:** Versioned sessions restore the entire
  puzzle, cells, history, lives, timer, and player configuration. Malformed JSON,
  invalid maps, and invalid record shapes are rejected safely. Session writes
  are debounced and flushed on page exit. A restored victory is not counted twice.
- **Controls and settings:** Board buttons support keyboard activation and visible
  focus, and announce cell state. Touch dragging handles implicit pointer capture;
  cancellation and blur end dragging. Free Play exposes 12×12 on phone layouts.
  Haptics respect the setting; the midnight theme activates dark styles.
- **Progress statistics:** Attempts are counted when sessions begin, including
  retries; campaign replays cannot downgrade earned stars or best times.
- **Hints:** Direct rule conflicts identify a blocking cat before consulting the
  answer. Answer-based fallback hints no longer claim an unexplained deduction.
- **Offline hosting:** Manifest icons use relative project paths. Comfortaa fonts
  are bundled locally. The worker, fonts, icons, and app are precached. Tests
  serve the built app under `/SchroDoku/`, then stop an isolated server to verify
  that the app reloads and creates a 12×12 map without network access.

## Validation

The independent checker in `scripts/map-validator.ts` imports neither the game
solver nor its integrity validator. It checks dimensions, region indices and
connectivity, complete stored answers, and the game rules. It searches region by
region, comparing each candidate against every placed cat. Finding two solutions
proves ambiguity; exhausting the search after one proves uniqueness. Reaching
its node budget fails with uniqueness unknown. Stored answers are never clues.

Tests include intentionally impossible and ambiguous maps, malformed data,
partial/duplicate answers, budget exhaustion, every campaign map, the legacy
fallback, generated maps at every size, and a third exhaustive permutation
oracle over 256 connected 4×4 cases. CLI tests check JSON input, duplicate IDs,
solution witnesses, reports, and failure exit codes. Mounted-hook and reducer
tests exercise rendering, state, progress, and history. Browser tests cover
Chromium, Firefox, WebKit, and phone-sized Chromium touch input.

```bash
npm test
npm run validate:maps -- --seeds 100 --days 365 --start 2026-09-01 --json map-validation-report.json
npx playwright install chromium firefox webkit
npm run test:e2e
npm run build
```

The extended audit passed **1,316/1,316 cases**: all 50 campaign maps, the legacy
fallback, 365 daily dates, and 100 seeds at each size 4–12. No generated maps were
missing or ambiguous and no daily map used the legacy fallback. It took about
4 seconds on this Windows/Node 24 machine; the slowest generated 12×12 attempt
was about 59 ms. Timings are observations, not device-independent guarantees.
The deployment workflow runs the tests and extended audit before publishing.

The initial audit found 188 missing maps in 700 attempts through size 10, including
95 missing 10×10 maps. Those failures and the previously failing regression cases
are resolved by the new construction algorithm.

## Practical limits

Uniqueness is proven for each audited grid, not inferred from sampling. A finite
seed/date audit cannot enumerate every future seed, although generation preserves
a valid unique map by construction. Different seeds are not guaranteed to produce
different layouts. Difficulty labels remain size-based; uniqueness is not a
promise of a particular human solving difficulty or a solution without guessing.

The generator change intentionally changes daily layouts from version 1. Historical
completion records are retained; incorrect dates saved by older versions cannot
be reconstructed reliably. Active version-2 sessions preserve their exact maps.
Phone browser tests emulate touch and viewport size; physical iOS/Android install
behavior still depends on the device's browser and operating system.

GitHub Pages deployment is conditional on an enabled Pages site. The current
GitHub plan does not support Pages for this private repository, so Actions
runs every test and uploads the validated production build while explicitly
skipping deployment. Enabling Pages later automatically enables deployment.
