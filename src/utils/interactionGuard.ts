/**
 * Guards modal action buttons (such as Victory "Next Level" / "Replay" or
 * Game Over "Try Again") against accidental activation when a modal pops up
 * directly underneath the player's finger during a tap or double-tap on the board.
 */

let lastPrimaryBoardPointerDownAt = 0;

/**
 * Records that the user initiated a primary pointer tap (touch or left mouse button)
 * on the game board.
 */
export function recordBoardPrimaryPointerDown(now: number = Date.now()): void {
  lastPrimaryBoardPointerDownAt = now;
}

/**
 * Returns true if a primary pointer tap occurred on the game board within `windowMs`.
 * Used to suppress follow-through taps, double-tap bounces, and synthesized ghost clicks
 * on modals that mount immediately upon placing the final cat or losing the last heart.
 */
export function isWithinBoardTapGuard(windowMs: number = 500, now: number = Date.now()): boolean {
  return lastPrimaryBoardPointerDownAt > 0 && now - lastPrimaryBoardPointerDownAt < windowMs;
}

export function resetBoardTapGuard(): void {
  lastPrimaryBoardPointerDownAt = 0;
}
