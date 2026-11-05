# November input, patterns, and readability review

Reviewed the changes through 1572c4a: wider boards, modal activation guards, eight campaigns, disconnected territories, palette optimization and difficulty ratings.

## Touch input
Board dragging previously relied on elementFromPoint under implicit touch capture. It now explicitly captures the primary pointer and resolves coordinates against the actual grid rectangle. A non-passive touchmove fallback handles Safari's touch dispatch path; both paths interpolate cells skipped by fast gestures. Cell and grid touch-action are explicit. Cancellation/blur ends the gesture, secondary pointer releases do not end the primary gesture, and dragging clears double-tap history.

The tests cover actual Chromium touch injection, plus synthetic captured-touch sequences in iPhone-sized WebKit. These are not a physical iPhone test; confirm long horizontal/vertical/diagonal drags, fast swipes, cancellation and double taps on the user's phone.

## Pattern collection
Free Play includes six fixed 9x9 maps: diagonal ribbons, diamond rings, chevron, heart, butterfly and lightning bolt. They use disconnected territories where necessary. Original geometric layouts were adjusted outside the heart/butterfly silhouettes to enforce a unique solution. All are independently validated by validate:maps and distinct from the released campaigns. Existing campaign IDs are untouched.

## Difficulty
The existing score is an estimate of solving effort: singles, confinement, starvation, subsets, and lookahead have different weights. The final lookahead tier uses an answer-guided elimination; it is not proof that a human needs that precise reasoning sequence. Added oracleFallbackSteps to expose this limitation rather than silently treating every fallback as a proved deduction. The witness is now computed from the map, so missing or stale stored answers cannot change the rating. Metrics are cached per immutable puzzle object to avoid repeated analysis across benchmark and campaign calculations.

SUPER-HARD requires HARD status, at least three lookahead steps and a score at or above the maximum of: HARD threshold + 25, 2.25 times the size reference mean, mean + 1.75 reference standard deviations, and mean + 40. This is a selective relative threshold, not a measured human completion-time guarantee. The existing same-size baseline from Campaigns 1–5 is retained.

## Palette audit
Minimum pairwise CIEDE2000 distances measured using the repository's analyzer:

| Palette | First 6 colors | All 12 colors |
| --- | ---: | ---: |
| Cozy | 37.94 | 30.15 |
| Pastel | 40.12 | 29.27 |
| Matcha | 48.01 | 28.21 |
| Lavender | 48.65 | 29.87 |
| Midnight | 44.66 | 29.18 |
| Ocean | 45.57 | 31.74 |

These are normal-observer color differences, not guarantees for color-vision deficiencies, dimmed cells, glare or tiny displays. Optional region numbers provide a stable non-color cue, especially for disconnected pieces. Numbers avoid adding dense textures underneath X marks on 12x12 boards. Settings also offers white or black cell/territory dividing lines. Both preferences persist and old saves default to black lines with numbers off.

W3C recommends a second cue such as text or pattern when color carries meaning: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html
