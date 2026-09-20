# Fix X share: missing score-card image + new tweet text

## Why the card image is missing

The tweet shares a link to the score page (`/s/14`). X turns that link into an image card only if the linked page is live on the internet and carries `og:image` / `twitter:card` tags. Two problems:

1. The link in the tweet points to the **old** project's address (`project--106b18c7-...lovable.app`). This project is a copy with a **new** address, so X fetches the wrong place.
2. This project has **never been published**, so there is no live page for X to read the card image from at all. Publishing is required for the embed to work — no way around that.

The score page itself already has the correct card tags and the card images are already in the project, so no work needed there.

## Changes

1. **`src/lib/share.ts`** — point the site address to this project's stable address:
   `https://project--3c3652c0-16f4-4623-8674-da2e2fe587d0.lovable.app`
2. **`src/lib/share.ts`** — new tweet text:
   ```text
   I scored 14/15 on the @onchainheroes Maze of Gains quiz — rank: Silo Stocker.

   Think you know the maze better?
   ```
   (handle moved up next to the quiz name, removed from the end; score and rank stay dynamic per player)
3. **Publish the app** after the change — only then will X show the score card image when someone posts. The score link and card image are then fetched by X from the live site.

## Technical notes

- Only `src/lib/share.ts` is edited: `SITE_URL` constant and the `tweetUrl()` text.
- The `/s/$score` route already emits `og:image` and `twitter:card: summary_large_image` pointing at the 1200x630 cards in `public/cards/` — verified correct.
- Caveat to report: X caches link previews; the first posts after publish render the card, and X re-scrapes on its own schedule afterwards.
