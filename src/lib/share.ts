/** Absolute, immutable project URL — needed so X can fetch the score-card image. */
export const SITE_URL = "https://project--106b18c7-31d7-44d5-b91c-f8b2ebc222ec.lovable.app";

export const X_HANDLE = "@onchainheroes";

export const TOTAL_QUESTIONS = 15;

export function clampScore(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(TOTAL_QUESTIONS, Math.round(n)));
}

/** Path of the pre-rendered 1200x630 score card for a given score. */
export function cardPath(score: number): string {
  return `/cards/score-${clampScore(score)}.png`;
}

export function cardUrl(score: number): string {
  return `${SITE_URL}${cardPath(score)}`;
}

export function sharePageUrl(score: number): string {
  return `${SITE_URL}/s/${clampScore(score)}`;
}

export function tweetUrl(score: number, rankTitle: string): string {
  const text = `I scored ${clampScore(score)}/${TOTAL_QUESTIONS} on the Maze of Gains quiz — rank: ${rankTitle}.\n\nThink you know the maze better? ${X_HANDLE}`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
    sharePageUrl(score),
  )}`;
}
